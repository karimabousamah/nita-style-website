exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ ok:false, error:'Method not allowed' }) };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL || 'Nita Style <onboarding@resend.dev>';
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'karim.abousamah1@gmail.com';
  const SITE_URL = (process.env.SITE_URL || process.env.URL || 'https://nitastyle.com').replace(/\/$/, '');
  const LOGO_URL = process.env.LOGO_URL || `${SITE_URL}/assets/logo-cropped.png`;
  const STORE_URL = process.env.STORE_URL || SITE_URL;

  const json = (statusCode, body) => ({ statusCode, headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(body) });

  if (!RESEND_API_KEY) {
    return json(500, { ok:false, error:'Missing RESEND_API_KEY in Netlify environment variables.' });
  }

  let data = {};
  try { data = JSON.parse(event.body || '{}'); }
  catch(e) { return json(400, { ok:false, error:'Invalid JSON body.' }); }

  const esc = (v='') => String(v ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const money = (v) => '$' + Number(v || 0).toFixed(2);
  const type = String(data.type || '').trim();
  const to = String(data.to || '').trim().toLowerCase();

  const send = async ({to, subject, html}) => {
    if (!to || !/^\S+@\S+\.\S+$/.test(to)) throw new Error('Valid recipient email is required.');
    const response = await fetch('https://api.resend.com/emails', {
      method:'POST',
      headers:{ Authorization:`Bearer ${RESEND_API_KEY}`, 'Content-Type':'application/json' },
      body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html })
    });
    const text = await response.text();
    let parsed = null;
    try { parsed = JSON.parse(text); } catch(e) {}
    if (!response.ok) {
      const providerError = parsed?.message || parsed?.error || text || 'Resend rejected the email.';
      throw new Error(providerError);
    }
    return parsed || { raw:text };
  };

  const shell = (pretitle, title, content) => `
  <div style="margin:0;padding:0;background:#f6f4f1;font-family:Arial,Helvetica,sans-serif;color:#111">
    <div style="max-width:720px;margin:0 auto;padding:34px 16px">
      <div style="background:#fff;border:1px solid #e6e0d8;box-shadow:0 20px 60px rgba(0,0,0,.07)">
        <div style="padding:34px 34px 24px;text-align:center;border-bottom:1px solid #eee">
          <img src="${esc(LOGO_URL)}" alt="Nita Style" style="display:block;margin:0 auto 18px;max-width:190px;width:190px;height:auto;border:0;outline:none;text-decoration:none">
          <div style="font-size:10px;letter-spacing:3.5px;text-transform:uppercase;color:#777;font-weight:700">${esc(pretitle)}</div>
        </div>
        <div style="padding:34px">
          <h1 style="font-size:30px;line-height:1.08;text-transform:uppercase;margin:0 0 22px;font-weight:900;letter-spacing:.4px;color:#111">${esc(title)}</h1>
          <div style="font-size:15px;line-height:1.7;color:#222">${content}</div>
          <div style="margin-top:30px;text-align:center"><a href="${esc(STORE_URL)}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:14px 22px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:900">Visit Nita Style</a></div>
        </div>
        <div style="border-top:1px solid #eee;background:#faf9f7;padding:20px 34px;font-size:12px;color:#777;line-height:1.65;text-align:center">Curated Italian-made pieces for women who value clean silhouettes and effortless everyday elegance.<br>This is an automated Nita Style email.</div>
      </div>
    </div>
  </div>`;

  const codeBox = (code) => `<div style="border:1px solid #111;background:#fbfaf8;text-align:center;padding:22px 14px;font-size:36px;font-weight:900;letter-spacing:9px;margin:26px 0;color:#111">${esc(code)}</div>`;
  const orderRows = (items=[]) => items.map(item => `<tr><td style="padding:14px 0;border-bottom:1px solid #eee"><b>${esc(item.name || 'Product')}</b><br><span style="color:#777">${esc(item.size || 'One Size')} × ${Number(item.qty || 1)}</span></td><td style="padding:14px 0;border-bottom:1px solid #eee;text-align:right"><b>${money(item.total || (Number(item.price||0)*Number(item.qty||1)))}</b></td></tr>`).join('');

  function roadmapEmailHtml(status) {
    const normalize = (value='') => {
      const text = String(value || 'Order submitted').trim();
      if (/^new order$/i.test(text)) return 'Order submitted';
      if (/^preparing$/i.test(text)) return 'Packing';
      return text || 'Order submitted';
    };
    const steps = ['Order submitted','Confirmed','Packing','Out for delivery','Delivered'];
    const current = normalize(status);
    if (/^cancelled$/i.test(current)) {
      return `<div style="margin:28px 0 20px;padding:18px;border:1px solid #111;background:#fafafa;text-align:center;font-size:13px;font-weight:900;text-transform:uppercase;letter-spacing:1.5px;color:#111">Cancelled</div>`;
    }
    let index = steps.findIndex(step => step.toLowerCase() === current.toLowerCase());
    if (index < 0) index = 0;
    const dot = (done) => done
      ? `<div style="width:24px;height:24px;border-radius:50%;background:#111;border:3px solid #111;box-sizing:border-box;margin:-14px auto 0;font-size:0;line-height:0">&nbsp;</div>`
      : `<div style="width:24px;height:24px;border-radius:50%;background:#fff;border:4px solid #d6d6d6;box-sizing:border-box;margin:-14px auto 0;font-size:0;line-height:0">&nbsp;</div>`;
    return `
      <div style="margin:32px 0 26px;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;min-width:610px;border-collapse:collapse;table-layout:fixed;margin:0 auto;font-family:Arial,Helvetica,sans-serif">
          <tr>
            ${steps.map((step,i)=>`<td style="width:20%;text-align:center;vertical-align:top;padding:0 0 0"><div style="border-top:3px solid #dedede;height:0;line-height:0;margin:14px 0 0;font-size:0">&nbsp;</div>${dot(i <= index)}</td>`).join('')}
          </tr>
          <tr>
            ${steps.map((step,i)=>`<td style="width:20%;text-align:center;vertical-align:top;padding:12px 4px 0;font-size:14px;line-height:1.08;font-weight:900;letter-spacing:.15px;text-transform:uppercase;color:${i <= index ? '#111' : '#9d9d9d'};font-family:Arial,Helvetica,sans-serif">${esc(step).replace(/ /g, '<br>')}</td>`).join('')}
          </tr>
        </table>
      </div>`;
  }

  try {
    let subject='', html='', recipient = to;

    if (type === 'verification') {
      const code = data.code || '';
      subject = 'Your Nita Style verification code';
      html = shell('Email verification', 'One step left', `<p>Use the code below to verify your email and finish creating your Nita Style account.</p>${codeBox(code)}<p style="color:#777">This code is private. Do not share it with anyone.</p>`);
    } else if (type === 'discount' || type === 'signup_discount') {
      const code = data.code || 'NITA10';
      subject = 'Your Nita Style first-order code';
      html = shell('Welcome to Nita Style', 'Your first-order code', `<p>Thank you for joining Nita Style. Your one-time first-order discount is ready.</p>${codeBox(code)}<p>Apply this code at checkout for 10% off your first order.</p>`);
    } else if (type === 'order_confirmation') {
      const order = data.order || {}; const address = order.address || {};
      subject = `Nita Style order confirmation ${order.id || ''}`;
      html = shell('Order confirmation', 'Thank you for your purchase', `<p>Your order has been received and is now waiting for confirmation.</p><p><b>Order number:</b> ${esc(order.id || '')}</p><table style="width:100%;border-collapse:collapse;margin:24px 0">${orderRows(order.items || [])}</table><div style="border:1px solid #eee;background:#fafafa;padding:18px;margin:20px 0"><p style="margin:0 0 8px"><b>Subtotal:</b> ${money(order.subtotal || 0)}</p>${Number(order.discount||0)>0?`<p style="margin:0 0 8px"><b>Discount:</b> -${money(order.discount)}</p>`:''}<p style="margin:0 0 8px"><b>Wakilni delivery:</b> ${Number(order.deliveryFee||0)?money(order.deliveryFee):'Free'} — 2-4 working days across Lebanon</p><p style="margin:0;font-size:20px"><b>Total:</b> ${money(order.total || 0)}</p></div><p><b>Payment:</b> Cash on Delivery in USD</p><p><b>Delivery address:</b><br>${esc(address.label || '')}<br>${esc([address.street,address.building,address.floor&&('Floor '+address.floor),address.apartment&&('Apt '+address.apartment),address.city].filter(Boolean).join(', '))}</p>`);
    } else if (type === 'order_status') {
      const order = data.order || {};
      subject = `Nita Style order update ${order.id || ''}`;
      html = shell('Order update', 'Your order status changed', `<p>Your Nita Style order roadmap has been updated.</p><div style="border:1px solid #111;padding:18px;margin:20px 0"><p style="margin:0 0 8px"><b>Order:</b> ${esc(order.id || '')}</p><p style="margin:0"><b>New status:</b> ${esc(order.status || '')}</p></div>${roadmapEmailHtml(order.status)}<p>You can sign in to your account to follow your order details.</p>`);

    } else if (type === 'back_in_stock') {
      const product = data.product || {};
      const sizeLine = data.size ? `<p><b>Size:</b> ${esc(data.size)}</p>` : '';
      subject = `${esc(product.name || 'A Nita Style piece')} is back in stock`;
      html = shell('Back in stock', 'Your piece is available again', `<p>The Nita Style piece you asked about is back in stock.</p><div style="border:1px solid #eee;background:#fafafa;padding:18px;margin:20px 0"><p style="margin:0 0 8px"><b>${esc(product.name || 'Product')}</b></p><p style="margin:0 0 8px"><b>Price:</b> ${money(product.price || 0)}</p>${sizeLine}</div><p>You can now visit Nita Style and place your order while it is available.</p>`);
    } else if (type === 'admin_order') {
      const order = data.order || {}; recipient = ADMIN_EMAIL;
      subject = `New Nita Style order ${order.id || ''}`;
      html = shell('Admin notification', 'New order received', `<p>A new order was submitted on your website.</p><div style="border:1px solid #eee;background:#fafafa;padding:18px;margin:20px 0"><p><b>Order:</b> ${esc(order.id || '')}</p><p><b>Customer:</b> ${esc(order.customer || '')}<br><b>Email:</b> ${esc(order.email || '')}<br><b>Phone:</b> ${esc(order.phone || '')}</p><p style="font-size:20px"><b>Total:</b> ${money(order.total || 0)}</p></div><p>Open the admin dashboard to confirm, pack, or update the order status.</p>`);
    } else {
      return json(400, { ok:false, error:'Unknown email type.' });
    }

    const provider = await send({to: recipient, subject, html});
    return json(200, { ok:true, provider });
  } catch(error) {
    return json(500, { ok:false, error: error.message || String(error) });
  }
};
