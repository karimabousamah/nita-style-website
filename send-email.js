exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL || 'Nita Style <onboarding@resend.dev>';
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'karim.abousamah1@gmail.com';

  if (!RESEND_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ ok:false, error:'Missing RESEND_API_KEY environment variable.' }) };
  }

  let data;
  try { data = JSON.parse(event.body || '{}'); }
  catch (error) { return { statusCode: 400, body: JSON.stringify({ ok:false, error:'Invalid JSON body.' }) }; }

  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const money = (value) => '$' + Number(value || 0).toFixed(2);
  const type = String(data.type || '').trim();
  const to = String(data.to || '').trim().toLowerCase();

  const send = async ({ to, subject, html }) => {
    if (!to || !/^\S+@\S+\.\S+$/.test(to)) throw new Error('Valid recipient email is required.');
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ from: FROM_EMAIL, to, subject, html })
    });
    const body = await response.text();
    if (!response.ok) throw new Error(body);
    return body;
  };

  const shell = (title, content) => `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.55;max-width:680px;margin:0 auto;padding:32px;background:#fff">
      <h1 style="font-size:36px;letter-spacing:-1px;margin:0 0 24px;font-weight:400">Nita Style</h1>
      <h2 style="font-size:22px;margin:0 0 18px;text-transform:uppercase;letter-spacing:1px">${title}</h2>
      ${content}
      <p style="font-size:12px;color:#777;margin-top:34px;border-top:1px solid #eee;padding-top:16px">This is an automated Nita Style email.</p>
    </div>`;

  try {
    let subject = '';
    let html = '';

    if (type === 'verification') {
      const code = escapeHtml(data.code || '');
      subject = 'Your Nita Style verification code';
      html = shell('Verify your email', `
        <p>Use this code to complete your Nita Style account sign up:</p>
        <div style="border:1px solid #111;padding:18px;text-align:center;font-size:32px;font-weight:800;letter-spacing:6px;margin:22px 0">${code}</div>
        <p>This code is for your account verification. Do not share it with anyone.</p>`);
    }

    else if (type === 'discount' || type === 'signup_discount') {
      const code = escapeHtml(data.code || 'NITA10');
      subject = 'Your Nita Style first-order code';
      html = shell('Your first-order code', `
        <p>Thank you for joining Nita Style.</p>
        <p>Your one-time first-order discount code is:</p>
        <div style="border:1px solid #111;padding:18px;text-align:center;font-size:30px;font-weight:800;letter-spacing:4px;margin:22px 0">${code}</div>
        <p>Use it at checkout for 10% off your first order.</p>`);
    }

    else if (type === 'order_confirmation') {
      const order = data.order || {};
      const items = Array.isArray(order.items) ? order.items : [];
      const rows = items.map(item => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #eee"><b>${escapeHtml(item.name || 'Product')}</b><br><span style="color:#777">Size ${escapeHtml(item.size || '')} × ${Number(item.qty || 1)}</span></td>
          <td style="padding:12px 0;border-bottom:1px solid #eee;text-align:right">${money(item.total || (Number(item.price || 0) * Number(item.qty || 1)))}</td>
        </tr>`).join('');
      const address = order.address || {};
      subject = `Nita Style order confirmation ${order.id || ''}`;
      html = shell('Order confirmation', `
        <p>Thank you for your order${order.customer ? ', ' + escapeHtml(order.customer) : ''}.</p>
        <p><b>Order number:</b> ${escapeHtml(order.id || '')}</p>
        <table style="width:100%;border-collapse:collapse;margin:22px 0">${rows}</table>
        <p><b>Subtotal:</b> ${money(order.subtotal || 0)}<br>
        <b>Delivery:</b> ${money(order.deliveryFee || 0)} — Aramex delivery across Lebanon, 2–3 business days<br>
        <b>Total:</b> ${money(order.total || 0)}</p>
        <p><b>Payment:</b> Cash on Delivery in USD</p>
        <p><b>Delivery address:</b><br>${escapeHtml(address.label || '')}<br>${escapeHtml(address.street || '')}, ${escapeHtml(address.building || '')}, Floor ${escapeHtml(address.floor || '')}, Apt ${escapeHtml(address.apartment || '')}<br>${escapeHtml(address.city || '')}</p>`);
    }

    else if (type === 'order_status') {
      const order = data.order || {};
      subject = `Nita Style order update ${order.id || ''}`;
      html = shell('Order status update', `
        <p>Your order status has been updated.</p>
        <p><b>Order number:</b> ${escapeHtml(order.id || '')}<br>
        <b>New status:</b> ${escapeHtml(order.status || '')}</p>
        <p>You can sign in to your Nita Style account to follow your order roadmap.</p>`);
    }

    else if (type === 'admin_order') {
      const order = data.order || {};
      subject = `New Nita Style order ${order.id || ''}`;
      html = shell('New order received', `
        <p><b>Order:</b> ${escapeHtml(order.id || '')}</p>
        <p><b>Customer:</b> ${escapeHtml(order.customer || '')}<br>
        <b>Email:</b> ${escapeHtml(order.email || '')}<br>
        <b>Phone:</b> ${escapeHtml(order.phone || '')}</p>
        <p><b>Total:</b> ${money(order.total || 0)}</p>`);
    }

    else {
      return { statusCode: 400, body: JSON.stringify({ ok:false, error:'Unknown email type.' }) };
    }

    const recipient = type === 'admin_order' ? ADMIN_EMAIL : to;
    const body = await send({ to: recipient, subject, html });
    return { statusCode: 200, body: JSON.stringify({ ok:true, provider: body }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ ok:false, error: error.message || String(error) }) };
  }
};
