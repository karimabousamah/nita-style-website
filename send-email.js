
exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL || 'Nita Style <onboarding@resend.dev>';
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'karim.abousamah1@gmail.com';

  if (!RESEND_API_KEY) {
    return { statusCode: 500, body: 'Missing RESEND_API_KEY environment variable.' };
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch (error) {
    return { statusCode: 400, body: 'Invalid JSON body.' };
  }

  const to = String(data.to || '').trim().toLowerCase();
  if (!to || !/^\S+@\S+\.\S+$/.test(to)) {
    return { statusCode: 400, body: 'Valid recipient email is required.' };
  }

  let subject = '';
  let html = '';

  if (data.type === 'discount') {
    const code = data.code || 'NITA10';
    subject = 'Your Nita Style first-order code';
    html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:620px;margin:auto;padding:30px">
        <h1 style="font-size:34px;margin:0 0 12px">Nita Style</h1>
        <p>Thank you for joining Nita Style.</p>
        <p>Your one-time first-order code is:</p>
        <div style="border:1px solid #111;padding:18px;text-align:center;font-size:28px;font-weight:800;letter-spacing:4px;margin:22px 0">${code}</div>
        <p>Use it at checkout for 10% off your first order.</p>
      </div>`;
  } else if (data.type === 'order_confirmation') {
    const order = data.order || {};
    const products = data.products || [];
    const items = (order.items || []).map(item => {
      const product = products.find(p => p.id === item.id) || {};
      const price = Number(product.salePrice || product.price || 0) * Number(item.qty || 1);
      return `<tr><td style="padding:10px;border-bottom:1px solid #eee">${product.name || 'Product'}<br><small>Size ${item.size || ''} × ${item.qty || 1}</small></td><td style="padding:10px;border-bottom:1px solid #eee;text-align:right">$${price.toFixed(2)}</td></tr>`;
    }).join('');
    const address = order.address || {};
    subject = `Nita Style order confirmation ${order.id || ''}`;
    html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:680px;margin:auto;padding:30px">
        <h1 style="font-size:34px;margin:0 0 12px">Nita Style</h1>
        <p>Thank you for your order${order.customer ? ', ' + order.customer : ''}.</p>
        <p><b>Order number:</b> ${order.id || ''}</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0">${items}</table>
        <p><b>Total:</b> $${Number(order.total || 0).toFixed(2)}</p>
        <p><b>Payment:</b> Cash on delivery</p>
        <p><b>Delivery address:</b><br>
          ${address.street || ''}, ${address.building || ''}, Floor ${address.floor || ''}, Apt ${address.apartment || ''}<br>
          ${address.city || ''}${address.landmark ? '<br>Landmark: ' + address.landmark : ''}
        </p>
        <p>We received your order and will contact you to confirm delivery.</p>
      </div>`;
  } else {
    return { statusCode: 400, body: 'Unknown email type.' };
  }

  const customerEmail = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html })
  });

  const customerBody = await customerEmail.text();
  if (!customerEmail.ok) {
    return { statusCode: customerEmail.status, body: customerBody };
  }

  if (data.type === 'order_confirmation') {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Nita Style order ${data.order?.id || ''}`,
        html
      })
    });
  }

  return { statusCode: 200, body: customerBody };
};
