/* === NITA STYLE AI ASSISTANT ONLY - PREMIUM V6 VERTICAL PRODUCT CARDS === */
(function(){
  const STEPS=['order submitted','confirmed','packing','out for delivery','delivered'];
  const QUICK=['Track my order','Gift under $100','Gift under $200','New arrivals','Show dresses','Show tops','Show pants','Shipping & delivery','Size help','Return policy'];
  const STOP=new Set(['product','products','search','find','shop','price','collection','want','with','what','recommend','suggest','budget','under','less','than','gift','present','show','most','expensive','latest','new','arrival','arrivals','please','need','looking','for','the','and','you','can','have']);
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch{return fallback}};
  const money=v=>'$'+Number(v||0).toFixed(2);

  function products(){
    try{ return (typeof getProducts==='function'?getProducts():read('nitaProducts',[])) || []; }
    catch{ return read('nitaProducts',[]); }
  }
  function user(){ return read('nitaUser',null)||window.currentUser||null; }
  function users(){ return read('nitaUsersByEmail',{})||{}; }
  function orders(){ return read('nitaOrders',[]); }
  function firstName(){
    const u=user();
    const full=(u?.firstName||u?.name||u?.fullName||'').trim();
    if(full) return full.split(/\s+/)[0];
    const record=users()[String(u?.email||'').toLowerCase()]||{};
    const rec=(record.firstName||record.name||record.fullName||'').trim();
    return rec?rec.split(/\s+/)[0]:'';
  }

  function create(){
    if($('#nitaAiShell')) return;
    document.body.insertAdjacentHTML('beforeend',`
      <button class="nita-ai-launcher" id="nitaAiLauncher" aria-label="Open Nita Style assistant">
        <span class="nita-ai-launcher-dot"></span><span>AI Assistant</span>
      </button>
      <section class="nita-ai-shell" id="nitaAiShell" aria-label="Nita Style assistant">
        <div class="nita-ai-head">
          <div class="nita-ai-brand">
            <div class="nita-ai-logo"><img src="assets/logo-cropped.png" alt="Nita Style"></div>
            <div><div class="nita-ai-title">Nita Style Assistant</div><div class="nita-ai-sub">Automated styling & order help</div></div>
          </div>
          <button class="nita-ai-close" id="nitaAiClose" aria-label="Close assistant">×</button>
        </div>
        <div class="nita-ai-body" id="nitaAiBody"></div>
        <form class="nita-ai-foot" id="nitaAiForm">
          <input class="nita-ai-input" id="nitaAiInput" autocomplete="off" placeholder="Ask about gifts, budgets, sizes, products...">
          <button class="nita-ai-send" type="submit">Send</button>
        </form>
        <div class="nita-ai-mini">Replies are automated. For special requests, contact the Nita Style team.</div>
      </section>`);
    $('#nitaAiLauncher').addEventListener('click',open);
    $('#nitaAiClose').addEventListener('click',close);
    $('#nitaAiForm').addEventListener('submit',e=>{e.preventDefault();const input=$('#nitaAiInput');const text=input.value.trim();if(!text)return;input.value='';ask(text);});
    const name=firstName();
    bot(`${name?`Hey ${name}, `:'Hello, '}I’m the Nita Style assistant. Tell me your budget, style, occasion, or size, and I’ll suggest pieces from Nita Style. I can also help with orders, delivery, returns, and contact information.`);
    insertSuggestionsOnce();
    revealAfterIntro();
  }

  function revealAfterIntro(){
    const show=()=>document.body.classList.add('nita-ai-ready');
    const isHome=location.pathname==='/' || /\/index\.html?$/i.test(location.pathname) || location.pathname.split('/').pop()==='';
    if(!isHome){ setTimeout(show,650); return; }
    const alreadyShown=sessionStorage.getItem('nitaIntroShown')==='1';
    const minDelay=alreadyShown?750:2450;
    const start=Date.now();
    const check=()=>{
      const intro=$('#introLoader');
      const elapsed=Date.now()-start;
      if(elapsed>=minDelay && (!intro || intro.classList.contains('hide'))){ show(); return; }
      setTimeout(check,120);
    };
    setTimeout(check,120);
  }

  function open(){ $('#nitaAiShell')?.classList.add('open'); setTimeout(()=>$('#nitaAiInput')?.focus(),140); }
  function close(){ $('#nitaAiShell')?.classList.remove('open'); }
  function body(){ return $('#nitaAiBody'); }
  function scroll(){ const b=body(); if(b) b.scrollTo({top:b.scrollHeight,behavior:'smooth'}); }
  function msg(text,who='bot'){ body().insertAdjacentHTML('beforeend',`<div class="nita-ai-msg ${who}">${esc(text)}</div>`); scroll(); }
  function bot(text){ msg(text,'bot'); }
  function typing(){ body().insertAdjacentHTML('beforeend',`<div class="nita-ai-msg bot" id="nitaAiTyping"><span class="nita-ai-typing"><span></span><span></span><span></span></span></div>`); scroll(); }
  function untyping(){ $('#nitaAiTyping')?.remove(); }
  function ask(text){ cleanupSuggestions(); msg(text,'user'); typing(); setTimeout(()=>{untyping(); answer(text);},320); }

  function cleanupSuggestions(){
    const boxes=$$('.nita-ai-suggestion-box');
    boxes.slice(1).forEach(b=>b.remove());
  }
  function insertSuggestionsOnce(){
    cleanupSuggestions();
    if($('#nitaAiSuggestionsBox')) return;
    const html=QUICK.map(x=>`<button type="button" class="nita-ai-chip" data-q="${esc(x)}">${esc(x)}</button>`).join('');
    body().insertAdjacentHTML('beforeend',`
      <div class="nita-ai-suggestion-box" id="nitaAiSuggestionsBox">
        <button type="button" class="nita-ai-suggestion-toggle" aria-expanded="false">
          <span>Suggested questions</span><small>tap to open</small><span class="mark">+</span>
        </button>
        <div class="nita-ai-suggestions">${html}</div>
      </div>`);
    const box=$('#nitaAiSuggestionsBox');
    const toggle=box.querySelector('.nita-ai-suggestion-toggle');
    toggle.addEventListener('click',()=>{
      const open=box.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(open));
      toggle.querySelector('small').textContent=open?'tap to close':'tap to open';
      toggle.querySelector('.mark').textContent=open?'−':'+';
    });
    box.querySelectorAll('.nita-ai-chip[data-q]').forEach(b=>b.addEventListener('click',()=>ask(b.dataset.q)));
  }

  function answer(raw){
    cleanupSuggestions();
    const q=raw.toLowerCase();
    const budget=getBudget(q);
    if(/track|order|status|roadmap/.test(q)&&!/shipping|deliver/.test(q)) return orderHelp();
    if(/ship|deliver|delivery|arrive|how long|how many day|how much day|time|days/.test(q)) return bot('Delivery usually takes 2 to 4 working days after your order is confirmed. You can follow the order roadmap from your account once the order is placed.');
    if(/most expensive|highest price|priciest|luxury/.test(q)) return productHelp(q,{sort:'expensive'});
    if(/cheapest|lowest price|least expensive|low price/.test(q)) return productHelp(q,{sort:'cheap'});
    if(/new|latest|arrival|drop|collection|latest job|newest/.test(q)) return productHelp(q,{collection:'new arrivals'});
    if(/gift|present|birthday|budget|under|less than|maximum|max|recommend|consider|suggest|choose|outfit|style|occasion/.test(q) || budget) return productHelp(q,{budget,gift:/gift|present|birthday/.test(q)});
    if(/return|refund|exchange/.test(q)) return bot('For returns or exchanges, contact Nita Style as soon as possible with your order number and item details. The team will review the request based on the item condition and order information.');
    if(/size|fit|xs|small|medium|large|measure/.test(q)) return bot('For sizing, choose your usual size for fitted pieces. If you are between sizes or want a relaxed fit, size up. For exact help, send Nita Style your measurements before ordering.');
    if(/contact|instagram|whatsapp|phone|support/.test(q)) return bot('You can contact Nita Style through the Contact page or Instagram. For order help, include your order number, email, and phone number so the team can find your order quickly.');
    if(/discount|coupon|code|promo|10/.test(q)) return bot('If there is an active sign-up discount or coupon, enter the code at checkout. Some codes are one-time use and may have start and end dates.');
    if(/dress|top|pants|jacket|bag|accessor|product|shop|find|search|price|shirt|linen|knit|piece|pieces/.test(q)) return productHelp(q,{});
    if(/hello|hi|hey|bonjour|salut/.test(q)){const n=firstName(); return bot(`${n?`Hey ${n}`:'Hi'} — I can help you find the right product by budget, gift idea, category, size, or order status. What are you looking for?`);}
    bot('I can help you choose products by budget, gift idea, occasion, category, or size. You can also ask me about orders, shipping, returns, discounts, and contact details.');
  }

  function orderHelp(){
    const u=user();
    if(!u?.email) return bot('To follow your order, please sign in with the same email used at checkout. Then open Account to see your order roadmap.');
    const mine=orders().filter(o=>String(o.email||'').toLowerCase()===String(u.email).toLowerCase()).sort((a,b)=>String(b.id||'').localeCompare(String(a.id||'')));
    if(!mine.length) return bot('I do not see an order connected to this signed-in email on this device yet. Please make sure you used the same email at checkout, or contact Nita Style with your order number.');
    const o=mine[0]; const st=String(o.status||'Order submitted'); const i=Math.max(0,STEPS.indexOf(st.toLowerCase()));
    bot(`Your latest order ${o.id||''} is currently: ${st}.\nProgress: ${STEPS.slice(0,i+1).map(s=>s.toUpperCase()).join(' → ')}${i<STEPS.length-1?' → '+STEPS.slice(i+1).map(s=>s.toUpperCase()).join(' → '):''}`);
  }

  function getBudget(q){ const m=q.match(/(?:\$|usd\s*)?(\d{2,5})(?:\s*(?:\$|usd|dollars))?/i); return m?Number(m[1]):null; }
  function productHelp(q,opts={}){
    let ps=products().filter(Boolean);
    if(!ps.length) return bot('I could not find products yet. Please check the Shop page.');
    const words=q.split(/[^a-z0-9]+/).filter(w=>w.length>2&&!STOP.has(w));
    let list=ps.map((p,idx)=>({p,idx,score:scoreProduct(p,words,q,opts)}));
    if(opts.budget) list=list.filter(x=>priceOf(x.p)<=opts.budget);
    if(opts.collection) list=list.filter(x=>String(x.p.collection||'').toLowerCase().includes(opts.collection));
    if(opts.sort==='expensive') list=list.sort((a,b)=>priceOf(b.p)-priceOf(a.p));
    else if(opts.sort==='cheap') list=list.sort((a,b)=>priceOf(a.p)-priceOf(b.p));
    else list=list.sort((a,b)=>b.score-a.score || priceOf(b.p)-priceOf(a.p));
    list=list.slice(0,opts.sort?3:4).map(x=>x.p);
    if(!list.length && opts.budget){
      list=ps.slice().sort((a,b)=>priceOf(a)-priceOf(b)).slice(0,4);
      bot(`I did not find exact matches under ${money(opts.budget)}, but here are the closest lower-price options available:`);
      return renderProducts(list);
    }
    if(!list.length) list=ps.slice(0,4);
    if(opts.sort==='expensive') bot('Here are the highest-priced Nita Style pieces available now:');
    else if(opts.sort==='cheap') bot('Here are the lowest-priced Nita Style pieces available now:');
    else if(opts.budget && opts.gift) bot(`For a gift under ${money(opts.budget)}, I would recommend these pieces:`);
    else if(opts.budget) bot(`Here are Nita Style pieces within your ${money(opts.budget)} budget:`);
    else if(opts.collection) bot('Here are the latest/new arrival pieces:');
    else bot('Here are pieces that match what you asked for:');
    renderProducts(list);
  }
  function priceOf(p){ return Number(p.salePrice||p.price||0); }
  function productTitle(p){ return p.name||p.title||p.productName||'Nita Style item'; }
  function productDesc(p){ return p.desc||p.description||'Carefully selected Italian-made piece from Nita Style.'; }
  function cleanImageSrc(value){
    let src=String(value||'').trim();
    if(!src) return '';
    const urlMatch=src.match(/url\((['"]?)(.*?)\1\)/i);
    if(urlMatch) src=urlMatch[2].trim();
    src=src.replace(/^['"]|['"]$/g,'').trim();
    return src;
  }
  function productImage(p){
    const candidates=[];
    if(Array.isArray(p.photos)){
      const main=Number(p.mainPhotoIndex||0);
      if(p.photos[main]) candidates.push(p.photos[main]);
      candidates.push(...p.photos);
    }
    if(Array.isArray(p.images)) candidates.push(...p.images);
    candidates.push(p.image,p.img,p.photo,p.thumbnail,p.photoUrl,p.imageUrl);
    try{ if(typeof productMainImage==='function') candidates.push(productMainImage(p)); }catch{}
    for(const raw of candidates){
      const src=cleanImageSrc(raw);
      if(!src) continue;
      if(src.startsWith('linear-gradient')||src.startsWith('radial-gradient')) return {type:'bg',src};
      if(src.startsWith('blob:')||src.startsWith('data:')||/^https?:\/\//i.test(src)||/^assets\//i.test(src)||/\.(png|jpe?g|webp|gif|avif)(\?.*)?$/i.test(src)) return {type:'img',src};
    }
    return {type:'none',src:''};
  }
  function productUrl(p){ return `product.html?id=${encodeURIComponent(p.id||p.slug||productTitle(p))}`; }
  function renderProducts(list){
    const holder=document.createElement('div');
    holder.className='nita-ai-clean-product-grid';
    holder.setAttribute('role','list');
    holder.style.cssText='display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;width:100%;margin:4px 0 8px;align-self:stretch;';

    list.slice(0,4).forEach(p=>{
      const media=productImage(p), title=productTitle(p), url=productUrl(p);
      const card=document.createElement('a');
      card.href=url;
      card.className='nita-ai-clean-product-card';
      card.setAttribute('role','listitem');
      card.setAttribute('aria-label','Open '+title);
      card.style.cssText='display:block;text-decoration:none;background:#111;color:#fff;border-radius:18px;overflow:hidden;border:1px solid #111;box-shadow:0 18px 44px rgba(0,0,0,.14);min-width:0;transition:transform .18s ease,box-shadow .18s ease;';

      const photo=document.createElement('div');
      photo.className='nita-ai-clean-product-photo';
      photo.style.cssText='width:100%;height:170px;background:#f6f6f6;display:flex;align-items:center;justify-content:center;overflow:hidden;';
      if(media.type==='img'){
        const img=document.createElement('img');
        img.src=media.src;
        img.alt=title;
        img.loading='lazy';
        img.decoding='async';
        img.style.cssText='display:block;width:100%;height:100%;object-fit:cover;object-position:center;border:0;';
        img.onerror=()=>{ photo.innerHTML=''; const logo=document.createElement('img'); logo.src='assets/logo-cropped.png'; logo.alt='Nita Style'; logo.style.cssText='width:62%;height:auto;object-fit:contain;opacity:.85;'; photo.appendChild(logo); };
        photo.appendChild(img);
      }else if(media.type==='bg'){
        photo.style.background=media.src;
        const logo=document.createElement('img'); logo.src='assets/logo-cropped.png'; logo.alt='Nita Style'; logo.style.cssText='width:58%;height:auto;object-fit:contain;opacity:.72;'; photo.appendChild(logo);
      }else{
        const logo=document.createElement('img'); logo.src='assets/logo-cropped.png'; logo.alt='Nita Style'; logo.style.cssText='width:58%;height:auto;object-fit:contain;opacity:.72;'; photo.appendChild(logo);
      }

      const info=document.createElement('div');
      info.className='nita-ai-clean-product-info';
      info.style.cssText='padding:12px 13px 13px;background:#111;color:#fff;min-height:72px;';
      const nameEl=document.createElement('strong');
      nameEl.textContent=title;
      nameEl.style.cssText='display:block;color:#fff;font-size:13px;line-height:1.2;font-weight:900;letter-spacing:.03em;text-transform:uppercase;margin:0 0 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      const priceEl=document.createElement('span');
      priceEl.textContent=money(priceOf(p));
      priceEl.style.cssText='display:block;color:#fff;font-size:14px;line-height:1;font-weight:900;letter-spacing:.02em;';
      info.appendChild(nameEl); info.appendChild(priceEl);
      card.appendChild(photo); card.appendChild(info);
      card.addEventListener('mouseenter',()=>{card.style.transform='translateY(-3px)';card.style.boxShadow='0 24px 62px rgba(0,0,0,.20)';});
      card.addEventListener('mouseleave',()=>{card.style.transform='translateY(0)';card.style.boxShadow='0 18px 44px rgba(0,0,0,.14)';});
      holder.appendChild(card);
    });
    body().appendChild(holder);
    scroll();
  }
  function scoreProduct(p,words,q,opts={}){
    let s=0; const hay=[productTitle(p),p.category,p.collection,productDesc(p),(p.sizes||[]).join(' ')].join(' ').toLowerCase();
    words.forEach(w=>{ if(hay.includes(w)) s+=3; });
    if(q.includes(String(p.category||'').toLowerCase())) s+=4;
    if(q.includes(String(p.collection||'').toLowerCase())) s+=3;
    if(/gift|present|birthday/.test(q) && /accessor|bag|top|shirt|dress/.test(hay)) s+=2;
    if(/summer|vacation|beach/.test(q) && /summer|linen|dress|shirt/.test(hay)) s+=3;
    if(/elegant|classy|formal|dinner/.test(q) && /dress|jacket|bag|elegant|refined/.test(hay)) s+=3;
    if(/casual|everyday|daily/.test(q) && /everyday|pants|top|shirt|knit/.test(hay)) s+=3;
    if(opts.collection && hay.includes(opts.collection)) s+=5;
    return s||1;
  }
  document.addEventListener('DOMContentLoaded',create);
})();
/* === END NITA STYLE AI ASSISTANT ONLY - PREMIUM V6 VERTICAL PRODUCT CARDS === */
