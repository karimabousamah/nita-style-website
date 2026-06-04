const DEFAULT_STATE = {
  nitaProducts: [],
  nitaOrders: [],
  nitaCoupons: [],
  nitaUsersByEmail: {},
  nitaDiscountUses: {}
};

const ALLOWED_KEYS = Object.keys(DEFAULT_STATE);

function safeState(state) {
  const cleaned = { ...DEFAULT_STATE, ...(state || {}) };
  cleaned.nitaProducts = Array.isArray(cleaned.nitaProducts) ? cleaned.nitaProducts : [];
  cleaned.nitaOrders = Array.isArray(cleaned.nitaOrders) ? cleaned.nitaOrders : [];
  cleaned.nitaCoupons = Array.isArray(cleaned.nitaCoupons) ? cleaned.nitaCoupons : [];
  cleaned.nitaUsersByEmail = cleaned.nitaUsersByEmail && typeof cleaned.nitaUsersByEmail === 'object' ? cleaned.nitaUsersByEmail : {};
  cleaned.nitaDiscountUses = cleaned.nitaDiscountUses && typeof cleaned.nitaDiscountUses === 'object' ? cleaned.nitaDiscountUses : {};
  return cleaned;
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
    const { getStore } = await import('@netlify/blobs');
    const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID;
    const token = process.env.NETLIFY_AUTH_TOKEN;
    if (!siteID || !token) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          ok: false,
          error: 'Missing NETLIFY_SITE_ID or NETLIFY_AUTH_TOKEN environment variable.'
        })
      };
    }
    const store = getStore({
      name: 'nita-style-live-database',
      siteID,
      token
    });

    if (event.httpMethod === 'GET') {
      const saved = await store.get('state', { type: 'json', consistency: 'strong' });
      return { statusCode: 200, headers, body: JSON.stringify(safeState(saved)) };
    }

    if (event.httpMethod === 'POST') {
      let data;
      try { data = JSON.parse(event.body || '{}'); }
      catch { return { statusCode: 400, headers, body: JSON.stringify({ ok:false, error: 'Invalid JSON' }) }; }

      const previous = safeState(await store.get('state', { type: 'json', consistency: 'strong' }));
      let next = { ...previous };

      // Preferred safe mode: update only one key, so a customer order cannot overwrite admin product edits.
      if (data.key && ALLOWED_KEYS.includes(data.key)) {
        next[data.key] = data.value;
      } else {
        // Backward-compatible full save, but only accept known keys.
        for (const key of ALLOWED_KEYS) {
          if (Object.prototype.hasOwnProperty.call(data, key)) next[key] = data[key];
        }
      }

      next = safeState(next);
      next.updatedAt = new Date().toISOString();
      await store.setJSON('state', next, { consistency: 'strong' });
      return { statusCode: 200, headers, body: JSON.stringify({ ok:true, updatedAt: next.updatedAt }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ ok:false, error: 'Method not allowed' }) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok:false, error: error.message || 'Store error' }) };
  }
};
