/* === NITA STYLE AI ASSISTANT ONLY === */
(function(){
  const STEPS=['order submitted','confirmed','packing','out for delivery','delivered'];
  const quick=['Track my order','Find a product','Shipping & delivery','Size help','Return policy','Contact Nita Style'];
  const $=(s,r=document)=>r.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  function read(key, fallback){try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch{return fallback}}
  function products(){try{return (typeof getProducts==='function'?getProducts():read('nitaProducts',[]))||[]}catch{return read('nitaProducts',[])}}
  function user(){return read('nitaUser',null)||window.currentUser||null}
  function orders(){return read('nitaOrders',[])}
  function money(v){return '$'+Number(v||0).toFixed(2)}
  function create(){
    if($('#nitaAiShell'))return;
    document.body.insertAdjacentHTML('beforeend',`<button class="nita-ai-launcher" id="nitaAiLauncher" aria-label="Open Nita Style assistant"><span class="nita-ai-launcher-dot"></span><span>Assistant</span></button><section class="nita-ai-shell" id="nitaAiShell" aria-label="Nita Style assistant"><div class="nita-ai-head"><div class="nita-ai-brand"><div class="nita-ai-logo">N</div><div><div class="nita-ai-title">Nita Style Assistant</div><div class="nita-ai-sub">Automated styling & order help</div></div></div><button class="nita-ai-close" id="nitaAiClose" aria-label="Close assistant">×</button></div><div class="nita-ai-body" id="nitaAiBody"></div><form class="nita-ai-foot" id="nitaAiForm"><input class="nita-ai-input" id="nitaAiInput" autocomplete="off" placeholder="Ask about orders, sizes, products..."><button class="nita-ai-send">Send</button></form><div class="nita-ai-mini">Replies are automated. For special requests, contact the Nita Style team.</div></section>`);
    $('#nitaAiLauncher').onclick=open;
    $('#nitaAiClose').onclick=close;
    $('#nitaAiForm').onsubmit=e=>{e.preventDefault(); const input=$('#nitaAiInput'); const text=input.value.trim(); if(!text)return; input.value=''; ask(text)};
    bot('Hello, I’m the Nita Style assistant. I can help you find products, follow your order, understand sizes, shipping, returns, and contact information.');
    chips(quick);
  }
  function open(){ $('#nitaAiShell')?.classList.add('open'); setTimeout(()=>$('#nitaAiInput')?.focus(),120)}
  function close(){ $('#nitaAiShell')?.classList.remove('open')}
  function body(){return $('#nitaAiBody')}
  function scroll(){const b=body(); if(b)b.scrollTop=b.scrollHeight}
  function msg(text,who='bot'){body().insertAdjacentHTML('beforeend',`<div class="nita-ai-msg ${who}">${esc(text)}</div>`); scroll()}
  function bot(text){msg(text,'bot')}
  function chips(items){const html=items.map(x=>`<button type="button" class="nita-ai-chip" data-q="${esc(x)}">${esc(x)}</button>`).join(''); body().insertAdjacentHTML('beforeend',`<div class="nita-ai-suggestions">${html}</div>`); body().querySelectorAll('.nita-ai-chip[data-q]').forEach(b=>b.onclick=()=>ask(b.dataset.q)); scroll()}
  function typing(){body().insertAdjacentHTML('beforeend',`<div class="nita-ai-msg bot" id="nitaAiTyping"><span class="nita-ai-typing"><span></span><span></span><span></span></span></div>`); scroll()}
  function untyping(){ $('#nitaAiTyping')?.remove() }
  function ask(text){msg(text,'user'); typing(); setTimeout(()=>{untyping(); answer(text)},280)}
  function answer(raw){
    const q=raw.toLowerCase();
    if(/track|order|status|roadmap|delivery/.test(q)&&!/shipping/.test(q))return orderHelp();
    if(/ship|deliver|time|arrive/.test(q))return bot('For delivery, Nita Style asks for your city, street, building/floor, phone number, and optional notes at checkout. You can follow the order roadmap from your account after signing in.');
    if(/return|refund|exchange/.test(q))return bot('For returns or exchanges, contact Nita Style as soon as possible with your order number and the item details. The team will review the request and guide you based on the item condition and order details.');
    if(/size|fit|xs|small|medium|large|measure/.test(q))return bot('For sizing, choose your usual size for fitted pieces. For a looser look, size up. If the item has limited stock or a specific cut, send your measurements to Nita Style before ordering.');
    if(/contact|instagram|whatsapp|phone|support/.test(q))return bot('You can contact Nita Style through the Contact page or Instagram. For order help, include your order number, email, and phone number so the team can find your order quickly.');
    if(/discount|coupon|code|promo|10/.test(q))return bot('If there is an active sign-up discount or coupon, enter the code at checkout. Some codes are one-time use and may have start/end dates.');
    if(/dress|top|pants|jacket|bag|accessor|product|shop|find|search|collection|price/.test(q))return productHelp(q);
    if(/hello|hi|hey|bonjour|salut/.test(q)){bot('Hi! How can I help you today?'); return chips(quick)}
    bot('I can help with products, order tracking, delivery, sizes, returns, discounts, and contact details. What would you like to do?'); chips(quick);
  }
  function orderHelp(){
    const u=user();
    if(!u?.email){bot('To follow your order, please sign in with the same email used at checkout. Then open Account to see the roadmap.'); chips(['Sign in','Contact Nita Style']); return;}
    const mine=orders().filter(o=>String(o.email||'').toLowerCase()===String(u.email).toLowerCase()).sort((a,b)=>String(b.id||'').localeCompare(String(a.id||'')));
    if(!mine.length){bot('I do not see an order connected to this signed-in email on this device yet. Please make sure you used the same email at checkout, or contact Nita Style with your order number.'); return;}
    const o=mine[0]; const st=String(o.status||'Order submitted'); const i=Math.max(0,STEPS.indexOf(st.toLowerCase()));
    bot(`Your latest order ${o.id||''} is currently: ${st}.\nProgress: ${STEPS.slice(0,i+1).map(s=>s.toUpperCase()).join(' → ')}${i<STEPS.length-1?' → '+STEPS.slice(i+1).map(s=>s.toUpperCase()).join(' → '):''}`);
  }
  function productHelp(q){
    const ps=products();
    const words=q.split(/[^a-z0-9]+/).filter(w=>w.length>2&&!['product','search','find','shop','price','collection'].includes(w));
    let found=ps.map(p=>({p,score:scoreProduct(p,words,q)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,3).map(x=>x.p);
    if(!found.length) found=ps.slice(0,3);
    if(!found.length){bot('I could not find products yet. Please check the Shop page.'); return;}
    bot('Here are pieces that may help:');
    found.forEach(p=>body().insertAdjacentHTML('beforeend',`<div class="nita-ai-product"><strong>${esc(p.name||'Nita Style item')}</strong><div>${esc(p.category||'Collection')} · ${money(p.price)}</div><div>${esc(p.desc||'Selected Nita Style piece.')}</div><a href="product.html?id=${encodeURIComponent(p.id||'')}">View product</a></div>`)); scroll();
    chips(['Show dresses','Show tops','Show pants','New arrivals']);
  }
  function scoreProduct(p,words,q){let s=0; const hay=[p.name,p.category,p.collection,p.desc,(p.sizes||[]).join(' ')].join(' ').toLowerCase(); words.forEach(w=>{if(hay.includes(w))s+=2}); if(q.includes(String(p.category||'').toLowerCase()))s+=3; if(q.includes(String(p.collection||'').toLowerCase()))s+=2; return s}
  document.addEventListener('DOMContentLoaded',create);
})();
/* === END NITA STYLE AI ASSISTANT ONLY === */
