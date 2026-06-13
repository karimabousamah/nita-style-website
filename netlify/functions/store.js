const DEFAULT_STATE = {
  nitaProducts: [],
  nitaOrders: [],
  nitaCoupons: [],
  nitaUsersByEmail: {},
  nitaDiscountUses: {},
  nitaHomepageWallpapers: {},
  nitaStockNotifications: []
};
const ALLOWED_KEYS = Object.keys(DEFAULT_STATE);

function safeState(state) {
  const cleaned = { ...DEFAULT_STATE, ...(state && typeof state === 'object' ? state : {}) };
  cleaned.nitaProducts = Array.isArray(cleaned.nitaProducts) ? cleaned.nitaProducts : [];
  cleaned.nitaOrders = Array.isArray(cleaned.nitaOrders) ? cleaned.nitaOrders : [];
  cleaned.nitaCoupons = Array.isArray(cleaned.nitaCoupons) ? cleaned.nitaCoupons : [];
  cleaned.nitaUsersByEmail = cleaned.nitaUsersByEmail && typeof cleaned.nitaUsersByEmail === 'object' ? cleaned.nitaUsersByEmail : {};
  cleaned.nitaDiscountUses = cleaned.nitaDiscountUses && typeof cleaned.nitaDiscountUses === 'object' ? cleaned.nitaDiscountUses : {};
  cleaned.nitaHomepageWallpapers = cleaned.nitaHomepageWallpapers && typeof cleaned.nitaHomepageWallpapers === 'object' ? cleaned.nitaHomepageWallpapers : {};
  cleaned.nitaStockNotifications = Array.isArray(cleaned.nitaStockNotifications) ? cleaned.nitaStockNotifications : [];
  return cleaned;
}

async function getBlobStore() {
  const blobs = require('@netlify/blobs');
  if (!blobs || !blobs.getStore) throw new Error('Netlify Blobs getStore unavailable.');
  try {
    return blobs.getStore('nita-style-live-database');
  } catch (err) {
    const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID;
    const token = process.env.NETLIFY_AUTH_TOKEN;
    if (!siteID || !token) throw err;
    return blobs.getStore({ name: 'nita-style-live-database', siteID, token });
  }
}

exports.handler = async function(event) {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };

  try {
    const store = await getBlobStore();

    if (event.httpMethod === 'GET') {
      let saved = null;
      try {
        if (typeof store.get === 'function') saved = await store.get('state', { type: 'json' });
      } catch (e) { saved = null; }
      return { statusCode: 200, headers, body: JSON.stringify(safeState(saved)) };
    }

    if (event.httpMethod === 'POST') {
      let data;
      try { data = JSON.parse(event.body || '{}'); }
      catch { return { statusCode: 400, headers, body: JSON.stringify({ ok:false, error:'Invalid JSON.' }) }; }

      let previous = null;
      try { previous = await store.get('state', { type: 'json' }); } catch (e) { previous = null; }
      let next = safeState(previous);

      if (data.key && ALLOWED_KEYS.includes(data.key)) {
        next[data.key] = data.value;
      } else {
        for (const key of ALLOWED_KEYS) {
          if (Object.prototype.hasOwnProperty.call(data, key)) next[key] = data[key];
        }
      }
      next = safeState(next);
      next.updatedAt = new Date().toISOString();

      const payload = JSON.stringify(next);
      if (typeof store.setJSON === 'function') {
        await store.setJSON('state', next);
      } else if (typeof store.set === 'function') {
        await store.set('state', payload, { contentType: 'application/json' });
      } else {
        throw new Error('Netlify Blobs store cannot write data.');
      }

      return { statusCode: 200, headers, body: JSON.stringify({ ok:true, updatedAt: next.updatedAt }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ ok:false, error:'Method not allowed.' }) };
  } catch (error) {
    console.error('Nita store function error:', error && (error.stack || error.message || error));
    return { statusCode: 500, headers, body: JSON.stringify({
      ok:false,
      error: error && error.message ? error.message : 'Store error.',
      hint: 'Check Netlify deploy logs for netlify/functions/store.js and make sure package.json is deployed.'
    }) };
  }
};
