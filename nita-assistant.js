/* === NITA STYLE AI ASSISTANT ONLY === */
(function(){
  const STEPS=['order submitted','confirmed','packing','out for delivery','delivered'];
  const quick=['Track my order','Find a product','Gift under $100','Gift under $200','New arrivals','Shipping & delivery','Size help','Return policy'];
  const $=(s,r=document)=>r.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  function read(key, fallback){try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch{return fallback}}
  function products(){try{return (typeof getProducts==='function'?getProducts():read('nitaProducts',[]))||[]}catch{return read('nitaProducts',[])}}
  function user(){return read('nitaUser',null)||window.currentUser||null}
  function orders(){return read('nitaOrders',[])}
  function money(v){return '$'+Number(v||0).toFixed(2)}
  function create(){
    if($('#nitaAiShell'))return;
    document.body.insertAdjacentHTML('beforeend',`<button class="nita-ai-launcher" id="nitaAiLauncher" aria-label="Open Nita Style assistant"><span class="nita-ai-launcher-dot"></span><span>AI Assistant</span></button><section class="nita-ai-shell" id="nitaAiShell" aria-label="Nita Style assistant"><div class="nita-ai-head"><div class="nita-ai-brand"><div class="nita-ai-logo"><img src="assets/logo-cropped.png" alt="Nita Style"></div><div><div class="nita-ai-title">Nita Style Assistant</div><div class="nita-ai-sub">Automated styling & order help</div></div></div><button class="nita-ai-close" id="nitaAiClose" aria-label="Close assistant">×</button></div><div class="nita-ai-body" id="nitaAiBody"></div><form class="nita-ai-foot" id="nitaAiForm"><input class="nita-ai-input" id="nitaAiInput" autocomplete="off" placeholder="Ask about gifts, budgets, sizes, products..."><button class="nita-ai-send">Send</button></form><div class="nita-ai-mini">Replies are automated. For special requests, contact the Nita Style team.</div></section>`);
    $('#nitaAiLauncher').onclick=open;
    $('#nitaAiClose').onclick=close;
    $('#nitaAiForm').onsubmit=e=>{e.preventDefault(); const input=$('#nitaAiInput'); const text=input.value.trim(); if(!text)return; input.value=''; ask(text)};
    bot('Hello, I’m the Nita Style assistant. Tell me your budget, style, occasion, or size, and I’ll suggest pieces from Nita Style. I can also help with orders, delivery, returns, and contact information.');
    chips(quick);
  }
  function open(){ $('#nitaAiShell')?.classList.add('open'); setTimeout(()=>$('#nitaAiInput')?.focus(),120)}
  function close(){ $('#nitaAiShell')?.classList.remove('open')}
  function body(){return $('#nitaAiBody')}
  function scroll(){const b=body(); if(b)b.scrollTop=b.scrollHeight}
  function msg(text,who='bot'){body().insertAdjacentHTML('beforeend',`<div class="nita-ai-msg ${who}">${esc(text)}</div>`); scroll()}
  function bot(text){msg(text,'bot')}
  function chips(items){const html=items.map(x=>`<button type="button" class="nita-ai-chip" data-q="${esc(x)}"><span>${esc(x)}</span></button>`).join(''); body().insertAdjacentHTML('beforeend',`<div class="nita-ai-suggestions">${html}</div>`); body().querySelectorAll('.nita-ai-chip[data-q]').forEach(b=>b.onclick=()=>ask(b.dataset.q)); scroll()}
  function typing(){body().insertAdjacentHTML('beforeend',`<div class="nita-ai-msg bot" id="nitaAiTyping"><span class="nita-ai-typing"><span></span><span></span><span></span></span></div>`); scroll()}
  function untyping(){ $('#nitaAiTyping')?.remove() }
  function ask(text){msg(text,'user'); typing(); setTimeout(()=>{untyping(); answer(text)},300)}

  function answer(raw){
    const q=raw.toLowerCase();
    const budget=getBudget(q);
    if(/track|order|status|roadmap/.test(q)&&!/shipping/.test(q))return orderHelp();
    if(/gift|present|birthday|budget|under|less than|maximum|max|recommend|consider|suggest|choose|outfit|style|occasion/.test(q) || budget) return productHelp(q,{budget, gift:/gift|present|birthday/.test(q)});
    if(/new|latest|arrival|drop|collection/.test(q))return productHelp(q,{collection:'new arrivals'});
    if(/ship|deliver|time|arrive/.test(q))return bot('For delivery, Nita Style asks for your city, street, building/floor, phone number, and optional notes at checkout. After ordering, you can follow the roadmap from your account.');
    if(/return|refund|exchange/.test(q))return bot('For returns or exchanges, contact Nita Style as soon as possible with your order number and item details. The team will review the request based on the item condition and order information.');
    if(/size|fit|xs|small|medium|large|measure/.test(q))return bot('For sizing, choose your usual size for fitted pieces. For a more relaxed look, size up. If you are between sizes, send your measurements to Nita Style before ordering.');
    if(/contact|instagram|whatsapp|phone|support/.test(q))return bot('You can contact Nita Style through the Contact page or Instagram. For order help, include your order number, email, and phone number so the team can find your order quickly.');
    if(/discount|coupon|code|promo|10/.test(q))return bot('If there is an active sign-up discount or coupon, enter the code at checkout. Some codes are one-time use and may have start/end dates.');
    if(/dress|top|pants|jacket|bag|accessor|product|shop|find|search|price|shirt|linen|knit/.test(q))return productHelp(q,{});
    if(/hello|hi|hey|bonjour|salut/.test(q)){bot('Hi! I can help you find the right product by budget, gift idea, category, size, or order status. What are you looking for?'); return chips(quick)}
    bot('I can help you choose products by budget, gift idea, occasion, category, or size. You can also ask me about orders, shipping, returns, discounts, and contact details.'); chips(quick);
  }

  function orderHelp(){
    const u=user();
    if(!u?.email){bot('To follow your order, please sign in with the same email used at checkout. Then open Account to see the roadmap.'); chips(['Sign in','Contact Nita Style']); return;}
    const mine=orders().filter(o=>String(o.email||'').toLowerCase()===String(u.email).toLowerCase()).sort((a,b)=>String(b.id||'').localeCompare(String(a.id||'')));
    if(!mine.length){bot('I do not see an order connected to this signed-in email on this device yet. Please make sure you used the same email at checkout, or contact Nita Style with your order number.'); return;}
    const o=mine[0]; const st=String(o.status||'Order submitted'); const i=Math.max(0,STEPS.indexOf(st.toLowerCase()));
    bot(`Your latest order ${o.id||''} is currently: ${st}.
Progress: ${STEPS.slice(0,i+1).map(s=>s.toUpperCase()).join(' → ')}${i<STEPS.length-1?' → '+STEPS.slice(i+1).map(s=>s.toUpperCase()).join(' → '):''}`);
  }

  function getBudget(q){
    const m=q.match(/(?:\$|usd\s*)?(\d{2,5})(?:\s*(?:\$|usd|dollars))?/i);
    if(!m) return null;
    const n=Number(m[1]);
    return Number.isFinite(n)?n:null;
  }
  function productHelp(q,opts={}){
    const ps=products().filter(Boolean);
    if(!ps.length){bot('I could not find products yet. Please check the Shop page.'); return;}
    const words=q.split(/[^a-z0-9]+/).filter(w=>w.length>2&&!['product','search','find','shop','price','collection','want','with','what','recommend','suggest','budget','under','less','than','gift','present'].includes(w));
    let list=ps.map(p=>({p,score:scoreProduct(p,words,q,opts)}));
    if(opts.budget) list=list.filter(x=>Number(x.p.price||0)<=opts.budget);
    if(opts.collection) list=list.filter(x=>String(x.p.collection||'').toLowerCase().includes(opts.collection));
    list=list.sort((a,b)=>b.score-a.score || Number(b.p.price||0)-Number(a.p.price||0)).slice(0,4).map(x=>x.p);
    if(!list.length && opts.budget){
      const cheapest=ps.slice().sort((a,b)=>Number(a.price||0)-Number(b.price||0)).slice(0,4);
      bot(`I did not find exact matches under ${money(opts.budget)}, but here are the closest lower-price options available:`);
      return renderProducts(cheapest);
    }
    if(!list.length) list=ps.slice(0,4);
    if(opts.budget && opts.gift) bot(`For a gift under ${money(opts.budget)}, I would recommend these pieces:`);
    else if(opts.budget) bot(`Here are Nita Style pieces within your ${money(opts.budget)} budget:`);
    else if(opts.collection) bot('Here are the latest/new arrival pieces:');
    else bot('Here are pieces that match what you asked for:');
    renderProducts(list);
    chips(['Gift under $100','Gift under $200','Show dresses','Show tops','Show pants','New arrivals']);
  }
  function renderProducts(list){
    list.forEach(p=>body().insertAdjacentHTML('beforeend',`<article class="nita-ai-product"><div class="nita-ai-product-top"><strong>${esc(p.name||'Nita Style item')}</strong><span>${money(p.price)}</span></div><div class="nita-ai-product-meta">${esc(p.category||'Collection')} · ${esc(p.collection||'Nita Style')}</div><p>${esc(p.desc||'Selected Nita Style piece.')}</p><a href="product.html?id=${encodeURIComponent(p.id||'')}">Open product</a></article>`));
    scroll();
  }
  function scoreProduct(p,words,q,opts={}){
    let s=0; const hay=[p.name,p.category,p.collection,p.desc,(p.sizes||[]).join(' ')].join(' ').toLowerCase();
    words.forEach(w=>{if(hay.includes(w))s+=3});
    if(q.includes(String(p.category||'').toLowerCase()))s+=4;
    if(q.includes(String(p.collection||'').toLowerCase()))s+=3;
    if(/gift|present|birthday/.test(q) && /accessor|bag|top|shirt|dress/.test(hay))s+=2;
    if(/summer|vacation|beach/.test(q) && /summer|linen|dress|shirt/.test(hay))s+=3;
    if(/elegant|classy|formal|dinner/.test(q) && /dress|jacket|bag|elegant|refined/.test(hay))s+=3;
    if(/casual|everyday|daily/.test(q) && /everyday|pants|top|shirt|knit/.test(hay))s+=3;
    if(opts.collection && hay.includes(opts.collection))s+=5;
    return s || 1;
  }
  document.addEventListener('DOMContentLoaded',create);
})();
/* === END NITA STYLE AI ASSISTANT ONLY === */
