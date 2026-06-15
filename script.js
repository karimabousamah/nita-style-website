const ADMIN_EMAIL='karim.abousamah1@gmail.com';
const ADMIN_EMAILS=['karim.abousamah1@gmail.com','karim.abousamah@gmail.com'];
let cart=JSON.parse(localStorage.getItem('nitaCart')||'[]');
let currentUser=JSON.parse(localStorage.getItem('nitaUser')||'null');
function $(q){return document.querySelector(q)} function $all(q){return [...document.querySelectorAll(q)]}
function money(n){return '$'+Number(n).toFixed(2)}
function saveCart(){localStorage.setItem('nitaCart',JSON.stringify(cart)); updateCartCount()}
function updateCartCount(){document.querySelectorAll('.cart-count').forEach(e=>e.textContent=cart.reduce((s,i)=>s+i.qty,0))}
function header(){
 const isAdmin = ADMIN_EMAILS.includes(currentUser?.email);
 const admin = isAdmin ? '<a class="admin-link" href="admin.html">ADMIN</a>' : '';
 return `<header class="topbar"><nav class="nav"><div class="nav-item"><a href="shop.html">SHOP</a><div class="mega compact-mega"><div class="mega-block"><h4>SHOP BY CATEGORY</h4><div class="mega-links"><a href="shop.html?cat=Dresses">Dresses</a><a href="shop.html?cat=Skirts">Skirts</a><a href="shop.html?cat=T-Shirts">T-Shirts</a><a href="shop.html?cat=Tops">Tops</a><a href="shop.html?cat=Pants">Pants</a><a href="shop.html?cat=Bags">Bags</a><a href="shop.html?cat=Scarves">Scarves</a><a href="shop.html?cat=Overalls">Overalls</a></div></div><div class="mega-block"><h4>SHOP BY EDIT</h4><div class="mega-links"><a href="collections.html">New Arrivals</a><a href="shop.html?cat=Essentials">Essentials</a><a href="shop.html?cat=Evening">Evening Pieces</a><a href="shop.html?cat=Sale">Price Drops</a></div></div></div></div><div class="nav-item"><a href="collections.html">COLLECTIONS</a><div class="mega compact-mega"><div class="mega-block"><h4>FEATURED</h4><div class="mega-links"><a href="collections.html">Latest Edit</a><a href="collections.html">Everyday Boutique</a><a href="collections.html">Minimal Essentials</a></div></div><div class="mega-block"><h4>OCCASION</h4><div class="mega-links"><a href="shop.html?cat=Daywear">Daywear</a><a href="shop.html?cat=Evening">Evening</a><a href="shop.html?cat=Accessories">Accessories</a></div></div></div></div><a href="about.html">ABOUT</a></nav><a class="brand" href="index.html"><img src="assets/logo-cropped.png" alt="Nita Style"></a><div class="actions"><button onclick="openSearch()" style="border:0;background:0;font-weight:800;cursor:pointer">SEARCH</button><a href="${currentUser?'account.html':'login.html'}">${currentUser?'ACCOUNT':'SIGN IN'}</a>${admin}<a class="liked-nav-link" href="liked.html" aria-label="Liked items" title="Liked items"><span class="heart-nav">♡</span><span class="liked-label">LIKED</span><span class="liked-count">0</span></a><button class="cart-icon-btn" aria-label="Cart" onclick="openCart()"><span class="cart-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.5 8.5h11l.8 11H5.7l.8-11Z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/></svg></span><span class="cart-count">0</span></button></div></header><aside class="search-panel" id="searchPanel"><button class="close" onclick="closeSearch()">×</button><h2>Search</h2><input class="field" id="searchInput" placeholder="Search dresses, skirts, t-shirts, tops, pants, bags..." oninput="renderSearch()"><div id="searchResults"></div></aside><aside class="cart-panel" id="cartPanel"><button class="close" onclick="closeCart()">×</button><h2>Your Cart</h2><div id="cartItems"></div><a class="btn" href="checkout.html" style="display:block;text-align:center;margin-top:20px">CHECKOUT</a></aside>`
}

function siteFooter(){return `<footer class="footer site-footer"><div><img class="footer-logo-img" src="assets/logo-cropped.png" alt="Nita Style"><p class="muted">Founded by Nicole and Tania, Nita Style curates Italian-made pieces for women who value clean silhouettes, refined textures, and effortless everyday elegance.</p></div><div><h4>Shop</h4><a href="shop.html">All products</a><a href="collections.html">Collections</a><a href="cart.html">Cart</a><a href="checkout.html">Checkout</a></div><div><h4>Support</h4><a href="contact.html">Contact</a><a href="about.html">About</a><a href="checkout.html">Cash on delivery</a><a href="checkout.html">Online payment coming soon</a><a class="footer-instagram" href="https://www.instagram.com/thenitastyle/" target="_blank" rel="noopener noreferrer" aria-label="Nita Style Instagram"><img class="footer-instagram-icon" src="assets/instagram-icon.webp" alt="Instagram"><span>thenitastyle</span></a></div><div><h4>Join the style</h4><p class="muted">Receive your first-order code and new drop updates.</p><div class="footer-newsletter"><input placeholder="Email address"><button onclick="toast('Use code NITA10 for 10% off')">SIGN UP</button></div></div></footer><div class="copyright site-footer"><span>© 2026 Nita Style. All rights reserved. <span class="footer-codeviq">Developed by CODEVIQ.</span></span><span class="footer-legal-links"><a href="privacy-policy.html">Privacy Policy</a><span>·</span><a href="terms.html">Terms and Conditions</a><span>·</span><a href="shipping.html">Shipping</a></span></div>`}

async function init(){
 await loadSharedStore();
 cart=JSON.parse(localStorage.getItem('nitaCart')||'[]');
 currentUser=JSON.parse(localStorage.getItem('nitaUser')||'null');
 const showIntro=!sessionStorage.getItem('nitaIntroShown');
 document.body.insertAdjacentHTML('afterbegin',(showIntro?introLoader():'')+header()+quickViewModal());
 document.body.classList.add('nita-ready');
 if(showIntro){sessionStorage.setItem('nitaIntroShown','1');setTimeout(()=>document.getElementById('introLoader')?.classList.add('hide'),1250);setTimeout(()=>document.getElementById('introLoader')?.remove(),1900)}
 updateCartCount(); renderCartPanel(); if(!document.querySelector('.site-footer') && !location.pathname.endsWith('admin.html')) document.body.insertAdjacentHTML('beforeend',siteFooter()); if(!localStorage.getItem('nitaPopupSeen'))setTimeout(()=>$('#signupPopup')?.classList.add('show'),1600)}
function introLoader(){return `<div id="introLoader" class="intro-loader"><img src="assets/logo-cropped.png" alt="Nita Style"></div>`}
function openSearch(){const p=$('#searchPanel'); if(p){p.classList.add('open'); document.body.classList.add('panel-open');} renderSearch();setTimeout(()=>$('#searchInput')?.focus(),100)} function closeSearch(){const p=$('#searchPanel'); if(p){p.classList.remove('open');} document.body.classList.remove('panel-open')}
function openCart(){renderCartPanel();const p=$('#cartPanel'); if(p){p.classList.add('open'); document.body.classList.add('panel-open');}} function closeCart(){const p=$('#cartPanel'); if(p){p.classList.remove('open');} document.body.classList.remove('panel-open')}
function renderSearch(){let q=($('#searchInput')?.value||'').toLowerCase();let res=getProducts().filter(p=>!q||p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q));$('#searchResults').innerHTML=res.map(p=>`<a href="product.html?id=${p.id}" style="display:grid;grid-template-columns:70px 1fr;gap:12px;padding:12px 0;border-bottom:1px solid #eee"><span style="${productMainImage(p).startsWith('data:')?'background-image:url('+productMainImage(p)+')':'background:'+productMainImage(p)};background-size:cover;background-position:center;height:82px"></span><span><b>${p.name}</b><br><span class="muted">${p.category} · ${money(p.price)}</span></span></a>`).join('')}
function productCard(p){let price=p.salePrice?`<p><span class="muted" style="text-decoration:line-through;margin-right:8px">${money(p.price)}</span><span class="price-drop">${money(p.salePrice)}</span></p>`:`<p>${money(p.price)}</p>`;return `<a class="product" href="product.html?id=${p.id}"><div class="product-img" style="background:${p.img}"></div><h3>${p.name}</h3>${price}</a>`}
function renderProducts(el='#products',list=getProducts()){let node=$(el); if(node) node.innerHTML=list.map(productCard).join('')}
function addToCart(id,size='M'){let p=getProducts().find(x=>x.id===id);let found=cart.find(i=>i.id===id&&i.size===size); if(found)found.qty++; else cart.push({id,size,qty:1}); saveCart(); toast('Added to cart')}
function renderCartPanel(){let box=$('#cartItems'); if(!box)return; if(!cart.length){box.innerHTML='<p class="muted">Your cart is empty.</p>';return} let products=getProducts(); let total=0; box.innerHTML=cart.map((i,idx)=>{let p=products.find(x=>x.id===i.id); if(!p)return''; let unit=p.salePrice||p.price; total+=unit*i.qty; return `<div style="display:grid;grid-template-columns:70px 1fr auto;gap:12px;padding:15px 0;border-bottom:1px solid #eee"><span style="${productMainImage(p).startsWith('data:')?'background-image:url('+productMainImage(p)+')':'background:'+productMainImage(p)};background-size:cover;background-position:center;height:82px"></span><div><b>${p.name}</b><br><span class="muted">${i.size} · Qty ${i.qty}</span><br>${money((p.salePrice||p.price)*i.qty)}</div><button onclick="cart.splice(${idx},1);saveCart();renderCartPanel()">×</button></div>`}).join('')+`<h3>Total ${money(total)}</h3>`}
function toast(t){let x=$('#toast')||document.body.appendChild(Object.assign(document.createElement('div'),{id:'toast',className:'toast'}));x.textContent=t;x.style.display='block';setTimeout(()=>x.style.display='none',1800)}
function popupSignup(){let email=$('#popupEmail').value.trim(); if(!email)return; localStorage.setItem('nitaPopupSeen','1'); localStorage.setItem('nitaDiscountCode','NITA10'); $('#signupPopup').classList.remove('show'); toast('Your one-time code is NITA10. Email automation can be connected when deployed.')} 
function login(){let email=$('#email').value.trim().toLowerCase(); currentUser={email}; localStorage.setItem('nitaUser',JSON.stringify(currentUser)); location.href=ADMIN_EMAILS.includes(email)?'admin.html':'index.html'}
function placeOrder(){let form=new FormData($('#checkoutForm')); let code=(form.get('coupon')||'').toUpperCase(); let products=getProducts(); let subtotal=cart.reduce((s,i)=>{let p=products.find(p=>p.id===i.id);return s+((p?.salePrice||p?.price||0)*i.qty)},0); let discount=code==='NITA10'?subtotal*.10:0; let orders=JSON.parse(localStorage.getItem('nitaOrders')||'[]'); orders.push({id:'NS'+Date.now(),date:new Date().toLocaleString(),customer:form.get('name'),phone:form.get('phone'),address:form.get('address'),payment:'Cash on Delivery',status:'New order',items:cart,total:subtotal-discount}); localStorage.setItem('nitaOrders',JSON.stringify(orders)); cart=[]; saveCart(); location.href='order-success.html'}
function protectAdmin(){if(currentUser?.email!==ADMIN_EMAIL){document.body.innerHTML=header()+`<main class="page"><h1>Admin access</h1><p>This dashboard is only available for ${ADMIN_EMAIL}.</p><a class="btn" href="login.html">SIGN IN</a></main>`;updateCartCount();return false}return true}
function renderAdmin(){if(!protectAdmin())return; let orders=JSON.parse(localStorage.getItem('nitaOrders')||'[]'); $('#orders').innerHTML=orders.map((o,i)=>`<tr><td>${o.id}</td><td>${o.customer}</td><td>${money(o.total)}</td><td><select onchange="updateOrder(${i},this.value)"><option>${o.status}</option><option>Confirmed</option><option>Out for delivery</option><option>Delivered</option><option>Cancelled</option></select></td></tr>`).join('')||'<tr><td>No orders yet</td></tr>'; $('#adminProducts').innerHTML=getProducts().map(p=>`<tr><td>${p.name}</td><td>${p.category}</td><td>${p.sizes.join(', ')}</td><td><button onclick="removeProduct('${p.id}')">Remove</button></td></tr>`).join('')}
function updateOrder(i,v){let o=JSON.parse(localStorage.getItem('nitaOrders')||'[]');o[i].status=v;localStorage.setItem('nitaOrders',JSON.stringify(o));toast('Order updated')}
function addProductAdmin(){let p=getProducts();p.push({id:'p'+Date.now(),name:$('#pname').value,price:+$('#pprice').value,category:$('#pcat').value,collection:'Admin Added',sizes:$('#psizes').value.split(',').map(s=>s.trim()).filter(Boolean),img:'linear-gradient(135deg,#fff,#ddd)',desc:$('#pdesc').value});saveProducts(p);renderAdmin();toast('Product added')}
function removeProduct(id){saveProducts(getProducts().filter(p=>p.id!==id));renderAdmin()}



// --- Professional admin product management v3: photos + full editor ---
let pendingAdminPhotos=[];
let editingPhotoBuffers={};
const ADMIN_CATEGORIES=['Dresses','Skirts','T-Shirts','Tops','Pants','Bags','Scarves','Overalls'];
const ADMIN_COLLECTIONS=['New Arrivals','Everyday Edit','Summer Pieces','Minimal Essentials','Accessories','Sale'];
const ADMIN_SIZES=['XS','S','M','L','XL','One Size'];
function renderOptions(list,current){return list.map(x=>`<option ${x===current?'selected':''}>${x}</option>`).join('')}
function renderSizeButtons(selected=[]){return ADMIN_SIZES.map(x=>`<button type="button" class="pill ${selected.includes(x)?'on':''}" onclick="this.classList.toggle('on')">${x}</button>`).join('')}
function selectedAdminSizes(root=document){return [...root.querySelectorAll('.size-picker .pill.on,#sizePicker .pill.on')].map(b=>b.textContent.trim())}
function fileListToDataUrls(files,cb){
 const arr=[...files]; if(!arr.length){cb([]);return}
 let done=0, urls=[];
 arr.forEach((file,i)=>{const r=new FileReader(); r.onload=e=>{urls[i]=e.target.result; done++; if(done===arr.length) cb(urls)}; r.readAsDataURL(file)})
}
function previewAdminPhotos(e){
 fileListToDataUrls(e.target.files,urls=>{pendingAdminPhotos=urls; const box=$('#photoPreview'); if(box) box.innerHTML=urls.map((u,i)=>`<div class="admin-thumb"><img src="${u}"><span>${i===0?'Main photo':'Photo '+(i+1)}</span></div>`).join('')})
}
function productMainImage(p){return (p.photos&&p.photos[0]) || p.img || 'linear-gradient(135deg,#fff,#ddd)'}
function productCard(p){let img=productMainImage(p);let price=p.salePrice?`<p><span class="muted" style="text-decoration:line-through;margin-right:8px">${money(p.price)}</span><span class="price-drop">${money(p.salePrice)}</span></p>`:`<p>${money(p.price)}</p>`;return `<article class="product"><a class="product-hit" href="product.html?id=${p.id}"><div class="product-img" style="${img.startsWith('data:')?'background-image:url('+img+')':'background:'+img};background-size:cover;background-position:center"></div><h3>${p.name}</h3>${price}</a><button class="quick-view-btn" type="button" onclick="event.stopPropagation();event.preventDefault();openQuickView('${p.id}')">QUICK VIEW</button></article>`}
function quickViewModal(){return `<div class="quick-modal" id="quickModal" aria-hidden="true"><div class="quick-backdrop" onclick="closeQuickView()"></div><div class="quick-dialog"><button class="quick-close" onclick="closeQuickView()">×</button><div id="quickContent"></div></div></div>`}
function openQuickView(id){let p=getProducts().find(x=>x.id===id); if(!p)return; let img=productMainImage(p); let sizes=(p.sizes||[]).map((s,i)=>`<button class="size ${i===0?'active':''}" onclick="this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${s}</button>`).join(''); let price=p.salePrice?`<span class='muted' style='text-decoration:line-through;margin-right:10px'>${money(p.price)}</span><span class='price-drop'>${money(p.salePrice)}</span>`:money(p.price); $('#quickContent').innerHTML=`<div class="quick-grid"><div class="quick-image" style="${img.startsWith('data:')?'background-image:url('+img+')':'background:'+img};background-size:cover;background-position:center"></div><div class="quick-info"><p class="muted">${p.category}</p><h2>${p.name}</h2><h3>${price}</h3><p>${p.desc||''}</p><div class="sizes">${sizes}</div><button class="btn" onclick="addToCart('${p.id}',document.querySelector('#quickContent .size.active')?.textContent||'M');closeQuickView()">ADD TO CART</button><a class="btn light" href="product.html?id=${p.id}">VIEW FULL PRODUCT</a></div></div>`; $('#quickModal').classList.add('open'); $('#quickModal').setAttribute('aria-hidden','false')}
function closeQuickView(){let m=$('#quickModal'); if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true')}}
function renderAdmin(){
 if(!protectAdmin())return;
 let orders=JSON.parse(localStorage.getItem('nitaOrders')||'[]');
 const orderBody=$('#orders');
 if(orderBody) orderBody.innerHTML=orders.map((o,i)=>`<tr><td><b>${o.id}</b><br><span class="muted">${o.date}</span></td><td>${o.customer||'-'}<br><span class="muted">${o.phone||''}</span></td><td>${money(o.total||0)}</td><td><select onchange="updateOrder(${i},this.value)"><option>${o.status}</option><option>Confirmed</option><option>Preparing</option><option>Out for delivery</option><option>Delivered</option><option>Cancelled</option></select></td></tr>`).join('')||'<tr><td colspan="4">No orders yet.</td></tr>';
 const sizePicker=$('#sizePicker'); if(sizePicker && !sizePicker.dataset.ready){sizePicker.innerHTML=renderSizeButtons(['S','M','L']); sizePicker.dataset.ready='1'}
 renderAdminProducts();
}
function addProductAdmin(){
 const name=$('#pname').value.trim(); const price=Number($('#pprice').value); if(!name||!price){toast('Add a product name and price');return}
 let products=getProducts();
 const sale=$('#psale').value===''?'':Number($('#psale').value);
 const photos=pendingAdminPhotos.slice();
 products.push({id:'p'+Date.now(),name,price,salePrice:sale,category:$('#pcat').value,collection:$('#pcollection').value,note:$('#pnote').value.trim(),sizes:selectedAdminSizes(),photos,img:photos[0]||'linear-gradient(135deg,#fff,#ddd)',desc:$('#pdesc').value.trim()||'Selected Italian apparel for a clean boutique wardrobe.'});
 saveProducts(products); pendingAdminPhotos=[]; renderAdmin(); toast('Product added'); ['pname','pprice','psale','pnote','pdesc'].forEach(id=>{let el=$('#'+id); if(el)el.value=''}); if($('#pphotos'))$('#pphotos').value=''; if($('#photoPreview'))$('#photoPreview').innerHTML='';
}
function renderAdminProducts(){
 const box=$('#adminProducts'); if(!box)return;
 box.innerHTML=getProducts().map(p=>{
  const img=productMainImage(p); const bg=img.startsWith('data:')?`background-image:url(${img})`:`background:${img}`;
  return `<div class="admin-product-card" id="edit-${p.id}"><div class="admin-product-top"><div class="admin-product-photo" style="${bg};background-size:cover;background-position:center"></div><div><div class="admin-product-name">${p.name}</div><span class="muted">${p.category} · ${money(p.price)} ${p.salePrice?`· Sale ${money(p.salePrice)}`:''}</span></div><button onclick="toggleProductEditor('${p.id}')">Edit listing</button><button onclick="removeProduct('${p.id}')">Remove</button></div><div class="product-editor" id="editor-${p.id}">${productEditorHTML(p)}</div></div>`
 }).join('')
}
function productEditorHTML(p){
 const selected=(p.sizes||[]);
 return `<div class="admin-form"><div><label>Product name</label><input class="field edit-name" value="${p.name||''}"></div><div><label>Price</label><input class="field edit-price" type="number" step="0.01" value="${p.price||0}"></div><div><label>Sale / price-drop price</label><input class="field edit-sale" type="number" step="0.01" value="${p.salePrice||''}" placeholder="Optional"></div><div><label>Section</label><select class="field edit-category">${renderOptions(ADMIN_CATEGORIES,p.category)}</select></div><div><label>Collection</label><select class="field edit-collection">${renderOptions(ADMIN_COLLECTIONS,p.collection)}</select></div><div><label>Color / style note</label><input class="field edit-note" value="${p.note||''}"></div><div class="full"><label>Photos</label><div class="photo-preview existing-photos">${(p.photos&&p.photos.length?p.photos:[p.img]).filter(Boolean).map((u,i)=>`<div class="admin-thumb"><img src="${u.startsWith('data:')?u:''}" style="${u.startsWith('data:')?'':'display:none'}"><span>${i===0?'Main photo':'Photo '+(i+1)}</span></div>`).join('')}</div><div class="upload-zone"><input type="file" accept="image/*" multiple onchange="previewEditPhotos(event,'${p.id}')"><p><b>Replace / add photos</b><br><span class="muted">Uploading new photos will replace the current product gallery when saved.</span></p></div><div class="photo-preview" id="editPreview-${p.id}"></div></div><div class="full"><label>Available sizes</label><div class="size-picker">${renderSizeButtons(selected)}</div></div><div class="full"><label>Description</label><textarea class="field edit-desc">${p.desc||''}</textarea></div></div><button class="btn" onclick="saveProductEditor('${p.id}')">SAVE PRODUCT CHANGES</button>`
}
function toggleProductEditor(id){let el=$('#editor-'+id); if(el)el.classList.toggle('open')}
function previewEditPhotos(e,id){fileListToDataUrls(e.target.files,urls=>{editingPhotoBuffers[id]=urls; const box=$('#editPreview-'+id); if(box)box.innerHTML=urls.map((u,i)=>`<div class="admin-thumb"><img src="${u}"><span>${i===0?'New main photo':'New photo '+(i+1)}</span></div>`).join('')})}
function saveProductEditor(id){
 let products=getProducts(); let p=products.find(x=>x.id===id); let root=$('#editor-'+id); if(!p||!root)return;
 p.name=root.querySelector('.edit-name').value.trim(); p.price=Number(root.querySelector('.edit-price').value); p.salePrice=root.querySelector('.edit-sale').value===''?'':Number(root.querySelector('.edit-sale').value); p.category=root.querySelector('.edit-category').value; p.collection=root.querySelector('.edit-collection').value; p.note=root.querySelector('.edit-note').value.trim(); p.desc=root.querySelector('.edit-desc').value.trim(); p.sizes=selectedAdminSizes(root); if(editingPhotoBuffers[id]?.length){p.photos=editingPhotoBuffers[id]; p.img=editingPhotoBuffers[id][0]; delete editingPhotoBuffers[id]}
 saveProducts(products); renderAdmin(); toast('Product updated')
}
function quickUpdateProduct(id,field,value){
 let products=getProducts(); let p=products.find(x=>x.id===id); if(!p)return;
 if(field==='price'||field==='salePrice') p[field]=value===''?'':Number(value);
 else if(field==='sizes') p[field]=value.split(',').map(s=>s.trim()).filter(Boolean);
 else p[field]=value;
 saveProducts(products); toast('Product updated');
}
function removeProduct(id){ if(!confirm('Remove this product?'))return; saveProducts(getProducts().filter(p=>p.id!==id)); renderAdmin(); toast('Product removed')}


// --- Checkout, one-time discount, and automatic price-drop logic ---
function discountUses(){return JSON.parse(localStorage.getItem('nitaDiscountUses')||'{}')}
function signedDiscountEmail(){return (localStorage.getItem('nitaDiscountEmail')||currentUser?.email||'').toLowerCase()}
function popupSignup(){let email=$('#popupEmail')?.value.trim().toLowerCase(); if(!email)return; localStorage.setItem('nitaPopupSeen','1'); localStorage.setItem('nitaDiscountCode','NITA10'); localStorage.setItem('nitaDiscountEmail',email); $('#signupPopup')?.classList.remove('show'); toast('Your one-time first-order code is NITA10')}
function canUseNita10(email){email=(email||signedDiscountEmail()).toLowerCase(); if(!email)return false; return !discountUses()[email]}
function renderCheckoutSummary(){
 let ps=getProducts();
 let form=document.getElementById('checkoutForm');
 let code=(form?.coupon?.value||'').trim().toUpperCase();
 let email=(form?.email?.value||signedDiscountEmail()).trim().toLowerCase();
 let subtotal=cart.reduce((s,i)=>{let p=ps.find(p=>p.id===i.id);return s+((p?.salePrice||p?.price||0)*i.qty)},0);
 let valid=code==='NITA10' && canUseNita10(email) && subtotal>0;
 let discount=valid?subtotal*.10:0;
 let items=cart.length?cart.map(i=>{let p=ps.find(x=>x.id===i.id);return `<div class="summary-line"><span><b>${p?.name||'Product'}</b><br><span class="muted">${i.size||''} × ${i.qty}</span></span><span>${money(((p?.salePrice||p?.price||0)*i.qty))}</span></div>`}).join(''):'<p class="muted">Your cart is empty.</p>';
 let msg='';
 if(code==='NITA10') msg= valid?`<p class="discount-good">First-order discount applied: -${money(discount)}</p>`:`<p class="discount-bad">This code is only valid once, on the first order for the signup email.</p>`;
 checkoutSummary.innerHTML=items+`<hr><div class="summary-line"><span>Subtotal</span><span>${money(subtotal)}</span></div>${msg}<div class="summary-total"><span>Total</span><span>${money(subtotal-discount)}</span></div>`;
}
document.addEventListener('input',e=>{if(e.target?.name==='coupon'||e.target?.name==='email') renderCheckoutSummary?.()});
function placeOrder(){
 let form=new FormData($('#checkoutForm')); let code=(form.get('coupon')||'').toUpperCase(); let email=(form.get('email')||signedDiscountEmail()).toLowerCase(); let products=getProducts();
 let subtotal=cart.reduce((s,i)=>{let p=products.find(p=>p.id===i.id);return s+((p?.salePrice||p?.price||0)*i.qty)},0);
 let uses=discountUses(); let discount=(code==='NITA10' && email && !uses[email])?subtotal*.10:0; if(discount>0){uses[email]=true;localStorage.setItem('nitaDiscountUses',JSON.stringify(uses))}
 let address={city:form.get('city'),street:form.get('street'),building:form.get('building'),floor:form.get('floor'),apartment:form.get('apartment'),notes:form.get('notes')};
 if(form.get('saveAddress')) localStorage.setItem('nitaSavedAddress',JSON.stringify(address));
 let orders=JSON.parse(localStorage.getItem('nitaOrders')||'[]');
 orders.push({id:'NS'+Date.now(),date:new Date().toLocaleString(),customer:form.get('name'),phone:form.get('phone'),email,address,payment:'Cash on Delivery',status:'New order',items:cart,subtotal,discount,total:subtotal-discount});
 localStorage.setItem('nitaOrders',JSON.stringify(orders)); cart=[]; saveCart(); location.href='order-success.html'
}
// override product card with sale badge animation
function productCard(p){let img=productMainImage(p);let hasSale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price);let price=hasSale?`<p><span class="muted" style="text-decoration:line-through;margin-right:8px">${money(p.price)}</span><span class="price-drop">${money(p.salePrice)}</span></p>`:`<p>${money(p.price)}</p>`;return `<article class="product"><a class="product-hit" href="product.html?id=${p.id}"><div class="product-img" style="${img.startsWith('data:')?'background-image:url('+img+')':'background:'+img};background-size:cover;background-position:center">${hasSale?'<span class="sale-badge">PRICE DROP</span>':''}</div><h3>${p.name}</h3>${price}</a><button class="quick-view-btn" type="button" onclick="event.stopPropagation();event.preventDefault();openQuickView('${p.id}')">QUICK VIEW</button></article>`}
function saveProductEditor(id){
 let products=getProducts(); let p=products.find(x=>x.id===id); let root=$('#editor-'+id); if(!p||!root)return;
 const oldRegular=Number(p.price||0); const enteredPrice=Number(root.querySelector('.edit-price').value); const saleInput=root.querySelector('.edit-sale').value;
 p.name=root.querySelector('.edit-name').value.trim();
 if(saleInput===''){
   if(enteredPrice>0 && enteredPrice<oldRegular){ p.salePrice=enteredPrice; p.price=oldRegular; }
   else { p.price=enteredPrice; p.salePrice=''; }
 } else { p.price=enteredPrice; p.salePrice=Number(saleInput); }
 p.category=root.querySelector('.edit-category').value; p.collection=root.querySelector('.edit-collection').value; p.note=root.querySelector('.edit-note').value.trim(); p.desc=root.querySelector('.edit-desc').value.trim(); p.sizes=selectedAdminSizes(root); if(editingPhotoBuffers[id]?.length){p.photos=editingPhotoBuffers[id]; p.img=editingPhotoBuffers[id][0]; delete editingPhotoBuffers[id]}
 saveProducts(products); renderAdmin(); toast('Product updated')
}
function productEditorHTML(p){
 const selected=(p.sizes||[]);
 return `<div class="admin-form"><div><label>Product name</label><input class="field edit-name" value="${p.name||''}"></div><div><label>Regular price</label><input class="field edit-price" type="number" step="0.01" value="${p.price||0}"><p class="first-order-mini">Lower this price and save: the website will automatically show a price drop.</p></div><div><label>Sale / price-drop price</label><input class="field edit-sale" type="number" step="0.01" value="${p.salePrice||''}" placeholder="Optional"></div><div><label>Section</label><select class="field edit-category">${renderOptions(ADMIN_CATEGORIES,p.category)}</select></div><div><label>Collection</label><select class="field edit-collection">${renderOptions(ADMIN_COLLECTIONS,p.collection)}</select></div><div><label>Color / style note</label><input class="field edit-note" value="${p.note||''}"></div><div class="full"><label>Photos</label><div class="photo-preview existing-photos">${(p.photos&&p.photos.length?p.photos:[p.img]).filter(Boolean).map((u,i)=>`<div class="admin-thumb"><img src="${u.startsWith('data:')?u:''}" style="${u.startsWith('data:')?'':'display:none'}"><span>${i===0?'Main photo':'Photo '+(i+1)}</span></div>`).join('')}</div><div class="upload-zone"><input type="file" accept="image/*" multiple onchange="previewEditPhotos(event,'${p.id}')"><p><b>Replace / add photos</b><br><span class="muted">Uploading new photos will replace the current product gallery when saved.</span></p></div><div class="photo-preview" id="editPreview-${p.id}"></div></div><div class="full"><label>Available sizes</label><div class="size-picker">${renderSizeButtons(selected)}</div></div><div class="full"><label>Description</label><textarea class="field edit-desc">${p.desc||''}</textarea></div></div><button class="btn" onclick="saveProductEditor('${p.id}')">SAVE PRODUCT CHANGES</button>`
}

// --- Required checkout fields + admin coupon manager ---
function getCoupons(){return JSON.parse(localStorage.getItem('nitaCoupons')||'[]')}
function saveCoupons(coupons){localStorage.setItem('nitaCoupons',JSON.stringify(coupons))}
function normalizeCoupon(code){return String(code||'').trim().toUpperCase().replace(/\s+/g,'')}
function couponIsLive(c){
 const today=new Date(); today.setHours(0,0,0,0);
 const start=c.start?new Date(c.start+'T00:00:00'):null;
 const end=c.end?new Date(c.end+'T23:59:59'):null;
 return c.active!==false && (!start || today>=start) && (!end || today<=end);
}
function couponUsedForEmail(c,email){email=(email||'').toLowerCase(); return !!(c.usedEmails && c.usedEmails[email])}
function validateCheckoutForm(){
 const form=document.getElementById('checkoutForm'); if(!form)return true;
 const required=['name','phone','email','city','street','building','floor','apartment'];
 let ok=true;
 required.forEach(name=>{
   const el=form.elements[name]; if(!el)return;
   const valid=el.type==='email'?el.checkValidity():!!String(el.value||'').trim();
   el.classList.toggle('invalid',!valid);
   if(!valid) ok=false;
 });
 if(!ok){toast('Please complete all required delivery details.'); const first=form.querySelector('.field.invalid'); if(first) first.focus();}
 return ok;
}
document.addEventListener('input',e=>{ if(e.target?.closest('#checkoutForm')) e.target.classList.remove('invalid') });
function calcCouponDiscount(code,email,subtotal){
 code=normalizeCoupon(code); email=(email||'').toLowerCase();
 if(!code || subtotal<=0) return {discount:0,message:''};
 if(code==='NITA10'){
   const valid=email && canUseNita10(email);
   return valid?{discount:subtotal*.10,message:`<p class="discount-good">Discount applied: -${money(subtotal*.10)}</p>`,kind:'nita10'}:{discount:0,message:`<p class="discount-bad">This coupon is not available for this email.</p>`};
 }
 const c=getCoupons().find(x=>normalizeCoupon(x.code)===code);
 if(!c) return {discount:0,message:`<p class="discount-bad">Coupon code not found.</p>`};
 if(!couponIsLive(c)) return {discount:0,message:`<p class="discount-bad">This coupon is not active.</p>`};
 if(c.oneTime && couponUsedForEmail(c,email)) return {discount:0,message:`<p class="discount-bad">This coupon has already been used by this email.</p>`};
 const discount=subtotal*(Number(c.percent||0)/100);
 return {discount,message:`<p class="discount-good">Coupon applied: -${money(discount)}</p>`,kind:'admin',coupon:c};
}
// Override checkout summary with admin coupons + one-time logic
function renderCheckoutSummary(){
 let ps=getProducts(); let form=document.getElementById('checkoutForm');
 let code=normalizeCoupon(form?.coupon?.value||''); let email=(form?.email?.value||signedDiscountEmail()).trim().toLowerCase();
 let subtotal=cart.reduce((s,i)=>{let p=ps.find(p=>p.id===i.id);return s+((p?.salePrice||p?.price||0)*i.qty)},0);
 let result=calcCouponDiscount(code,email,subtotal);
 let items=cart.length?cart.map(i=>{let p=ps.find(x=>x.id===i.id);return `<div class="summary-line"><span><b>${p?.name||'Product'}</b><br><span class="muted">${i.size||''} × ${i.qty}</span></span><span>${money(((p?.salePrice||p?.price||0)*i.qty))}</span></div>`}).join(''):'<p class="muted">Your cart is empty.</p>';
 if(checkoutSummary) checkoutSummary.innerHTML=items+`<hr><div class="summary-line"><span>Subtotal</span><span>${money(subtotal)}</span></div>${result.message}<div class="summary-total"><span>Total</span><span>${money(subtotal-result.discount)}</span></div>`;
}
function placeOrder(){
 if(!validateCheckoutForm())return;
 let form=new FormData(document.getElementById('checkoutForm')); let code=normalizeCoupon(form.get('coupon')); let email=(form.get('email')||signedDiscountEmail()).toLowerCase(); let products=getProducts();
 let subtotal=cart.reduce((s,i)=>{let p=products.find(p=>p.id===i.id);return s+((p?.salePrice||p?.price||0)*i.qty)},0);
 if(!cart.length){toast('Your cart is empty.');return;}
 let result=calcCouponDiscount(code,email,subtotal); let discount=result.discount||0;
 if(result.kind==='nita10' && discount>0){let uses=discountUses();uses[email]=true;localStorage.setItem('nitaDiscountUses',JSON.stringify(uses))}
 if(result.kind==='admin' && discount>0){let coupons=getCoupons();let c=coupons.find(x=>normalizeCoupon(x.code)===code); if(c&&c.oneTime){c.usedEmails=c.usedEmails||{};c.usedEmails[email]=true;saveCoupons(coupons)}}
 let address={city:form.get('city'),street:form.get('street'),building:form.get('building'),floor:form.get('floor'),apartment:form.get('apartment'),landmark:form.get('landmark'),preferredTime:form.get('preferredTime'),notes:form.get('notes')};
 if(form.get('saveAddress')) localStorage.setItem('nitaSavedAddress',JSON.stringify(address));
 let orders=JSON.parse(localStorage.getItem('nitaOrders')||'[]');
 orders.push({id:'NS'+Date.now(),date:new Date().toLocaleString(),customer:form.get('name'),phone:form.get('phone'),email,address,payment:'Cash on Delivery',status:'New order',items:cart,subtotal,discount,coupon:code,total:subtotal-discount});
 localStorage.setItem('nitaOrders',JSON.stringify(orders)); cart=[]; saveCart(); location.href='order-success.html';
}
function addCouponAdmin(){
 const code=normalizeCoupon(document.getElementById('couponCode')?.value); const percent=Number(document.getElementById('couponPercent')?.value||0);
 const start=document.getElementById('couponStart')?.value||''; const end=document.getElementById('couponEnd')?.value||''; const oneTime=!!document.getElementById('couponOneTime')?.checked;
 if(!code || !percent || percent<1){toast('Enter a coupon code and valid discount percent.');return}
 let coupons=getCoupons().filter(c=>normalizeCoupon(c.code)!==code);
 coupons.push({code,percent,start,end,oneTime,active:true,usedEmails:{},created:new Date().toLocaleString()}); saveCoupons(coupons);
 ['couponCode','couponPercent','couponStart','couponEnd'].forEach(id=>{let el=document.getElementById(id); if(el)el.value=''});
 renderCouponsAdmin(); toast('Coupon created');
}
function deleteCouponAdmin(code){if(!confirm('Delete this coupon code?'))return; saveCoupons(getCoupons().filter(c=>normalizeCoupon(c.code)!==normalizeCoupon(code))); renderCouponsAdmin(); toast('Coupon deleted')}
function toggleCouponAdmin(code){let coupons=getCoupons(); let c=coupons.find(x=>normalizeCoupon(x.code)===normalizeCoupon(code)); if(c){c.active=c.active===false?true:false; saveCoupons(coupons); renderCouponsAdmin();}}
function renderCouponsAdmin(){
 const box=document.getElementById('adminCoupons'); if(!box)return;
 const coupons=getCoupons();
 box.innerHTML=coupons.length?coupons.map(c=>{let live=couponIsLive(c); let used=Object.keys(c.usedEmails||{}).length; return `<div class="coupon-row"><div><span class="coupon-code-pill">${c.code}</span><div class="coupon-meta">${c.percent}% off · ${c.oneTime?'One-time per email':'Multi-use'} · ${c.start||'No start'} → ${c.end||'No end'} · Used ${used} time${used===1?'':'s'} · <span class="${live?'status-live':'status-off'}">${live?'Live':'Inactive'}</span></div></div><button class="btn" onclick="toggleCouponAdmin('${c.code}')">${c.active===false?'ACTIVATE':'PAUSE'}</button><button class="btn danger" onclick="deleteCouponAdmin('${c.code}')">DELETE</button></div>`}).join(''):'<p class="muted">No custom coupons created yet.</p>';
}
// Extend admin render to include coupons without breaking existing product/order rendering
const previousRenderAdminForCoupons = renderAdmin;
renderAdmin=function(){ previousRenderAdminForCoupons(); renderCouponsAdmin(); }


// --- Real automated email integration through Netlify Functions + Resend ---
async function sendStoreEmail(payload){
  try{
    const response = await fetch('/.netlify/functions/send-email', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if(!response.ok){
      const text = await response.text();
      console.warn('Email not sent:', text);
      return false;
    }
    return true;
  }catch(error){
    console.warn('Email service unavailable:', error);
    return false;
  }
}

// Signup popup now sends the NITA10 email automatically when deployed with RESEND_API_KEY.
popupSignup = async function(){
  const email = document.getElementById('popupEmail')?.value.trim().toLowerCase();
  if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    toast('Please enter a valid email address.');
    return;
  }
  localStorage.setItem('nitaPopupSeen','1');
  localStorage.setItem('nitaDiscountCode','NITA10');
  localStorage.setItem('nitaDiscountEmail',email);
  currentUser = currentUser || {email};
  currentUser.email = email;
  localStorage.setItem('nitaUser', JSON.stringify(currentUser));
  document.getElementById('signupPopup')?.classList.remove('show');
  toast('Your one-time code was sent to your email.');
  await sendStoreEmail({type:'discount', to:email, code:'NITA10'});
}

// Checkout now sends an order confirmation email automatically when deployed with RESEND_API_KEY.
placeOrder = async function(){
 if(!validateCheckoutForm())return;
 let form=new FormData(document.getElementById('checkoutForm')); let code=normalizeCoupon(form.get('coupon')); let email=(form.get('email')||signedDiscountEmail()).toLowerCase(); let products=getProducts();
 let subtotal=cart.reduce((s,i)=>{let p=products.find(p=>p.id===i.id);return s+((p?.salePrice||p?.price||0)*i.qty)},0);
 if(!cart.length){toast('Your cart is empty.');return;}
 let result=calcCouponDiscount(code,email,subtotal); let discount=result.discount||0;
 if(result.kind==='nita10' && discount>0){let uses=discountUses();uses[email]=true;localStorage.setItem('nitaDiscountUses',JSON.stringify(uses))}
 if(result.kind==='admin' && discount>0){let coupons=getCoupons();let c=coupons.find(x=>normalizeCoupon(x.code)===code); if(c&&c.oneTime){c.usedEmails=c.usedEmails||{};c.usedEmails[email]=true;saveCoupons(coupons)}}
 let address={city:form.get('city'),street:form.get('street'),building:form.get('building'),floor:form.get('floor'),apartment:form.get('apartment'),landmark:form.get('landmark'),preferredTime:form.get('preferredTime'),notes:form.get('notes')};
 if(form.get('saveAddress')) localStorage.setItem('nitaSavedAddress',JSON.stringify(address));
 let orders=JSON.parse(localStorage.getItem('nitaOrders')||'[]');
 const order={id:'NS'+Date.now(),date:new Date().toLocaleString(),customer:form.get('name'),phone:form.get('phone'),email,address,payment:'Cash on Delivery',status:'New order',items:cart,subtotal,discount,coupon:code,total:subtotal-discount};
 orders.push(order);
 localStorage.setItem('nitaOrders',JSON.stringify(orders));
 await sendStoreEmail({type:'order_confirmation', to:email, order, products});
 cart=[]; saveCart(); location.href='order-success.html';
}


// --- Persistent customer account system ---
function normalizeEmail(email){return String(email||'').trim().toLowerCase()}
function getUsers(){return JSON.parse(localStorage.getItem('nitaUsersByEmail')||'{}')}
function saveUsers(users){localStorage.setItem('nitaUsersByEmail', JSON.stringify(users))}
function getCurrentEmail(){return normalizeEmail(currentUser && currentUser.email)}
function ensureCurrentUserRecord(){
  if(!currentUser || !currentUser.email) return null;
  const email=normalizeEmail(currentUser.email);
  const users=getUsers();
  if(!users[email]) users[email]={email, firstName:'', lastName:'', phone:'', addresses:[], defaultAddress:null, createdAt:new Date().toISOString()};
  users[email]={...users[email], ...currentUser, email};
  saveUsers(users);
  currentUser=users[email];
  localStorage.setItem('nitaUser', JSON.stringify(currentUser));
  return currentUser;
}
function setCurrentUser(user){
  const email=normalizeEmail(user.email);
  const users=getUsers();
  const previous=users[email]||{email,addresses:[],defaultAddress:null,createdAt:new Date().toISOString()};
  users[email]={...previous,...user,email,updatedAt:new Date().toISOString()};
  saveUsers(users);
  currentUser=users[email];
  localStorage.setItem('nitaUser', JSON.stringify(currentUser));
  return currentUser;
}
function customerOrders(email){
  email=normalizeEmail(email);
  return JSON.parse(localStorage.getItem('nitaOrders')||'[]').filter(o=>normalizeEmail(o.email)===email);
}
// Override login: it now keeps the user signed in and reuses saved details.
login=function(){
  const email=normalizeEmail(document.getElementById('email')?.value);
  if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){toast('Please enter a valid email address.');return;}
  const firstName=(document.getElementById('firstName')?.value||'').trim();
  const lastName=(document.getElementById('lastName')?.value||'').trim();
  const phone=(document.getElementById('phone')?.value||'').trim();
  const users=getUsers();
  const existing=users[email]||{};
  const user=setCurrentUser({
    ...existing,
    email,
    firstName:firstName||existing.firstName||'',
    lastName:lastName||existing.lastName||'',
    phone:phone||existing.phone||'',
    addresses:existing.addresses||[],
    defaultAddress:existing.defaultAddress||null
  });
  location.href=email===ADMIN_EMAIL?'admin.html':'account.html';
}
function logoutUser(){localStorage.removeItem('nitaUser'); currentUser=null; toast('Logged out'); setTimeout(()=>location.href='index.html',500)}
function deleteAccount(){
  if(!currentUser?.email)return;
  if(!confirm('Delete this account from this website? Your old orders stay visible for store records, but your saved profile is removed.'))return;
  const email=normalizeEmail(currentUser.email); const users=getUsers(); delete users[email]; saveUsers(users); localStorage.removeItem('nitaUser'); currentUser=null; location.href='index.html';
}
function accountAddressFields(prefix='',addr={}){
  return `<div class="form-grid checkout-fields"><div><label>City</label><input class="field" id="${prefix}city" value="${addr.city||''}" placeholder="City"></div><div><label>Street name</label><input class="field" id="${prefix}street" value="${addr.street||''}" placeholder="Street name"></div><div><label>Building name / number</label><input class="field" id="${prefix}building" value="${addr.building||''}" placeholder="Building"></div><div><label>Floor</label><input class="field" id="${prefix}floor" value="${addr.floor||''}" placeholder="Floor"></div><div><label>Apartment / door</label><input class="field" id="${prefix}apartment" value="${addr.apartment||''}" placeholder="Apartment"></div><div><label>Nearby landmark</label><input class="field" id="${prefix}landmark" value="${addr.landmark||''}" placeholder="Optional"></div><div><label>Preferred delivery time</label><input class="field" id="${prefix}preferredTime" value="${addr.preferredTime||''}" placeholder="Optional"></div><div class="full"><label>Delivery notes</label><textarea class="field" id="${prefix}notes" placeholder="Optional">${addr.notes||''}</textarea></div></div>`
}
function collectAddress(prefix=''){
  return ['city','street','building','floor','apartment','landmark','preferredTime','notes'].reduce((a,k)=>{a[k]=(document.getElementById(prefix+k)?.value||'').trim();return a},{})
}
function renderAccount(){
  if(!currentUser?.email){
    document.getElementById('accountRoot').innerHTML=`<div class="card account-auth"><h1>Sign in</h1><p class="muted">Sign in to view saved details, addresses, previous orders, and ongoing orders.</p><a class="btn" href="login.html">SIGN IN</a></div>`; return;
  }
  const user=ensureCurrentUserRecord();
  const orders=customerOrders(user.email).sort((a,b)=>String(b.id).localeCompare(String(a.id)));
  const ongoing=orders.filter(o=>!['Delivered','Cancelled'].includes(o.status));
  const previous=orders.filter(o=>['Delivered','Cancelled'].includes(o.status));
  const addr=user.defaultAddress||{};
  document.getElementById('accountRoot').innerHTML=`
  <div class="account-hero"><div><p class="eyebrow">My account</p><h1>Welcome${user.firstName?' '+user.firstName:''}</h1><p class="muted">Manage your profile, saved delivery address, and orders.</p></div><button class="logout-outline-btn" type="button" onclick="logoutUser()" style="background:#fff!important;color:#111!important;border:2px solid #b00020!important;">LOG OUT</button></div>
  <div class="account-grid">
    <section class="card account-card"><h2>Personal information</h2><p class="muted">Your email is your login and cannot be edited.</p><div class="form-grid"><div><label>First name</label><input class="field" id="accFirst" value="${user.firstName||''}" placeholder="First name"></div><div><label>Last name</label><input class="field" id="accLast" value="${user.lastName||''}" placeholder="Last name"></div><div><label>Email address</label><input class="field disabled-field" value="${user.email}" disabled></div><div><label>Phone number</label><input class="field" id="accPhone" value="${user.phone||''}" placeholder="Phone number"></div></div><button class="btn" onclick="saveAccountInfo()">SAVE DETAILS</button></section>
    <section class="card account-card"><h2>Saved delivery address</h2>${accountAddressFields('accAddr_',addr)}<button class="btn" onclick="saveAccountAddress()">SAVE ADDRESS</button></section>
    <section class="card account-card full-span"><h2>Ongoing orders</h2><div class="orders-list">${accountOrdersHtml(ongoing,'No ongoing orders yet.')}</div></section>
    <section class="card account-card full-span"><h2>Previous orders</h2><div class="orders-list">${accountOrdersHtml(previous,'No previous orders yet.')}</div></section>
    <section class="card danger-zone full-span"><h2>Account control</h2><p class="muted">You can log out or delete the saved account from this browser.</p><button class="logout-outline-btn" type="button" onclick="logoutUser()" style="background:#fff!important;color:#111!important;border:2px solid #b00020!important;">LOG OUT</button><button class="btn danger" onclick="deleteAccount()">DELETE ACCOUNT</button></section>
  </div>`;
}
function accountOrdersHtml(orders,empty){
  if(!orders.length) return `<p class="muted">${empty}</p>`;
  return orders.map(o=>`<div class="account-order"><div><b>${o.id}</b><br><span class="muted">${o.date||''} · ${o.payment||'Cash on Delivery'}</span></div><div><span class="order-status">${o.status||'New order'}</span><br><b>${money(o.total||0)}</b></div></div>`).join('');
}
function saveAccountInfo(){
  if(!currentUser?.email)return;
  const user=ensureCurrentUserRecord();
  setCurrentUser({...user,firstName:document.getElementById('accFirst').value.trim(),lastName:document.getElementById('accLast').value.trim(),phone:document.getElementById('accPhone').value.trim()});
  toast('Account details saved.'); renderAccount();
}
function saveAccountAddress(){
  if(!currentUser?.email)return;
  const user=ensureCurrentUserRecord(); const address=collectAddress('accAddr_');
  setCurrentUser({...user,defaultAddress:address,addresses:[address]});
  localStorage.setItem('nitaSavedAddress',JSON.stringify(address));
  toast('Address saved.'); renderAccount();
}
function prefillCheckoutFromAccount(){
  if(!currentUser?.email) return;
  const user=ensureCurrentUserRecord(); const form=document.getElementById('checkoutForm'); if(!form)return;
  const full=[user.firstName,user.lastName].filter(Boolean).join(' ');
  if(form.elements.name && !form.elements.name.value) form.elements.name.value=full;
  if(form.elements.email && !form.elements.email.value) form.elements.email.value=user.email;
  if(form.elements.phone && !form.elements.phone.value) form.elements.phone.value=user.phone||'';
  const a=user.defaultAddress||JSON.parse(localStorage.getItem('nitaSavedAddress')||'null')||{};
  ['city','street','building','floor','apartment','landmark','preferredTime','notes'].forEach(k=>{if(form.elements[k] && !form.elements[k].value) form.elements[k].value=a[k]||''});
  if(typeof renderCheckoutSummary==='function') renderCheckoutSummary();
}
// Patch init so checkout pages can prefill after the shared header loads.
const previousInitForAccount=init;
init=function(){previousInitForAccount(); ensureCurrentUserRecord(); setTimeout(prefillCheckoutFromAccount,0)}
// Patch popup signup so it creates a saved account and sends the email.
popupSignup=async function(){
  const email=normalizeEmail(document.getElementById('popupEmail')?.value);
  if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){toast('Please enter a valid email address.');return;}
  localStorage.setItem('nitaPopupSeen','1'); localStorage.setItem('nitaDiscountCode','NITA10'); localStorage.setItem('nitaDiscountEmail',email);
  setCurrentUser({email}); document.getElementById('signupPopup')?.classList.remove('show'); toast('Your one-time code was sent to your email.');
  await sendStoreEmail({type:'discount', to:email, code:'NITA10'});
}
// Patch checkout order placement so it updates the signed-in account, saved address, and customer order history.
placeOrder=async function(){
 if(!validateCheckoutForm())return;
 let formEl=document.getElementById('checkoutForm'); let form=new FormData(formEl); let code=normalizeCoupon(form.get('coupon')); let email=normalizeEmail(form.get('email')||signedDiscountEmail()); let products=getProducts();
 let subtotal=cart.reduce((s,i)=>{let p=products.find(p=>p.id===i.id);return s+((p?.salePrice||p?.price||0)*i.qty)},0);
 if(!cart.length){toast('Your cart is empty.');return;}
 let result=calcCouponDiscount(code,email,subtotal); let discount=result.discount||0;
 if(result.kind==='nita10' && discount>0){let uses=discountUses();uses[email]=true;localStorage.setItem('nitaDiscountUses',JSON.stringify(uses))}
 if(result.kind==='admin' && discount>0){let coupons=getCoupons();let c=coupons.find(x=>normalizeCoupon(x.code)===code); if(c&&c.oneTime){c.usedEmails=c.usedEmails||{};c.usedEmails[email]=true;saveCoupons(coupons)}}
 let address={city:form.get('city'),street:form.get('street'),building:form.get('building'),floor:form.get('floor'),apartment:form.get('apartment'),landmark:form.get('landmark'),preferredTime:form.get('preferredTime'),notes:form.get('notes')};
 if(form.get('saveAddress') || currentUser?.email){localStorage.setItem('nitaSavedAddress',JSON.stringify(address));}
 if(currentUser?.email && normalizeEmail(currentUser.email)===email){
   const full=String(form.get('name')||'').trim().split(/\s+/); const firstName=currentUser.firstName||full[0]||''; const lastName=currentUser.lastName||full.slice(1).join(' ')||'';
   setCurrentUser({...ensureCurrentUserRecord(),firstName,lastName,phone:String(form.get('phone')||''),defaultAddress:address,addresses:[address]});
 }
 let orders=JSON.parse(localStorage.getItem('nitaOrders')||'[]');
 const order={id:'NS'+Date.now(),date:new Date().toLocaleString(),customer:form.get('name'),phone:form.get('phone'),email,address,payment:'Cash on Delivery',status:'New order',items:cart,subtotal,discount,coupon:code,total:subtotal-discount};
 orders.push(order); localStorage.setItem('nitaOrders',JSON.stringify(orders));
 await sendStoreEmail({type:'order_confirmation', to:email, order, products});
 cart=[]; saveCart(); location.href='order-success.html';
}


// --- Account page cleanup + admin customer list ---
function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]))}

// Override account page: remove the duplicate top-right logout button. Keep only the Account Control logout/delete buttons.
renderAccount=function(){
  if(!currentUser?.email){
    document.getElementById('accountRoot').innerHTML=`<div class="card account-auth"><h1>Sign in</h1><p class="muted">Sign in to view saved details, addresses, previous orders, and ongoing orders.</p><a class="btn" href="login.html">SIGN IN</a></div>`; return;
  }
  const user=ensureCurrentUserRecord();
  const orders=customerOrders(user.email).sort((a,b)=>String(b.id).localeCompare(String(a.id)));
  const ongoing=orders.filter(o=>!['Delivered','Cancelled'].includes(o.status));
  const previous=orders.filter(o=>['Delivered','Cancelled'].includes(o.status));
  const addr=user.defaultAddress||{};
  document.getElementById('accountRoot').innerHTML=`
  <div class="account-hero clean-account-hero"><div><p class="eyebrow">My account</p><h1>Welcome${user.firstName?' '+escapeHtml(user.firstName):''}</h1><p class="muted">Manage your profile, saved delivery address, and orders.</p></div></div>
  <div class="account-grid">
    <section class="card account-card"><h2>Personal information</h2><p class="muted">Your email is your login and cannot be edited.</p><div class="form-grid"><div><label>First name</label><input class="field" id="accFirst" value="${escapeHtml(user.firstName||'')}" placeholder="First name"></div><div><label>Last name</label><input class="field" id="accLast" value="${escapeHtml(user.lastName||'')}" placeholder="Last name"></div><div><label>Email address</label><input class="field disabled-field" value="${escapeHtml(user.email)}" disabled></div><div><label>Phone number</label><input class="field" id="accPhone" value="${escapeHtml(user.phone||'')}" placeholder="Phone number"></div></div><button class="btn" onclick="saveAccountInfo()">SAVE DETAILS</button></section>
    <section class="card account-card"><h2>Saved delivery address</h2>${accountAddressFields('accAddr_',addr)}<button class="btn" onclick="saveAccountAddress()">SAVE ADDRESS</button></section>
    <section class="card account-card full-span"><h2>Ongoing orders</h2><div class="orders-list">${accountOrdersHtml(ongoing,'No ongoing orders yet.')}</div></section>
    <section class="card account-card full-span"><h2>Previous orders</h2><div class="orders-list">${accountOrdersHtml(previous,'No previous orders yet.')}</div></section>
    <section class="card danger-zone full-span"><h2>Account control</h2><p class="muted">You can log out or delete the saved account from this website.</p><button class="logout-outline-btn" type="button" onclick="logoutUser()" style="background:#fff!important;color:#111!important;border:2px solid #b00020!important;">LOG OUT</button><button class="btn danger" onclick="deleteAccount()">DELETE ACCOUNT</button></section>
  </div>`;
}

function customerCardHtml(user){
  const orders=customerOrders(user.email);
  const addr=user.defaultAddress||{};
  const fullName=[user.firstName,user.lastName].filter(Boolean).join(' ') || 'No name saved yet';
  const addressLine=[addr.city,addr.street,addr.building,addr.floor?`Floor ${addr.floor}`:'',addr.apartment?`Apt ${addr.apartment}`:''].filter(Boolean).join(', ') || 'No delivery address saved yet';
  const lastOrder=orders.length?orders.slice().sort((a,b)=>String(b.id).localeCompare(String(a.id)))[0]:null;
  return `<div class="customer-card">
    <div class="customer-main">
      <h3>${escapeHtml(fullName)}</h3>
      <p><b>Email:</b> ${escapeHtml(user.email)}</p>
      <p><b>Phone:</b> ${escapeHtml(user.phone||'Not saved')}</p>
      <p><b>Address:</b> ${escapeHtml(addressLine)}</p>
      ${addr.landmark?`<p><b>Landmark:</b> ${escapeHtml(addr.landmark)}</p>`:''}
      ${addr.preferredTime?`<p><b>Preferred time:</b> ${escapeHtml(addr.preferredTime)}</p>`:''}
      ${addr.notes?`<p><b>Notes:</b> ${escapeHtml(addr.notes)}</p>`:''}
    </div>
    <div class="customer-stats">
      <span class="pill">${orders.length} order${orders.length===1?'':'s'}</span>
      <p class="muted">Signed up: ${user.createdAt?new Date(user.createdAt).toLocaleDateString():'Unknown'}</p>
      ${lastOrder?`<p><b>Last order:</b><br>${escapeHtml(lastOrder.id)} · ${escapeHtml(lastOrder.status||'New order')} · ${money(lastOrder.total||0)}</p>`:'<p class="muted">No orders yet.</p>'}
    </div>
  </div>`;
}
function renderAdminCustomers(){
  const box=document.getElementById('adminCustomers'); if(!box)return;
  const users=Object.values(getUsers()).sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||'')));
  box.innerHTML=users.length?users.map(customerCardHtml).join(''):'<p class="muted">No signed-up customers yet. When customers create accounts or sign up for the discount popup, they will appear here.</p>';
}

const previousRenderAdminForCustomers=renderAdmin;
renderAdmin=function(){ previousRenderAdminForCustomers(); renderAdminCustomers(); }

// --- Sold out admin + customer display override ---
function soldOutRibbon(){
  return `<div class="soldout-ribbon"><div class="soldout-track">SOLD OUT · SOLD OUT · SOLD OUT · SOLD OUT · SOLD OUT · SOLD OUT · SOLD OUT · SOLD OUT · SOLD OUT · SOLD OUT · </div></div>`;
}
function productCard(p){
  let img=productMainImage(p);
  let hasSale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price);
  let price=hasSale?`<p><span class="muted" style="text-decoration:line-through;margin-right:8px">${money(p.price)}</span><span class="price-drop">${money(p.salePrice)}</span></p>`:`<p>${money(p.price)}</p>`;
  let bg=img.startsWith('data:')?'background-image:url('+img+')':'background:'+img;
  return `<article class="product ${p.soldOut?'sold-out':''}"><a class="product-hit" href="product.html?id=${p.id}"><div class="product-img" style="${bg};background-size:cover;background-position:center">${hasSale&&!p.soldOut?'<span class="sale-badge">PRICE DROP</span>':''}${p.soldOut?soldOutRibbon():''}</div><h3>${p.name}</h3>${price}</a><button class="quick-view-btn" type="button" onclick="event.stopPropagation();event.preventDefault();openQuickView('${p.id}')">QUICK VIEW</button></article>`;
}
function openQuickView(id){
  let p=getProducts().find(x=>x.id===id); if(!p)return;
  let img=productMainImage(p); let bg=img.startsWith('data:')?'background-image:url('+img+')':'background:'+img;
  let sizes=(p.sizes||[]).map((s,i)=>`<button class="size ${i===0?'active':''}" onclick="this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${s}</button>`).join('');
  let price=p.salePrice?`<span class='muted' style='text-decoration:line-through;margin-right:10px'>${money(p.price)}</span><span class='price-drop'>${money(p.salePrice)}</span>`:money(p.price);
  $('#quickContent').innerHTML=`<div class="quick-grid"><div class="quick-image ${p.soldOut?'sold-out-img':''}" style="${bg};background-size:cover;background-position:center">${p.soldOut?soldOutRibbon():''}</div><div class="quick-info"><p class="muted">${p.category}</p><h2>${p.name}</h2>${p.soldOut?'<div class="soldout-pill">Sold out</div>':''}<h3>${price}</h3><p>${p.desc||''}</p><div class="sizes">${sizes}</div>${p.soldOut?'<button class="btn disabled" disabled>SOLD OUT</button>':`<button class="btn" onclick="addToCart('${p.id}',document.querySelector('#quickContent .size.active')?.textContent||'M');closeQuickView()">ADD TO CART</button>`}<a class="btn light" href="product.html?id=${p.id}">VIEW FULL PRODUCT</a></div></div>`;
  $('#quickModal').classList.add('open'); $('#quickModal').setAttribute('aria-hidden','false');
}
function addToCart(id,size='M'){
  let p=getProducts().find(x=>x.id===id);
  if(p?.soldOut){toast('This product is sold out.'); return;}
  let found=cart.find(i=>i.id===id&&i.size===size); if(found)found.qty++; else cart.push({id,size,qty:1}); saveCart(); toast('Added to cart');
}
function addProductAdmin(){
 const name=$('#pname').value.trim(); const price=Number($('#pprice').value); if(!name||!price){toast('Add a product name and price');return}
 let products=getProducts();
 const sale=$('#psale').value===''?'':Number($('#psale').value);
 const photos=pendingAdminPhotos.slice();
 products.push({id:'p'+Date.now(),name,price,salePrice:sale,category:$('#pcat').value,collection:$('#pcollection').value,note:$('#pnote').value.trim(),sizes:selectedAdminSizes(),photos,img:photos[0]||'linear-gradient(135deg,#fff,#ddd)',desc:$('#pdesc').value.trim()||'Selected Italian apparel for a clean boutique wardrobe.',soldOut:false});
 saveProducts(products); pendingAdminPhotos=[]; renderAdmin(); toast('Product added'); ['pname','pprice','psale','pnote','pdesc'].forEach(id=>{let el=$('#'+id); if(el)el.value=''}); if($('#pphotos'))$('#pphotos').value=''; if($('#photoPreview'))$('#photoPreview').innerHTML='';
}
function productEditorHTML(p){
 const selected=(p.sizes||[]);
 return `<div class="admin-form"><div class="full"><label class="admin-status-row"><input type="checkbox" class="edit-soldout" ${p.soldOut?'checked':''}> Mark this product as sold out</label><p class="muted">When activated, customers will see an animated scrolling SOLD OUT ribbon and cannot add this product to cart.</p></div><div><label>Product name</label><input class="field edit-name" value="${p.name||''}"></div><div><label>Regular price</label><input class="field edit-price" type="number" step="0.01" value="${p.price||0}"><p class="first-order-mini">Lower this price and save: the website will automatically show a price drop.</p></div><div><label>Sale / price-drop price</label><input class="field edit-sale" type="number" step="0.01" value="${p.salePrice||''}" placeholder="Optional"></div><div><label>Section</label><select class="field edit-category">${renderOptions(ADMIN_CATEGORIES,p.category)}</select></div><div><label>Collection</label><select class="field edit-collection">${renderOptions(ADMIN_COLLECTIONS,p.collection)}</select></div><div><label>Color / style note</label><input class="field edit-note" value="${p.note||''}"></div><div class="full"><label>Photos</label><div class="photo-preview existing-photos">${(p.photos&&p.photos.length?p.photos:[p.img]).filter(Boolean).map((u,i)=>`<div class="admin-thumb"><img src="${u.startsWith('data:')?u:''}" style="${u.startsWith('data:')?'':'display:none'}"><span>${i===0?'Main photo':'Photo '+(i+1)}</span></div>`).join('')}</div><div class="upload-zone"><input type="file" accept="image/*" multiple onchange="previewEditPhotos(event,'${p.id}')"><p><b>Replace / add photos</b><br><span class="muted">Uploading new photos will replace the current product gallery when saved.</span></p></div><div class="photo-preview" id="editPreview-${p.id}"></div></div><div class="full"><label>Available sizes</label><div class="size-picker">${renderSizeButtons(selected)}</div></div><div class="full"><label>Description</label><textarea class="field edit-desc">${p.desc||''}</textarea></div></div><button class="btn" onclick="saveProductEditor('${p.id}')">SAVE PRODUCT CHANGES</button>`;
}
function saveProductEditor(id){
 let products=getProducts(); let p=products.find(x=>x.id===id); let root=$('#editor-'+id); if(!p||!root)return;
 const oldRegular=Number(p.price||0); const enteredPrice=Number(root.querySelector('.edit-price').value); const saleInput=root.querySelector('.edit-sale').value;
 p.name=root.querySelector('.edit-name').value.trim();
 if(saleInput===''){
   if(enteredPrice>0 && enteredPrice<oldRegular){ p.salePrice=enteredPrice; p.price=oldRegular; }
   else { p.price=enteredPrice; p.salePrice=''; }
 } else { p.price=enteredPrice; p.salePrice=Number(saleInput); }
 p.category=root.querySelector('.edit-category').value; p.collection=root.querySelector('.edit-collection').value; p.note=root.querySelector('.edit-note').value.trim(); p.desc=root.querySelector('.edit-desc').value.trim(); p.sizes=selectedAdminSizes(root); p.soldOut=!!root.querySelector('.edit-soldout')?.checked;
 if(editingPhotoBuffers[id]?.length){p.photos=editingPhotoBuffers[id]; p.img=editingPhotoBuffers[id][0]; delete editingPhotoBuffers[id]}
 saveProducts(products); renderAdmin(); toast('Product updated');
}

// --- Final global saving guarantee helpers ---
function showGlobalSaveStatus(ok){
  const text = ok ? 'Saved globally. Your phone and other customers will see this update.' : 'Saved only on this device. Check Netlify Functions/deployment.';
  toast(text);
}

// Make product/admin/customer saves immediately push to the live backend, not only browser storage.
const nitaFinalSaveProducts = saveProducts;
saveProducts = function(products){
  localStorage.setItem('nitaProducts', JSON.stringify(products));
  saveSharedKeyNow('nitaProducts', products).then(showGlobalSaveStatus);
};
const nitaFinalSaveCoupons = saveCoupons;
saveCoupons = function(coupons){
  localStorage.setItem('nitaCoupons', JSON.stringify(coupons));
  saveSharedKeyNow('nitaCoupons', coupons).then(showGlobalSaveStatus);
};
const nitaFinalSaveUsers = saveUsers;
saveUsers = function(users){
  localStorage.setItem('nitaUsersByEmail', JSON.stringify(users));
  saveSharedKeyNow('nitaUsersByEmail', users);
};

async function forceRefreshFromLiveDatabase(){
  nitaStoreLoaded=false;
  await loadSharedStore();
  if(typeof renderAdmin==='function' && location.pathname.endsWith('admin.html')) renderAdmin();
  if(typeof shopPage==='function') shopPage();
  if(typeof renderProducts==='function') renderProducts('#products', getProducts());
}

// --- Final availability status system: In stock / Coming soon / Out of stock ---
function productStatusValue(p){
  if(!p) return 'in-stock';
  if(p.status) return p.status;
  if(p.soldOut) return 'out-of-stock';
  return 'in-stock';
}
function stockStatusHtml(status){
  status = status || 'in-stock';
  const labels = {'in-stock':'In stock','coming-soon':'Coming soon','out-of-stock':'Out of stock'};
  return `<div class="stock-status ${status}"><span class="stock-dot"></span><span>${labels[status]||'In stock'}</span></div>`;
}
function statusOptionsHtml(current){
  current = current || 'in-stock';
  const options = [
    ['in-stock','In stock'],
    ['coming-soon','Coming soon'],
    ['out-of-stock','Out of stock']
  ];
  return `<div class="admin-status-grid">${options.map(([value,label])=>`<label class="admin-status-option"><input type="radio" name="status-${Math.random().toString(36).slice(2)}" class="edit-status-radio" value="${value}" ${current===value?'checked':''}> ${label}</label>`).join('')}</div>`;
}
function normalizeProductStatus(p){
  p.status = productStatusValue(p);
  p.soldOut = p.status === 'out-of-stock';
  return p;
}
function productPriceHtml(p){
  const hasSale = p.salePrice!=='' && p.salePrice!=null && Number(p.salePrice)<Number(p.price);
  return hasSale ? `<p><span class="muted" style="text-decoration:line-through;margin-right:8px">${money(p.price)}</span><span class="price-drop">${money(p.salePrice)}</span></p>` : `<p>${money(p.price)}</p>`;
}
function productCard(p){
  p = normalizeProductStatus(p);
  let img=productMainImage(p);
  let hasSale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price);
  let bg=img.startsWith('data:')?'background-image:url('+img+')':'background:'+img;
  return `<article class="product status-${p.status}"><a class="product-hit" href="product.html?id=${p.id}"><div class="product-img" style="${bg};background-size:cover;background-position:center">${hasSale?'<span class="sale-badge">PRICE DROP</span>':''}</div><h3>${p.name}</h3>${productPriceHtml(p)}${stockStatusHtml(p.status)}</a><button class="quick-view-btn" type="button" onclick="event.stopPropagation();event.preventDefault();openQuickView('${p.id}')">QUICK VIEW</button></article>`;
}
function openQuickView(id){
  let p=getProducts().find(x=>x.id===id); if(!p)return; p=normalizeProductStatus(p);
  let img=productMainImage(p); let bg=img.startsWith('data:')?'background-image:url('+img+')':'background:'+img;
  let sizes=(p.sizes||[]).map((s,i)=>`<button class="size ${i===0?'active':''}" onclick="this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${s}</button>`).join('');
  let price=p.salePrice?`<span class='muted' style='text-decoration:line-through;margin-right:10px'>${money(p.price)}</span><span class='price-drop'>${money(p.salePrice)}</span>`:money(p.price);
  const canBuy = p.status === 'in-stock';
  const button = canBuy ? `<button class="btn" onclick="addToCart('${p.id}',document.querySelector('#quickContent .size.active')?.textContent||'M');closeQuickView()">ADD TO CART</button>` : `<button class="btn disabled" disabled>${p.status==='coming-soon'?'COMING SOON':'OUT OF STOCK'}</button>`;
  $('#quickContent').innerHTML=`<div class="quick-grid"><div class="quick-image" style="${bg};background-size:cover;background-position:center"></div><div class="quick-info"><p class="muted">${p.category}</p><h2>${p.name}</h2><h3>${price}</h3>${stockStatusHtml(p.status)}<p>${p.desc||''}</p><div class="sizes">${sizes}</div>${button}<a class="btn light" href="product.html?id=${p.id}">VIEW FULL PRODUCT</a></div></div>`;
  $('#quickModal').classList.add('open'); $('#quickModal').setAttribute('aria-hidden','false');
}
function addToCart(id,size='M'){
  let p=getProducts().find(x=>x.id===id);
  const status = productStatusValue(p);
  if(status==='out-of-stock'){toast('This product is out of stock.'); return;}
  if(status==='coming-soon'){toast('This product is coming soon.'); return;}
  let found=cart.find(i=>i.id===id&&i.size===size); if(found)found.qty++; else cart.push({id,size,qty:1}); saveCart(); toast('Added to cart');
}
function addProductAdmin(){
 const name=$('#pname').value.trim(); const price=Number($('#pprice').value); if(!name||!price){toast('Add a product name and price');return}
 let products=getProducts();
 const sale=$('#psale').value===''?'':Number($('#psale').value);
 const photos=pendingAdminPhotos.slice();
 const status=$('#pstatus')?.value||'in-stock';
 products.push({id:'p'+Date.now(),name,price,salePrice:sale,category:$('#pcat').value,collection:$('#pcollection').value,note:$('#pnote').value.trim(),sizes:selectedAdminSizes(),photos,img:photos[0]||'linear-gradient(135deg,#fff,#ddd)',desc:$('#pdesc').value.trim()||'Selected Italian apparel for a clean boutique wardrobe.',status,soldOut:status==='out-of-stock'});
 saveProducts(products); pendingAdminPhotos=[]; renderAdmin(); toast('Product added'); ['pname','pprice','psale','pnote','pdesc'].forEach(id=>{let el=$('#'+id); if(el)el.value=''}); if($('#pstatus'))$('#pstatus').value='in-stock'; if($('#pphotos'))$('#pphotos').value=''; if($('#photoPreview'))$('#photoPreview').innerHTML='';
}
function productEditorHTML(p){
 const selected=(p.sizes||[]); const currentStatus=productStatusValue(p);
 return `<div class="admin-form"><div class="full"><label>Product availability</label><select class="field edit-status"><option value="in-stock" ${currentStatus==='in-stock'?'selected':''}>In stock</option><option value="coming-soon" ${currentStatus==='coming-soon'?'selected':''}>Coming soon</option><option value="out-of-stock" ${currentStatus==='out-of-stock'?'selected':''}>Out of stock</option></select><p class="muted">Customers will see a clean availability label beside the price. Out of stock and coming soon products cannot be added to cart.</p></div><div><label>Product name</label><input class="field edit-name" value="${p.name||''}"></div><div><label>Regular price</label><input class="field edit-price" type="number" step="0.01" value="${p.price||0}"><p class="first-order-mini">Lower this price and save: the website will automatically show a price drop.</p></div><div><label>Sale / price-drop price</label><input class="field edit-sale" type="number" step="0.01" value="${p.salePrice||''}" placeholder="Optional"></div><div><label>Section</label><select class="field edit-category">${renderOptions(ADMIN_CATEGORIES,p.category)}</select></div><div><label>Collection</label><select class="field edit-collection">${renderOptions(ADMIN_COLLECTIONS,p.collection)}</select></div><div><label>Color / style note</label><input class="field edit-note" value="${p.note||''}"></div><div class="full"><label>Photos</label><div class="photo-preview existing-photos">${(p.photos&&p.photos.length?p.photos:[p.img]).filter(Boolean).map((u,i)=>`<div class="admin-thumb"><img src="${u.startsWith('data:')?u:''}" style="${u.startsWith('data:')?'':'display:none'}"><span>${i===0?'Main photo':'Photo '+(i+1)}</span></div>`).join('')}</div><div class="upload-zone"><input type="file" accept="image/*" multiple onchange="previewEditPhotos(event,'${p.id}')"><p><b>Replace / add photos</b><br><span class="muted">Uploading new photos will replace the current product gallery when saved.</span></p></div><div class="photo-preview" id="editPreview-${p.id}"></div></div><div class="full"><label>Available sizes</label><div class="size-picker">${renderSizeButtons(selected)}</div></div><div class="full"><label>Description</label><textarea class="field edit-desc">${p.desc||''}</textarea></div></div><button class="btn" onclick="saveProductEditor('${p.id}')">SAVE PRODUCT CHANGES</button>`;
}
function saveProductEditor(id){
 let products=getProducts(); let p=products.find(x=>x.id===id); let root=$('#editor-'+id); if(!p||!root)return;
 const oldRegular=Number(p.price||0); const enteredPrice=Number(root.querySelector('.edit-price').value); const saleInput=root.querySelector('.edit-sale').value;
 p.name=root.querySelector('.edit-name').value.trim();
 if(saleInput===''){
   if(enteredPrice>0 && enteredPrice<oldRegular){ p.salePrice=enteredPrice; p.price=oldRegular; }
   else { p.price=enteredPrice; p.salePrice=''; }
 } else { p.price=enteredPrice; p.salePrice=Number(saleInput); }
 p.category=root.querySelector('.edit-category').value; p.collection=root.querySelector('.edit-collection').value; p.note=root.querySelector('.edit-note').value.trim(); p.desc=root.querySelector('.edit-desc').value.trim(); p.sizes=selectedAdminSizes(root);
 p.status=root.querySelector('.edit-status')?.value || productStatusValue(p); p.soldOut=p.status==='out-of-stock';
 if(editingPhotoBuffers[id]?.length){p.photos=editingPhotoBuffers[id]; p.img=editingPhotoBuffers[id][0]; delete editingPhotoBuffers[id]}
 saveProducts(products); renderAdmin(); toast('Product updated');
}
function renderAdminProducts(){
 const box=$('#adminProducts'); if(!box)return;
 box.innerHTML=getProducts().map(original=>{ const p=normalizeProductStatus(original);
  const img=productMainImage(p); const bg=img.startsWith('data:')?`background-image:url(${img})`:`background:${img}`;
  return `<div class="admin-product-card" id="edit-${p.id}"><div class="admin-product-top"><div class="admin-product-photo" style="${bg};background-size:cover;background-position:center"></div><div><div class="admin-product-name">${p.name}</div><span class="muted">${p.category} · ${money(p.price)} ${p.salePrice?`· Sale ${money(p.salePrice)}`:''}</span>${stockStatusHtml(p.status)}</div><button onclick="toggleProductEditor('${p.id}')">Edit listing</button><button onclick="removeProduct('${p.id}')">Remove</button></div><div class="product-editor" id="editor-${p.id}">${productEditorHTML(p)}</div></div>`;
 }).join('');
}


// --- Final requested fixes: no intro flash, stock status beside price, quick view centered + second photo hover, checkout format ---
function productImagesForDisplay(p){
  const photos=(p.photos&&p.photos.length?p.photos:[p.img]).filter(Boolean);
  const first=photos[0]||'linear-gradient(135deg,#fff,#ddd)';
  const second=photos[1]||first;
  return {first,second};
}
function cssBgImage(u){return u&&String(u).startsWith('data:')?`background-image:url(${u})`:`background:${u||'linear-gradient(135deg,#fff,#ddd)'}`}
function productPriceStatusRow(p, tag='p'){
  return `<div class="product-price-row"><${tag}>${p.salePrice?`<span class="muted" style="text-decoration:line-through;margin-right:8px">${money(p.price)}</span><span class="price-drop">${money(p.salePrice)}</span>`:money(p.price)}</${tag}>${stockStatusHtml(productStatusValue(p))}</div>`;
}
productPriceHtml=function(p){ return productPriceStatusRow(normalizeProductStatus(p),'p'); };
productCard=function(p){
  p=normalizeProductStatus(p);
  const imgs=productImagesForDisplay(p);
  const hasSale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price);
  return `<article class="product status-${p.status}"><a class="product-hit" href="product.html?id=${p.id}"><div class="product-img">${hasSale?'<span class="sale-badge">PRICE DROP</span>':''}<span class="product-img-layer product-img-primary" style="${cssBgImage(imgs.first)}"></span><span class="product-img-layer product-img-secondary" style="${cssBgImage(imgs.second)}"></span></div><h3>${p.name}</h3>${productPriceStatusRow(p,'p')}</a><button class="quick-view-btn" type="button" onclick="event.stopPropagation();event.preventDefault();openQuickView('${p.id}')">QUICK VIEW</button></article>`;
};
openQuickView=function(id){
  let p=getProducts().find(x=>x.id===id); if(!p)return; p=normalizeProductStatus(p);
  let img=productMainImage(p); let bg=cssBgImage(img);
  let sizes=(p.sizes||[]).map((s,i)=>`<button class="size ${i===0?'active':''}" onclick="this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${s}</button>`).join('');
  const canBuy=p.status==='in-stock';
  const button=canBuy?`<button class="btn" onclick="addToCart('${p.id}',document.querySelector('#quickContent .size.active')?.textContent||'M');closeQuickView()">ADD TO CART</button>`:`<button class="btn disabled" disabled>${p.status==='coming-soon'?'COMING SOON':'OUT OF STOCK'}</button>`;
  $('#quickContent').innerHTML=`<div class="quick-grid"><div class="quick-image" style="${bg};background-size:cover;background-position:center"></div><div class="quick-info"><p class="muted">${p.category}</p><h2>${p.name}</h2>${productPriceStatusRow(p,'h3')}<p>${p.desc||''}</p><div class="sizes">${sizes}</div>${button}<a class="btn light" href="product.html?id=${p.id}">VIEW FULL PRODUCT</a></div></div>`;
  $('#quickModal').classList.add('open'); $('#quickModal').setAttribute('aria-hidden','false');
};
function getCheckoutCustomerName(form){
  const first=String(form.get('firstName')||'').trim();
  const last=String(form.get('lastName')||'').trim();
  return [first,last].filter(Boolean).join(' ') || String(form.get('name')||'').trim();
}
validateCheckoutForm=function(){
  const form=document.getElementById('checkoutForm'); if(!form)return true;
  const required=['firstName','lastName','email','address','city','phone'];
  let ok=true;
  required.forEach(name=>{const el=form.elements[name]; if(!el)return; const valid=el.type==='email'?el.checkValidity():!!String(el.value||'').trim(); el.classList.toggle('invalid',!valid); if(!valid)ok=false;});
  if(!ok){toast('Please complete all required delivery details.'); const first=form.querySelector('.field.invalid'); if(first)first.focus();}
  return ok;
};
placeOrder=async function(){
 if(!validateCheckoutForm())return;
 let formEl=document.getElementById('checkoutForm'); let form=new FormData(formEl); let code=normalizeCoupon(form.get('coupon')); let email=normalizeEmail(form.get('email')||signedDiscountEmail()); let products=getProducts();
 let subtotal=cart.reduce((s,i)=>{let p=products.find(p=>p.id===i.id);return s+((p?.salePrice||p?.price||0)*i.qty)},0);
 if(!cart.length){toast('Your cart is empty.');return;}
 let result=calcCouponDiscount(code,email,subtotal); let discount=result.discount||0;
 if(result.kind==='nita10' && discount>0){let uses=discountUses();uses[email]=true;localStorage.setItem('nitaDiscountUses',JSON.stringify(uses)); await saveSharedKeyNow('nitaDiscountUses', uses);}
 if(result.kind==='admin' && discount>0){let coupons=getCoupons();let c=coupons.find(x=>normalizeCoupon(x.code)===code); if(c&&c.oneTime){c.usedEmails=c.usedEmails||{};c.usedEmails[email]=true;saveCoupons(coupons)}}
 let address={country:form.get('country')||'Lebanon',address:form.get('address'),apartment:form.get('apartment'),city:form.get('city'),postal:form.get('postal'),phone:form.get('phone'),street:form.get('street')||'',building:form.get('building')||'',floor:form.get('floor')||'',landmark:form.get('landmark')||'',preferredTime:form.get('preferredTime')||'',notes:form.get('notes')||''};
 if(form.get('saveAddress') || currentUser?.email){localStorage.setItem('nitaSavedAddress',JSON.stringify(address));}
 if(currentUser?.email && normalizeEmail(currentUser.email)===email){setCurrentUser({...ensureCurrentUserRecord(),firstName:String(form.get('firstName')||''),lastName:String(form.get('lastName')||''),phone:String(form.get('phone')||''),defaultAddress:address,addresses:[address]});}
 let orders=JSON.parse(localStorage.getItem('nitaOrders')||'[]');
 const order={id:'NS'+Date.now(),date:new Date().toLocaleString(),customer:getCheckoutCustomerName(form),phone:form.get('phone'),email,address,payment:'Cash on Delivery',status:'New order',items:cart,subtotal,discount,coupon:code,total:subtotal-discount};
 orders.push(order); localStorage.setItem('nitaOrders',JSON.stringify(orders)); await saveSharedKeyNow('nitaOrders', orders); await sendStoreEmail({type:'order_confirmation', to:email, order, products});
 cart=[]; saveCart(); location.href='order-success.html';
};


// === NITA STYLE FINAL STABILITY PATCH ===
// This patch fixes the blank account/product/admin pages and makes the admin product editor reliable.
(function(){
  const safe = (v='') => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  window.escapeHtml = window.escapeHtml || safe;

  const baseInit = window.init;
  window.init = async function(){
    try {
      const maybe = baseInit ? baseInit() : null;
      if (maybe && typeof maybe.then === 'function') await maybe;
    } catch (err) {
      console.error('Nita init recovered:', err);
      try {
        await loadSharedStore?.();
        cart = JSON.parse(localStorage.getItem('nitaCart')||'[]');
        currentUser = JSON.parse(localStorage.getItem('nitaUser')||'null');
        if(!document.querySelector('.topbar')) document.body.insertAdjacentHTML('afterbegin', header()+quickViewModal());
        updateCartCount?.(); renderCartPanel?.();
      } catch(e){ console.error(e); }
    }
    try { ensureCurrentUserRecord?.(); prefillCheckoutFromAccount?.(); } catch(e){ console.warn(e); }
    return true;
  };

  window.productMainImage = function(p){
    if(!p) return 'linear-gradient(135deg,#fff,#ddd)';
    const photos = Array.isArray(p.photos) ? p.photos.filter(Boolean) : [];
    const idx = Math.max(0, Math.min(Number(p.mainPhotoIndex || 0), Math.max(photos.length-1,0)));
    return photos[idx] || p.img || 'linear-gradient(135deg,#fff,#ddd)';
  };
  window.productImagesForDisplay = function(p){
    const photos = Array.isArray(p?.photos) && p.photos.length ? p.photos.filter(Boolean) : [p?.img].filter(Boolean);
    const main = productMainImage(p);
    const ordered = [main, ...photos.filter(x => x !== main)];
    return { first: ordered[0] || 'linear-gradient(135deg,#fff,#ddd)', second: ordered[1] || ordered[0] || 'linear-gradient(135deg,#fff,#ddd)', all: ordered.length ? ordered : ['linear-gradient(135deg,#fff,#ddd)'] };
  };
  window.cssBgImage = function(u){ return u && String(u).startsWith('data:') ? `background-image:url(${u})` : `background:${u || 'linear-gradient(135deg,#fff,#ddd)'}`; };
  window.productStatusValue = function(p){ return p?.status || (p?.soldOut ? 'out-of-stock' : 'in-stock'); };
  window.normalizeProductStatus = function(p){ if(!p) return p; p.status = productStatusValue(p); p.soldOut = p.status === 'out-of-stock'; if(!Array.isArray(p.sizes) || !p.sizes.length) p.sizes = ['One Size']; if(!Array.isArray(p.photos)) p.photos = p.img && String(p.img).startsWith('data:') ? [p.img] : []; if(typeof p.mainPhotoIndex !== 'number') p.mainPhotoIndex = 0; return p; };
  window.stockStatusHtml = function(status){
    status = status || 'in-stock';
    const labels = {'in-stock':'In stock','coming-soon':'Coming soon','out-of-stock':'Out of stock'};
    return `<span class="stock-status ${status}"><span class="stock-dot"></span><span>${labels[status] || 'In stock'}</span></span>`;
  };
  window.productPriceStatusRow = function(p, tag='p'){
    p = normalizeProductStatus(p);
    const hasSale = p.salePrice!=='' && p.salePrice!=null && Number(p.salePrice)<Number(p.price);
    const priceHtml = hasSale ? `<span class="muted old-price">${money(p.price)}</span><span class="price-drop">${money(p.salePrice)}</span>` : money(p.price||0);
    return `<div class="product-price-row"><${tag} class="price-line">${priceHtml}</${tag}>${stockStatusHtml(p.status)}</div>`;
  };

  window.productCard = function(product){
    const p = normalizeProductStatus(product);
    const imgs = productImagesForDisplay(p);
    const hasSale = p.salePrice!=='' && p.salePrice!=null && Number(p.salePrice)<Number(p.price);
    return `<article class="product status-${p.status}">
      <a class="product-hit" href="product.html?id=${encodeURIComponent(p.id)}">
        <div class="product-img">${hasSale?'<span class="sale-badge">PRICE DROP</span>':''}<span class="product-img-layer product-img-primary" style="${cssBgImage(imgs.first)}"></span><span class="product-img-layer product-img-secondary" style="${cssBgImage(imgs.second)}"></span></div>
        <h3>${safe(p.name)}</h3>${productPriceStatusRow(p,'p')}
      </a>
      <button class="quick-view-btn" type="button" onclick="event.stopPropagation();event.preventDefault();openQuickView('${String(p.id).replace(/'/g,'\\\'')}')">QUICK VIEW</button>
    </article>`;
  };

  window.openQuickView = function(id){
    let p = getProducts().find(x=>String(x.id)===String(id)); if(!p) return; p = normalizeProductStatus(p);
    const imgs = productImagesForDisplay(p);
    const sizes = (p.sizes||['One Size']).map((s,i)=>`<button class="size ${i===0?'active':''}" onclick="this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${safe(s)}</button>`).join('');
    const canBuy = p.status === 'in-stock';
    const button = canBuy ? `<button class="btn" onclick="addToCart('${String(p.id).replace(/'/g,'\\\'')}',document.querySelector('#quickContent .size.active')?.textContent||'One Size');closeQuickView()">ADD TO CART</button>` : `<button class="btn disabled" disabled>${p.status==='coming-soon'?'COMING SOON':'OUT OF STOCK'}</button>`;
    const q = document.getElementById('quickContent'); if(!q) return;
    q.innerHTML = `<div class="quick-grid"><div class="quick-image" style="${cssBgImage(imgs.first)};background-size:cover;background-position:center"></div><div class="quick-info"><p class="muted">${safe(p.category||'')}</p><h2>${safe(p.name)}</h2>${productPriceStatusRow(p,'h3')}<p>${safe(p.desc||'')}</p><div class="sizes">${sizes}</div>${button}<a class="btn light" href="product.html?id=${encodeURIComponent(p.id)}">VIEW FULL PRODUCT</a></div></div>`;
    document.getElementById('quickModal')?.classList.add('open'); document.getElementById('quickModal')?.setAttribute('aria-hidden','false');
  };

  // Multiple photo upload with clickable main-photo selection.
  window.pendingAdminPhotos = window.pendingAdminPhotos || [];
  window.pendingAdminMainIndex = 0;
  window.editingPhotoBuffers = window.editingPhotoBuffers || {};
  window.editingMainPhotoIndex = window.editingMainPhotoIndex || {};

  function renderPhotoChooser(box, urls, mainIndex, onClickName){
    box.innerHTML = urls.map((u,i)=>`<button type="button" class="admin-thumb selectable-thumb ${i===mainIndex?'selected-main':''}" onclick="${onClickName}(${i})"><img src="${u}"><span>${i===mainIndex?'Main photo':'Photo '+(i+1)}</span></button>`).join('');
  }
  window.setPendingMainPhoto = function(i){ pendingAdminMainIndex = i; const box=document.getElementById('photoPreview'); if(box) renderPhotoChooser(box, pendingAdminPhotos, pendingAdminMainIndex, 'setPendingMainPhoto'); };
  window.previewAdminPhotos = function(e){
    fileListToDataUrls(e.target.files, urls => {
      pendingAdminPhotos = urls; pendingAdminMainIndex = 0;
      const box = document.getElementById('photoPreview'); if(box) renderPhotoChooser(box, urls, 0, 'setPendingMainPhoto');
    });
  };
  window.setEditMainPhoto = function(id,i){ editingMainPhotoIndex[id] = i; const box=document.getElementById('editPreview-'+id); if(box) renderPhotoChooser(box, editingPhotoBuffers[id]||[], i, `setEditMainPhoto.bind(null,'${String(id).replace(/'/g,'\\\'')}')`); };
  window.previewEditPhotos = function(e,id){
    fileListToDataUrls(e.target.files, urls => {
      editingPhotoBuffers[id] = urls; editingMainPhotoIndex[id] = 0;
      const box = document.getElementById('editPreview-'+id); if(box) renderPhotoChooser(box, urls, 0, `setEditMainPhoto.bind(null,'${String(id).replace(/'/g,'\\\'')}')`);
    });
  };

  window.addProductAdmin = function(){
    const name = document.getElementById('pname')?.value.trim();
    const price = Number(document.getElementById('pprice')?.value);
    if(!name || !price){ toast('Add a product name and price'); return; }
    const products = getProducts().map(normalizeProductStatus);
    const photos = (pendingAdminPhotos || []).slice();
    const mainIndex = Math.max(0, Math.min(Number(pendingAdminMainIndex||0), Math.max(photos.length-1,0)));
    const saleVal = document.getElementById('psale')?.value;
    const p = normalizeProductStatus({
      id:'p'+Date.now(), name, price, salePrice:saleVal===''?'':Number(saleVal),
      category:document.getElementById('pcat')?.value || 'Dresses',
      collection:document.getElementById('pcollection')?.value || 'New Arrivals',
      note:document.getElementById('pnote')?.value.trim() || '',
      sizes:selectedAdminSizes().length ? selectedAdminSizes() : ['One Size'],
      photos, mainPhotoIndex:mainIndex, img:photos[mainIndex] || 'linear-gradient(135deg,#fff,#ddd)',
      desc:document.getElementById('pdesc')?.value.trim() || 'A carefully selected Italian-made piece for a clean, feminine wardrobe.',
      status:document.getElementById('pstatus')?.value || 'in-stock'
    });
    products.push(p); saveProducts(products); pendingAdminPhotos=[]; pendingAdminMainIndex=0;
    ['pname','pprice','psale','pnote','pdesc'].forEach(id=>{const el=document.getElementById(id); if(el) el.value='';});
    const input=document.getElementById('pphotos'); if(input) input.value=''; const preview=document.getElementById('photoPreview'); if(preview) preview.innerHTML='';
    renderAdmin(); toast('Product added and saved.');
  };

  window.productEditorHTML = function(raw){
    const p = normalizeProductStatus(raw); const selected = p.sizes || ['One Size']; const photos = Array.isArray(p.photos)&&p.photos.length?p.photos:[p.img].filter(Boolean);
    const currentStatus = productStatusValue(p);
    return `<div class="admin-form">
      <div class="full"><label>Product availability</label><select class="field edit-status"><option value="in-stock" ${currentStatus==='in-stock'?'selected':''}>In stock</option><option value="coming-soon" ${currentStatus==='coming-soon'?'selected':''}>Coming soon</option><option value="out-of-stock" ${currentStatus==='out-of-stock'?'selected':''}>Out of stock</option></select></div>
      <div><label>Product name</label><input class="field edit-name" value="${safe(p.name||'')}"></div>
      <div><label>Regular price</label><input class="field edit-price" type="number" step="0.01" value="${Number(p.price||0)}"></div>
      <div><label>Sale / price-drop price</label><input class="field edit-sale" type="number" step="0.01" value="${p.salePrice||''}" placeholder="Optional"></div>
      <div><label>Section</label><select class="field edit-category">${renderOptions(ADMIN_CATEGORIES,p.category)}</select></div>
      <div><label>Collection</label><select class="field edit-collection">${renderOptions(ADMIN_COLLECTIONS,p.collection)}</select></div>
      <div class="full"><label>Photos</label><p class="muted">Click a photo to make it the main product photo. Uploading new photos adds/replaces the gallery when saved.</p><div class="photo-preview existing-photos">${photos.map((u,i)=>`<button type="button" class="admin-thumb selectable-thumb existing-main-${p.id} ${i===Number(p.mainPhotoIndex||0)?'selected-main':''}" onclick="document.querySelectorAll('.existing-main-${p.id}').forEach(b=>b.classList.remove('selected-main'));this.classList.add('selected-main');this.closest('.product-editor').dataset.mainIndex='${i}'"><img src="${String(u).startsWith('data:')?u:''}" style="${String(u).startsWith('data:')?'':'display:none'}"><span>${i===Number(p.mainPhotoIndex||0)?'Main photo':'Photo '+(i+1)}</span></button>`).join('')}</div><div class="upload-zone"><input type="file" accept="image/*" multiple onchange="previewEditPhotos(event,'${String(p.id).replace(/'/g,'\\\'')}')"><p><b>Add new photos</b><br><span class="muted">You can select multiple images at once.</span></p></div><div class="photo-preview" id="editPreview-${p.id}"></div></div>
      <div class="full"><label>Available sizes</label><div class="size-picker">${renderSizeButtons(selected)}</div></div>
      <div class="full"><label>Description</label><textarea class="field edit-desc">${safe(p.desc||'')}</textarea></div>
    </div><button class="btn" onclick="saveProductEditor('${String(p.id).replace(/'/g,'\\\'')}')">SAVE PRODUCT CHANGES</button>`;
  };

  window.saveProductEditor = function(id){
    const products = getProducts().map(normalizeProductStatus); const p = products.find(x=>String(x.id)===String(id)); const root = document.getElementById('editor-'+id); if(!p||!root) return;
    const oldRegular = Number(p.price||0); const enteredPrice = Number(root.querySelector('.edit-price')?.value || 0); const saleInput = root.querySelector('.edit-sale')?.value;
    p.name = root.querySelector('.edit-name')?.value.trim() || p.name;
    if(saleInput===''){ if(enteredPrice>0 && enteredPrice<oldRegular){ p.salePrice=enteredPrice; p.price=oldRegular; } else { p.price=enteredPrice; p.salePrice=''; } } else { p.price=enteredPrice; p.salePrice=Number(saleInput); }
    p.category = root.querySelector('.edit-category')?.value || p.category; p.collection = root.querySelector('.edit-collection')?.value || p.collection;
    p.desc = root.querySelector('.edit-desc')?.value.trim() || ''; p.sizes = selectedAdminSizes(root).length ? selectedAdminSizes(root) : ['One Size'];
    p.status = root.querySelector('.edit-status')?.value || productStatusValue(p); p.soldOut = p.status === 'out-of-stock';
    if(editingPhotoBuffers[id]?.length){ p.photos = editingPhotoBuffers[id]; p.mainPhotoIndex = Number(editingMainPhotoIndex[id]||0); p.img = p.photos[p.mainPhotoIndex] || p.photos[0]; delete editingPhotoBuffers[id]; delete editingMainPhotoIndex[id]; }
    else { const chosen = root.dataset.mainIndex; if(chosen !== undefined){ p.mainPhotoIndex = Number(chosen)||0; const photos = Array.isArray(p.photos)&&p.photos.length?p.photos:[p.img].filter(Boolean); p.img = photos[p.mainPhotoIndex] || photos[0] || p.img; }}
    saveProducts(products); renderAdmin(); toast('Product updated and saved.');
  };

  window.renderAdminProducts = function(){
    const box = document.getElementById('adminProducts'); if(!box) return;
    const products = getProducts().map(normalizeProductStatus);
    box.innerHTML = products.length ? products.map(p=>{
      const img = productMainImage(p);
      return `<div class="admin-product-card" id="edit-${p.id}"><div class="admin-product-top"><div class="admin-product-photo" style="${cssBgImage(img)};background-size:cover;background-position:center"></div><div><div class="admin-product-name">${safe(p.name)}</div><span class="muted">${safe(p.category||'')} · ${money(p.price||0)} ${p.salePrice?`· Sale ${money(p.salePrice)}`:''}</span><div>${stockStatusHtml(productStatusValue(p))}</div></div><button onclick="toggleProductEditor('${String(p.id).replace(/'/g,'\\\'')}')">Edit listing</button><button onclick="removeProduct('${String(p.id).replace(/'/g,'\\\'')}')">Remove</button></div><div class="product-editor" id="editor-${p.id}">${productEditorHTML(p)}</div></div>`;
    }).join('') : '<p class="muted">No products listed yet.</p>';
  };

  window.renderAdmin = function(){
    if(!protectAdmin()) return;
    const sizePicker=document.getElementById('sizePicker'); if(sizePicker && !sizePicker.dataset.ready){ sizePicker.innerHTML=renderSizeButtons(['S','M','L']); sizePicker.dataset.ready='1'; }
    const orders = JSON.parse(localStorage.getItem('nitaOrders')||'[]'); const body=document.getElementById('orders');
    if(body) body.innerHTML = orders.length ? orders.map((o,i)=>`<tr><td><b>${safe(o.id)}</b><br><span class="muted">${safe(o.date||'')}</span></td><td>${safe(o.customer||'-')}<br><span class="muted">${safe(o.email||'')} · ${safe(o.phone||'')}</span></td><td>${money(o.total||0)}</td><td><select onchange="updateOrder(${i},this.value)"><option>${safe(o.status||'New order')}</option><option>Confirmed</option><option>Preparing</option><option>Out for delivery</option><option>Delivered</option><option>Cancelled</option></select></td></tr>`).join('') : '<tr><td colspan="4">No orders yet.</td></tr>';
    renderAdminProducts(); renderAdminCustomers?.(); renderCouponsAdmin?.();
  };

  window.renderAccount = function(){
    const root = document.getElementById('accountRoot'); if(!root) return;
    currentUser = JSON.parse(localStorage.getItem('nitaUser')||'null');
    if(!currentUser?.email){ root.innerHTML = `<div class="card account-auth"><h1>Sign in</h1><p class="muted">Sign in to view your saved details, addresses, and orders.</p><a class="btn" href="login.html">SIGN IN</a></div>`; return; }
    const user = ensureCurrentUserRecord() || currentUser; const addr = user.defaultAddress || {}; const orders = customerOrders(user.email).sort((a,b)=>String(b.id).localeCompare(String(a.id)));
    const ongoing = orders.filter(o=>!['Delivered','Cancelled'].includes(o.status)); const previous = orders.filter(o=>['Delivered','Cancelled'].includes(o.status));
    root.innerHTML = `<div class="account-hero clean-account-hero"><div><p class="eyebrow">My account</p><h1>Welcome${user.firstName?' '+safe(user.firstName):''}</h1><p class="muted">Manage your profile, saved delivery address, and orders.</p></div></div><div class="account-grid"><section class="card account-card"><h2>Personal information</h2><p class="muted">Your email is your login and cannot be edited.</p><div class="form-grid"><div><label>First name</label><input class="field" id="accFirst" value="${safe(user.firstName||'')}" placeholder="First name"></div><div><label>Last name</label><input class="field" id="accLast" value="${safe(user.lastName||'')}" placeholder="Last name"></div><div><label>Email address</label><input class="field disabled-field" value="${safe(user.email)}" disabled></div><div><label>Phone number</label><input class="field" id="accPhone" value="${safe(user.phone||'')}" placeholder="Phone number"></div></div><button class="btn" onclick="saveAccountInfo()">SAVE DETAILS</button></section><section class="card account-card"><h2>Saved delivery address</h2>${accountAddressFields('accAddr_',addr)}<button class="btn" onclick="saveAccountAddress()">SAVE ADDRESS</button></section><section class="card account-card full-span"><h2>Ongoing orders</h2><div class="orders-list">${accountOrdersHtml(ongoing,'No ongoing orders yet.')}</div></section><section class="card account-card full-span"><h2>Previous orders</h2><div class="orders-list">${accountOrdersHtml(previous,'No previous orders yet.')}</div></section><section class="card danger-zone full-span"><h2>Account control</h2><button class="logout-outline-btn" type="button" onclick="logoutUser()" style="background:#fff!important;color:#111!important;border:2px solid #b00020!important;">LOG OUT</button><button class="btn danger" onclick="deleteAccount()">DELETE ACCOUNT</button></section></div>`;
  };
})();
// === END NITA STYLE FINAL STABILITY PATCH ===

// === NITA STYLE CLOUD PERSISTENCE HARD FIX ===
(function(){
  const PERSIST_KEYS = ['nitaProducts','nitaOrders','nitaCoupons','nitaUsersByEmail','nitaDiscountUses'];
  function cloudNotice(message, ok=true){
    let el = document.getElementById('cloudSaveNotice');
    if(!el){
      el = document.createElement('div');
      el.id = 'cloudSaveNotice';
      el.style.cssText = 'position:fixed;left:18px;bottom:18px;z-index:99999;padding:12px 14px;border:1px solid #111;background:#fff;color:#111;font:700 12px/1.35 Arial,sans-serif;max-width:340px;box-shadow:0 12px 30px rgba(0,0,0,.12)';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.style.borderColor = ok ? '#111' : '#b00020';
    el.style.color = ok ? '#111' : '#b00020';
    clearTimeout(el._t);
    el._t = setTimeout(()=>{ if(el) el.remove(); }, ok ? 2600 : 7000);
  }
  async function nitaFetchStore(){
    const res = await fetch('/.netlify/functions/store?ts=' + Date.now(), { cache:'no-store', headers:{'Cache-Control':'no-cache'} });
    if(!res.ok) throw new Error('Live database function returned '+res.status);
    return await res.json();
  }
  window.nitaFetchStore = nitaFetchStore;
  async function nitaSaveKeyStrict(key, value){
    if(!PERSIST_KEYS.includes(key)) return false;
    const res = await fetch('/.netlify/functions/store', {
      method:'POST',
      headers:{'Content-Type':'application/json','Cache-Control':'no-cache'},
      body: JSON.stringify({ key, value })
    });
    if(!res.ok){ throw new Error(await res.text() || ('Live database save failed: '+res.status)); }
    const remote = await nitaFetchStore();
    localStorage.setItem(key, JSON.stringify(remote[key] ?? value));
    return true;
  }
  window.nitaSaveKeyStrict = nitaSaveKeyStrict;
  window.loadSharedStore = async function(){
    try{
      const remote = await nitaFetchStore();
      PERSIST_KEYS.forEach(key=>{
        if(remote[key] !== undefined) localStorage.setItem(key, JSON.stringify(remote[key]));
      });
      window.nitaBackendOnline = true;
      window.nitaStoreLoaded = true;
      return remote;
    }catch(err){
      window.nitaBackendOnline = false;
      console.error('Nita live database is not connected:', err);
      if(location.pathname.endsWith('admin.html')) cloudNotice('Cloud database is not connected. Admin changes will NOT appear on phones. Re-deploy the full folder including netlify/functions/store.js and package.json.', false);
      return currentSharedStore ? currentSharedStore() : {};
    }
  };
  window.saveProducts = async function(products){
    localStorage.setItem('nitaProducts', JSON.stringify(products));
    try{
      await nitaSaveKeyStrict('nitaProducts', products);
      cloudNotice('Saved globally. Refresh your phone and it will appear.');
      return true;
    }catch(err){
      console.error(err);
      cloudNotice('Not saved globally: Netlify backend is not active. Upload the full folder and check Functions.', false);
      return false;
    }
  };
  window.saveCoupons = async function(coupons){
    localStorage.setItem('nitaCoupons', JSON.stringify(coupons));
    try{ await nitaSaveKeyStrict('nitaCoupons', coupons); cloudNotice('Coupon saved globally.'); return true; }
    catch(err){ console.error(err); cloudNotice('Coupon not saved globally. Check Netlify Functions.', false); return false; }
  };
  window.saveUsers = async function(users){
    localStorage.setItem('nitaUsersByEmail', JSON.stringify(users));
    try{ await nitaSaveKeyStrict('nitaUsersByEmail', users); return true; }
    catch(err){ console.error(err); return false; }
  };

  const oldInit = window.init;
  window.init = async function(){
    await loadSharedStore();
    if(oldInit) await oldInit();
    await loadSharedStore();
    try{ renderProducts?.('#products', getProducts()); renderCartPanel?.(); }catch(e){}
  };

  window.addProductAdmin = async function(){
    const name=document.getElementById('pname')?.value.trim();
    const price=Number(document.getElementById('pprice')?.value || 0);
    if(!name || !price){ toast('Add a product name and price'); return; }
    const products = getProducts().map(normalizeProductStatus);
    const photos = Array.isArray(window.pendingAdminPhotos) ? window.pendingAdminPhotos.slice() : [];
    const mainIndex = Number(window.pendingAdminMainIndex || 0);
    const saleRaw = document.getElementById('psale')?.value;
    const product = normalizeProductStatus({
      id:'p'+Date.now(),
      name,
      price,
      salePrice: saleRaw==='' ? '' : Number(saleRaw),
      status: document.getElementById('pstatus')?.value || 'in-stock',
      soldOut: (document.getElementById('pstatus')?.value || 'in-stock') === 'out-of-stock',
      category: document.getElementById('pcat')?.value || 'Dresses',
      collection: document.getElementById('pcollection')?.value || 'New Arrivals',
      note: document.getElementById('pnote')?.value.trim() || '',
      sizes: selectedAdminSizes?.().length ? selectedAdminSizes() : ['One Size'],
      photos,
      mainPhotoIndex: mainIndex,
      img: photos[mainIndex] || photos[0] || 'linear-gradient(135deg,#fff,#ddd)',
      desc: document.getElementById('pdesc')?.value.trim() || 'Curated Italian-made apparel selected for a clean boutique wardrobe.'
    });
    products.push(product);
    const ok = await saveProducts(products);
    if(ok){
      window.pendingAdminPhotos=[]; window.pendingAdminMainIndex=0;
      ['pname','pprice','psale','pnote','pdesc'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
      const input=document.getElementById('pphotos'); if(input) input.value='';
      const preview=document.getElementById('photoPreview'); if(preview) preview.innerHTML='';
      await loadSharedStore(); renderAdmin(); toast('Product added and saved globally.');
    }
  };

  window.saveProductEditor = async function(id){
    const products = getProducts().map(normalizeProductStatus);
    const p = products.find(x=>String(x.id)===String(id));
    const root = document.getElementById('editor-'+id);
    if(!p || !root) return;
    const oldRegular = Number(p.price||0);
    const enteredPrice = Number(root.querySelector('.edit-price')?.value || 0);
    const saleInput = root.querySelector('.edit-sale')?.value;
    p.name = root.querySelector('.edit-name')?.value.trim() || p.name;
    if(saleInput===''){
      if(enteredPrice>0 && enteredPrice<oldRegular){ p.salePrice=enteredPrice; p.price=oldRegular; }
      else { p.price=enteredPrice; p.salePrice=''; }
    } else { p.price=enteredPrice; p.salePrice=Number(saleInput); }
    p.category = root.querySelector('.edit-category')?.value || p.category;
    p.collection = root.querySelector('.edit-collection')?.value || p.collection;
    p.desc = root.querySelector('.edit-desc')?.value.trim() || '';
    p.sizes = selectedAdminSizes(root).length ? selectedAdminSizes(root) : ['One Size'];
    p.status = root.querySelector('.edit-status')?.value || productStatusValue(p);
    p.soldOut = p.status === 'out-of-stock';
    if(window.editingPhotoBuffers?.[id]?.length){
      p.photos = window.editingPhotoBuffers[id];
      p.mainPhotoIndex = Number(window.editingMainPhotoIndex?.[id] || 0);
      p.img = p.photos[p.mainPhotoIndex] || p.photos[0];
      delete window.editingPhotoBuffers[id];
      if(window.editingMainPhotoIndex) delete window.editingMainPhotoIndex[id];
    } else {
      const chosen = root.dataset.mainIndex;
      if(chosen !== undefined){
        p.mainPhotoIndex = Number(chosen) || 0;
        const photos = Array.isArray(p.photos)&&p.photos.length ? p.photos : [p.img].filter(Boolean);
        p.img = photos[p.mainPhotoIndex] || photos[0] || p.img;
      }
    }
    const ok = await saveProducts(products);
    if(ok){ await loadSharedStore(); renderAdmin(); toast('Product updated globally.'); }
  };

  window.forceRefreshFromLiveDatabase = async function(){
    await loadSharedStore();
    renderAdmin?.(); renderProducts?.('#products', getProducts());
    cloudNotice('Loaded latest live database.');
  };
})();
// === END NITA STYLE CLOUD PERSISTENCE HARD FIX ===

// === NITA STYLE ABSOLUTE FIX PATCH: cloud-only admin saves, pro login, multi-photo galleries ===
(function(){
  const ADMIN_EMAILS_FINAL=['karim.abousamah1@gmail.com','karim.abousamah@gmail.com'];
  const PERSIST_KEYS_FINAL=['nitaProducts','nitaOrders','nitaCoupons','nitaUsersByEmail','nitaDiscountUses','nitaHomepageWallpapers'];
  const safe=(v='')=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  window.safe=safe;
  const getJSON=(k,f)=>{try{return JSON.parse(localStorage.getItem(k)||'null')??f}catch{return f}};
  const setJSON=(k,v)=>localStorage.setItem(k,JSON.stringify(v));

  function notify(message, ok=true, sticky=false){
    let el=document.getElementById('cloudSaveNotice');
    if(!el){el=document.createElement('div');el.id='cloudSaveNotice';el.style.cssText='position:fixed;left:18px;bottom:18px;z-index:999999;padding:13px 15px;border:1px solid #111;background:#fff;color:#111;font:800 12px/1.4 Arial,sans-serif;max-width:390px;box-shadow:0 16px 44px rgba(0,0,0,.16)';document.body.appendChild(el)}
    el.textContent=message; el.style.borderColor=ok?'#111':'#b00020'; el.style.color=ok?'#111':'#b00020';
    clearTimeout(el._t); if(!sticky) el._t=setTimeout(()=>el.remove(), ok?3000:8500);
  }
  window.nitaNotify=notify;

  async function fetchCloudState(){
    const res=await fetch('/.netlify/functions/store?ts='+Date.now(),{cache:'no-store',headers:{'Cache-Control':'no-cache'}});
    if(!res.ok) throw new Error('Cloud function returned '+res.status+' — deploy the full folder, not only HTML files.');
    return await res.json();
  }
  async function saveCloudKey(key,value){
    if(!PERSIST_KEYS_FINAL.includes(key)) throw new Error('Invalid store key');
    const res=await fetch('/.netlify/functions/store',{method:'POST',headers:{'Content-Type':'application/json','Cache-Control':'no-cache'},body:JSON.stringify({key,value})});
    if(!res.ok){let text=await res.text().catch(()=>''); throw new Error(text||('Cloud save failed '+res.status));}
    const remote=await fetchCloudState();
    PERSIST_KEYS_FINAL.forEach(k=>{ if(remote[k]!==undefined) setJSON(k, remote[k]); });
    window.nitaBackendOnline=true;
    return remote;
  }
  window.nitaFetchStore=fetchCloudState;
  window.nitaSaveKeyStrict=saveCloudKey;

  window.loadSharedStore=async function(){
    try{
      const remote=await fetchCloudState();
      PERSIST_KEYS_FINAL.forEach(k=>{ if(remote[k]!==undefined) setJSON(k, remote[k]); });
      window.nitaBackendOnline=true; window.nitaStoreLoaded=true;
      document.body?.classList.add('cloud-online');
      document.body?.classList.remove('cloud-offline');
      return remote;
    }catch(err){
      window.nitaBackendOnline=false; window.nitaStoreLoaded=true;
      document.body?.classList.add('cloud-offline');
      console.error('Nita cloud database unavailable:', err);
      if(location.pathname.endsWith('admin.html')) notify('Cloud database is not connected. Products cannot be saved for all devices until Netlify Functions are deployed with netlify/functions/store.js and package.json.', false, true);
      return currentSharedStore?currentSharedStore():{};
    }
  };

  window.getProducts=function(){
    const saved=getJSON('nitaProducts', null);
    const base=(Array.isArray(saved)&&saved.length)?saved:(typeof defaultProducts!=='undefined'?defaultProducts:[]);
    return base.map(p=>normalizeProductStatus({...p}));
  };
  window.saveProducts=async function(products){
    const clean=(Array.isArray(products)?products:[]).map(p=>normalizeProductStatus({...p}));
    if(!window.nitaBackendOnline){
      try{await loadSharedStore();}catch(e){}
    }
    if(!window.nitaBackendOnline){notify('Not saved: cloud database is offline. Re-deploy the full folder with Netlify Functions so phone and laptop share the same products.', false, true); return false;}
    try{ await saveCloudKey('nitaProducts', clean); notify('Saved globally. This product update will appear on every device.'); return true; }
    catch(err){console.error(err); notify('Not saved globally: '+err.message, false, true); return false;}
  };
  window.saveUsers=async function(users){ setJSON('nitaUsersByEmail', users||{}); try{ await saveCloudKey('nitaUsersByEmail', users||{}); return true; }catch(err){console.warn(err); return false;} };
  window.saveCoupons=async function(coupons){ setJSON('nitaCoupons', coupons||[]); try{ await saveCloudKey('nitaCoupons', coupons||[]); notify('Coupon saved globally.'); return true; }catch(err){notify('Coupon not saved globally: '+err.message,false); return false;} };

  function normalizeEmail(v){return String(v||'').trim().toLowerCase()}
  window.normalizeEmail=window.normalizeEmail||normalizeEmail;
  window.isAdminEmail=email=>ADMIN_EMAILS_FINAL.includes(normalizeEmail(email));

  window.renderLoginPage=function(){
    const root=document.getElementById('loginRoot'); if(!root) return;
    root.innerHTML=`<section class="auth-shell"><div class="auth-brand"><img src="assets/logo-cropped.png" alt="Nita Style"><p>Customer account</p><h1>Sign in or create your account</h1><p class="muted">Save your address, track your orders, and receive your first-order code in a clean boutique account.</p></div><div class="auth-card"><div class="auth-tabs"><button class="active" id="signinTab" onclick="switchAuthMode('signin')">SIGN IN</button><button id="signupTab" onclick="switchAuthMode('signup')">SIGN UP</button></div><div id="authMessage" class="auth-message"></div><label>Email address</label><input id="authEmail" class="field" type="email" autocomplete="email" placeholder="you@example.com"><label>Password</label><input id="authPassword" class="field" type="password" autocomplete="current-password" placeholder="Password"><div id="signupFields" style="display:none"><div class="form-grid"><div><label>First name</label><input id="authFirst" class="field" placeholder="First name"></div><div><label>Last name</label><input id="authLast" class="field" placeholder="Last name"></div></div><label>Phone number</label><input id="authPhone" class="field" placeholder="Phone number"></div><button class="btn auth-submit" onclick="submitAuth()">CONTINUE</button><p class="muted mini-note">Your email is your login and cannot be changed from the account page.</p></div></section>`;
    window.authMode='signin';
  };
  window.switchAuthMode=function(mode){window.authMode=mode; document.getElementById('signinTab')?.classList.toggle('active',mode==='signin'); document.getElementById('signupTab')?.classList.toggle('active',mode==='signup'); const f=document.getElementById('signupFields'); if(f) f.style.display=mode==='signup'?'block':'none'; const msg=document.getElementById('authMessage'); if(msg) msg.textContent='';};
  window.submitAuth=async function(){
    const email=normalizeEmail(document.getElementById('authEmail')?.value); const password=document.getElementById('authPassword')?.value||'';
    const msg=document.getElementById('authMessage');
    if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ if(msg)msg.textContent='Please enter a valid email address.'; return; }
    if(password.length<4){ if(msg)msg.textContent='Please enter a password.'; return; }
    await loadSharedStore();
    const users=getJSON('nitaUsersByEmail',{}); const existing=users[email]; const mode=window.authMode||'signin';
    if(mode==='signin' && existing && existing.password && existing.password!==password){ if(msg)msg.textContent='Wrong password for this account.'; return; }
    if(mode==='signin' && !existing){ if(msg)msg.innerHTML='No account found with this email. Click <b>Sign up</b> to create one.'; return; }
    const user={...(existing||{}),email,password,firstName:existing?.firstName||'',lastName:existing?.lastName||'',phone:existing?.phone||'',addresses:existing?.addresses||[],defaultAddress:existing?.defaultAddress||null,createdAt:existing?.createdAt||new Date().toISOString()};
    if(mode==='signup'){
      user.firstName=(document.getElementById('authFirst')?.value||user.firstName||'').trim();
      user.lastName=(document.getElementById('authLast')?.value||user.lastName||'').trim();
      user.phone=(document.getElementById('authPhone')?.value||user.phone||'').trim();
      if(!existing) user.firstOrderCode='NITA10';
    }
    users[email]=user; setJSON('nitaUsersByEmail',users); localStorage.setItem('nitaUser',JSON.stringify(user)); currentUser=user;
    await saveUsers(users);
    if(mode==='signup' && !existing){ try{ await sendStoreEmail?.({type:'signup_discount',to:email,code:'NITA10',user}); }catch(e){} }
    location.href=isAdminEmail(email)?'admin.html':'account.html';
  };
  window.login=window.submitAuth;

  window.protectAdmin=function(){
    currentUser=getJSON('nitaUser',null);
    if(!isAdminEmail(currentUser?.email)){
      document.body.innerHTML=header()+`<main class="page"><div class="card account-auth"><h1>Admin access</h1><p class="muted">Sign in with the admin email to manage products, orders, customers, and coupons.</p><a class="btn" href="login.html">SIGN IN</a></div></main>`; updateCartCount?.(); return false;
    }
    return true;
  };

  // Compress each uploaded photo so multiple photos can be saved reliably in the cloud database.
  async function compressImageFile(file){
    const dataUrl=await new Promise((resolve,reject)=>{const r=new FileReader(); r.onload=()=>resolve(r.result); r.onerror=reject; r.readAsDataURL(file);});
    try{
      const img=await new Promise((resolve,reject)=>{const im=new Image(); im.onload=()=>resolve(im); im.onerror=reject; im.src=dataUrl;});
      const max=2200; let w=img.width,h=img.height; if(Math.max(w,h)>max){const ratio=max/Math.max(w,h); w=Math.round(w*ratio); h=Math.round(h*ratio);} 
      const canvas=document.createElement('canvas'); canvas.width=w; canvas.height=h; const ctx=canvas.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h); ctx.drawImage(img,0,0,w,h);
      return canvas.toDataURL('image/jpeg',0.78);
    }catch(e){return dataUrl;}
  }
  window.fileListToDataUrls=function(files,cb){
    const arr=[...(files||[])]; if(!arr.length){cb([]);return;}
    Promise.all(arr.map(compressImageFile)).then(cb).catch(()=>cb([]));
  };
  window.pendingAdminPhotos=[]; window.pendingAdminMainIndex=0; window.editingPhotoBuffers={}; window.editingMainPhotoIndex={};
  function photoThumbHTML(url,i,main,fn){return `<button type="button" class="admin-thumb selectable-thumb ${i===main?'selected-main':''}" onclick="${fn}(${i})"><img src="${safe(url)}" alt="Product photo ${i+1}"><span>${i===main?'Main photo':'Photo '+(i+1)}</span></button>`}
  window.setPendingMainPhoto=function(i){window.pendingAdminMainIndex=i; const box=document.getElementById('photoPreview'); if(box) box.innerHTML=(window.pendingAdminPhotos||[]).map((u,idx)=>photoThumbHTML(u,idx,i,'setPendingMainPhoto')).join('');};
  window.previewAdminPhotos=function(e){fileListToDataUrls(e.target.files,urls=>{window.pendingAdminPhotos=urls; window.pendingAdminMainIndex=0; window.setPendingMainPhoto(0);});};
  window.setEditMainPhoto=function(id,i){window.editingMainPhotoIndex[id]=i; const box=document.getElementById('editPreview-'+id); const urls=window.editingPhotoBuffers[id]||[]; if(box) box.innerHTML=urls.map((u,idx)=>`<button type="button" class="admin-thumb selectable-thumb ${idx===i?'selected-main':''}" onclick="setEditMainPhoto('${String(id).replace(/'/g,"\\'")}',${idx})"><img src="${safe(u)}"><span>${idx===i?'Main photo':'Photo '+(idx+1)}</span></button>`).join('');};
  window.previewEditPhotos=function(e,id){fileListToDataUrls(e.target.files,urls=>{window.editingPhotoBuffers[id]=urls; window.editingMainPhotoIndex[id]=0; window.setEditMainPhoto(id,0);});};

  window.productMainImage=function(p){
    if(!p) return 'linear-gradient(135deg,#fff,#ddd)'; const photos=Array.isArray(p.photos)?p.photos.filter(Boolean):[]; const idx=Math.max(0,Math.min(Number(p.mainPhotoIndex||0),Math.max(photos.length-1,0))); return photos[idx]||p.img||'linear-gradient(135deg,#fff,#ddd)';
  };
  window.productImagesForDisplay=function(p){const photos=(Array.isArray(p?.photos)&&p.photos.length?p.photos:[p?.img]).filter(Boolean); const main=productMainImage(p); const all=[main,...photos.filter(x=>x!==main)]; return {first:all[0]||'linear-gradient(135deg,#fff,#ddd)',second:all[1]||all[0]||'linear-gradient(135deg,#fff,#ddd)',all:all.length?all:['linear-gradient(135deg,#fff,#ddd)']};};
  window.cssBgImage=function(u){return String(u||'').startsWith('data:')?`background-image:url(${u})`:`background:${u||'linear-gradient(135deg,#fff,#ddd)'}`};
  window.productStatusValue=function(p){return p?.status || (p?.soldOut?'out-of-stock':'in-stock')};
  window.normalizeProductStatus=function(p){p=p||{}; p.status=productStatusValue(p); p.soldOut=p.status==='out-of-stock'; if(!Array.isArray(p.sizes)||!p.sizes.length)p.sizes=['One Size']; if(!Array.isArray(p.photos))p.photos=p.img&&String(p.img).startsWith('data:')?[p.img]:[]; p.mainPhotoIndex=Number(p.mainPhotoIndex||0); return p};
  window.stockStatusHtml=function(status){status=status||'in-stock'; const labels={'in-stock':'In stock','coming-soon':'Coming soon','out-of-stock':'Out of stock'}; return `<span class="stock-status ${status}"><span class="stock-dot"></span><span>${labels[status]||'In stock'}</span></span>`};
  window.productPriceStatusRow=function(p,tag='p'){p=normalizeProductStatus(p); const sale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price); const price=sale?`<span class="muted old-price">${money(p.price)}</span><span class="price-drop">${money(p.salePrice)}</span>`:money(p.price||0); return `<div class="product-price-row"><${tag} class="price-line">${price}</${tag}>${stockStatusHtml(p.status)}</div>`};
  window.productCard=function(raw){const p=normalizeProductStatus(raw); const imgs=productImagesForDisplay(p); const sale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price); return `<article class="product status-${p.status}"><a class="product-hit" href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-img">${sale?'<span class="sale-badge">PRICE DROP</span>':''}<span class="product-img-layer product-img-primary" style="${cssBgImage(imgs.first)}"></span><span class="product-img-layer product-img-secondary" style="${cssBgImage(imgs.second)}"></span></div><h3>${safe(p.name)}</h3>${productPriceStatusRow(p,'p')}</a><button class="quick-view-btn" type="button" onclick="event.stopPropagation();event.preventDefault();openQuickView('${String(p.id).replace(/'/g,"\\'")}')">QUICK VIEW</button></article>`};
  window.renderProducts=function(el='#products',list=getProducts()){const node=document.querySelector(el); if(node) node.innerHTML=(list||[]).map(productCard).join('') || '<p class="muted">No products listed yet.</p>';};
  window.openQuickView=function(id){const p=normalizeProductStatus(getProducts().find(x=>String(x.id)===String(id))); if(!p?.id)return; const imgs=productImagesForDisplay(p); const sizes=(p.sizes||['One Size']).map((s,i)=>`<button class="size ${i===0?'active':''}" onclick="this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${safe(s)}</button>`).join(''); const can=p.status==='in-stock'; const btn=can?`<button class="btn" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}',document.querySelector('#quickContent .size.active')?.textContent||'One Size');closeQuickView()">ADD TO CART</button>`:`<button class="btn disabled" disabled>${p.status==='coming-soon'?'COMING SOON':'OUT OF STOCK'}</button>`; const q=document.getElementById('quickContent'); if(q)q.innerHTML=`<div class="quick-grid"><div class="quick-image" style="${cssBgImage(imgs.first)};background-size:cover;background-position:center"></div><div class="quick-info"><p class="muted">${safe(p.category||'')}</p><h2>${safe(p.name)}</h2>${productPriceStatusRow(p,'h3')}<p>${safe(p.desc||'')}</p><div class="sizes">${sizes}</div>${btn}<a class="btn light" href="product.html?id=${encodeURIComponent(p.id)}">VIEW FULL PRODUCT</a></div></div>`; document.getElementById('quickModal')?.classList.add('open');};

  window.productEditorHTML=function(raw){
    const p=normalizeProductStatus(raw); const photos=(Array.isArray(p.photos)&&p.photos.length?p.photos:[p.img]).filter(Boolean); const current=productStatusValue(p); const selected=p.sizes||['One Size'];
    const currentThumbs=photos.map((u,i)=>`<button type="button" class="admin-thumb selectable-thumb existing-main-${safe(p.id)} ${i===p.mainPhotoIndex?'selected-main':''}" onclick="document.querySelectorAll('.existing-main-${String(p.id).replace(/'/g,"\\'")}').forEach(b=>b.classList.remove('selected-main'));this.classList.add('selected-main');this.closest('.product-editor').dataset.mainIndex='${i}'"><img src="${String(u).startsWith('data:')?safe(u):''}" style="${String(u).startsWith('data:')?'':'display:none'}"><span>${i===p.mainPhotoIndex?'Main photo':'Photo '+(i+1)}</span></button>`).join('');
    return `<div class="admin-form"><div class="full"><label>Product availability</label><select class="field edit-status"><option value="in-stock" ${current==='in-stock'?'selected':''}>In stock</option><option value="coming-soon" ${current==='coming-soon'?'selected':''}>Coming soon</option><option value="out-of-stock" ${current==='out-of-stock'?'selected':''}>Out of stock</option></select></div><div><label>Product name</label><input class="field edit-name" value="${safe(p.name||'')}"></div><div><label>Regular price</label><input class="field edit-price" type="number" step="0.01" value="${Number(p.price||0)}"></div><div><label>Sale / price-drop price</label><input class="field edit-sale" type="number" step="0.01" value="${p.salePrice||''}" placeholder="Optional"></div><div><label>Section</label><select class="field edit-category">${renderOptions(ADMIN_CATEGORIES,p.category)}</select></div><div><label>Collection</label><select class="field edit-collection">${renderOptions(ADMIN_COLLECTIONS,p.collection)}</select></div><div class="full"><label>Current photos</label><p class="muted">Click one photo to choose the main photo shown first on the website.</p><div class="photo-preview existing-photos">${currentThumbs||'<p class="muted">No photos yet.</p>'}</div><label style="margin-top:18px">Replace / add product gallery</label><div class="upload-zone"><input type="file" accept="image/*" multiple onchange="previewEditPhotos(event,'${String(p.id).replace(/'/g,"\\'")}')"><p><b>Upload multiple photos</b><br><span class="muted">Select several images at once. Then choose the main one.</span></p></div><div class="photo-preview" id="editPreview-${safe(p.id)}"></div></div><div class="full"><label>Available sizes</label><div class="size-picker">${renderSizeButtons(selected)}</div></div><div class="full"><label>Description</label><textarea class="field edit-desc">${safe(p.desc||'')}</textarea></div></div><button class="btn" onclick="saveProductEditor('${String(p.id).replace(/'/g,"\\'")}')">SAVE PRODUCT CHANGES</button>`;
  };
  window.renderAdminProducts=function(){const box=document.getElementById('adminProducts'); if(!box)return; const ps=getProducts(); box.innerHTML=ps.length?ps.map(p=>{p=normalizeProductStatus(p); const img=productMainImage(p); return `<div class="admin-product-card" id="edit-${safe(p.id)}"><div class="admin-product-top"><div class="admin-product-photo" style="${cssBgImage(img)};background-size:cover;background-position:center"></div><div><div class="admin-product-name">${safe(p.name)}</div><span class="muted">${safe(p.category||'')} · ${money(p.price||0)} ${p.salePrice?`· Sale ${money(p.salePrice)}`:''} · ${(p.photos||[]).length} photo${(p.photos||[]).length===1?'':'s'}</span><div>${stockStatusHtml(p.status)}</div></div><button onclick="toggleProductEditor('${String(p.id).replace(/'/g,"\\'")}')">Edit listing</button><button onclick="removeProduct('${String(p.id).replace(/'/g,"\\'")}')">Remove</button></div><div class="product-editor" id="editor-${safe(p.id)}">${productEditorHTML(p)}</div></div>`}).join(''):'<p class="muted">No products listed yet. Add a product above, and wait for “Saved globally.”</p>';};
  window.addProductAdmin=async function(){
    const name=document.getElementById('pname')?.value.trim(); const price=Number(document.getElementById('pprice')?.value||0); if(!name||!price){toast('Add a product name and price');return;}
    await loadSharedStore(); if(!window.nitaBackendOnline){notify('Cannot add product: cloud database is offline, so it would only appear on this device. Deploy the full folder with Netlify Functions first.', false, true); return;}
    const photos=(window.pendingAdminPhotos||[]).slice(); const main=Math.max(0,Math.min(Number(window.pendingAdminMainIndex||0),Math.max(photos.length-1,0))); const sale=document.getElementById('psale')?.value;
    const product=normalizeProductStatus({id:'p'+Date.now(),name,price,salePrice:sale===''?'':Number(sale),status:document.getElementById('pstatus')?.value||'in-stock',category:document.getElementById('pcat')?.value||'Dresses',collection:document.getElementById('pcollection')?.value||'New Arrivals',note:document.getElementById('pnote')?.value.trim()||'',sizes:selectedAdminSizes?.().length?selectedAdminSizes():['One Size'],photos,mainPhotoIndex:main,img:photos[main]||photos[0]||'linear-gradient(135deg,#fff,#ddd)',desc:document.getElementById('pdesc')?.value.trim()||'A carefully selected Italian-made piece for a clean, feminine wardrobe.'});
    const products=getProducts(); products.push(product); const ok=await saveProducts(products); if(ok){window.pendingAdminPhotos=[];window.pendingAdminMainIndex=0;['pname','pprice','psale','pnote','pdesc'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''}); const input=document.getElementById('pphotos'); if(input)input.value=''; const prev=document.getElementById('photoPreview'); if(prev)prev.innerHTML=''; await loadSharedStore(); renderAdmin(); toast('Product added globally.');}
  };
  window.saveProductEditor=async function(id){
    await loadSharedStore(); if(!window.nitaBackendOnline){notify('Cannot save edit: cloud database is offline. It would not appear on phone.', false, true); return;}
    const products=getProducts(); const p=products.find(x=>String(x.id)===String(id)); const root=document.getElementById('editor-'+id); if(!p||!root)return;
    const old=Number(p.price||0); const entered=Number(root.querySelector('.edit-price')?.value||0); const saleInput=root.querySelector('.edit-sale')?.value;
    p.name=root.querySelector('.edit-name')?.value.trim()||p.name; if(saleInput===''){ if(entered>0&&entered<old){p.salePrice=entered;p.price=old}else{p.price=entered;p.salePrice=''} } else {p.price=entered;p.salePrice=Number(saleInput)}
    p.category=root.querySelector('.edit-category')?.value||p.category; p.collection=root.querySelector('.edit-collection')?.value||p.collection; p.desc=root.querySelector('.edit-desc')?.value.trim()||''; p.sizes=selectedAdminSizes(root).length?selectedAdminSizes(root):['One Size']; p.status=root.querySelector('.edit-status')?.value||productStatusValue(p); p.soldOut=p.status==='out-of-stock';
    if(window.editingPhotoBuffers[id]?.length){p.photos=window.editingPhotoBuffers[id];p.mainPhotoIndex=Number(window.editingMainPhotoIndex[id]||0);p.img=p.photos[p.mainPhotoIndex]||p.photos[0];delete window.editingPhotoBuffers[id];delete window.editingMainPhotoIndex[id];}
    else if(root.dataset.mainIndex!==undefined){p.mainPhotoIndex=Number(root.dataset.mainIndex)||0; const photos=(Array.isArray(p.photos)&&p.photos.length?p.photos:[p.img]).filter(Boolean); p.img=photos[p.mainPhotoIndex]||photos[0]||p.img;}
    const ok=await saveProducts(products); if(ok){await loadSharedStore();renderAdmin();toast('Product updated globally.');}
  };
  window.removeProduct=async function(id){if(!confirm('Remove this product?'))return; await loadSharedStore(); const ok=await saveProducts(getProducts().filter(p=>String(p.id)!==String(id))); if(ok)renderAdmin();};
  window.renderAdmin=async function(){if(!protectAdmin())return; await loadSharedStore(); const sizePicker=document.getElementById('sizePicker'); if(sizePicker&&!sizePicker.dataset.ready){sizePicker.innerHTML=renderSizeButtons(['S','M','L']);sizePicker.dataset.ready='1'} const body=document.getElementById('orders'); const orders=getJSON('nitaOrders',[]); if(body)body.innerHTML=orders.length?orders.map((o,i)=>`<tr><td><b>${safe(o.id)}</b><br><span class="muted">${safe(o.date||'')}</span></td><td>${safe(o.customer||'-')}<br><span class="muted">${safe(o.email||'')} · ${safe(o.phone||'')}</span></td><td>${money(o.total||0)}</td><td><select onchange="updateOrder(${i},this.value)"><option>${safe(o.status||'New order')}</option><option>Confirmed</option><option>Preparing</option><option>Out for delivery</option><option>Delivered</option><option>Cancelled</option></select></td></tr>`).join(''):'<tr><td colspan="4">No orders yet.</td></tr>'; renderAdminProducts(); renderAdminCustomers?.(); renderCouponsAdmin?.();};

  // Real product page renderer with all photos visible.
  window.productPage=function(){
    const detail=document.getElementById('detail'); if(!detail)return; const id=new URL(location.href).searchParams.get('id'); const p=normalizeProductStatus(getProducts().find(x=>String(x.id)===String(id))||getProducts()[0]); if(!p?.id){detail.innerHTML='<div class="card"><h1>Product not found</h1><a class="btn" href="shop.html">BACK TO SHOP</a></div>';return;}
    const imgs=productImagesForDisplay(p); window.selectedPhoto=Math.min(Number(window.selectedPhoto||0),imgs.all.length-1); window.selectedSize=(window.selectedSize&&p.sizes.includes(window.selectedSize))?window.selectedSize:p.sizes[0]; const can=p.status==='in-stock'; const action=can?`<button class="btn" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}',selectedSize)">ADD TO CART</button><a class="btn light" href="checkout.html" style="margin-left:10px">BUY NOW</a>`:`<button class="btn disabled" disabled>${p.status==='coming-soon'?'COMING SOON':'OUT OF STOCK'}</button>`;
    detail.innerHTML=`<div><div class="detail-img" style="${cssBgImage(imgs.all[window.selectedPhoto])};background-size:cover;background-position:center"></div><div class="product-thumbs">${imgs.all.map((ph,i)=>`<button class="${i===window.selectedPhoto?'active':''}" onclick="selectedPhoto=${i};productPage()" style="${cssBgImage(ph)};background-size:cover;background-position:center"></button>`).join('')}</div></div><div><p class="muted">${safe(p.category||'')}</p><h1>${safe(p.name)}</h1>${productPriceStatusRow(p,'h2')}<p>${safe(p.desc||'')}</p><div class="sizes">${p.sizes.map(s=>`<span class="size ${s===window.selectedSize?'active':''}" onclick="selectedSize='${safe(s)}';productPage()">${safe(s)}</span>`).join('')}</div>${action}</div>`;
  };

  const previousInit=window.init;
  window.init=async function(){
    await loadSharedStore();
    if(previousInit) { try{await previousInit();}catch(e){console.error(e);} }
    await loadSharedStore();
    try{renderProducts('#products', getProducts()); renderCartPanel?.(); updateCartCount?.();}catch(e){console.warn(e)}
  };
})();
// === END NITA STYLE ABSOLUTE FIX PATCH ===


// === NITA STYLE SECTION PICKER + ADMIN SELECT POLISH ===
(function(){
  const COLOR_OPTIONS=['Black','White','Cream','Beige','Grey','Navy','Brown','Red','Pink','Blue','Green','Multi-color'];
  const STYLE_OPTIONS=['Clean everyday piece','Elegant evening piece','Minimal essential','Soft feminine silhouette','Relaxed fit','Tailored look','Premium texture','Limited selected piece'];
  const HOME_OPTIONS=[['trending-now','Trending Now'],['new-arrivals','New Arrivals']];
  function opts(list,current){return list.map(x=>Array.isArray(x)?`<option value="${x[0]}" ${x[0]===current?'selected':''}>${x[1]}</option>`:`<option ${x===current?'selected':''}>${x}</option>`).join('')}
  function parseNote(note=''){
    const parts=String(note||'').split(' · ');
    return {color: parts[0] || 'Black', style: parts[1] || parts[0] || 'Clean everyday piece'};
  }
  function productHomeSection(p){ return p.displaySection || p.homeSection || (p.collection === 'New Arrivals' ? 'new-arrivals' : 'trending-now'); }
  window.productHomeSection = productHomeSection;

  window.productEditorHTML=function(p){
    p=normalizeProductStatus(p); const selected=p.sizes||[]; const current=p.status||'in-stock'; const n=parseNote(p.note); const currentThumbs=productImagesForDisplay(p).all.map((u,i)=>`<div class="admin-thumb ${i===(p.mainPhotoIndex||0)?'selected-main':''}" onclick="selectExistingMainPhoto('${String(p.id).replace(/'/g,"\\'")}',${i})"><img src="${String(u).startsWith('data:')?u:''}" style="${String(u).startsWith('data:')?'':'display:none'}"><span>${i===(p.mainPhotoIndex||0)?'Main photo':'Photo '+(i+1)}</span></div>`).join('');
    return `<div class="admin-form"><div class="full"><label>Product availability</label><select class="field edit-status"><option value="in-stock" ${current==='in-stock'?'selected':''}>In stock</option><option value="coming-soon" ${current==='coming-soon'?'selected':''}>Coming soon</option><option value="out-of-stock" ${current==='out-of-stock'?'selected':''}>Out of stock</option></select></div><div><label>Product name</label><input class="field edit-name" value="${safe(p.name||'')}"></div><div><label>Regular price</label><input class="field edit-price" type="number" step="0.01" value="${Number(p.price||0)}"></div><div><label>Sale / price-drop price</label><input class="field edit-sale" type="number" step="0.01" value="${p.salePrice||''}" placeholder="Optional"></div><div><label>Section</label><select class="field edit-category">${renderOptions(ADMIN_CATEGORIES,p.category)}</select></div><div><label>Collection</label><select class="field edit-collection">${renderOptions(ADMIN_COLLECTIONS,p.collection)}</select></div><div><label>Color</label><select class="field edit-color">${opts(COLOR_OPTIONS,n.color)}</select></div><div><label>Style note</label><select class="field edit-style">${opts(STYLE_OPTIONS,n.style)}</select></div><div><label>Homepage section</label><select class="field edit-home-section">${opts(HOME_OPTIONS,productHomeSection(p))}</select></div><div class="full"><label>Current photos</label><p class="muted">Click one photo to choose the main photo shown first on the website.</p><div class="photo-preview existing-photos">${currentThumbs||'<p class="muted">No photos yet.</p>'}</div><label style="margin-top:18px">Replace / add product gallery</label><div class="upload-zone"><input type="file" accept="image/*" multiple onchange="previewEditPhotos(event,'${String(p.id).replace(/'/g,"\\'")}')"><p><b>Upload multiple photos</b><br><span class="muted">Select several images at once. Then choose the main one.</span></p></div><div class="photo-preview" id="editPreview-${safe(p.id)}"></div></div><div class="full"><label>Available sizes</label><div class="size-picker">${renderSizeButtons(selected)}</div></div><div class="full"><label>Description</label><textarea class="field edit-desc">${safe(p.desc||'')}</textarea></div></div><button class="btn" onclick="saveProductEditor('${String(p.id).replace(/'/g,"\\'")}')">SAVE PRODUCT CHANGES</button>`;
  };

  window.renderAdminProducts=function(){const box=document.getElementById('adminProducts'); if(!box)return; const ps=getProducts(); box.innerHTML=ps.length?ps.map(p=>{p=normalizeProductStatus(p); const img=productMainImage(p); const hs=productHomeSection(p)==='new-arrivals'?'New Arrivals':'Trending Now'; return `<div class="admin-product-card" id="edit-${safe(p.id)}"><div class="admin-product-top"><div class="admin-product-photo" style="${cssBgImage(img)};background-size:cover;background-position:center"></div><div><div class="admin-product-name">${safe(p.name)}</div><span class="muted">${safe(p.category||'')} · ${money(p.price||0)} ${p.salePrice?`· Sale ${money(p.salePrice)}`:''} · ${hs} · ${(p.photos||[]).length} photo${(p.photos||[]).length===1?'':'s'}</span><div>${stockStatusHtml(p.status)}</div></div><button onclick="toggleProductEditor('${String(p.id).replace(/'/g,"\\'")}')">Edit listing</button><button onclick="removeProduct('${String(p.id).replace(/'/g,"\\'")}')">Remove</button></div><div class="product-editor" id="editor-${safe(p.id)}">${productEditorHTML(p)}</div></div>`}).join(''):'<p class="muted">No products listed yet. Add a product above, and wait for “Saved globally.”</p>';};

  window.addProductAdmin=async function(){
    const name=document.getElementById('pname')?.value.trim(); const price=Number(document.getElementById('pprice')?.value||0); if(!name||!price){toast('Add a product name and price');return;}
    await loadSharedStore(); if(!window.nitaBackendOnline){notify('Cannot add product: cloud database is offline, so it would only appear on this device. Deploy the full folder with Netlify Functions first.', false, true); return;}
    const photos=(window.pendingAdminPhotos||[]).slice(); const main=Math.max(0,Math.min(Number(window.pendingAdminMainIndex||0),Math.max(photos.length-1,0))); const sale=document.getElementById('psale')?.value;
    const color=document.getElementById('pcolor')?.value||'Black'; const style=document.getElementById('pstyle')?.value||'Clean everyday piece'; const displaySection=document.getElementById('phome')?.value||'trending-now';
    const product=normalizeProductStatus({id:'p'+Date.now(),name,price,salePrice:sale===''?'':Number(sale),status:document.getElementById('pstatus')?.value||'in-stock',category:document.getElementById('pcat')?.value||'Dresses',collection:document.getElementById('pcollection')?.value||'Everyday Edit',displaySection,homeSection:displaySection,note:`${color} · ${style}`,sizes:selectedAdminSizes?.().length?selectedAdminSizes():['One Size'],photos,mainPhotoIndex:main,img:photos[main]||photos[0]||'linear-gradient(135deg,#fff,#ddd)',desc:document.getElementById('pdesc')?.value.trim()||'A carefully selected Italian-made piece for a clean, feminine wardrobe.'});
    const products=getProducts(); products.push(product); const ok=await saveProducts(products); if(ok){window.pendingAdminPhotos=[];window.pendingAdminMainIndex=0;['pname','pprice','psale','pdesc'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''}); const input=document.getElementById('pphotos'); if(input)input.value=''; const prev=document.getElementById('photoPreview'); if(prev)prev.innerHTML=''; await loadSharedStore(); renderAdmin(); toast('Product added globally.');}
  };

  window.saveProductEditor=async function(id){
    await loadSharedStore(); if(!window.nitaBackendOnline){notify('Cannot save edit: cloud database is offline. It would not appear on phone.', false, true); return;}
    const products=getProducts(); const p=products.find(x=>String(x.id)===String(id)); const root=document.getElementById('editor-'+id); if(!p||!root)return;
    const old=Number(p.price||0); const entered=Number(root.querySelector('.edit-price')?.value||0); const saleInput=root.querySelector('.edit-sale')?.value;
    p.name=root.querySelector('.edit-name')?.value.trim()||p.name; if(saleInput===''){ if(entered>0&&entered<old){p.salePrice=entered;p.price=old}else{p.price=entered;p.salePrice=''} } else {p.price=entered;p.salePrice=Number(saleInput)}
    p.category=root.querySelector('.edit-category')?.value||p.category; p.collection=root.querySelector('.edit-collection')?.value||p.collection; p.displaySection=root.querySelector('.edit-home-section')?.value||productHomeSection(p); p.homeSection=p.displaySection; const color=root.querySelector('.edit-color')?.value||'Black'; const style=root.querySelector('.edit-style')?.value||'Clean everyday piece'; p.note=`${color} · ${style}`; p.desc=root.querySelector('.edit-desc')?.value.trim()||''; p.sizes=selectedAdminSizes(root).length?selectedAdminSizes(root):['One Size']; p.status=root.querySelector('.edit-status')?.value||productStatusValue(p); p.soldOut=p.status==='out-of-stock';
    if(window.editingPhotoBuffers[id]?.length){p.photos=window.editingPhotoBuffers[id];p.mainPhotoIndex=Number(window.editingMainPhotoIndex[id]||0);p.img=p.photos[p.mainPhotoIndex]||p.photos[0];delete window.editingPhotoBuffers[id];delete window.editingMainPhotoIndex[id];}
    else if(root.dataset.mainIndex!==undefined){p.mainPhotoIndex=Number(root.dataset.mainIndex)||0; const photos=(Array.isArray(p.photos)&&p.photos.length?p.photos:[p.img]).filter(Boolean); p.img=photos[p.mainPhotoIndex]||photos[0]||p.img;}
    const ok=await saveProducts(products); if(ok){await loadSharedStore();renderAdmin();toast('Product updated globally.');}
  };

  window.renderHomeSections=function(){
    const products=getProducts();
    const trending=products.filter(p=>productHomeSection(p)==='trending-now');
    const arrivals=products.filter(p=>productHomeSection(p)==='new-arrivals');
    const trendBox=document.getElementById('trendingMarquee'); if(trendBox){const list=trending.length?trending:products.slice(0,6); trendBox.innerHTML=[...list,...list,...list,...list].map(p=>productCard(p)).join('')||'<p class="muted">No products listed yet.</p>';}
    const arrBox=document.getElementById('newArrivalsMarquee'); if(arrBox){const list=arrivals.length?arrivals:products.slice(0,6); arrBox.innerHTML=[...list,...list,...list,...list].map(p=>productCard(p)).join('')||'<p class="muted">No products listed yet.</p>';}
  };
  window.addEventListener('nita-store-ready', window.renderHomeSections);
  window.addEventListener('load',()=>setTimeout(window.renderHomeSections,900));
})();
// === END NITA STYLE SECTION PICKER + ADMIN SELECT POLISH ===


// === FINAL MOBILE/UX STABILITY PATCH ===
(function(){
  function uniq(arr){return [...new Set((arr||[]).filter(Boolean).map(x=>String(x).trim()).filter(Boolean))];}
  const oldNormalize=window.normalizeProductStatus;
  window.normalizeProductStatus=function(p){
    p=oldNormalize?oldNormalize(p||{}):(p||{});
    p.sizes=uniq(p.sizes&&p.sizes.length?p.sizes:['One Size']);
    if(!p.sizes.length) p.sizes=['One Size'];
    return p;
  };
  const oldProductPage=window.productPage;
  window.productPage=function(){
    const detail=document.getElementById('detail');
    if(!detail){ if(oldProductPage) return oldProductPage(); return; }
    const id=new URL(location.href).searchParams.get('id');
    const p=window.normalizeProductStatus((getProducts().find(x=>String(x.id)===String(id))||getProducts()[0]||{}));
    if(!p.id){detail.innerHTML='<div class="card"><h1>Product not found</h1><a class="btn" href="shop.html">BACK TO SHOP</a></div>';return;}
    const imgs=productImagesForDisplay(p);
    window.selectedPhoto=Math.min(Number(window.selectedPhoto||0),imgs.all.length-1);
    window.selectedSize=(window.selectedSize&&p.sizes.includes(window.selectedSize))?window.selectedSize:p.sizes[0];
    const can=p.status==='in-stock';
    const action=can?`<button class="btn" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}',selectedSize)">ADD TO CART</button><a class="btn light" href="checkout.html">BUY NOW</a>`:`<button class="btn disabled" disabled>${p.status==='coming-soon'?'COMING SOON':'OUT OF STOCK'}</button>`;
    detail.innerHTML=`<div class="product-media"><div class="detail-img" style="${cssBgImage(imgs.all[window.selectedPhoto])};background-size:cover;background-position:center"></div><div class="product-thumbs">${imgs.all.map((ph,i)=>`<button class="${i===window.selectedPhoto?'active':''}" onclick="selectedPhoto=${i};productPage()" style="${cssBgImage(ph)};background-size:cover;background-position:center"></button>`).join('')}</div></div><div class="product-info"><p class="muted">${safe(p.category||'')}</p><h1>${safe(p.name)}</h1>${productPriceStatusRow(p,'h2')}<p>${safe(p.desc||'')}</p><div class="sizes">${p.sizes.map(s=>`<span class="size ${s===window.selectedSize?'active':''}" onclick="selectedSize='${safe(s)}';productPage()">${safe(s)}</span>`).join('')}</div><div class="product-actions">${action}</div></div>`;
  };
  const oldOpenQuick=window.openQuickView;
  window.openQuickView=function(id){
    const p=window.normalizeProductStatus(getProducts().find(x=>String(x.id)===String(id))||{});
    if(!p.id){ if(oldOpenQuick) return oldOpenQuick(id); return; }
    const imgs=productImagesForDisplay(p);
    const sizes=(p.sizes||['One Size']).map((s,i)=>`<button class="size ${i===0?'active':''}" onclick="this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${safe(s)}</button>`).join('');
    const can=p.status==='in-stock';
    const btn=can?`<button class="btn" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}',document.querySelector('#quickContent .size.active')?.textContent||'One Size');closeQuickView()">ADD TO CART</button>`:`<button class="btn disabled" disabled>${p.status==='coming-soon'?'COMING SOON':'OUT OF STOCK'}</button>`;
    const q=document.getElementById('quickContent');
    if(q) q.innerHTML=`<div class="quick-grid"><div class="quick-image" style="${cssBgImage(imgs.first)};background-size:cover;background-position:center"></div><div class="quick-info"><p class="muted">${safe(p.category||'')}</p><h2>${safe(p.name)}</h2>${productPriceStatusRow(p,'h3')}<p>${safe(p.desc||'')}</p><div class="sizes">${sizes}</div>${btn}<a class="btn light" href="product.html?id=${encodeURIComponent(p.id)}">VIEW FULL PRODUCT</a></div></div>`;
    document.getElementById('quickModal')?.classList.add('open');
  };
})();
// === END FINAL MOBILE/UX STABILITY PATCH ===

// === FINAL ACCOUNT / ADMIN / SIGN-IN REDIRECT POLISH ===
(function(){
  const ORDER_STEPS = ['New order','Confirmed','Packing','Out for delivery','Delivered'];
  function esc(v){ return typeof safe==='function'?safe(v):String(v||'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])); }
  function orderStepIndex(status){
    status = String(status||'New order');
    if(status==='Preparing') status='Packing';
    if(status==='Cancelled') return -1;
    const i = ORDER_STEPS.indexOf(status);
    return i>=0?i:0;
  }
  window.orderRoadmapHtml = function(status){
    const idx = orderStepIndex(status);
    if(String(status)==='Cancelled') return `<div class="order-roadmap"><div class="road-step cancelled">Cancelled</div></div>`;
    return `<div class="order-roadmap">${ORDER_STEPS.map((s,i)=>`<div class="road-step ${i<idx?'done':i===idx?'active':''}">${s==='New order'?'Order submitted':s}</div>`).join('')}</div>`;
  };
  window.accountOrdersHtml = function(orders, empty){
    if(!orders || !orders.length) return `<p class="muted">${empty}</p>`;
    const allProducts = (typeof getProducts==='function'?getProducts():[]);
    return orders.map(o=>{
      const items = (o.items||[]).map(it=>{
        const p = allProducts.find(x=>String(x.id)===String(it.id));
        const name = p?.name || it.name || 'Product';
        const qty = it.qty || 1;
        const size = it.size ? ` · ${esc(it.size)}` : '';
        return `<div class="order-item-line"><span>${esc(name)}${size} × ${qty}</span><span>${typeof money==='function'?money((p?.salePrice||p?.price||0)*qty):''}</span></div>`;
      }).join('') || '<p class="muted">No item details available.</p>';
      return `<article class="order-card-pro"><div class="order-card-head"><div><h3>${esc(o.id||'Order')}</h3><div class="order-meta"><span>${esc(o.date||'')}</span><span>${esc(o.payment||'Cash on delivery')}</span><span>${esc(o.status||'New order')}</span></div></div><div class="order-total">${typeof money==='function'?money(o.total||0):''}</div></div>${orderRoadmapHtml(o.status)}<div class="order-items">${items}</div>${o.address?`<p class="muted"><b>Delivery:</b> ${esc(typeof o.address==='string'?o.address:[o.address.city,o.address.street,o.address.building,o.address.floor,o.address.apartment].filter(Boolean).join(', '))}</p>`:''}</article>`;
    }).join('');
  };
  window.renderAccount = function(){
    const root = document.getElementById('accountRoot'); if(!root) return;
    if(!window.currentUser?.email){ root.innerHTML = `<div class="card account-auth"><h1>Sign in</h1><p class="muted">Sign in to view your saved details, addresses, and orders.</p><a class="btn" href="login.html">SIGN IN</a></div>`; return; }
    const user = (typeof ensureCurrentUserRecord==='function' ? ensureCurrentUserRecord() : currentUser) || currentUser;
    const addr = user.defaultAddress || {};
    const orders = (typeof customerOrders==='function'?customerOrders(user.email):JSON.parse(localStorage.getItem('nitaOrders')||'[]').filter(o=>String(o.email||'').toLowerCase()===String(user.email).toLowerCase())).sort((a,b)=>String(b.id).localeCompare(String(a.id)));
    const ongoing = orders.filter(o=>!['Delivered','Cancelled'].includes(o.status));
    const previous = orders.filter(o=>['Delivered','Cancelled'].includes(o.status));
    root.innerHTML = `<div class="account-hero clean-account-hero"><div><p class="eyebrow">My account</p><h1>Welcome${user.firstName?' '+esc(user.firstName):''}</h1><p class="muted">Manage your profile, saved delivery address, and order tracking.</p></div></div><div class="account-grid"><section class="card account-card"><h2>Personal information</h2><p class="muted">Your email is your login and cannot be edited.</p><div class="form-grid"><div><label>First name</label><input class="field" id="accFirst" value="${esc(user.firstName||'')}" placeholder="First name"></div><div><label>Last name</label><input class="field" id="accLast" value="${esc(user.lastName||'')}" placeholder="Last name"></div><div><label>Email address</label><input class="field disabled-field" value="${esc(user.email)}" disabled></div><div><label>Phone number</label><input class="field" id="accPhone" value="${esc(user.phone||'')}" placeholder="Phone number"></div></div><button class="btn" onclick="saveAccountInfo()">SAVE DETAILS</button></section><section class="card account-card"><h2>Saved delivery address</h2>${typeof accountAddressFields==='function'?accountAddressFields('accAddr_',addr):''}<button class="btn" onclick="saveAccountAddress()">SAVE ADDRESS</button></section><section class="card account-card full-span"><h2>Ongoing orders</h2><div class="orders-list">${accountOrdersHtml(ongoing,'No ongoing orders yet.')}</div></section><section class="card account-card full-span"><h2>Previous orders</h2><div class="orders-list">${accountOrdersHtml(previous,'No previous orders yet.')}</div></section><section class="card danger-zone full-span"><h2>Account control</h2><p class="muted">Log out safely, or permanently remove your saved customer profile from this website.</p><button class="logout-outline-btn" type="button" onclick="logoutUser()" style="background:#fff!important;color:#111!important;border:2px solid #b00020!important;">LOG OUT</button><button class="btn danger delete-account-btn" onclick="deleteAccount()">DELETE ACCOUNT</button></section></div>`;
  };
  // Redirect every successful customer/admin sign-in or sign-up to homepage, as requested.
  const oldSubmitAuth = window.submitAuth;
  window.submitAuth = async function(){
    const beforeHref = location.href;
    const oldAssign = location.assign;
    try{
      if(typeof oldSubmitAuth==='function'){
        // Reimplement the existing flow because location.href inside old function cannot be intercepted reliably.
        const email=(window.normalizeEmail?normalizeEmail(document.getElementById('authEmail')?.value):String(document.getElementById('authEmail')?.value||'').trim().toLowerCase());
        const password=document.getElementById('authPassword')?.value||'';
        const msg=document.getElementById('authMessage');
        if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ if(msg)msg.textContent='Please enter a valid email address.'; return; }
        if(password.length<4){ if(msg)msg.textContent='Please enter a password.'; return; }
        if(typeof loadSharedStore==='function') await loadSharedStore();
        const users=(typeof getJSON==='function'?getJSON('nitaUsersByEmail',{}):JSON.parse(localStorage.getItem('nitaUsersByEmail')||'{}'));
        const existing=users[email]; const mode=window.authMode||'signin';
        if(mode==='signin' && existing && existing.password && existing.password!==password){ if(msg)msg.textContent='Wrong password for this account.'; return; }
        if(mode==='signin' && !existing){ if(msg)msg.innerHTML='No account found with this email. Click <b>Sign up</b> to create one.'; return; }
        const user={...(existing||{}),email,password,firstName:existing?.firstName||'',lastName:existing?.lastName||'',phone:existing?.phone||'',addresses:existing?.addresses||[],defaultAddress:existing?.defaultAddress||null,createdAt:existing?.createdAt||new Date().toISOString()};
        if(mode==='signup'){
          user.firstName=(document.getElementById('authFirst')?.value||user.firstName||'').trim();
          user.lastName=(document.getElementById('authLast')?.value||user.lastName||'').trim();
          user.phone=(document.getElementById('authPhone')?.value||user.phone||'').trim();
          if(!existing) user.firstOrderCode='NITA10';
        }
        users[email]=user;
        if(typeof setJSON==='function') setJSON('nitaUsersByEmail',users); else localStorage.setItem('nitaUsersByEmail',JSON.stringify(users));
        localStorage.setItem('nitaUser',JSON.stringify(user)); window.currentUser=user;
        if(typeof saveUsers==='function') await saveUsers(users);
        if(mode==='signup' && !existing){ try{ await sendStoreEmail?.({type:'signup_discount',to:email,code:'NITA10',user}); }catch(e){} }
        location.href='index.html';
      }
    }catch(e){ console.error(e); const msg=document.getElementById('authMessage'); if(msg) msg.textContent='Something went wrong. Please try again.'; }
  };
  window.login = window.submitAuth;
  window.renderAdmin = async function(){
    if(typeof protectAdmin==='function' && !protectAdmin()) return;
    if(typeof loadSharedStore==='function') await loadSharedStore();
    const sizePicker=document.getElementById('sizePicker'); if(sizePicker&&!sizePicker.dataset.ready&&typeof renderSizeButtons==='function'){sizePicker.innerHTML=renderSizeButtons(['S','M','L']);sizePicker.dataset.ready='1'}
    const orders=(typeof getJSON==='function'?getJSON('nitaOrders',[]):JSON.parse(localStorage.getItem('nitaOrders')||'[]'));
    const body=document.getElementById('orders');
    if(body) body.innerHTML=orders.length?orders.map((o,i)=>`<tr class="admin-order-row"><td><b>${esc(o.id)}</b><br><span class="muted">${esc(o.date||'')}</span>${orderRoadmapHtml(o.status)}</td><td>${esc(o.customer||'-')}<br><span class="muted">${esc(o.email||'')}<br>${esc(o.phone||'')}</span></td><td>${typeof money==='function'?money(o.total||0):''}</td><td><select class="admin-order-status" onchange="updateOrder(${i},this.value)"><option>${esc(o.status||'New order')}</option><option>Confirmed</option><option>Packing</option><option>Out for delivery</option><option>Delivered</option><option>Cancelled</option></select><span class="admin-status-badge">${esc(o.status||'New order')}</span></td></tr>`).join(''):'<tr><td colspan="4"><div class="admin-empty">No orders yet.</div></td></tr>';
    if(typeof renderAdminProducts==='function') renderAdminProducts();
    if(typeof renderAdminCustomers==='function') renderAdminCustomers();
    if(typeof renderCouponsAdmin==='function') renderCouponsAdmin();
  };
})();

// --- Cart panel, Quick View and unavailable product final behavior ---
(function(){
  function esc(v){ return String(v ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
  function getStatus(p){
    p = (typeof normalizeProductStatus === 'function') ? normalizeProductStatus(p) : (p || {});
    return p.status || (p.soldOut ? 'out-of-stock' : 'in-stock');
  }
  function getImgs(p){
    if(typeof productImagesForDisplay === 'function') return productImagesForDisplay(p);
    const arr = (p.photos && p.photos.length ? p.photos : [p.img]).filter(Boolean);
    return {first: arr[0] || 'linear-gradient(135deg,#fff,#ddd)', second: arr[1] || arr[0] || 'linear-gradient(135deg,#fff,#ddd)', all: arr.length ? arr : ['linear-gradient(135deg,#fff,#ddd)']};
  }
  function bg(v){ return (typeof cssBgImage === 'function') ? cssBgImage(v) : (String(v||'').startsWith('data:') ? `background-image:url(${v})` : `background:${v||'linear-gradient(135deg,#fff,#ddd)'}`); }
  function priceRow(p, tag='h3'){
    return (typeof productPriceStatusRow === 'function') ? productPriceStatusRow(p, tag) : `<${tag}>${typeof money==='function'?money(p.price):('$'+p.price)}</${tag}>`;
  }
  function selectedSize(){ return document.querySelector('#quickContent .size.active')?.textContent || 'One Size'; }
  window.notifyMe = function(productId){
    const p = (typeof getProducts === 'function' ? getProducts() : []).find(x => String(x.id) === String(productId));
    const userEmail = window.currentUser?.email || JSON.parse(localStorage.getItem('nitaCurrentUser') || 'null')?.email || '';
    const email = userEmail || prompt('Enter your email and we will notify you when this item is available:');
    if(!email) return;
    const list = JSON.parse(localStorage.getItem('nitaNotifyRequests') || '[]');
    list.push({productId, productName:p?.name || 'Product', email, date:new Date().toISOString()});
    localStorage.setItem('nitaNotifyRequests', JSON.stringify(list));
    if(typeof toast === 'function') toast('Thank you. We will notify you when it is available.');
    else alert('Thank you. We will notify you when it is available.');
  };
  window.openCart = function(){
    if(typeof renderCartPanel === 'function') renderCartPanel();
    const panel = document.getElementById('cartPanel');
    if(panel){ panel.classList.add('open'); document.body.classList.add('panel-open'); }
  };
  window.closeCart = function(){
    document.getElementById('cartPanel')?.classList.remove('open');
    document.body.classList.remove('panel-open');
  };
  const oldCloseSearch = window.closeSearch;
  window.closeSearch = function(){ oldCloseSearch?.(); document.body.classList.remove('panel-open'); };
  const oldOpenSearch = window.openSearch;
  window.openSearch = function(){ oldOpenSearch?.(); document.body.classList.add('panel-open'); };
  window.openQuickView = function(id){
    const p = getStatus((typeof getProducts === 'function' ? getProducts() : []).find(x => String(x.id) === String(id)));
    if(!p?.id) return;
    const imgs = getImgs(p);
    const sizes = (p.sizes && p.sizes.length ? p.sizes : ['One Size']).map((s,i)=>`<button class="size ${i===0?'active':''}" onclick="this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${esc(s)}</button>`).join('');
    const canBuy = p.status === 'in-stock';
    const action = canBuy
      ? `<button class="btn" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}', selectedSize()); closeQuickView();">ADD TO CART</button>`
      : `<button class="btn disabled" disabled aria-disabled="true">${p.status==='coming-soon'?'COMING SOON':'OUT OF STOCK'}</button><button class="notify-btn" type="button" onclick="notifyMe('${String(p.id).replace(/'/g,"\\'")}')">NOTIFY ME</button>`;
    const q = document.getElementById('quickContent');
    if(!q) return;
    q.innerHTML = `<div class="quick-grid"><div class="quick-image" style="${bg(imgs.first)}"></div><div class="quick-info"><p class="muted">${esc(p.category||'')}</p><h2>${esc(p.name)}</h2>${priceRow(p,'h3')}<p>${esc(p.desc||'')}</p><div class="sizes">${sizes}</div>${action}<a class="btn light" href="product.html?id=${encodeURIComponent(p.id)}">VIEW FULL PRODUCT</a></div></div>`;
    const modal = document.getElementById('quickModal');
    modal?.classList.add('open');
    modal?.setAttribute('aria-hidden','false');
    document.body.classList.add('panel-open');
  };
  window.closeQuickView = function(){
    const m=document.getElementById('quickModal');
    if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true');}
    document.body.classList.remove('panel-open');
  };
  const oldProductPage = window.productPage;
  window.productPage = function(){
    const detail=document.getElementById('detail');
    if(!detail){ return oldProductPage?.(); }
    const id=new URL(location.href).searchParams.get('id');
    const all = typeof getProducts === 'function' ? getProducts() : [];
    const p=getStatus(all.find(x=>String(x.id)===String(id)) || all[0]);
    if(!p?.id){ detail.innerHTML='<div class="card"><h1>Product not found</h1><a class="btn" href="shop.html">BACK TO SHOP</a></div>'; return; }
    const imgs=getImgs(p); const sizes=(p.sizes&&p.sizes.length?p.sizes:['One Size']);
    window.selectedPhoto=Math.min(Number(window.selectedPhoto||0),imgs.all.length-1);
    window.selectedSize=(window.selectedSize&&sizes.includes(window.selectedSize))?window.selectedSize:sizes[0];
    const canBuy=p.status==='in-stock';
    const action=canBuy
      ? `<button class="btn" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}',selectedSize)">ADD TO CART</button><a class="btn light" href="checkout.html">BUY NOW</a>`
      : `<button class="btn disabled" disabled aria-disabled="true">${p.status==='coming-soon'?'COMING SOON':'OUT OF STOCK'}</button><button class="notify-btn" type="button" onclick="notifyMe('${String(p.id).replace(/'/g,"\\'")}')">NOTIFY ME</button>`;
    detail.innerHTML=`<div class="product-media"><div class="detail-img" style="${bg(imgs.all[window.selectedPhoto])};background-size:contain;background-repeat:no-repeat;background-position:center;background-color:#f5f5f5"></div><div class="product-thumbs">${imgs.all.map((ph,i)=>`<button class="${i===window.selectedPhoto?'active':''}" onclick="selectedPhoto=${i};productPage()" style="${bg(ph)};background-size:cover;background-position:center"></button>`).join('')}</div></div><div class="product-info"><p class="muted">${esc(p.category||'')}</p><h1>${esc(p.name)}</h1>${priceRow(p,'h2')}<p>${esc(p.desc||'')}</p><div class="sizes">${sizes.map(s=>`<span class="size ${s===window.selectedSize?'active':''}" onclick="selectedSize='${esc(s)}';productPage()">${esc(s)}</span>`).join('')}</div><div class="product-actions">${action}</div></div>`;
  };
  document.addEventListener('keydown', e => { if(e.key === 'Escape'){ closeCart(); closeQuickView(); document.getElementById('searchPanel')?.classList.remove('open'); document.body.classList.remove('panel-open'); } });
})();


// --- Final coupon apply button behavior + footer payment wording ---
(function(){
  function esc(v){ return String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
  function getCheckoutSubtotal(){
    const products = typeof getProducts === 'function' ? getProducts() : [];
    return (window.cart || []).reduce((sum,item)=>{
      const p = products.find(x=>String(x.id)===String(item.id));
      const price = Number(p?.salePrice || p?.price || item.price || 0);
      return sum + price * Number(item.qty || 1);
    },0);
  }
  function appliedCode(){ return sessionStorage.getItem('nitaAppliedCoupon') || ''; }
  function setAppliedCode(code){ if(code) sessionStorage.setItem('nitaAppliedCoupon', code); else sessionStorage.removeItem('nitaAppliedCoupon'); }
  function feedback(msg, ok){ const el=document.getElementById('couponFeedback'); if(el){ el.className = ok ? 'coupon-feedback discount-good' : 'coupon-feedback discount-bad'; el.innerHTML = msg; } }
  window.applyCouponCode = function(){
    const form = document.getElementById('checkoutForm'); if(!form) return;
    const code = normalizeCoupon(form.coupon?.value || '');
    const email = String(form.email?.value || (typeof signedDiscountEmail==='function'?signedDiscountEmail():'')).trim().toLowerCase();
    const subtotal = getCheckoutSubtotal();
    if(!code){ setAppliedCode(''); feedback('Enter a coupon code first.', false); renderCheckoutSummary?.(); return; }
    if(!subtotal){ setAppliedCode(''); feedback('No discount is applicable because your cart is empty.', false); renderCheckoutSummary?.(); return; }
    const result = typeof calcCouponDiscount === 'function' ? calcCouponDiscount(code, email, subtotal) : {discount:0};
    if(result && Number(result.discount) > 0){
      setAppliedCode(code);
      feedback(`Coupon applied successfully. You saved ${typeof money==='function'?money(result.discount):('$'+result.discount.toFixed(2))}.`, true);
    } else {
      setAppliedCode('');
      feedback('Coupon code is expired, invalid, already used, or no discount is applicable.', false);
    }
    renderCheckoutSummary?.();
  };
  window.renderCheckoutSummary = function(){
    const form = document.getElementById('checkoutForm');
    const box = document.getElementById('checkoutSummary'); if(!box) return;
    const subtotal = getCheckoutSubtotal();
    const typed = normalizeCoupon(form?.coupon?.value || '');
    const email = String(form?.email?.value || (typeof signedDiscountEmail==='function'?signedDiscountEmail():'')).trim().toLowerCase();
    let code = appliedCode();
    let discount = 0;
    let couponLine = '';
    if(code && typed && code === typed){
      const result = typeof calcCouponDiscount === 'function' ? calcCouponDiscount(code, email, subtotal) : {discount:0};
      discount = Number(result.discount || 0);
      if(discount > 0) couponLine = `<p class="discount-good">Coupon applied: -${typeof money==='function'?money(discount):('$'+discount.toFixed(2))}</p>`;
      else { setAppliedCode(''); couponLine = `<p class="discount-bad">Coupon code is expired, invalid, already used, or no discount is applicable.</p>`; }
    } else if(typed && code !== typed){
      couponLine = `<p class="muted">Click Apply Coupon Code to validate this code.</p>`;
    }
    const total = Math.max(0, subtotal - discount);
    box.innerHTML = `<div class="summary-line"><span>Subtotal</span><b>${typeof money==='function'?money(subtotal):('$'+subtotal.toFixed(2))}</b></div>${discount>0?`<div class="summary-line discount-line"><span>Discount</span><b>-${typeof money==='function'?money(discount):('$'+discount.toFixed(2))}</b></div>`:''}<div class="summary-line total-line"><span>Total</span><b>${typeof money==='function'?money(total):('$'+total.toFixed(2))}</b></div>${couponLine}`;
  };
  const oldMarkCouponUse = window.markCouponUse;
  window.placeOrder = async function(){
    const formEl = document.getElementById('checkoutForm'); if(!formEl) return;
    if(typeof validateCheckoutForm === 'function' && !validateCheckoutForm()) return;
    const form = new FormData(formEl);
    const typed = normalizeCoupon(form.get('coupon'));
    const applied = appliedCode();
    const code = typed && typed === applied ? applied : '';
    const email = String(form.get('email') || (typeof signedDiscountEmail==='function'?signedDiscountEmail():'')).trim().toLowerCase();
    const subtotal = getCheckoutSubtotal();
    let result = code && typeof calcCouponDiscount === 'function' ? calcCouponDiscount(code,email,subtotal) : {discount:0};
    let discount = Number(result.discount || 0);
    if(typed && !code){ feedback('Please click Apply Coupon Code before placing the order, or remove the coupon code.', false); return; }
    if(result.kind==='admin' && discount>0){
      let coupons = typeof getCoupons==='function' ? getCoupons() : [];
      let c = coupons.find(x=>normalizeCoupon(x.code)===code);
      if(c && c.oneTime){ c.usedEmails = c.usedEmails || {}; c.usedEmails[email] = true; if(typeof saveCoupons==='function') await saveCoupons(coupons); }
    }
    if(result.kind==='nita10' && discount>0){
      let uses = JSON.parse(localStorage.getItem('nitaDiscountUses')||'{}'); uses[email]=true; localStorage.setItem('nitaDiscountUses',JSON.stringify(uses));
      try{ await saveCloudKey?.('nitaDiscountUses', uses); }catch(e){}
    }
    const address={city:form.get('city'),street:form.get('street'),building:form.get('building'),floor:form.get('floor'),apartment:form.get('apartment'),landmark:form.get('landmark'),preferredTime:form.get('preferredTime'),notes:form.get('notes')};
    const order={id:'NS'+Date.now(),date:new Date().toLocaleString(),customer:(form.get('name')||'').trim(),phone:form.get('phone'),email,address,payment:'Cash on Delivery',status:'New order',items:window.cart||[],subtotal,discount,coupon:code,total:Math.max(0,subtotal-discount)};
    let orders = JSON.parse(localStorage.getItem('nitaOrders')||'[]'); orders.push(order); localStorage.setItem('nitaOrders',JSON.stringify(orders));
    try{ await saveCloudKey?.('nitaOrders', orders); }catch(e){}
    if(form.get('saveAddress') && email){
      try{ const users=JSON.parse(localStorage.getItem('nitaUsersByEmail')||'{}'); if(users[email]){users[email].defaultAddress=address; users[email].phone=form.get('phone')||users[email].phone; localStorage.setItem('nitaUsersByEmail',JSON.stringify(users)); await saveCloudKey?.('nitaUsersByEmail',users);} }catch(e){}
    }
    try{ await sendStoreEmail?.({type:'order_confirmation',to:email,order}); await sendStoreEmail?.({type:'admin_order',order}); }catch(e){}
    window.cart=[]; if(typeof saveCart==='function') saveCart(); setAppliedCode(''); location.href='order-success.html';
  };
  document.addEventListener('input', e=>{ if(e.target?.name==='coupon'){ setAppliedCode(''); feedback('', true); renderCheckoutSummary?.(); } });
})();

// === NITA STYLE ACCOUNT SESSION + ORDER CONFIRM + ADMIN CATEGORY FINAL FIX ===
(function(){
  function esc(v){return String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function readJSON(key, fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}catch(e){return fallback;}}
  function writeJSON(key, value){localStorage.setItem(key, JSON.stringify(value));}
  function emailOf(user){return String(user?.email||'').trim().toLowerCase();}
  function restoreSessionUser(){
    const saved=readJSON('nitaUser',null);
    const sessionEmail=String(localStorage.getItem('nitaSessionEmail')||saved?.email||'').trim().toLowerCase();
    if(saved?.email){
      try{ currentUser=saved; }catch(e){}
      window.currentUser=saved;
      localStorage.setItem('nitaSessionEmail', emailOf(saved));
      return saved;
    }
    if(sessionEmail){
      const users=readJSON('nitaUsersByEmail',{});
      if(users[sessionEmail]){
        localStorage.setItem('nitaUser', JSON.stringify(users[sessionEmail]));
        try{ currentUser=users[sessionEmail]; }catch(e){}
        window.currentUser=users[sessionEmail];
        return users[sessionEmail];
      }
    }
    return null;
  }
  window.restoreSessionUser = restoreSessionUser;

  const oldInit = window.init;
  window.init = async function(){
    restoreSessionUser();
    const result = oldInit ? await oldInit.apply(this, arguments) : undefined;
    restoreSessionUser();
    return result;
  };

  const oldSubmitAuth = window.submitAuth;
  window.submitAuth = async function(){
    const email=(window.normalizeEmail?normalizeEmail(document.getElementById('authEmail')?.value):String(document.getElementById('authEmail')?.value||'').trim().toLowerCase());
    const password=document.getElementById('authPassword')?.value||'';
    const msg=document.getElementById('authMessage');
    if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ if(msg)msg.textContent='Please enter a valid email address.'; return; }
    if(password.length<4){ if(msg)msg.textContent='Please enter a password.'; return; }
    try{
      if(typeof loadSharedStore==='function') await loadSharedStore();
      const users=(typeof getJSON==='function'?getJSON('nitaUsersByEmail',{}):readJSON('nitaUsersByEmail',{}));
      const existing=users[email]; const mode=window.authMode||'signin';
      if(mode==='signin' && existing && existing.password && existing.password!==password){ if(msg)msg.textContent='Wrong password for this account.'; return; }
      if(mode==='signin' && !existing){ if(msg)msg.innerHTML='No account found with this email. Click <b>Sign up</b> to create one.'; return; }
      const user={...(existing||{}), email, password, firstName:existing?.firstName||'', lastName:existing?.lastName||'', phone:existing?.phone||'', addresses:existing?.addresses||[], defaultAddress:existing?.defaultAddress||null, createdAt:existing?.createdAt||new Date().toISOString()};
      if(mode==='signup'){
        user.firstName=(document.getElementById('authFirst')?.value||user.firstName||'').trim();
        user.lastName=(document.getElementById('authLast')?.value||user.lastName||'').trim();
        user.phone=(document.getElementById('authPhone')?.value||user.phone||'').trim();
        if(!existing) user.firstOrderCode='NITA10';
      }
      users[email]=user;
      if(typeof setJSON==='function') setJSON('nitaUsersByEmail',users); else writeJSON('nitaUsersByEmail',users);
      localStorage.setItem('nitaUser', JSON.stringify(user));
      localStorage.setItem('nitaSessionEmail', email);
      try{ currentUser=user; }catch(e){}
      window.currentUser=user;
      if(typeof saveUsers==='function') await saveUsers(users); else if(typeof saveCloudKey==='function') await saveCloudKey('nitaUsersByEmail', users);
      if(mode==='signup' && !existing){ try{ await sendStoreEmail?.({type:'signup_discount',to:email,code:'NITA10',user}); }catch(e){} }
      location.href='index.html';
    }catch(e){ console.error(e); if(msg) msg.textContent='Something went wrong. Please try again.'; }
  };
  window.login = window.submitAuth;

  const oldRenderAccount = window.renderAccount;
  window.renderAccount = async function(){
    restoreSessionUser();
    if(!readJSON('nitaUser',null)?.email){
      const root=document.getElementById('accountRoot');
      if(root) root.innerHTML='<div class="card account-auth"><h1>Sign in</h1><p class="muted">Sign in to view your saved details, addresses, and order tracking.</p><a class="btn" href="login.html">SIGN IN</a></div>';
      return;
    }
    return oldRenderAccount ? oldRenderAccount.apply(this, arguments) : undefined;
  };

  const oldLogout = window.logoutUser;
  window.logoutUser = function(){ localStorage.removeItem('nitaUser'); localStorage.removeItem('nitaSessionEmail'); try{currentUser=null;}catch(e){} window.currentUser=null; if(oldLogout) oldLogout(); else location.href='index.html'; };

  const oldDelete = window.deleteAccount;
  window.deleteAccount = function(){
    if(!confirm('Delete this account from this website?')) return;
    const u=readJSON('nitaUser',null); const email=emailOf(u);
    if(email){ const users=readJSON('nitaUsersByEmail',{}); delete users[email]; writeJSON('nitaUsersByEmail',users); try{saveCloudKey?.('nitaUsersByEmail',users);}catch(e){} }
    localStorage.removeItem('nitaUser'); localStorage.removeItem('nitaSessionEmail'); try{currentUser=null;}catch(e){} window.currentUser=null; location.href='index.html';
  };

  // Confirm before admin order status changes and save globally.
  window.updateOrder = async function(i, v){
    const orders=(typeof getJSON==='function'?getJSON('nitaOrders',[]):readJSON('nitaOrders',[]));
    const order=orders[i];
    if(!order) return;
    const oldStatus=order.status||'New order';
    if(v===oldStatus) return;
    const ok=confirm(`Confirm order status update?\n\nOrder: ${order.id||''}\nFrom: ${oldStatus}\nTo: ${v}`);
    if(!ok){ if(typeof renderAdmin==='function') renderAdmin(); return; }
    order.status=v;
    if(typeof setJSON==='function') setJSON('nitaOrders',orders); else writeJSON('nitaOrders',orders);
    try{ if(typeof saveCloudKey==='function') await saveCloudKey('nitaOrders', orders); }catch(e){ console.warn(e); }
    if(typeof toast==='function') toast('Order status updated.');
    if(typeof renderAdmin==='function') renderAdmin();
  };

  // Make sure admin forms always have dropdown category / color / style / homepage section controls.
  window.NITA_ADMIN_CATEGORY_OPTIONS = ['Dresses','Skirts','T-Shirts','Tops','Pants','Bags','Scarves','Overalls'];
  window.NITA_ADMIN_COLLECTION_OPTIONS = ['Everyday Edit','Minimal Essentials','Evening Pieces','Accessories','Price Drops'];
  window.NITA_COLOR_OPTIONS = ['Black','White','Ivory','Cream','Beige','Taupe','Grey','Silver','Gold','Rose Gold','Bronze','Brown','Cognac','Camel','Navy','Blue','Denim Blue','Red','Burgundy','Pink','Green','Olive','Khaki','Yellow','Orange','Purple','Print / Pattern','Multi-color'];
  window.NITA_STYLE_OPTIONS = ['Clean everyday piece','Elegant evening piece','Minimal essential','Soft feminine silhouette','Relaxed boutique fit','Premium casual look','Statement piece','Light summer piece','Structured tailored style'];
})();
// === END NITA STYLE ACCOUNT SESSION + ORDER CONFIRM + ADMIN CATEGORY FINAL FIX ===

// === NITA STYLE ACCOUNT ACCESS FINAL FIX ===
// Fixes the issue where a signed-in customer clicks Account and is sent back to Sign In.
(function(){
  function safe(v){return String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function read(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}catch(e){return fallback;}}
  function activeUser(){
    let u = read('nitaUser', null);
    const users = read('nitaUsersByEmail', {});
    const email = String(u?.email || localStorage.getItem('nitaSessionEmail') || '').trim().toLowerCase();
    if(email && users[email]) u = {...users[email], email};
    if(u?.email){
      localStorage.setItem('nitaUser', JSON.stringify(u));
      localStorage.setItem('nitaSessionEmail', String(u.email).toLowerCase());
      try{ currentUser = u; }catch(e){}
      window.currentUser = u;
      return u;
    }
    return null;
  }
  window.nitaActiveUser = activeUser;

  // Rebuild the header so the Account link always goes to account.html.
  // If the customer is not signed in, account.html shows the sign-in card.
  header = function(){
    const user = activeUser();
    const isAdmin = ADMIN_EMAILS.includes(String(user?.email||'').toLowerCase());
    const admin = isAdmin ? '<a class="admin-link" href="admin.html">ADMIN</a>' : '';
    return `<header class="topbar"><nav class="nav"><div class="nav-item"><a href="shop.html">SHOP</a><div class="mega compact-mega"><div class="mega-block"><h4>SHOP BY CATEGORY</h4><div class="mega-links"><a href="shop.html?cat=Dresses">Dresses</a><a href="shop.html?cat=Skirts">Skirts</a><a href="shop.html?cat=T-Shirts">T-Shirts</a><a href="shop.html?cat=Tops">Tops</a><a href="shop.html?cat=Pants">Pants</a><a href="shop.html?cat=Bags">Bags</a><a href="shop.html?cat=Scarves">Scarves</a><a href="shop.html?cat=Overalls">Overalls</a></div></div><div class="mega-block"><h4>SHOP BY EDIT</h4><div class="mega-links"><a href="collections.html">New Arrivals</a><a href="shop.html?cat=Essentials">Essentials</a><a href="shop.html?cat=Evening">Evening Pieces</a><a href="shop.html?cat=Sale">Price Drops</a></div></div></div></div><div class="nav-item"><a href="collections.html">COLLECTIONS</a><div class="mega compact-mega"><div class="mega-block"><h4>FEATURED</h4><div class="mega-links"><a href="collections.html">Latest Edit</a><a href="collections.html">Everyday Boutique</a><a href="collections.html">Minimal Essentials</a></div></div><div class="mega-block"><h4>OCCASION</h4><div class="mega-links"><a href="shop.html?cat=Daywear">Daywear</a><a href="shop.html?cat=Evening">Evening</a><a href="shop.html?cat=Accessories">Accessories</a></div></div></div></div><a href="about.html">ABOUT</a></nav><a class="brand" href="index.html"><img src="assets/logo-cropped.png" alt="Nita Style"></a><div class="actions"><button onclick="openSearch()" style="border:0;background:0;font-weight:800;cursor:pointer">SEARCH</button><a class="account-nav-link" href="${user?'account.html':'login.html'}">${user?'ACCOUNT':'SIGN IN'}</a>${admin}<a class="liked-nav-link" href="liked.html" aria-label="Liked items" title="Liked items"><span class="heart-nav">♡</span><span class="liked-label">LIKED</span><span class="liked-count">0</span></a><button class="cart-icon-btn" aria-label="Cart" onclick="openCart()"><span class="cart-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.5 8.5h11l.8 11H5.7l.8-11Z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/></svg></span><span class="cart-count">0</span></button></div></header><aside class="search-panel" id="searchPanel"><button class="close" onclick="closeSearch()">×</button><h2>Search</h2><input class="field" id="searchInput" placeholder="Search dresses, skirts, t-shirts, tops, pants, bags..." oninput="renderSearch()"><div id="searchResults"></div></aside><aside class="cart-panel" id="cartPanel"><button class="close" onclick="closeCart()">×</button><h2>Your Cart</h2><div id="cartItems"></div><a class="btn" href="checkout.html" style="display:block;text-align:center;margin-top:20px">CHECKOUT</a></aside>`;
  };

  function statusStepClass(orderStatus, step){
    const order = ['New order','Order submitted','Confirmed','Packing','Out for delivery','Delivered'];
    const normalized = orderStatus === 'New order' ? 'Order submitted' : orderStatus;
    return order.indexOf(normalized) >= order.indexOf(step) ? 'done' : '';
  }
  function orderCard(order){
    const steps=['Order submitted','Confirmed','Packing','Out for delivery','Delivered'];
    const items=(order.items||[]).map(i=>`<span>${safe(i.name||i.id||'Product')} × ${i.qty||1}</span>`).join('');
    return `<div class="account-order detailed-order"><div class="order-top"><div><b>${safe(order.id||'Order')}</b><br><span class="muted">${safe(order.date||'')} · ${safe(order.payment||'Cash on Delivery')}</span></div><div><b>${typeof money==='function'?money(order.total||0):('$'+Number(order.total||0).toFixed(2))}</b><br><span class="order-status">${safe(order.status||'Order submitted')}</span></div></div><div class="order-roadmap-wrap"><div class="order-roadmap">${steps.map(s=>`<span class="${statusStepClass(order.status||'Order submitted',s)}">${s}</span>`).join('')}</div></div><p class="muted order-items">${items||'Order details saved.'}</p></div>`;
  }
  function orderList(orders, empty){return orders.length ? orders.map(orderCard).join('') : `<p class="muted">${empty}</p>`;}

  // Final account renderer: does not send a signed-in user back to login.
  window.renderAccount = async function(){
    if(typeof loadSharedStore === 'function'){
      try{ await loadSharedStore(); }catch(e){ console.warn('Account cloud refresh skipped', e); }
    }
    const user = activeUser();
    const root=document.getElementById('accountRoot');
    if(!root) return;
    if(!user?.email){
      root.innerHTML = `<div class="card account-auth"><h1>Sign in</h1><p class="muted">Sign in to view your saved details, addresses, previous orders, and ongoing orders.</p><a class="btn" href="login.html">SIGN IN / CREATE ACCOUNT</a></div>`;
      return;
    }
    const users=read('nitaUsersByEmail',{}); const saved={...user,...(users[String(user.email).toLowerCase()]||{})};
    const addr=saved.defaultAddress||{};
    const orders=read('nitaOrders',[]).filter(o=>String(o.email||'').toLowerCase()===String(saved.email).toLowerCase());
    const previous=orders.filter(o=>String(o.status||'').toLowerCase()==='delivered');
    const ongoing=orders.filter(o=>String(o.status||'').toLowerCase()!=='delivered');
    root.innerHTML = `<div class="account-hero clean-account-hero"><div><p class="eyebrow">My account</p><h1>Welcome${saved.firstName?' '+safe(saved.firstName):''}</h1><p class="muted">Manage your profile, saved delivery address, and order tracking.</p></div></div><div class="account-grid"><section class="card account-card"><h2>Personal information</h2><p class="muted">Your email is your login and cannot be edited.</p><div class="form-grid"><div><label>First name</label><input class="field" id="accFirst" value="${safe(saved.firstName||'')}" placeholder="First name"></div><div><label>Last name</label><input class="field" id="accLast" value="${safe(saved.lastName||'')}" placeholder="Last name"></div><div><label>Email address</label><input class="field disabled-field" value="${safe(saved.email)}" disabled></div><div><label>Phone number</label><input class="field" id="accPhone" value="${safe(saved.phone||'')}" placeholder="Phone number"></div></div><button class="btn" onclick="saveAccountInfo()">SAVE DETAILS</button></section><section class="card account-card"><h2>Saved delivery address</h2>${typeof accountAddressFields==='function'?accountAddressFields('accAddr_',addr):''}<button class="btn" onclick="saveAccountAddress()">SAVE ADDRESS</button></section><section class="card account-card full-span"><h2>Ongoing orders</h2><div class="orders-list">${orderList(ongoing,'No ongoing orders yet.')}</div></section><section class="card account-card full-span"><h2>Previous orders</h2><div class="orders-list">${orderList(previous,'No previous orders yet.')}</div></section><section class="card danger-zone full-span"><h2>Account control</h2><p class="muted">Log out safely, or permanently remove your saved customer profile from this website.</p><button class="logout-outline-btn" type="button" onclick="logoutUser()" style="background:#fff!important;color:#111!important;border:2px solid #b00020!important;">LOG OUT</button><button class="btn danger delete-account-btn" onclick="deleteAccount()">DELETE ACCOUNT</button></section></div>`;
  };
})();


// === Nita Style finger-scroll + auto-scroll resume for homepage rows ===
(function(){
  function setupAutoRows(){
    document.querySelectorAll('.trending-scroll,.new-arrivals-scroll').forEach(section=>{
      if(section.dataset.nitaAutoReady==='1') return;
      section.dataset.nitaAutoReady='1';
      let resumeTimer=null;
      const track=()=>section.querySelector('.product-marquee');
      const pause=()=>{const t=track(); if(t) t.style.animationPlayState='paused'; clearTimeout(resumeTimer);};
      const resume=()=>{clearTimeout(resumeTimer); resumeTimer=setTimeout(()=>{const t=track(); if(t) t.style.animationPlayState='running';},650);};
      section.addEventListener('pointerdown',pause,{passive:true});
      section.addEventListener('pointerup',resume,{passive:true});
      section.addEventListener('pointercancel',resume,{passive:true});
      section.addEventListener('touchstart',pause,{passive:true});
      section.addEventListener('touchend',resume,{passive:true});
      section.addEventListener('touchcancel',resume,{passive:true});
      section.addEventListener('scroll',()=>{pause();resume();},{passive:true});
    });
  }
  window.addEventListener('load',()=>setTimeout(setupAutoRows,900));
  window.addEventListener('nita-store-ready',()=>setTimeout(setupAutoRows,150));
  const oldRender=window.renderHomeSections;
  if(typeof oldRender==='function'){
    window.renderHomeSections=function(){oldRender.apply(this,arguments);setTimeout(setupAutoRows,80);};
  }
})();

// --- FINAL QUICK VIEW RELIABILITY FIX (desktop/tablet/phone) ---
(function(){
  function esc(v){return String(v ?? '').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function products(){try{return typeof getProducts==='function'?getProducts():[]}catch(e){return []}}
  function normalize(p){try{return typeof normalizeProductStatus==='function'?normalizeProductStatus(p):(p||{})}catch(e){return p||{}}}
  function imgs(p){try{return typeof productImagesForDisplay==='function'?productImagesForDisplay(p):{first:p?.img||'linear-gradient(135deg,#fff,#ddd)',second:p?.img||'linear-gradient(135deg,#fff,#ddd)',all:[p?.img||'linear-gradient(135deg,#fff,#ddd)']}}catch(e){return {first:'linear-gradient(135deg,#fff,#ddd)',second:'linear-gradient(135deg,#fff,#ddd)',all:['linear-gradient(135deg,#fff,#ddd)']}}}
  function bg(u){try{return typeof cssBgImage==='function'?cssBgImage(u):(String(u||'').startsWith('data:')?`background-image:url(${u})`:`background:${u||'linear-gradient(135deg,#fff,#ddd)'}`)}catch(e){return 'background:linear-gradient(135deg,#fff,#ddd)'}}
  function moneySafe(v){try{return typeof money==='function'?money(v):('$'+Number(v||0).toFixed(2))}catch(e){return '$'+Number(v||0).toFixed(2)}}
  function priceRow(p){try{return typeof productPriceStatusRow==='function'?productPriceStatusRow(p,'h3'):`<h3>${moneySafe(p.salePrice||p.price)}</h3>`}catch(e){return `<h3>${moneySafe(p.salePrice||p.price)}</h3>`}}
  function statusHtml(status){try{return typeof stockStatusHtml==='function'?stockStatusHtml(status):''}catch(e){return ''}}
  function modal(){
    let m=document.getElementById('quickModal');
    if(!m){
      document.body.insertAdjacentHTML('beforeend',`<div class="quick-modal" id="quickModal" aria-hidden="true"><div class="quick-backdrop" data-quick-close="true"></div><div class="quick-dialog" role="dialog" aria-modal="true"><button class="quick-close" type="button" data-quick-close="true">×</button><div id="quickContent"></div></div></div>`);
      m=document.getElementById('quickModal');
    }
    return m;
  }
  function getQuickIdFromTarget(t){
    const btn=t.closest?.('.quick-view-btn,[data-quick-id]');
    if(btn?.dataset?.quickId) return btn.dataset.quickId;
    const onclick=btn?.getAttribute?.('onclick')||'';
    let m=onclick.match(/openQuickView\(['"]([^'"]+)['"]\)/); if(m) return m[1];
    const card=t.closest?.('.product');
    const href=card?.querySelector?.('a[href*="product.html"]')?.getAttribute('href')||'';
    try{const u=new URL(href,location.href); return u.searchParams.get('id')||'';}catch(e){return ''}
  }
  window.selectedQuickSize=function(){return document.querySelector('#quickContent .size.active')?.textContent || 'One Size'};
  window.openQuickView=function(id){
    const p=normalize(products().find(x=>String(x.id)===String(id)));
    if(!p?.id){return false;}
    const im=imgs(p); const status=p.status || (p.soldOut?'out-of-stock':'in-stock');
    const sizes=(Array.isArray(p.sizes)&&p.sizes.length?p.sizes:['One Size']).map((s,i)=>`<button type="button" class="size ${i===0?'active':''}" onclick="this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${esc(s)}</button>`).join('');
    const canBuy=status==='in-stock';
    const action=canBuy
      ? `<button class="btn quick-add" type="button" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}', selectedQuickSize()); closeQuickView();">ADD TO CART</button>`
      : `<button class="btn disabled quick-disabled" type="button" disabled aria-disabled="true">${status==='coming-soon'?'COMING SOON':'OUT OF STOCK'}</button><button class="notify-btn" type="button" onclick="notifyMe && notifyMe('${String(p.id).replace(/'/g,"\\'")}')">NOTIFY ME</button>`;
    modal().querySelector('#quickContent').innerHTML=`<div class="quick-grid"><div class="quick-image" style="${bg(im.first)}"></div><div class="quick-info"><p class="muted">${esc(p.category||'')}</p><h2>${esc(p.name||'Product')}</h2>${priceRow(p)}<p>${esc(p.desc||'')}</p><div class="sizes">${sizes}</div>${action}<a class="btn light" href="product.html?id=${encodeURIComponent(p.id)}">VIEW FULL PRODUCT</a></div></div>`;
    const m=modal(); m.classList.add('open'); m.setAttribute('aria-hidden','false'); document.body.classList.add('panel-open','quick-open');
    return false;
  };
  window.closeQuickView=function(){const m=document.getElementById('quickModal'); if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true')} document.body.classList.remove('panel-open','quick-open')};
  document.addEventListener('click',function(e){
    if(e.target.closest?.('[data-quick-close]')){e.preventDefault();e.stopPropagation();closeQuickView();return;}
    const btn=e.target.closest?.('.quick-view-btn,[data-quick-id]');
    if(!btn) return;
    const id=getQuickIdFromTarget(e.target);
    if(id){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();openQuickView(id);}
  },true);
  document.addEventListener('touchend',function(e){
    const btn=e.target.closest?.('.quick-view-btn,[data-quick-id]'); if(!btn) return;
    const id=getQuickIdFromTarget(e.target); if(id){e.preventDefault();e.stopPropagation();openQuickView(id);}
  },{capture:true,passive:false});
  const oldProductCard=window.productCard;
  window.productCard=function(raw){
    const p=normalize(raw); const im=imgs(p); const sale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price);
    const title=esc(p.name||'Product');
    const price=(typeof productPriceStatusRow==='function')?productPriceStatusRow(p,'p'):`<p>${moneySafe(p.salePrice||p.price)}</p>${statusHtml(p.status)}`;
    return `<article class="product status-${esc(p.status||'in-stock')}" data-product-id="${esc(p.id)}"><a class="product-hit" href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-img">${sale?'<span class="sale-badge">PRICE DROP</span>':''}<span class="product-img-layer product-img-primary" style="${bg(im.first)}"></span><span class="product-img-layer product-img-secondary" style="${bg(im.second)}"></span></div><h3>${title}</h3>${price}</a><button class="quick-view-btn" type="button" data-quick-id="${esc(p.id)}" aria-label="Quick view ${title}">QUICK VIEW</button></article>`;
  };
  window.renderProducts=function(el='#products',list=products()){const node=document.querySelector(el); if(node) node.innerHTML=(list||[]).map(window.productCard).join('') || '<p class="muted">No products listed yet.</p>';};
})();


// === NITA STYLE PRODUCT IMAGE + OUT-OF-STOCK SIZE FINAL POLISH ===
(function(){
  const SIZE_OPTIONS=['XS','S','M','L','XL','One Size'];
  function esc(v){return String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function uniq(arr){return [...new Set((arr||[]).map(x=>String(x||'').trim()).filter(Boolean))];}
  function bg(u){try{return typeof cssBgImage==='function'?cssBgImage(u):(String(u||'').startsWith('data:')?`background-image:url(${u})`:`background:${u||'linear-gradient(135deg,#fff,#ddd)'}`)}catch(e){return 'background:linear-gradient(135deg,#fff,#ddd)';}}
  function moneySafe(v){try{return typeof money==='function'?money(v):('$'+Number(v||0).toFixed(2));}catch(e){return '$'+Number(v||0).toFixed(2);}}
  function products(){try{return typeof getProducts==='function'?getProducts():[]}catch(e){return []}}
  function normalize(p){try{p=typeof normalizeProductStatus==='function'?normalizeProductStatus(p||{}):(p||{});}catch(e){p=p||{}}; p.outOfStockSizes=uniq(p.outOfStockSizes||[]); return p;}
  function sizesOf(p){return uniq(p.sizes&&p.sizes.length?p.sizes:['One Size']);}
  function isSizeOOS(p,s){return (p.outOfStockSizes||[]).map(x=>x.toLowerCase()).includes(String(s).toLowerCase());}
  function sizeButtonsHTML(selected=[], unavailable=[], editable=false){
    const sel=new Set(uniq(selected)); const off=new Set(uniq(unavailable));
    return SIZE_OPTIONS.map(s=>`<button type="button" class="pill ${sel.has(s)?'on':''} ${off.has(s)?'oos-on':''}" data-size="${esc(s)}" onclick="this.classList.toggle('on')">${esc(s)}</button>`).join('');
  }
  function selectedSizesFrom(root,selector){return [...root.querySelectorAll(selector||'.size-picker .pill.on')].map(b=>b.dataset.size||b.textContent.trim()).filter(Boolean);}
  window.nitaSelectedSizesFrom=selectedSizesFrom;

  // Upgrade existing add-product form with an out-of-stock size picker below available sizes.
  function ensureAdminOosPicker(){
    const sp=document.getElementById('sizePicker');
    if(sp && !document.getElementById('sizeOutPicker')){
      const wrap=document.createElement('div');
      wrap.className='full admin-size-oos-wrap';
      wrap.innerHTML=`<label>Out-of-stock sizes</label><p class="field-help">Choose sizes that exist for this product but are currently unavailable.</p><div id="sizeOutPicker" class="size-picker oos-picker">${SIZE_OPTIONS.map(s=>`<button type="button" class="pill" data-size="${s}" onclick="this.classList.toggle('on')">${s}</button>`).join('')}</div>`;
      sp.closest('.full')?.insertAdjacentElement('afterend',wrap);
    }
  }
  window.addEventListener('load',()=>setTimeout(ensureAdminOosPicker,500));
  const oldRenderAdmin=window.renderAdmin;
  if(typeof oldRenderAdmin==='function') window.renderAdmin=async function(){const r=await oldRenderAdmin.apply(this,arguments); setTimeout(ensureAdminOosPicker,50); return r;};

  // Save new product with available sizes and unavailable sizes.
  const oldAdd=window.addProductAdmin;
  window.addProductAdmin=async function(){
    const beforeCount=products().length;
    if(oldAdd) await oldAdd.apply(this,arguments);
    try{
      const ps=products();
      const p=ps[ps.length-1];
      if(ps.length>beforeCount && p){
        p.outOfStockSizes=selectedSizesFrom(document,'.oos-picker .pill.on,#sizeOutPicker .pill.on').filter(s=>sizesOf(p).includes(s));
        if(typeof saveProducts==='function') await saveProducts(ps);
        if(typeof renderAdmin==='function') renderAdmin();
      }
    }catch(e){console.warn('Out-of-stock size save skipped',e)}
  };

  // Admin editor with available sizes + out-of-stock sizes.
  const prevEditor=window.productEditorHTML;
  window.productEditorHTML=function(raw){
    const p=normalize(raw); const selected=sizesOf(p); const unavailable=uniq(p.outOfStockSizes||[]);
    let html = prevEditor ? prevEditor(raw) : '';
    if(!html) return html;
    // Replace the available-size block with two separate controlled blocks.
    html = html.replace(/<div class="full"><label>Available sizes<\/label><div class="size-picker">[\s\S]*?<\/div><\/div>/, `<div class="full"><label>Available sizes</label><p class="field-help">Choose every size this product can exist in.</p><div class="size-picker available-size-picker">${sizeButtonsHTML(selected,[],true)}</div></div><div class="full admin-size-oos-wrap"><label>Out-of-stock sizes</label><p class="field-help">These sizes will be visible but disabled with a diagonal line for customers.</p><div class="size-picker oos-picker edit-oos-picker">${SIZE_OPTIONS.map(s=>`<button type="button" class="pill ${unavailable.includes(s)?'on':''}" data-size="${esc(s)}" onclick="this.classList.toggle('on')">${esc(s)}</button>`).join('')}</div></div>`);
    return html;
  };

  const oldSaveEditor=window.saveProductEditor;
  window.saveProductEditor=async function(id){
    await (oldSaveEditor ? oldSaveEditor.apply(this,arguments) : Promise.resolve());
    try{
      const ps=products(); const p=ps.find(x=>String(x.id)===String(id)); const root=document.getElementById('editor-'+id); if(!p||!root)return;
      p.sizes=selectedSizesFrom(root,'.available-size-picker .pill.on,.size-picker:not(.oos-picker) .pill.on');
      if(!p.sizes.length) p.sizes=['One Size'];
      p.outOfStockSizes=selectedSizesFrom(root,'.oos-picker .pill.on').filter(s=>p.sizes.includes(s));
      if(typeof saveProducts==='function') await saveProducts(ps);
      if(typeof renderAdmin==='function') renderAdmin();
    }catch(e){console.warn('Out-of-stock size editor save skipped',e)}
  };

  // Product page renderer: contained image, clean gallery, unavailable sizes disabled.
  window.productPage=function(){
    const detail=document.getElementById('detail'); if(!detail) return;
    let id=new URL(location.href).searchParams.get('id')||'';
    let p=normalize(products().find(x=>String(x.id)===String(id)) || products()[0]);
    if(!p?.id){detail.innerHTML='<p class="muted">Product not found.</p>'; return;}
    const imgs=(typeof productImagesForDisplay==='function'?productImagesForDisplay(p):{all:[p.img||'linear-gradient(135deg,#fff,#ddd)']});
    window.selectedPhoto=Math.min(Number(window.selectedPhoto||0),imgs.all.length-1);
    const sizes=sizesOf(p);
    if(!window.selectedSize || !sizes.includes(window.selectedSize) || isSizeOOS(p,window.selectedSize)) window.selectedSize=sizes.find(s=>!isSizeOOS(p,s))||sizes[0];
    const canBuy=p.status==='in-stock' && !isSizeOOS(p,window.selectedSize);
    const sizesHtml=sizes.map(s=>`<button type="button" class="size ${s===window.selectedSize?'active':''} ${isSizeOOS(p,s)?'size-disabled':''}" ${isSizeOOS(p,s)?'disabled aria-disabled="true" title="Out of stock"':`onclick="selectedSize='${esc(s)}';productPage()"`}>${esc(s)}</button>`).join('');
    const action=canBuy?`<button class="btn" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}',selectedSize)">ADD TO CART</button><a class="btn light" href="checkout.html">BUY NOW</a>`:`<button class="btn disabled" disabled aria-disabled="true">${p.status==='coming-soon'?'COMING SOON':(p.status==='out-of-stock'?'OUT OF STOCK':'SIZE OUT OF STOCK')}</button><button class="notify-btn" type="button" onclick="notifyMe&&notifyMe('${String(p.id).replace(/'/g,"\\'")}')">NOTIFY ME</button>`;
    const price=typeof productPriceStatusRow==='function'?productPriceStatusRow(p,'h2'):`<h2>${moneySafe(p.salePrice||p.price)}</h2>`;
    detail.innerHTML=`<div class="product-media"><div class="detail-img" style="${bg(imgs.all[window.selectedPhoto])}"></div><div class="product-thumbs">${imgs.all.map((ph,i)=>`<button class="${i===window.selectedPhoto?'active':''}" onclick="selectedPhoto=${i};productPage()" style="${bg(ph)}"></button>`).join('')}</div></div><div class="product-info"><p class="muted">${esc(p.category||'')}</p><h1>${esc(p.name||'Product')}</h1>${price}<p>${esc(p.desc||'')}</p><div class="sizes product-size-list">${sizesHtml}</div><div class="product-actions">${action}</div></div>`;
  };

  // Quick view disabled sizes too.
  const oldQuick=window.openQuickView;
  window.openQuickView=function(id){
    const p=normalize(products().find(x=>String(x.id)===String(id))); if(!p?.id) return oldQuick?oldQuick(id):false;
    const im=typeof productImagesForDisplay==='function'?productImagesForDisplay(p):{first:p.img||'linear-gradient(135deg,#fff,#ddd)'};
    const sizes=sizesOf(p); const firstAvailable=sizes.find(s=>!isSizeOOS(p,s))||sizes[0];
    window.selectedQuickSize=()=>document.querySelector('#quickContent .size.active')?.textContent || firstAvailable;
    let m=document.getElementById('quickModal'); if(!m && oldQuick) return oldQuick(id);
    const sizesHtml=sizes.map(s=>`<button type="button" class="size ${s===firstAvailable?'active':''} ${isSizeOOS(p,s)?'size-disabled':''}" ${isSizeOOS(p,s)?'disabled aria-disabled="true"':`onclick="this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active')"`}>${esc(s)}</button>`).join('');
    const canBuy=p.status==='in-stock' && !isSizeOOS(p,firstAvailable);
    const action=canBuy?`<button class="btn quick-add" type="button" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}', selectedQuickSize()); closeQuickView();">ADD TO CART</button>`:`<button class="btn disabled quick-disabled" type="button" disabled>${p.status==='coming-soon'?'COMING SOON':(p.status==='out-of-stock'?'OUT OF STOCK':'SIZE OUT OF STOCK')}</button><button class="notify-btn" type="button" onclick="notifyMe&&notifyMe('${String(p.id).replace(/'/g,"\\'")}')">NOTIFY ME</button>`;
    document.getElementById('quickContent').innerHTML=`<div class="quick-grid"><div class="quick-image" style="${bg(im.first)}"></div><div class="quick-info"><p class="muted">${esc(p.category||'')}</p><h2>${esc(p.name||'Product')}</h2>${typeof productPriceStatusRow==='function'?productPriceStatusRow(p,'h3'):`<h3>${moneySafe(p.salePrice||p.price)}</h3>`}<p>${esc(p.desc||'')}</p><div class="sizes">${sizesHtml}</div>${action}<a class="btn light" href="product.html?id=${encodeURIComponent(p.id)}">VIEW FULL PRODUCT</a></div></div>`;
    m.classList.add('open'); m.setAttribute('aria-hidden','false'); document.body.classList.add('panel-open','quick-open'); return false;
  };
})();
// === END NITA STYLE PRODUCT IMAGE + OUT-OF-STOCK SIZE FINAL POLISH ===

// === NITA STYLE FINAL SIZE STOCK + AUTO MARQUEE REVERT PATCH ===
(function(){
  const SIZE_OPTIONS = ['XS','S','M','L','XL','One Size'];
  const esc = (v)=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const uniq = (arr)=>[...new Set((arr||[]).map(x=>String(x||'').trim()).filter(Boolean))];
  const moneySafe=(v)=>{try{return typeof money==='function'?money(v):'$'+Number(v||0).toFixed(2)}catch(e){return '$'+Number(v||0).toFixed(2)}};
  const bg=(u)=>{try{return typeof cssBgImage==='function'?cssBgImage(u):(String(u||'').startsWith('data:')?`background-image:url(${u})`:`background:${u||'linear-gradient(135deg,#fff,#ddd)'}`)}catch(e){return 'background:linear-gradient(135deg,#fff,#ddd)'}};
  const products=()=>{try{return typeof getProducts==='function'?getProducts():[]}catch(e){return []}};
  const norm=(p)=>{p=(p||{}); try{p=typeof normalizeProductStatus==='function'?normalizeProductStatus(p):p}catch(e){}; p.sizes=uniq(p.sizes&&p.sizes.length?p.sizes:['One Size']); p.outOfStockSizes=uniq(p.outOfStockSizes||[]).filter(s=>p.sizes.includes(s)); p.status=p.status||(p.soldOut?'out-of-stock':'in-stock'); return p;};
  const isOOS=(p,s)=>uniq(p.outOfStockSizes||[]).map(x=>x.toLowerCase()).includes(String(s).toLowerCase());
  const selectedFrom=(root,selector)=>uniq([...(root||document).querySelectorAll(selector)].map(b=>b.dataset.size||b.textContent.trim()));
  const safeId=(id)=>String(id||'').replace(/'/g,"\\'");

  window.selectedAdminSizes=function(root=document){
    return selectedFrom(root, root===document ? '#sizePicker .pill.on' : '.available-size-picker .pill.on');
  };
  function sizePills(selected=[], cls='available-size-picker'){
    const set=new Set(uniq(selected));
    return `<div class="size-picker ${cls}">${SIZE_OPTIONS.map(s=>`<button type="button" class="pill ${set.has(s)?'on':''}" data-size="${esc(s)}" onclick="this.classList.toggle('on')">${esc(s)}</button>`).join('')}</div>`;
  }
  function ensureAddOosPicker(){
    const sp=document.getElementById('sizePicker');
    if(sp && !sp.classList.contains('available-size-picker')) sp.classList.add('available-size-picker');
    if(sp && !document.getElementById('sizeOutPicker')){
      const wrap=document.createElement('div');
      wrap.className='full admin-size-oos-wrap';
      wrap.innerHTML=`<label>Out-of-stock sizes</label><p class="field-help">Select sizes that exist for this product but cannot be purchased now.</p>${sizePills([], 'oos-picker')}`;
      wrap.querySelector('.oos-picker').id='sizeOutPicker';
      sp.closest('.full')?.insertAdjacentElement('afterend',wrap);
    }
  }
  window.addEventListener('load',()=>setTimeout(ensureAddOosPicker,300));
  const previousRenderAdmin=window.renderAdmin;
  if(typeof previousRenderAdmin==='function'){
    window.renderAdmin=async function(){const r=await previousRenderAdmin.apply(this,arguments); setTimeout(ensureAddOosPicker,80); return r;};
  }

  function parseNote(note=''){
    const parts=String(note||'').split(' · ');
    return {color:parts[0]||'Black',style:parts[1]||parts[0]||'Clean everyday piece'};
  }
  const COLORS=window.COLOR_OPTIONS||['Black','White','Ivory','Cream','Beige','Taupe','Grey','Silver','Gold','Rose Gold','Bronze','Brown','Cognac','Camel','Navy','Blue','Denim Blue','Red','Burgundy','Pink','Green','Olive','Khaki','Yellow','Orange','Purple','Print / Pattern','Multi-color'];
  const STYLES=window.STYLE_OPTIONS||['Clean everyday piece','Elegant evening piece','Minimal essential','Soft feminine silhouette','Relaxed boutique fit','Premium casual look','Statement piece','Light summer piece','Structured tailored style'];
  const HOME=[['trending-now','Trending Now'],['new-arrivals','New Arrivals']];
  const opts=(list,current)=>list.map(x=>Array.isArray(x)?`<option value="${esc(x[0])}" ${x[0]===current?'selected':''}>${esc(x[1])}</option>`:`<option ${x===current?'selected':''}>${esc(x)}</option>`).join('');
  const homeSection=(p)=>p.displaySection||p.homeSection||(p.collection==='New Arrivals'?'new-arrivals':'trending-now');
  window.productHomeSection=homeSection;

  window.productEditorHTML=function(raw){
    const p=norm(raw); const photos=(typeof productImagesForDisplay==='function'?productImagesForDisplay(p).all:(p.photos||[p.img])).filter(Boolean); const note=parseNote(p.note); const main=Number(p.mainPhotoIndex||0);
    const thumbs=photos.map((u,i)=>`<button type="button" class="admin-thumb selectable-thumb existing-main-${esc(p.id)} ${i===main?'selected-main':''}" onclick="document.querySelectorAll('.existing-main-${safeId(p.id)}').forEach(b=>b.classList.remove('selected-main'));this.classList.add('selected-main');this.closest('.product-editor').dataset.mainIndex='${i}'"><img src="${String(u).startsWith('data:')?esc(u):''}" style="${String(u).startsWith('data:')?'':'display:none'}"><span>${i===main?'Main photo':'Photo '+(i+1)}</span></button>`).join('');
    return `<div class="admin-form">
      <div class="full"><label>Product availability</label><select class="field edit-status"><option value="in-stock" ${p.status==='in-stock'?'selected':''}>In stock</option><option value="coming-soon" ${p.status==='coming-soon'?'selected':''}>Coming soon</option><option value="out-of-stock" ${p.status==='out-of-stock'?'selected':''}>Out of stock</option></select></div>
      <div><label>Product name</label><input class="field edit-name" value="${esc(p.name||'')}"></div>
      <div><label>Regular price</label><input class="field edit-price" type="number" step="0.01" value="${Number(p.price||0)}"></div>
      <div><label>Sale / price-drop price</label><input class="field edit-sale" type="number" step="0.01" value="${p.salePrice||''}" placeholder="Optional"></div>
      <div><label>Product category</label><select class="field edit-category">${opts(window.ADMIN_CATEGORIES||['Dresses','Skirts','T-Shirts','Tops','Pants','Bags','Scarves','Overalls'],p.category)}</select></div>
      <div><label>Collection</label><select class="field edit-collection">${opts(window.ADMIN_COLLECTIONS||['Everyday Edit','Minimal Essentials','Evening Pieces','Accessories','Price Drops'],p.collection)}</select></div>
      <div><label>Color</label><select class="field edit-color">${opts(COLORS,note.color)}</select></div>
      <div><label>Style note</label><select class="field edit-style">${opts(STYLES,note.style)}</select></div>
      <div><label>Homepage display section</label><select class="field edit-home-section">${opts(HOME,homeSection(p))}</select></div>
      <div class="full"><label>Current photos</label><p class="muted">Click one photo to choose the main photo.</p><div class="photo-preview existing-photos">${thumbs||'<p class="muted">No photos yet.</p>'}</div><label style="margin-top:18px">Replace / add product gallery</label><div class="upload-zone"><input type="file" accept="image/*" multiple onchange="previewEditPhotos(event,'${safeId(p.id)}')"><p><b>Upload multiple photos</b><br><span class="muted">Select several images at once. Then choose the main one.</span></p></div><div class="photo-preview" id="editPreview-${esc(p.id)}"></div></div>
      <div class="full"><label>Available sizes</label><p class="field-help">Choose every size this product exists in.</p>${sizePills(p.sizes,'available-size-picker')}</div>
      <div class="full admin-size-oos-wrap"><label>Out-of-stock sizes</label><p class="field-help">Only these selected sizes will be grey, crossed, and unclickable for customers.</p>${sizePills(p.outOfStockSizes,'oos-picker edit-oos-picker')}</div>
      <div class="full"><label>Description</label><textarea class="field edit-desc">${esc(p.desc||'')}</textarea></div>
    </div><button class="btn" onclick="saveProductEditor('${safeId(p.id)}')">SAVE PRODUCT CHANGES</button>`;
  };

  window.addProductAdmin=async function(){
    const name=document.getElementById('pname')?.value.trim(); const price=Number(document.getElementById('pprice')?.value||0);
    if(!name||!price){toast?.('Add a product name and price');return;}
    if(typeof loadSharedStore==='function') await loadSharedStore();
    if(window.nitaBackendOnline===false){notify?.('Cannot add product: cloud database is offline.', false, true); return;}
    const sizes=selectedFrom(document,'#sizePicker .pill.on');
    const out=selectedFrom(document,'#sizeOutPicker .pill.on').filter(s=>sizes.includes(s));
    const photos=(window.pendingAdminPhotos||[]).slice(); const main=Math.max(0,Math.min(Number(window.pendingAdminMainIndex||0),Math.max(photos.length-1,0)));
    const sale=document.getElementById('psale')?.value; const color=document.getElementById('pcolor')?.value||'Black'; const style=document.getElementById('pstyle')?.value||'Clean everyday piece'; const displaySection=document.getElementById('phome')?.value||'trending-now';
    const product=norm({id:'p'+Date.now(),name,price,salePrice:sale===''?'':Number(sale),status:document.getElementById('pstatus')?.value||'in-stock',category:document.getElementById('pcat')?.value||'Tops',collection:document.getElementById('pcollection')?.value||'Everyday Edit',displaySection,homeSection:displaySection,note:`${color} · ${style}`,sizes:sizes.length?sizes:['One Size'],outOfStockSizes:out,photos,mainPhotoIndex:main,img:photos[main]||photos[0]||'linear-gradient(135deg,#fff,#ddd)',desc:document.getElementById('pdesc')?.value.trim()||'A carefully selected Italian-made piece for a clean, feminine wardrobe.'});
    const ps=products(); ps.push(product); const ok=await saveProducts(ps); if(ok){window.pendingAdminPhotos=[];window.pendingAdminMainIndex=0;['pname','pprice','psale','pdesc'].forEach(id=>{const el=document.getElementById(id); if(el)el.value=''}); const inp=document.getElementById('pphotos'); if(inp)inp.value=''; const prev=document.getElementById('photoPreview'); if(prev)prev.innerHTML=''; await loadSharedStore?.(); renderAdmin?.(); toast?.('Product added globally.');}
  };

  window.saveProductEditor=async function(id){
    if(typeof loadSharedStore==='function') await loadSharedStore();
    if(window.nitaBackendOnline===false){notify?.('Cannot save edit: cloud database is offline.', false, true); return;}
    const ps=products(); const p=ps.find(x=>String(x.id)===String(id)); const root=document.getElementById('editor-'+id); if(!p||!root)return;
    const old=Number(p.price||0); const entered=Number(root.querySelector('.edit-price')?.value||0); const saleInput=root.querySelector('.edit-sale')?.value;
    p.name=root.querySelector('.edit-name')?.value.trim()||p.name;
    if(saleInput===''){ if(entered>0 && entered<old){p.salePrice=entered; p.price=old;} else {p.price=entered; p.salePrice='';} } else {p.price=entered; p.salePrice=Number(saleInput);}
    p.category=root.querySelector('.edit-category')?.value||p.category; p.collection=root.querySelector('.edit-collection')?.value||p.collection; p.displaySection=root.querySelector('.edit-home-section')?.value||homeSection(p); p.homeSection=p.displaySection;
    const color=root.querySelector('.edit-color')?.value||'Black'; const style=root.querySelector('.edit-style')?.value||'Clean everyday piece'; p.note=`${color} · ${style}`;
    p.desc=root.querySelector('.edit-desc')?.value.trim()||''; p.sizes=selectedFrom(root,'.available-size-picker .pill.on'); if(!p.sizes.length)p.sizes=['One Size']; p.outOfStockSizes=selectedFrom(root,'.oos-picker .pill.on').filter(s=>p.sizes.includes(s));
    p.status=root.querySelector('.edit-status')?.value||p.status||'in-stock'; p.soldOut=p.status==='out-of-stock';
    if(window.editingPhotoBuffers?.[id]?.length){p.photos=window.editingPhotoBuffers[id]; p.mainPhotoIndex=Number(window.editingMainPhotoIndex?.[id]||0); p.img=p.photos[p.mainPhotoIndex]||p.photos[0]; delete window.editingPhotoBuffers[id]; delete window.editingMainPhotoIndex[id];}
    else if(root.dataset.mainIndex!==undefined){p.mainPhotoIndex=Number(root.dataset.mainIndex)||0; const ph=(Array.isArray(p.photos)&&p.photos.length?p.photos:[p.img]).filter(Boolean); p.img=ph[p.mainPhotoIndex]||ph[0]||p.img;}
    const ok=await saveProducts(ps); if(ok){await loadSharedStore?.(); renderAdmin?.(); toast?.('Product updated globally.');}
  };

  function sizeButtonsForCustomer(p){
    p=norm(p); const active=p.sizes.find(s=>!isOOS(p,s))||p.sizes[0]; window.selectedSize=window.selectedSize && p.sizes.includes(window.selectedSize) && !isOOS(p,window.selectedSize) ? window.selectedSize : active;
    return p.sizes.map(s=>`<button type="button" class="size ${s===window.selectedSize?'active':''} ${isOOS(p,s)?'size-disabled':''}" ${isOOS(p,s)?'disabled aria-disabled="true" title="Out of stock"':`onclick="selectedSize='${esc(s)}';productPage()"`}>${esc(s)}</button>`).join('');
  }

  window.productPage=function(){
    const detail=document.getElementById('detail'); if(!detail)return; const id=new URL(location.href).searchParams.get('id'); const p=norm(products().find(x=>String(x.id)===String(id))||products()[0]);
    if(!p?.id){detail.innerHTML='<div class="card"><h1>Product not found</h1><a class="btn" href="shop.html">BACK TO SHOP</a></div>';return;}
    const im=typeof productImagesForDisplay==='function'?productImagesForDisplay(p):{all:[p.img||'linear-gradient(135deg,#fff,#ddd)']}; window.selectedPhoto=Math.min(Number(window.selectedPhoto||0),im.all.length-1);
    const currentOos=isOOS(p,window.selectedSize); const canBuy=p.status==='in-stock' && !currentOos;
    const action=canBuy?`<button class="btn" onclick="addToCart('${safeId(p.id)}',selectedSize||'One Size')">ADD TO CART</button><a class="btn light" href="checkout.html">BUY NOW</a>`:`<button class="btn disabled" disabled aria-disabled="true">${p.status==='coming-soon'?'COMING SOON':(p.status==='out-of-stock'?'OUT OF STOCK':'SIZE OUT OF STOCK')}</button><button class="notify-btn" type="button" onclick="notifyMe&&notifyMe('${safeId(p.id)}')">NOTIFY ME</button>`;
    detail.innerHTML=`<div class="product-media"><div class="detail-img" style="${bg(im.all[window.selectedPhoto])}"></div><div class="product-thumbs">${im.all.map((ph,i)=>`<button class="${i===window.selectedPhoto?'active':''}" onclick="selectedPhoto=${i};productPage()" style="${bg(ph)}"></button>`).join('')}</div></div><div class="product-info"><p class="muted">${esc(p.category||'')}</p><h1>${esc(p.name||'Product')}</h1>${typeof productPriceStatusRow==='function'?productPriceStatusRow(p,'h2'):`<h2>${moneySafe(p.salePrice||p.price)}</h2>`}<p>${esc(p.desc||'')}</p><div class="sizes product-size-list">${sizeButtonsForCustomer(p)}</div><div class="product-actions">${action}</div></div>`;
  };

  window.openQuickView=function(id){
    const p=norm(products().find(x=>String(x.id)===String(id))); if(!p?.id)return; const im=typeof productImagesForDisplay==='function'?productImagesForDisplay(p):{first:p.img||'linear-gradient(135deg,#fff,#ddd)'}; const modal=document.getElementById('quickModal'); const q=document.getElementById('quickContent'); if(!modal||!q)return;
    const available=p.sizes.find(s=>!isOOS(p,s))||p.sizes[0]; window.quickSelectedSize=available;
    const sizes=p.sizes.map(s=>`<button type="button" class="size ${s===available&&!isOOS(p,s)?'active':''} ${isOOS(p,s)?'size-disabled':''}" ${isOOS(p,s)?'disabled aria-disabled="true" title="Out of stock"':`onclick="this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active');quickSelectedSize='${esc(s)}'"`}>${esc(s)}</button>`).join('');
    const can=p.status==='in-stock' && available && !isOOS(p,available);
    const action=can?`<button class="btn" onclick="addToCart('${safeId(p.id)}',quickSelectedSize||'One Size');closeQuickView()">ADD TO CART</button>`:`<button class="btn disabled" disabled>${p.status==='coming-soon'?'COMING SOON':(p.status==='out-of-stock'?'OUT OF STOCK':'SIZE OUT OF STOCK')}</button><button class="notify-btn" onclick="notifyMe&&notifyMe('${safeId(p.id)}')">NOTIFY ME</button>`;
    q.innerHTML=`<div class="quick-grid"><div class="quick-image" style="${bg(im.first)}"></div><div class="quick-info"><p class="muted">${esc(p.category||'')}</p><h2>${esc(p.name||'Product')}</h2>${typeof productPriceStatusRow==='function'?productPriceStatusRow(p,'h3'):`<h3>${moneySafe(p.salePrice||p.price)}</h3>`}<p>${esc(p.desc||'')}</p><div class="sizes">${sizes}</div>${action}<a class="btn light" href="product.html?id=${encodeURIComponent(p.id)}">VIEW FULL PRODUCT</a></div></div>`;
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('quick-open','panel-open');
  };

  window.renderHomeSections=function(){
    const ps=products(); const listFor=(section)=>ps.filter(p=>homeSection(p)===section); const fill=(id,list)=>{const box=document.getElementById(id); if(box){const arr=(list.length?list:ps.slice(0,6)); box.innerHTML=[...arr,...arr,...arr,...arr].map(p=>productCard(p)).join('')||'<p class="muted">No products listed yet.</p>';}};
    fill('trendingMarquee',listFor('trending-now')); fill('newArrivalsMarquee',listFor('new-arrivals'));
  };
  window.addEventListener('nita-store-ready',()=>setTimeout(window.renderHomeSections,50));
  window.addEventListener('load',()=>setTimeout(window.renderHomeSections,800));
})();
// === END FINAL SIZE STOCK + AUTO MARQUEE REVERT PATCH ===

/* === NITA STYLE FINAL CRITICAL FIX: OUT-OF-STOCK SIZES + FIRST-LOAD MARQUEE === */
(function(){
  const SIZE_ORDER = ['XS','S','M','L','XL','One Size'];
  const normSize = s => String(s || '').trim();
  const keySize = s => normSize(s).toLowerCase();
  const uniqSizes = arr => [...new Set((arr || []).map(normSize).filter(Boolean))]
    .sort((a,b)=>{ const ia=SIZE_ORDER.findIndex(x=>keySize(x)===keySize(a)); const ib=SIZE_ORDER.findIndex(x=>keySize(x)===keySize(b)); return (ia<0?99:ia)-(ib<0?99:ib); });
  const safe = v => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const cssBg = u => {
    try { return typeof cssBgImage === 'function' ? cssBgImage(u) : (String(u || '').startsWith('data:') ? `background-image:url(${u})` : `background:${u || 'linear-gradient(135deg,#fff,#ddd)'}`); }
    catch(e){ return 'background:linear-gradient(135deg,#fff,#ddd)'; }
  };
  const moneySafe = v => { try { return typeof money === 'function' ? money(v) : ('$' + Number(v || 0).toFixed(2)); } catch(e){ return '$' + Number(v || 0).toFixed(2); } };
  const allProducts = () => { try { return typeof getProducts === 'function' ? getProducts() : []; } catch(e){ return []; } };
  function normalizeProduct(p){
    try { if(typeof normalizeProductStatus === 'function') p = normalizeProductStatus(p || {}); } catch(e){ p = p || {}; }
    p.sizes = uniqSizes((Array.isArray(p.sizes) && p.sizes.length) ? p.sizes : ['One Size']);
    p.outOfStockSizes = uniqSizes(p.outOfStockSizes || []).filter(s => p.sizes.some(x => keySize(x) === keySize(s)));
    p.status = p.status || (p.soldOut ? 'out-of-stock' : 'in-stock');
    return p;
  }
  function isSizeOut(p, size){
    p = normalizeProduct(p);
    return p.outOfStockSizes.some(s => keySize(s) === keySize(size));
  }
  function selectedPills(root, selector){
    return uniqSizes([...root.querySelectorAll(selector)].map(b => b.dataset.size || b.textContent));
  }
  function pillButtons(selected=[], cls='available-size-picker'){
    const set = new Set(uniqSizes(selected).map(keySize));
    return `<div class="size-picker ${cls}">` + SIZE_ORDER.map(s => `<button type="button" class="pill ${set.has(keySize(s)) ? 'on' : ''}" data-size="${safe(s)}" onclick="this.classList.toggle('on')">${safe(s)}</button>`).join('') + `</div>`;
  }

  function upgradeAddProductSizePickers(){
    const sp = document.getElementById('sizePicker');
    if(!sp) return;
    if(!sp.classList.contains('available-size-picker')) sp.classList.add('available-size-picker');
    if(!sp.dataset.finalSizes){
      const current = selectedPills(document, '#sizePicker .pill.on');
      sp.innerHTML = SIZE_ORDER.map(s => `<button type="button" class="pill ${current.some(x=>keySize(x)===keySize(s)) ? 'on' : ''}" data-size="${safe(s)}" onclick="this.classList.toggle('on')">${safe(s)}</button>`).join('');
      sp.dataset.finalSizes = '1';
    }
    if(!document.getElementById('sizeOutPicker')){
      const wrap = document.createElement('div');
      wrap.className = 'full admin-size-oos-wrap';
      wrap.innerHTML = `<label>Out-of-stock sizes</label><p class="field-help">Select sizes that should be visible to customers but disabled with a diagonal line.</p>${pillButtons([], 'oos-picker')}`;
      const picker = wrap.querySelector('.oos-picker'); if(picker) picker.id = 'sizeOutPicker';
      (sp.closest('.full') || sp).insertAdjacentElement('afterend', wrap);
    }
  }

  const oldRenderAdmin = window.renderAdmin;
  window.renderAdmin = async function(){
    let r; if(typeof oldRenderAdmin === 'function') r = await oldRenderAdmin.apply(this, arguments);
    upgradeAddProductSizePickers();
    return r;
  };
  window.addEventListener('load', () => setTimeout(upgradeAddProductSizePickers, 250));

  window.productEditorHTML = function(raw){
    const p = normalizeProduct(raw);
    const photos = (Array.isArray(p.photos) && p.photos.length ? p.photos : [p.img]).filter(Boolean);
    const main = Math.max(0, Math.min(Number(p.mainPhotoIndex || 0), Math.max(photos.length - 1, 0)));
    const thumbs = photos.map((u,i)=>`<button type="button" class="admin-thumb ${i===main?'main':''}" onclick="this.closest('.product-editor').dataset.mainIndex='${i}';this.parentElement.querySelectorAll('.admin-thumb').forEach(x=>x.classList.remove('main'));this.classList.add('main')"><img src="${String(u).startsWith('data:') ? u : ''}" style="${String(u).startsWith('data:') ? '' : 'display:none'}"><span>${i===main?'Main photo':'Set as main'}</span></button>`).join('');
    const opts = (arr,val) => arr.map(x => Array.isArray(x) ? `<option value="${safe(x[0])}" ${x[0]===val?'selected':''}>${safe(x[1])}</option>` : `<option ${x===val?'selected':''}>${safe(x)}</option>`).join('');
    const home = p.displaySection || p.homeSection || (p.collection === 'New Arrivals' ? 'new-arrivals' : 'trending-now');
    return `<div class="admin-form">
      <div><label>Product name</label><input class="field edit-name" value="${safe(p.name || '')}"></div>
      <div><label>Regular price</label><input class="field edit-price" type="number" step="0.01" value="${Number(p.price || 0)}"></div>
      <div><label>Sale / price-drop price</label><input class="field edit-sale" type="number" step="0.01" value="${p.salePrice || ''}" placeholder="Optional"></div>
      <div><label>Availability status</label><select class="field edit-status"><option value="in-stock" ${p.status==='in-stock'?'selected':''}>In stock</option><option value="coming-soon" ${p.status==='coming-soon'?'selected':''}>Coming soon</option><option value="out-of-stock" ${p.status==='out-of-stock'?'selected':''}>Out of stock</option></select></div>
      <div><label>Product category</label><select class="field edit-category">${opts(['Dresses','Skirts','T-Shirts','Tops','Pants','Bags','Scarves','Overalls'], p.category || 'Tops')}</select></div>
      <div><label>Collection</label><select class="field edit-collection">${opts(['Everyday Edit','Minimal Essentials','Evening Pieces','Accessories','Price Drops','New Arrivals'], p.collection || 'Everyday Edit')}</select></div>
      <div><label>Homepage display section</label><select class="field edit-home-section">${opts([['trending-now','Trending Now'],['new-arrivals','New Arrivals']], home)}</select></div>
      <div><label>Color</label><select class="field edit-color">${opts(['Black','White','Ivory','Cream','Beige','Taupe','Grey','Silver','Gold','Rose Gold','Bronze','Brown','Cognac','Camel','Navy','Blue','Denim Blue','Red','Burgundy','Pink','Green','Olive','Khaki','Yellow','Orange','Purple','Print / Pattern','Multi-color'], (p.note||'').split(' · ')[0] || 'Black')}</select></div>
      <div><label>Style note</label><select class="field edit-style">${opts(['Clean everyday piece','Elegant evening piece','Minimal essential','Soft feminine silhouette','Relaxed boutique fit','Premium casual look','Statement piece','Light summer piece','Structured tailored style'], (p.note||'').split(' · ')[1] || 'Clean everyday piece')}</select></div>
      <div class="full"><label>Current photos</label><p class="muted">Click a photo to choose the main product image.</p><div class="photo-preview existing-photos">${thumbs || '<p class="muted">No photos yet.</p>'}</div><label style="margin-top:18px">Replace / add product gallery</label><div class="upload-zone"><input type="file" accept="image/*" multiple onchange="previewEditPhotos(event,'${String(p.id).replace(/'/g,"\\'")}')"><p><b>Upload multiple photos</b><br><span class="muted">Select several images at once. Then choose the main one.</span></p></div><div class="photo-preview" id="editPreview-${safe(p.id)}"></div></div>
      <div class="full"><label>Product sizes</label><p class="field-help">Select every size that exists for this product.</p>${pillButtons(p.sizes, 'available-size-picker')}</div>
      <div class="full admin-size-oos-wrap"><label>Out-of-stock sizes</label><p class="field-help">Only these sizes become grey, crossed, and unclickable for customers.</p>${pillButtons(p.outOfStockSizes, 'oos-picker edit-oos-picker')}</div>
      <div class="full"><label>Description</label><textarea class="field edit-desc">${safe(p.desc || '')}</textarea></div>
    </div><button class="btn" onclick="saveProductEditor('${String(p.id).replace(/'/g,"\\'")}')">SAVE PRODUCT CHANGES</button>`;
  };

  window.addProductAdmin = async function(){
    const name = document.getElementById('pname')?.value.trim();
    const price = Number(document.getElementById('pprice')?.value || 0);
    if(!name || !price){ toast?.('Add a product name and price'); return; }
    if(typeof loadSharedStore === 'function') await loadSharedStore();
    if(window.nitaBackendOnline === false){ notify?.('Cannot add product: cloud database is offline.', false, true); return; }
    const available = selectedPills(document, '#sizePicker .pill.on');
    const out = selectedPills(document, '#sizeOutPicker .pill.on');
    const sizes = uniqSizes([...available, ...out]);
    const photos = (window.pendingAdminPhotos || []).slice();
    const main = Math.max(0, Math.min(Number(window.pendingAdminMainIndex || 0), Math.max(photos.length - 1, 0)));
    const saleRaw = document.getElementById('psale')?.value;
    const color = document.getElementById('pcolor')?.value || 'Black';
    const style = document.getElementById('pstyle')?.value || 'Clean everyday piece';
    const section = document.getElementById('phome')?.value || 'trending-now';
    const product = normalizeProduct({
      id:'p' + Date.now(), name, price, salePrice:saleRaw===''?'':Number(saleRaw),
      status:document.getElementById('pstatus')?.value || 'in-stock',
      category:document.getElementById('pcat')?.value || 'Tops',
      collection:document.getElementById('pcollection')?.value || 'Everyday Edit',
      displaySection:section, homeSection:section, note:`${color} · ${style}`,
      sizes:sizes.length ? sizes : ['One Size'], outOfStockSizes:out.filter(s => sizes.some(x=>keySize(x)===keySize(s))),
      photos, mainPhotoIndex:main, img:photos[main] || photos[0] || 'linear-gradient(135deg,#fff,#ddd)',
      desc:document.getElementById('pdesc')?.value.trim() || 'A carefully selected Italian-made piece for a clean, feminine wardrobe.'
    });
    const ps = allProducts(); ps.push(product);
    const ok = await saveProducts(ps);
    if(ok){
      window.pendingAdminPhotos=[]; window.pendingAdminMainIndex=0;
      ['pname','pprice','psale','pdesc'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
      document.querySelectorAll('#sizePicker .pill.on,#sizeOutPicker .pill.on').forEach(b=>b.classList.remove('on'));
      const inp=document.getElementById('pphotos'); if(inp) inp.value='';
      const prev=document.getElementById('photoPreview'); if(prev) prev.innerHTML='';
      await loadSharedStore?.(); await window.renderAdmin?.(); toast?.('Product added globally.');
    }
  };

  window.saveProductEditor = async function(id){
    if(typeof loadSharedStore === 'function') await loadSharedStore();
    if(window.nitaBackendOnline === false){ notify?.('Cannot save edit: cloud database is offline.', false, true); return; }
    const ps = allProducts(); const p = ps.find(x => String(x.id) === String(id)); const root = document.getElementById('editor-' + id);
    if(!p || !root) return;
    const oldRegular = Number(p.price || 0); const entered = Number(root.querySelector('.edit-price')?.value || 0); const saleInput = root.querySelector('.edit-sale')?.value;
    p.name = root.querySelector('.edit-name')?.value.trim() || p.name;
    if(saleInput === ''){ if(entered > 0 && entered < oldRegular){ p.salePrice = entered; p.price = oldRegular; } else { p.price = entered; p.salePrice = ''; } }
    else { p.price = entered; p.salePrice = Number(saleInput); }
    p.status = root.querySelector('.edit-status')?.value || p.status || 'in-stock'; p.soldOut = p.status === 'out-of-stock';
    p.category = root.querySelector('.edit-category')?.value || p.category; p.collection = root.querySelector('.edit-collection')?.value || p.collection;
    p.displaySection = root.querySelector('.edit-home-section')?.value || p.displaySection || 'trending-now'; p.homeSection = p.displaySection;
    const color = root.querySelector('.edit-color')?.value || 'Black'; const style = root.querySelector('.edit-style')?.value || 'Clean everyday piece'; p.note = `${color} · ${style}`;
    const available = selectedPills(root, '.available-size-picker .pill.on'); const out = selectedPills(root, '.oos-picker .pill.on');
    p.sizes = uniqSizes([...available, ...out]); if(!p.sizes.length) p.sizes = ['One Size'];
    p.outOfStockSizes = out.filter(s => p.sizes.some(x => keySize(x) === keySize(s)));
    p.desc = root.querySelector('.edit-desc')?.value.trim() || '';
    if(window.editingPhotoBuffers?.[id]?.length){ p.photos = window.editingPhotoBuffers[id]; p.mainPhotoIndex = Number(window.editingMainPhotoIndex?.[id] || 0); p.img = p.photos[p.mainPhotoIndex] || p.photos[0]; delete window.editingPhotoBuffers[id]; delete window.editingMainPhotoIndex[id]; }
    else if(root.dataset.mainIndex !== undefined){ const ph = (Array.isArray(p.photos) && p.photos.length ? p.photos : [p.img]).filter(Boolean); p.mainPhotoIndex = Number(root.dataset.mainIndex) || 0; p.img = ph[p.mainPhotoIndex] || ph[0] || p.img; }
    normalizeProduct(p);
    const ok = await saveProducts(ps);
    if(ok){ await loadSharedStore?.(); await window.renderAdmin?.(); toast?.('Product updated globally.'); }
  };

  function customerSizeButtons(p, context){
    p = normalizeProduct(p);
    const firstAvailable = p.sizes.find(s => !isSizeOut(p,s)) || '';
    if(context === 'quick') window.quickSelectedSize = (!isSizeOut(p, window.quickSelectedSize) && p.sizes.some(s=>keySize(s)===keySize(window.quickSelectedSize))) ? window.quickSelectedSize : firstAvailable;
    else window.selectedSize = (!isSizeOut(p, window.selectedSize) && p.sizes.some(s=>keySize(s)===keySize(window.selectedSize))) ? window.selectedSize : firstAvailable;
    const selected = context === 'quick' ? window.quickSelectedSize : window.selectedSize;
    return p.sizes.map(s => {
      const oos = isSizeOut(p,s); const active = !oos && keySize(s) === keySize(selected);
      const click = context === 'quick' ? `quickSelectedSize='${safe(s)}'` : `selectedSize='${safe(s)}'; productPage()`;
      return `<button type="button" class="size ${active?'active':''} ${oos?'size-disabled':''}" ${oos?'disabled aria-disabled="true" title="Out of stock"':`onclick="${click}; this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active')); this.classList.add('active')"`}>${safe(s)}</button>`;
    }).join('');
  }

  const oldAddToCart = window.addToCart;
  window.addToCart = function(id, size='One Size'){
    const p = normalizeProduct(allProducts().find(x => String(x.id) === String(id)) || {});
    if(p.status !== 'in-stock'){ toast?.('This product is not available yet.'); return; }
    if(isSizeOut(p, size)){ toast?.('This size is out of stock.'); return; }
    return oldAddToCart ? oldAddToCart(id, size) : undefined;
  };

  window.productPage = function(){
    const detail = document.getElementById('detail'); if(!detail) return;
    const id = new URL(location.href).searchParams.get('id'); const p = normalizeProduct(allProducts().find(x => String(x.id) === String(id)) || allProducts()[0]);
    if(!p?.id){ detail.innerHTML = '<div class="card"><h1>Product not found</h1><a class="btn" href="shop.html">BACK TO SHOP</a></div>'; return; }
    const im = typeof productImagesForDisplay === 'function' ? productImagesForDisplay(p) : {all:[p.img || 'linear-gradient(135deg,#fff,#ddd)']};
    window.selectedPhoto = Math.max(0, Math.min(Number(window.selectedPhoto || 0), im.all.length - 1));
    const sizeHtml = customerSizeButtons(p, 'page');
    const sizeOos = !window.selectedSize || isSizeOut(p, window.selectedSize);
    const canBuy = p.status === 'in-stock' && !sizeOos;
    const action = canBuy ? `<button class="btn" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}', selectedSize || 'One Size')">ADD TO CART</button><a class="btn light" href="checkout.html">BUY NOW</a>` : `<button class="btn disabled" disabled aria-disabled="true">${p.status==='coming-soon'?'COMING SOON':(p.status==='out-of-stock'?'OUT OF STOCK':'SIZE OUT OF STOCK')}</button><button class="notify-btn" type="button" onclick="notifyMe&&notifyMe('${String(p.id).replace(/'/g,"\\'")}')">NOTIFY ME</button>`;
    detail.innerHTML = `<div class="product-media"><div class="detail-img" style="${cssBg(im.all[window.selectedPhoto])}"></div><div class="product-thumbs">${im.all.map((ph,i)=>`<button class="${i===window.selectedPhoto?'active':''}" onclick="selectedPhoto=${i};productPage()" style="${cssBg(ph)}"></button>`).join('')}</div></div><div class="product-info"><p class="muted">${safe(p.category || '')}</p><h1>${safe(p.name || 'Product')}</h1>${typeof productPriceStatusRow === 'function' ? productPriceStatusRow(p,'h2') : `<h2>${moneySafe(p.salePrice || p.price)}</h2>`}<p>${safe(p.desc || '')}</p><div class="sizes product-size-list">${sizeHtml}</div><div class="product-actions">${action}</div></div>`;
  };

  window.openQuickView = function(id){
    const p = normalizeProduct(allProducts().find(x => String(x.id) === String(id))); if(!p?.id) return false;
    const m = document.getElementById('quickModal'); const q = document.getElementById('quickContent'); if(!m || !q) return false;
    const im = typeof productImagesForDisplay === 'function' ? productImagesForDisplay(p) : {first:p.img || 'linear-gradient(135deg,#fff,#ddd)'};
    const sizeHtml = customerSizeButtons(p, 'quick');
    const canBuy = p.status === 'in-stock' && window.quickSelectedSize && !isSizeOut(p, window.quickSelectedSize);
    const action = canBuy ? `<button class="btn" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}', quickSelectedSize || 'One Size'); closeQuickView()">ADD TO CART</button>` : `<button class="btn disabled" disabled aria-disabled="true">${p.status==='coming-soon'?'COMING SOON':(p.status==='out-of-stock'?'OUT OF STOCK':'SIZE OUT OF STOCK')}</button><button class="notify-btn" type="button" onclick="notifyMe&&notifyMe('${String(p.id).replace(/'/g,"\\'")}')">NOTIFY ME</button>`;
    q.innerHTML = `<div class="quick-grid"><div class="quick-image" style="${cssBg(im.first)}"></div><div class="quick-info"><p class="muted">${safe(p.category || '')}</p><h2>${safe(p.name || 'Product')}</h2>${typeof productPriceStatusRow === 'function' ? productPriceStatusRow(p,'h3') : `<h3>${moneySafe(p.salePrice || p.price)}</h3>`}<p>${safe(p.desc || '')}</p><div class="sizes">${sizeHtml}</div>${action}<a class="btn light" href="product.html?id=${encodeURIComponent(p.id)}">VIEW FULL PRODUCT</a></div></div>`;
    m.classList.add('open'); m.setAttribute('aria-hidden','false'); document.body.classList.add('quick-open','panel-open'); return false;
  };

  function homeSection(p){ return p.displaySection || p.homeSection || (p.collection === 'New Arrivals' ? 'new-arrivals' : 'trending-now'); }
  function kickMarquee(id){
    const el = document.getElementById(id); if(!el) return;
    el.style.animation = 'none'; void el.offsetWidth;
    el.style.animation = 'nitaAlwaysScroll 42s linear infinite';
  }
  window.renderHomeSections = function(){
    const ps = allProducts().map(normalizeProduct);
    const fill = (id, list) => { const box = document.getElementById(id); if(!box) return; const arr = list.length ? list : ps.slice(0,6); box.innerHTML = [...arr,...arr,...arr,...arr].map(p => productCard(p)).join('') || '<p class="muted">No products listed yet.</p>'; requestAnimationFrame(()=>kickMarquee(id)); };
    fill('trendingMarquee', ps.filter(p => homeSection(p) === 'trending-now'));
    fill('newArrivalsMarquee', ps.filter(p => homeSection(p) === 'new-arrivals'));
  };
  function bootHome(){ if(document.getElementById('trendingMarquee') || document.getElementById('newArrivalsMarquee')){ window.renderHomeSections(); setTimeout(()=>{kickMarquee('trendingMarquee'); kickMarquee('newArrivalsMarquee');}, 250); setTimeout(()=>{kickMarquee('trendingMarquee'); kickMarquee('newArrivalsMarquee');}, 1200); } }
  window.addEventListener('DOMContentLoaded', bootHome);
  window.addEventListener('load', bootHome);
  window.addEventListener('nita-store-ready', bootHome);
})();
/* === END FINAL CRITICAL FIX === */

/* === FINAL FIX: reliable homepage auto-scroll, product deletion, and $5 Wakilni delivery === */
(function(){
  const DELIVERY_FEE = 5;
  const DEFAULTS = (typeof defaultProducts !== 'undefined' && Array.isArray(defaultProducts)) ? defaultProducts : [];
  const safeJSON = (key, fallback) => {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    try { return JSON.parse(raw); } catch { return fallback; }
  };
  const norm = (p) => typeof normalizeProduct === 'function' ? normalizeProduct(p) : (typeof normalizeProductStatus === 'function' ? normalizeProductStatus(p) : p);

  // Important: if nitaProducts exists and is [], respect the empty list. Do not bring default items back.
  window.getProducts = function(){
    const raw = localStorage.getItem('nitaProducts');
    let list;
    if (raw !== null) {
      try { list = JSON.parse(raw); } catch { list = []; }
    } else {
      list = DEFAULTS;
    }
    if (!Array.isArray(list)) list = [];
    return list.map(p => norm({...p}));
  };

  window.saveProducts = async function(products){
    const clean = (Array.isArray(products) ? products : []).map(p => norm({...p}));
    localStorage.setItem('nitaProducts', JSON.stringify(clean));
    try {
      if (typeof saveCloudKey === 'function') await saveCloudKey('nitaProducts', clean);
      else if (typeof nitaSaveKeyStrict === 'function') await nitaSaveKeyStrict('nitaProducts', clean);
      if (typeof notify === 'function') notify('Saved globally. This update will appear on every device.');
      else if (typeof toast === 'function') toast('Saved globally.');
      return true;
    } catch (err) {
      console.error('Product cloud save failed:', err);
      if (typeof notify === 'function') notify('Not saved globally: '+(err.message || err), false, true);
      else if (typeof toast === 'function') toast('Not saved globally.');
      return false;
    }
  };

  window.removeProduct = async function(id){
    if (!confirm('Remove this product from the website?')) return;
    if (typeof loadSharedStore === 'function') { try { await loadSharedStore(); } catch(e){} }
    const next = getProducts().filter(p => String(p.id) !== String(id));
    const ok = await saveProducts(next);
    if (ok) {
      localStorage.setItem('nitaProducts', JSON.stringify(next));
      if (typeof renderAdmin === 'function') await renderAdmin();
      if (typeof renderHomeSections === 'function') renderHomeSections();
      if (typeof renderProducts === 'function') renderProducts();
      if (typeof toast === 'function') toast('Product removed globally.');
    }
  };

  function homeSectionOf(p){
    return p.displaySection || p.homeSection || (p.collection === 'New Arrivals' ? 'new-arrivals' : 'trending-now');
  }

  function cardFor(p){
    if (typeof productCard === 'function') return productCard(p);
    return `<a class="product" href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-img"></div><h3>${p.name||'Product'}</h3></a>`;
  }

  const marqueeState = new WeakMap();
  function startMarquee(track, speed){
    if (!track) return;
    const old = marqueeState.get(track);
    if (old && old.raf) cancelAnimationFrame(old.raf);
    track.style.animation = 'none';
    track.style.transform = 'translate3d(0,0,0)';
    track.style.willChange = 'transform';
    track.dataset.autoMarquee = 'true';
    let x = 0;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(40, now - last); last = now;
      const half = track.scrollWidth / 2;
      if (half > 20) {
        x = (x + speed * dt / 16.67) % half;
        track.style.transform = `translate3d(${-x}px,0,0)`;
      }
      const state = marqueeState.get(track); if (state) state.raf = requestAnimationFrame(tick);
    };
    marqueeState.set(track, {raf: requestAnimationFrame(tick)});
  }

  window.renderHomeSections = function(){
    const ps = getProducts();
    const fill = (id, list) => {
      const box = document.getElementById(id); if (!box) return;
      const source = (list && list.length) ? list : ps.slice(0, 6);
      if (!source.length) { box.innerHTML = '<p class="muted">No products listed yet.</p>'; return; }
      // Duplicate enough times so the animation is seamless on laptop, tablet, and phone.
      box.innerHTML = [...source, ...source, ...source, ...source, ...source, ...source].map(cardFor).join('');
      requestAnimationFrame(() => startMarquee(box, window.innerWidth <= 760 ? 0.34 : 0.42));
    };
    fill('trendingMarquee', ps.filter(p => homeSectionOf(p) === 'trending-now'));
    fill('newArrivalsMarquee', ps.filter(p => homeSectionOf(p) === 'new-arrivals'));
  };

  function bootHomeMarquee(){
    if (document.getElementById('trendingMarquee') || document.getElementById('newArrivalsMarquee')) {
      if (typeof loadSharedStore === 'function') {
        loadSharedStore().finally(() => {
          renderHomeSections();
          setTimeout(renderHomeSections, 350);
          setTimeout(renderHomeSections, 1200);
        });
      } else {
        renderHomeSections();
        setTimeout(renderHomeSections, 350);
      }
    }
  }
  window.addEventListener('DOMContentLoaded', bootHomeMarquee);
  window.addEventListener('load', bootHomeMarquee);
  window.addEventListener('nita-store-ready', bootHomeMarquee);
  window.addEventListener('resize', () => setTimeout(() => { if (typeof renderHomeSections === 'function') renderHomeSections(); }, 150));

  function line(label, amount, cls=''){
    const m = typeof money === 'function' ? money(amount) : ('$'+Number(amount||0).toFixed(2));
    return `<div class="summary-line ${cls}"><span>${label}</span><b>${m}</b></div>`;
  }
  function couponState(subtotal){
    const form = document.getElementById('checkoutForm');
    const code = (form?.querySelector('[name="coupon"]')?.value || '').trim().toUpperCase();
    let discount = 0, message = '';
    const applied = window.appliedCouponCode || localStorage.getItem('nitaAppliedCoupon') || '';
    if (applied && code && applied === code) {
      const coupons = safeJSON('nitaCoupons', []);
      const found = (coupons || []).find(c => String(c.code||'').toUpperCase() === code);
      const percent = found ? Number(found.percent || found.discount || 0) : (code === 'NITA10' ? 10 : 0);
      if (percent > 0) { discount = subtotal * percent / 100; message = `<div class="summary-line discount-line"><span>Discount ${code}</span><b>-${typeof money==='function'?money(discount):('$'+discount.toFixed(2))}</b></div>`; }
    }
    return {discount, message};
  }

  window.renderCheckoutSummary = function(){
    const box = document.getElementById('checkoutSummary'); if (!box) return;
    const ps = getProducts();
    let subtotal = 0;
    const items = (cart && cart.length) ? cart.map(i => {
      const p = ps.find(x => String(x.id) === String(i.id));
      const unit = Number(p?.salePrice || p?.price || 0);
      subtotal += unit * Number(i.qty || 1);
      return `<div class="summary-line"><span><b>${p?.name || 'Product'}</b><br><span class="muted">${i.size || ''} × ${i.qty || 1}</span></span><span>${typeof money==='function'?money(unit * Number(i.qty || 1)):('$'+(unit*Number(i.qty||1)).toFixed(2))}</span></div>`;
    }).join('') : '<p class="muted">Your cart is empty.</p>';
    const c = couponState(subtotal);
    const total = Math.max(0, subtotal - c.discount) + DELIVERY_FEE;
    box.innerHTML = items + '<hr>' + line('Subtotal', subtotal) + c.message + line('Wakilni delivery fee', DELIVERY_FEE) + `<p class="delivery-note">Delivery all over Lebanon in 2-4 working days.</p>` + line('Total', total, 'summary-total');
  };

  const oldApplyCoupon = window.applyCouponCode;
  window.applyCouponCode = async function(){
    if (oldApplyCoupon) await oldApplyCoupon();
    renderCheckoutSummary();
  };

  const oldPlaceOrder = window.placeOrder;
  window.placeOrder = async function(){
    const formEl = document.getElementById('checkoutForm');
    if (typeof validateCheckoutRequired === 'function' && !validateCheckoutRequired()) return;
    if (!formEl) return oldPlaceOrder ? oldPlaceOrder() : undefined;
    const form = new FormData(formEl);
    const ps = getProducts();
    let subtotal = 0;
    const items = (cart || []).map(i => {
      const p = ps.find(x => String(x.id) === String(i.id));
      const unit = Number(p?.salePrice || p?.price || 0); subtotal += unit * Number(i.qty || 1);
      return {...i, name:p?.name || 'Product', price:unit};
    });
    const c = couponState(subtotal);
    const total = Math.max(0, subtotal - c.discount) + DELIVERY_FEE;
    const orders = safeJSON('nitaOrders', []);
    const order = {
      id:'NS'+Date.now(), date:new Date().toLocaleString(), customer:form.get('name'), email:form.get('email'), phone:form.get('phone'),
      address:{city:form.get('city'),street:form.get('street'),building:form.get('building'),floor:form.get('floor'),apartment:form.get('apartment'),landmark:form.get('landmark'),preferredTime:form.get('preferredTime'),notes:form.get('notes')},
      payment:'Cash on delivery', deliveryMethod:'Wakilni', deliveryFee:DELIVERY_FEE, deliveryTime:'2-4 working days across Lebanon', status:'Order submitted', items, subtotal, discount:c.discount, total
    };
    orders.push(order);
    localStorage.setItem('nitaOrders', JSON.stringify(orders));
    try { if (typeof saveCloudKey === 'function') await saveCloudKey('nitaOrders', orders); } catch(e){ console.warn(e); }
    cart = []; saveCart(); location.href='order-success.html';
  };

  function patchCheckoutText(){
    const form = document.getElementById('checkoutForm'); if (!form) return;
    const pay = document.querySelector('.coming-soon-pay');
    if (pay) pay.textContent = 'Online payment will be available soon.';
    if (!document.querySelector('.delivery-mini-note')) {
      const note = document.createElement('p');
      note.className = 'delivery-mini-note muted';
      note.textContent = 'Wakilni delivery across Lebanon · $5 delivery fee · 2-4 working days.';
      form.querySelector('h3')?.insertAdjacentElement('afterend', note);
    }
    renderCheckoutSummary();
  }
  window.addEventListener('DOMContentLoaded', patchCheckoutText);
  window.addEventListener('load', patchCheckoutText);
})();
/* === END FINAL FIX === */

/* === CART QUANTITY + INVENTORY + ORDER ROADMAP FINAL PATCH === */
(function(){
  const DELIVERY_FEE_FINAL = 5;
  const moneyFinal = (n)=> (typeof money==='function'?money(n):('$'+Number(n||0).toFixed(2)));
  const read = (k,f)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}};
  const write = (k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const productsNow = ()=> (typeof getProducts==='function'?getProducts():read('nitaProducts',[]));
  const saveProductsNow = async (ps)=>{write('nitaProducts',ps); try{ if(typeof saveProducts==='function') await saveProducts(ps); else if(typeof saveCloudKey==='function') await saveCloudKey('nitaProducts',ps);}catch(e){console.warn(e)} };
  const primaryImg = (p)=>{try{return productMainImage(p)}catch(e){return (p?.photos?.[p.mainPhotoIndex||0] || p?.photos?.[0] || p?.img || 'linear-gradient(135deg,#fff,#ddd)')}};
  const bgStyle = (url)=> String(url||'').startsWith('data:') ? `background-image:url(${url})` : `background:${url||'linear-gradient(135deg,#fff,#ddd)'}`;
  const unitPrice = (p,i)=> Number(p?.salePrice || p?.price || i?.price || 0);
  const itemName = (p,i)=> p?.name || i?.name || 'Product';
  const itemPhoto = (p,i)=> primaryImg(p) || i?.photo || i?.img || 'linear-gradient(135deg,#fff,#ddd)';
  const productQuantity = (p)=> p && p.quantity!==undefined && p.quantity!=='' && !Number.isNaN(Number(p.quantity)) ? Number(p.quantity) : null;

  window.changeCartQty = function(index, delta){
    cart = read('nitaCart',[]);
    const item = cart[index]; if(!item) return;
    const p = productsNow().find(x=>String(x.id)===String(item.id));
    const max = productQuantity(p);
    const next = Number(item.qty||1) + Number(delta||0);
    if(next <= 0){ cart.splice(index,1); }
    else if(max!==null && next > max){ if(typeof toast==='function') toast(`Only ${max} piece${max===1?'':'s'} available.`); return; }
    else item.qty = next;
    if(typeof saveCart==='function') saveCart(); else write('nitaCart',cart);
    if(typeof renderCartPanel==='function') renderCartPanel();
    if(typeof renderFullCart==='function') renderFullCart();
    if(typeof renderCheckoutSummary==='function') renderCheckoutSummary();
  };

  window.renderCartPanel = function(){
    const box=document.getElementById('cartItems'); if(!box) return;
    cart = read('nitaCart',[]);
    if(!cart.length){ box.innerHTML='<p class="muted">Your cart is empty.</p>'; if(typeof updateCartCount==='function')updateCartCount(); return; }
    const ps=productsNow(); let total=0;
    box.innerHTML = cart.map((i,idx)=>{
      const p=ps.find(x=>String(x.id)===String(i.id)); const unit=unitPrice(p,i); const qty=Number(i.qty||1); total += unit*qty;
      const img=itemPhoto(p,i);
      return `<div class="cart-line"><span class="cart-thumb" style="${bgStyle(img)}"></span><div class="cart-copy"><b>${itemName(p,i)}</b><br><span class="muted">${i.size||''}</span><div class="qty-stepper" aria-label="Quantity selector"><button type="button" onclick="changeCartQty(${idx},-1)">−</button><span>${qty}</span><button type="button" onclick="changeCartQty(${idx},1)">+</button></div><strong>${moneyFinal(unit*qty)}</strong></div><button class="cart-remove" type="button" aria-label="Remove item" onclick="cart=JSON.parse(localStorage.getItem('nitaCart')||'[]');cart.splice(${idx},1);saveCart();renderCartPanel();">×</button></div>`;
    }).join('') + `<div class="cart-total-line"><span>Subtotal</span><b>${moneyFinal(total)}</b></div><a class="btn cart-checkout-btn" href="checkout.html">CHECKOUT</a>`;
    if(typeof updateCartCount==='function')updateCartCount();
  };

  window.renderFullCart = function(){
    const root=document.getElementById('fullCart'); if(!root) return;
    let temp=document.getElementById('cartItems');
    if(!temp){temp=document.createElement('div'); temp.id='cartItems'; temp.style.display='none'; document.body.appendChild(temp)}
    renderCartPanel();
    root.innerHTML=temp.innerHTML;
  };

  window.addToCart = function(id,size='M'){
    const ps=productsNow(); const p=ps.find(x=>String(x.id)===String(id));
    if(!p){ if(typeof toast==='function') toast('Product not found.'); return; }
    const status = (typeof productStatusValue==='function'?productStatusValue(p):(p.status||'in-stock'));
    if(status!=='in-stock'){ if(typeof toast==='function') toast('This product is not available yet.'); return; }
    if(typeof isOOS==='function' && isOOS(p,size)){ if(typeof toast==='function') toast('This size is out of stock.'); return; }
    cart = read('nitaCart',[]);
    const existing=cart.find(i=>String(i.id)===String(id) && String(i.size)===String(size));
    const max=productQuantity(p);
    const newQty=(existing?Number(existing.qty||1):0)+1;
    if(max!==null && newQty>max){ if(typeof toast==='function') toast(`Only ${max} piece${max===1?'':'s'} available.`); return; }
    if(existing) existing.qty=newQty;
    else cart.push({id:p.id,size,qty:1,name:p.name,price:unitPrice(p),photo:primaryImg(p)});
    if(typeof saveCart==='function') saveCart(); else write('nitaCart',cart);
    if(typeof renderCartPanel==='function') renderCartPanel();
    if(typeof toast==='function') toast('Added to cart');
  };

  window.renderCheckoutSummary = function(){
    const box=document.getElementById('checkoutSummary'); if(!box) return;
    cart=read('nitaCart',[]); const ps=productsNow(); let subtotal=0;
    const rows = cart.length ? cart.map(i=>{
      const p=ps.find(x=>String(x.id)===String(i.id)); const qty=Number(i.qty||1); const unit=unitPrice(p,i); subtotal+=unit*qty;
      return `<div class="summary-line"><span><b>${itemName(p,i)}</b><br><span class="muted">${i.size||''} × ${qty}</span></span><span>${moneyFinal(unit*qty)}</span></div>`;
    }).join('') : '<p class="muted">Your cart is empty.</p>';
    let discount=0, msg='';
    try{const c=typeof couponState==='function'?couponState(subtotal):{discount:0,message:''}; discount=Number(c.discount||0); msg=c.message||'';}catch(e){}
    const total=Math.max(0,subtotal-discount)+DELIVERY_FEE_FINAL;
    box.innerHTML = rows + '<hr>' + `<div class="summary-line"><span>Subtotal</span><b>${moneyFinal(subtotal)}</b></div>` + msg + `<div class="summary-line"><span>Wakilni delivery fee</span><b>${moneyFinal(DELIVERY_FEE_FINAL)}</b></div><p class="delivery-note">Delivery all over Lebanon in 2-4 working days.</p><div class="summary-line summary-total"><span>Total</span><b>${moneyFinal(total)}</b></div>`;
  };

  window.placeOrder = async function(){
    const formEl=document.getElementById('checkoutForm');
    if(typeof validateCheckoutForm==='function' && !validateCheckoutForm()) return;
    if(typeof validateCheckoutRequired==='function' && !validateCheckoutRequired()) return;
    if(!formEl) return;
    cart=read('nitaCart',[]); if(!cart.length){ if(typeof toast==='function') toast('Your cart is empty.'); return; }
    const form=new FormData(formEl); const ps=productsNow(); let subtotal=0; const items=[];
    for(const i of cart){
      const p=ps.find(x=>String(x.id)===String(i.id)); const qty=Number(i.qty||1); const max=productQuantity(p);
      if(!p){ if(typeof toast==='function') toast('A product in your cart is no longer available.'); return; }
      if(max!==null && qty>max){ if(typeof toast==='function') toast(`${p.name} has only ${max} piece${max===1?'':'s'} left.`); return; }
      const unit=unitPrice(p,i); subtotal+=unit*qty; items.push({id:p.id,name:p.name,size:i.size,qty,price:unit,total:unit*qty});
    }
    let discount=0; try{discount=Number((typeof couponState==='function'?couponState(subtotal):{}).discount||0)}catch(e){}
    const order={id:'NS'+Date.now(),date:new Date().toLocaleString(),customer:form.get('name'),email:String(form.get('email')||'').toLowerCase(),phone:form.get('phone'),address:{city:form.get('city'),street:form.get('street'),building:form.get('building'),floor:form.get('floor'),apartment:form.get('apartment'),landmark:form.get('landmark'),preferredTime:form.get('preferredTime'),notes:form.get('notes')},payment:'Cash on delivery',deliveryMethod:'Wakilni',deliveryFee:DELIVERY_FEE_FINAL,deliveryTime:'2-4 working days across Lebanon',status:'Order submitted',items,subtotal,discount,total:Math.max(0,subtotal-discount)+DELIVERY_FEE_FINAL};
    const orders=read('nitaOrders',[]); orders.push(order); write('nitaOrders',orders);
    // decrease private admin stock quantity after order submission
    for(const item of items){
      const p=ps.find(x=>String(x.id)===String(item.id)); if(!p) continue;
      if(productQuantity(p)!==null){ p.quantity=Math.max(0,Number(p.quantity||0)-Number(item.qty||0)); if(p.quantity<=0){p.status='out-of-stock';p.soldOut=true;} }
    }
    await saveProductsNow(ps);
    try{ if(typeof saveCloudKey==='function') await saveCloudKey('nitaOrders',orders); }catch(e){console.warn(e)}
    cart=[]; if(typeof saveCart==='function') saveCart(); else write('nitaCart',cart);
    location.href='order-success.html';
  };

  function ensureAdminQuantityField(){
    const price=document.getElementById('pprice'); if(!price || document.getElementById('pquantity')) return;
    const wrap=document.createElement('div');
    wrap.innerHTML=`<label>Private quantity in stock</label><input id="pquantity" class="field" type="number" min="0" step="1" placeholder="Example: 15"><p class="field-help">Only admin sees this number. It decreases automatically after orders.</p>`;
    price.closest('div')?.insertAdjacentElement('afterend',wrap);
  }
  const oldAddProductAdmin = window.addProductAdmin;
  window.addProductAdmin = async function(){
    if(!document.getElementById('pquantity')) ensureAdminQuantityField();
    const qty = document.getElementById('pquantity')?.value;
    await (oldAddProductAdmin ? oldAddProductAdmin() : undefined);
    if(qty!==undefined && qty!==''){
      const ps=productsNow(); const newest=ps[ps.length-1]; if(newest){newest.quantity=Number(qty); await saveProductsNow(ps);}
      if(document.getElementById('pquantity')) document.getElementById('pquantity').value='';
    }
  };
  const oldRenderAdmin = window.renderAdmin;
  window.renderAdmin = function(){ if(oldRenderAdmin) oldRenderAdmin(); ensureAdminQuantityField(); document.querySelectorAll('.admin-product-card').forEach(card=>{
      const id=(card.id||'').replace('edit-',''); const p=productsNow().find(x=>String(x.id)===String(id));
      const info=card.querySelector('.admin-product-name')?.parentElement; if(info && p && !info.querySelector('.admin-private-qty')) info.insertAdjacentHTML('beforeend',`<div class="admin-private-qty">Private stock: ${p.quantity!==undefined&&p.quantity!==''?p.quantity:'Not set'}</div>`);
    }); };

  const oldProductEditorHTML = window.productEditorHTML;
  window.productEditorHTML = function(p){
    let html=oldProductEditorHTML ? oldProductEditorHTML(p) : '';
    const q=`<div><label>Private quantity in stock</label><input class="field edit-quantity" type="number" min="0" step="1" value="${p.quantity!==undefined&&p.quantity!==''?p.quantity:''}" placeholder="Example: 15"><p class="field-help">Only admin sees this number. It decreases automatically after orders.</p></div>`;
    if(html && !html.includes('edit-quantity')) html=html.replace(/<div><label>Regular price<\/label>/, q+'<div><label>Regular price</label>');
    return html;
  };
  const oldSaveProductEditor = window.saveProductEditor;
  window.saveProductEditor = async function(id){
    const root=document.getElementById('editor-'+String(id).replace(/[^a-zA-Z0-9_-]/g,'')) || document.getElementById('editor-'+id);
    const qty=root?.querySelector('.edit-quantity')?.value;
    if(oldSaveProductEditor) await oldSaveProductEditor(id);
    if(qty!==undefined){const ps=productsNow(); const p=ps.find(x=>String(x.id)===String(id)); if(p){p.quantity=qty===''?'':Number(qty); await saveProductsNow(ps); if(typeof renderAdmin==='function') renderAdmin();}}
  };

  // Make account order roadmaps readable on phone/tablet.
  window.addEventListener('load',()=>{ensureAdminQuantityField(); if(document.getElementById('checkoutSummary')) renderCheckoutSummary();});
  window.addEventListener('DOMContentLoaded',()=>{ensureAdminQuantityField(); if(document.getElementById('checkoutSummary')) setTimeout(renderCheckoutSummary,150);});
})();
/* === END CART QUANTITY + INVENTORY + ORDER ROADMAP FINAL PATCH === */

/* === LOW STOCK AUTOMATIC STATUS FINAL PATCH === */
(function(){
  const STATUS_LABELS={
    'in-stock':'In stock',
    'low-stock':'Low in stock',
    'coming-soon':'Coming soon',
    'out-of-stock':'Out of stock'
  };
  const esc=(v)=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const products=()=>{try{return typeof getProducts==='function'?getProducts():read('nitaProducts',[])}catch(e){return read('nitaProducts',[])}};
  const saveProducts=async(ps)=>{write('nitaProducts',ps);try{if(typeof saveCloudKey==='function')await saveCloudKey('nitaProducts',ps);else if(window.saveProducts)await window.saveProducts(ps)}catch(e){console.warn(e)}};
  const qtyNum=(v)=>v!==undefined&&v!==null&&v!==''&&!Number.isNaN(Number(v))?Number(v):null;
  function ensureInitialQuantity(p){
    const q=qtyNum(p?.quantity);
    if(!p || q===null) return p;
    const initial=qtyNum(p.initialQuantity);
    if(initial===null || q>initial) p.initialQuantity=q;
    return p;
  }
  function statusOf(p){
    if(!p) return 'in-stock';
    const manual=String(p.status||'in-stock');
    const q=qtyNum(p.quantity); const initial=qtyNum(p.initialQuantity);
    if(manual==='coming-soon') return 'coming-soon';
    if(manual==='out-of-stock' || p.soldOut || q===0) return 'out-of-stock';
    if(q!==null && initial!==null && initial>0 && q>0 && q<=initial*0.5) return 'low-stock';
    return 'in-stock';
  }
  function normalize(p){
    p=p||{}; ensureInitialQuantity(p); p.status=statusOf(p); p.soldOut=p.status==='out-of-stock';
    if(!Array.isArray(p.sizes)||!p.sizes.length)p.sizes=['One Size'];
    if(!Array.isArray(p.photos))p.photos=p.img&&String(p.img).startsWith('data:')?[p.img]:[];
    p.mainPhotoIndex=Number(p.mainPhotoIndex||0);
    return p;
  }
  window.productStatusValue=statusOf;
  window.normalizeProductStatus=normalize;
  window.stockStatusHtml=function(status){
    status=status||'in-stock';
    return `<span class="stock-status ${esc(status)}"><span class="stock-dot"></span><span>${STATUS_LABELS[status]||'In stock'}</span></span>`;
  };
  window.productPriceStatusRow=function(raw,tag='p'){
    const p=normalize(raw);
    const sale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price);
    const price=sale?`<span class="muted old-price">${money(p.price)}</span><span class="price-drop">${money(p.salePrice)}</span>`:money(p.price||0);
    return `<div class="product-price-row"><${tag} class="price-line">${price}</${tag}>${stockStatusHtml(p.status)}</div>`;
  };
  function mainImg(p){try{return productMainImage(p)}catch(e){return p?.photos?.[p.mainPhotoIndex||0]||p?.photos?.[0]||p?.img||'linear-gradient(135deg,#fff,#ddd)'}}
  function imgs(p){try{return productImagesForDisplay(p)}catch(e){const first=mainImg(p);return{first,second:first,all:[first]}}}
  function bg(u){try{return typeof cssBgImage==='function'?cssBgImage(u):(String(u||'').startsWith('data:')?`background-image:url(${u})`:`background:${u||'linear-gradient(135deg,#fff,#ddd)'}`)}catch(e){return 'background:linear-gradient(135deg,#fff,#ddd)'}}
  window.productCard=function(raw){
    const p=normalize(raw); const im=imgs(p); const sale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price);
    return `<article class="product status-${esc(p.status)}" data-product-id="${esc(p.id)}"><a class="product-hit" href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-img">${sale?'<span class="sale-badge">PRICE DROP</span>':''}<span class="product-img-layer product-img-primary" style="${bg(im.first)}"></span><span class="product-img-layer product-img-secondary" style="${bg(im.second)}"></span></div><h3>${esc(p.name||'Product')}</h3>${productPriceStatusRow(p,'p')}</a><button class="quick-view-btn" type="button" data-quick-id="${esc(p.id)}" onclick="event.stopPropagation();event.preventDefault();openQuickView('${String(p.id).replace(/'/g,"\\'")}')">QUICK VIEW</button></article>`;
  };
  window.renderProducts=function(el='#products',list=products()){const node=document.querySelector(el); if(node) node.innerHTML=(list||[]).map(window.productCard).join('') || '<p class="muted">No products listed yet.</p>';};
  window.addToCart=function(id,size='One Size'){
    const ps=products(); const p=normalize(ps.find(x=>String(x.id)===String(id)));
    if(!p?.id){ if(typeof toast==='function')toast('Product not found.'); return; }
    if(['coming-soon','out-of-stock'].includes(p.status)){ if(typeof toast==='function')toast('This product is not available yet.'); return; }
    if(typeof isOOS==='function' && isOOS(p,size)){ if(typeof toast==='function')toast('This size is out of stock.'); return; }
    let cart=read('nitaCart',[]); const existing=cart.find(i=>String(i.id)===String(id)&&String(i.size)===String(size));
    const q=qtyNum(p.quantity); const next=(existing?Number(existing.qty||1):0)+1;
    if(q!==null && next>q){ if(typeof toast==='function')toast(`Only ${q} piece${q===1?'':'s'} available.`); return; }
    if(existing) existing.qty=next; else cart.push({id:p.id,size,qty:1,name:p.name,price:Number(p.salePrice||p.price||0),photo:mainImg(p)});
    window.cart=cart; write('nitaCart',cart); if(typeof saveCart==='function')saveCart(); if(typeof renderCartPanel==='function')renderCartPanel(); if(typeof updateCartCount==='function')updateCartCount(); if(typeof toast==='function')toast('Added to cart');
  };
  window.openQuickView=function(id){
    const p=normalize(products().find(x=>String(x.id)===String(id))); if(!p?.id)return false;
    const im=imgs(p); const sizes=(p.sizes||['One Size']).map((s,i)=>`<button type="button" class="size ${i===0?'active':''}" onclick="this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${esc(s)}</button>`).join('');
    const canBuy=!['coming-soon','out-of-stock'].includes(p.status);
    const action=canBuy?`<button class="btn quick-add" type="button" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}', document.querySelector('#quickContent .size.active')?.textContent||'One Size'); closeQuickView && closeQuickView();">ADD TO CART</button>`:`<button class="btn disabled quick-disabled" type="button" disabled aria-disabled="true">${p.status==='coming-soon'?'COMING SOON':'OUT OF STOCK'}</button><button class="notify-btn" type="button" onclick="notifyMe && notifyMe('${String(p.id).replace(/'/g,"\\'")}')">NOTIFY ME</button>`;
    const q=document.getElementById('quickContent'); if(q)q.innerHTML=`<div class="quick-grid"><div class="quick-image" style="${bg(im.first)}"></div><div class="quick-info"><p class="muted">${esc(p.category||'')}</p><h2>${esc(p.name||'Product')}</h2>${productPriceStatusRow(p,'h3')}<p>${esc(p.desc||'')}</p><div class="sizes">${sizes}</div>${action}<a class="btn light" href="product.html?id=${encodeURIComponent(p.id)}">VIEW FULL PRODUCT</a></div></div>`;
    const m=document.getElementById('quickModal'); if(m){m.classList.add('open');m.setAttribute('aria-hidden','false')} document.body.classList.add('panel-open','quick-open'); return false;
  };
  const oldAdd=window.addProductAdmin;
  window.addProductAdmin=async function(){
    const qtyVal=document.getElementById('pquantity')?.value;
    await (oldAdd?oldAdd():undefined);
    const ps=products(); const newest=ps[ps.length-1];
    if(newest && qtyVal!==undefined && qtyVal!==''){newest.quantity=Number(qtyVal); newest.initialQuantity=Number(qtyVal); normalize(newest); await saveProducts(ps); if(typeof renderAdmin==='function')renderAdmin();}
  };
  const oldSave=window.saveProductEditor;
  window.saveProductEditor=async function(id){
    await (oldSave?oldSave(id):undefined);
    const ps=products(); const p=ps.find(x=>String(x.id)===String(id));
    if(p){ensureInitialQuantity(p); normalize(p); await saveProducts(ps); if(typeof renderAdmin==='function')renderAdmin();}
  };
  function refresh(){try{const ps=products(); let changed=false; ps.forEach(p=>{const before=p.status; ensureInitialQuantity(p); const s=statusOf(p); if(p.status!==s){p.status=s;changed=true}}); if(changed)write('nitaProducts',ps); if(typeof renderProducts==='function')renderProducts('#products',ps); if(typeof renderHomeSections==='function')renderHomeSections();}catch(e){}}
  window.addEventListener('nita-store-ready',()=>setTimeout(refresh,150));
  window.addEventListener('load',()=>setTimeout(refresh,350));
})();
/* === END LOW STOCK AUTOMATIC STATUS FINAL PATCH === */


/* === FINAL REQUEST PATCH: reliable marquee + cart persistence fix === */
(function(){
  const readJSON=(k,f)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}};
  const writeJSON=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const moneySafe=(n)=>{try{return typeof money==='function'?money(Number(n||0)):'$'+Number(n||0).toFixed(2)}catch(e){return '$'+Number(n||0).toFixed(2)}};
  const productsSafe=()=>{try{return typeof getProducts==='function'?getProducts():readJSON('nitaProducts',[])}catch(e){return readJSON('nitaProducts',[])}};
  const mainPhoto=(p)=>{try{return productMainImage(p)}catch(e){return (p&&p.photos&&p.photos[p.mainPhotoIndex||0])||(p&&p.photos&&p.photos[0])||(p&&p.img)||''}};
  const bg=(img)=>{try{return typeof cssBgImage==='function'?cssBgImage(img):(String(img||'').startsWith('data:')?`background-image:url(${img})`:'background:linear-gradient(135deg,#f7f7f7,#ddd)')}catch(e){return 'background:linear-gradient(135deg,#f7f7f7,#ddd)'}};
  const unit=(p,i)=>Number((p&&(p.salePrice!==''&&p.salePrice!=null?Number(p.salePrice):Number(p.price))) || (i&&i.price) || 0);
  const statusVal=(p)=>{try{return typeof productStatusValue==='function'?productStatusValue(p):(p.status||'in-stock')}catch(e){return p?.status||'in-stock'}};
  const card=(p)=>{try{return typeof productCard==='function'?productCard(p):''}catch(e){return ''}};

  // Fix cart bug caused by older saveCart overwriting localStorage with the old in-memory cart.
  window.saveCart=function(){
    const c = Array.isArray(window.cart) ? window.cart : readJSON('nitaCart',[]);
    writeJSON('nitaCart', c);
    try{ if(typeof updateCartCount==='function') updateCartCount(); }catch(e){}
  };
  window.updateCartCount=function(){
    const count = readJSON('nitaCart',[]).reduce((s,i)=>s+Number(i.qty||1),0);
    document.querySelectorAll('.cart-count').forEach(el=>el.textContent=String(count));
  };
  window.renderCartPanel=function(){
    const box=document.getElementById('cartItems'); if(!box)return;
    const cart=readJSON('nitaCart',[]); window.cart=cart;
    const ps=productsSafe();
    if(!cart.length){box.innerHTML='<p class="muted">Your cart is empty.</p>'; updateCartCount(); return;}
    let total=0;
    box.innerHTML=cart.map((i,idx)=>{
      const p=ps.find(x=>String(x.id)===String(i.id)); const qty=Math.max(1,Number(i.qty||1)); const price=unit(p,i); total+=price*qty;
      const img=p?mainPhoto(p):i.photo;
      return `<div class="cart-line"><span class="cart-thumb" style="${bg(img)}"></span><div class="cart-copy"><b>${(p&&p.name)||i.name||'Product'}</b><br><span class="muted">${i.size||''}</span><div class="qty-stepper" aria-label="Quantity selector"><button type="button" onclick="changeCartQty(${idx},-1)">−</button><span>${qty}</span><button type="button" onclick="changeCartQty(${idx},1)">+</button></div><strong>${moneySafe(price*qty)}</strong></div><button class="cart-remove" type="button" aria-label="Remove item" onclick="window.removeCartItem(${idx})">×</button></div>`;
    }).join('') + `<div class="cart-total-line"><span>Subtotal</span><b>${moneySafe(total)}</b></div><a class="btn cart-checkout-btn" href="checkout.html">CHECKOUT</a>`;
    updateCartCount();
  };
  window.removeCartItem=function(idx){const c=readJSON('nitaCart',[]);c.splice(idx,1);window.cart=c;saveCart();renderCartPanel();};
  window.changeCartQty=function(idx,delta){
    const c=readJSON('nitaCart',[]); const item=c[idx]; if(!item)return;
    const next=Number(item.qty||1)+Number(delta||0);
    if(next<=0)c.splice(idx,1); else item.qty=next;
    window.cart=c; saveCart(); renderCartPanel(); if(document.getElementById('checkoutSummary')&&typeof renderCheckoutSummary==='function')renderCheckoutSummary();
  };
  window.addToCart=function(id,size='One Size'){
    const ps=productsSafe(); const p=ps.find(x=>String(x.id)===String(id));
    if(!p){if(typeof toast==='function')toast('Product not found.');return;}
    const st=statusVal(p); if(st==='coming-soon'||st==='out-of-stock'){if(typeof toast==='function')toast('This product is not available yet.');return;}
    if(typeof isOOS==='function' && isOOS(p,size)){if(typeof toast==='function')toast('This size is out of stock.');return;}
    const c=readJSON('nitaCart',[]); const existing=c.find(i=>String(i.id)===String(id)&&String(i.size)===String(size));
    if(existing) existing.qty=Number(existing.qty||1)+1;
    else c.push({id:p.id,size,qty:1,name:p.name,price:unit(p),photo:mainPhoto(p)});
    window.cart=c; writeJSON('nitaCart',c); saveCart(); renderCartPanel(); if(typeof toast==='function')toast('Added to cart');
  };

  // Rebuild homepage rows as pure CSS marquees, duplicated exactly enough for seamless movement.
  function homeSectionOf(p){return p.displaySection||p.homeSection||(p.collection==='New Arrivals'?'new-arrivals':'trending-now');}
  function fillMarquee(id,list){
    const box=document.getElementById(id); if(!box)return;
    const ps=productsSafe(); const src=(list&&list.length?list:ps.slice(0,6));
    if(!src.length){box.innerHTML='<p class="muted">No products listed yet.</p>';return;}
    const base=src.map(p=>card(p)||`<article class="product"><a href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-img" style="${bg(mainPhoto(p))}"></div><h3>${p.name||'Product'}</h3><p>${moneySafe(p.price)}</p></a></article>`).join('');
    // Two identical halves are required because CSS moves exactly -50%.
    box.innerHTML=base+base;
    box.style.animation='none';
    void box.offsetWidth;
    box.style.animation='nitaContinuousMarquee '+(window.innerWidth<=760?'28s':'34s')+' linear infinite';
  }
  window.renderHomeSections=function(){
    const ps=productsSafe();
    fillMarquee('trendingMarquee',ps.filter(p=>homeSectionOf(p)==='trending-now'));
    fillMarquee('newArrivalsMarquee',ps.filter(p=>homeSectionOf(p)==='new-arrivals'));
  };
  function bootMarquees(){
    if(!(document.getElementById('trendingMarquee')||document.getElementById('newArrivalsMarquee')))return;
    const run=()=>{try{renderHomeSections();setTimeout(renderHomeSections,300);setTimeout(renderHomeSections,1000)}catch(e){console.error(e)}};
    if(typeof loadSharedStore==='function') loadSharedStore().finally(run); else run();
  }
  document.addEventListener('DOMContentLoaded',bootMarquees);
  window.addEventListener('load',bootMarquees);
  window.addEventListener('pageshow',bootMarquees);
  window.addEventListener('nita-store-ready',bootMarquees);
  setTimeout(bootMarquees,1200);
})();

/* === FINAL PATCH: empty cart checkout guard + saved address selector + professional delivery box === */
(function(){
  const DELIVERY_FEE_NITA=5;
  const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const esc=(s)=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const moneyFmt=(n)=>{try{return typeof money==='function'?money(Number(n||0)):'$'+Number(n||0).toFixed(2)}catch(e){return '$'+Number(n||0).toFixed(2)}};
  const productsSafe=()=>{try{return typeof getProducts==='function'?getProducts():read('nitaProducts',[])}catch(e){return read('nitaProducts',[])}};
  const unit=(p,i)=>Number((p&&(p.salePrice!==''&&p.salePrice!=null?Number(p.salePrice):Number(p.price))) || (i&&i.price) || 0);
  const mainPhoto=(p)=>{try{return productMainImage(p)}catch(e){return (p&&p.photos&&p.photos[p.mainPhotoIndex||0])||(p&&p.photos&&p.photos[0])||(p&&p.img)||''}};
  const bg=(img)=>{try{return typeof cssBgImage==='function'?cssBgImage(img):(String(img||'').startsWith('data:')?`background-image:url(${img})`:'background:linear-gradient(135deg,#f7f7f7,#ddd)')}catch(e){return 'background:linear-gradient(135deg,#f7f7f7,#ddd)'}};
  function currentEmail(){
    const u=read('nitaUser',null)||read('nitaCurrentUser',null); return String(u?.email||localStorage.getItem('nitaSessionEmail')||'').toLowerCase();
  }
  function currentUserRecord(){
    const email=currentEmail(); if(!email)return null; const users=read('nitaUsersByEmail',{}); return users[email]||read('nitaUser',null)||null;
  }
  function userAddresses(){
    const u=currentUserRecord(); if(!u)return [];
    const out=[];
    if(Array.isArray(u.addresses)) out.push(...u.addresses);
    if(u.defaultAddress) out.push(u.defaultAddress);
    const seen=new Set();
    return out.filter(a=>a&&typeof a==='object').map((a,i)=>({label:a.label||a.name||a.addressName||(i===0?'Home':'Address '+(i+1)),...a})).filter(a=>{const key=[a.city,a.street,a.building,a.floor,a.apartment].map(x=>String(x||'').toLowerCase()).join('|'); if(seen.has(key))return false; seen.add(key); return true;});
  }
  function collectCheckoutAddress(form){
    return {label:String(form.get('addressLabel')||'').trim(),city:String(form.get('city')||'').trim(),street:String(form.get('street')||'').trim(),building:String(form.get('building')||'').trim(),floor:String(form.get('floor')||'').trim(),apartment:String(form.get('apartment')||'').trim(),landmark:String(form.get('landmark')||'').trim(),preferredTime:String(form.get('preferredTime')||'').trim(),notes:String(form.get('notes')||'').trim()};
  }
  window.fillCheckoutAddress=function(index){
    const a=userAddresses()[Number(index)]; if(!a)return;
    const form=document.getElementById('checkoutForm'); if(!form)return;
    ['city','street','building','floor','apartment','landmark','preferredTime','notes'].forEach(k=>{if(form.elements[k]) form.elements[k].value=a[k]||''});
    if(form.elements.addressLabel) form.elements.addressLabel.value=a.label||'';
    document.querySelectorAll('.address-choice').forEach((el,i)=>el.classList.toggle('active',i===Number(index)));
  };
  async function saveAddressForUserIfNeeded(form){
    const email=currentEmail(); if(!email)return;
    const shouldSave=!!form.elements.saveAddress?.checked || !!form.elements.addressLabel?.value;
    if(!shouldSave)return;
    const users=read('nitaUsersByEmail',{}); const existing=users[email]||read('nitaUser',{})||{email};
    const addr=collectCheckoutAddress(new FormData(form));
    addr.label=addr.label || 'Address '+(((existing.addresses||[]).length||0)+1);
    const key=[addr.city,addr.street,addr.building,addr.floor,addr.apartment].map(x=>String(x||'').toLowerCase()).join('|');
    let addresses=Array.isArray(existing.addresses)?existing.addresses.slice():[];
    const idx=addresses.findIndex(a=>[a.city,a.street,a.building,a.floor,a.apartment].map(x=>String(x||'').toLowerCase()).join('|')===key);
    if(idx>=0) addresses[idx]={...addresses[idx],...addr}; else addresses.push(addr);
    users[email]={...existing,email,phone:form.elements.phone?.value||existing.phone||'',defaultAddress:addr,addresses};
    write('nitaUsersByEmail',users); write('nitaUser',users[email]);
    try{ if(typeof saveCloudKey==='function') await saveCloudKey('nitaUsersByEmail',users); }catch(e){console.warn(e)}
  }
  function injectSavedAddressSelector(){
    const form=document.getElementById('checkoutForm'); if(!form || document.getElementById('savedAddressSection'))return;
    const fields=form.querySelector('.checkout-fields'); if(!fields)return;
    const addresses=userAddresses();
    const section=document.createElement('div'); section.id='savedAddressSection'; section.className='saved-address-section';
    if(addresses.length){
      section.innerHTML=`<h3>Saved addresses</h3><p class="muted">Choose a saved delivery address, or enter a new one below.</p><div class="address-choice-grid">${addresses.map((a,i)=>`<label class="address-choice" onclick="fillCheckoutAddress(${i})"><input type="radio" name="savedAddressChoice" value="${i}"><strong>${esc(a.label||('Address '+(i+1)))}</strong><small>${esc(a.city||'')}${a.street?' · '+esc(a.street):''}${a.building?' · '+esc(a.building):''}</small><div class="address-details">Floor ${esc(a.floor||'-')} · Apt ${esc(a.apartment||'-')}<br>${esc(a.landmark||'')}</div></label>`).join('')}</div><div class="address-label-row"><input class="field" name="addressLabel" placeholder="Address name, for example Home, Office, Chalet"></div>`;
    } else {
      section.innerHTML=`<h3>Delivery address</h3><p class="muted">Add a delivery address. You can save it for future orders.</p><div class="address-label-row"><input class="field" name="addressLabel" placeholder="Address name, for example Home or Office"></div>`;
    }
    form.insertBefore(section, fields);
  }
  function injectDeliveryBox(){
    const form=document.getElementById('checkoutForm'); if(!form || document.getElementById('deliveryInfoBox'))return;
    const payment=form.querySelector('h3:nth-of-type(2)') || form.querySelector('.payment-option');
    const box=document.createElement('div'); box.id='deliveryInfoBox'; box.className='delivery-info-box';
    box.innerHTML='<div><b>Wakilni delivery across Lebanon</b><span>Estimated delivery: 2-4 working days.</span></div><strong>$5 delivery fee</strong>';
    if(payment) form.insertBefore(box,payment); else form.appendChild(box);
  }
  function disableCheckoutIfEmpty(){
    const cart=read('nitaCart',[]);
    const empty=!cart.length;
    document.querySelectorAll('.cart-checkout-btn').forEach(a=>{a.classList.toggle('disabled',empty); if(empty){a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.onclick=(e)=>{e.preventDefault(); if(typeof toast==='function')toast('Your cart is empty.');};}else{a.href='checkout.html';a.removeAttribute('aria-disabled');a.onclick=null;}});
    const form=document.getElementById('checkoutForm');
    const place=form?.querySelector('button[type="submit"],button.btn:not([type])');
    if(form && empty){
      if(place){place.classList.add('place-order-disabled'); place.disabled=true; place.textContent='CART IS EMPTY';}
      if(!document.querySelector('.empty-cart-checkout-note')){const n=document.createElement('div');n.className='empty-cart-checkout-note';n.textContent='Your cart is empty. Add a product before checkout.';form.prepend(n);}
    }
  }
  const oldRenderCartPanel=window.renderCartPanel;
  window.renderCartPanel=function(){
    if(oldRenderCartPanel) oldRenderCartPanel();
    const box=document.getElementById('cartItems'); const cart=read('nitaCart',[]); if(!box)return;
    if(!cart.length){box.innerHTML='<p class="muted">Your cart is empty.</p><button class="btn disabled cart-checkout-btn" disabled>CHECKOUT</button>';}
    disableCheckoutIfEmpty();
  };
  const oldChange=window.changeCartQty;
  window.changeCartQty=function(idx,delta){ if(oldChange) oldChange(idx,delta); setTimeout(disableCheckoutIfEmpty,0); };
  const oldRemove=window.removeCartItem;
  window.removeCartItem=function(idx){ if(oldRemove) oldRemove(idx); setTimeout(disableCheckoutIfEmpty,0); };
  const oldRenderSummary=window.renderCheckoutSummary;
  window.renderCheckoutSummary=function(){
    if(oldRenderSummary) oldRenderSummary();
    const box=document.getElementById('checkoutSummary'); if(!box)return;
    const cart=read('nitaCart',[]);
    if(!cart.length){box.innerHTML='<p class="muted">Your cart is empty.</p><hr><div class="summary-line"><span>Subtotal</span><b>$0.00</b></div><div class="summary-line"><span>Wakilni delivery fee</span><b>$0.00</b></div><div class="summary-line summary-total"><span>Total</span><b>$0.00</b></div>';}
    else if(!box.querySelector('.delivery-note')){
      const total=box.querySelector('.summary-total'); const p=document.createElement('p'); p.className='delivery-note'; p.textContent='Delivery all over Lebanon in 2-4 working days.'; if(total) box.insertBefore(p,total);
    }
    disableCheckoutIfEmpty();
  };
  const oldPlace=window.placeOrder;
  window.placeOrder=async function(){
    const form=document.getElementById('checkoutForm');
    if(!read('nitaCart',[]).length){ if(typeof toast==='function')toast('Your cart is empty.'); disableCheckoutIfEmpty(); return; }
    if(form) await saveAddressForUserIfNeeded(form);
    if(oldPlace) return oldPlace();
  };
  function boot(){injectSavedAddressSelector();injectDeliveryBox();try{window.renderCartPanel&&window.renderCartPanel();}catch(e){}try{window.renderCheckoutSummary&&window.renderCheckoutSummary();}catch(e){}disableCheckoutIfEmpty();}
  document.addEventListener('DOMContentLoaded',boot); window.addEventListener('load',boot); window.addEventListener('pageshow',boot); setTimeout(boot,500); setTimeout(boot,1300);
})();


/* === NITA STYLE PREMIUM ADDRESS + CHECKOUT FINAL SAFE PATCH === */
(function(){
  const DELIVERY_THRESHOLD = 150;
  const DELIVERY_FEE = 5;
  const ORDER_STEPS = ['Order submitted','Confirmed','Packing','Out for delivery','Delivered'];
  const esc = (v)=>String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const read = (k,f)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f));}catch(e){return f;}};
  const write = (k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const moneySafe = (n)=> typeof money==='function' ? money(Number(n||0)) : ('$'+Number(n||0).toFixed(2));
  const normalizeEmail = (v)=>String(v||'').trim().toLowerCase();
  const productList = ()=>{try{return typeof getProducts==='function'?getProducts():read('nitaProducts',[]);}catch(e){return read('nitaProducts',[]);}};
  const saveCloud = async (key,value)=>{ write(key,value); try{ if(typeof saveCloudKey==='function') await saveCloudKey(key,value); else if(key==='nitaProducts' && typeof saveProducts==='function') await saveProducts(value); }catch(e){ console.warn('Cloud save skipped:', e); } };
  const activeUser = ()=>{
    const sessionEmail = normalizeEmail(localStorage.getItem('nitaSessionEmail'));
    let u = read('nitaUser', null) || null;
    const users = read('nitaUsersByEmail', {});
    const email = normalizeEmail(u?.email || sessionEmail);
    if(email && users[email]) u = {...users[email], email};
    if(u && u.email){ write('nitaUser', u); localStorage.setItem('nitaSessionEmail', normalizeEmail(u.email)); try{window.currentUser=u; currentUser=u;}catch(e){} return u; }
    return null;
  };
  const saveUser = async (user)=>{
    if(!user || !user.email) return;
    user.email = normalizeEmail(user.email);
    const users = read('nitaUsersByEmail', {});
    users[user.email] = {...(users[user.email]||{}), ...user};
    write('nitaUsersByEmail', users); write('nitaUser', users[user.email]); localStorage.setItem('nitaSessionEmail', user.email);
    await saveCloud('nitaUsersByEmail', users);
  };
  const getUserAddresses = (user)=>{
    const list = Array.isArray(user?.addresses) ? user.addresses.filter(Boolean) : [];
    if(!list.length && user?.defaultAddress && Object.keys(user.defaultAddress).length){ return [{label:user.defaultAddress.label||'Main address', ...user.defaultAddress}]; }
    return list;
  };
  const emptyAddress = ()=>({label:'',city:'',street:'',building:'',floor:'',apartment:'',landmark:'',notes:''});
  const addressSummary = (a)=>[a.city,a.street,a.building].filter(Boolean).join(' · ');
  const addressDetailsHtml = (a)=>`<div class="saved-address-details"><p><b>City:</b> ${esc(a.city||'-')}</p><p><b>Street:</b> ${esc(a.street||'-')}</p><p><b>Building:</b> ${esc(a.building||'-')}</p><p><b>Floor:</b> ${esc(a.floor||'-')}</p><p><b>Apartment / door:</b> ${esc(a.apartment||'-')}</p>${a.landmark?`<p><b>Landmark:</b> ${esc(a.landmark)}</p>`:''}${a.notes?`<p><b>Notes:</b> ${esc(a.notes)}</p>`:''}</div>`;
  const addressFormHtml = (prefix,a={},opts={})=>{
    a={...emptyAddress(),...a};
    return `<div class="address-form premium-address-form ${opts.hidden?'is-hidden':''}" id="${prefix}Form">
      <div class="form-grid two">
        <div class="full"><input class="field" id="${prefix}Label" name="addressLabel" placeholder="Address name, for example Home or Office" value="${esc(a.label)}" required></div>
        <div><input class="field" id="${prefix}City" name="city" placeholder="City" value="${esc(a.city)}" required></div>
        <div><input class="field" id="${prefix}Street" name="street" placeholder="Street name" value="${esc(a.street)}" required></div>
        <div><input class="field" id="${prefix}Building" name="building" placeholder="Building name / number" value="${esc(a.building)}" required></div>
        <div><input class="field" id="${prefix}Floor" name="floor" placeholder="Floor" value="${esc(a.floor)}" required></div>
        <div><input class="field" id="${prefix}Apartment" name="apartment" placeholder="Apartment / door number" value="${esc(a.apartment)}" required></div>
        <div><input class="field" id="${prefix}Landmark" name="landmark" placeholder="Nearby landmark (optional)" value="${esc(a.landmark)}"></div>
        <div class="full"><textarea class="field" id="${prefix}Notes" name="notes" placeholder="Delivery notes (optional)">${esc(a.notes)}</textarea></div>
      </div>
      ${opts.checkout?'<label class="save-address"><input type="checkbox" id="checkoutSaveAddress" checked> Save this address for future orders</label>':''}
      <div class="address-form-actions"><button class="btn" type="button" onclick="${opts.checkout?'nitaSaveCheckoutAddress()':'nitaSaveAccountAddress()'}">SAVE ADDRESS</button>${opts.cancel?`<button class="btn light" type="button" onclick="${opts.checkout?'nitaCancelCheckoutAddressForm()':'nitaCancelAccountAddressForm()'}">CANCEL</button>`:''}</div>
    </div>`;
  };
  const collectAddressFromPrefix = (prefix)=>({
    label:document.getElementById(prefix+'Label')?.value?.trim()||'Address',
    city:document.getElementById(prefix+'City')?.value?.trim()||'',
    street:document.getElementById(prefix+'Street')?.value?.trim()||'',
    building:document.getElementById(prefix+'Building')?.value?.trim()||'',
    floor:document.getElementById(prefix+'Floor')?.value?.trim()||'',
    apartment:document.getElementById(prefix+'Apartment')?.value?.trim()||'',
    landmark:document.getElementById(prefix+'Landmark')?.value?.trim()||'',
    notes:document.getElementById(prefix+'Notes')?.value?.trim()||''
  });
  const validateAddress = (a)=>!!(a.label && a.city && a.street && a.building && a.floor && a.apartment);

  window.nitaToggleAddressDetails = function(id){ const el=document.getElementById(id); if(el) el.classList.toggle('open'); };

  window.nitaShowAccountAddressForm = function(index){
    const user=activeUser(); if(!user) return;
    const addresses=getUserAddresses(user); const editing = Number.isInteger(index) && index>=0;
    window.nitaEditingAccountAddress = editing ? index : null;
    const box=document.getElementById('accountAddressFormBox'); if(box){ box.innerHTML=addressFormHtml('accountAddr', editing?addresses[index]:{}, {cancel:true}); box.classList.add('open'); }
  };
  window.nitaCancelAccountAddressForm=function(){ const box=document.getElementById('accountAddressFormBox'); if(box){box.innerHTML='';box.classList.remove('open');} window.nitaEditingAccountAddress=null; };
  window.nitaSaveAccountAddress = async function(){
    const user=activeUser(); if(!user) return;
    const addr=collectAddressFromPrefix('accountAddr');
    if(!validateAddress(addr)){ if(typeof toast==='function') toast('Please complete the required address fields.'); return; }
    const addresses=getUserAddresses(user).slice();
    const idx=window.nitaEditingAccountAddress;
    if(Number.isInteger(idx) && idx>=0) addresses[idx]=addr; else addresses.push(addr);
    user.addresses=addresses; user.defaultAddress=addresses[0]||addr;
    await saveUser(user);
    window.nitaEditingAccountAddress=null;
    if(typeof toast==='function') toast('Address saved.');
    if(typeof renderAccount==='function') renderAccount();
  };
  window.nitaDeleteAccountAddress = async function(index){
    const user=activeUser(); if(!user) return;
    if(!confirm('Remove this saved address?')) return;
    const addresses=getUserAddresses(user).filter((_,i)=>i!==index); user.addresses=addresses; user.defaultAddress=addresses[0]||null; await saveUser(user); renderAccount();
  };

  const baseOrderCard = (order)=>{
    const status = String(order.status||'Order submitted');
    const idx = Math.max(0, ORDER_STEPS.indexOf(status));
    const items = (order.items||[]).map(i=>`<span>${esc(i.name||i.id||'Product')} × ${esc(i.qty||1)}</span>`).join('');
    return `<div class="account-order detailed-order"><div class="order-top"><div><b>${esc(order.id||'Order')}</b><br><span class="muted">${esc(order.date||'')} · ${esc(order.payment||'Cash on delivery')}</span></div><div><b>${moneySafe(order.total||0)}</b><br><span class="order-status">${esc(status)}</span></div></div><div class="order-roadmap-wrap"><div class="order-roadmap">${ORDER_STEPS.map((s,i)=>`<span class="${i<=idx?'done':''}">${esc(s)}</span>`).join('')}</div></div><p class="muted order-items">${items||'Order details saved.'}</p></div>`;
  };

  window.renderAccount = async function(){
    if(typeof loadSharedStore==='function'){ try{ await loadSharedStore(); }catch(e){} }
    const root=document.getElementById('accountRoot'); if(!root) return;
    const user=activeUser();
    if(!user){ root.innerHTML=`<div class="card account-auth"><h1>Sign in</h1><p class="muted">Sign in to manage your profile, saved delivery addresses, and order tracking.</p><a class="btn" href="login.html">SIGN IN / CREATE ACCOUNT</a></div>`; return; }
    const addresses=getUserAddresses(user);
    const orders=read('nitaOrders',[]).filter(o=>normalizeEmail(o.email)===normalizeEmail(user.email));
    const previous=orders.filter(o=>String(o.status||'').toLowerCase()==='delivered');
    const ongoing=orders.filter(o=>String(o.status||'').toLowerCase()!=='delivered');
    root.innerHTML=`<div class="account-hero clean-account-hero"><div><p class="eyebrow">My account</p><h1>Welcome${user.firstName?' '+esc(user.firstName):''}</h1><p class="muted">Manage your profile, saved delivery addresses, and order tracking.</p></div></div><div class="account-grid"><section class="card account-card"><h2>Personal information</h2><p class="muted">Your email is your login and cannot be edited.</p><div class="form-grid"><div><label>First name</label><input class="field" id="accFirst" value="${esc(user.firstName||'')}" placeholder="First name"></div><div><label>Last name</label><input class="field" id="accLast" value="${esc(user.lastName||'')}" placeholder="Last name"></div><div><label>Email address</label><input class="field disabled-field" value="${esc(user.email)}" disabled></div><div><label>Phone number</label><input class="field" id="accPhone" value="${esc(user.phone||'')}" placeholder="Phone number"></div></div><button class="btn" onclick="saveAccountInfo()">SAVE DETAILS</button></section><section class="card account-card"><div class="checkout-title-row"><h2>Saved delivery addresses</h2><button class="btn light small-btn" type="button" onclick="nitaShowAccountAddressForm()">ADD NEW ADDRESS</button></div><div class="saved-address-list">${addresses.length?addresses.map((a,i)=>`<div class="saved-address-card"><div class="saved-address-head"><button type="button" class="saved-address-title" onclick="nitaToggleAddressDetails('accAddrDetails${i}')"><b>${esc(a.label||'Address '+(i+1))}</b><span>${esc(addressSummary(a)||'View address details')}</span></button><button class="btn light small-btn" type="button" onclick="nitaShowAccountAddressForm(${i})">EDIT</button></div><div id="accAddrDetails${i}" class="saved-address-collapse">${addressDetailsHtml(a)}</div></div>`).join(''):`<p class="muted">No saved delivery address yet.</p><button class="btn" type="button" onclick="nitaShowAccountAddressForm()">ADD NEW ADDRESS</button>`}</div><div id="accountAddressFormBox" class="account-address-form-box"></div></section><section class="card account-card full-span"><h2>Ongoing orders</h2><div class="orders-list">${ongoing.length?ongoing.map(baseOrderCard).join(''):'<p class="muted">No ongoing orders yet.</p>'}</div></section><section class="card account-card full-span"><h2>Previous orders</h2><div class="orders-list">${previous.length?previous.map(baseOrderCard).join(''):'<p class="muted">No previous orders yet.</p>'}</div></section><section class="card danger-zone full-span"><h2>Account control</h2><p class="muted">Log out safely, or permanently remove your saved customer profile from this website.</p><button class="logout-outline-btn" type="button" onclick="logoutUser()" style="background:#fff!important;color:#111!important;border:2px solid #b00020!important;">LOG OUT</button><button class="btn danger delete-account-btn" onclick="deleteAccount()">DELETE ACCOUNT</button></section></div>`;
  };

  function currentCart(){ return read('nitaCart',[]); }
  function cartSubtotal(){ const ps=productList(); return currentCart().reduce((sum,item)=>{ const p=ps.find(x=>String(x.id)===String(item.id)); const price=Number(p?.salePrice || p?.price || item.price || 0); return sum + price*Number(item.qty||1); },0); }
  function deliveryFee(subtotal){ return subtotal>0 && subtotal<DELIVERY_THRESHOLD ? DELIVERY_FEE : 0; }
  function couponDiscount(subtotal){
    const form=document.getElementById('checkoutForm'); const code=String(sessionStorage.getItem('nitaAppliedCoupon')||'').toUpperCase();
    const typed=String(form?.coupon?.value||'').trim().toUpperCase(); const email=normalizeEmail(form?.email?.value || activeUser()?.email);
    if(!code || code!==typed) return 0;
    try{ const res=typeof calcCouponDiscount==='function'?calcCouponDiscount(code,email,subtotal):{discount:0}; return Number(res.discount||0); }catch(e){ return code==='NITA10'?subtotal*0.10:0; }
  }
  window.renderCheckoutSummary = function(){
    const box=document.getElementById('checkoutSummary'); if(!box) return;
    const cart=currentCart(); const ps=productList(); let subtotal=0;
    const rows=cart.length?cart.map(item=>{const p=ps.find(x=>String(x.id)===String(item.id)); const qty=Number(item.qty||1); const price=Number(p?.salePrice||p?.price||item.price||0); subtotal+=price*qty; return `<div class="premium-summary-item"><span><b>${esc(p?.name||item.name||'Product')}</b><small>${esc(item.size||'')} × ${qty}</small></span><strong>${moneySafe(price*qty)}</strong></div>`;}).join(''):'<p class="muted">Your cart is empty.</p>';
    const discount=couponDiscount(subtotal); const fee=deliveryFee(subtotal); const total=Math.max(0,subtotal-discount)+fee;
    box.innerHTML=`${rows}<hr><div class="summary-line"><span>Subtotal</span><b>${moneySafe(subtotal)}</b></div>${discount>0?`<div class="summary-line discount-line"><span>Discount</span><b>-${moneySafe(discount)}</b></div>`:''}<div class="summary-line"><span>Wakilni delivery</span><b>${fee?moneySafe(fee):'Free'}</b></div><p class="delivery-note">Wakilni delivery across Lebanon. $5 for orders under $150. Estimated delivery: 2-4 working days.</p><div class="summary-line summary-total"><span>Total</span><b>${moneySafe(total)}</b></div>`;
    const submit=document.querySelector('.complete-order-btn'); if(submit){ submit.disabled=!cart.length; submit.classList.toggle('disabled',!cart.length); submit.textContent=cart.length?'COMPLETE ORDER':'CART IS EMPTY'; }
  };

  window.nitaShowCheckoutAddressForm = function(){ const area=document.getElementById('checkoutAddressArea'); if(!area) return; window.nitaCheckoutMode='new'; area.querySelector('.checkout-address-form-holder')?.remove(); area.insertAdjacentHTML('beforeend', `<div class="checkout-address-form-holder">${addressFormHtml('checkoutAddr', {}, {checkout:true,cancel:true})}</div>`); };
  window.nitaCancelCheckoutAddressForm = function(){ window.nitaCheckoutMode='saved'; document.querySelector('.checkout-address-form-holder')?.remove(); };
  window.nitaSaveCheckoutAddress = async function(){
    const user=activeUser(); const addr=collectAddressFromPrefix('checkoutAddr');
    if(!validateAddress(addr)){ if(typeof toast==='function') toast('Please complete the required address fields.'); return false; }
    window.nitaCheckoutTempAddress=addr;
    if(user && document.getElementById('checkoutSaveAddress')?.checked){ const addresses=getUserAddresses(user); addresses.push(addr); user.addresses=addresses; user.defaultAddress=addresses[0]||addr; await saveUser(user); }
    if(typeof toast==='function') toast('Delivery address saved for this checkout.');
    nitaPremiumCheckoutInit();
    return true;
  };
  window.nitaSelectCheckoutAddress = function(i){ window.nitaSelectedCheckoutAddress=Number(i); document.querySelectorAll('.checkout-address-card').forEach((c,idx)=>c.classList.toggle('active',idx===Number(i))); };
  window.nitaPremiumCheckoutInit = function(){
    const form=document.getElementById('checkoutForm'); const area=document.getElementById('checkoutAddressArea'); if(!form || !area) return;
    const user=activeUser(); if(user){ if(form.email) form.email.value=user.email||''; if(form.name && !form.name.value) form.name.value=[user.firstName,user.lastName].filter(Boolean).join(' '); if(form.phone && !form.phone.value) form.phone.value=user.phone||''; }
    const addresses=getUserAddresses(user); window.nitaSelectedCheckoutAddress = window.nitaSelectedCheckoutAddress ?? (addresses.length?0:null);
    if(addresses.length && window.nitaCheckoutMode!=='new'){
      area.innerHTML=`<div class="saved-address-list checkout-address-list">${addresses.map((a,i)=>`<div class="saved-address-card checkout-address-card ${i===window.nitaSelectedCheckoutAddress?'active':''}"><label class="saved-address-head"><input type="radio" name="selectedCheckoutAddress" ${i===window.nitaSelectedCheckoutAddress?'checked':''} onchange="nitaSelectCheckoutAddress(${i})"><button type="button" class="saved-address-title" onclick="event.preventDefault(); nitaToggleAddressDetails('checkoutAddrDetails${i}')"><b>${esc(a.label||'Address '+(i+1))}</b><span>${esc(addressSummary(a)||'View address details')}</span></button></label><div id="checkoutAddrDetails${i}" class="saved-address-collapse">${addressDetailsHtml(a)}</div></div>`).join('')}</div><button class="btn light add-location-btn" type="button" onclick="nitaShowCheckoutAddressForm()">ADD NEW LOCATION</button>`;
    } else {
      area.innerHTML=`<p class="muted">No saved delivery address yet. Add a new delivery address to continue.</p><button class="btn" type="button" onclick="nitaShowCheckoutAddressForm()">ADD NEW DELIVERY ADDRESS</button>`;
      setTimeout(()=>{ if(!document.querySelector('.checkout-address-form-holder')) nitaShowCheckoutAddressForm(); },0);
    }
    const shipping=document.getElementById('shippingMethodBox'); if(shipping) shipping.innerHTML=`<div><b>Wakilni delivery across Lebanon</b><span>$5 delivery fee for orders under $150 · 2-4 working days</span></div><strong>$5</strong>`;
    renderCheckoutSummary();
  };

  window.applyCouponCode = function(){
    const form=document.getElementById('checkoutForm'); const feedback=document.getElementById('couponFeedback'); if(!form) return;
    const subtotal=cartSubtotal(); const code=String(form.coupon?.value||'').trim().toUpperCase(); const email=normalizeEmail(form.email?.value||activeUser()?.email);
    if(!code){ if(feedback){feedback.className='coupon-feedback discount-bad';feedback.textContent='Enter a coupon code first.';} sessionStorage.removeItem('nitaAppliedCoupon'); renderCheckoutSummary(); return; }
    let discount=0; try{ const r=typeof calcCouponDiscount==='function'?calcCouponDiscount(code,email,subtotal):{discount:0}; discount=Number(r.discount||0); }catch(e){ discount=(code==='NITA10'&&subtotal>0)?subtotal*.10:0; }
    if(discount>0){ sessionStorage.setItem('nitaAppliedCoupon',code); if(feedback){feedback.className='coupon-feedback discount-good';feedback.textContent=`Coupon applied. You saved ${moneySafe(discount)}.`;} }
    else { sessionStorage.removeItem('nitaAppliedCoupon'); if(feedback){feedback.className='coupon-feedback discount-bad';feedback.textContent='Coupon code is expired, invalid, already used, or no discount is applicable.';} }
    renderCheckoutSummary();
  };

  function selectedCheckoutAddress(){ const user=activeUser(); const addresses=getUserAddresses(user); if(addresses.length && window.nitaCheckoutMode!=='new') return addresses[Number(window.nitaSelectedCheckoutAddress||0)]; return window.nitaCheckoutTempAddress || collectAddressFromPrefix('checkoutAddr'); }
  window.placeOrder = async function(){
    const form=document.getElementById('checkoutForm'); if(!form) return;
    if(!currentCart().length){ if(typeof toast==='function') toast('Your cart is empty.'); renderCheckoutSummary(); return; }
    if(!form.name.value.trim() || !form.phone.value.trim() || !form.email.value.trim()){ if(typeof toast==='function') toast('Please complete your contact details.'); return; }
    let address=selectedCheckoutAddress();
    if(!validateAddress(address)){
      if(document.querySelector('#checkoutAddrForm')){ if(typeof toast==='function') toast('Please complete and save your delivery address.'); return; }
      nitaShowCheckoutAddressForm(); if(typeof toast==='function') toast('Please add a delivery address.'); return;
    }
    const ps=productList(); const cart=currentCart(); let subtotal=0; const items=[];
    for(const item of cart){ const p=ps.find(x=>String(x.id)===String(item.id)); const qty=Number(item.qty||1); if(!p){ if(typeof toast==='function')toast('A product in your cart is no longer available.'); return; } const price=Number(p.salePrice||p.price||item.price||0); subtotal+=price*qty; items.push({id:p.id,name:p.name,size:item.size,qty,price,total:price*qty}); if(p.quantity!==undefined && p.quantity!==''){ p.quantity=Math.max(0,Number(p.quantity||0)-qty); if(p.quantity<=0){p.status='out-of-stock';p.soldOut=true;} } }
    const discount=couponDiscount(subtotal); const fee=deliveryFee(subtotal); const order={id:'NS'+Date.now(),date:new Date().toLocaleString(),customer:form.name.value.trim(),email:normalizeEmail(form.email.value),phone:form.phone.value.trim(),address,payment:'Cash on delivery',deliveryMethod:'Wakilni',deliveryFee:fee,deliveryTime:'2-4 working days across Lebanon',status:'Order submitted',items,subtotal,discount,total:Math.max(0,subtotal-discount)+fee};
    const orders=read('nitaOrders',[]); orders.push(order); await saveCloud('nitaOrders',orders); await saveCloud('nitaProducts',ps);
    write('nitaCart',[]); window.cart=[]; if(typeof updateCartCount==='function') updateCartCount(); sessionStorage.removeItem('nitaAppliedCoupon'); location.href='order-success.html';
  };

  document.addEventListener('input',e=>{ if(e.target?.name==='coupon') { sessionStorage.removeItem('nitaAppliedCoupon'); const f=document.getElementById('couponFeedback'); if(f)f.textContent=''; renderCheckoutSummary(); }});
  document.addEventListener('DOMContentLoaded',()=>{ if(document.getElementById('checkoutForm')) setTimeout(nitaPremiumCheckoutInit,50); });
  window.addEventListener('pageshow',()=>{ if(document.getElementById('checkoutForm')) setTimeout(nitaPremiumCheckoutInit,50); });
})();
/* === END NITA STYLE PREMIUM ADDRESS + CHECKOUT FINAL SAFE PATCH === */


/* === NITA STYLE CART + CHECKOUT ADDRESS STABILITY PATCH 2026-06-08 === */
(function(){
  const DELIVERY_THRESHOLD = 150;
  const DELIVERY_FEE = 5;
  const read = (k,f)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f));}catch(e){return f;}};
  const write = (k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const esc = (v)=>String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const moneySafe = (n)=>{try{return typeof money==='function'?money(Number(n||0)):'$'+Number(n||0).toFixed(2)}catch(e){return '$'+Number(n||0).toFixed(2)}};
  const emailNow = ()=>String((read('nitaUser',null)?.email)||localStorage.getItem('nitaSessionEmail')||'').trim().toLowerCase();
  const getUsers = ()=>read('nitaUsersByEmail',{});
  const getUser = ()=>{const e=emailNow(); if(!e) return null; const users=getUsers(); return users[e] || read('nitaUser',null) || null;};
  const saveUserSafe = async (user)=>{ if(!user || !user.email) return; user.email=String(user.email).toLowerCase(); const users=getUsers(); users[user.email]={...(users[user.email]||{}),...user}; write('nitaUsersByEmail',users); write('nitaUser',users[user.email]); localStorage.setItem('nitaSessionEmail',user.email); try{ if(typeof saveCloudKey==='function') await saveCloudKey('nitaUsersByEmail',users); }catch(e){ console.warn(e); } };
  const products = ()=>{try{return typeof getProducts==='function'?getProducts():read('nitaProducts',[]);}catch(e){return read('nitaProducts',[])}};
  const cartList = ()=>read('nitaCart',[]);
  const setCart = (c)=>{write('nitaCart',c); try{window.cart=c;}catch(e){} if(typeof updateCartCount==='function') updateCartCount();};
  const addrList = ()=>{ const u=getUser(); if(!u) return []; let list=Array.isArray(u.addresses)?u.addresses.filter(Boolean):[]; if(!list.length && u.defaultAddress && Object.keys(u.defaultAddress).length) list=[u.defaultAddress]; return list.map((a,i)=>({label:a.label||a.name||a.addressName||(i===0?'Home':'Address '+(i+1)), city:a.city||'', street:a.street||'', building:a.building||'', floor:a.floor||'', apartment:a.apartment||'', landmark:a.landmark||'', notes:a.notes||''})); };
  const addrSummary = (a)=>[a.city,a.street,a.building].filter(Boolean).join(' · ') || 'View details';
  const detailsHtml = (a)=>`<div class="saved-address-details"><p><b>City:</b> ${esc(a.city||'-')}</p><p><b>Street:</b> ${esc(a.street||'-')}</p><p><b>Building:</b> ${esc(a.building||'-')}</p><p><b>Floor:</b> ${esc(a.floor||'-')}</p><p><b>Apartment / door:</b> ${esc(a.apartment||'-')}</p>${a.landmark?`<p><b>Landmark:</b> ${esc(a.landmark)}</p>`:''}${a.notes?`<p><b>Notes:</b> ${esc(a.notes)}</p>`:''}</div>`;
  const addressFormHtml = (prefix)=>`<div class="checkout-address-form-holder"><div class="premium-address-form"><div class="form-grid two"><div class="full"><input class="field" id="${prefix}Label" placeholder="Address name, for example Home or Office" required></div><div><input class="field" id="${prefix}City" placeholder="City" required></div><div><input class="field" id="${prefix}Street" placeholder="Street name" required></div><div><input class="field" id="${prefix}Building" placeholder="Building name / number" required></div><div><input class="field" id="${prefix}Floor" placeholder="Floor" required></div><div><input class="field" id="${prefix}Apartment" placeholder="Apartment / door number" required></div><div><input class="field" id="${prefix}Landmark" placeholder="Nearby landmark (optional)"></div><div class="full"><textarea class="field" id="${prefix}Notes" placeholder="Delivery notes (optional)"></textarea></div></div><label class="save-address"><input type="checkbox" id="checkoutSaveAddress" checked> Save this address for future orders</label><div class="address-form-actions"><button class="btn" type="button" onclick="nitaSaveCheckoutAddress()">SAVE DELIVERY ADDRESS</button><button class="btn light" type="button" onclick="nitaCancelCheckoutAddressForm()">CANCEL</button></div></div></div>`;
  const collectAddress = (prefix)=>({label:document.getElementById(prefix+'Label')?.value.trim()||'', city:document.getElementById(prefix+'City')?.value.trim()||'', street:document.getElementById(prefix+'Street')?.value.trim()||'', building:document.getElementById(prefix+'Building')?.value.trim()||'', floor:document.getElementById(prefix+'Floor')?.value.trim()||'', apartment:document.getElementById(prefix+'Apartment')?.value.trim()||'', landmark:document.getElementById(prefix+'Landmark')?.value.trim()||'', notes:document.getElementById(prefix+'Notes')?.value.trim()||''});
  const validAddress = (a)=>!!(a.label&&a.city&&a.street&&a.building&&a.floor&&a.apartment);
  const subtotal = ()=>{const ps=products(); return cartList().reduce((sum,item)=>{const p=ps.find(x=>String(x.id)===String(item.id)); const price=Number(p?.salePrice||p?.price||item.price||0); return sum+price*Number(item.qty||1);},0)};
  const deliveryFee = (s)=>s>0 && s<DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;

  window.renderCartPanel = function(){
    const box=document.getElementById('cartItems'); if(!box) return;
    const c=cartList(); const ps=products();
    if(!c.length){ box.innerHTML='<p class="muted">Your cart is empty.</p><button class="btn disabled cart-checkout-btn" disabled>CHECKOUT</button>'; cleanCartPanelButtons(); return; }
    let total=0;
    box.innerHTML=c.map((item,idx)=>{ const p=ps.find(x=>String(x.id)===String(item.id)); if(!p) return ''; const price=Number(p.salePrice||p.price||item.price||0); const qty=Number(item.qty||1); total+=price*qty; const img=(p.photos&&p.photos[0])||p.img||''; const imgStyle=(typeof cssBgImage==='function'?cssBgImage(img):(img?`background-image:url(${img})`:'background:linear-gradient(135deg,#f7f7f7,#ddd)')); return `<div class="cart-line"><span class="cart-thumb" style="${imgStyle}"></span><div class="cart-info"><b>${esc(p.name||item.name||'Product')}</b><small>${esc(item.size||'')}</small><div class="qty-stepper"><button onclick="changeCartQty(${idx},-1)">−</button><span>${qty}</span><button onclick="changeCartQty(${idx},1)">+</button></div></div><div class="cart-side"><button class="remove-cart-btn" onclick="removeCartItem(${idx})">×</button><strong>${moneySafe(price*qty)}</strong></div></div>`; }).join('')+`<div class="cart-total-line"><span>Subtotal</span><b>${moneySafe(total)}</b></div><a class="btn cart-checkout-btn" href="checkout.html">CHECKOUT</a>`;
    cleanCartPanelButtons();
  };
  window.changeCartQty = function(idx,delta){ const c=cartList(); if(!c[idx])return; c[idx].qty=Math.max(1,Number(c[idx].qty||1)+Number(delta||0)); setCart(c); renderCartPanel(); };
  window.removeCartItem = function(idx){ const c=cartList(); c.splice(idx,1); setCart(c); renderCartPanel(); };
  function cleanCartPanelButtons(){ const panel=document.getElementById('cartPanel'); if(!panel) return; panel.querySelectorAll(':scope > a.btn:not(.cart-checkout-btn)').forEach(a=>a.remove()); const buttons=panel.querySelectorAll('.cart-checkout-btn'); buttons.forEach((b,i)=>{if(i<buttons.length-1)b.remove();}); }

  window.nitaToggleAddressDetails = function(id){ const el=document.getElementById(id); if(el) el.classList.toggle('open'); };
  window.nitaSelectCheckoutAddress = function(i){ window.nitaSelectedCheckoutAddress=Number(i); document.querySelectorAll('.checkout-address-card').forEach((card,idx)=>card.classList.toggle('active',idx===Number(i))); };
  window.nitaShowCheckoutAddressForm = function(){ const area=document.getElementById('checkoutAddressArea'); if(!area) return; window.nitaCheckoutMode='new'; area.querySelector('.checkout-address-form-holder')?.remove(); area.insertAdjacentHTML('beforeend',addressFormHtml('checkoutAddr')); };
  window.nitaCancelCheckoutAddressForm = function(){ window.nitaCheckoutMode='saved'; window.nitaCheckoutTempAddress=null; document.querySelector('.checkout-address-form-holder')?.remove(); };
  window.nitaSaveCheckoutAddress = async function(){
    const addr=collectAddress('checkoutAddr');
    if(!validAddress(addr)){ if(typeof toast==='function') toast('Please complete the required address fields.'); return false; }
    window.nitaCheckoutTempAddress=addr;
    const user=getUser();
    if(user && document.getElementById('checkoutSaveAddress')?.checked){ const list=addrList(); list.push(addr); user.addresses=list; user.defaultAddress=list[0]||addr; await saveUserSafe(user); }
    window.nitaCheckoutMode='saved';
    window.nitaSelectedCheckoutAddress=(addrList().length-1>=0)?addrList().length-1:null;
    if(typeof toast==='function') toast('Delivery address saved.');
    nitaPremiumCheckoutInit();
    return true;
  };
  window.nitaPremiumCheckoutInit = function(){
    const form=document.getElementById('checkoutForm'); const area=document.getElementById('checkoutAddressArea'); if(!form||!area) return;
    const u=getUser(); if(u){ if(form.email)form.email.value=u.email||''; if(form.phone&&!form.phone.value)form.phone.value=u.phone||''; if(form.name&&!form.name.value)form.name.value=[u.firstName,u.lastName].filter(Boolean).join(' '); }
    const addresses=addrList();
    if(addresses.length && window.nitaCheckoutMode!=='new'){
      if(window.nitaSelectedCheckoutAddress==null) window.nitaSelectedCheckoutAddress=0;
      area.innerHTML=`<div class="saved-address-list checkout-address-list">${addresses.map((a,i)=>`<div class="saved-address-card checkout-address-card ${i===window.nitaSelectedCheckoutAddress?'active':''}"><label class="saved-address-head"><input type="radio" name="selectedCheckoutAddress" ${i===window.nitaSelectedCheckoutAddress?'checked':''} onchange="nitaSelectCheckoutAddress(${i})"><button type="button" class="saved-address-title" onclick="event.preventDefault(); nitaToggleAddressDetails('checkoutAddrDetails${i}')"><b>${esc(a.label||'Address '+(i+1))}</b><span>${esc(addrSummary(a))}</span></button></label><div id="checkoutAddrDetails${i}" class="saved-address-collapse">${detailsHtml(a)}</div></div>`).join('')}</div><button class="btn light add-location-btn" type="button" onclick="nitaShowCheckoutAddressForm()">ADD NEW LOCATION</button>`;
    }else{
      area.innerHTML=`<p class="muted">No saved delivery address yet. Add a new delivery address to continue.</p><button class="btn" type="button" onclick="nitaShowCheckoutAddressForm()">ADD NEW DELIVERY ADDRESS</button>`;
    }
    const ship=document.getElementById('shippingMethodBox'); if(ship) ship.innerHTML='<div><b>Wakilni delivery across Lebanon</b><span>$5 delivery fee for orders under $150 · 2-4 working days</span></div><strong>$5</strong>';
    renderCheckoutSummary();
  };
  window.renderCheckoutSummary = function(){
    const box=document.getElementById('checkoutSummary'); if(!box)return; const c=cartList(); const ps=products(); let sub=0;
    const rows=c.length?c.map(item=>{const p=ps.find(x=>String(x.id)===String(item.id)); const qty=Number(item.qty||1); const price=Number(p?.salePrice||p?.price||item.price||0); sub+=price*qty; return `<div class="premium-summary-item"><span><b>${esc(p?.name||item.name||'Product')}</b><small>${esc(item.size||'')} × ${qty}</small></span><strong>${moneySafe(price*qty)}</strong></div>`;}).join(''):'<p class="muted">Your cart is empty.</p>';
    const fee=deliveryFee(sub); const total=sub+fee; box.innerHTML=`${rows}<hr><div class="summary-line"><span>Subtotal</span><b>${moneySafe(sub)}</b></div><div class="summary-line"><span>Wakilni delivery</span><b>${fee?moneySafe(fee):'Free'}</b></div><p class="delivery-note">Wakilni delivery across Lebanon. $5 for orders under $150. Estimated delivery: 2-4 working days.</p><div class="summary-line summary-total"><span>Total</span><b>${moneySafe(total)}</b></div>`;
    const btn=document.querySelector('.complete-order-btn'); if(btn){btn.disabled=!c.length; btn.classList.toggle('disabled',!c.length); btn.textContent=c.length?'COMPLETE ORDER':'CART IS EMPTY';}
  };
  window.placeOrder = async function(){
    const form=document.getElementById('checkoutForm'); if(!form)return; const c=cartList(); if(!c.length){ if(typeof toast==='function')toast('Your cart is empty.'); renderCheckoutSummary(); return; }
    if(!form.name.value.trim()||!form.phone.value.trim()||!form.email.value.trim()){ if(typeof toast==='function')toast('Please complete your contact details.'); return; }
    const addresses=addrList(); let address=(addresses.length&&window.nitaCheckoutMode!=='new')?addresses[Number(window.nitaSelectedCheckoutAddress||0)]:window.nitaCheckoutTempAddress;
    if(!validAddress(address||{})){ if(typeof toast==='function')toast('Please add and save a delivery address.'); nitaShowCheckoutAddressForm(); return; }
    const ps=products(); let sub=0; const items=[];
    for(const item of c){ const p=ps.find(x=>String(x.id)===String(item.id)); if(!p) continue; const qty=Number(item.qty||1); const price=Number(p.salePrice||p.price||item.price||0); sub+=price*qty; items.push({id:p.id,name:p.name,size:item.size,qty,price,total:price*qty}); if(p.quantity!==undefined&&p.quantity!==''){p.quantity=Math.max(0,Number(p.quantity||0)-qty); if(p.quantity<=0)p.status='out-of-stock';} }
    const fee=deliveryFee(sub); const order={id:'NS'+Date.now(),date:new Date().toLocaleString(),customer:form.name.value.trim(),email:String(form.email.value||'').toLowerCase(),phone:form.phone.value.trim(),address,payment:'Cash on delivery',deliveryMethod:'Wakilni',deliveryFee:fee,deliveryTime:'2-4 working days across Lebanon',status:'Order submitted',items,subtotal:sub,discount:0,total:sub+fee};
    const orders=read('nitaOrders',[]); orders.push(order); write('nitaOrders',orders); write('nitaProducts',ps); try{if(typeof saveCloudKey==='function'){await saveCloudKey('nitaOrders',orders); await saveCloudKey('nitaProducts',ps);}}catch(e){console.warn(e)} setCart([]); location.href='order-success.html';
  };
  function boot(){ try{renderCartPanel();}catch(e){} if(document.getElementById('checkoutForm')){try{nitaPremiumCheckoutInit();}catch(e){console.error(e)}} }
  document.addEventListener('DOMContentLoaded',boot); window.addEventListener('load',boot); window.addEventListener('pageshow',boot); setTimeout(boot,300); setTimeout(boot,1200);
})();
/* === END CART + CHECKOUT ADDRESS STABILITY PATCH 2026-06-08 === */

/* === NITA STYLE FINAL CHECKOUT/CART ADDRESS HOTFIX 2026-06-08 === */
(function(){
  const DELIVERY_FEE = 5;
  const DELIVERY_THRESHOLD = 150;
  const esc = (v)=>String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const read = (k,f)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f));}catch(e){return f;}};
  const write = (k,v)=>localStorage.setItem(k, JSON.stringify(v));
  const moneySafe = (n)=>{try{return typeof money==='function'?money(Number(n||0)):'$'+Number(n||0).toFixed(2)}catch(e){return '$'+Number(n||0).toFixed(2)}};
  const products = ()=>{try{return typeof getProducts==='function'?getProducts():read('nitaProducts',[]);}catch(e){return read('nitaProducts',[])}};
  const cartList = ()=>read('nitaCart',[]);
  const setCart = (c)=>{write('nitaCart',c||[]); try{window.cart=c||[];}catch(e){} try{updateCartCount?.();}catch(e){}};
  const normalizedEmail = ()=>String(read('nitaUser',null)?.email || localStorage.getItem('nitaSessionEmail') || '').trim().toLowerCase();
  const getUsers = ()=>read('nitaUsersByEmail',{});
  const getUser = ()=>{ const email=normalizedEmail(); if(!email) return null; return getUsers()[email] || read('nitaUser',null) || null; };
  const saveUserSafe = async (user)=>{ if(!user || !user.email) return false; user.email=String(user.email).toLowerCase(); const users=getUsers(); users[user.email]={...(users[user.email]||{}),...user}; write('nitaUsersByEmail',users); write('nitaUser',users[user.email]); localStorage.setItem('nitaSessionEmail',user.email); try{ if(typeof saveCloudKey==='function') await saveCloudKey('nitaUsersByEmail',users); }catch(e){ console.warn('Address saved locally, cloud sync later.', e); } return true; };
  const cleanAddress = (a={},i=0)=>({
    label:a.label||a.name||a.addressName||(i===0?'Home':'Address '+(i+1)),
    city:a.city||'', street:a.street||'', building:a.building||'', floor:a.floor||'', apartment:a.apartment||'', landmark:a.landmark||'', notes:a.notes||''
  });
  const userAddresses = ()=>{ const u=getUser(); if(!u) return []; let list=Array.isArray(u.addresses)?u.addresses.filter(Boolean):[]; if(!list.length && u.defaultAddress && Object.keys(u.defaultAddress).length) list=[u.defaultAddress]; return list.map(cleanAddress); };
  const guestAddresses = ()=>read('nitaGuestAddresses',[]).map(cleanAddress);
  const allCheckoutAddresses = ()=>{ const u=userAddresses(); return u.length ? u : guestAddresses(); };
  const addrSummary = (a)=>[a.city,a.street,a.building].filter(Boolean).join(' · ') || 'View address details';
  const detailsHtml = (a)=>`<div class="saved-address-details"><p><b>City:</b> ${esc(a.city||'-')}</p><p><b>Street:</b> ${esc(a.street||'-')}</p><p><b>Building:</b> ${esc(a.building||'-')}</p><p><b>Floor:</b> ${esc(a.floor||'-')}</p><p><b>Apartment / door:</b> ${esc(a.apartment||'-')}</p>${a.landmark?`<p><b>Landmark:</b> ${esc(a.landmark)}</p>`:''}${a.notes?`<p><b>Notes:</b> ${esc(a.notes)}</p>`:''}</div>`;
  const collectAddress = (prefix)=>({
    label:document.getElementById(prefix+'Label')?.value.trim()||'',
    city:document.getElementById(prefix+'City')?.value.trim()||'',
    street:document.getElementById(prefix+'Street')?.value.trim()||'',
    building:document.getElementById(prefix+'Building')?.value.trim()||'',
    floor:document.getElementById(prefix+'Floor')?.value.trim()||'',
    apartment:document.getElementById(prefix+'Apartment')?.value.trim()||'',
    landmark:document.getElementById(prefix+'Landmark')?.value.trim()||'',
    notes:document.getElementById(prefix+'Notes')?.value.trim()||''
  });
  const validAddress = (a)=>!!(a && a.label && a.city && a.street && a.building && a.floor && a.apartment);
  const addressFormHtml = (prefix)=>`<div class="checkout-address-form-holder"><div class="premium-address-form"><div class="form-grid two"><div class="full"><input class="field" id="${prefix}Label" placeholder="Address name, for example Home or Office" required></div><div><input class="field" id="${prefix}City" placeholder="City" required></div><div><input class="field" id="${prefix}Street" placeholder="Street name" required></div><div><input class="field" id="${prefix}Building" placeholder="Building name / number" required></div><div><input class="field" id="${prefix}Floor" placeholder="Floor" required></div><div><input class="field" id="${prefix}Apartment" placeholder="Apartment / door number" required></div><div><input class="field" id="${prefix}Landmark" placeholder="Nearby landmark (optional)"></div><div class="full"><textarea class="field" id="${prefix}Notes" placeholder="Delivery notes (optional)"></textarea></div></div><label class="save-address"><input type="checkbox" id="checkoutSaveAddress" checked> Save this address for future orders</label><div class="address-form-actions"><button class="btn" type="button" onclick="nitaSaveCheckoutAddress()">SAVE DELIVERY ADDRESS</button><button class="btn light" type="button" onclick="nitaCancelCheckoutAddressForm()">CANCEL</button></div></div></div>`;
  const deliveryFee = (sub)=>sub>0 && sub<DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;

  window.renderCartPanel = function(){
    const box=document.getElementById('cartItems'); if(!box) return;
    const c=cartList(); const ps=products();
    if(!c.length){ box.innerHTML='<p class="muted">Your cart is empty.</p><button class="btn disabled cart-checkout-btn" disabled>CHECKOUT</button>'; return; }
    let total=0;
    box.innerHTML=c.map((item,idx)=>{ const p=ps.find(x=>String(x.id)===String(item.id)); if(!p) return ''; const price=Number(p.salePrice||p.price||item.price||0); const qty=Number(item.qty||1); total+=price*qty; const img=(p.photos&&p.photos[0])||p.img||''; const imgStyle=(typeof cssBgImage==='function'?cssBgImage(img):(img?`background-image:url(${img})`:'background:linear-gradient(135deg,#f7f7f7,#ddd)')); return `<div class="cart-line"><span class="cart-thumb" style="${imgStyle}"></span><div class="cart-info"><b>${esc(p.name||item.name||'Product')}</b><small>${esc(item.size||'')}</small><div class="qty-stepper"><button aria-label="Decrease quantity" onclick="changeCartQty(${idx},-1)">−</button><span>${qty}</span><button aria-label="Increase quantity" onclick="changeCartQty(${idx},1)">+</button></div></div><div class="cart-side"><button class="remove-cart-btn" onclick="removeCartItem(${idx})">×</button><strong>${moneySafe(price*qty)}</strong></div></div>`; }).join('')+`<p class="cart-fee-note">Additional fees will be calculated at checkout.</p><div class="cart-total-line"><span>Subtotal</span><b>${moneySafe(total)}</b></div><a class="btn cart-checkout-btn" href="checkout.html">CHECKOUT</a>`;
  };
  window.changeCartQty=function(idx,delta){ const c=cartList(); if(!c[idx])return; c[idx].qty=Math.max(1,Number(c[idx].qty||1)+Number(delta||0)); setCart(c); renderCartPanel(); };
  window.removeCartItem=function(idx){ const c=cartList(); c.splice(idx,1); setCart(c); renderCartPanel(); };

  window.nitaToggleAddressDetails=function(id){ const el=document.getElementById(id); if(el) el.classList.toggle('open'); };
  window.nitaSelectCheckoutAddress=function(i){ window.nitaSelectedCheckoutAddress=Number(i); document.querySelectorAll('.checkout-address-card').forEach((card,idx)=>card.classList.toggle('active',idx===Number(i))); };
  window.nitaShowCheckoutAddressForm=function(){ const area=document.getElementById('checkoutAddressArea'); if(!area) return; window.nitaCheckoutMode='new'; area.querySelector('.checkout-address-form-holder')?.remove(); area.insertAdjacentHTML('beforeend',addressFormHtml('checkoutAddr')); };
  window.nitaCancelCheckoutAddressForm=function(){ window.nitaCheckoutMode='saved'; window.nitaCheckoutTempAddress=null; document.querySelector('.checkout-address-form-holder')?.remove(); };
  window.nitaSaveCheckoutAddress=async function(){
    const addr=collectAddress('checkoutAddr');
    if(!validAddress(addr)){ if(typeof toast==='function') toast('Please complete the required address fields.'); return false; }
    const user=getUser();
    if(user && document.getElementById('checkoutSaveAddress')?.checked){ const list=userAddresses(); list.push(addr); user.addresses=list; user.defaultAddress=list[0]||addr; await saveUserSafe(user); }
    else { const list=guestAddresses(); list.push(addr); write('nitaGuestAddresses', list); }
    window.nitaCheckoutTempAddress=addr;
    window.nitaCheckoutMode='saved';
    const addresses=allCheckoutAddresses();
    window.nitaSelectedCheckoutAddress=Math.max(0, addresses.length-1);
    if(typeof toast==='function') toast('Delivery address saved.');
    nitaPremiumCheckoutInit();
    return true;
  };
  window.nitaPremiumCheckoutInit=function(){
    const form=document.getElementById('checkoutForm'); const area=document.getElementById('checkoutAddressArea'); if(!form||!area) return;
    const u=getUser(); if(u){ if(form.email)form.email.value=u.email||''; if(form.phone&&!form.phone.value)form.phone.value=u.phone||''; if(form.name&&!form.name.value)form.name.value=[u.firstName,u.lastName].filter(Boolean).join(' '); }
    const addresses=allCheckoutAddresses();
    if(addresses.length && window.nitaCheckoutMode!=='new'){
      if(window.nitaSelectedCheckoutAddress==null || !addresses[window.nitaSelectedCheckoutAddress]) window.nitaSelectedCheckoutAddress=0;
      area.innerHTML=`<div class="saved-address-list checkout-address-list">${addresses.map((a,i)=>`<div class="saved-address-card checkout-address-card ${i===window.nitaSelectedCheckoutAddress?'active':''}"><label class="saved-address-head"><input type="radio" name="selectedCheckoutAddress" ${i===window.nitaSelectedCheckoutAddress?'checked':''} onchange="nitaSelectCheckoutAddress(${i})"><button type="button" class="saved-address-title" onclick="event.preventDefault(); nitaToggleAddressDetails('checkoutAddrDetails${i}')"><b>${esc(a.label||'Address '+(i+1))}</b><span>${esc(addrSummary(a))}</span></button></label><div id="checkoutAddrDetails${i}" class="saved-address-collapse">${detailsHtml(a)}</div></div>`).join('')}</div><button class="btn light add-location-btn" type="button" onclick="nitaShowCheckoutAddressForm()">ADD NEW DELIVERY ADDRESS</button>`;
    } else {
      area.innerHTML=`<p class="muted">No saved delivery address yet. Add a new delivery address to continue.</p><button class="btn" type="button" onclick="nitaShowCheckoutAddressForm()">ADD NEW DELIVERY ADDRESS</button>`;
    }
    const ship=document.getElementById('shippingMethodBox'); if(ship) ship.innerHTML='<div><b>Wakilni delivery across Lebanon</b><span>$5 delivery fee for orders under $150 · 2-4 working days</span></div><strong>$5</strong>';
    const payment=document.querySelector('.payment-box'); if(payment) payment.innerHTML='<label class="payment-row disabled-payment"><input type="radio" disabled><span><b>Credit card / online payment</b><small>Coming soon</small></span></label><label class="payment-row active-payment"><input type="radio" name="payment" value="Cash on delivery" checked><span><b>Cash on Delivery (COD)</b><small>Cash on delivery is ONLY accepted in Lebanon, and payments must be in USD.</small></span></label>';
    renderCheckoutSummary();
  };
  window.renderCheckoutSummary=function(){
    const box=document.getElementById('checkoutSummary'); if(!box)return; const c=cartList(); const ps=products(); let sub=0;
    const rows=c.length?c.map(item=>{const p=ps.find(x=>String(x.id)===String(item.id)); const qty=Number(item.qty||1); const price=Number(p?.salePrice||p?.price||item.price||0); sub+=price*qty; return `<div class="premium-summary-item"><span><b>${esc(p?.name||item.name||'Product')}</b><small>${esc(item.size||'')} × ${qty}</small></span><strong>${moneySafe(price*qty)}</strong></div>`;}).join(''):'<p class="muted">Your cart is empty.</p>';
    const fee=deliveryFee(sub); const total=sub+fee; box.innerHTML=`${rows}<hr><div class="summary-line"><span>Subtotal</span><b>${moneySafe(sub)}</b></div><div class="summary-line"><span>Wakilni delivery</span><b>${fee?moneySafe(fee):'Free'}</b></div><div class="summary-line summary-total"><span>Total</span><b>${moneySafe(total)}</b></div>`;
    const btn=document.querySelector('.complete-order-btn'); if(btn){btn.disabled=!c.length; btn.classList.toggle('disabled',!c.length); btn.textContent=c.length?'COMPLETE ORDER':'CART IS EMPTY';}
  };
  window.placeOrder=async function(){
    const form=document.getElementById('checkoutForm'); if(!form)return; const c=cartList(); if(!c.length){ if(typeof toast==='function')toast('Your cart is empty.'); renderCheckoutSummary(); return; }
    if(!form.name.value.trim()||!form.phone.value.trim()||!form.email.value.trim()){ if(typeof toast==='function')toast('Please complete your contact details.'); return; }
    const addresses=allCheckoutAddresses(); let address=(addresses.length&&window.nitaCheckoutMode!=='new')?addresses[Number(window.nitaSelectedCheckoutAddress||0)]:window.nitaCheckoutTempAddress;
    if(!validAddress(address||{})){ if(typeof toast==='function')toast('Please add and save a delivery address.'); nitaShowCheckoutAddressForm(); return; }
    const ps=products(); let sub=0; const items=[];
    for(const item of c){ const p=ps.find(x=>String(x.id)===String(item.id)); if(!p) continue; const qty=Number(item.qty||1); const price=Number(p.salePrice||p.price||item.price||0); sub+=price*qty; items.push({id:p.id,name:p.name,size:item.size,qty,price,total:price*qty}); if(p.quantity!==undefined&&p.quantity!==''){p.quantity=Math.max(0,Number(p.quantity||0)-qty); if(p.quantity<=0)p.status='out-of-stock';} }
    const fee=deliveryFee(sub); const order={id:'NS'+Date.now(),date:new Date().toLocaleString(),customer:form.name.value.trim(),email:String(form.email.value||'').toLowerCase(),phone:form.phone.value.trim(),address,payment:'Cash on delivery',deliveryMethod:'Wakilni',deliveryFee:fee,deliveryTime:'2-4 working days across Lebanon',status:'Order submitted',items,subtotal:sub,discount:0,total:sub+fee};
    const orders=read('nitaOrders',[]); orders.push(order); write('nitaOrders',orders); write('nitaProducts',ps); try{if(typeof saveCloudKey==='function'){await saveCloudKey('nitaOrders',orders); await saveCloudKey('nitaProducts',ps);}}catch(e){console.warn(e)} setCart([]); location.href='order-success.html';
  };
  function boot(){ try{renderCartPanel();}catch(e){} if(document.getElementById('checkoutForm')){try{nitaPremiumCheckoutInit();}catch(e){console.error(e)}} }
  document.addEventListener('DOMContentLoaded',boot); window.addEventListener('load',boot); window.addEventListener('pageshow',boot); setTimeout(boot,150); setTimeout(boot,700);
})();
/* === END NITA STYLE FINAL CHECKOUT/CART ADDRESS HOTFIX 2026-06-08 === */

/* === NITA STYLE FINAL SHIPPING DUPLICATE CLEANUP 2026-06-08 === */
(function(){
  function removeDuplicateDeliveryBox(){
    document.querySelectorAll('#deliveryInfoBox, .delivery-info-box').forEach(function(el){
      if(!el.classList.contains('shipping-method-box')) el.remove();
    });
  }
  document.addEventListener('DOMContentLoaded', removeDuplicateDeliveryBox);
  window.addEventListener('load', removeDuplicateDeliveryBox);
  window.addEventListener('pageshow', removeDuplicateDeliveryBox);
  setTimeout(removeDuplicateDeliveryBox, 250);
  setTimeout(removeDuplicateDeliveryBox, 900);

  /* Keep checkout summary minimal: shipping amount appears in summary, details appear only in Shipping method box. */
  const oldRenderCheckoutSummary = window.renderCheckoutSummary;
  window.renderCheckoutSummary = function(){
    if(typeof oldRenderCheckoutSummary === 'function') oldRenderCheckoutSummary();
    removeDuplicateDeliveryBox();
    const notes = document.querySelectorAll('#checkoutSummary .delivery-note, .premium-order-summary .delivery-note');
    notes.forEach(function(n){ n.remove(); });
  };
})();
/* === END NITA STYLE FINAL SHIPPING DUPLICATE CLEANUP 2026-06-08 === */

/* === NITA STYLE EMAIL AUTOMATION FINAL PATCH 2026-06-08 === */
(function(){
  const ADMIN_EMAIL_FALLBACK = 'karim.abousamah1@gmail.com';
  function esc(v){return String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function readJSON(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f));}catch(e){return f;}}
  function writeJSON(k,v){localStorage.setItem(k,JSON.stringify(v));}
  function normEmail(v){return String(v||'').trim().toLowerCase();}
  function validEmail(v){return /^\S+@\S+\.\S+$/.test(normEmail(v));}
  function notify(msg){try{toast(msg);}catch(e){alert(msg);}}
  async function cloudSave(k,v){try{ if(typeof saveCloudKey==='function') await saveCloudKey(k,v); else if(typeof saveSharedKeyNow==='function') await saveSharedKeyNow(k,v); }catch(e){console.warn(e);} }

  window.sendStoreEmail = async function(payload){
    const res = await fetch('/.netlify/functions/send-email', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload || {})
    });
    let body = {};
    try{ body = await res.json(); }catch(e){ body = {error: await res.text()}; }
    if(!res.ok || body.ok === false) throw new Error(body.error || 'Email could not be sent.');
    return body;
  };

  function generateCode(){return String(Math.floor(100000 + Math.random() * 900000));}
  function pendingSignup(){return readJSON('nitaPendingSignup', null);}
  function setPendingSignup(obj){writeJSON('nitaPendingSignup', obj);}
  function clearPendingSignup(){localStorage.removeItem('nitaPendingSignup');}

  window.renderLoginPage = function(){
    const root=document.getElementById('loginRoot'); if(!root) return;
    root.innerHTML=`<section class="auth-shell"><div class="auth-brand"><img src="assets/logo-cropped.png" alt="Nita Style"><p>Customer account</p><h1>Sign in or create your account</h1><p class="muted">Save your addresses, follow your orders, and receive your first-order code in a clean boutique account.</p></div><div class="auth-card"><div class="auth-tabs"><button class="active" id="signinTab" onclick="switchAuthMode('signin')">SIGN IN</button><button id="signupTab" onclick="switchAuthMode('signup')">SIGN UP</button></div><div id="authMessage" class="auth-message"></div><label>Email address</label><input id="authEmail" class="field" type="email" autocomplete="email" placeholder="you@example.com"><label>Password</label><input id="authPassword" class="field" type="password" autocomplete="current-password" placeholder="Password"><div id="signupFields" style="display:none"><div class="form-grid"><div><label>First name</label><input id="authFirst" class="field" placeholder="First name"></div><div><label>Last name</label><input id="authLast" class="field" placeholder="Last name"></div></div><label>Phone number</label><input id="authPhone" class="field" placeholder="Phone number"><div id="verifyBox" class="verification-box" style="display:none"><label>Email verification code</label><input id="authCode" class="field" inputmode="numeric" maxlength="6" placeholder="Enter the 6-digit code"><p class="muted mini-note">We sent this code to your email. After verification, your 10% first-order code will be emailed automatically.</p></div></div><button class="btn auth-submit" id="authSubmitBtn" onclick="submitAuth()">CONTINUE</button><p class="muted mini-note">Your email is your login and cannot be changed from the account page.</p></div></section>`;
    window.authMode='signin';
  };

  window.switchAuthMode=function(mode){
    window.authMode=mode;
    document.getElementById('signinTab')?.classList.toggle('active',mode==='signin');
    document.getElementById('signupTab')?.classList.toggle('active',mode==='signup');
    const f=document.getElementById('signupFields'); if(f) f.style.display=mode==='signup'?'block':'none';
    const vb=document.getElementById('verifyBox'); if(vb) vb.style.display='none';
    const btn=document.getElementById('authSubmitBtn'); if(btn) btn.textContent='CONTINUE';
    const msg=document.getElementById('authMessage'); if(msg) msg.textContent='';
    clearPendingSignup();
  };

  window.submitAuth=async function(){
    const email=normEmail(document.getElementById('authEmail')?.value);
    const password=document.getElementById('authPassword')?.value||'';
    const msg=document.getElementById('authMessage');
    const mode=window.authMode||'signin';
    if(!validEmail(email)){ if(msg)msg.textContent='Please enter a valid email address.'; return; }
    if(password.length<4){ if(msg)msg.textContent='Please enter a password with at least 4 characters.'; return; }
    try{ if(typeof loadSharedStore==='function') await loadSharedStore(); }catch(e){}
    const users=(typeof getJSON==='function'?getJSON('nitaUsersByEmail',{}):readJSON('nitaUsersByEmail',{}));
    const existing=users[email];

    if(mode==='signin'){
      if(!existing){ if(msg)msg.innerHTML='No account found with this email. Click <b>Sign up</b> to create one.'; return; }
      if(existing.password && existing.password!==password){ if(msg)msg.textContent='Wrong password for this account.'; return; }
      localStorage.setItem('nitaUser',JSON.stringify(existing)); localStorage.setItem('nitaSessionEmail',email); window.currentUser=existing;
      location.href='index.html';
      return;
    }

    const firstName=(document.getElementById('authFirst')?.value||'').trim();
    const lastName=(document.getElementById('authLast')?.value||'').trim();
    const phone=(document.getElementById('authPhone')?.value||'').trim();
    const pending=pendingSignup();
    const enteredCode=(document.getElementById('authCode')?.value||'').trim();

    if(!pending || pending.email!==email){
      if(existing){ if(msg)msg.textContent='This email already has an account. Please sign in.'; return; }
      const code=generateCode();
      setPendingSignup({email,password,firstName,lastName,phone,code,createdAt:Date.now()});
      if(msg) msg.textContent='Sending verification code...';
      try{
        await sendStoreEmail({type:'verification',to:email,code});
        document.getElementById('verifyBox').style.display='block';
        document.getElementById('authSubmitBtn').textContent='VERIFY & CREATE ACCOUNT';
        if(msg) msg.textContent='Verification code sent. Check your email.';
      }catch(e){
        clearPendingSignup();
        if(msg) msg.textContent='Email automation is not configured yet. Add RESEND_API_KEY in Netlify and redeploy.';
        console.error(e);
      }
      return;
    }

    if(!enteredCode || enteredCode!==pending.code){ if(msg)msg.textContent='Wrong verification code. Please check your email and try again.'; return; }
    const user={email,password,firstName:firstName||pending.firstName||'',lastName:lastName||pending.lastName||'',phone:phone||pending.phone||'',addresses:[],defaultAddress:null,firstOrderCode:'NITA10',emailVerified:true,createdAt:new Date().toISOString()};
    users[email]=user;
    if(typeof setJSON==='function') setJSON('nitaUsersByEmail',users); else writeJSON('nitaUsersByEmail',users);
    localStorage.setItem('nitaUser',JSON.stringify(user)); localStorage.setItem('nitaSessionEmail',email); window.currentUser=user;
    try{ if(typeof saveUsers==='function') await saveUsers(users); else await cloudSave('nitaUsersByEmail',users); }catch(e){console.warn(e);}
    try{ await sendStoreEmail({type:'signup_discount',to:email,code:'NITA10',user}); }catch(e){console.warn(e);}
    clearPendingSignup();
    location.href='index.html';
  };
  window.login=window.submitAuth;

  const oldPopupSignup = window.popupSignup;
  window.popupSignup = async function(){
    const email=normEmail(document.getElementById('popupEmail')?.value);
    if(!validEmail(email)){notify('Please enter a valid email address.');return;}
    localStorage.setItem('nitaPopupSeen','1'); localStorage.setItem('nitaDiscountCode','NITA10'); localStorage.setItem('nitaDiscountEmail',email);
    document.getElementById('signupPopup')?.classList.remove('show');
    try{ await sendStoreEmail({type:'discount',to:email,code:'NITA10'}); notify('Your 10% first-order code was sent to your email.'); }
    catch(e){ console.warn(e); notify('Your code is NITA10. Email sending needs RESEND_API_KEY in Netlify.'); }
  };

  const oldUpdateOrder = window.updateOrder;
  window.updateOrder = async function(i,v){
    const orders=(typeof getJSON==='function'?getJSON('nitaOrders',[]):readJSON('nitaOrders',[]));
    const order=orders[i]; if(!order) return;
    const oldStatus=order.status||'Order submitted';
    if(v===oldStatus) return;
    if(!confirm(`Confirm order status update?\n\nOrder: ${order.id||''}\nFrom: ${oldStatus}\nTo: ${v}`)){ if(typeof renderAdmin==='function') renderAdmin(); return; }
    order.status=v;
    if(typeof setJSON==='function') setJSON('nitaOrders',orders); else writeJSON('nitaOrders',orders);
    try{ await cloudSave('nitaOrders',orders); }catch(e){}
    if(order.email){ try{ await sendStoreEmail({type:'order_status',to:order.email,order}); }catch(e){ console.warn('Status email failed:',e); } }
    notify('Order status updated.');
    if(typeof renderAdmin==='function') renderAdmin();
  };
})();
/* === END NITA STYLE EMAIL AUTOMATION FINAL PATCH 2026-06-08 === */

/* === NITA STYLE ORDER + EMAIL + SUCCESS FINAL RELIABILITY PATCH 2026-06-08 === */
(function(){
  const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
  const DELIVERY_FEE = 5;
  const DELIVERY_THRESHOLD = 150;
  const ORDER_STEPS = ['Order submitted','Confirmed','Packing','Out for delivery','Delivered'];
  function readJSON(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f));}catch(e){return f;}}
  function writeJSON(k,v){localStorage.setItem(k,JSON.stringify(v));}
  function norm(v){return String(v||'').trim().toLowerCase();}
  function safe(v){return String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function money2(n){try{return typeof money==='function'?money(Number(n||0)):'$'+Number(n||0).toFixed(2)}catch(e){return '$'+Number(n||0).toFixed(2)}}
  function msg(t){try{toast(t)}catch(e){console.log(t)}}
  function getLocalProducts(){try{return typeof getProducts==='function'?getProducts():readJSON('nitaProducts',[])}catch(e){return readJSON('nitaProducts',[])}}
  function getCart(){return readJSON('nitaCart',[])}
  function setCartSafe(c){writeJSON('nitaCart',c||[]); try{window.cart=c||[]}catch(e){} try{updateCartCount&&updateCartCount()}catch(e){}}
  async function cloudSet(key,value){
    writeJSON(key,value);
    try{
      if(typeof saveCloudKey==='function') return await saveCloudKey(key,value);
      if(typeof saveSharedKeyNow==='function') return await saveSharedKeyNow(key,value);
      const res=await fetch('/.netlify/functions/store',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key,value})});
      if(!res.ok) throw new Error(await res.text());
      return true;
    }catch(e){console.warn('Cloud save failed for '+key,e); return false;}
  }
  async function cloudLoad(){try{if(typeof loadSharedStore==='function') await loadSharedStore();}catch(e){console.warn('Cloud load skipped',e)}}
  function userMap(){return readJSON('nitaUsersByEmail',{});} 
  function currentEmail(){return norm(readJSON('nitaUser',{})?.email || localStorage.getItem('nitaSessionEmail') || '');}
  function currentUser(){const email=currentEmail(); if(!email)return null; const users=userMap(); return users[email] || readJSON('nitaUser',null);}
  async function saveUser(user){if(!user||!user.email)return null; user.email=norm(user.email); const users=userMap(); users[user.email]={...(users[user.email]||{}),...user,updatedAt:new Date().toISOString()}; writeJSON('nitaUsersByEmail',users); writeJSON('nitaUser',users[user.email]); localStorage.setItem('nitaSessionEmail',user.email); window.currentUser=users[user.email]; await cloudSet('nitaUsersByEmail',users); return users[user.email];}
  async function emailSend(payload){
    const res=await fetch('/.netlify/functions/send-email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload||{})});
    let body=null;
    try{body=await res.json()}catch(e){body={error:await res.text()}}
    if(!res.ok || body.ok===false) throw new Error(body.error||'Email failed');
    return body;
  }
  window.sendStoreEmail=emailSend;
  function genCode(){return String(Math.floor(100000+Math.random()*900000));}
  function pendingSignup(){return readJSON('nitaPendingSignup',null)}
  function setPending(obj){writeJSON('nitaPendingSignup',obj)}
  function clearPending(){localStorage.removeItem('nitaPendingSignup')}

  // Strong sign-up verification flow: account is created only after the 6-digit email code is verified.
  window.renderLoginPage=function(){
    const root=document.getElementById('loginRoot'); if(!root)return;
    root.innerHTML=`<section class="auth-shell"><div class="auth-brand"><img src="assets/logo-cropped.png" alt="Nita Style"><p>Customer account</p><h1>Sign in or create your account</h1><p class="muted">Save your addresses, follow your orders, and receive your first-order code.</p></div><div class="auth-card"><div class="auth-tabs"><button class="active" id="signinTab" type="button" onclick="switchAuthMode('signin')">SIGN IN</button><button id="signupTab" type="button" onclick="switchAuthMode('signup')">SIGN UP</button></div><div id="authMessage" class="auth-message"></div><label>Email address</label><input id="authEmail" class="field" type="email" autocomplete="email" placeholder="you@example.com"><label>Password</label><input id="authPassword" class="field" type="password" autocomplete="current-password" placeholder="Password"><div id="signupFields" style="display:none"><div class="form-grid"><div><label>First name</label><input id="authFirst" class="field" placeholder="First name"></div><div><label>Last name</label><input id="authLast" class="field" placeholder="Last name"></div></div><label>Phone number</label><input id="authPhone" class="field" placeholder="Phone number"><div id="verifyBox" class="verification-box" style="display:none"><h3>One step left</h3><p class="muted">We sent a six-digit verification code to your email. Enter it below to create your account.</p><input id="authCode" class="field verification-code-input" inputmode="numeric" maxlength="6" placeholder="6-digit code"><button type="button" class="btn light" onclick="resendVerificationCode()">RESEND CODE</button></div></div><button class="btn auth-submit" id="authSubmitBtn" type="button" onclick="submitAuth()">CONTINUE</button><p class="muted mini-note">Your account is created only after email verification.</p></div></section>`;
    window.authMode='signin'; clearPending();
  };
  window.switchAuthMode=function(mode){
    window.authMode=mode; clearPending();
    document.getElementById('signinTab')?.classList.toggle('active',mode==='signin');
    document.getElementById('signupTab')?.classList.toggle('active',mode==='signup');
    const fields=document.getElementById('signupFields'); if(fields) fields.style.display=mode==='signup'?'block':'none';
    const verify=document.getElementById('verifyBox'); if(verify) verify.style.display='none';
    const btn=document.getElementById('authSubmitBtn'); if(btn) btn.textContent='CONTINUE';
    const m=document.getElementById('authMessage'); if(m) m.textContent='';
  };
  window.resendVerificationCode=async function(){
    const p=pendingSignup(); const m=document.getElementById('authMessage');
    if(!p||!p.email){if(m)m.textContent='Please start sign up again.';return;}
    const code=genCode(); p.code=code; p.createdAt=Date.now(); setPending(p);
    try{await emailSend({type:'verification',to:p.email,code}); if(m)m.textContent='A new verification code was sent.';}catch(e){if(m)m.textContent='Email sending failed. Check Netlify environment variables and Resend setup.'; console.error(e);}
  };
  window.submitAuth=async function(){
    const email=norm(document.getElementById('authEmail')?.value); const password=String(document.getElementById('authPassword')?.value||''); const m=document.getElementById('authMessage');
    if(!EMAIL_REGEX.test(email)){if(m)m.textContent='Please enter a valid email address.';return;}
    if(password.length<4){if(m)m.textContent='Please enter a password with at least 4 characters.';return;}
    await cloudLoad(); const users=userMap(); const mode=window.authMode||'signin';
    if(mode==='signin'){
      const u=users[email]; if(!u){if(m)m.innerHTML='No account found. Click <b>Sign up</b> to create one.';return;}
      if(u.password && u.password!==password){if(m)m.textContent='Wrong password.';return;}
      writeJSON('nitaUser',u); localStorage.setItem('nitaSessionEmail',email); window.currentUser=u; location.href='index.html'; return;
    }
    const firstName=String(document.getElementById('authFirst')?.value||'').trim(); const lastName=String(document.getElementById('authLast')?.value||'').trim(); const phone=String(document.getElementById('authPhone')?.value||'').trim(); const p=pendingSignup(); const entered=String(document.getElementById('authCode')?.value||'').trim();
    if(!p || p.email!==email){
      if(users[email]){if(m)m.textContent='This email already has an account. Please sign in.';return;}
      const code=genCode(); setPending({email,password,firstName,lastName,phone,code,createdAt:Date.now()});
      if(m)m.textContent='Sending verification code...';
      try{await emailSend({type:'verification',to:email,code}); document.getElementById('verifyBox').style.display='block'; document.getElementById('authSubmitBtn').textContent='VERIFY & CREATE ACCOUNT'; if(m)m.textContent='Verification email sent. Check your inbox.';}catch(e){clearPending(); if(m)m.textContent='Email could not be sent. Check RESEND_API_KEY / FROM_EMAIL in Netlify and verify Resend domain settings.'; console.error(e);} return;
    }
    if(!entered || entered!==p.code){if(m)m.textContent='Wrong verification code. Please try again.';return;}
    const user={email,password,firstName:firstName||p.firstName||'',lastName:lastName||p.lastName||'',phone:phone||p.phone||'',addresses:[],defaultAddress:null,emailVerified:true,firstOrderCode:'NITA10',createdAt:new Date().toISOString()};
    users[email]=user; await cloudSet('nitaUsersByEmail',users); writeJSON('nitaUser',user); localStorage.setItem('nitaSessionEmail',email); window.currentUser=user;
    try{await emailSend({type:'signup_discount',to:email,code:'NITA10',user});}catch(e){console.warn('Discount email failed',e)}
    clearPending(); location.href='index.html';
  };
  window.login=window.submitAuth;

  // Robust order save + customer/admin emails + inventory update.
  window.placeOrder=async function(){
    const form=document.getElementById('checkoutForm'); if(!form)return;
    const cart=getCart(); if(!cart.length){msg('Your cart is empty.'); return;}
    const customer=String(form.name?.value||form.querySelector('[name="name"]')?.value||'').trim();
    const email=norm(form.email?.value||form.querySelector('[name="email"]')?.value||currentEmail());
    const phone=String(form.phone?.value||form.querySelector('[name="phone"]')?.value||'').trim();
    if(!customer||!EMAIL_REGEX.test(email)||!phone){msg('Please complete your contact details.'); return;}
    // Address is controlled by the premium address patch when available.
    let address=null;
    try{
      const addresses = (typeof allCheckoutAddresses==='function') ? allCheckoutAddresses() : [];
      if(addresses && addresses.length && window.nitaCheckoutMode!=='new') address=addresses[Number(window.nitaSelectedCheckoutAddress||0)];
      if(!address && window.nitaCheckoutTempAddress) address=window.nitaCheckoutTempAddress;
    }catch(e){}
    if(!address){
      const saved=readJSON('nitaGuestAddresses',[])[0] || currentUser()?.addresses?.[0] || currentUser()?.defaultAddress || null;
      address=saved;
    }
    const requiredAddressOk=address && (address.label||address.city||address.street||address.address);
    if(!requiredAddressOk){msg('Please add and save a delivery address.'); if(typeof nitaShowCheckoutAddressForm==='function') nitaShowCheckoutAddressForm(); return;}
    await cloudLoad(); const products=getLocalProducts(); let subtotal=0; const items=[];
    cart.forEach(item=>{const p=products.find(x=>String(x.id)===String(item.id)); if(!p)return; const qty=Math.max(1,Number(item.qty||1)); const price=Number(p.salePrice||p.price||item.price||0); subtotal+=price*qty; items.push({id:p.id,name:p.name,size:item.size||'One Size',qty,price,total:price*qty}); if(p.quantity!==undefined && p.quantity!==''){p.quantity=Math.max(0,Number(p.quantity||0)-qty); if(p.quantity<=0)p.status='out-of-stock';}});
    const fee=subtotal>0 && subtotal<DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;
    const order={id:'NS'+Date.now(),date:new Date().toLocaleString(),customer,email,phone,address,payment:'Cash on Delivery',deliveryMethod:'Wakilni',deliveryFee:fee,deliveryTime:'2-4 working days across Lebanon',status:'Order submitted',items,subtotal,discount:0,total:subtotal+fee};
    const orders=readJSON('nitaOrders',[]); orders.push(order);
    await cloudSet('nitaOrders',orders); await cloudSet('nitaProducts',products); writeJSON('nitaLastOrder',order);
    const users=userMap(); if(users[email]){users[email].orders=users[email].orders||[]; users[email].orders.push(order.id); await cloudSet('nitaUsersByEmail',users);}
    const emailFailures=[];
    try{await emailSend({type:'order_confirmation',to:email,order});}catch(e){emailFailures.push('customer confirmation'); console.warn(e)}
    try{await emailSend({type:'admin_order',order});}catch(e){emailFailures.push('admin notification'); console.warn(e)}
    if(emailFailures.length) localStorage.setItem('nitaLastEmailError','Failed: '+emailFailures.join(', ')+'. Check Resend logs and Netlify env variables.'); else localStorage.removeItem('nitaLastEmailError');
    setCartSafe([]); location.href='order-success.html';
  };

  // Admin order table + status emails.
  window.updateOrder=async function(i,status){
    await cloudLoad(); const orders=readJSON('nitaOrders',[]); const order=orders[i]; if(!order)return;
    const old=order.status||'Order submitted'; if(status===old)return;
    if(!confirm(`Confirm order status update?\n\nOrder: ${order.id}\nFrom: ${old}\nTo: ${status}`)){try{renderAdmin()}catch(e){} return;}
    order.status=status; await cloudSet('nitaOrders',orders);
    if(order.email){try{await emailSend({type:'order_status',to:order.email,order});}catch(e){console.warn('Order status email failed',e); msg('Status updated, but email failed. Check Resend/Netlify.');}}
    msg('Order status updated.'); try{renderAdmin()}catch(e){}
  };
  const previousRenderAdmin=window.renderAdmin;
  window.renderAdmin=async function(){
    await cloudLoad();
    if(typeof previousRenderAdmin==='function') await previousRenderAdmin.apply(this,arguments);
    const tbody=document.getElementById('orders'); if(tbody){const orders=readJSON('nitaOrders',[]); tbody.innerHTML=orders.length?orders.map((o,i)=>`<tr><td><b>${safe(o.id)}</b><br><span class="muted">${safe(o.date||'')}</span></td><td>${safe(o.customer||'-')}<br><span class="muted">${safe(o.email||'')} · ${safe(o.phone||'')}</span></td><td>${money2(o.total||0)}</td><td><select onchange="updateOrder(${i},this.value)"><option>${safe(o.status||'Order submitted')}</option>${ORDER_STEPS.concat(['Cancelled']).filter(s=>s!==o.status).map(s=>`<option>${safe(s)}</option>`).join('')}</select></td></tr>`).join(''):'<tr><td colspan="4">No orders yet.</td></tr>';}
  };
  const previousRenderAccount=window.renderAccount;
  window.renderAccount=async function(){await cloudLoad(); if(typeof previousRenderAccount==='function') return previousRenderAccount.apply(this,arguments);};

  window.renderOrderSuccess=function(){
    const root=document.getElementById('orderSuccessRoot'); if(!root)return;
    const order=readJSON('nitaLastOrder',null); const emailError=localStorage.getItem('nitaLastEmailError');
    root.innerHTML=`<section class="order-success-wrap"><div class="success-mark"><span>✓</span></div><p class="eyebrow">Order received</p><h1>Thank you for your purchase</h1><p class="muted">Your Nita Style order has been submitted successfully. We will prepare your order and contact you if any detail needs confirmation.</p>${order?`<div class="success-summary"><div><span>Order number</span><b>${safe(order.id)}</b></div><div><span>Total</span><b>${money2(order.total)}</b></div><div><span>Delivery</span><b>Wakilni · 2-4 working days</b></div><div><span>Payment</span><b>Cash on Delivery</b></div></div>`:''}${emailError?`<p class="email-warning">${safe(emailError)}</p>`:''}<div class="success-actions"><a class="btn" href="shop.html">CONTINUE SHOPPING</a><a class="btn light" href="account.html">VIEW MY ORDER</a></div></section>`;
  };
  document.addEventListener('DOMContentLoaded',function(){if(document.getElementById('orderSuccessRoot')) renderOrderSuccess();});
})();
/* === END NITA STYLE ORDER + EMAIL + SUCCESS FINAL RELIABILITY PATCH 2026-06-08 === */

/* === NITA STYLE FINAL COUPON TOTAL CALCULATION FIX 2026-06-08 === */
(function(){
  const DELIVERY_FEE = 5;
  const DELIVERY_THRESHOLD = 150;
  const EMAIL_RE = /^\S+@\S+\.\S+$/;
  function read(k,f){ try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f));}catch(e){return f;} }
  function write(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
  function normCode(v){ return String(v||'').trim().toUpperCase(); }
  function normEmail(v){ return String(v||'').trim().toLowerCase(); }
  function moneyX(n){ try{return typeof money==='function'?money(Number(n||0)):'$'+Number(n||0).toFixed(2);}catch(e){return '$'+Number(n||0).toFixed(2);} }
  function getCartNow(){ return Array.isArray(window.cart) && window.cart.length ? window.cart : read('nitaCart',[]); }
  function getProductsNow(){ try{return typeof getProducts==='function'?getProducts():read('nitaProducts',[]);}catch(e){return read('nitaProducts',[]);} }
  function cartSubtotal(){ const products=getProductsNow(); return getCartNow().reduce((sum,item)=>{ const p=products.find(x=>String(x.id)===String(item.id)); const price=Number(p?.salePrice || p?.price || item.price || 0); return sum + price * Math.max(1,Number(item.qty||1)); },0); }
  function shippingFee(subtotal){ return subtotal>0 && subtotal<DELIVERY_THRESHOLD ? DELIVERY_FEE : 0; }
  function signedEmail(){ try{return normEmail(document.querySelector('#checkoutForm [name="email"]')?.value || localStorage.getItem('nitaSessionEmail') || (JSON.parse(localStorage.getItem('nitaUser')||'{}').email) || localStorage.getItem('nitaDiscountEmail') || '');}catch(e){return '';} }
  function getAppliedCode(){ return normCode(sessionStorage.getItem('nitaAppliedCoupon')||''); }
  function setAppliedCode(code){ code=normCode(code); if(code) sessionStorage.setItem('nitaAppliedCoupon',code); else sessionStorage.removeItem('nitaAppliedCoupon'); }
  function feedback(msg,ok){ const el=document.getElementById('couponFeedback'); if(el){ el.className=ok?'coupon-feedback discount-good':'coupon-feedback discount-bad'; el.innerHTML=msg||''; } }
  function discountUses(){return read('nitaDiscountUses',{});}
  function couponLive(c){ if(!c || c.active===false) return false; const today=new Date(); if(c.start && new Date(c.start)>today) return false; if(c.end){ const end=new Date(c.end); end.setHours(23,59,59,999); if(end<today) return false; } return true; }
  function adminCouponDiscount(c,subtotal){
    if(!c) return 0;
    if(c.type==='fixed' || c.amount || c.fixedAmount){ return Math.min(subtotal, Math.max(0, Number(c.amount || c.fixedAmount || 0))); }
    return Math.min(subtotal, Math.max(0, subtotal * (Number(c.percent||0)/100)));
  }
  function calculateDiscount(code,email,subtotal){
    code=normCode(code); email=normEmail(email); if(!code || subtotal<=0) return {discount:0,kind:'none',message:''};
    if(typeof window.calcCouponDiscount==='function'){
      try{
        const r=window.calcCouponDiscount(code,email,subtotal) || {};
        if(Number(r.discount)>0) return {discount:Math.min(subtotal,Number(r.discount)),kind:r.kind||'custom',coupon:r.coupon||null,message:r.message||''};
      }catch(e){}
    }
    if(code==='NITA10'){
      const used=email && discountUses()[email];
      return (!used && email) ? {discount:Math.min(subtotal,subtotal*0.10),kind:'nita10'} : {discount:0,kind:'nita10-invalid'};
    }
    const coupons=read('nitaCoupons',[]); const c=coupons.find(x=>normCode(x.code)===code);
    if(!c || !couponLive(c)) return {discount:0,kind:'invalid'};
    if(c.oneTime && email && c.usedEmails && c.usedEmails[email]) return {discount:0,kind:'used'};
    const d=adminCouponDiscount(c,subtotal);
    return d>0 ? {discount:d,kind:'admin',coupon:c} : {discount:0,kind:'invalid'};
  }
  function markCouponUsed(result,code,email){
    code=normCode(code); email=normEmail(email); if(!code || !email || !result || !(Number(result.discount)>0)) return;
    if(result.kind==='nita10'){
      const uses=discountUses(); uses[email]=true; write('nitaDiscountUses',uses); try{window.saveCloudKey?.('nitaDiscountUses',uses);}catch(e){}
    }
    if(result.kind==='admin'){
      const coupons=read('nitaCoupons',[]); const c=coupons.find(x=>normCode(x.code)===code);
      if(c && c.oneTime){ c.usedEmails=c.usedEmails||{}; c.usedEmails[email]=true; write('nitaCoupons',coupons); try{window.saveCoupons?.(coupons);}catch(e){} }
    }
  }
  window.applyCouponCode=function(){
    const form=document.getElementById('checkoutForm'); if(!form) return;
    const code=normCode(form.coupon?.value||''); const subtotal=cartSubtotal(); const email=signedEmail();
    if(!code){ setAppliedCode(''); feedback('Enter a coupon code first.',false); window.renderCheckoutSummary?.(); return; }
    if(!subtotal){ setAppliedCode(''); feedback('No discount is applicable because your cart is empty.',false); window.renderCheckoutSummary?.(); return; }
    const result=calculateDiscount(code,email,subtotal);
    if(Number(result.discount)>0){ setAppliedCode(code); feedback(`Coupon applied successfully. You saved ${moneyX(result.discount)}.`,true); }
    else { setAppliedCode(''); feedback('Coupon code is expired, invalid, already used, or no discount is applicable.',false); }
    window.renderCheckoutSummary?.();
  };
  window.renderCheckoutSummary=function(){
    const box=document.getElementById('checkoutSummary'); if(!box) return;
    const form=document.getElementById('checkoutForm'); const products=getProductsNow(); const cart=getCartNow();
    const rows=cart.length?cart.map(item=>{ const p=products.find(x=>String(x.id)===String(item.id)); const name=p?.name || item.name || 'Product'; const qty=Math.max(1,Number(item.qty||1)); const price=Number(p?.salePrice || p?.price || item.price || 0); return `<div class="summary-product"><span>${name}<small>${item.size||'One Size'} × ${qty}</small></span><b>${moneyX(price*qty)}</b></div>`; }).join(''):'<p class="muted">Your cart is empty.</p>';
    const subtotal=cartSubtotal(); const typed=normCode(form?.coupon?.value||''); const applied=getAppliedCode(); const email=signedEmail();
    let result={discount:0}; let note='';
    if(applied && typed && applied===typed){ result=calculateDiscount(applied,email,subtotal); if(Number(result.discount)<=0){ setAppliedCode(''); note='<p class="discount-bad">Coupon code is expired, invalid, already used, or no discount is applicable.</p>'; } }
    else if(typed){ note='<p class="muted">Click Apply to validate this coupon before placing your order.</p>'; }
    const discount=Math.min(subtotal,Number(result.discount||0)); const fee=shippingFee(subtotal); const total=Math.max(0,subtotal-discount)+fee;
    box.innerHTML=`${rows}<hr><div class="summary-line"><span>Subtotal</span><b>${moneyX(subtotal)}</b></div>${discount>0?`<div class="summary-line discount-line"><span>Discount</span><b>-${moneyX(discount)}</b></div>`:''}<div class="summary-line"><span>Wakilni delivery</span><b>${fee?moneyX(fee):'Free'}</b></div><div class="summary-line summary-total"><span>Total</span><b>${moneyX(total)}</b></div>${note}`;
  };
  window.placeOrder=async function(){
    const form=document.getElementById('checkoutForm'); if(!form) return;
    const cart=getCartNow(); if(!cart.length){ try{toast('Your cart is empty.')}catch(e){} return; }
    const customer=String(form.name?.value||'').trim(); const email=signedEmail(); const phone=String(form.phone?.value||'').trim();
    if(!customer || !EMAIL_RE.test(email) || !phone){ try{toast('Please complete your contact details.')}catch(e){} return; }
    const typed=normCode(form.coupon?.value||''); const applied=getAppliedCode();
    if(typed && typed!==applied){ feedback('Please click Apply before placing the order, or remove the coupon code.',false); return; }
    let address=null;
    try{ const addresses=(typeof window.allCheckoutAddresses==='function')?window.allCheckoutAddresses():[]; if(addresses?.length && window.nitaCheckoutMode!=='new') address=addresses[Number(window.nitaSelectedCheckoutAddress||0)]; if(!address && window.nitaCheckoutTempAddress) address=window.nitaCheckoutTempAddress; }catch(e){}
    if(!address){ const u=(()=>{try{return JSON.parse(localStorage.getItem('nitaUser')||'{}')}catch(e){return {}}})(); address=(u.addresses&&u.addresses[0])||u.defaultAddress||read('nitaGuestAddresses',[])[0]||null; }
    if(!address){ try{toast('Please add and save a delivery address.')}catch(e){} if(typeof window.nitaShowCheckoutAddressForm==='function') window.nitaShowCheckoutAddressForm(); return; }
    try{ if(typeof window.loadSharedStore==='function') await window.loadSharedStore(); }catch(e){}
    const products=getProductsNow(); let subtotal=0; const items=[];
    cart.forEach(item=>{ const p=products.find(x=>String(x.id)===String(item.id)); if(!p) return; const qty=Math.max(1,Number(item.qty||1)); const price=Number(p.salePrice||p.price||item.price||0); subtotal+=price*qty; items.push({id:p.id,name:p.name,size:item.size||'One Size',qty,price,total:price*qty}); if(p.quantity!==undefined && p.quantity!==''){ p.quantity=Math.max(0,Number(p.quantity||0)-qty); if(p.quantity<=0) p.status='out-of-stock'; }});
    const result=applied?calculateDiscount(applied,email,subtotal):{discount:0}; const discount=Math.min(subtotal,Number(result.discount||0)); const fee=shippingFee(subtotal); const total=Math.max(0,subtotal-discount)+fee;
    markCouponUsed(result,applied,email);
    const order={id:'NS'+Date.now(),date:new Date().toLocaleString(),customer,email,phone,address,payment:'Cash on Delivery',deliveryMethod:'Wakilni',deliveryFee:fee,deliveryTime:'2-4 working days across Lebanon',status:'Order submitted',items,subtotal,discount,coupon:applied,total};
    const orders=read('nitaOrders',[]); orders.push(order); write('nitaOrders',orders); write('nitaProducts',products); write('nitaLastOrder',order);
    try{ if(typeof window.saveCloudKey==='function'){ await window.saveCloudKey('nitaOrders',orders); await window.saveCloudKey('nitaProducts',products); } else if(typeof window.saveSharedKeyNow==='function'){ await window.saveSharedKeyNow('nitaOrders',orders); await window.saveSharedKeyNow('nitaProducts',products); } }catch(e){console.warn(e);}
    const users=read('nitaUsersByEmail',{}); if(users[email]){ users[email].orders=users[email].orders||[]; users[email].orders.push(order.id); write('nitaUsersByEmail',users); try{ await window.saveCloudKey?.('nitaUsersByEmail',users); }catch(e){} }
    const fails=[]; try{ await window.sendStoreEmail?.({type:'order_confirmation',to:email,order}); }catch(e){fails.push('customer confirmation');}
    try{ await window.sendStoreEmail?.({type:'admin_order',order}); }catch(e){fails.push('admin notification');}
    if(fails.length) localStorage.setItem('nitaLastEmailError','Failed: '+fails.join(', ')+'. Check Resend logs and Netlify environment variables.'); else localStorage.removeItem('nitaLastEmailError');
    write('nitaCart',[]); try{window.cart=[]; window.saveCart?.(); window.updateCartCount?.();}catch(e){}
    setAppliedCode(''); location.href='order-success.html';
  };
  document.addEventListener('input',function(e){ if(e.target?.name==='coupon'){ setAppliedCode(''); feedback('',true); window.renderCheckoutSummary?.(); } });
  document.addEventListener('DOMContentLoaded',function(){ if(document.getElementById('checkoutSummary')) window.renderCheckoutSummary(); });
})();
/* === END NITA STYLE FINAL COUPON TOTAL CALCULATION FIX 2026-06-08 === */

/* === NITA STYLE PREMIUM EMAIL / ADMIN PAGES / FAVORITES FINAL PATCH 2026-06-08 === */
(function(){
  const esc=(v)=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const emailNorm=(e)=>String(e||'').trim().toLowerCase();
  const cloud=async(k,v)=>{write(k,v);try{if(typeof saveCloudKey==='function')await saveCloudKey(k,v);else if(typeof saveSharedKeyNow==='function')await saveSharedKeyNow(k,v)}catch(e){console.warn('Cloud save skipped',k,e)}};
  const products=()=>{try{return typeof getProducts==='function'?getProducts():read('nitaProducts',[])}catch(e){return read('nitaProducts',[])}};
  const orders=()=>read('nitaOrders',[]);
  const users=()=>read('nitaUsersByEmail',{});
  const moneyX=(n)=>{try{return typeof money==='function'?money(n):'$'+Number(n||0).toFixed(2)}catch(e){return '$'+Number(n||0).toFixed(2)}};
  const mainImg=(p)=>{try{return productMainImage(p)}catch(e){return p?.photos?.[p?.mainPhotoIndex||0]||p?.photos?.[0]||p?.img||'linear-gradient(135deg,#fff,#ddd)'}};
  const bg=(u)=>{try{return typeof cssBgImage==='function'?cssBgImage(u):(String(u||'').startsWith('data:')?`background-image:url(${u})`:`background:${u||'linear-gradient(135deg,#fff,#ddd)'}`)}catch(e){return 'background:linear-gradient(135deg,#fff,#ddd)'}};
  function currentEmail(){return emailNorm(read('nitaUser',{}).email||localStorage.getItem('nitaSessionEmail'))}
  function likesKey(){return 'nitaLikes_'+currentEmail()}
  function likedIds(){return read(likesKey(),[]).map(String)}
  async function saveLikes(ids){write(likesKey(),ids); const email=currentEmail(); if(email){const us=users(); if(us[email]){us[email].likedProducts=ids; write('nitaUsersByEmail',us); await cloud('nitaUsersByEmail',us)}}}
  window.toggleLike=async function(id,ev){ if(ev){ev.preventDefault();ev.stopPropagation()} const email=currentEmail(); if(!email){try{toast('Sign in to save liked items.')}catch(e){} location.href='login.html'; return false;} let ids=likedIds(); id=String(id); ids=ids.includes(id)?ids.filter(x=>x!==id):ids.concat(id); await saveLikes(ids); document.querySelectorAll(`[data-like-id="${CSS.escape(id)}"]`).forEach(b=>{b.classList.toggle('active',ids.includes(id));b.innerHTML=ids.includes(id)?'♥':'♡'}); try{renderAccountLikedItems&&renderAccountLikedItems()}catch(e){} return false; };
  function heart(id){const active=likedIds().includes(String(id));return `<button class="favorite-btn ${active?'active':''}" data-like-id="${esc(id)}" type="button" onclick="toggleLike('${String(id).replace(/'/g,"\\'")}',event)" aria-label="Like product">${active?'♥':'♡'}</button>`}

  const oldProductCard=window.productCard;
  window.productCard=function(p){let html=oldProductCard?oldProductCard(p):''; if(!html)return html; if(html.includes('favorite-btn'))return html; return html.replace('<div class="product-img">',`<div class="product-img">${heart(p.id)}`)};
  const oldRenderProducts=window.renderProducts;
  window.renderProducts=function(el='#products',list=products()){ if(oldRenderProducts) oldRenderProducts(el,list); const node=document.querySelector(el); if(node&&!node.querySelector('.favorite-btn')) node.innerHTML=(list||[]).map(window.productCard).join('')||'<p class="muted">No products listed yet.</p>'; };
  const oldProductPage=window.productPage;
  window.productPage=function(){ if(oldProductPage) oldProductPage(); const id=new URL(location.href).searchParams.get('id'); const detail=document.getElementById('detail'); if(detail&&id&&!detail.querySelector('.product-detail-fav')){ const target=detail.querySelector('h1'); if(target) target.insertAdjacentHTML('afterend',`<button class="btn light product-detail-fav" onclick="toggleLike('${String(id).replace(/'/g,"\\'")}',event)">${likedIds().includes(String(id))?'♥ Liked':'♡ Like this product'}</button>`); } };

  window.renderAccountLikedItems=function(){ const root=document.getElementById('likedItemsRoot'); if(!root)return; const ids=likedIds(); const ps=products().filter(p=>ids.includes(String(p.id))); root.innerHTML=ps.length?`<div class="liked-grid">${ps.map(p=>`<article class="liked-card"><a href="product.html?id=${encodeURIComponent(p.id)}"><div class="liked-img" style="${bg(mainImg(p))}"></div><h3>${esc(p.name)}</h3><p>${moneyX(p.salePrice||p.price)}</p></a><button class="btn outline-danger" onclick="toggleLike('${String(p.id).replace(/'/g,"\\'")}',event)">REMOVE</button></article>`).join('')}</div>`:'<p class="muted">No liked items yet.</p>'; };
  // Liked items are shown in their own top-navigation page, not inside the account page.
  const oldAccount=window.renderAccount;
  window.renderAccount=async function(){ if(oldAccount) await oldAccount(); };

  function unreadOrders(){return orders().filter(o=>!o.adminSeen).length}
  function markOrdersSeen(){const os=orders(); let changed=false; os.forEach(o=>{if(!o.adminSeen){o.adminSeen=true;changed=true}}); if(changed)cloud('nitaOrders',os)}
  window.showAdminSection=function(name){ document.querySelectorAll('.admin-section-page').forEach(s=>s.classList.toggle('active',s.dataset.section===name)); document.querySelectorAll('.admin-nav-button').forEach(b=>b.classList.toggle('active',b.dataset.section===name)); if(name==='orders')markOrdersSeen(); };
  function statusSelect(o,i){const all=['Order submitted','Confirmed','Packing','Out for delivery','Delivered','Cancelled']; return `<select class="field admin-order-status" onchange="updateOrder(${i},this.value)">${all.map(s=>`<option ${String(o.status||'Order submitted')===s?'selected':''}>${s}</option>`).join('')}</select>`}
  window.deleteOrderAdmin=async function(i){ if(!confirm('Delete this order from the admin dashboard?'))return; const os=orders(); os.splice(i,1); await cloud('nitaOrders',os); renderAdmin(); };
  window.editCustomerAdmin=function(email){ const panel=document.getElementById('cust-edit-'+email.replace(/[^a-z0-9]/gi,'_')); if(panel)panel.classList.toggle('open'); };
  window.saveCustomerAdmin=async function(email){ const id=email.replace(/[^a-z0-9]/gi,'_'); const us=users(); const u=us[email]; if(!u)return; u.firstName=document.getElementById('custFirst_'+id)?.value||''; u.lastName=document.getElementById('custLast_'+id)?.value||''; u.phone=document.getElementById('custPhone_'+id)?.value||''; const addr=u.addresses?.[0]||u.defaultAddress||{}; addr.label=document.getElementById('custLabel_'+id)?.value||addr.label||'Home'; addr.city=document.getElementById('custCity_'+id)?.value||''; addr.street=document.getElementById('custStreet_'+id)?.value||''; addr.building=document.getElementById('custBuilding_'+id)?.value||''; addr.floor=document.getElementById('custFloor_'+id)?.value||''; addr.apartment=document.getElementById('custApartment_'+id)?.value||''; u.addresses=[addr]; u.defaultAddress=addr; us[email]=u; await cloud('nitaUsersByEmail',us); const cur=read('nitaUser',{}); if(emailNorm(cur.email)===email){write('nitaUser',u); localStorage.setItem('nitaSessionEmail',email)} renderAdmin(); try{toast('Customer updated globally.')}catch(e){} };
  window.deleteCustomerAdmin=async function(email){ if(!confirm('Delete this customer account?'))return; const us=users(); delete us[email]; await cloud('nitaUsersByEmail',us); renderAdmin(); };
  function customerCard(email,u){const id=email.replace(/[^a-z0-9]/gi,'_'); const addr=(u.addresses&&u.addresses[0])||u.defaultAddress||{}; const count=orders().filter(o=>emailNorm(o.email)===email).length; return `<article class="admin-list-card"><div><h3>${esc((u.firstName||'')+' '+(u.lastName||''))||'Customer'}</h3><p class="muted">${esc(email)} · ${esc(u.phone||'No phone')} · ${count} order${count===1?'':'s'}</p><div id="cust-edit-${id}" class="admin-edit-panel"><div class="admin-mini-grid"><input class="field" id="custFirst_${id}" value="${esc(u.firstName||'')}" placeholder="First name"><input class="field" id="custLast_${id}" value="${esc(u.lastName||'')}" placeholder="Last name"><input class="field" id="custPhone_${id}" value="${esc(u.phone||'')}" placeholder="Phone"><input class="field" id="custLabel_${id}" value="${esc(addr.label||'Home')}" placeholder="Address name"><input class="field" id="custCity_${id}" value="${esc(addr.city||'')}" placeholder="City"><input class="field" id="custStreet_${id}" value="${esc(addr.street||'')}" placeholder="Street"><input class="field" id="custBuilding_${id}" value="${esc(addr.building||'')}" placeholder="Building"><input class="field" id="custFloor_${id}" value="${esc(addr.floor||'')}" placeholder="Floor"><input class="field" id="custApartment_${id}" value="${esc(addr.apartment||'')}" placeholder="Apartment"></div><button class="btn" onclick="saveCustomerAdmin('${email}')">SAVE CUSTOMER</button></div></div><div class="admin-actions"><button class="btn light" onclick="editCustomerAdmin('${email}')">EDIT</button><button class="btn danger" onclick="deleteCustomerAdmin('${email}')">DELETE</button></div></article>`}
  function adminProductsPage(){ const ps=products(); return ps.length?ps.map(p=>{ const img=mainImg(p); return `<article class="admin-list-card" id="edit-${esc(p.id)}"><div style="display:flex;gap:14px;align-items:center"><div class="admin-product-photo" style="${bg(img)};background-size:cover;background-position:center"></div><div><h3>${esc(p.name)}</h3><p class="muted">${esc(p.category||'')} · ${moneyX(p.price||0)} · ${esc(p.collection||'')}</p></div></div><div class="admin-actions"><button class="btn light" onclick="toggleProductEditor('${String(p.id).replace(/'/g,"\\'")}')">EDIT LISTING</button><button class="btn danger" onclick="removeProduct('${String(p.id).replace(/'/g,"\\'")}')">REMOVE</button></div><div class="product-editor" id="editor-${esc(p.id)}">${typeof productEditorHTML==='function'?productEditorHTML(p):''}</div></article>`}).join(''):'<p class="muted">No products listed yet.</p>'}
  window.renderAdmin=async function(){ if(typeof protectAdmin==='function'&&!protectAdmin())return; try{if(typeof loadSharedStore==='function')await loadSharedStore()}catch(e){} const page=document.querySelector('.admin-page'); if(!page)return; const os=orders(); const us=users(); const ps=products(); page.innerHTML=`<div class="admin-toolbar admin-hero"><div><p class="eyebrow">Nita Style Backend</p><h1>Admin Dashboard</h1><p class="muted">Choose a section to manage orders, customers, products, and coupons without overcrowding one page.</p></div><a class="btn" href="shop.html">VIEW STORE</a></div><div class="admin-overview-grid"><button class="admin-stat-card" onclick="showAdminSection('orders')"><div><p>Orders</p><h3>${os.length}</h3></div>${unreadOrders()?`<span class="admin-badge">${unreadOrders()}</span>`:''}</button><button class="admin-stat-card" onclick="showAdminSection('customers')"><div><p>Customers</p><h3>${Object.keys(us).length}</h3></div></button><button class="admin-stat-card" onclick="showAdminSection('products')"><div><p>Products</p><h3>${ps.length}</h3></div></button></div>${unreadOrders()?`<div class="admin-notice unread">${unreadOrders()} new order notification${unreadOrders()===1?'':'s'} waiting for review.</div>`:''}<div class="admin-grid"><aside class="admin-side"><h3>Management</h3><button class="admin-nav-button active" data-section="orders" onclick="showAdminSection('orders')">Orders ${unreadOrders()?`<span class="admin-badge">${unreadOrders()}</span>`:''}</button><button class="admin-nav-button" data-section="customers" onclick="showAdminSection('customers')">Signed-up customers</button><button class="admin-nav-button" data-section="products" onclick="showAdminSection('products')">Edit listed products</button><button class="admin-nav-button" data-section="add" onclick="showAdminSection('add')">Add product</button><button class="admin-nav-button" data-section="coupons" onclick="showAdminSection('coupons')">Coupon codes</button></aside><section class="admin-layout"><div class="card admin-section-page active" data-section="orders"><div class="admin-toolbar"><h2>Orders</h2><span class="pill">${os.length} total</span></div>${os.length?os.map((o,i)=>`<article class="admin-list-card"><div><h3>${esc(o.id)}</h3><p class="muted">${esc(o.customer||'-')} · ${esc(o.email||'')} · ${esc(o.phone||'')}</p><p><b>${moneyX(o.total||0)}</b> · ${esc(o.status||'Order submitted')}</p></div><div class="admin-actions">${statusSelect(o,i)}<button class="btn danger" onclick="deleteOrderAdmin(${i})">DELETE</button></div></article>`).join(''):'<p class="muted">No orders yet.</p>'}</div><div class="card admin-section-page" data-section="customers"><div class="admin-toolbar"><h2>Signed-up customers</h2><span class="pill">${Object.keys(us).length}</span></div>${Object.keys(us).length?Object.entries(us).map(([email,u])=>customerCard(email,u)).join(''):'<p class="muted">No signed-up customers yet.</p>'}</div><div class="card admin-section-page" data-section="products"><div class="admin-toolbar"><h2>Edit listed products</h2><span class="pill">Live products</span></div><div id="adminProducts">${adminProductsPage()}</div></div><div class="card admin-section-page" data-section="add" id="addProductBox"><div class="admin-toolbar"><h2>Add product</h2><span class="pill on">New listing</span></div>${document.querySelector('#addProductBox .admin-form')?.outerHTML||''}<button class="btn" onclick="addProductAdmin()">ADD PRODUCT TO WEBSITE</button></div><div class="card admin-section-page" data-section="coupons" id="couponsBox"><div class="admin-toolbar"><h2>Coupon codes</h2><span class="pill">Promotions</span></div><div class="coupon-builder"><input id="couponCode" class="field" placeholder="Code"><input id="couponPercent" class="field" type="number" placeholder="Discount %"><input id="couponStart" class="field" type="date"><input id="couponEnd" class="field" type="date"><label><input id="couponOneTime" type="checkbox" checked> One-time use</label><button class="btn" onclick="addCouponAdmin()">CREATE COUPON</button></div><div id="adminCoupons" class="coupon-list"></div></div></section></div>`; try{const sizePicker=document.getElementById('sizePicker');if(sizePicker&&!sizePicker.dataset.ready&&typeof renderSizeButtons==='function'){sizePicker.innerHTML=renderSizeButtons(['S','M','L']);sizePicker.dataset.ready='1'} renderCouponsAdmin&&renderCouponsAdmin();}catch(e){} };

  // Upgrade order placement emails/admin notification even if older placeOrder path runs.
  const oldPlace=window.placeOrder;
  window.placeOrder=async function(){ const before=orders().length; await oldPlace?.apply(this,arguments); const after=orders(); const order=after[after.length-1]; if(order&&after.length>before){order.adminSeen=false; await cloud('nitaOrders',after); try{await window.sendStoreEmail?.({type:'order_confirmation',to:order.email,order})}catch(e){console.warn(e)} try{await window.sendStoreEmail?.({type:'admin_order',order})}catch(e){console.warn(e)} } };
})();
/* === END NITA STYLE PREMIUM EMAIL / ADMIN PAGES / FAVORITES FINAL PATCH === */


/* --- Liked items top navigation page --- */
(function(){
  function escLocal(v){return String(v??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));}
  function moneyLocal(v){try{return moneyX(v)}catch(e){return '$'+Number(v||0).toFixed(2)}}
  function productImageLocal(p){try{return mainImg(p)}catch(e){return (p&&p.image)||'linear-gradient(135deg,#f7f7f7,#e8e8e8)'}}
  function bgLocal(img){try{return bg(img)}catch(e){return String(img||'').startsWith('data:')?`background-image:url(${img})`:`background:${img}`}}
  window.updateLikedCount=function(){
    let n=0; try{n=(typeof likedIds==='function'?likedIds():[]).length;}catch(e){}
    document.querySelectorAll('.liked-count').forEach(el=>el.textContent=n);
    document.querySelectorAll('.heart-nav').forEach(el=>{el.textContent=n?'♥':'♡'});
  };
  const oldToggle=window.toggleLike;
  window.toggleLike=async function(id,ev){
    const out=oldToggle ? await oldToggle(id,ev) : false;
    try{updateLikedCount(); if(document.getElementById('likedPageRoot')) renderLikedPage();}catch(e){}
    return out;
  };
  window.renderLikedPage=function(){
    const root=document.getElementById('likedPageRoot'); if(!root)return;
    const email=(typeof currentEmail==='function'?currentEmail():null);
    if(!email){root.innerHTML=`<section class="page-hero"><p class="eyebrow">Saved pieces</p><h1>Liked items</h1><p class="muted">Sign in to save and revisit your favorite pieces.</p><a class="btn" href="login.html">SIGN IN</a></section>`;return;}
    const ids=(typeof likedIds==='function'?likedIds():[]).map(String);
    const ps=(typeof products==='function'?products():getProducts()).filter(p=>ids.includes(String(p.id)));
    root.innerHTML=`<section class="page-hero liked-hero"><p class="eyebrow">Saved pieces</p><h1>Liked items</h1><p class="muted">Your favorite Nita Style pieces, saved for later.</p></section>` +
      (ps.length?`<section class="liked-page-grid">${ps.map(p=>`<article class="product-card liked-page-card"><a href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-img" style="${bgLocal(productImageLocal(p))}"></div><h3>${escLocal(p.name)}</h3><p>${moneyLocal(p.salePrice||p.price)}</p></a><button class="btn light liked-remove-btn" onclick="toggleLike('${String(p.id).replace(/'/g,"\\'")}',event)">♥ REMOVE</button></article>`).join('')}</section>`:`<section class="empty-state"><h2>No liked items yet</h2><p class="muted">Tap the heart on a product to save it here.</p><a class="btn" href="shop.html">SHOP NOW</a></section>`);
  };
  document.addEventListener('DOMContentLoaded',()=>{try{updateLikedCount(); renderLikedPage();}catch(e){}});
  window.addEventListener('load',()=>{try{updateLikedCount(); renderLikedPage();}catch(e){}});
})();

/* === NITA STYLE FAVORITES SESSION + LOGOUT STYLE GUARD 2026-06-08 === */
(function(){
  function readJSON(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f));}catch(e){return f;}}
  function writeJSON(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
  function norm(v){return String(v||'').trim().toLowerCase();}
  function sessionEmail(){
    const direct = readJSON('nitaUser',null);
    const email = norm(direct && direct.email) || norm(localStorage.getItem('nitaSessionEmail')) || norm((readJSON('nitaCurrentUser',null)||{}).email);
    if(email){
      const users = readJSON('nitaUsersByEmail',{});
      if(users[email]){
        writeJSON('nitaUser',users[email]);
        localStorage.setItem('nitaSessionEmail',email);
        try{window.currentUser=users[email]; currentUser=users[email];}catch(e){}
      }
    }
    return email;
  }
  function likesKey(){return 'nitaLikedProducts_'+(sessionEmail()||'guest');}
  function likedIds(){return readJSON(likesKey(),[]).map(String);}
  async function saveLikes(ids){
    ids=[...new Set((ids||[]).map(String))];
    writeJSON(likesKey(),ids);
    const email=sessionEmail();
    if(email){
      const users=readJSON('nitaUsersByEmail',{});
      users[email]={...(users[email]||readJSON('nitaUser',{})),email,likedProducts:ids};
      writeJSON('nitaUsersByEmail',users);
      writeJSON('nitaUser',users[email]);
      try{localStorage.setItem('nitaSessionEmail',email);window.currentUser=users[email];currentUser=users[email];}catch(e){}
      try{if(typeof saveCloudKey==='function') await saveCloudKey('nitaUsersByEmail',users); else if(typeof cloud==='function') await cloud('nitaUsersByEmail',users);}catch(e){}
    }
  }
  window.nitaSessionEmail=sessionEmail;
  window.nitaLikedIds=likedIds;
  const oldToggle=window.toggleLike;
  window.toggleLike=async function(id,ev){
    if(ev){ev.preventDefault();ev.stopPropagation();}
    const email=sessionEmail();
    if(!email){try{toast('Sign in to save liked items.')}catch(e){} location.href='login.html'; return false;}
    id=String(id);
    let ids=likedIds();
    ids=ids.includes(id)?ids.filter(x=>x!==id):ids.concat(id);
    await saveLikes(ids);
    const active=ids.includes(id);
    try{
      document.querySelectorAll('[data-like-id="'+(window.CSS&&CSS.escape?CSS.escape(id):id.replace(/"/g,'\\"'))+'"]').forEach(btn=>{
        btn.classList.toggle('active',active);
        btn.innerHTML=active?'♥':'♡';
      });
      if(typeof updateLikedCount==='function') updateLikedCount();
      if(typeof renderLikedPage==='function') renderLikedPage();
    }catch(e){}
    return false;
  };
  window.updateLikedCount=function(){
    const n=likedIds().length;
    document.querySelectorAll('.liked-count').forEach(el=>el.textContent=n);
    document.querySelectorAll('.heart-nav').forEach(el=>el.textContent=n?'♥':'♡');
  };
  function productsSafe(){try{return (typeof products==='function'?products():readJSON('nitaProducts',[]));}catch(e){return readJSON('nitaProducts',[]);}}
  function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function money(v){const n=Number(v||0);return '$'+n.toFixed(2);}
  function mainImg(p){return (p.images&&p.images[0])||p.image||'';}
  window.renderLikedPage=function(){
    const root=document.getElementById('likedPageRoot'); if(!root)return;
    const email=sessionEmail();
    if(!email){
      root.innerHTML='<section class="page-hero"><p class="eyebrow">Saved pieces</p><h1>Liked items</h1><p class="muted">Sign in to save and revisit your favorite pieces.</p><a class="btn" href="login.html">SIGN IN</a></section>';
      return;
    }
    const ids=likedIds();
    const list=productsSafe().filter(p=>ids.includes(String(p.id)));
    root.innerHTML='<section class="page-hero liked-hero"><p class="eyebrow">Saved pieces</p><h1>Liked items</h1><p class="muted">Your favorite Nita Style pieces, saved for later.</p></section>'+
      (list.length?'<section class="liked-page-grid">'+list.map(p=>'<article class="product-card liked-page-card"><a href="product.html?id='+encodeURIComponent(p.id)+'"><div class="product-img" style="background-image:url(\''+esc(mainImg(p))+'\')"></div><h3>'+esc(p.name)+'</h3><p>'+money(p.salePrice||p.price)+'</p></a><button class="btn light liked-remove-btn" onclick="toggleLike(\''+String(p.id).replace(/'/g,"\\'")+'\',event)">♥ REMOVE</button></article>').join('')+'</section>':'<section class="empty-state"><h2>No liked items yet</h2><p class="muted">Tap the heart on a product to save it here.</p><a class="btn" href="shop.html">SHOP NOW</a></section>');
  };
  function forceLogoutStyle(){
    document.querySelectorAll('.danger-zone .logout-btn, button.logout-btn, .btn.logout-btn').forEach(btn=>{
      btn.style.setProperty('background','#fff','important');
      btn.style.setProperty('background-color','#fff','important');
      btn.style.setProperty('color','#111','important');
      btn.style.setProperty('border','2px solid #b00020','important');
      btn.style.setProperty('box-shadow','none','important');
    });
  }
  document.addEventListener('DOMContentLoaded',()=>{sessionEmail();try{updateLikedCount();renderLikedPage();forceLogoutStyle();}catch(e){}});
  window.addEventListener('load',()=>{sessionEmail();try{updateLikedCount();renderLikedPage();forceLogoutStyle();}catch(e){}});
  setTimeout(forceLogoutStyle,300);
  setTimeout(forceLogoutStyle,1000);
})();
/* === END NITA STYLE FAVORITES SESSION + LOGOUT STYLE GUARD === */


/* NITA FINAL UI GUARANTEE */
(function(){
  function applyFinalButtonFixes(){
    try{
      document.querySelectorAll('section.danger-zone button, .danger-zone button, .account-card button').forEach(function(btn){
        if((btn.textContent||'').trim().toUpperCase()==='LOG OUT'){
          btn.className='logout-outline-btn';
          btn.setAttribute('type','button');
          btn.style.setProperty('background','#fff','important');
          btn.style.setProperty('background-color','#fff','important');
          btn.style.setProperty('color','#111','important');
          btn.style.setProperty('border','2px solid #b00020','important');
          btn.style.setProperty('box-shadow','none','important');
        }
      });
      document.querySelectorAll('.admin-nav-button').forEach(function(btn){
        btn.style.setProperty('transition','background .18s ease,color .18s ease,border-color .18s ease','important');
      });
      document.querySelectorAll('.favorite-btn,.product-detail-fav,.liked-remove-btn').forEach(function(btn){
        btn.style.setProperty('transition','background .18s ease,color .18s ease,border-color .18s ease','important');
      });
      if(location.pathname.endsWith('/liked.html') || location.pathname.includes('liked.html')){
        var u=null; try{u=JSON.parse(localStorage.getItem('nitaUser')||'null')}catch(e){}
        var email=(u&&u.email)||localStorage.getItem('nitaSessionEmail')||'';
        if(email){ localStorage.setItem('nitaSessionEmail', String(email).toLowerCase()); }
      }
    }catch(e){console.warn('Nita final UI guard', e)}
  }
  document.addEventListener('DOMContentLoaded', applyFinalButtonFixes);
  window.addEventListener('load', applyFinalButtonFixes);
  setTimeout(applyFinalButtonFixes, 50);
  setTimeout(applyFinalButtonFixes, 350);
  setTimeout(applyFinalButtonFixes, 1000);
  try{ new MutationObserver(applyFinalButtonFixes).observe(document.documentElement,{childList:true,subtree:true}); }catch(e){}
})();

/* === NITA STYLE PREMIUM LIKES RELIABLE FINAL PATCH 2026-06-08 === */
(function(){
  function readJSON(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f));}catch(e){return f;}}
  function writeJSON(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
  function userObj(){
    const u=readJSON('nitaUser',null)||readJSON('nitaCurrentUser',null)||window.currentUser||null;
    if(u&&u.email){try{window.currentUser=u;}catch(e){} return u;}
    const email=String(localStorage.getItem('nitaSessionEmail')||'').trim().toLowerCase();
    if(email){const users=readJSON('nitaUsersByEmail',{}); if(users[email]){writeJSON('nitaUser',users[email]); try{window.currentUser=users[email];}catch(e){} return users[email];} return {email};}
    return null;
  }
  function email(){return String(userObj()?.email||'').trim().toLowerCase();}
  function allKeys(){const e=email();return e?[`nitaLikes_${e}`,`nitaLikedProducts_${e}`,'nitaLikedProducts','nitaGuestLikedProducts']:['nitaGuestLikedProducts'];}
  function canonicalIds(){
    const set=new Set();
    allKeys().forEach(k=>readJSON(k,[]).forEach(id=>set.add(String(id))));
    const u=userObj(); if(u&&Array.isArray(u.likedProducts))u.likedProducts.forEach(id=>set.add(String(id)));
    return Array.from(set);
  }
  async function persist(ids){
    ids=Array.from(new Set((ids||[]).map(String)));
    allKeys().forEach(k=>writeJSON(k,ids));
    const e=email();
    if(e){
      const users=readJSON('nitaUsersByEmail',{});
      const current=userObj()||{};
      users[e]={...users[e],...current,email:e,likedProducts:ids};
      writeJSON('nitaUsersByEmail',users);
      writeJSON('nitaUser',users[e]);
      localStorage.setItem('nitaSessionEmail',e);
      try{window.currentUser=users[e];}catch(err){}
      try{ if(typeof window.saveCloudKey==='function') await window.saveCloudKey('nitaUsersByEmail',users); else if(typeof window.nitaSaveKeyStrict==='function') await window.nitaSaveKeyStrict('nitaUsersByEmail',users); }catch(err){console.warn('Liked products saved locally, cloud sync pending.',err)}
    }
  }
  function prodList(){try{return typeof products==='function'?products():(typeof getProducts==='function'?getProducts():readJSON('nitaProducts',[]));}catch(e){return readJSON('nitaProducts',[]);}}
  function esc(s){return String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));}
  function money(v){try{return typeof moneyX==='function'?moneyX(v):(typeof window.money==='function'?window.money(v):'$'+Number(v||0).toFixed(2));}catch(e){return '$'+Number(v||0).toFixed(2);}}
  function image(p){try{return typeof mainImg==='function'?mainImg(p):(typeof productMainImage==='function'?productMainImage(p):(p.photos&&p.photos[0])||p.img||'linear-gradient(135deg,#fff,#ddd)');}catch(e){return (p.photos&&p.photos[0])||p.img||'linear-gradient(135deg,#fff,#ddd)';}}
  function bg(u){return String(u||'').startsWith('data:')?`background-image:url('${u}')`:`background:${u||'linear-gradient(135deg,#fff,#ddd)'}`;}
  function label(active){return active?'♥':'♡';}
  function setBtn(btn,active){
    btn.classList.toggle('active',!!active);
    btn.setAttribute('aria-pressed',active?'true':'false');
    if(btn.classList.contains('product-detail-fav')){
      btn.innerHTML=`<span class="fav-heart">${active?'♥':'♡'}</span><span>${active?'Saved to liked items':'Add to liked items'}</span>`;
    }else{
      btn.innerHTML=label(active);
    }
  }
  function updateEveryButton(){
    const ids=canonicalIds();
    document.querySelectorAll('[data-like-id]').forEach(btn=>setBtn(btn,ids.includes(String(btn.dataset.likeId))));
    document.querySelectorAll('.liked-count').forEach(el=>el.textContent=ids.length);
    document.querySelectorAll('.heart-nav').forEach(el=>el.textContent=ids.length?'♥':'♡');
  }
  window.nitaLikedIds=canonicalIds;
  window.toggleLike=async function(id,ev){
    if(ev){ev.preventDefault();ev.stopPropagation();}
    const e=email();
    if(!e){try{toast('Sign in to save liked items.')}catch(err){} location.href='login.html'; return false;}
    id=String(id);
    let ids=canonicalIds();
    ids=ids.includes(id)?ids.filter(x=>x!==id):ids.concat(id);
    await persist(ids);
    updateEveryButton();
    try{if(typeof renderLikedPage==='function')renderLikedPage();}catch(err){}
    return false;
  };
  function favButton(id,detail){
    const active=canonicalIds().includes(String(id));
    if(detail){return `<button type="button" class="product-detail-fav premium-like-action ${active?'active':''}" data-like-id="${esc(id)}" aria-pressed="${active?'true':'false'}" onclick="toggleLike('${String(id).replace(/'/g,"\\'")}',event)"><span class="fav-heart">${active?'♥':'♡'}</span><span>${active?'Saved to liked items':'Add to liked items'}</span></button>`;}
    return `<button type="button" class="favorite-btn premium-card-like ${active?'active':''}" data-like-id="${esc(id)}" aria-pressed="${active?'true':'false'}" onclick="toggleLike('${String(id).replace(/'/g,"\\'")}',event)" aria-label="Like product">${active?'♥':'♡'}</button>`;
  }
  function enhanceProductCards(root){
    (root||document).querySelectorAll('article.product, .product-card').forEach(card=>{
      if(card.querySelector('[data-like-id]'))return;
      const a=card.querySelector('a[href*="product.html?id="]');
      const img=card.querySelector('.product-img');
      if(!a||!img)return;
      let id=''; try{id=new URL(a.getAttribute('href'),location.href).searchParams.get('id')||'';}catch(e){}
      if(!id)return;
      img.insertAdjacentHTML('afterbegin',favButton(id,false));
    });
    updateEveryButton();
  }
  const oldRenderProducts=window.renderProducts;
  window.renderProducts=function(el='#products',list){
    const result=oldRenderProducts?oldRenderProducts.apply(this,arguments):undefined;
    enhanceProductCards(document.querySelector(el)||document);
    return result;
  };
  const oldProductCard=window.productCard;
  window.productCard=function(p){
    let html=oldProductCard?oldProductCard.apply(this,arguments):'';
    if(html && !html.includes('data-like-id') && p&&p.id){
      html=html.replace('<div class="product-img">',`<div class="product-img">${favButton(p.id,false)}`)
               .replace('<div class="product-img" ',`<div class="product-img" `); // fallback keeps old markup safe
    }
    return html;
  };
  function injectProductDetailLike(){
    const detail=document.getElementById('detail'); if(!detail)return;
    const id=new URL(location.href).searchParams.get('id'); if(!id)return;
    detail.querySelectorAll('.product-detail-fav,.premium-like-action').forEach(el=>el.remove());
    const title=detail.querySelector('.product-info h1, h1');
    const price=detail.querySelector('.product-price-row, h2');
    const target=price||title;
    if(target) target.insertAdjacentHTML('afterend',favButton(id,true));
    updateEveryButton();
  }
  const oldProductPage=window.productPage;
  window.productPage=function(){
    const result=oldProductPage?oldProductPage.apply(this,arguments):undefined;
    injectProductDetailLike();
    return result;
  };
  window.renderLikedPage=function(){
    const root=document.getElementById('likedPageRoot'); if(!root)return;
    if(!email()){root.innerHTML='<section class="page-hero"><p class="eyebrow">Saved pieces</p><h1>Liked items</h1><p class="muted">Sign in to save and revisit your favorite pieces.</p><a class="btn" href="login.html">SIGN IN</a></section>';return;}
    const ids=canonicalIds(); const list=prodList().filter(p=>ids.includes(String(p.id)));
    root.innerHTML='<section class="page-hero liked-hero"><p class="eyebrow">Saved pieces</p><h1>Liked items</h1><p class="muted">A private edit of pieces you may want to revisit later.</p></section>'+
      (list.length?'<section class="liked-page-grid premium-liked-grid">'+list.map(p=>'<article class="product-card liked-page-card"><a href="product.html?id='+encodeURIComponent(p.id)+'"><div class="product-img liked-page-img" style="'+bg(image(p))+'"></div><h3>'+esc(p.name)+'</h3><p>'+money(p.salePrice||p.price)+'</p></a><button class="btn light liked-remove-btn" data-like-id="'+esc(p.id)+'" onclick="toggleLike(\''+String(p.id).replace(/'/g,"\\'")+'\',event)">♥ REMOVE</button></article>').join('')+'</section>':'<section class="empty-state"><h2>No liked items yet</h2><p class="muted">Tap the heart on a product to save it here.</p><a class="btn" href="shop.html">SHOP NOW</a></section>');
    updateEveryButton();
  };
  function boot(){
    try{userObj(); enhanceProductCards(document); injectProductDetailLike(); updateEveryButton(); if(document.getElementById('likedPageRoot'))renderLikedPage();}catch(e){console.warn(e)}
  }
  document.addEventListener('DOMContentLoaded',boot);
  window.addEventListener('load',boot);
  setTimeout(boot,600);
  setTimeout(boot,1600);
})();
/* === END NITA STYLE PREMIUM LIKES RELIABLE FINAL PATCH === */


/* === NITA STYLE MINIMAL ADMIN ACCESS PATCH 2026-06-09 ===
   Purpose: keep the existing website unchanged, remove old admin preview flash,
   and allow current admins to grant/remove admin access for signed-up users. */
(function(){
  const OWNER_ADMIN_EMAILS = ['karim.abousamah1@gmail.com','karim.abousamah@gmail.com'];
  const norm = (v)=>String(v||'').trim().toLowerCase();
  const readJSON = (k,f)=>{try{return JSON.parse(localStorage.getItem(k)||'null')??f}catch(e){return f}};
  const writeJSON = (k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const esc = (v)=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function users(){return readJSON('nitaUsersByEmail',{});}
  function current(){return readJSON('nitaUser',null);}
  function owner(email){return OWNER_ADMIN_EMAILS.includes(norm(email));}
  window.nitaIsOwnerAdmin = owner;
  window.isAdminEmail = function(email){
    email = norm(email);
    if(owner(email)) return true;
    const u = users()[email];
    return !!(u && (u.isAdmin === true || u.role === 'admin' || u.admin === true));
  };

  // Override admin gate only; all admin dashboard content stays from the existing code.
  window.protectAdmin = function(){
    const u = current();
    try{ window.currentUser = u; currentUser = u; }catch(e){}
    if(!u?.email || !window.isAdminEmail(u.email)){
      document.body.classList.remove('admin-preload');
      document.body.innerHTML = (typeof header==='function'?header():'') + `<main class="page"><div class="card account-auth"><h1>Admin access</h1><p class="muted">Sign in with an authorized admin account to manage products, orders, customers, and coupons.</p><a class="btn" href="login.html">SIGN IN</a></div></main>`;
      try{updateCartCount?.()}catch(e){}
      return false;
    }
    return true;
  };

  // Replace only the header's admin decision, so users promoted by admin see the ADMIN link.
  const originalHeader = window.header;
  window.header = function(){
    if(typeof originalHeader !== 'function') return '';
    let html = originalHeader();
    const u = current();
    const hasAdminLink = /href="admin\.html"/.test(html);
    if(u?.email && window.isAdminEmail(u.email) && !hasAdminLink){
      html = html.replace('<a class="liked-nav-link"', '<a class="admin-link" href="admin.html">ADMIN</a><a class="liked-nav-link"');
    }
    if(u?.email && !window.isAdminEmail(u.email) && hasAdminLink && !owner(u.email)){
      html = html.replace(/<a class="admin-link" href="admin\.html">ADMIN<\/a>/g,'');
    }
    return html;
  };

  async function persistUsers(nextUsers){
    writeJSON('nitaUsersByEmail', nextUsers);
    try{
      if(typeof saveCloudKey === 'function') await saveCloudKey('nitaUsersByEmail', nextUsers);
      else if(typeof nitaSaveKeyStrict === 'function') await nitaSaveKeyStrict('nitaUsersByEmail', nextUsers);
      else if(typeof saveUsers === 'function') await saveUsers(nextUsers);
    }catch(e){ console.warn('Admin permission cloud save failed:', e); }
  }

  window.nitaToggleCustomerAdmin = async function(email){
    email = norm(email);
    if(owner(email)){ try{toast('Owner admin access cannot be removed.')}catch(e){} return; }
    const all = users();
    if(!all[email]){ try{toast('Customer not found.')}catch(e){} return; }
    const willBeAdmin = !(all[email].isAdmin === true || all[email].role === 'admin' || all[email].admin === true);
    all[email] = {...all[email], isAdmin: willBeAdmin, role: willBeAdmin ? 'admin' : 'customer', admin: willBeAdmin};
    await persistUsers(all);
    try{toast(willBeAdmin ? 'Admin access granted.' : 'Admin access removed.')}catch(e){}
    try{ await renderAdmin(); }catch(e){ location.reload(); }
  };

  function addAdminControls(){
    const section = document.querySelector('.admin-section-page[data-section="customers"]');
    if(!section) return;
    section.querySelectorAll('.admin-list-card').forEach(card=>{
      if(card.querySelector('.admin-role-control')) return;
      const muted = card.querySelector('.muted');
      if(!muted) return;
      const email = norm((muted.textContent||'').split('·')[0]);
      if(!email || !email.includes('@')) return;
      const isAdmin = window.isAdminEmail(email);
      const locked = owner(email);
      const badge = document.createElement('div');
      badge.className = 'admin-role-control';
      badge.innerHTML = `<span class="pill ${isAdmin?'on':''}">${locked?'Owner admin':(isAdmin?'Admin':'Customer')}</span>` + (locked?'':`<button type="button" class="btn light admin-role-toggle" onclick="nitaToggleCustomerAdmin('${esc(email)}')">${isAdmin?'REMOVE ADMIN':'MAKE ADMIN'}</button>`);
      const actions = card.querySelector('.admin-actions') || card;
      actions.prepend(badge);
    });
  }

  const previousRenderAdmin = window.renderAdmin;
  window.renderAdmin = async function(){
    const result = previousRenderAdmin ? await previousRenderAdmin.apply(this, arguments) : undefined;
    document.body.classList.remove('admin-preload');
    setTimeout(addAdminControls, 60);
    return result;
  };

  const style = document.createElement('style');
  style.textContent = `
    .admin-role-control{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-right:8px}
    .admin-role-control .pill.on{background:#111;color:#fff;border-color:#111}
    .admin-role-toggle{background:#fff!important;color:#111!important;border:1px solid #111!important}
    .admin-role-toggle:hover,.admin-role-toggle:active{background:#111!important;color:#fff!important;border-color:#111!important}
    .admin-nav-button:hover,.admin-nav-button.active,.admin-stat-card:hover{background:#111!important;color:#fff!important;border-color:#111!important}
    .admin-nav-button:hover *,.admin-nav-button.active *,.admin-stat-card:hover *{color:#fff!important}
  `;
  document.head.appendChild(style);
})();
/* === END NITA STYLE MINIMAL ADMIN ACCESS PATCH === */

/* === NITA STYLE TARGETED FINAL FIX: real automatic Trending/New Arrivals scrolling === */
(function(){
  const states = new Map();
  const readJSON = (key, fallback) => { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch(e) { return fallback; } };
  const productsSafe = () => { try { return typeof getProducts === 'function' ? getProducts() : readJSON('nitaProducts', []); } catch(e) { return readJSON('nitaProducts', []); } };
  const sectionOf = (p) => (p && (p.displaySection || p.homeSection)) || (p && p.collection === 'New Arrivals' ? 'new-arrivals' : 'trending-now');
  const fallbackMoney = (n) => { try { return typeof money === 'function' ? money(Number(n || 0)) : '$' + Number(n || 0).toFixed(2); } catch(e) { return '$' + Number(n || 0).toFixed(2); } };
  const imageFor = (p) => { try { return typeof productMainImage === 'function' ? productMainImage(p) : ((p.photos && p.photos[p.mainPhotoIndex || 0]) || p.img || ''); } catch(e) { return (p && ((p.photos && p.photos[0]) || p.img)) || ''; } };
  const bgFor = (img) => { try { return typeof cssBgImage === 'function' ? cssBgImage(img) : (String(img || '').startsWith('data:') ? `background-image:url(${img})` : 'background:linear-gradient(135deg,#f7f7f7,#ddd)'); } catch(e) { return 'background:linear-gradient(135deg,#f7f7f7,#ddd)'; } };
  const cardFor = (p) => {
    try { if (typeof productCard === 'function') return productCard(p); } catch(e) {}
    return `<article class="product"><a href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-img" style="${bgFor(imageFor(p))}"></div><h3>${String(p.name || 'Product')}</h3><p>${fallbackMoney(p.salePrice || p.price)}</p></a></article>`;
  };

  function stopTrack(track){
    const st = states.get(track);
    if(st && st.raf) cancelAnimationFrame(st.raf);
    states.delete(track);
  }

  function startTrack(track, speed){
    if(!track) return;
    stopTrack(track);
    track.classList.add('nita-js-marquee');
    track.style.animation = 'none';
    track.style.transform = 'translate3d(0,0,0)';
    track.style.willChange = 'transform';
    let x = 0;
    let last = performance.now();
    function tick(now){
      const dt = Math.min(50, now - last);
      last = now;
      const half = Math.max(0, track.scrollWidth / 2);
      if(half > track.clientWidth){
        x = (x + speed * dt) % half;
        track.style.transform = `translate3d(${-x}px,0,0)`;
      }
      const st = states.get(track);
      if(st) st.raf = requestAnimationFrame(tick);
    }
    states.set(track, {raf: requestAnimationFrame(tick)});
  }

  function fillTrack(id, products){
    const track = document.getElementById(id);
    if(!track) return;
    const all = productsSafe();
    const source = products && products.length ? products : all.slice(0, 6);
    if(!source.length){
      stopTrack(track);
      track.innerHTML = '<p class="muted">No products listed yet.</p>';
      return;
    }
    const html = source.map(cardFor).join('');
    // Two identical halves: the JS loop moves one half, then restarts invisibly.
    track.innerHTML = html + html;
    requestAnimationFrame(() => startTrack(track, window.innerWidth <= 760 ? 0.035 : 0.045));
  }

  window.renderHomeSections = function(){
    const all = productsSafe();
    fillTrack('trendingMarquee', all.filter(p => sectionOf(p) === 'trending-now'));
    fillTrack('newArrivalsMarquee', all.filter(p => sectionOf(p) === 'new-arrivals'));
  };

  function boot(){
    if(!document.getElementById('trendingMarquee') && !document.getElementById('newArrivalsMarquee')) return;
    const run = () => { try { window.renderHomeSections(); } catch(e) { console.error('Nita Style marquee fix:', e); } };
    if(typeof loadSharedStore === 'function') { try { loadSharedStore().finally(run); } catch(e) { run(); } }
    else run();
  }

  document.addEventListener('DOMContentLoaded', boot);
  window.addEventListener('load', boot);
  window.addEventListener('pageshow', boot);
  window.addEventListener('resize', () => setTimeout(boot, 180));
  window.addEventListener('nita-store-ready', boot);
  setTimeout(boot, 250);
  setTimeout(boot, 1200);
})();

/* === NITA STYLE ADMIN PERMISSION PERSISTENCE ONLY FIX 2026-06-09 ===
   Fixes only: promoted admins stay admin after reload / on another device. */
(function(){
  const OWNER_ADMIN_EMAILS = ['karim.abousamah1@gmail.com','karim.abousamah@gmail.com'];
  const norm = (v)=>String(v||'').trim().toLowerCase();
  const read = (k,f)=>{try{const raw=localStorage.getItem(k); return raw?JSON.parse(raw):f;}catch(e){return f;}};
  const write = (k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}};
  const toastSafe = (msg)=>{try{ if(typeof toast==='function') toast(msg); else alert(msg); }catch(e){}};
  const owner = (email)=>OWNER_ADMIN_EMAILS.includes(norm(email));

  async function fetchStoreFresh(){
    if(typeof window.nitaFetchStore === 'function') return await window.nitaFetchStore();
    const res = await fetch('/.netlify/functions/store?adminPermTs=' + Date.now(), {cache:'no-store', headers:{'Cache-Control':'no-cache'}});
    if(!res.ok) throw new Error('Cloud store unavailable: ' + res.status);
    return await res.json();
  }

  async function refreshUsersFromCloud(){
    try{
      const remote = await fetchStoreFresh();
      if(remote && remote.nitaUsersByEmail){
        write('nitaUsersByEmail', remote.nitaUsersByEmail || {});
        syncCurrentUserFromUserMap();
        return remote.nitaUsersByEmail || {};
      }
    }catch(e){
      console.warn('Admin permission cloud refresh failed:', e);
    }
    syncCurrentUserFromUserMap();
    return read('nitaUsersByEmail',{});
  }

  async function saveUsersToCloud(users){
    users = users || {};
    write('nitaUsersByEmail', users);
    syncCurrentUserFromUserMap();
    if(typeof window.nitaSaveKeyStrict === 'function'){
      await window.nitaSaveKeyStrict('nitaUsersByEmail', users);
      await refreshUsersFromCloud();
      return true;
    }
    if(typeof window.saveUsers === 'function'){
      const ok = await window.saveUsers(users);
      await refreshUsersFromCloud();
      if(ok === false) throw new Error('Cloud save returned false');
      return true;
    }
    const res = await fetch('/.netlify/functions/store', {
      method:'POST',
      headers:{'Content-Type':'application/json','Cache-Control':'no-cache'},
      body:JSON.stringify({key:'nitaUsersByEmail', value:users})
    });
    if(!res.ok) throw new Error('Cloud save failed: ' + res.status);
    await refreshUsersFromCloud();
    return true;
  }

  function currentEmail(){
    const u = read('nitaUser', null) || {};
    return norm(u.email || localStorage.getItem('nitaSessionEmail'));
  }

  function syncCurrentUserFromUserMap(){
    const email = currentEmail();
    if(!email) return null;
    const users = read('nitaUsersByEmail',{});
    if(users[email]){
      const merged = {...read('nitaUser',{}), ...users[email], email};
      write('nitaUser', merged);
      try{ localStorage.setItem('nitaSessionEmail', email); window.currentUser = merged; currentUser = merged; }catch(e){}
      return merged;
    }
    return read('nitaUser', null);
  }

  window.nitaRefreshAdminPermissions = refreshUsersFromCloud;
  window.isAdminEmail = function(email){
    email = norm(email);
    if(owner(email)) return true;
    const user = (read('nitaUsersByEmail',{}) || {})[email];
    return !!(user && (user.isAdmin === true || user.admin === true || user.role === 'admin'));
  };

  window.nitaToggleCustomerAdmin = async function(email){
    email = norm(email);
    if(!email || !email.includes('@')) return;
    if(owner(email)){ toastSafe('Owner admin access cannot be removed.'); return; }
    let users = await refreshUsersFromCloud();
    if(!users[email]){ toastSafe('Customer not found. Refresh the admin dashboard and try again.'); return; }
    const nextValue = !(users[email].isAdmin === true || users[email].admin === true || users[email].role === 'admin');
    users[email] = {...users[email], email, isAdmin: nextValue, admin: nextValue, role: nextValue ? 'admin' : 'customer', adminUpdatedAt: new Date().toISOString()};
    try{
      await saveUsersToCloud(users);
      toastSafe(nextValue ? 'Admin access saved globally. The user can reload and open the admin dashboard.' : 'Admin access removed globally.');
      setTimeout(()=>{ try{ window.renderAdmin && window.renderAdmin(); }catch(e){} }, 120);
    }catch(e){
      console.error('Admin permission save failed:', e);
      toastSafe('Admin access was not saved globally. Check Netlify Functions / environment variables.');
    }
  };

  const previousProtectAdmin = window.protectAdmin;
  window.protectAdmin = function(){
    syncCurrentUserFromUserMap();
    const email = currentEmail();
    if(email && window.isAdminEmail(email)) return true;
    if(typeof previousProtectAdmin === 'function') return previousProtectAdmin.apply(this, arguments);
    return false;
  };

  const previousRenderAdmin = window.renderAdmin;
  window.renderAdmin = async function(){
    try{ await refreshUsersFromCloud(); }catch(e){}
    syncCurrentUserFromUserMap();
    return previousRenderAdmin ? await previousRenderAdmin.apply(this, arguments) : undefined;
  };

  const previousHeader = window.header;
  window.header = function(){
    syncCurrentUserFromUserMap();
    let html = typeof previousHeader === 'function' ? previousHeader.apply(this, arguments) : '';
    const email = currentEmail();
    const hasAdminLink = /href="admin\.html"/.test(html);
    if(email && window.isAdminEmail(email) && !hasAdminLink){
      html = html.replace('<a class="liked-nav-link"', '<a class="admin-link" href="admin.html">ADMIN</a><a class="liked-nav-link"');
    }
    if(email && !window.isAdminEmail(email) && hasAdminLink && !owner(email)){
      html = html.replace(/<a class="admin-link" href="admin\.html">ADMIN<\/a>/g,'');
    }
    return html;
  };

  // When a promoted user reloads any page, refresh the user map and update the header without changing layout.
  document.addEventListener('DOMContentLoaded', function(){
    refreshUsersFromCloud().then(()=>{
      syncCurrentUserFromUserMap();
      const email = currentEmail();
      const actions = document.querySelector('.actions');
      if(actions && email && window.isAdminEmail(email) && !actions.querySelector('.admin-link')){
        const liked = actions.querySelector('.liked-nav-link');
        const a = document.createElement('a');
        a.className = 'admin-link';
        a.href = 'admin.html';
        a.textContent = 'ADMIN';
        actions.insertBefore(a, liked || actions.lastElementChild);
      }
    });
  });
})();
/* === END NITA STYLE ADMIN PERMISSION PERSISTENCE ONLY FIX === */


/* === NITA STYLE MARQUEE + ADMIN DIRECT LOAD ONLY FIX 2026-06-09 ===
   Changes only: homepage Trending/New Arrivals automatic scrolling + admin direct-load blank shell. */
(function(){
  const states = new WeakMap();
  const readJSON=(k,f)=>{try{const raw=localStorage.getItem(k);return raw?JSON.parse(raw):f;}catch(e){return f;}};
  const allProducts=()=>{try{return typeof getProducts==='function'?getProducts():readJSON('nitaProducts',[]);}catch(e){return readJSON('nitaProducts',[]);}};
  const sectionOf=(p)=>String((p&&(p.displaySection||p.homeSection))||(p&&p.collection==='New Arrivals'?'new-arrivals':'trending-now')||'trending-now').toLowerCase();
  const moneySafe=(n)=>{try{return typeof money==='function'?money(n):'$'+Number(n||0).toFixed(2);}catch(e){return '$'+Number(n||0).toFixed(2);}};
  const imgFor=(p)=>{try{return typeof productMainImage==='function'?productMainImage(p):((p.photos&&p.photos[p.mainPhotoIndex||0])||p.photos?.[0]||p.img||'');}catch(e){return (p&&((p.photos&&p.photos[0])||p.img))||'';}};
  const bgFor=(img)=>{try{return typeof cssBgImage==='function'?cssBgImage(img):(String(img||'').startsWith('data:')?`background-image:url(${img})`:`background:${img||'linear-gradient(135deg,#f7f7f7,#ddd)'}`);}catch(e){return 'background:linear-gradient(135deg,#f7f7f7,#ddd)';}};
  const esc=(v)=>String(v??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
  function card(p){
    try{ if(typeof productCard==='function') return productCard(p); }catch(e){}
    const img=imgFor(p);
    return `<article class="product"><a href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-img" style="${bgFor(img)}"></div><h3>${esc(p.name||'Product')}</h3><p>${moneySafe(p.salePrice||p.price)}</p></a></article>`;
  }
  function stop(track){const st=states.get(track);if(st&&st.raf)cancelAnimationFrame(st.raf);states.delete(track);}
  function setImportant(el,prop,val){try{el.style.setProperty(prop,val,'important');}catch(e){el.style[prop]=val;}}
  function start(track){
    if(!track) return;
    stop(track);
    track.classList.add('nita-premium-auto');
    setImportant(track,'animation','none');
    setImportant(track,'transition','none');
    setImportant(track,'will-change','transform');
    let x=0, last=performance.now(), pauseUntil=performance.now()+120;
    const speed=window.innerWidth<=760?0.055:0.07; // pixels per ms
    function tick(now){
      const dt=Math.min(40,Math.max(0,now-last)); last=now;
      const half=Math.max(1,Number(track.dataset.nitaHalfWidth||0));
      if(now>pauseUntil && half>track.parentElement.clientWidth*0.65){
        x=(x+speed*dt)%half;
        setImportant(track,'transform',`translate3d(${-x}px,0,0)`);
      }else{
        setImportant(track,'transform','translate3d(0,0,0)');
      }
      const st=states.get(track); if(st) st.raf=requestAnimationFrame(tick);
    }
    states.set(track,{raf:requestAnimationFrame(tick)});
  }
  function fill(id,list){
    const track=document.getElementById(id); if(!track)return;
    const source=(list&&list.length?list:allProducts().slice(0,8));
    if(!source.length){stop(track);track.innerHTML='<p class="muted">No products listed yet.</p>';return;}
    const one=source.map(card).join('');
    // Build several copies so the movement is always visible even on wide screens.
    track.innerHTML=one+one+one+one;
    track.classList.add('nita-premium-auto');
    setImportant(track,'animation','none');
    requestAnimationFrame(()=>{
      const cards=track.children.length;
      track.dataset.nitaHalfWidth=String(Math.max(1,track.scrollWidth/4));
      start(track);
    });
  }
  window.renderHomeSections=function(){
    const ps=allProducts();
    fill('trendingMarquee',ps.filter(p=>sectionOf(p)==='trending-now'));
    fill('newArrivalsMarquee',ps.filter(p=>sectionOf(p)==='new-arrivals'));
  };
  function boot(){
    if(!document.getElementById('trendingMarquee')&&!document.getElementById('newArrivalsMarquee'))return;
    const run=()=>{try{window.renderHomeSections();}catch(e){console.error('Nita marquee final fix failed:',e);}};
    if(typeof loadSharedStore==='function'){
      try{const r=loadSharedStore(); if(r&&typeof r.finally==='function')r.finally(run); else run();}catch(e){run();}
    }else run();
  }
  document.addEventListener('DOMContentLoaded',boot);
  window.addEventListener('load',boot);
  window.addEventListener('pageshow',boot);
  window.addEventListener('resize',()=>setTimeout(boot,180));
  window.addEventListener('nita-store-ready',()=>setTimeout(boot,60));
  setTimeout(boot,250); setTimeout(boot,1200); setTimeout(boot,2500);
})();
/* === END NITA STYLE MARQUEE + ADMIN DIRECT LOAD ONLY FIX === */


/* === NITA STYLE NEW ARRIVALS + ADMIN LOAD FINAL FIX marquee-new-arrivals-admin-load-fix-20260609-1125 ===
   Only fixes: both homepage marquee tracks and reliable admin page load. */
(function(){
  const marqueeState = window.__nitaForceMarqueeState || (window.__nitaForceMarqueeState = {});
  function setImportant(el, prop, val){ try{ el.style.setProperty(prop, val, 'important'); }catch(e){ el.style[prop]=val; } }
  function stop(id){ const st=marqueeState[id]; if(st&&st.raf) cancelAnimationFrame(st.raf); delete marqueeState[id]; }
  function prepareTrack(id){
    const track=document.getElementById(id);
    if(!track) return;
    if(!track.children.length) return;
    stop(id);
    // Keep the current cards, then rebuild enough repeated copies so movement is always visible.
    let original = track.dataset.nitaOriginalHtml || track.innerHTML;
    if(!track.dataset.nitaOriginalHtml) track.dataset.nitaOriginalHtml = original;
    const repeated = original + original + original + original + original + original;
    if(track.innerHTML !== repeated) track.innerHTML = repeated;
    track.classList.remove('nita-js-marquee','nita-premium-auto');
    track.classList.add('nita-force-marquee');
    setImportant(track,'animation','none');
    setImportant(track,'transition','none');
    setImportant(track,'will-change','transform');
    setImportant(track,'transform','translate3d(0,0,0)');
    let x=0;
    let last=performance.now();
    const speed = window.innerWidth <= 760 ? 0.055 : 0.075;
    function tick(now){
      const dt=Math.min(45, Math.max(0, now-last));
      last=now;
      const oneWidth=Math.max(1, track.scrollWidth/6);
      x=(x + speed*dt) % oneWidth;
      setImportant(track,'transform','translate3d(' + (-x) + 'px,0,0)');
      if(marqueeState[id]) marqueeState[id].raf=requestAnimationFrame(tick);
    }
    marqueeState[id]={raf:requestAnimationFrame(tick)};
  }
  function forceMarquees(){
    const hasHome=document.getElementById('trendingMarquee') || document.getElementById('newArrivalsMarquee');
    if(!hasHome) return;
    // Let the existing product renderer build the card HTML first, then force both tracks to move.
    try{ if(typeof window.renderHomeSections==='function' && !window.__nitaForceRendering){ window.__nitaForceRendering=true; window.renderHomeSections(); window.__nitaForceRendering=false; } }catch(e){ window.__nitaForceRendering=false; console.warn('Home section render skipped:',e); }
    setTimeout(()=>{ prepareTrack('trendingMarquee'); prepareTrack('newArrivalsMarquee'); }, 60);
  }
  window.nitaForceHomepageMarquees=forceMarquees;
  document.addEventListener('DOMContentLoaded', forceMarquees);
  window.addEventListener('load', forceMarquees);
  window.addEventListener('pageshow', forceMarquees);
  window.addEventListener('resize', ()=>setTimeout(forceMarquees,180));
  window.addEventListener('nita-store-ready', ()=>setTimeout(forceMarquees,120));
  setTimeout(forceMarquees,250); setTimeout(forceMarquees,1200); setTimeout(forceMarquees,2500);
})();
/* === END NITA STYLE NEW ARRIVALS + ADMIN LOAD FINAL FIX === */

/* === NITA STYLE FINAL NEW ARRIVALS ONLY AUTO-SCROLL FIX 2026-06-09 ===
   This patch touches only the New Arrivals homepage row. Trending Now is left untouched. */
(function(){
  const STATE_KEY='__nitaNewArrivalsOnlyAutoScroll';
  const state = window[STATE_KEY] || (window[STATE_KEY] = { raf:null, observer:null, busy:false, signature:'' });
  const safeJSON=(k,f)=>{try{const raw=localStorage.getItem(k);return raw?JSON.parse(raw):f;}catch(e){return f;}};
  const allProducts=()=>{try{return typeof getProducts==='function'?getProducts():safeJSON('nitaProducts',[]);}catch(e){return safeJSON('nitaProducts',[]);}};
  const normalizeSection=(v)=>String(v||'').trim().toLowerCase().replace(/[_\s]+/g,'-');
  const productSection=(p)=>{
    const direct = normalizeSection(p && (p.displaySection || p.homeSection));
    if(direct==='new-arrivals' || direct==='newarrival' || direct==='arrivals') return 'new-arrivals';
    if(direct==='trending-now' || direct==='trending') return 'trending-now';
    const collection = normalizeSection(p && p.collection);
    return collection==='new-arrivals' ? 'new-arrivals' : 'trending-now';
  };
  const renderCard=(p)=>{
    try{ if(typeof productCard==='function') return productCard(p); }catch(e){}
    const esc=(v)=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    const price=(n)=>{try{return typeof money==='function'?money(n):'$'+Number(n||0).toFixed(2);}catch(e){return '$'+Number(n||0).toFixed(2);}};
    let img='linear-gradient(135deg,#f7f7f7,#ddd)';
    try{ img = typeof productMainImage==='function' ? productMainImage(p) : ((p.photos&&p.photos[p.mainPhotoIndex||0])||p.photos?.[0]||p.img||img); }catch(e){}
    let bg='background:linear-gradient(135deg,#f7f7f7,#ddd)';
    try{ bg = typeof cssBgImage==='function' ? cssBgImage(img) : (String(img).startsWith('data:')||String(img).startsWith('http') ? `background-image:url(${img})` : `background:${img}`); }catch(e){}
    return `<article class="product"><a href="product.html?id=${encodeURIComponent(p.id||'')}"><div class="product-img" style="${bg}"></div><h3>${esc(p.name||'Product')}</h3><p>${price(p.salePrice||p.price)}</p></a></article>`;
  };
  const important=(el,prop,val)=>{try{el.style.setProperty(prop,val,'important');}catch(e){el.style[prop]=val;}};
  function stop(){ if(state.raf) cancelAnimationFrame(state.raf); state.raf=null; }
  function sourceProducts(){
    const ps=allProducts();
    const arrivals=ps.filter(p=>productSection(p)==='new-arrivals');
    return arrivals.length ? arrivals : ps.slice(0,6);
  }
  function buildTrack(track){
    const list=sourceProducts();
    if(!track || !list.length) return false;
    const signature=list.map(p=>String(p.id||p.name||'')).join('|');
    // Always rebuild New Arrivals from clean product data, so old duplicated/overriding HTML cannot freeze it.
    const one=list.map(renderCard).join('');
    track.innerHTML = one.repeat(8);
    state.signature=signature;
    return true;
  }
  function start(){
    const track=document.getElementById('newArrivalsMarquee');
    if(!track || state.busy) return;
    state.busy=true;
    stop();
    try{
      if(!buildTrack(track)){ state.busy=false; return; }
      const section=track.closest('.new-arrivals-scroll');
      if(section){ important(section,'overflow','hidden'); important(section,'position','relative'); }
      track.classList.remove('nita-js-marquee','nita-premium-auto','nita-force-marquee');
      track.classList.add('nita-new-arrivals-only-scroll');
      important(track,'display','flex');
      important(track,'flex-wrap','nowrap');
      important(track,'width','max-content');
      important(track,'min-width','max-content');
      important(track,'animation','none');
      important(track,'transition','none');
      important(track,'will-change','transform');
      important(track,'transform','translate3d(0,0,0)');
      let x=0, last=performance.now();
      const speed=window.innerWidth<=760?0.055:0.075;
      function tick(now){
        const current=document.getElementById('newArrivalsMarquee');
        if(current!==track){ stop(); state.busy=false; setTimeout(start,80); return; }
        const dt=Math.min(45,Math.max(0,now-last)); last=now;
        const oneWidth=Math.max(1, track.scrollWidth/8);
        const viewWidth=(track.parentElement&&track.parentElement.clientWidth)||window.innerWidth||1;
        if(oneWidth>20 && track.scrollWidth>viewWidth){
          x=(x+speed*dt)%oneWidth;
          important(track,'transform','translate3d('+(-x)+'px,0,0)');
        }
        state.raf=requestAnimationFrame(tick);
      }
      state.raf=requestAnimationFrame(tick);
    }finally{
      setTimeout(()=>{state.busy=false;},100);
    }
  }
  function boot(){
    const track=document.getElementById('newArrivalsMarquee');
    if(!track) return;
    // Run after existing homepage renderers finish, then take control only of New Arrivals.
    setTimeout(start,100);
    setTimeout(start,600);
    setTimeout(start,1600);
    if(state.observer) try{state.observer.disconnect();}catch(e){}
    try{
      state.observer=new MutationObserver(()=>{
        if(state.busy) return;
        clearTimeout(state.moTimer);
        state.moTimer=setTimeout(start,140);
      });
      state.observer.observe(track,{childList:true});
    }catch(e){}
  }
  window.nitaStartNewArrivalsOnlyScroll=start;
  document.addEventListener('DOMContentLoaded',boot);
  window.addEventListener('load',boot);
  window.addEventListener('pageshow',boot);
  window.addEventListener('resize',()=>setTimeout(start,180));
  window.addEventListener('nita-store-ready',()=>setTimeout(start,180));
  setTimeout(boot,300); setTimeout(start,1200); setTimeout(start,2600);
})();
/* === END NITA STYLE FINAL NEW ARRIVALS ONLY AUTO-SCROLL FIX === */

/* === NITA STYLE QUICK VIEW OUT-OF-STOCK SIZE ONLY FIX 2026-06-09 ===
   Only fixes Quick View size availability so it matches the full product page. */
(function(){
  const SIZE_ORDER=['XS','S','M','L','XL','One Size'];
  const esc=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const key=s=>String(s||'').trim().toLowerCase();
  const uniq=arr=>[...new Set((arr||[]).map(x=>String(x||'').trim()).filter(Boolean))]
    .sort((a,b)=>{const ia=SIZE_ORDER.findIndex(x=>key(x)===key(a));const ib=SIZE_ORDER.findIndex(x=>key(x)===key(b));return (ia<0?99:ia)-(ib<0?99:ib);});
  const allProducts=()=>{try{return typeof getProducts==='function'?getProducts():JSON.parse(localStorage.getItem('nitaProducts')||'[]')}catch(e){return []}};
  const normalize=p=>{try{if(typeof normalizeProductStatus==='function')p=normalizeProductStatus(p||{});}catch(e){p=p||{}} return p||{};};
  const sizeList=p=>{
    p=normalize(p);
    const base=Array.isArray(p.sizes)?p.sizes:[];
    const out=outSizeList(p);
    return uniq([...base,...out]).length?uniq([...base,...out]):['One Size'];
  };
  function outSizeList(p){
    p=normalize(p);
    let out=[];
    ['outOfStockSizes','unavailableSizes','disabledSizes','soldOutSizes','outSizes','sizeOutOfStock','oosSizes'].forEach(k=>{
      if(Array.isArray(p[k])) out=out.concat(p[k]);
    });
    if(p.sizeStock && typeof p.sizeStock==='object'){
      Object.entries(p.sizeStock).forEach(([s,v])=>{
        const val=String(v&&typeof v==='object'?(v.status||v.available||v.stock||v.qty||v.quantity):v).toLowerCase();
        const num=Number(v&&typeof v==='object'?(v.stock||v.qty||v.quantity):v);
        if(val.includes('out') || val==='false' || num===0) out.push(s);
      });
    }
    return uniq(out);
  }
  function isOut(p,s){const ks=key(s);return outSizeList(p).some(x=>key(x)===ks);}
  const cssBg=u=>{try{return typeof cssBgImage==='function'?cssBgImage(u):(String(u||'').startsWith('data:')||String(u||'').startsWith('http')?`background-image:url(${u})`:`background:${u||'linear-gradient(135deg,#f7f7f7,#ddd)'}`)}catch(e){return 'background:linear-gradient(135deg,#f7f7f7,#ddd)'}};
  const imgs=p=>{try{return typeof productImagesForDisplay==='function'?productImagesForDisplay(p):{first:(p.photos&&p.photos[p.mainPhotoIndex||0])||p.photos?.[0]||p.img||'linear-gradient(135deg,#f7f7f7,#ddd)'}}catch(e){return {first:'linear-gradient(135deg,#f7f7f7,#ddd)'}}};
  const price=p=>{try{return typeof productPriceStatusRow==='function'?productPriceStatusRow(p,'h3'):`<h3>${typeof money==='function'?money(p.salePrice||p.price):('$'+Number(p.salePrice||p.price||0).toFixed(2))}</h3>`}catch(e){return `<h3>$${Number(p.salePrice||p.price||0).toFixed(2)}</h3>`}};
  function modal(){
    let m=document.getElementById('quickModal');
    if(!m){
      document.body.insertAdjacentHTML('beforeend',`<div class="quick-modal" id="quickModal" aria-hidden="true"><div class="quick-backdrop" data-quick-close="true"></div><div class="quick-dialog" role="dialog" aria-modal="true"><button class="quick-close" type="button" data-quick-close="true">×</button><div id="quickContent"></div></div></div>`);
      m=document.getElementById('quickModal');
    }
    return m;
  }
  window.selectedQuickSize=function(){
    const active=document.querySelector('#quickContent .size.active:not(.size-disabled):not([disabled])');
    return active?.dataset?.size || active?.textContent?.replace(/out of stock/ig,'').trim() || '';
  };
  const previousAddToCart=window.addToCart;
  window.addToCart=function(id,size){
    const p=normalize(allProducts().find(x=>String(x.id)===String(id))||{});
    if(p.id && isOut(p,size)){
      if(typeof toast==='function') toast('This size is out of stock.');
      return false;
    }
    return previousAddToCart?previousAddToCart.apply(this,arguments):false;
  };
  window.openQuickView=function(id){
    const p=normalize(allProducts().find(x=>String(x.id)===String(id)));
    if(!p?.id) return false;
    const sizes=sizeList(p);
    const firstAvailable=sizes.find(s=>!isOut(p,s))||'';
    window.quickSelectedSize=firstAvailable;
    const sizesHtml=sizes.map(s=>{
      const oos=isOut(p,s); const active=!oos && key(s)===key(firstAvailable);
      return `<button type="button" data-size="${esc(s)}" class="size ${active?'active':''} ${oos?'size-disabled':''}" ${oos?'disabled aria-disabled="true" title="Out of stock"':`onclick="quickSelectedSize='${esc(s)}';this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active')"`}>${esc(s)}</button>`;
    }).join('');
    const status=p.status||(p.soldOut?'out-of-stock':'in-stock');
    const canBuy=status==='in-stock' && !!firstAvailable;
    const action=canBuy
      ? `<button class="btn quick-add" type="button" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}', selectedQuickSize() || quickSelectedSize || 'One Size'); closeQuickView();">ADD TO CART</button>`
      : `<button class="btn disabled quick-disabled" type="button" disabled aria-disabled="true">${status==='coming-soon'?'COMING SOON':(status==='out-of-stock'?'OUT OF STOCK':'SIZE OUT OF STOCK')}</button><button class="notify-btn" type="button" onclick="notifyMe&&notifyMe('${String(p.id).replace(/'/g,"\\'")}')">NOTIFY ME</button>`;
    const im=imgs(p);
    modal().querySelector('#quickContent').innerHTML=`<div class="quick-grid"><div class="quick-image" style="${cssBg(im.first)}"></div><div class="quick-info"><p class="muted">${esc(p.category||'')}</p><h2>${esc(p.name||'Product')}</h2>${price(p)}<p>${esc(p.desc||'')}</p><div class="sizes quick-size-list">${sizesHtml}</div>${action}<a class="btn light" href="product.html?id=${encodeURIComponent(p.id)}">VIEW FULL PRODUCT</a></div></div>`;
    const m=modal(); m.classList.add('open'); m.setAttribute('aria-hidden','false'); document.body.classList.add('quick-open','panel-open'); return false;
  };
})();
/* === END NITA STYLE QUICK VIEW OUT-OF-STOCK SIZE ONLY FIX === */


/* === NITA STYLE ORDER EMAIL CUSTOMER-FACING WARNING FIX 2026-06-09 ===
   Purpose: keep checkout success clean even if Resend/Netlify email delivery fails.
   Emails are still attempted; failures are logged to console for admin debugging only.
*/
(function(){
  function readJSON(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f));}catch(e){return f;}}
  function safe(v){return String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function money(v){return '$'+Number(v||0).toFixed(2);}

  // Do not show technical email errors to customers on the purchase success screen.
  localStorage.removeItem('nitaLastEmailError');

  // Keep email sending best-effort: try to send, but never break checkout UI.
  const previousSendStoreEmail = window.sendStoreEmail;
  window.sendStoreEmail = async function(payload){
    try{
      if(typeof previousSendStoreEmail === 'function') return await previousSendStoreEmail(payload);
      const res = await fetch('/.netlify/functions/send-email', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload || {})
      });
      let body={};
      try{ body=await res.json(); }catch(e){ body={raw:await res.text()}; }
      if(!res.ok || body.ok===false){
        console.warn('Nita Style email was not delivered:', body.error || body.raw || body);
        return {ok:false, suppressed:true, error:body.error || 'Email delivery failed'};
      }
      return body;
    }catch(error){
      console.warn('Nita Style email was not delivered:', error);
      return {ok:false, suppressed:true, error:error?.message || String(error)};
    }
  };

  // If older checkout code writes the red warning flag, remove it immediately.
  const originalSetItem = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function(key,value){
    if(key === 'nitaLastEmailError'){
      console.warn('Nita Style email warning suppressed for customer:', value);
      localStorage.removeItem('nitaLastEmailError');
      return;
    }
    return originalSetItem(key,value);
  };

  // Final success page renderer: never displays Resend/Netlify technical warnings to shoppers.
  window.renderOrderSuccess = function(){
    const root=document.getElementById('orderSuccessRoot');
    if(!root) return;
    localStorage.removeItem('nitaLastEmailError');
    const order=readJSON('nitaLastOrder',null);
    root.innerHTML=`<section class="order-success-wrap"><div class="success-mark"><span>✓</span></div><p class="eyebrow">Order received</p><h1>Thank you for your purchase</h1><p class="muted">Your Nita Style order has been submitted successfully. We will prepare your order and contact you if any detail needs confirmation.</p>${order?`<div class="success-summary"><div><span>Order number</span><b>${safe(order.id)}</b></div><div><span>Total</span><b>${money(order.total)}</b></div><div><span>Delivery</span><b>Wakilni · 2-4 working days</b></div><div><span>Payment</span><b>Cash on Delivery</b></div></div>`:''}<div class="success-actions"><a class="btn" href="shop.html">CONTINUE SHOPPING</a><a class="btn light" href="account.html">VIEW MY ORDER</a></div></section>`;
  };

  document.addEventListener('DOMContentLoaded',function(){
    if(document.getElementById('orderSuccessRoot')) window.renderOrderSuccess();
  });
  window.addEventListener('pageshow',function(){
    if(document.getElementById('orderSuccessRoot')) window.renderOrderSuccess();
  });
})();
/* === END NITA STYLE ORDER EMAIL CUSTOMER-FACING WARNING FIX 2026-06-09 === */


/* === NITA STYLE HOMEPAGE WALLPAPERS ADMIN ONLY ADDITION 2026-06-10 ===
   Admin controls for the two homepage wallpaper areas: Shop Now and Explore Collections. */
(function(){
  const WALL_KEY = 'nitaHomepageWallpapers';
  const DEFAULTS = { shopNow:'', exploreCollections:'' };
  function readJSON(key, fallback){ try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}catch(e){return fallback;} }
  function writeJSON(key, value){ try{localStorage.setItem(key, JSON.stringify(value));}catch(e){console.warn('Wallpaper local save failed', e);} }
  function wallpapers(){ return {...DEFAULTS, ...readJSON(WALL_KEY, DEFAULTS)}; }
  function cssUrl(value){ return value ? `url("${String(value).replace(/"/g,'%22')}")` : ''; }
  function applyOne(el, value, variable){
    if(!el) return;
    if(value){ el.classList.add('nita-wallpaper-applied'); el.style.setProperty(variable, cssUrl(value)); }
    else { el.classList.remove('nita-wallpaper-applied'); el.style.removeProperty(variable); }
  }
  window.nitaApplyHomepageWallpapers = function(){
    const w = wallpapers();
    const panels = document.querySelectorAll('.hero.hero-buttons-only .hero-panel');
    applyOne(panels[0], w.shopNow, '--nita-home-wallpaper');
    applyOne(document.querySelector('.banner.banner-photo'), w.exploreCollections, '--nita-home-wallpaper');
  };
  function previewHtml(label, key, value){
    const has = !!value;
    return `<div class="wallpaper-admin-card"><div class="wallpaper-preview ${has?'has-image':''}" style="${has?`background-image:url('${String(value).replace(/'/g,"%27")}')`:''}"></div><div><h3>${label}</h3><p class="muted">Upload the image that appears behind this homepage button.</p><input class="field" type="file" accept="image/*" onchange="nitaPickHomepageWallpaper(event,'${key}')"><div class="admin-actions"><button type="button" class="btn light" onclick="nitaClearHomepageWallpaper('${key}')">REMOVE PHOTO</button></div></div></div>`;
  }
  window.nitaRenderHomepageWallpaperAdmin = function(){
    const root = document.getElementById('homepageWallpapersAdmin');
    if(!root) return;
    const w = wallpapers();
    root.innerHTML = `<div class="admin-toolbar"><div><h2>Homepage wallpapers</h2><p class="muted">Choose the two background images shown behind Shop Now and Explore Collections.</p></div><span class="pill">Homepage</span></div>`+
      previewHtml('Shop Now wallpaper','shopNow',w.shopNow)+
      previewHtml('Explore Collections wallpaper','exploreCollections',w.exploreCollections)+
      `<button type="button" class="btn" onclick="nitaSaveHomepageWallpapers()">SAVE HOMEPAGE WALLPAPERS</button><p class="muted small-note">Images are saved to the same global store as your products, so all visitors see the selected wallpapers after saving.</p>`;
  };
  window.nitaPickHomepageWallpaper = function(event, key){
    const file = event && event.target && event.target.files && event.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = function(){ const w = wallpapers(); w[key] = reader.result; writeJSON(WALL_KEY, w); nitaApplyHomepageWallpapers(); nitaRenderHomepageWallpaperAdmin(); };
    reader.readAsDataURL(file);
  };
  window.nitaClearHomepageWallpaper = function(key){ const w = wallpapers(); w[key] = ''; writeJSON(WALL_KEY, w); nitaApplyHomepageWallpapers(); nitaRenderHomepageWallpaperAdmin(); };
  window.nitaSaveHomepageWallpapers = async function(){
    const w = wallpapers();
    writeJSON(WALL_KEY, w);
    try{
      if(typeof window.nitaSaveKeyStrict === 'function') await window.nitaSaveKeyStrict(WALL_KEY, w);
      else if(typeof saveSharedStore === 'function') await saveSharedStore();
      if(typeof toast === 'function') toast('Homepage wallpapers saved globally.');
      if(typeof nitaNotify === 'function') nitaNotify('Homepage wallpapers saved globally.', true);
    }catch(e){
      console.error(e);
      if(typeof nitaNotify === 'function') nitaNotify('Could not save wallpapers globally. Check Netlify store settings.', false, true);
      else alert('Could not save globally. Check Netlify store settings.');
    }
    nitaApplyHomepageWallpapers();
  };
  function injectAdminSection(){
    const side = document.querySelector('.admin-side');
    const layout = document.querySelector('.admin-layout');
    if(!side || !layout || document.querySelector('[data-section="home-wallpapers"]')) return;
    side.insertAdjacentHTML('beforeend', '<button class="admin-nav-button" data-section="home-wallpapers" onclick="showAdminSection(\'home-wallpapers\')">Homepage wallpapers</button>');
    layout.insertAdjacentHTML('beforeend', '<div class="card admin-section-page" data-section="home-wallpapers"><div id="homepageWallpapersAdmin"></div></div>');
    nitaRenderHomepageWallpaperAdmin();
  }
  const previousRenderAdmin = window.renderAdmin;
  window.renderAdmin = async function(){
    if(previousRenderAdmin) await previousRenderAdmin.apply(this, arguments);
    injectAdminSection();
  };
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(nitaApplyHomepageWallpapers, 50); setTimeout(injectAdminSection, 250); });
  window.addEventListener('load', function(){ setTimeout(nitaApplyHomepageWallpapers, 50); setTimeout(injectAdminSection, 250); });
  window.addEventListener('nita-store-ready', function(){ setTimeout(nitaApplyHomepageWallpapers, 50); });
})();
/* === END NITA STYLE HOMEPAGE WALLPAPERS ADMIN ONLY ADDITION === */


/* === NITA STYLE PREMIUM AUTH / ADDRESS VALIDATION ONLY 2026-06-11 ===
   Adds a more premium auth screen, standalone email verification view, address label select,
   required-field red validation, without changing product/cart/admin logic. */
(function(){
  const esc = (v='') => String(v ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const norm = (v='') => String(v||'').trim().toLowerCase();
  const read = (k,f)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f));}catch(e){return f;}};
  const write = (k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){console.warn(e);}};
  const users = ()=>read('nitaUsersByEmail',{});
  const setUsers = async (u)=>{write('nitaUsersByEmail',u); try{ if(typeof window.nitaSaveKeyStrict==='function') await window.nitaSaveKeyStrict('nitaUsersByEmail',u); else if(typeof saveCloudKey==='function') await saveCloudKey('nitaUsersByEmail',u); }catch(e){console.warn('Users saved locally; cloud sync failed.',e);} };
  const sendEmail = async (payload)=>{ if(typeof window.sendStoreEmail==='function') return window.sendStoreEmail(payload); if(typeof window.emailSend==='function') return window.emailSend(payload); const res=await fetch('/.netlify/functions/send-email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload||{})}); let body={}; try{body=await res.json()}catch(e){} if(!res.ok || body.ok===false) throw new Error(body.error||'Email could not be sent.'); return body; };
  const code = ()=>String(Math.floor(100000+Math.random()*900000));
  const getPending = ()=>read('nitaPendingSignup',null);
  const setPending = (p)=>write('nitaPendingSignup',p);
  const clearPending = ()=>localStorage.removeItem('nitaPendingSignup');

  function authShell(mode='signin'){
    const isSignup = mode === 'signup';
    return `<section class="auth-premium-shell">
      <div class="auth-premium-panel">
        <div class="auth-copy">
          <img src="assets/logo-cropped.png" alt="Nita Style" class="auth-logo-premium">
          <p class="eyebrow">Private customer account</p>
          <h1>${isSignup?'Create your Nita Style account':'Welcome back'}</h1>
          <p class="muted">${isSignup?'Create your account to save delivery details, follow your orders, and receive your first-order code.':'Sign in to view your saved addresses, order roadmap, and liked pieces.'}</p>
          <div class="auth-benefits"><span>Secure email verification</span><span>Saved delivery addresses</span><span>Order tracking</span></div>
        </div>
        <div class="auth-card premium-auth-card">
          <div class="auth-tabs premium-auth-tabs"><button type="button" class="${!isSignup?'active':''}" onclick="switchAuthMode('signin')">SIGN IN</button><button type="button" class="${isSignup?'active':''}" onclick="switchAuthMode('signup')">CREATE ACCOUNT</button></div>
          <div id="authMessage" class="auth-message"></div>
          <label>Email address</label><input id="authEmail" class="field" type="email" autocomplete="email" placeholder="you@example.com">
          <label>Password</label><input id="authPassword" class="field" type="password" autocomplete="${isSignup?'new-password':'current-password'}" placeholder="Password">
          <div id="signupFields" style="display:${isSignup?'block':'none'}"><div class="form-grid"><div><label>First name</label><input id="authFirst" class="field" placeholder="First name"></div><div><label>Last name</label><input id="authLast" class="field" placeholder="Last name"></div></div><label>Phone number</label><input id="authPhone" class="field" placeholder="Phone number"></div>
          <button class="btn auth-submit" type="button" onclick="submitAuth()">${isSignup?'CREATE ACCOUNT':'SIGN IN'}</button>
          <p class="muted mini-note">Your email is your login and cannot be edited from your account page.</p>
        </div>
      </div>
    </section>`;
  }

  function verificationShell(p){
    return `<section class="verify-page-shell">
      <div class="verify-card">
        <img src="assets/logo-cropped.png" alt="Nita Style" class="verify-logo">
        <p class="eyebrow">Email verification</p>
        <h1>Enter your code</h1>
        <p class="muted">We sent a six-digit verification code to <b>${esc(p?.email||'your email')}</b>. Enter it below to activate your account.</p>
        <div id="authMessage" class="auth-message"></div>
        <input id="authCode" class="field verify-code-field" inputmode="numeric" maxlength="6" placeholder="000000" autocomplete="one-time-code">
        <button class="btn auth-submit" type="button" onclick="submitAuth()">VERIFY & CREATE ACCOUNT</button>
        <button class="btn light" type="button" onclick="resendVerificationCode()">RESEND CODE</button>
        <button class="link-button" type="button" onclick="clearPendingSignupAndReturn()">Edit email address</button>
      </div>
    </section>`;
  }

  window.renderLoginPage = function(mode){
    const root=document.getElementById('loginRoot'); if(!root) return;
    const pending=getPending();
    if(pending && pending.awaitingVerification){ root.innerHTML=verificationShell(pending); setTimeout(()=>document.getElementById('authCode')?.focus(),50); return; }
    root.innerHTML=authShell(mode||'signin');
  };
  window.switchAuthMode = function(mode){ clearPending(); renderLoginPage(mode); };
  window.clearPendingSignupAndReturn = function(){ clearPending(); renderLoginPage('signup'); };
  window.resendVerificationCode = async function(){
    const p=getPending(); const msg=document.getElementById('authMessage');
    if(!p || !p.email){ renderLoginPage('signup'); return; }
    const fresh=code(); p.code=fresh; p.createdAt=Date.now(); p.awaitingVerification=true; setPending(p);
    try{ if(msg) msg.textContent='Sending a new code...'; await sendEmail({type:'verification',to:p.email,code:fresh}); if(msg) msg.textContent='A new code has been sent.'; }
    catch(e){ if(msg) msg.textContent='We could not send the code. Please check your email setup.'; console.error(e); }
  };
  window.submitAuth = async function(){
    const root=document.getElementById('loginRoot'); if(!root) return;
    const msg=document.getElementById('authMessage');
    const pending=getPending();
    if(pending && pending.awaitingVerification){
      const entered=String(document.getElementById('authCode')?.value||'').trim();
      if(!entered || entered!==String(pending.code)){ if(msg) msg.textContent='Wrong verification code. Please check your email and try again.'; return; }
      const all=users(); const email=norm(pending.email);
      const user={...(all[email]||{}), email, password:pending.password, firstName:pending.firstName||'', lastName:pending.lastName||'', phone:pending.phone||'', addresses:all[email]?.addresses||[], liked:all[email]?.liked||[], isVerified:true, createdAt:all[email]?.createdAt||Date.now()};
      all[email]=user; await setUsers(all); write('nitaUser',user); localStorage.setItem('nitaSessionEmail',email); clearPending();
      try{ await sendEmail({type:'discount',to:email,code:'NITA10'}); }catch(e){ console.warn('Welcome code email failed', e); }
      if(msg) msg.textContent='Account verified. Redirecting...';
      setTimeout(()=>{ location.href='account.html'; },650); return;
    }
    const signupVisible = document.getElementById('signupFields') && document.getElementById('signupFields').style.display !== 'none';
    const email=norm(document.getElementById('authEmail')?.value); const password=String(document.getElementById('authPassword')?.value||'');
    if(!email || !/^\S+@\S+\.\S+$/.test(email)){ if(msg) msg.textContent='Please enter a valid email address.'; return; }
    if(!password){ if(msg) msg.textContent='Please enter your password.'; return; }
    const all=users();
    if(!signupVisible){
      const u=all[email]; if(!u || String(u.password||'')!==password){ if(msg) msg.textContent='Incorrect email or password.'; return; }
      write('nitaUser',u); localStorage.setItem('nitaSessionEmail',email); if(msg) msg.textContent='Signed in. Redirecting...'; setTimeout(()=>{location.href='account.html'},450); return;
    }
    if(all[email]){ if(msg) msg.textContent='An account already exists with this email. Please sign in.'; return; }
    const first=String(document.getElementById('authFirst')?.value||'').trim(); const last=String(document.getElementById('authLast')?.value||'').trim(); const phone=String(document.getElementById('authPhone')?.value||'').trim();
    if(!first || !last || !phone){ if(msg) msg.textContent='Please complete your first name, last name, and phone number.'; return; }
    const c=code(); const p={awaitingVerification:true,email,password,firstName:first,lastName:last,phone,code:c,createdAt:Date.now()}; setPending(p);
    try{ if(msg) msg.textContent='Sending verification code...'; await sendEmail({type:'verification',to:email,code:c}); root.innerHTML=verificationShell(p); }
    catch(e){ clearPending(); if(msg) msg.textContent='Email could not be sent. Please try again.'; console.error(e); }
  };

  const labelSelect = (id, value='')=>`<select class="field address-label-select" id="${id}" required><option value="">Choose address name</option>${['Home','Office','Parents house','Family house','Work','Other'].map(o=>`<option value="${o}" ${String(value||'')===o?'selected':''}>${o}</option>`).join('')}</select>`;
  function clearFieldError(el){ if(!el) return; el.classList.remove('field-required-error'); const n=el.parentElement?.querySelector(`.field-error-message[data-for="${el.id}"]`); if(n) n.remove(); }
  function setFieldError(el){ if(!el) return; clearFieldError(el); el.classList.add('field-required-error'); el.insertAdjacentHTML('afterend',`<p class="field-error-message" data-for="${el.id}">This field is required.</p>`); }
  function requiredAddressFields(prefix){ return ['Label','City','Street','Building','Floor','Apartment'].map(n=>document.getElementById(prefix+n)).filter(Boolean); }
  window.nitaValidateAddressRequired = function(prefix){ let ok=true; requiredAddressFields(prefix).forEach(el=>{ if(!String(el.value||'').trim()){ setFieldError(el); ok=false; } else clearFieldError(el); }); return ok; };
  document.addEventListener('input', e=>{ if(e.target?.matches('.field-required-error')) clearFieldError(e.target); });
  document.addEventListener('change', e=>{ if(e.target?.matches('.field-required-error')) clearFieldError(e.target); });

  const addressFormMarkup = (prefix)=>`<div class="checkout-address-form-holder"><div class="premium-address-form"><div class="form-grid two"><div class="full"><label>Address name</label>${labelSelect(prefix+'Label')}</div><div><label>City</label><input class="field" id="${prefix}City" placeholder="City" required></div><div><label>Street name</label><input class="field" id="${prefix}Street" placeholder="Street name" required></div><div><label>Building</label><input class="field" id="${prefix}Building" placeholder="Building name / number" required></div><div><label>Floor</label><input class="field" id="${prefix}Floor" placeholder="Floor" required></div><div><label>Apartment / door</label><input class="field" id="${prefix}Apartment" placeholder="Apartment / door number" required></div><div><label>Nearby landmark</label><input class="field" id="${prefix}Landmark" placeholder="Optional"></div><div class="full"><label>Delivery notes</label><textarea class="field" id="${prefix}Notes" placeholder="Optional"></textarea></div></div><label class="save-address"><input type="checkbox" id="checkoutSaveAddress" checked> Save this address for future orders</label><div class="address-form-actions"><button class="btn" type="button" onclick="nitaSaveCheckoutAddress()">SAVE DELIVERY ADDRESS</button><button class="btn light" type="button" onclick="nitaCancelCheckoutAddressForm()">CANCEL</button></div></div></div>`;
  const oldShowAddressForm = window.nitaShowCheckoutAddressForm;
  window.nitaShowCheckoutAddressForm = function(){ const area=document.getElementById('checkoutAddressArea'); if(!area){ if(oldShowAddressForm) return oldShowAddressForm.apply(this,arguments); return; } window.nitaCheckoutMode='new'; area.querySelector('.checkout-address-form-holder')?.remove(); area.insertAdjacentHTML('beforeend', addressFormMarkup('checkoutAddr')); };
  const oldSaveAddress = window.nitaSaveCheckoutAddress;
  window.nitaSaveCheckoutAddress = async function(){ if(!window.nitaValidateAddressRequired('checkoutAddr')) return false; if(oldSaveAddress) return oldSaveAddress.apply(this,arguments); return false; };

  const oldAccountAddressFields = window.accountAddressFields;
  window.accountAddressFields = function(prefix, addr={}){
    const html = oldAccountAddressFields ? oldAccountAddressFields(prefix, addr) : '';
    if(!html) return html;
    return html.replace(new RegExp(`<input class="field" id="${prefix}Label"[^>]*>`), `<label>Address name</label>${labelSelect(prefix+'Label', addr.label||'')}`);
  };
})();
/* === END NITA STYLE PREMIUM AUTH / ADDRESS VALIDATION ONLY === */

/* === NITA STYLE TARGETED FIX: premium login + dropdown address labels + required field errors === */
(function(){
  const ADDRESS_LABELS = ['Home','Office','Work','Family house','Parents house','Apartment','Other'];
  const safe = (v)=>String(v ?? '').replace(/[&<>"]/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
  const readJSON = (k,d)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d));}catch(e){return d;}};
  const writeJSON = (k,v)=>localStorage.setItem(k, JSON.stringify(v));
  const currentEmail = ()=>String((window.currentUser&&window.currentUser.email)||localStorage.getItem('nitaSessionEmail')||(readJSON('nitaUser',{})||{}).email||'').trim().toLowerCase();
  const getUsers = ()=>readJSON('nitaUsersByEmail',{});
  const persistUsers = async (users)=>{ writeJSON('nitaUsersByEmail', users); const email=currentEmail(); if(email&&users[email]){ writeJSON('nitaUser', users[email]); try{window.currentUser=users[email];}catch(e){} } try{ if(typeof window.saveCloudKey==='function') await window.saveCloudKey('nitaUsersByEmail', users); else if(typeof window.nitaSaveKeyStrict==='function') await window.nitaSaveKeyStrict('nitaUsersByEmail', users); }catch(e){ console.warn('Address saved locally; cloud sync pending.', e); } };
  const activeUser = ()=>{ const users=getUsers(); const email=currentEmail(); let u=email ? users[email] : null; if(!u){ u=readJSON('nitaUser', null); } if(u&&u.email){ u.email=String(u.email).trim().toLowerCase(); } return u; };
  const getAddresses = (u)=>{ const list=Array.isArray(u?.addresses)?u.addresses.filter(Boolean):[]; if(list.length) return list; if(u?.defaultAddress&&Object.keys(u.defaultAddress).length) return [{label:u.defaultAddress.label||'Home',...u.defaultAddress}]; return []; };
  const labelSelect = (id, value='') => `<select class="field address-label-select" id="${id}" required><option value="">Choose address name</option>${ADDRESS_LABELS.map(x=>`<option value="${safe(x)}" ${String(value||'')===x?'selected':''}>${safe(x)}</option>`).join('')}</select>`;
  function clearError(el){ if(!el) return; el.classList.remove('field-required-error'); const old=el.parentElement?.querySelector(`.field-error-message[data-for="${el.id}"]`); if(old) old.remove(); }
  function markError(el){ if(!el) return; clearError(el); el.classList.add('field-required-error'); el.insertAdjacentHTML('afterend', `<p class="field-error-message" data-for="${el.id}">This field is required.</p>`); }
  const reqIds = (prefix)=>['Label','City','Street','Building','Floor','Apartment'].map(x=>prefix+x);
  function validateAddressForm(prefix){ let ok=true; reqIds(prefix).forEach(id=>{ const el=document.getElementById(id); if(el && !String(el.value||'').trim()){ markError(el); ok=false; } else if(el) clearError(el); }); return ok; }
  function collect(prefix){ return { label:document.getElementById(prefix+'Label')?.value?.trim()||'', city:document.getElementById(prefix+'City')?.value?.trim()||'', street:document.getElementById(prefix+'Street')?.value?.trim()||'', building:document.getElementById(prefix+'Building')?.value?.trim()||'', floor:document.getElementById(prefix+'Floor')?.value?.trim()||'', apartment:document.getElementById(prefix+'Apartment')?.value?.trim()||'', landmark:document.getElementById(prefix+'Landmark')?.value?.trim()||'', notes:document.getElementById(prefix+'Notes')?.value?.trim()||'' }; }
  function addressForm(prefix, addr={}, opts={}){ addr={label:'',city:'',street:'',building:'',floor:'',apartment:'',landmark:'',notes:'',...addr}; return `<div class="checkout-address-form-holder"><div class="premium-address-form"><div class="form-grid two"><div class="full"><label>Address name</label>${labelSelect(prefix+'Label', addr.label)}</div><div><label>City</label><input class="field" id="${prefix}City" placeholder="City" value="${safe(addr.city)}" required></div><div><label>Street name</label><input class="field" id="${prefix}Street" placeholder="Street name" value="${safe(addr.street)}" required></div><div><label>Building</label><input class="field" id="${prefix}Building" placeholder="Building name / number" value="${safe(addr.building)}" required></div><div><label>Floor</label><input class="field" id="${prefix}Floor" placeholder="Floor" value="${safe(addr.floor)}" required></div><div><label>Apartment / door</label><input class="field" id="${prefix}Apartment" placeholder="Apartment / door number" value="${safe(addr.apartment)}" required></div><div><label>Nearby landmark</label><input class="field" id="${prefix}Landmark" placeholder="Optional" value="${safe(addr.landmark)}"></div><div class="full"><label>Delivery notes</label><textarea class="field" id="${prefix}Notes" placeholder="Optional">${safe(addr.notes)}</textarea></div></div>${opts.checkout?'<label class="save-address"><input type="checkbox" id="checkoutSaveAddress" checked> Save this address for future orders</label>':''}<div class="address-form-actions"><button class="btn" type="button" onclick="${opts.checkout?'nitaSaveCheckoutAddress()':'nitaSaveAccountAddress()'}">SAVE ADDRESS</button>${opts.cancel?`<button class="btn light" type="button" onclick="${opts.checkout?'nitaCancelCheckoutAddressForm()':'nitaCancelAccountAddressForm()'}">CANCEL</button>`:''}</div></div></div>`; }
  document.addEventListener('input', e=>{ if(e.target?.classList?.contains('field-required-error')) clearError(e.target); }, true);
  document.addEventListener('change', e=>{ if(e.target?.classList?.contains('field-required-error')) clearError(e.target); }, true);
  window.nitaShowCheckoutAddressForm = function(){ const area=document.getElementById('checkoutAddressArea'); if(!area) return; window.nitaCheckoutMode='new'; area.querySelector('.checkout-address-form-holder')?.remove(); area.insertAdjacentHTML('beforeend', addressForm('checkoutAddr', {}, {checkout:true,cancel:true})); };
  window.nitaSaveCheckoutAddress = async function(){ if(!validateAddressForm('checkoutAddr')) return false; const user=activeUser(); const addr=collect('checkoutAddr'); window.nitaSelectedCheckoutAddress=0; window.nitaCheckoutNewAddress=addr; if(user?.email && document.getElementById('checkoutSaveAddress')?.checked){ const users=getUsers(); const email=user.email.toLowerCase(); const saved={...(users[email]||user)}; const addresses=getAddresses(saved); addresses.push(addr); saved.addresses=addresses; saved.defaultAddress=addresses[0]||addr; users[email]=saved; await persistUsers(users); } if(typeof window.nitaRenderCheckoutAddressArea==='function') window.nitaRenderCheckoutAddressArea(); if(typeof toast==='function') toast('Delivery address saved.'); return true; };
  window.nitaShowAccountAddressForm = function(index){ const user=activeUser(); if(!user) return; const addresses=getAddresses(user); const editing=Number.isInteger(index)&&index>=0; window.nitaEditingAccountAddress=editing?index:null; const box=document.getElementById('accountAddressFormBox'); if(box){ box.innerHTML=addressForm('accountAddr', editing?addresses[index]:{}, {cancel:true}); box.classList.add('open'); } };
  window.nitaSaveAccountAddress = async function(){ if(!validateAddressForm('accountAddr')) return false; const user=activeUser(); if(!user?.email) return false; const users=getUsers(); const email=user.email.toLowerCase(); const saved={...(users[email]||user)}; const addresses=getAddresses(saved).slice(); const addr=collect('accountAddr'); const idx=window.nitaEditingAccountAddress; if(Number.isInteger(idx)&&idx>=0) addresses[idx]=addr; else addresses.push(addr); saved.addresses=addresses; saved.defaultAddress=addresses[0]||addr; users[email]=saved; await persistUsers(users); window.nitaEditingAccountAddress=null; if(typeof toast==='function') toast('Address saved.'); if(typeof renderAccount==='function') renderAccount(); return true; };

  const previousRenderLoginPage = window.renderLoginPage;
  function hasPendingVerification(){ const p=readJSON('nitaPendingSignup',null); return !!(p&&p.awaitingVerification); }
  function premiumLoginShell(mode='signin'){
    const isSignup=mode==='signup';
    return `<section class="auth-premium-final"><div class="auth-panel-left"><img src="assets/logo-cropped.png" alt="Nita Style"><p class="eyebrow">Private boutique account</p><h1>${isSignup?'Create your Nita Style account':'Welcome back'}</h1><p class="muted">${isSignup?'Create an account to save delivery addresses, follow every order, and receive your first-order code.':'Sign in to manage addresses, track orders, and keep your liked pieces saved.'}</p><div class="auth-benefits"><span>Saved delivery details</span><span>Order tracking</span><span>First-order code</span></div></div><div class="auth-panel-card"><div class="auth-tabs premium-tabs"><button class="${!isSignup?'active':''}" type="button" onclick="switchAuthMode('signin')">SIGN IN</button><button class="${isSignup?'active':''}" type="button" onclick="switchAuthMode('signup')">CREATE ACCOUNT</button></div><div id="authMessage" class="auth-message"></div><div class="premium-auth-fields"><label>Email address</label><input id="authEmail" class="field" type="email" autocomplete="email" placeholder="you@example.com"><label>Password</label><input id="authPassword" class="field" type="password" autocomplete="${isSignup?'new-password':'current-password'}" placeholder="Password"><div id="signupFields" style="display:${isSignup?'block':'none'}"><div class="form-grid"><div><label>First name</label><input id="authFirst" class="field" placeholder="First name"></div><div><label>Last name</label><input id="authLast" class="field" placeholder="Last name"></div></div><label>Phone number</label><input id="authPhone" class="field" placeholder="Phone number"></div><button class="btn auth-submit" type="button" onclick="submitAuth()">${isSignup?'CREATE ACCOUNT':'SIGN IN'}</button><p class="muted mini-note">Your email is used only for account access, verification, and order updates.</p></div></div></section>`;
  }
  window.renderLoginPage = function(mode){ const root=document.getElementById('loginRoot'); if(!root) return; if(hasPendingVerification() && typeof previousRenderLoginPage==='function') return previousRenderLoginPage(mode); root.innerHTML=premiumLoginShell(mode||'signin'); };
  window.switchAuthMode = function(mode){ try{localStorage.removeItem('nitaPendingSignup');}catch(e){} window.renderLoginPage(mode); };
})();
/* === END NITA STYLE TARGETED FIX === */


/* === NITA STYLE TARGETED AUTH ENTRY + DELETE ACCOUNT CONFIRM ONLY 2026-06-11 ===
   Only changes: top SIGN IN goes directly to premium login, removes auth badges/eyebrow,
   and adds safe permanent account deletion confirmation. */
(function(){
  const esc = (v='') => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const readJSON = (k,d)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d));}catch(e){return d;}};
  const writeJSON = (k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){console.warn(e);}};
  const norm = (v='')=>String(v||'').trim().toLowerCase();
  const getCurrentEmail = ()=>norm((window.currentUser&&window.currentUser.email)||localStorage.getItem('nitaSessionEmail')||(readJSON('nitaUser',{})||{}).email||'');

  const previousHeaderForDirectLogin = window.header;
  window.header = function(){
    let html = previousHeaderForDirectLogin ? previousHeaderForDirectLogin.apply(this, arguments) : '';
    if(!getCurrentEmail()){
      html = html.replace(/<a class="account-nav-link" href="account\.html">SIGN IN<\/a>/g, '<a class="account-nav-link" href="login.html">SIGN IN</a>');
      html = html.replace(/<a href="account\.html">SIGN IN<\/a>/g, '<a href="login.html">SIGN IN</a>');
    }
    return html;
  };

  const previousRenderAccountForAuthEntry = window.renderAccount;
  window.renderAccount = async function(){
    if(!getCurrentEmail()){
      window.location.href = 'login.html';
      return;
    }
    if(previousRenderAccountForAuthEntry) return previousRenderAccountForAuthEntry.apply(this, arguments);
  };

  const previousRenderLoginForVerification = window.renderLoginPage;
  function hasPendingVerification(){
    const p = readJSON('nitaPendingSignup', null);
    return !!(p && p.awaitingVerification);
  }
  function premiumAuthClean(mode='signin'){
    const isSignup = mode === 'signup';
    return `<section class="auth-premium-final auth-premium-clean">
      <div class="auth-panel-left">
        <img src="assets/logo-cropped.png" alt="Nita Style">
        <h1>${isSignup ? 'Create your account' : 'Welcome back'}</h1>
        <p class="muted">${isSignup ? 'Create your Nita Style account to save delivery addresses and follow your orders.' : 'Sign in to manage your addresses, track orders, and keep your liked pieces saved.'}</p>
      </div>
      <div class="auth-panel-card">
        <div class="auth-tabs premium-tabs">
          <button class="${!isSignup?'active':''}" type="button" onclick="switchAuthMode('signin')">SIGN IN</button>
          <button class="${isSignup?'active':''}" type="button" onclick="switchAuthMode('signup')">CREATE ACCOUNT</button>
        </div>
        <div id="authMessage" class="auth-message"></div>
        <div class="premium-auth-fields">
          <label>Email address</label>
          <input id="authEmail" class="field" type="email" autocomplete="email" placeholder="you@example.com">
          <label>Password</label>
          <input id="authPassword" class="field" type="password" autocomplete="${isSignup?'new-password':'current-password'}" placeholder="Password">
          <div id="signupFields" style="display:${isSignup?'block':'none'}">
            <div class="form-grid"><div><label>First name</label><input id="authFirst" class="field" placeholder="First name"></div><div><label>Last name</label><input id="authLast" class="field" placeholder="Last name"></div></div>
            <label>Phone number</label><input id="authPhone" class="field" placeholder="Phone number">
          </div>
          <button class="btn auth-submit" type="button" onclick="submitAuth()">${isSignup?'CREATE ACCOUNT':'SIGN IN'}</button>
          <p class="muted mini-note">Your email is used for account access, verification, and order updates.</p>
        </div>
      </div>
    </section>`;
  }
  window.renderLoginPage = function(mode){
    const root = document.getElementById('loginRoot');
    if(!root) return;
    if(hasPendingVerification() && typeof previousRenderLoginForVerification === 'function'){
      return previousRenderLoginForVerification.apply(this, arguments);
    }
    root.innerHTML = premiumAuthClean(mode || 'signin');
  };
  window.switchAuthMode = function(mode){
    try{ localStorage.removeItem('nitaPendingSignup'); }catch(e){}
    window.renderLoginPage(mode || 'signin');
  };

  function removeLocalAccountKeys(email){
    try{
      localStorage.removeItem('nitaUser');
      localStorage.removeItem('nitaSessionEmail');
      localStorage.removeItem('nitaPendingSignup');
      Array.from({length: localStorage.length}, (_,i)=>localStorage.key(i)).filter(Boolean).forEach(k=>{
        const low = k.toLowerCase();
        if(email && (low.includes(email) || low.includes(email.replace(/[^a-z0-9]/g,'_')))) localStorage.removeItem(k);
      });
    }catch(e){console.warn(e);}
  }
  async function persistUsersAfterDelete(users){
    writeJSON('nitaUsersByEmail', users);
    if(typeof window.saveCloudKey === 'function') return window.saveCloudKey('nitaUsersByEmail', users);
    if(typeof window.nitaSaveKeyStrict === 'function') return window.nitaSaveKeyStrict('nitaUsersByEmail', users);
    if(typeof window.saveUsers === 'function') return window.saveUsers(users);
  }
  function showDeleteConfirm(){
    return new Promise(resolve=>{
      const old = document.getElementById('deleteAccountConfirmModal');
      if(old) old.remove();
      document.body.insertAdjacentHTML('beforeend', `<div id="deleteAccountConfirmModal" class="delete-account-modal-backdrop">
        <div class="delete-account-modal">
          <p class="eyebrow">Account deletion</p>
          <h2>Are you sure you want to delete your account?</h2>
          <p class="muted">This will permanently remove your saved customer profile, email address, phone number, and saved delivery information from this website database.</p>
          <div class="delete-account-actions">
            <button class="btn light" type="button" id="deleteNoBtn">NO, KEEP ACCOUNT</button>
            <button class="btn danger" type="button" id="deleteYesBtn">YES, DELETE ACCOUNT</button>
          </div>
        </div>
      </div>`);
      document.getElementById('deleteNoBtn')?.addEventListener('click',()=>{document.getElementById('deleteAccountConfirmModal')?.remove(); resolve(false);});
      document.getElementById('deleteYesBtn')?.addEventListener('click',()=>{document.getElementById('deleteAccountConfirmModal')?.remove(); resolve(true);});
    });
  }
  window.deleteAccount = async function(){
    const email = getCurrentEmail();
    if(!email) { window.location.href='login.html'; return; }
    const ok = await showDeleteConfirm();
    if(!ok) return;
    const users = readJSON('nitaUsersByEmail', {});
    delete users[email];
    try{ await persistUsersAfterDelete(users); }catch(e){ console.warn('Cloud delete sync failed; local deletion completed.', e); }
    removeLocalAccountKeys(email);
    try{ window.currentUser = null; }catch(e){}
    try{ if(typeof toast==='function') toast('Your account has been deleted.'); }catch(e){}
    window.location.href = 'login.html';
  };
})();
/* === END NITA STYLE TARGETED AUTH ENTRY + DELETE ACCOUNT CONFIRM ONLY === */

/* === NITA STYLE ADD PRODUCT FORM ONLY FIX 2026-06-11 ===
   Restores the admin Add Product form inside the current dashboard section.
   Does not change product saving, cart, checkout, emails, layout, or other features. */
(function(){
  function esc(v){return String(v ?? '').replace(/[&<>"']/g, function(ch){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]);});}
  function opt(values, selected){
    return values.map(function(v){
      var value = Array.isArray(v) ? v[0] : v;
      var label = Array.isArray(v) ? v[1] : v;
      return '<option value="'+esc(value)+'" '+(String(value)===String(selected||'')?'selected':'')+'>'+esc(label)+'</option>';
    }).join('');
  }
  function pills(values, selected){
    selected = Array.isArray(selected) ? selected.map(String) : [];
    return values.map(function(v){return '<button type="button" class="pill '+(selected.includes(String(v))?'on':'')+'" onclick="this.classList.toggle(\'on\')">'+esc(v)+'</button>';}).join('');
  }
  function addProductFormHTML(){
    var cats = window.ADMIN_CATEGORIES || ['Dresses','Skirts','T-Shirts','Tops','Pants','Bags','Scarves','Overalls'];
    var cols = window.ADMIN_COLLECTIONS || ['New Arrivals','Everyday Edit','Summer Pieces','Minimal Essentials','Accessories','Sale'];
    var colors = window.NITA_COLOR_OPTIONS || ['Black','White','Ivory','Cream','Beige','Taupe','Grey','Silver','Gold','Rose Gold','Bronze','Brown','Cognac','Camel','Navy','Blue','Denim Blue','Red','Burgundy','Pink','Green','Olive','Khaki','Yellow','Orange','Purple','Print / Pattern','Multi-color'];
    var styles = window.NITA_STYLE_OPTIONS || ['Clean everyday piece','Elegant evening piece','Minimal essential','Soft feminine silhouette','Relaxed boutique fit','Premium casual look','Statement piece','Light summer piece','Structured tailored style'];
    return '<div class="admin-form admin-add-product-form" data-add-product-form="true">'
      + '<div class="full"><label>Product photos</label><div class="upload-zone"><input id="pphotos" type="file" accept="image/*" multiple onchange="previewAdminPhotos && previewAdminPhotos(event)"><p><b>Upload product photos</b><br><span class="muted">Select one or multiple photos. The first selected photo is used as the main image.</span></p></div><div class="photo-preview" id="photoPreview"></div></div>'
      + '<div><label>Product name</label><input id="pname" class="field" placeholder="Example: Roma Linen Shirt"></div>'
      + '<div><label>Regular price</label><input id="pprice" class="field" type="number" step="0.01" min="0" placeholder="Example: 58"></div>'
      + '<div><label>Sale / price-drop price</label><input id="psale" class="field" type="number" step="0.01" min="0" placeholder="Optional"></div>'
      + '<div><label>Product availability</label><select id="pstatus" class="field"><option value="in-stock">In stock</option><option value="coming-soon">Coming soon</option><option value="out-of-stock">Out of stock</option></select></div>'
      + '<div><label>Product category</label><select id="pcat" class="field">'+opt(cats,'Tops')+'</select></div>'
      + '<div><label>Collection</label><select id="pcollection" class="field">'+opt(cols,'Everyday Edit')+'</select></div>'
      + '<div><label>Color</label><select id="pcolor" class="field">'+opt(colors,'Black')+'</select></div>'
      + '<div><label>Style note</label><select id="pstyle" class="field">'+opt(styles,'Clean everyday piece')+'</select></div>'
      + '<div><label>Homepage section</label><select id="phome" class="field"><option value="trending-now">Trending Now</option><option value="new-arrivals">New Arrivals</option></select></div>'
      + '<div><label>Private quantity in stock</label><input id="pquantity" class="field" type="number" min="0" step="1" placeholder="Example: 15"><p class="field-help">Only admin sees this number. It decreases automatically after orders.</p></div>'
      + '<div class="full"><label>Product sizes</label><p class="field-help">Select every size that exists for this product.</p><div id="sizePicker" class="size-picker" data-ready="1">'+pills(['XS','S','M','L','XL','One Size'],['S','M','L'])+'</div></div>'
      + '<div class="full admin-size-oos-wrap"><label>Out-of-stock sizes</label><p class="field-help">These sizes will be disabled for customers.</p><div id="sizeOutPicker" class="size-picker" data-ready="1">'+pills(['XS','S','M','L','XL','One Size'],[])+'</div></div>'
      + '<div class="full"><label>Description</label><textarea id="pdesc" class="field" placeholder="Write a clean product description"></textarea></div>'
      + '</div>';
  }
  function ensureAddProductForm(){
    var box = document.getElementById('addProductBox') || document.querySelector('.admin-section-page[data-section="add"]');
    if(!box) return;
    if(!box.querySelector('.admin-add-product-form')){
      var toolbar = box.querySelector('.admin-toolbar');
      if(toolbar) toolbar.insertAdjacentHTML('afterend', addProductFormHTML());
      else box.insertAdjacentHTML('afterbegin', addProductFormHTML());
    }
    var button = box.querySelector('button[onclick="addProductAdmin()"], button[onclick="window.addProductAdmin()"]');
    if(!button){
      box.insertAdjacentHTML('beforeend','<button class="btn" type="button" onclick="addProductAdmin()">ADD PRODUCT TO WEBSITE</button>');
    }else{
      button.setAttribute('type','button');
      button.textContent = 'ADD PRODUCT TO WEBSITE';
    }
  }
  window.nitaEnsureAddProductForm = ensureAddProductForm;
  var previousRenderAdminForAddProductForm = window.renderAdmin;
  if(typeof previousRenderAdminForAddProductForm === 'function'){
    window.renderAdmin = async function(){
      var result = await previousRenderAdminForAddProductForm.apply(this, arguments);
      ensureAddProductForm();
      return result;
    };
  }
  var previousShowAdminSectionForAddProductForm = window.showAdminSection;
  if(typeof previousShowAdminSectionForAddProductForm === 'function'){
    window.showAdminSection = function(name){
      var result = previousShowAdminSectionForAddProductForm.apply(this, arguments);
      if(name === 'add') setTimeout(ensureAddProductForm, 0);
      return result;
    };
  }
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(ensureAddProductForm, 300); });
  window.addEventListener('load', function(){ setTimeout(ensureAddProductForm, 500); });
})();
/* === END NITA STYLE ADD PRODUCT FORM ONLY FIX 2026-06-11 === */


/* === NITA STYLE ADMIN ORDER ROADMAP ONLY FIX 2026-06-11 ===
   Adds the same order roadmap visibility to admin dashboard order cards.
   Does not change order saving, product, checkout, customer account, or email logic. */
(function(){
  const ADMIN_ROADMAP_STEPS = ['Order submitted','Confirmed','Packing','Out for delivery','Delivered'];
  function escAdminRoadmap(v){
    return String(v ?? '').replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }
  function normalizeAdminStatus(status){
    const s = String(status || 'Order submitted').trim();
    if(/^new order$/i.test(s)) return 'Order submitted';
    if(/^preparing$/i.test(s)) return 'Packing';
    return s || 'Order submitted';
  }
  function adminRoadmapHtml(status){
    const current = normalizeAdminStatus(status);
    if(/^cancelled$/i.test(current)){
      return '<div class="admin-order-roadmap"><span class="admin-road-step cancelled">Cancelled</span></div>';
    }
    let idx = ADMIN_ROADMAP_STEPS.findIndex(function(s){ return s.toLowerCase() === current.toLowerCase(); });
    if(idx < 0) idx = 0;
    return '<div class="admin-order-roadmap" aria-label="Order roadmap">' + ADMIN_ROADMAP_STEPS.map(function(step, i){
      const cls = i < idx ? 'done' : (i === idx ? 'active' : '');
      return '<span class="admin-road-step '+cls+'">' + escAdminRoadmap(step) + '</span>';
    }).join('') + '</div>';
  }
  window.nitaAdminRoadmapHtml = adminRoadmapHtml;
  function getAdminOrders(){
    try{
      if(typeof getJSON === 'function') return getJSON('nitaOrders', []) || [];
      return JSON.parse(localStorage.getItem('nitaOrders') || '[]');
    }catch(e){ return []; }
  }
  function applyAdminRoadmaps(){
    if(!/admin\.html$/i.test(location.pathname)) return;
    const orders = getAdminOrders();
    const cards = Array.from(document.querySelectorAll('.admin-section-page[data-section="orders"] .admin-list-card'));
    cards.forEach(function(card, index){
      if(card.querySelector('.admin-order-roadmap')) return;
      const order = orders[index];
      if(!order) return;
      const firstColumn = card.querySelector('div');
      if(firstColumn){
        const anchor = firstColumn.querySelector('p');
        if(anchor) anchor.insertAdjacentHTML('afterend', adminRoadmapHtml(order.status));
        else firstColumn.insertAdjacentHTML('beforeend', adminRoadmapHtml(order.status));
      }
    });
    const rows = Array.from(document.querySelectorAll('tr.admin-order-row'));
    rows.forEach(function(row, index){
      if(row.querySelector('.admin-order-roadmap')) return;
      const order = orders[index];
      const cell = row.querySelector('td');
      if(cell && order) cell.insertAdjacentHTML('beforeend', adminRoadmapHtml(order.status));
    });
  }
  const previousRenderAdminForRoadmaps = window.renderAdmin;
  window.renderAdmin = async function(){
    if(typeof previousRenderAdminForRoadmaps === 'function'){
      await previousRenderAdminForRoadmaps.apply(this, arguments);
    }
    applyAdminRoadmaps();
  };
  const previousShowAdminSectionForRoadmaps = window.showAdminSection;
  window.showAdminSection = function(section){
    const result = previousShowAdminSectionForRoadmaps ? previousShowAdminSectionForRoadmaps.apply(this, arguments) : undefined;
    if(section === 'orders') setTimeout(applyAdminRoadmaps, 0);
    return result;
  };
  const previousUpdateOrderForRoadmaps = window.updateOrder;
  window.updateOrder = async function(index, status){
    const result = previousUpdateOrderForRoadmaps ? await previousUpdateOrderForRoadmaps.apply(this, arguments) : undefined;
    setTimeout(applyAdminRoadmaps, 0);
    return result;
  };
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(applyAdminRoadmaps, 300); });
})();
/* === END NITA STYLE ADMIN ORDER ROADMAP ONLY FIX === */


/* === NITA STYLE VERIFICATION RESEND TIMER ONLY 2026-06-11 ===
   Adds a 60-second resend timer on the standalone verification page only.
   Does not change account creation, emails, products, cart, admin, checkout, or design logic. */
(function(){
  const readJSON=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d));}catch(e){return d;}};
  const writeJSON=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){console.warn(e);}};
  const safe=(v='')=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const COOLDOWN=60000;
  let timerId=null;
  function pending(){return readJSON('nitaPendingSignup',null);}
  function remainingMs(){const p=pending(); if(!p||!p.awaitingVerification)return 0; const base=Number(p.codeSentAt||p.createdAt||Date.now()); return Math.max(0, COOLDOWN-(Date.now()-base));}
  function format(ms){const sec=Math.ceil(ms/1000); return '0:'+String(sec).padStart(2,'0');}
  function verificationTimerShell(p){return `<section class="verify-page-shell">
    <div class="verify-card">
      <img src="assets/logo-cropped.png" alt="Nita Style" class="verify-logo">
      <p class="eyebrow">Email verification</p>
      <h1>Enter your code</h1>
      <p class="muted">We sent a six-digit verification code to <b>${safe(p?.email||'your email')}</b>. Enter it below to activate your account.</p>
      <div id="authMessage" class="auth-message"></div>
      <input id="authCode" class="field verify-code-field" inputmode="numeric" maxlength="6" placeholder="000000" autocomplete="one-time-code">
      <button class="btn auth-submit" type="button" onclick="submitAuth()">VERIFY & CREATE ACCOUNT</button>
      <div class="verify-resend-row">
        <button id="nitaResendCodeBtn" class="btn light" type="button" onclick="resendVerificationCode()" disabled>SEND A NEW CODE</button>
        <div id="nitaVerifyTimer" class="verify-timer">You can request a new code in <strong>1:00</strong></div>
      </div>
      <button class="link-button" type="button" onclick="clearPendingSignupAndReturn()">Edit email address</button>
    </div>
  </section>`;}
  function startTimer(){
    if(timerId) clearInterval(timerId);
    const btn=document.getElementById('nitaResendCodeBtn');
    const txt=document.getElementById('nitaVerifyTimer');
    function tick(){
      const left=remainingMs();
      if(!btn||!txt){ if(timerId) clearInterval(timerId); return; }
      if(left>0){ btn.disabled=true; txt.innerHTML='You can request a new code in <strong>'+format(left)+'</strong>'; }
      else{ btn.disabled=false; txt.innerHTML='You can request a new code now.'; if(timerId) clearInterval(timerId); }
    }
    tick(); timerId=setInterval(tick,500);
  }
  const previousRenderLoginPage=window.renderLoginPage;
  window.renderLoginPage=function(mode){
    const root=document.getElementById('loginRoot');
    const p=pending();
    if(root && p && p.awaitingVerification){
      if(!p.codeSentAt){p.codeSentAt=p.createdAt||Date.now(); writeJSON('nitaPendingSignup',p);}
      root.innerHTML=verificationTimerShell(p);
      setTimeout(()=>{document.getElementById('authCode')?.focus(); startTimer();},40);
      return;
    }
    if(typeof previousRenderLoginPage==='function') return previousRenderLoginPage.apply(this, arguments);
  };
  const previousResend=window.resendVerificationCode;
  window.resendVerificationCode=async function(){
    const msg=document.getElementById('authMessage');
    const left=remainingMs();
    if(left>0){ if(msg) msg.textContent='Please wait until the timer finishes before requesting a new code.'; startTimer(); return; }
    const btn=document.getElementById('nitaResendCodeBtn'); if(btn) btn.disabled=true;
    if(typeof previousResend==='function'){
      await previousResend.apply(this, arguments);
      const p=pending(); if(p){p.codeSentAt=Date.now(); p.createdAt=p.codeSentAt; writeJSON('nitaPendingSignup',p);}
      window.renderLoginPage();
      const m=document.getElementById('authMessage'); if(m) m.textContent='A new verification code has been sent.';
    }
  };
  document.addEventListener('DOMContentLoaded',()=>{ if(document.getElementById('nitaVerifyTimer')) startTimer(); });
})();
/* === END NITA STYLE VERIFICATION RESEND TIMER ONLY === */

// === NITA STYLE SMOOTHER LOADING FINAL PATCH ===
// Speeds up every page without changing features by preventing repeated cloud database fetches
// during one page load, using a short session cache, and refreshing the live database in the background.
(function(){
  const CACHE_KEY = 'nitaStoreFastCache_v2';
  const CACHE_TTL = 5 * 60 * 1000;
  const LIVE_KEYS = ['nitaProducts','nitaOrders','nitaCoupons','nitaUsersByEmail','nitaDiscountUses','nitaHomepageWallpapers'];
  const originalFetchStore = window.nitaFetchStore;
  let sharedPromise = null;
  let lastLoadedAt = 0;

  function readJSON(k, fallback){ try { return JSON.parse(sessionStorage.getItem(k) || 'null') || fallback; } catch(e){ return fallback; } }
  function writeJSON(k, v){ try { sessionStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
  function applyStore(store){
    if(!store || typeof store !== 'object') return;
    LIVE_KEYS.forEach(function(key){
      if(store[key] !== undefined){
        try { localStorage.setItem(key, JSON.stringify(store[key])); } catch(e){}
      }
    });
    window.nitaBackendOnline = true;
    window.nitaStoreLoaded = true;
    try { document.body && document.body.classList.add('cloud-online'); document.body && document.body.classList.remove('cloud-offline'); } catch(e){}
  }
  function localSnapshot(){
    const out = {};
    LIVE_KEYS.forEach(function(key){
      try { out[key] = JSON.parse(localStorage.getItem(key) || 'null'); } catch(e) { out[key] = null; }
    });
    return out;
  }
  function fetchWithTimeout(ms){
    if(typeof originalFetchStore !== 'function') return Promise.resolve(localSnapshot());
    return Promise.race([
      originalFetchStore(),
      new Promise(function(_, reject){ setTimeout(function(){ reject(new Error('Store fetch timeout')); }, ms); })
    ]);
  }
  function backgroundRefresh(){
    if(typeof originalFetchStore !== 'function') return;
    originalFetchStore().then(function(remote){
      applyStore(remote);
      writeJSON(CACHE_KEY, { time: Date.now(), data: remote });
      lastLoadedAt = Date.now();
      try { window.dispatchEvent(new Event('nita-store-ready')); } catch(e){}
      try {
        if(location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname.endsWith('/')){
          window.renderHomeSections && window.renderHomeSections();
        }
      } catch(e){}
    }).catch(function(err){ console.warn('Background store refresh skipped:', err); });
  }

  window.loadSharedStore = async function(){
    const now = Date.now();
    if(sharedPromise) return sharedPromise;
    if(lastLoadedAt && now - lastLoadedAt < 15000){ return localSnapshot(); }

    const cached = readJSON(CACHE_KEY, null);
    const isAdmin = location.pathname.endsWith('admin.html');
    const hasFreshCache = cached && cached.data && (now - cached.time < CACHE_TTL);

    if(hasFreshCache && !isAdmin){
      applyStore(cached.data);
      lastLoadedAt = now;
      setTimeout(backgroundRefresh, 250);
      return cached.data;
    }

    sharedPromise = (async function(){
      try{
        const remote = await fetchWithTimeout(isAdmin ? 4500 : 1600);
        applyStore(remote);
        writeJSON(CACHE_KEY, { time: Date.now(), data: remote });
        lastLoadedAt = Date.now();
        return remote;
      }catch(err){
        const fallback = cached && cached.data ? cached.data : localSnapshot();
        applyStore(fallback);
        window.nitaBackendOnline = cached && cached.data ? true : false;
        lastLoadedAt = Date.now();
        setTimeout(backgroundRefresh, 100);
        return fallback;
      }finally{
        setTimeout(function(){ sharedPromise = null; }, 50);
      }
    })();
    return sharedPromise;
  };

  // Preload the live store as soon as the browser is idle so clicks between pages feel faster.
  const idle = window.requestIdleCallback || function(fn){ return setTimeout(fn, 800); };
  idle(function(){ try{ window.loadSharedStore(); }catch(e){} });
})();
// === END NITA STYLE SMOOTHER LOADING FINAL PATCH ===


/* === NITA STYLE VISIBLE TIMER + SMOOTH MARQUEE + FIRST LOAD RELIABILITY ONLY === */
(function(){
  const COOLDOWN = 60000;
  const PENDING_KEY = 'nitaPendingSignup';
  function readJSON(k,f){ try{return JSON.parse(localStorage.getItem(k)||'null')||f;}catch(e){return f;} }
  function writeJSON(k,v){ try{localStorage.setItem(k,JSON.stringify(v));}catch(e){} }
  function safe(s){return String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function pending(){ return readJSON(PENDING_KEY,null); }
  function format(ms){ const t=Math.max(0,Math.ceil(ms/1000)); return '0:' + String(t).padStart(2,'0'); }
  function left(){ const p=pending(); if(!p||!p.awaitingVerification) return 0; const started=Number(p.codeSentAt||p.createdAt||Date.now()); return Math.max(0, COOLDOWN - (Date.now()-started)); }
  function visibleVerificationHTML(p){
    return '<section class="verify-page-shell visible-verification-page">'
      + '<div class="verify-card premium-verify-card">'
      + '<img src="assets/logo-cropped.png" alt="Nita Style" class="verify-logo">'
      + '<p class="eyebrow">Email verification</p>'
      + '<h1>Enter your code</h1>'
      + '<p class="muted">We sent a six-digit verification code to <b>'+safe(p&&p.email||'your email')+'</b>. Enter it below to activate your account.</p>'
      + '<div id="authMessage" class="auth-message"></div>'
      + '<input id="authCode" class="field verify-code-field" inputmode="numeric" maxlength="6" placeholder="000000" autocomplete="one-time-code">'
      + '<button class="btn auth-submit" type="button" onclick="submitAuth()">VERIFY & CREATE ACCOUNT</button>'
      + '<div class="verify-timer-box"><span id="nitaVerifyTimer" class="verify-timer">You can request a new code in <strong>1:00</strong></span></div>'
      + '<button id="nitaResendCodeBtn" class="btn light resend-code-btn" type="button" onclick="resendVerificationCode()" disabled>SEND A NEW CODE</button>'
      + '<p class="muted mini-note">For your security, the resend button unlocks after one minute.</p>'
      + '</div></section>';
  }
  let timerInterval=null;
  function startVisibleTimer(){
    if(timerInterval) clearInterval(timerInterval);
    const tick=function(){
      const btn=document.getElementById('nitaResendCodeBtn');
      const txt=document.getElementById('nitaVerifyTimer');
      if(!btn || !txt){ clearInterval(timerInterval); timerInterval=null; return; }
      const remaining=left();
      if(remaining>0){
        btn.disabled=true;
        btn.classList.add('disabled');
        txt.innerHTML='You can request a new code in <strong>'+format(remaining)+'</strong>';
      }else{
        btn.disabled=false;
        btn.classList.remove('disabled');
        txt.innerHTML='<strong>You can request a new code now.</strong>';
        clearInterval(timerInterval); timerInterval=null;
      }
    };
    tick(); timerInterval=setInterval(tick,250);
  }
  const previousRenderLoginPage = window.renderLoginPage;
  window.renderLoginPage = function(){
    const root=document.getElementById('loginRoot');
    const p=pending();
    if(root && p && p.awaitingVerification){
      if(!p.codeSentAt){ p.codeSentAt=p.createdAt||Date.now(); writeJSON(PENDING_KEY,p); }
      root.innerHTML=visibleVerificationHTML(p);
      setTimeout(function(){ document.getElementById('authCode')?.focus(); startVisibleTimer(); }, 30);
      return;
    }
    return previousRenderLoginPage && previousRenderLoginPage.apply(this, arguments);
  };
  const previousSubmitAuth = window.submitAuth;
  window.submitAuth = async function(){
    const result = previousSubmitAuth ? await previousSubmitAuth.apply(this, arguments) : undefined;
    try{
      const p=pending();
      if(document.getElementById('loginRoot') && p && p.awaitingVerification){
        if(!p.codeSentAt){ p.codeSentAt=p.createdAt||Date.now(); writeJSON(PENDING_KEY,p); }
        window.renderLoginPage();
      }
    }catch(e){}
    return result;
  };
  const previousResend = window.resendVerificationCode;
  window.resendVerificationCode = async function(){
    const m=document.getElementById('authMessage');
    if(left()>0){ if(m)m.textContent='Please wait until the timer reaches 0:00 before requesting a new code.'; startVisibleTimer(); return; }
    const b=document.getElementById('nitaResendCodeBtn'); if(b)b.disabled=true;
    const res = previousResend ? await previousResend.apply(this, arguments) : undefined;
    const p=pending(); if(p){ p.codeSentAt=Date.now(); p.createdAt=p.codeSentAt; writeJSON(PENDING_KEY,p); }
    window.renderLoginPage();
    const msg=document.getElementById('authMessage'); if(msg) msg.textContent='A new verification code has been sent.';
    return res;
  };

  // Smooth, low-lag homepage auto-scroll: CSS transform only, no continuous JS animation loop.
  let marqueeScheduled=false;
  function cardWidthFor(track){ const card=track.querySelector('.product'); return card ? Math.max(160, card.getBoundingClientRect().width + 24) : 284; }
  function prepareSmoothTrack(section){
    if(!section) return;
    const track=section.querySelector('.product-marquee');
    if(!track || track.dataset.nitaSmoothFinal==='1') return;
    // Replace with a clean clone to remove older mouse/timer handlers attached by previous patches.
    const clean=track.cloneNode(true);
    clean.dataset.nitaSmoothFinal='1';
    clean.classList.remove('nita-js-marquee','nita-premium-auto','nita-force-marquee','nita-new-arrivals-only-scroll');
    clean.classList.add('nita-smooth-css-marquee');
    clean.style.transform=''; clean.style.transition=''; clean.style.animation='';
    const original=[...clean.children].filter(el=>el.classList && el.classList.contains('product'));
    if(!original.length) return;
    // Keep enough repeated cards so it never has an empty gap and remains smooth on phones/laptops.
    const approx=cardWidthFor(clean);
    const needed=Math.max(original.length*2, Math.ceil((window.innerWidth*2.4)/approx));
    let i=0;
    while(clean.children.length < needed){ clean.appendChild(original[i % original.length].cloneNode(true)); i++; }
    clean.style.setProperty('--marquee-distance', '-' + Math.max(1, Math.round((clean.scrollWidth || (needed*approx))/2)) + 'px');
    clean.style.setProperty('--marquee-duration', (section.classList.contains('new-arrivals-scroll') ? '34s' : '36s'));
    track.replaceWith(clean);
  }
  function smoothMarquees(){
    if(!document.querySelector('.trending-scroll,.new-arrivals-scroll')) return;
    prepareSmoothTrack(document.querySelector('.trending-scroll'));
    prepareSmoothTrack(document.querySelector('.new-arrivals-scroll'));
  }
  function scheduleSmoothMarquees(){
    if(marqueeScheduled) return;
    marqueeScheduled=true;
    requestAnimationFrame(function(){ marqueeScheduled=false; smoothMarquees(); });
  }
  const previousRenderHomeSections = window.renderHomeSections;
  window.renderHomeSections = function(){
    const res = previousRenderHomeSections ? previousRenderHomeSections.apply(this, arguments) : undefined;
    setTimeout(scheduleSmoothMarquees, 30);
    setTimeout(scheduleSmoothMarquees, 350);
    return res;
  };
  window.addEventListener('resize', function(){ document.querySelectorAll('.product-marquee.nita-smooth-css-marquee').forEach(t=>{t.dataset.nitaSmoothFinal='';}); setTimeout(scheduleSmoothMarquees, 120); }, {passive:true});

  // If live data arrives after the first paint, rerender only the current page so products/sections appear without refresh.
  let refreshedOnce=false;
  async function refreshCurrentPageOnce(){
    if(refreshedOnce) return; refreshedOnce=true;
    try{
      const path=location.pathname;
      if(path.endsWith('/') || path.endsWith('index.html') || path==='') { window.renderHomeSections && window.renderHomeSections(); scheduleSmoothMarquees(); }
      else if(path.endsWith('shop.html')) { window.shopPage && window.shopPage(); }
      else if(path.endsWith('product.html')) { window.productPage && window.productPage(); }
      else if(path.endsWith('liked.html')) { window.renderLikedPage && window.renderLikedPage(); }
      else if(path.endsWith('account.html')) { window.renderAccount && window.renderAccount(); }
      else if(path.endsWith('cart.html')) { window.renderFullCart && window.renderFullCart(); }
      else if(path.endsWith('checkout.html')) { window.nitaPremiumCheckoutInit && window.nitaPremiumCheckoutInit(); }
    }catch(e){ console.warn('Nita first-load refresh skipped:', e); }
    setTimeout(function(){ refreshedOnce=false; }, 2000);
  }
  window.addEventListener('nita-store-ready', refreshCurrentPageOnce);
  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(function(){ if(document.getElementById('nitaVerifyTimer')) startVisibleTimer(); scheduleSmoothMarquees(); }, 120);
    setTimeout(function(){ refreshCurrentPageOnce(); }, 900);
    setTimeout(scheduleSmoothMarquees, 1800);
  });
  window.addEventListener('load', function(){ setTimeout(scheduleSmoothMarquees, 100); setTimeout(refreshCurrentPageOnce, 500); });
})();
/* === END NITA STYLE VISIBLE TIMER + SMOOTH MARQUEE + FIRST LOAD RELIABILITY ONLY === */

/* === NITA STYLE ADMIN MULTI-PHOTO APPEND + PRODUCT SECOND PHOTO HOVER ONLY 2026-06-11 ===
   Fixes only: admin add-product photos append instead of replace, and product cards show second image on laptop hover. */
(function(){
  function esc(v){return String(v ?? '').replace(/[&<>"']/g,function(ch){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]);});}
  function readFiles(files, cb){
    if(typeof window.fileListToDataUrls === 'function') return window.fileListToDataUrls(files, cb);
    const arr=[...(files||[])];
    if(!arr.length){ cb([]); return; }
    Promise.all(arr.map(function(file){
      return new Promise(function(resolve){
        const reader=new FileReader();
        reader.onload=function(e){ resolve(e.target.result); };
        reader.onerror=function(){ resolve(''); };
        reader.readAsDataURL(file);
      });
    })).then(function(urls){ cb(urls.filter(Boolean)); });
  }
  function renderAddPhotoPreview(){
    const box=document.getElementById('photoPreview');
    if(!box) return;
    const photos=Array.isArray(window.pendingAdminPhotos) ? window.pendingAdminPhotos : [];
    const main=Math.max(0, Math.min(Number(window.pendingAdminMainIndex||0), Math.max(photos.length-1,0)));
    box.innerHTML=photos.map(function(url,i){
      return '<button type="button" class="admin-thumb selectable-thumb '+(i===main?'selected-main':'')+'" onclick="setPendingMainPhoto('+i+')"><img src="'+esc(url)+'" alt="Product photo '+(i+1)+'"><span>'+(i===main?'Main photo':'Photo '+(i+1))+'</span></button>';
    }).join('') + (photos.length ? '<p class="muted admin-photo-note">You can add more photos by clicking upload again. Click a photo to choose the main image.</p>' : '');
  }
  window.setPendingMainPhoto=function(i){
    window.pendingAdminMainIndex=Number(i)||0;
    renderAddPhotoPreview();
  };
  window.previewAdminPhotos=function(event){
    const input=event && event.target;
    readFiles(input ? input.files : [], function(urls){
      window.pendingAdminPhotos = Array.isArray(window.pendingAdminPhotos) ? window.pendingAdminPhotos : [];
      // Append new selected photos instead of replacing the existing gallery.
      window.pendingAdminPhotos = window.pendingAdminPhotos.concat((urls||[]).filter(Boolean));
      if(!Number.isFinite(Number(window.pendingAdminMainIndex))) window.pendingAdminMainIndex=0;
      renderAddPhotoPreview();
      // Allows the admin to pick another photo immediately, even the same file again.
      if(input) input.value='';
    });
  };
  // If the Add Product section is opened after admin render, keep the append-preview function attached.
  document.addEventListener('change', function(e){
    const input=e.target && e.target.closest && e.target.closest('#pphotos');
    if(input){ e.stopPropagation(); window.previewAdminPhotos({target:input}); }
  }, true);
  // After any product render, mark cards that have a real second image for the hover animation.
  function markSecondImageCards(root){
    (root||document).querySelectorAll('.product').forEach(function(card){
      const secondary=card.querySelector('.product-img-secondary');
      if(secondary && secondary.getAttribute('style') && secondary.getAttribute('style') !== (card.querySelector('.product-img-primary')||{}).getAttribute?.('style')){
        card.classList.add('has-second-photo');
      }
    });
  }
  const previousRenderProducts=window.renderProducts;
  if(typeof previousRenderProducts === 'function'){
    window.renderProducts=function(){
      const result=previousRenderProducts.apply(this, arguments);
      setTimeout(function(){ markSecondImageCards(document); }, 20);
      return result;
    };
  }
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(function(){ markSecondImageCards(document); }, 400); });
  window.addEventListener('load', function(){ setTimeout(function(){ markSecondImageCards(document); }, 600); });
})();
/* === END NITA STYLE ADMIN MULTI-PHOTO APPEND + PRODUCT SECOND PHOTO HOVER ONLY === */

/* === NITA STYLE PRODUCT ADD + AUTH HOME REDIRECT ONLY FIX 2026-06-12 ===
   Fixes only: admin add-product save reliability and redirect after sign-in/sign-up to homepage.
   Does not change design, checkout, cart, orders, emails, footer, or other website sections. */
(function(){
  const esc = (v='') => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const normEmail = (v='') => String(v||'').trim().toLowerCase();
  const readJSON = (k,f)=>{ try{ const raw=localStorage.getItem(k); return raw ? JSON.parse(raw) : f; }catch(e){ return f; } };
  const writeJSON = (k,v)=>{ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){ console.warn(e); } };
  const msg = (text, ok=true, sticky=false)=>{
    try{ if(typeof window.nitaNotify==='function') return window.nitaNotify(text, ok, sticky); }catch(e){}
    try{ if(typeof notify==='function') return notify(text, ok, sticky); }catch(e){}
    try{ if(typeof toast==='function') return toast(text); }catch(e){}
    console[ok?'log':'error'](text);
  };
  const moneyNum = v => Number(String(v ?? '').trim() || 0);
  function unique(arr){ const out=[]; (arr||[]).forEach(v=>{ v=String(v||'').trim(); if(v && !out.some(x=>x.toLowerCase()===v.toLowerCase())) out.push(v); }); return out; }
  function selected(selector){ return unique(Array.from(document.querySelectorAll(selector)).filter(el=>el.classList.contains('on') || el.classList.contains('active') || el.checked).map(el=>el.dataset.size || el.value || el.textContent)); }
  function products(){ try{ return typeof getProducts==='function' ? getProducts() : readJSON('nitaProducts',[]); }catch(e){ return readJSON('nitaProducts',[]); } }
  function normalizeProductSafe(p){ try{ if(typeof normalizeProduct==='function') return normalizeProduct(p); }catch(e){} try{ if(typeof normalizeProductStatus==='function') return normalizeProductStatus(p); }catch(e){} return p; }
  function invalidateStoreCache(){ try{ localStorage.removeItem('nitaStoreSessionCache'); }catch(e){} try{ localStorage.removeItem('nitaStoreCache'); }catch(e){} }
  async function saveProductsReliably(next){
    const clean = (Array.isArray(next)?next:[]).map(p=>normalizeProductSafe({...p}));
    writeJSON('nitaProducts', clean);
    invalidateStoreCache();
    try{
      if(typeof window.nitaSaveKeyStrict==='function') await window.nitaSaveKeyStrict('nitaProducts', clean);
      else if(typeof window.saveProducts==='function') {
        const ok = await window.saveProducts(clean);
        if(ok === false) throw new Error('Cloud save returned false.');
      } else {
        const res = await fetch('/.netlify/functions/store',{method:'POST',headers:{'Content-Type':'application/json','Cache-Control':'no-cache'},body:JSON.stringify({key:'nitaProducts',value:clean})});
        if(!res.ok) throw new Error(await res.text().catch(()=>('Cloud save failed '+res.status)));
      }
      writeJSON('nitaProducts', clean);
      invalidateStoreCache();
      return true;
    }catch(err){
      console.error('Add product cloud save failed:', err);
      msg('Product was not saved globally: '+(err.message||err)+'. Please check Netlify Functions before adding products.', false, true);
      return false;
    }
  }

  window.addProductAdmin = async function(){
    const name = String(document.getElementById('pname')?.value || '').trim();
    const price = moneyNum(document.getElementById('pprice')?.value);
    if(!name){ msg('Please enter a product name.', false); return false; }
    if(!price || price <= 0){ msg('Please enter a valid product price.', false); return false; }

    const photos = Array.isArray(window.pendingAdminPhotos) ? window.pendingAdminPhotos.filter(Boolean) : [];
    const mainIndex = Math.max(0, Math.min(Number(window.pendingAdminMainIndex || 0), Math.max(photos.length - 1, 0)));
    const available = selected('#sizePicker .pill.on, #sizePicker .pill.active, #sizePicker input:checked');
    const out = selected('#sizeOutPicker .pill.on, #sizeOutPicker .pill.active, #sizeOutPicker input:checked');
    const sizes = unique([...(available.length?available:[]), ...out]);
    const qtyRaw = document.getElementById('pquantity')?.value;
    const qty = qtyRaw === undefined || qtyRaw === '' ? '' : Math.max(0, Number(qtyRaw));
    const saleRaw = String(document.getElementById('psale')?.value || '').trim();
    const color = document.getElementById('pcolor')?.value || 'Black';
    const style = document.getElementById('pstyle')?.value || 'Clean everyday piece';
    const section = document.getElementById('phome')?.value || 'trending-now';
    const product = normalizeProductSafe({
      id: 'p' + Date.now(),
      name,
      price,
      salePrice: saleRaw === '' ? '' : Number(saleRaw),
      status: document.getElementById('pstatus')?.value || 'in-stock',
      category: document.getElementById('pcat')?.value || 'Tops',
      collection: document.getElementById('pcollection')?.value || 'Everyday Edit',
      displaySection: section,
      homeSection: section,
      note: color + ' · ' + style,
      sizes: sizes.length ? sizes : ['One Size'],
      outOfStockSizes: out,
      quantity: qty,
      initialQuantity: qty,
      photos,
      mainPhotoIndex: mainIndex,
      img: photos[mainIndex] || photos[0] || 'linear-gradient(135deg,#fff,#ddd)',
      desc: String(document.getElementById('pdesc')?.value || '').trim() || 'A carefully selected piece for a clean, feminine wardrobe.'
    });

    msg('Saving product globally...', true, false);
    try{ if(typeof window.loadSharedStore==='function') await window.loadSharedStore(); }catch(e){ console.warn(e); }
    const next = products().filter(p => String(p.id) !== String(product.id));
    next.push(product);
    const ok = await saveProductsReliably(next);
    if(!ok) return false;

    window.pendingAdminPhotos = [];
    window.pendingAdminMainIndex = 0;
    ['pname','pprice','psale','pdesc','pquantity'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
    document.querySelectorAll('#sizePicker .pill.on,#sizePicker .pill.active,#sizeOutPicker .pill.on,#sizeOutPicker .pill.active').forEach(el=>el.classList.remove('on','active'));
    const input=document.getElementById('pphotos'); if(input) input.value='';
    const prev=document.getElementById('photoPreview'); if(prev) prev.innerHTML='';
    try{ await window.loadSharedStore?.(); }catch(e){}
    try{ await window.renderAdmin?.(); }catch(e){ console.warn(e); }
    msg('Product added to the website globally.', true);
    return true;
  };

  async function sendEmail(payload){
    if(typeof window.sendStoreEmail==='function') return window.sendStoreEmail(payload);
    if(typeof window.emailSend==='function') return window.emailSend(payload);
    const res = await fetch('/.netlify/functions/send-email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload||{})});
    let body={}; try{ body=await res.json(); }catch(e){}
    if(!res.ok || body.ok===false) throw new Error(body.error||'Email could not be sent.');
    return body;
  }
  const randomCode = ()=>String(Math.floor(100000 + Math.random()*900000));
  const users = ()=>readJSON('nitaUsersByEmail',{});
  async function saveUsersReliable(u){
    writeJSON('nitaUsersByEmail', u||{});
    try{ if(typeof window.nitaSaveKeyStrict==='function') await window.nitaSaveKeyStrict('nitaUsersByEmail', u||{}); else if(typeof window.saveUsers==='function') await window.saveUsers(u||{}); }catch(e){ console.warn('User cloud save failed:',e); }
  }

  window.submitAuth = async function(){
    const root=document.getElementById('loginRoot'); if(!root) return;
    const authMsg=document.getElementById('authMessage');
    const pending = readJSON('nitaPendingSignup', null);
    if(pending && pending.awaitingVerification){
      const entered=String(document.getElementById('authCode')?.value || '').trim();
      if(!entered || entered !== String(pending.code)){ if(authMsg) authMsg.textContent='Wrong verification code. Please check your email and try again.'; return; }
      const all=users(); const email=normEmail(pending.email);
      const existing=all[email] || {};
      const user={...existing, email, password:pending.password, firstName:pending.firstName||'', lastName:pending.lastName||'', phone:pending.phone||'', addresses:existing.addresses||[], liked:existing.liked||[], isVerified:true, createdAt:existing.createdAt||Date.now()};
      all[email]=user;
      await saveUsersReliable(all);
      writeJSON('nitaUser', user); localStorage.setItem('nitaSessionEmail', email); localStorage.removeItem('nitaPendingSignup');
      try{ await sendEmail({type:'discount',to:email,code:'NITA10'}); }catch(e){ console.warn('Welcome code email failed:', e); }
      if(authMsg) authMsg.textContent='Account verified. Redirecting to homepage...';
      setTimeout(()=>{ location.href='index.html'; }, 500);
      return;
    }

    const email=normEmail(document.getElementById('authEmail')?.value);
    const password=String(document.getElementById('authPassword')?.value||'');
    const signupVisible=!!(document.getElementById('signupFields') && document.getElementById('signupFields').style.display !== 'none');
    if(!/^\S+@\S+\.\S+$/.test(email)){ if(authMsg) authMsg.textContent='Please enter a valid email address.'; return; }
    if(!password){ if(authMsg) authMsg.textContent='Please enter your password.'; return; }
    try{ if(typeof window.loadSharedStore==='function') await window.loadSharedStore(); }catch(e){}
    const all=users();
    if(!signupVisible){
      const u=all[email];
      if(!u || String(u.password||'') !== password){ if(authMsg) authMsg.textContent='Incorrect email or password.'; return; }
      writeJSON('nitaUser', u); localStorage.setItem('nitaSessionEmail', email); window.currentUser=u;
      if(authMsg) authMsg.textContent='Signed in. Redirecting to homepage...';
      setTimeout(()=>{ location.href='index.html'; }, 350);
      return;
    }
    if(all[email]){ if(authMsg) authMsg.textContent='An account already exists with this email. Please sign in.'; return; }
    const firstName=String(document.getElementById('authFirst')?.value||'').trim();
    const lastName=String(document.getElementById('authLast')?.value||'').trim();
    const phone=String(document.getElementById('authPhone')?.value||'').trim();
    if(!firstName || !lastName || !phone){ if(authMsg) authMsg.textContent='Please complete your first name, last name, and phone number.'; return; }
    const c=randomCode();
    const pendingSignup={awaitingVerification:true,email,password,firstName,lastName,phone,code:c,createdAt:Date.now(),codeSentAt:Date.now()};
    writeJSON('nitaPendingSignup', pendingSignup);
    try{
      if(authMsg) authMsg.textContent='Sending verification code...';
      await sendEmail({type:'verification',to:email,code:c});
      if(typeof window.renderLoginPage==='function') window.renderLoginPage('signup');
      const nextMsg=document.getElementById('authMessage'); if(nextMsg) nextMsg.textContent='Verification email sent. Check your inbox.';
    }catch(e){
      localStorage.removeItem('nitaPendingSignup');
      if(authMsg) authMsg.textContent='Email could not be sent. Please try again.';
      console.error(e);
    }
  };
})();
/* === END NITA STYLE PRODUCT ADD + AUTH HOME REDIRECT ONLY FIX 2026-06-12 === */


/* === NITA STYLE FINAL: SIZE OOS TEXT REMOVED + FOOTER LABEL DIRECT FIX ONLY 2026-06-12 === */
(function(){
  function removeOosText(root){
    (root||document).querySelectorAll('.size-oos-text').forEach(function(el){ el.remove(); });
    (root||document).querySelectorAll('.size.size-disabled').forEach(function(btn){
      btn.childNodes.forEach(function(n){ if(n.nodeType===3) n.nodeValue = n.nodeValue.replace(/out\s*of\s*stock/ig,'').trim(); });
    });
  }
  function termsAndConditionsFooter(){
    document.querySelectorAll('a[href="terms.html"]').forEach(function(a){
      if(/^terms$/i.test((a.textContent||'').trim())) a.textContent = 'Terms and Conditions';
    });
  }
  const oldOpenQuickView = window.openQuickView;
  if(typeof oldOpenQuickView === 'function'){
    window.openQuickView = function(){
      const r = oldOpenQuickView.apply(this, arguments);
      setTimeout(function(){ removeOosText(document.getElementById('quickContent')||document); }, 0);
      return r;
    };
  }
  const oldProductPage = window.productPage;
  if(typeof oldProductPage === 'function'){
    window.productPage = function(){
      const r = oldProductPage.apply(this, arguments);
      setTimeout(function(){ removeOosText(document.getElementById('detail')||document); }, 0);
      return r;
    };
  }
  document.addEventListener('DOMContentLoaded', function(){ removeOosText(document); termsAndConditionsFooter(); });
  window.addEventListener('load', function(){ removeOosText(document); termsAndConditionsFooter(); });
})();
/* === END FINAL SIZE OOS TEXT REMOVED + FOOTER LABEL DIRECT FIX ONLY === */


/* === NITA STYLE LAPTOP ADD-PRODUCT PHOTO APPEND ONLY FIX 2026-06-12 ===
   Fixes only the admin add-product photo uploader on laptop/desktop.
   Selecting a new photo now appends to the existing pending gallery instead of replacing it. */
(function(){
  function escapeHtml(v){return String(v ?? '').replace(/[&<>"']/g,function(ch){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]);});}
  function readAsDataUrls(files, done){
    var list=Array.prototype.slice.call(files||[]);
    if(!list.length){done([]);return;}
    Promise.all(list.map(function(file){
      return new Promise(function(resolve){
        try{
          var reader=new FileReader();
          reader.onload=function(e){resolve(e.target.result||'');};
          reader.onerror=function(){resolve('');};
          reader.readAsDataURL(file);
        }catch(err){resolve('');}
      });
    })).then(function(urls){done(urls.filter(Boolean));});
  }
  function renderPendingPhotos(){
    var box=document.getElementById('photoPreview');
    if(!box) return;
    var photos=Array.isArray(window.pendingAdminPhotos)?window.pendingAdminPhotos:[];
    var main=Math.max(0, Math.min(Number(window.pendingAdminMainIndex||0), Math.max(photos.length-1,0)));
    box.innerHTML=photos.map(function(url,i){
      return '<button type="button" class="admin-thumb selectable-thumb '+(i===main?'selected-main':'')+'" onclick="setPendingMainPhoto('+i+')"><img src="'+escapeHtml(url)+'" alt="Product photo '+(i+1)+'"><span>'+(i===main?'Main photo':'Photo '+(i+1))+'</span></button>';
    }).join('') + (photos.length?'<p class="muted admin-photo-note">Photos stay saved here. Click upload again to add more photos.</p>':'');
  }
  window.setPendingMainPhoto=function(i){
    window.pendingAdminMainIndex=Number(i)||0;
    renderPendingPhotos();
  };
  window.previewAdminPhotos=function(event){
    var input=event && event.target;
    readAsDataUrls(input ? input.files : [], function(urls){
      window.pendingAdminPhotos=Array.isArray(window.pendingAdminPhotos)?window.pendingAdminPhotos:[];
      window.pendingAdminPhotos=window.pendingAdminPhotos.concat((urls||[]).filter(Boolean));
      if(!Number.isFinite(Number(window.pendingAdminMainIndex))) window.pendingAdminMainIndex=0;
      renderPendingPhotos();
      if(input) input.value='';
    });
  };
  // Laptop Safari/Chrome fires the inline onchange after document listeners.
  // This capture handler owns the #pphotos change event and blocks older replace-style handlers.
  document.addEventListener('change', function(e){
    var input=e.target && e.target.closest && e.target.closest('#pphotos');
    if(!input) return;
    e.preventDefault();
    e.stopPropagation();
    if(typeof e.stopImmediatePropagation==='function') e.stopImmediatePropagation();
    window.previewAdminPhotos({target:input});
  }, true);
})();
/* === END NITA STYLE LAPTOP ADD-PRODUCT PHOTO APPEND ONLY FIX === */

/* === NITA STYLE PRODUCT PHOTO ORDER + DUPLICATE FIX ONLY 2026-06-12 ===
   Fixes only: add-product photo duplicates on laptop and lets admin order photos.
   First photo in the ordered list is the main product photo; second photo is hover image. */
(function(){
  function escapeHtml(v){return String(v ?? '').replace(/[&<>"']/g,function(ch){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]);});}
  function uniquePhotos(list){
    var out=[];
    (Array.isArray(list)?list:[]).forEach(function(url){
      url=String(url||'');
      if(url && out.indexOf(url)===-1) out.push(url);
    });
    return out;
  }
  function readAsDataUrls(files, done){
    var list=Array.prototype.slice.call(files||[]);
    if(!list.length){done([]);return;}
    Promise.all(list.map(function(file){
      return new Promise(function(resolve){
        try{
          var reader=new FileReader();
          reader.onload=function(e){resolve(e.target.result||'');};
          reader.onerror=function(){resolve('');};
          reader.readAsDataURL(file);
        }catch(err){resolve('');}
      });
    })).then(function(urls){done(urls.filter(Boolean));});
  }
  function renderOrderedPhotos(){
    var box=document.getElementById('photoPreview');
    if(!box) return;
    window.pendingAdminPhotos=uniquePhotos(window.pendingAdminPhotos);
    window.pendingAdminMainIndex=0;
    var photos=window.pendingAdminPhotos;
    box.innerHTML=photos.map(function(url,i){
      return '<div class="admin-thumb photo-order-thumb">'
        + '<img src="'+escapeHtml(url)+'" alt="Product photo '+(i+1)+'">'
        + '<span>Photo '+(i+1)+'</span>'
        + '<div class="photo-order-controls">'
        + '<button type="button" aria-label="Move photo left" onclick="movePendingPhoto('+i+',-1)" '+(i===0?'disabled':'')+'>←</button>'
        + '<button type="button" aria-label="Move photo right" onclick="movePendingPhoto('+i+',1)" '+(i===photos.length-1?'disabled':'')+'>→</button>'
        + '<button type="button" aria-label="Remove photo" onclick="removePendingPhoto('+i+')">×</button>'
        + '</div>'
        + '</div>';
    }).join('') + (photos.length ? '<p class="muted admin-photo-note">Drag by order using the arrows. Photo 1 is the main image. Photo 2 is the hover image on desktop.</p>' : '');
  }
  window.movePendingPhoto=function(index, direction){
    var photos=uniquePhotos(window.pendingAdminPhotos);
    index=Number(index); direction=Number(direction);
    var target=index+direction;
    if(target<0 || target>=photos.length) return;
    var temp=photos[index]; photos[index]=photos[target]; photos[target]=temp;
    window.pendingAdminPhotos=photos;
    window.pendingAdminMainIndex=0;
    renderOrderedPhotos();
  };
  window.removePendingPhoto=function(index){
    var photos=uniquePhotos(window.pendingAdminPhotos);
    photos.splice(Number(index),1);
    window.pendingAdminPhotos=photos;
    window.pendingAdminMainIndex=0;
    renderOrderedPhotos();
  };
  window.setPendingMainPhoto=function(){
    // Main selector removed: ordered Photo 1 is always the main product photo.
    window.pendingAdminMainIndex=0;
    renderOrderedPhotos();
  };
  window.previewAdminPhotos=function(event){
    var input=event && event.target;
    readAsDataUrls(input ? input.files : [], function(urls){
      var existing=uniquePhotos(window.pendingAdminPhotos);
      window.pendingAdminPhotos=uniquePhotos(existing.concat(urls||[]));
      window.pendingAdminMainIndex=0;
      renderOrderedPhotos();
      if(input) input.value='';
    });
  };
  var previousAddProductAdmin=window.addProductAdmin;
  if(typeof previousAddProductAdmin==='function'){
    window.addProductAdmin=async function(){
      window.pendingAdminPhotos=uniquePhotos(window.pendingAdminPhotos);
      window.pendingAdminMainIndex=0;
      return previousAddProductAdmin.apply(this, arguments);
    };
  }
  document.addEventListener('change', function(e){
    var input=e.target && e.target.closest && e.target.closest('#pphotos');
    if(!input) return;
    // Let older listeners call previewAdminPhotos too; duplicate protection above makes it safe.
    setTimeout(renderOrderedPhotos, 80);
  }, true);
  window.addEventListener('load', function(){ setTimeout(renderOrderedPhotos, 300); });
})();
/* === END PRODUCT PHOTO ORDER + DUPLICATE FIX ONLY === */


/* === NITA STYLE ADMIN ROADMAP + STATUS EMAIL PREMIUM ONLY FIX 2026-06-12 ===
   Changes only: admin order roadmap display and status-update email roadmap markup. */
(function(){
  const STEPS = ['Order submitted','Confirmed','Packing','Out for delivery','Delivered'];
  function esc(v){return String(v ?? '').replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
  function normStatus(status){
    const s=String(status||'Order submitted').trim();
    if(/^new order$/i.test(s)) return 'Order submitted';
    if(/^preparing$/i.test(s)) return 'Packing';
    return s || 'Order submitted';
  }
  function premiumRoadmap(status){
    const current=normStatus(status);
    if(/^cancelled$/i.test(current)){
      return '<div class="order-roadmap-wrap admin-premium-roadmap"><div class="order-roadmap"><span class="done">Cancelled</span></div></div>';
    }
    let idx=STEPS.findIndex(s=>s.toLowerCase()===current.toLowerCase());
    if(idx<0) idx=0;
    return '<div class="order-roadmap-wrap admin-premium-roadmap"><div class="order-roadmap">'+STEPS.map(function(step,i){
      return '<span class="'+(i<=idx?'done':'')+'">'+esc(step)+'</span>';
    }).join('')+'</div></div>';
  }
  window.nitaAdminPremiumRoadmapHtml = premiumRoadmap;
  window.nitaAdminRoadmapHtml = premiumRoadmap;
  function orders(){try{return (typeof getJSON==='function'?getJSON('nitaOrders',[]):JSON.parse(localStorage.getItem('nitaOrders')||'[]'))||[];}catch(e){return [];}}
  function apply(){
    if(!/admin\.html$/i.test(location.pathname)) return;
    const os=orders();
    document.querySelectorAll('.admin-order-roadmap').forEach(el=>el.remove());
    document.querySelectorAll('.admin-premium-roadmap').forEach(el=>el.remove());
    Array.from(document.querySelectorAll('.admin-section-page[data-section="orders"] .admin-list-card')).forEach(function(card,i){
      const o=os[i]; if(!o) return;
      const textCol=card.querySelector('div'); if(!textCol) return;
      const anchor=Array.from(textCol.querySelectorAll('p')).pop() || textCol.querySelector('h3');
      if(anchor) anchor.insertAdjacentHTML('afterend', premiumRoadmap(o.status));
      else textCol.insertAdjacentHTML('beforeend', premiumRoadmap(o.status));
    });
    Array.from(document.querySelectorAll('tr.admin-order-row')).forEach(function(row,i){
      const o=os[i]; const cell=row.querySelector('td'); if(o&&cell) cell.insertAdjacentHTML('beforeend', premiumRoadmap(o.status));
    });
  }
  const prevRender=window.renderAdmin;
  window.renderAdmin=async function(){
    if(typeof prevRender==='function') await prevRender.apply(this, arguments);
    setTimeout(apply,0);
  };
  const prevShow=window.showAdminSection;
  window.showAdminSection=function(section){
    const r=prevShow?prevShow.apply(this, arguments):undefined;
    if(section==='orders') setTimeout(apply,0);
    return r;
  };
  const prevUpdate=window.updateOrder;
  window.updateOrder=async function(index,status){
    const r=prevUpdate?await prevUpdate.apply(this, arguments):undefined;
    setTimeout(apply,0);
    return r;
  };
  document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,500));
  window.addEventListener('load',()=>setTimeout(apply,800));
})();
/* === END NITA STYLE ADMIN ROADMAP + STATUS EMAIL PREMIUM ONLY FIX === */


/* === NITA STYLE ORDER STATUS INSTANT SAVE + EMAIL FIX ONLY 2026-06-12 ===
   Scope: admin order status saving, UI refresh, account roadmap sync through shared orders, and status email trigger only. */
(function(){
  const STEPS = ['Order submitted','Confirmed','Packing','Out for delivery','Delivered'];
  const STATUSES = STEPS.concat(['Cancelled']);
  const esc = (v='') => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const read = (k,d) => { try { return JSON.parse(localStorage.getItem(k) || JSON.stringify(d)); } catch(e) { return d; } };
  const write = (k,v) => { localStorage.setItem(k, JSON.stringify(v)); };
  const moneySafe = (n) => { try { return typeof money === 'function' ? money(n) : '$' + Number(n || 0).toFixed(2); } catch(e) { return '$' + Number(n || 0).toFixed(2); } };
  const notify = (text, ok=true) => { try { if (typeof toast === 'function') toast(text); else if (typeof msg === 'function') msg(text); else console[ok?'log':'warn'](text); } catch(e) { console[ok?'log':'warn'](text); } };
  function normStatus(status){ const s=String(status || 'Order submitted').trim(); if(/^new order$/i.test(s)) return 'Order submitted'; if(/^preparing$/i.test(s)) return 'Packing'; return s || 'Order submitted'; }
  function roadmap(status){
    const current = normStatus(status);
    if(/^cancelled$/i.test(current)) return '<div class="order-roadmap-wrap admin-premium-roadmap"><div class="order-roadmap"><span class="done">Cancelled</span></div></div>';
    let idx = STEPS.findIndex(s => s.toLowerCase() === current.toLowerCase()); if(idx < 0) idx = 0;
    return '<div class="order-roadmap-wrap admin-premium-roadmap"><div class="order-roadmap">' + STEPS.map((step,i)=>'<span class="'+(i<=idx?'done':'')+'">'+esc(step)+'</span>').join('') + '</div></div>';
  }
  function statusSelect(o,i){ const current=normStatus(o.status); return '<select class="field admin-order-status" data-order-index="'+i+'" onchange="updateOrder('+i+',this.value)">' + STATUSES.map(s => '<option value="'+esc(s)+'" '+(current===s?'selected':'')+'>'+esc(s)+'</option>').join('') + '</select><span class="admin-status-save" data-order-save="'+i+'"></span>'; }
  async function fetchRemoteOrders(){
    try{
      const res = await fetch('/.netlify/functions/store?ts=' + Date.now(), {cache:'no-store', headers:{'Cache-Control':'no-cache'}});
      if(!res.ok) return null;
      const data = await res.json();
      if(Array.isArray(data.nitaOrders)){ write('nitaOrders', data.nitaOrders); return data.nitaOrders; }
    }catch(e){ console.warn('Order refresh skipped:', e); }
    return null;
  }
  async function saveOrdersStrict(orders){
    write('nitaOrders', orders);
    if(typeof window.nitaSaveKeyStrict === 'function') return await window.nitaSaveKeyStrict('nitaOrders', orders);
    if(typeof window.saveCloudKey === 'function') return await window.saveCloudKey('nitaOrders', orders);
    if(typeof window.saveSharedKeyNow === 'function') return await window.saveSharedKeyNow('nitaOrders', orders);
    const res = await fetch('/.netlify/functions/store', {method:'POST', headers:{'Content-Type':'application/json','Cache-Control':'no-cache'}, body:JSON.stringify({key:'nitaOrders', value:orders})});
    let body={}; try{ body=await res.json(); }catch(e){ body={error:await res.text()}; }
    if(!res.ok || body.ok===false) throw new Error(body.error || 'Order save failed');
    return body;
  }
  async function sendStatusEmail(order){
    if(!order || !/^\S+@\S+\.\S+$/.test(String(order.email||''))) return {skipped:true};
    const payload = {type:'order_status', to:String(order.email).trim().toLowerCase(), order};
    const res = await fetch('/.netlify/functions/send-email', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
    let body={}; try{ body=await res.json(); }catch(e){ body={error:await res.text()}; }
    if(!res.ok || body.ok===false) throw new Error(body.error || 'Status email failed');
    return body;
  }
  function updateVisibleOrder(index, status, stateText){
    document.querySelectorAll('[data-order-save="'+index+'"]').forEach(el => { el.textContent = stateText || ''; el.classList.toggle('saving', /Saving/i.test(stateText||'')); });
    document.querySelectorAll('select[data-order-index="'+index+'"]').forEach(sel => { sel.value = normStatus(status); });
    const cards = Array.from(document.querySelectorAll('.admin-section-page[data-section="orders"] .admin-list-card'));
    const card = cards[index];
    if(card){
      const p = Array.from(card.querySelectorAll('p')).find(x => /\$|USD|Order submitted|Confirmed|Packing|Out for delivery|Delivered|Cancelled|New order|Preparing/i.test(x.textContent || ''));
      if(p){ const total = (read('nitaOrders',[])[index] || {}).total || 0; p.innerHTML = '<b>'+moneySafe(total)+'</b> · '+esc(normStatus(status)); }
      card.querySelectorAll('.admin-order-roadmap,.admin-premium-roadmap').forEach(el => el.remove());
      const textCol=card.querySelector('div'); if(textCol) textCol.insertAdjacentHTML('beforeend', roadmap(status));
    }
    const rows = Array.from(document.querySelectorAll('tr.admin-order-row'));
    const row = rows[index];
    if(row){ row.querySelectorAll('.admin-order-roadmap,.admin-premium-roadmap').forEach(el=>el.remove()); const cell=row.querySelector('td'); if(cell) cell.insertAdjacentHTML('beforeend', roadmap(status)); }
  }
  function renderOrderRoadmaps(){
    const orders = read('nitaOrders', []);
    document.querySelectorAll('.admin-order-roadmap,.admin-premium-roadmap').forEach(el=>el.remove());
    Array.from(document.querySelectorAll('.admin-section-page[data-section="orders"] .admin-list-card')).forEach((card,i)=>{ const o=orders[i]; if(!o)return; const textCol=card.querySelector('div'); if(textCol) textCol.insertAdjacentHTML('beforeend', roadmap(o.status)); });
    Array.from(document.querySelectorAll('tr.admin-order-row')).forEach((row,i)=>{ const o=orders[i]; const cell=row.querySelector('td'); if(o&&cell) cell.insertAdjacentHTML('beforeend', roadmap(o.status)); });
  }
  const previousRenderAdmin = window.renderAdmin;
  window.renderAdmin = async function(){
    let result;
    if(typeof previousRenderAdmin === 'function') result = await previousRenderAdmin.apply(this, arguments);
    try{
      const page = document.querySelector('.admin-page');
      const orderSection = document.querySelector('.admin-section-page[data-section="orders"]');
      if(page && orderSection){
        const os = read('nitaOrders', []);
        const toolbar = orderSection.querySelector('.admin-toolbar')?.outerHTML || '<div class="admin-toolbar"><h2>Orders</h2><span class="pill">'+os.length+' total</span></div>';
        orderSection.innerHTML = toolbar + (os.length ? os.map((o,i)=>'<article class="admin-list-card"><div><h3>'+esc(o.id)+'</h3><p class="muted">'+esc(o.customer||'-')+' · '+esc(o.email||'')+' · '+esc(o.phone||'')+'</p><p><b>'+moneySafe(o.total||0)+'</b> · '+esc(normStatus(o.status))+'</p>'+roadmap(o.status)+'</div><div class="admin-actions">'+statusSelect(o,i)+'<button class="btn danger" onclick="deleteOrderAdmin('+i+')">DELETE</button></div></article>').join('') : '<p class="muted">No orders yet.</p>');
      } else renderOrderRoadmaps();
    }catch(e){ console.warn('Admin order render patch skipped:', e); }
    return result;
  };
  window.updateOrder = async function(index, status){
    status = normStatus(status);
    let orders = read('nitaOrders', []);
    const original = orders[index];
    if(!original) return;
    const orderId = original.id;
    const oldStatus = normStatus(original.status);
    if(status === oldStatus){ updateVisibleOrder(index, status, ''); return; }
    updateVisibleOrder(index, status, 'Saving...');
    const previousOrder = {...original};
    orders[index] = {...original, status, statusUpdatedAt:new Date().toISOString()};
    write('nitaOrders', orders);
    try{
      const remote = await fetchRemoteOrders();
      if(remote){
        orders = remote;
        const remoteIndex = orders.findIndex(o => String(o.id) === String(orderId));
        if(remoteIndex >= 0) index = remoteIndex;
      }
      const currentOld = normStatus(orders[index]?.status || oldStatus);
      if(status === currentOld){ updateVisibleOrder(index, status, ''); return; }
      orders[index] = {...orders[index], status, statusUpdatedAt:new Date().toISOString()};
      await saveOrdersStrict(orders);
      write('nitaOrders', orders);
      updateVisibleOrder(index, status, 'Saved');
      let emailSent = false;
      try{
        if(orders[index].email && orders[index].lastStatusEmail !== status){
          await sendStatusEmail(orders[index]);
          orders[index].lastStatusEmail = status;
          orders[index].lastStatusEmailAt = new Date().toISOString();
          await saveOrdersStrict(orders);
          emailSent = true;
        }
        notify(emailSent ? 'Order status updated and customer email sent.' : 'Order status updated.');
      }catch(emailError){
        console.warn('Order status email failed:', emailError);
        notify('Order status saved, but the customer email failed. Check RESEND_API_KEY / FROM_EMAIL in Netlify.', false);
      }
      setTimeout(()=>updateVisibleOrder(index, status, ''), 1600);
      try{ renderOrderRoadmaps(); }catch(e){}
    }catch(error){
      console.error('Order status update failed:', error);
      let latest = read('nitaOrders', []);
      const revertIndex = latest.findIndex(o => String(o.id) === String(orderId));
      if(revertIndex >= 0){ latest[revertIndex] = previousOrder; write('nitaOrders', latest); updateVisibleOrder(revertIndex, oldStatus, 'Save failed'); }
      notify('Order status could not be saved. Please try again.', false);
    }
  };
  const previousShow = window.showAdminSection;
  window.showAdminSection = function(section){ const result = previousShow ? previousShow.apply(this, arguments) : undefined; if(section === 'orders') setTimeout(renderOrderRoadmaps, 0); return result; };
  document.addEventListener('DOMContentLoaded', () => setTimeout(renderOrderRoadmaps, 500));
  window.addEventListener('load', () => setTimeout(renderOrderRoadmaps, 800));
})();
/* === END NITA STYLE ORDER STATUS INSTANT SAVE + EMAIL FIX ONLY === */

/* === NITA STYLE HOMEPAGE FINAL POLISH ONLY: stable duplicate marquee after render === */
(function(){
  function stableMarquee(id){
    var track=document.getElementById(id);
    if(!track) return;
    var cards=[].slice.call(track.children).filter(function(el){return el.classList && el.classList.contains('product');});
    if(!cards.length) return;
    track.classList.remove('nita-js-marquee','nita-premium-auto','nita-force-marquee','nita-new-arrivals-only-scroll');
    track.classList.add('nita-smooth-css-marquee');
    // Do not duplicate forever. Rebuild from the first real set when this runs again.
    if(track.dataset.nitaOriginalHtml){ track.innerHTML=track.dataset.nitaOriginalHtml; cards=[].slice.call(track.children).filter(function(el){return el.classList && el.classList.contains('product');}); }
    else { track.dataset.nitaOriginalHtml=track.innerHTML; }
    var base=track.innerHTML;
    var neededWidth=Math.max(window.innerWidth*2.8, 2200);
    var safety=0;
    while(track.scrollWidth < neededWidth && safety < 8){ track.insertAdjacentHTML('beforeend', base); safety++; }
    // Always have exactly at least two cycles for -50% movement.
    if(track.children.length < cards.length*2){ track.insertAdjacentHTML('beforeend', base); }
  }
  function polishHome(){ stableMarquee('trendingMarquee'); stableMarquee('newArrivalsMarquee'); }
  var oldRender=window.renderHomeSections;
  window.renderHomeSections=function(){
    var out=oldRender ? oldRender.apply(this, arguments) : undefined;
    setTimeout(polishHome,80); setTimeout(polishHome,600); setTimeout(polishHome,1400);
    return out;
  };
  window.addEventListener('load',function(){setTimeout(polishHome,400);setTimeout(polishHome,1500);},{once:true});
  window.addEventListener('resize',function(){setTimeout(function(){
    ['trendingMarquee','newArrivalsMarquee'].forEach(function(id){var t=document.getElementById(id); if(t){t.dataset.nitaOriginalHtml='';}});
    polishHome();
  },160);},{passive:true});
})();
/* === END NITA STYLE HOMEPAGE FINAL POLISH ONLY === */

/* FINAL ADMIN CATEGORY + HOMEPAGE WALLPAPER CLEANUP
   Keeps admin aligned with current homepage: only Shop Now + Explore Collections,
   and product categories: Dresses, Skirts, T-Shirts, Tops, Pants, Bags, Scarves, Overalls. */
(function(){
  var FINAL_CATEGORIES = ['Dresses','Skirts','T-Shirts','Tops','Pants','Bags','Scarves','Overalls'];
  window.ADMIN_CATEGORIES = FINAL_CATEGORIES.slice();
  window.NITA_ADMIN_CATEGORY_OPTIONS = FINAL_CATEGORIES.slice();

  function optionHtml(items, selected){
    return items.map(function(item){
      return '<option value="'+ item.replace(/"/g,'&quot;') +'" '+(item===selected?'selected':'')+'>'+item+'</option>';
    }).join('');
  }

  function cleanProductCategorySelects(){
    document.querySelectorAll('#pcat, .edit-category').forEach(function(select){
      if(!select || select.dataset.nitaFinalCategories === '1') return;
      var current = select.value;
      if(FINAL_CATEGORIES.indexOf(current) === -1) current = 'Dresses';
      select.innerHTML = optionHtml(FINAL_CATEGORIES, current);
      select.dataset.nitaFinalCategories = '1';
    });
  }

  var oldShowAdminSection = window.showAdminSection;
  if(typeof oldShowAdminSection === 'function'){
    window.showAdminSection = function(section){
      var result = oldShowAdminSection.apply(this, arguments);
      setTimeout(cleanProductCategorySelects, 0);
      setTimeout(function(){ if(section === 'home-wallpapers' && typeof window.nitaRenderHomepageWallpaperAdmin === 'function') window.nitaRenderHomepageWallpaperAdmin(); }, 0);
      return result;
    };
  }

  var oldRenderAdmin = window.renderAdmin;
  if(typeof oldRenderAdmin === 'function'){
    window.renderAdmin = async function(){
      var result = await oldRenderAdmin.apply(this, arguments);
      cleanProductCategorySelects();
      return result;
    };
  }

  var WALL_KEY = 'nitaHomepageWallpapers';
  var DEFAULTS = { shopNow:'', exploreCollections:'' };
  function readJSON(key, fallback){
    try { return Object.assign({}, fallback, JSON.parse(localStorage.getItem(key) || '{}')); }
    catch(e){ return Object.assign({}, fallback); }
  }
  function writeJSON(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
  function safeUrl(value){ return String(value || '').replace(/'/g, '%27'); }

  window.nitaRenderHomepageWallpaperAdmin = function(){
    var root = document.getElementById('homepageWallpapersAdmin');
    if(!root) return;
    var stored = readJSON(WALL_KEY, DEFAULTS);
    var w = { shopNow: stored.shopNow || '', exploreCollections: stored.exploreCollections || '' };
    if(stored.newCollection){
      writeJSON(WALL_KEY, w);
    }
    function card(label, key, value){
      var has = !!value;
      return '<div class="wallpaper-admin-card">'
        + '<div class="wallpaper-preview '+(has?'has-image':'')+'" style="'+(has ? "background-image:url('"+safeUrl(value)+"')" : '')+'"></div>'
        + '<div><h3>'+label+'</h3>'
        + '<p class="muted">Upload the image that appears behind this homepage section.</p>'
        + '<input class="field" type="file" accept="image/*" onchange="nitaPickHomepageWallpaper(event,\''+key+'\')">'
        + '<div class="admin-actions"><button type="button" class="btn light" onclick="nitaClearHomepageWallpaper(\''+key+'\')">REMOVE PHOTO</button></div>'
        + '</div></div>';
    }
    root.innerHTML = '<div class="admin-toolbar"><div><h2>Homepage wallpapers</h2>'
      + '<p class="muted">Choose the two background images shown behind Shop Now and Explore Collections.</p></div>'
      + '<span class="pill">Homepage</span></div>'
      + card('Shop Now wallpaper','shopNow',w.shopNow)
      + card('Explore Collections wallpaper','exploreCollections',w.exploreCollections)
      + '<button type="button" class="btn" onclick="nitaSaveHomepageWallpapers()">SAVE HOMEPAGE WALLPAPERS</button>'
      + '<p class="muted small-note">Images are saved to the same global store as your products, so all visitors see the selected wallpapers after saving.</p>';
  };

  window.nitaPickHomepageWallpaper = function(event, key){
    var file = event && event.target && event.target.files && event.target.files[0];
    if(!file || FINAL_CATEGORIES.indexOf(key) !== -1) return;
    if(key !== 'shopNow' && key !== 'exploreCollections') return;
    var reader = new FileReader();
    reader.onload = function(){
      var stored = readJSON(WALL_KEY, DEFAULTS);
      var clean = { shopNow: stored.shopNow || '', exploreCollections: stored.exploreCollections || '' };
      clean[key] = reader.result;
      writeJSON(WALL_KEY, clean);
      if(typeof nitaApplyHomepageWallpapers === 'function') nitaApplyHomepageWallpapers();
      window.nitaRenderHomepageWallpaperAdmin();
    };
    reader.readAsDataURL(file);
  };

  window.nitaClearHomepageWallpaper = function(key){
    if(key !== 'shopNow' && key !== 'exploreCollections') return;
    var stored = readJSON(WALL_KEY, DEFAULTS);
    var clean = { shopNow: stored.shopNow || '', exploreCollections: stored.exploreCollections || '' };
    clean[key] = '';
    writeJSON(WALL_KEY, clean);
    if(typeof nitaApplyHomepageWallpapers === 'function') nitaApplyHomepageWallpapers();
    window.nitaRenderHomepageWallpaperAdmin();
  };

  window.nitaSaveHomepageWallpapers = async function(){
    var stored = readJSON(WALL_KEY, DEFAULTS);
    var clean = { shopNow: stored.shopNow || '', exploreCollections: stored.exploreCollections || '' };
    writeJSON(WALL_KEY, clean);
    if(typeof nitaApplyHomepageWallpapers === 'function') nitaApplyHomepageWallpapers();
    try{
      if(typeof storeSet === 'function') await storeSet(WALL_KEY, clean);
      if(typeof toast === 'function') toast('Homepage wallpapers saved globally.');
      if(typeof nitaNotify === 'function') nitaNotify('Homepage wallpapers saved globally.', true);
    }catch(e){
      if(typeof nitaNotify === 'function') nitaNotify('Could not save wallpapers globally. Check Netlify store settings.', false, true);
    }
    window.nitaRenderHomepageWallpaperAdmin();
  };

  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(cleanProductCategorySelects, 150);
    setTimeout(function(){ if(document.getElementById('homepageWallpapersAdmin')) window.nitaRenderHomepageWallpaperAdmin(); }, 150);
  });
})();

/* === NITA PROFESSIONAL REQUIRED FIELD VALIDATION + COUNTRY PHONE INPUT ONLY === */
(function(){
  const COUNTRY_CODES = [
    ['+961','Lebanon'],['+971','UAE'],['+966','Saudi Arabia'],['+974','Qatar'],['+965','Kuwait'],['+973','Bahrain'],['+968','Oman'],
    ['+33','France'],['+39','Italy'],['+44','United Kingdom'],['+1','USA / Canada'],['+61','Australia'],['+49','Germany'],['+34','Spain'],
    ['+90','Turkey'],['+20','Egypt'],['+962','Jordan'],['+963','Syria'],['+964','Iraq'],['+212','Morocco'],['+216','Tunisia'],['+213','Algeria']
  ];
  const esc = window.escapeHtml || function(v){return String(v||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
  function codeOptions(selected){
    selected = selected || '+961';
    return COUNTRY_CODES.map(function(c){return '<option value="'+c[0]+'" '+(c[0]===selected?'selected':'')+'>'+c[1]+' '+c[0]+'</option>';}).join('');
  }
  function splitPhone(value){
    value = String(value||'').trim();
    let found = COUNTRY_CODES.find(function(c){return value.indexOf(c[0])===0;});
    if(found) return {code:found[0], number:value.slice(found[0].length).replace(/[^0-9]/g,'')};
    return {code:'+961', number:value.replace(/[^0-9]/g,'')};
  }
  function phoneHtml(hiddenId, codeId, localId, value){
    const p = splitPhone(value);
    return '<div class="nita-phone-wrap nita-field-wrap" data-for="'+hiddenId+'">'
      + '<div class="nita-phone-row"><select class="nita-phone-code" id="'+codeId+'" onchange="nitaUpdatePhoneHidden(\''+hiddenId+'\',\''+codeId+'\',\''+localId+'\')">'+codeOptions(p.code)+'</select>'
      + '<input class="nita-phone-number" id="'+localId+'" inputmode="numeric" pattern="[0-9]*" autocomplete="tel-national" placeholder="Phone number" value="'+esc(p.number)+'" oninput="nitaNumbersOnly(this);nitaUpdatePhoneHidden(\''+hiddenId+'\',\''+codeId+'\',\''+localId+'\')">'
      + '</div><input type="hidden" id="'+hiddenId+'" value="'+esc((p.code+' '+p.number).trim())+'"><div class="nita-error-text">This field is required.</div></div>';
  }
  window.nitaNumbersOnly=function(input){ input.value = String(input.value||'').replace(/[^0-9]/g,''); };
  window.nitaUpdatePhoneHidden=function(hiddenId, codeId, localId){
    const hidden=document.getElementById(hiddenId), code=document.getElementById(codeId), local=document.getElementById(localId);
    if(hidden) hidden.value = ((code&&code.value)||'+961') + ' ' + String((local&&local.value)||'').replace(/[^0-9]/g,'');
    const wrap = hidden && hidden.closest('.nita-field-wrap');
    if(wrap && String((local&&local.value)||'').trim()) wrap.classList.remove('has-error');
  };
  function wrapField(id){
    const el=document.getElementById(id); if(!el || el.closest('.nita-field-wrap')) return;
    const wrap=document.createElement('div'); wrap.className='nita-field-wrap'; wrap.dataset.for=id;
    el.parentNode.insertBefore(wrap, el); wrap.appendChild(el);
    const err=document.createElement('div'); err.className='nita-error-text'; err.textContent='This field is required.'; wrap.appendChild(err);
  }
  function setFieldError(id, on){
    const el=document.getElementById(id); if(!el) return false;
    const wrap=el.closest('.nita-field-wrap') || document.querySelector('.nita-field-wrap[data-for="'+id+'"]');
    if(wrap) wrap.classList.toggle('has-error', !!on); else el.classList.toggle('nita-error', !!on);
    return !!on;
  }
  function clearOnInput(id){
    const el=document.getElementById(id); if(!el || el.dataset.nitaValidationBound) return;
    el.dataset.nitaValidationBound='1';
    el.addEventListener('input',function(){ if(String(el.value||'').trim()) setFieldError(id,false); });
  }
  function prepareSignupValidation(){
    ['authEmail','authPassword','authFirst','authLast'].forEach(function(id){wrapField(id);clearOnInput(id);});
    if(!document.getElementById('authPhoneLocal')){
      const old=document.getElementById('authPhone');
      if(old){ old.outerHTML = phoneHtml('authPhone','authPhoneCode','authPhoneLocal',old.value); }
    }
    const local=document.getElementById('authPhoneLocal');
    if(local && !local.dataset.nitaValidationBound){
      local.dataset.nitaValidationBound='1';
      local.addEventListener('input',function(){ if(local.value.trim()) setFieldError('authPhone',false); });
    }
  }
  function validateSignupFields(){
    prepareSignupValidation();
    let bad=false;
    const ids=['authEmail','authPassword','authFirst','authLast'];
    ids.forEach(function(id){ if(!String(document.getElementById(id)?.value||'').trim()) bad = setFieldError(id,true) || bad; else setFieldError(id,false); });
    const phoneLocal=document.getElementById('authPhoneLocal');
    if(!String(phoneLocal?.value||'').trim()) bad = setFieldError('authPhone',true) || bad; else setFieldError('authPhone',false);
    nitaUpdatePhoneHidden('authPhone','authPhoneCode','authPhoneLocal');
    const msg=document.getElementById('authMessage');
    if(bad && msg) msg.textContent='Please complete the required fields.';
    return !bad;
  }

  const previousRenderLoginPage = window.renderLoginPage;
  window.renderLoginPage = function(mode){
    const result = previousRenderLoginPage ? previousRenderLoginPage.apply(this, arguments) : undefined;
    setTimeout(function(){
      const signupVisible = document.getElementById('signupFields') && getComputedStyle(document.getElementById('signupFields')).display !== 'none';
      if(signupVisible) prepareSignupValidation();
    },0);
    return result;
  };
  const previousSwitchAuthMode = window.switchAuthMode;
  window.switchAuthMode = function(mode){
    const result = previousSwitchAuthMode ? previousSwitchAuthMode.apply(this, arguments) : undefined;
    setTimeout(function(){ if(mode==='signup') prepareSignupValidation(); },0);
    return result;
  };
  const previousSubmitAuth = window.submitAuth;
  window.submitAuth = function(){
    const signupVisible = document.getElementById('signupFields') && getComputedStyle(document.getElementById('signupFields')).display !== 'none';
    if(signupVisible && !validateSignupFields()) return;
    return previousSubmitAuth ? previousSubmitAuth.apply(this, arguments) : undefined;
  };

  function enhanceAccountPhone(){
    const input=document.getElementById('accPhone'); if(!input || document.getElementById('accPhoneLocal')) return;
    const value=input.value;
    input.outerHTML = phoneHtml('accPhone','accPhoneCode','accPhoneLocal',value);
  }
  const previousRenderAccount = window.renderAccount;
  window.renderAccount = async function(){
    const result = previousRenderAccount ? await previousRenderAccount.apply(this, arguments) : undefined;
    setTimeout(enhanceAccountPhone,0);
    return result;
  };
  const previousSaveAccountInfo = window.saveAccountInfo;
  window.saveAccountInfo = function(){
    nitaUpdatePhoneHidden('accPhone','accPhoneCode','accPhoneLocal');
    const phoneLocal=document.getElementById('accPhoneLocal');
    if(phoneLocal) phoneLocal.value = phoneLocal.value.replace(/[^0-9]/g,'');
    return previousSaveAccountInfo ? previousSaveAccountInfo.apply(this, arguments) : undefined;
  };
  document.addEventListener('DOMContentLoaded',function(){setTimeout(function(){
    const signupVisible = document.getElementById('signupFields') && getComputedStyle(document.getElementById('signupFields')).display !== 'none';
    if(signupVisible) prepareSignupValidation();
    enhanceAccountPhone();
  },300);});
})();
/* === END NITA PROFESSIONAL REQUIRED FIELD VALIDATION + COUNTRY PHONE INPUT ONLY === */

/* === NITA STYLE ADMIN ORDERS ONGOING / PREVIOUS SPLIT ONLY === */
(function(){
  var PAST_STATUSES = ['delivered','cancelled'];
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
  function readOrders(){try{return (typeof getJSON==='function'?getJSON('nitaOrders',[]):JSON.parse(localStorage.getItem('nitaOrders')||'[]'))||[];}catch(e){return [];}}
  function isPast(order){return PAST_STATUSES.indexOf(String(order&&order.status||'').trim().toLowerCase())!==-1;}
  function normStatus(status){var s=String(status||'Order submitted').trim(); if(/^new order$/i.test(s)) return 'Order submitted'; if(/^preparing$/i.test(s)) return 'Packing'; return s||'Order submitted';}
  function moneyX(n){try{return typeof money==='function'?money(n):('$'+Number(n||0).toFixed(2));}catch(e){return '$'+Number(n||0).toFixed(2);}}
  function roadmapHtml(status){try{ if(typeof window.nitaAdminPremiumRoadmapHtml==='function') return window.nitaAdminPremiumRoadmapHtml(status); }catch(e){} return '';}
  function statusSelect(order, originalIndex){
    var statuses=['Order submitted','Confirmed','Packing','Out for delivery','Delivered','Cancelled'];
    var current=normStatus(order.status);
    return '<select class="field admin-order-status" data-order-index="'+originalIndex+'" onchange="updateOrder('+originalIndex+',this.value)">'+statuses.map(function(s){return '<option value="'+esc(s)+'" '+(current===s?'selected':'')+'>'+esc(s)+'</option>';}).join('')+'</select><span class="admin-status-save" data-order-save="'+originalIndex+'"></span>';
  }
  function orderCard(order, originalIndex){
    return '<article class="admin-list-card nita-admin-order-card" data-order-status="'+esc(normStatus(order.status))+'">'
      + '<div class="nita-admin-order-main"><h3>'+esc(order.id||'Order')+'</h3>'
      + '<p class="muted">'+esc(order.customer||'-')+' · '+esc(order.email||'')+' · '+esc(order.phone||'')+'</p>'
      + '<p><b>'+moneyX(order.total||0)+'</b> · '+esc(normStatus(order.status))+'</p>'
      + roadmapHtml(order.status)+'</div>'
      + '<div class="admin-actions nita-admin-order-actions">'+statusSelect(order, originalIndex)+'<button class="btn danger" onclick="deleteOrderAdmin('+originalIndex+')">DELETE</button></div>'
      + '</article>';
  }
  function renderSplitOrders(){
    var section=document.querySelector('.admin-section-page[data-section="orders"]');
    if(!section) return;
    var all=readOrders();
    var active=(localStorage.getItem('nitaAdminOrdersView')||'ongoing');
    if(active!=='previous') active='ongoing';
    var ongoing=[], previous=[];
    all.forEach(function(o,i){(isPast(o)?previous:ongoing).push({order:o,index:i});});
    var list=active==='previous'?previous:ongoing;
    var empty=active==='previous'?'No previous orders yet. Delivered and cancelled orders will appear here.':'No ongoing orders yet. Active orders will appear here.';
    section.innerHTML = '<div class="admin-toolbar nita-orders-toolbar"><div><h2>Orders</h2><p class="muted">Manage active orders separately from delivered or cancelled orders.</p></div><div class="nita-order-tabs" role="tablist" aria-label="Admin order views"><button type="button" class="nita-order-tab '+(active==='ongoing'?'active':'')+'" onclick="nitaSwitchAdminOrders(\'ongoing\')">Ongoing orders <span>'+ongoing.length+'</span></button><button type="button" class="nita-order-tab '+(active==='previous'?'active':'')+'" onclick="nitaSwitchAdminOrders(\'previous\')">Past orders <span>'+previous.length+'</span></button></div></div>'
      + '<div class="nita-admin-orders-list '+(list.length?'':'empty')+'">'+(list.length?list.map(function(item){return orderCard(item.order,item.index);}).join(''):'<div class="admin-empty">'+empty+'</div>')+'</div>';
  }
  window.nitaSwitchAdminOrders=function(view){
    localStorage.setItem('nitaAdminOrdersView', view==='previous'?'previous':'ongoing');
    renderSplitOrders();
  };
  var prevRenderAdmin=window.renderAdmin;
  window.renderAdmin=async function(){
    var r=prevRenderAdmin?await prevRenderAdmin.apply(this,arguments):undefined;
    setTimeout(renderSplitOrders,0);
    return r;
  };
  var prevShow=window.showAdminSection;
  window.showAdminSection=function(section){
    var r=prevShow?prevShow.apply(this,arguments):undefined;
    if(section==='orders') setTimeout(renderSplitOrders,0);
    return r;
  };
  var prevUpdate=window.updateOrder;
  window.updateOrder=async function(index,status){
    var r=prevUpdate?await prevUpdate.apply(this,arguments):undefined;
    setTimeout(renderSplitOrders,250);
    return r;
  };
  document.addEventListener('DOMContentLoaded',function(){setTimeout(renderSplitOrders,700);});
  window.addEventListener('load',function(){setTimeout(renderSplitOrders,900);});
})();
/* === END NITA STYLE ADMIN ORDERS ONGOING / PREVIOUS SPLIT ONLY === */

/* === NITA PHONE FLAGS + SMART LENGTHS + ACCOUNT ORDER ACCORDIONS FINAL === */
(function(){
  const PHONE_COUNTRIES = [
    {code:'+961', name:'Lebanon', flag:'🇱🇧', len:8},
    {code:'+966', name:'Saudi Arabia', flag:'🇸🇦', len:10},
    {code:'+965', name:'Kuwait', flag:'🇰🇼', len:8},
    {code:'+971', name:'UAE', flag:'🇦🇪', len:9},
    {code:'+974', name:'Qatar', flag:'🇶🇦', len:8},
    {code:'+973', name:'Bahrain', flag:'🇧🇭', len:8},
    {code:'+968', name:'Oman', flag:'🇴🇲', len:8},
    {code:'+962', name:'Jordan', flag:'🇯🇴', len:9},
    {code:'+20', name:'Egypt', flag:'🇪🇬', len:10},
    {code:'+33', name:'France', flag:'🇫🇷', len:9},
    {code:'+39', name:'Italy', flag:'🇮🇹', len:10},
    {code:'+44', name:'United Kingdom', flag:'🇬🇧', len:10},
    {code:'+1', name:'USA / Canada', flag:'🇺🇸', len:10},
    {code:'+61', name:'Australia', flag:'🇦🇺', len:9},
    {code:'+49', name:'Germany', flag:'🇩🇪', len:11},
    {code:'+34', name:'Spain', flag:'🇪🇸', len:9},
    {code:'+90', name:'Turkey', flag:'🇹🇷', len:10},
    {code:'+212', name:'Morocco', flag:'🇲🇦', len:9},
    {code:'+216', name:'Tunisia', flag:'🇹🇳', len:8},
    {code:'+213', name:'Algeria', flag:'🇩🇿', len:9}
  ];
  function esc(v){return String(v==null?'':v).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function getCountry(code){return PHONE_COUNTRIES.find(c=>c.code===code) || PHONE_COUNTRIES[0];}
  function options(selected){return PHONE_COUNTRIES.map(c=>'<option value="'+esc(c.code)+'" data-len="'+c.len+'" '+(c.code===selected?'selected':'')+'>'+c.flag+' '+c.name+' '+c.code+'</option>').join('');}
  function selectedLen(select){const opt=select?.selectedOptions?.[0]; return Number(opt?.dataset?.len || getCountry(select?.value).len || 15);}
  function clampPhone(local){ if(!local) return; const row=local.closest('.nita-phone-row'); const select=row?.querySelector('.nita-phone-code'); const max=selectedLen(select); local.maxLength=max; local.value=String(local.value||'').replace(/[^0-9]/g,'').slice(0,max); }
  function refreshPhoneWidget(wrap){
    if(!wrap) return;
    const select=wrap.querySelector('.nita-phone-code');
    const local=wrap.querySelector('.nita-phone-number');
    if(!select || !local) return;
    const current=select.value || '+961';
    select.innerHTML=options(current);
    select.value = PHONE_COUNTRIES.some(c=>c.code===current) ? current : '+961';
    clampPhone(local);
    const helper = wrap.querySelector('.nita-phone-helper') || document.createElement('div');
    helper.className='nita-phone-helper';
    helper.textContent='Use numbers only. '+getCountry(select.value).name+' numbers require '+selectedLen(select)+' digits.';
    if(!helper.parentNode) wrap.appendChild(helper);
    select.onchange=function(){ clampPhone(local); if(typeof window.nitaUpdatePhoneHidden==='function') window.nitaUpdatePhoneHidden(wrap.dataset.for||'authPhone', select.id, local.id); helper.textContent='Use numbers only. '+getCountry(select.value).name+' numbers require '+selectedLen(select)+' digits.'; };
    local.oninput=function(){ clampPhone(local); if(typeof window.nitaUpdatePhoneHidden==='function') window.nitaUpdatePhoneHidden(wrap.dataset.for||'authPhone', select.id, local.id); };
  }
  const oldNumbersOnly=window.nitaNumbersOnly;
  window.nitaNumbersOnly=function(input){ if(oldNumbersOnly) oldNumbersOnly(input); clampPhone(input); };
  const oldUpdate=window.nitaUpdatePhoneHidden;
  window.nitaUpdatePhoneHidden=function(hiddenId, codeId, localId){
    const local=document.getElementById(localId); clampPhone(local);
    const hidden=document.getElementById(hiddenId), code=document.getElementById(codeId);
    if(hidden) hidden.value=((code&&code.value)||'+961')+' '+String((local&&local.value)||'').replace(/[^0-9]/g,'');
    const wrap=hidden && hidden.closest('.nita-field-wrap');
    if(wrap && String((local&&local.value)||'').trim()) wrap.classList.remove('has-error');
    if(oldUpdate && !hidden) return oldUpdate(hiddenId,codeId,localId);
  };
  function enhancePhones(){ document.querySelectorAll('.nita-phone-wrap').forEach(refreshPhoneWidget); }
  function enhanceAccountOrderAccordions(){
    const root=document.getElementById('accountRoot'); if(!root || root.dataset.nitaAccordionsReady==='1') return;
    const sections=[...root.querySelectorAll('section.account-card.full-span')].filter(s=>/ongoing orders|previous orders/i.test(s.querySelector('h2')?.textContent||''));
    sections.forEach((section,idx)=>{
      const h2=section.querySelector('h2'); const body=section.querySelector('.orders-list'); if(!h2 || !body || section.classList.contains('nita-account-order-accordion')) return;
      section.classList.add('nita-account-order-accordion');
      const title=h2.textContent.trim();
      const count=body.querySelectorAll('.order-card-pro,.account-order,.order-card').length;
      const button=document.createElement('button');
      button.type='button'; button.className='nita-account-order-toggle'; button.setAttribute('aria-expanded','false');
      button.innerHTML='<span>'+esc(title)+'</span><em>'+count+'</em><strong>+</strong>';
      h2.replaceWith(button);
      body.classList.add('nita-account-order-body');
      body.hidden=true;
      button.addEventListener('click',function(){
        const open=button.getAttribute('aria-expanded')==='true';
        button.setAttribute('aria-expanded', String(!open));
        button.querySelector('strong').textContent=open?'+':'−';
        body.hidden=open;
        section.classList.toggle('open', !open);
      });
    });
    root.dataset.nitaAccordionsReady='1';
  }
  const prevRenderAccount=window.renderAccount;
  window.renderAccount=async function(){
    const r=prevRenderAccount ? await prevRenderAccount.apply(this, arguments) : undefined;
    setTimeout(function(){ enhancePhones(); enhanceAccountOrderAccordions(); },30);
    return r;
  };
  const prevRenderLogin=window.renderLoginPage;
  window.renderLoginPage=function(){ const r=prevRenderLogin ? prevRenderLogin.apply(this, arguments):undefined; setTimeout(enhancePhones,30); return r; };
  const prevSwitch=window.switchAuthMode;
  window.switchAuthMode=function(){ const r=prevSwitch ? prevSwitch.apply(this, arguments):undefined; setTimeout(enhancePhones,30); return r; };
  document.addEventListener('DOMContentLoaded',function(){ setTimeout(function(){enhancePhones(); enhanceAccountOrderAccordions();},500); });
})();
/* === END NITA PHONE FLAGS + SMART LENGTHS + ACCOUNT ORDER ACCORDIONS FINAL === */

/* === NITA STYLE BACK-IN-STOCK NOTIFY + 72H OUT-OF-STOCK + ADMIN PRODUCT SPLIT FINAL === */
(function(){
  const NOTIFY_KEY = 'nitaStockNotifications';
  const OUT_HOURS = 72;
  const OUT_MS = OUT_HOURS * 60 * 60 * 1000;
  const PAST_HIDDEN_MS = OUT_MS;
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const read = (k,f) => { try { return JSON.parse(localStorage.getItem(k) || JSON.stringify(f)); } catch(e){ return f; } };
  const write = (k,v) => localStorage.setItem(k, JSON.stringify(v));
  const now = () => Date.now();
  const moneyX = n => { try { return typeof money === 'function' ? money(n) : ('$' + Number(n||0).toFixed(2)); } catch(e){ return '$' + Number(n||0).toFixed(2); } };
  const productsRaw = () => { try { return typeof getProducts === 'function' ? getProducts() : read('nitaProducts', []); } catch(e){ return read('nitaProducts', []); } };
  const qtyNumber = v => v !== undefined && v !== null && v !== '' && !Number.isNaN(Number(v)) ? Number(v) : null;
  const keySize = s => String(s || '').trim().toLowerCase();
  const unique = arr => [...new Set((arr || []).map(x => String(x || '').trim()).filter(Boolean))];
  function normalizeProduct(p){
    p = p || {};
    if(!Array.isArray(p.sizes) || !p.sizes.length) p.sizes = ['One Size'];
    if(!Array.isArray(p.outOfStockSizes)) p.outOfStockSizes = [];
    p.outOfStockSizes = unique(p.outOfStockSizes).filter(s => p.sizes.some(x => keySize(x) === keySize(s)));
    if(!Array.isArray(p.photos)) p.photos = p.img && String(p.img).startsWith('data:') ? [p.img] : [];
    if(typeof p.mainPhotoIndex !== 'number') p.mainPhotoIndex = Number(p.mainPhotoIndex || 0);
    const q = qtyNumber(p.quantity);
    const manual = String(p.status || (p.soldOut ? 'out-of-stock' : 'in-stock')).trim().toLowerCase();
    if(q !== null && q <= 0) p.status = 'out-of-stock';
    else if(manual === 'coming-soon') p.status = 'coming-soon';
    else if(manual === 'out-of-stock' || p.soldOut) p.status = 'out-of-stock';
    else {
      const initial = qtyNumber(p.initialQuantity);
      if(q !== null && initial !== null && initial > 0 && q > 0 && q <= initial * 0.5) p.status = 'low-stock';
      else p.status = 'in-stock';
    }
    p.soldOut = p.status === 'out-of-stock';
    if(p.status === 'out-of-stock') {
      if(!p.outOfStockAt) p.outOfStockAt = now();
    } else {
      if(p.outOfStockAt) p.lastRestockedAt = now();
      delete p.outOfStockAt;
    }
    return p;
  }
  function isOverallOut(p){ p = normalizeProduct({...p}); return p.status === 'out-of-stock' || p.soldOut || qtyNumber(p.quantity) === 0; }
  function isPublicVisible(raw){
    const p = normalizeProduct({...raw});
    if(!isOverallOut(p)) return true;
    const t = Number(p.outOfStockAt || now());
    return (now() - t) < PAST_HIDDEN_MS;
  }
  function isSizeOut(p,size){ return (p.outOfStockSizes || []).some(s => keySize(s) === keySize(size)); }
  async function cloudSave(key,val){
    write(key,val);
    try { if(typeof window.nitaSaveKeyStrict === 'function') return await window.nitaSaveKeyStrict(key,val); } catch(e){ console.warn(e); }
    try { if(typeof window.saveCloudKey === 'function') return await window.saveCloudKey(key,val); } catch(e){ console.warn(e); }
    try { if(typeof window.saveSharedKeyNow === 'function') return await window.saveSharedKeyNow(key,val); } catch(e){ console.warn(e); }
    try { await fetch('/.netlify/functions/store', {method:'POST', headers:{'Content-Type':'application/json','Cache-Control':'no-cache'}, body:JSON.stringify({key,value:val})}); } catch(e){ console.warn(e); }
  }
  async function saveProductsFinal(ps){
    ps = (Array.isArray(ps)?ps:[]).map(p => normalizeProduct(p));
    await cloudSave('nitaProducts', ps);
    return true;
  }
  function currentUser(){ try { return JSON.parse(localStorage.getItem('nitaUser') || '{}'); } catch(e){ return {}; } }
  function productMain(p){ try { return typeof productMainImage === 'function' ? productMainImage(p) : (p.photos?.[p.mainPhotoIndex||0] || p.photos?.[0] || p.img || 'linear-gradient(135deg,#fff,#ddd)'); } catch(e){ return p?.photos?.[0] || p?.img || 'linear-gradient(135deg,#fff,#ddd)'; } }
  function bg(img){ try { return typeof cssBgImage === 'function' ? cssBgImage(img) : (String(img||'').startsWith('data:') ? `background-image:url(${img})` : `background:${img||'linear-gradient(135deg,#fff,#ddd)'}`); } catch(e){ return 'background:linear-gradient(135deg,#fff,#ddd)'; } }

  // Make product status/timer global and final.
  window.normalizeProductStatus = normalizeProduct;
  window.productStatusValue = function(p){ return normalizeProduct({...p}).status; };
  window.nitaProductIsPublicVisible = isPublicVisible;
  window.nitaProductsPublic = function(list){ return (list || productsRaw()).map(p => normalizeProduct({...p})).filter(isPublicVisible); };
  window.stockStatusHtml = function(status){
    const labels = {'in-stock':'In stock','low-stock':'Low in stock','coming-soon':'Coming soon','out-of-stock':'Out of stock'};
    status = String(status || 'in-stock');
    return `<span class="stock-status ${esc(status)}"><span class="stock-dot"></span><span>${esc(labels[status] || 'In stock')}</span></span>`;
  };
  window.productPriceStatusRow = function(raw,tag='p'){
    const p = normalizeProduct({...raw});
    const sale = p.salePrice !== '' && p.salePrice != null && Number(p.salePrice) < Number(p.price);
    const price = sale ? `<span class="muted old-price">${moneyX(p.price)}</span><span class="price-drop">${moneyX(p.salePrice)}</span>` : moneyX(p.price || 0);
    return `<div class="product-price-row"><${tag} class="price-line">${price}</${tag}>${window.stockStatusHtml(p.status)}</div>`;
  };

  // Hide out-of-stock products after 72 hours from public grids, but keep them in admin database.
  const prevRenderProducts = window.renderProducts;
  window.renderProducts = function(el='#products', list){
    const node = document.querySelector(el); if(!node) return;
    const shouldFilter = !String(el).includes('admin');
    const source = list || productsRaw();
    const finalList = (shouldFilter ? window.nitaProductsPublic(source) : (source || []).map(p => normalizeProduct({...p})));
    if(finalList.length) node.innerHTML = finalList.map(p => window.productCard ? window.productCard(p) : '').join('');
    else node.innerHTML = '<p class="muted">No products listed yet.</p>';
  };
  const prevShopPage = window.shopPage;
  window.shopPage = function(){
    const filter = document.getElementById('filter');
    const url = new URL(location.href);
    let cat = url.searchParams.get('cat') || filter?.value || 'All';
    if(filter) filter.value = cat;
    let list = productsRaw().map(p=>normalizeProduct({...p})).filter(p => cat === 'All' || p.category === cat);
    window.renderProducts('#products', list);
  };
  const prevHome = window.renderHomeSections;
  window.renderHomeSections = function(){
    const ps = window.nitaProductsPublic(productsRaw());
    const homeSection = p => p.displaySection || p.homeSection || (p.collection === 'New Arrivals' ? 'new-arrivals' : 'trending-now');
    const fill = (id, list) => {
      const box=document.getElementById(id); if(!box) return;
      const src = list.length ? list : ps.slice(0,6);
      if(!src.length){ box.innerHTML='<p class="muted">No products listed yet.</p>'; return; }
      const html = src.map(p => window.productCard ? window.productCard(p) : '').join('');
      box.innerHTML = html + html;
    };
    fill('trendingMarquee', ps.filter(p => homeSection(p) === 'trending-now'));
    fill('newArrivalsMarquee', ps.filter(p => homeSection(p) === 'new-arrivals'));
    if(!document.getElementById('trendingMarquee') && typeof prevHome === 'function') return prevHome.apply(this, arguments);
  };

  // Final product cards and product page actions include Notify Me when not buyable.
  const prevProductCard = window.productCard;
  window.productCard = function(raw){
    const p = normalizeProduct({...raw});
    if(!isPublicVisible(p) && !document.body.classList.contains('admin-page')) return '';
    const img = productMain(p);
    const sale = p.salePrice !== '' && p.salePrice != null && Number(p.salePrice) < Number(p.price);
    return `<article class="product status-${esc(p.status)}" data-product-id="${esc(p.id)}"><a class="product-hit" href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-img">${sale?'<span class="sale-badge">PRICE DROP</span>':''}<span class="product-img-layer product-img-primary" style="${bg(img)}"></span><span class="product-img-layer product-img-secondary" style="${bg(img)}"></span></div><h3>${esc(p.name||'Product')}</h3>${window.productPriceStatusRow(p,'p')}</a><button class="quick-view-btn" type="button" data-quick-id="${esc(p.id)}" onclick="event.stopPropagation();event.preventDefault();openQuickView('${String(p.id).replace(/'/g,"\\'")}')">QUICK VIEW</button></article>`;
  };

  window.notifyMe = async function(productId, size){
    const user = currentUser();
    const email = String(user.email || '').trim().toLowerCase();
    if(!email){
      try { toast('Please sign in or create an account first so we can email you.'); } catch(e){}
      setTimeout(()=>{ location.href='login.html'; }, 700);
      return;
    }
    const ps = productsRaw().map(p => normalizeProduct({...p}));
    const p = ps.find(x => String(x.id) === String(productId));
    if(!p){ try{toast('Product not found.')}catch(e){} return; }
    const chosenSize = size || window.selectedSize || document.querySelector('.product-size-list .size.active, #quickContent .size.active')?.textContent || '';
    const subs = read(NOTIFY_KEY, []);
    const exists = subs.some(s => String(s.email).toLowerCase() === email && String(s.productId) === String(productId) && String(s.size || '') === String(chosenSize || '') && !s.notified);
    if(!exists){
      subs.push({id:'STOCK'+Date.now(), productId:p.id, productName:p.name, size:chosenSize || '', email, firstName:user.firstName || user.name || '', createdAt:new Date().toISOString(), notified:false});
      await cloudSave(NOTIFY_KEY, subs);
    }
    try{ toast(exists ? 'You are already on the notify list for this product.' : 'Done. We will email you when this product is back in stock.'); }catch(e){}
  };

  async function sendBackInStockFor(product, oldProduct){
    const p = normalizeProduct({...product});
    const old = oldProduct ? normalizeProduct({...oldProduct}) : {};
    const wasOut = oldProduct && (isOverallOut(old) || String(old.status||'') === 'out-of-stock');
    const nowIn = p.status === 'in-stock' || p.status === 'low-stock';
    const oldOutSizes = new Set((old.outOfStockSizes || []).map(keySize));
    const newOutSizes = new Set((p.outOfStockSizes || []).map(keySize));
    const sizesBack = (p.sizes || []).filter(s => oldOutSizes.has(keySize(s)) && !newOutSizes.has(keySize(s)));
    if(!wasOut && !sizesBack.length) return;
    if(!nowIn && !sizesBack.length) return;
    const subs = read(NOTIFY_KEY, []);
    let changed = false;
    const toSend = subs.filter(s => !s.notified && String(s.productId) === String(p.id) && (
      (!s.size && wasOut && nowIn) ||
      (s.size && sizesBack.some(x => keySize(x) === keySize(s.size))) ||
      (s.size && wasOut && nowIn && !(p.outOfStockSizes||[]).some(x => keySize(x) === keySize(s.size)))
    ));
    for(const sub of toSend){
      try{
        await window.sendStoreEmail?.({type:'back_in_stock', to:sub.email, product:{id:p.id,name:p.name,price:p.salePrice || p.price}, size:sub.size || ''});
        sub.notified = true; sub.notifiedAt = new Date().toISOString(); changed = true;
      }catch(e){ console.warn('Back-in-stock email failed:', e); }
    }
    if(changed) await cloudSave(NOTIFY_KEY, subs);
  }

  // Prevent adding hidden/out-of-stock products to cart, and cap by private quantity.
  window.addToCart = function(id, size='One Size'){
    const ps = productsRaw().map(p => normalizeProduct({...p}));
    const p = ps.find(x => String(x.id) === String(id));
    if(!p){ try{toast('Product not found.')}catch(e){} return; }
    if(!isPublicVisible(p) || p.status === 'out-of-stock' || p.status === 'coming-soon') { try{toast('This product is not available.')}catch(e){} return; }
    if(isSizeOut(p,size)){ try{toast('This size is out of stock.')}catch(e){} return; }
    const q = qtyNumber(p.quantity);
    const cart = read('nitaCart', []);
    const existing = cart.find(i => String(i.id) === String(id) && String(i.size) === String(size));
    const nextQty = (existing ? Number(existing.qty || 1) : 0) + 1;
    if(q !== null && nextQty > q){ try{toast(`Only ${q} piece${q===1?'':'s'} available.`)}catch(e){} return; }
    if(existing) existing.qty = nextQty;
    else cart.push({id:p.id, size, qty:1, name:p.name, price:Number(p.salePrice || p.price || 0), photo:productMain(p)});
    window.cart = cart; write('nitaCart', cart); try{ saveCart?.(); renderCartPanel?.(); updateCartCount?.(); toast?.('Added to cart'); }catch(e){}
  };

  // Final checkout stock decrement: set outOfStockAt from the exact second the item reaches 0.
  const previousPlaceOrder = window.placeOrder;
  window.placeOrder = async function(){
    const before = productsRaw().map(p => ({...p, sizes:[...(p.sizes||[])], outOfStockSizes:[...(p.outOfStockSizes||[])]}));
    const result = previousPlaceOrder ? await previousPlaceOrder.apply(this, arguments) : undefined;
    const after = productsRaw().map(p => normalizeProduct(p));
    let changed = false;
    after.forEach(p => { if(p.status === 'out-of-stock' && !p.outOfStockAt){ p.outOfStockAt = now(); changed = true; } });
    if(changed) await saveProductsFinal(after);
    return result;
  };

  // Admin product editor: split active/out-of-stock products like order tabs.
  function isAdminOut(p){ p = normalizeProduct({...p}); return isOverallOut(p); }
  function adminView(){ return localStorage.getItem('nitaAdminProductsView') === 'out' ? 'out' : 'in'; }
  window.nitaSwitchAdminProducts = function(view){ localStorage.setItem('nitaAdminProductsView', view === 'out' ? 'out' : 'in'); window.renderAdminProducts?.(); };
  function editorHTML(p){
    if(typeof window.productEditorHTML === 'function') return window.productEditorHTML(p);
    return '<p class="muted">Editor unavailable.</p>';
  }
  window.renderAdminProducts = function(){
    const box = document.getElementById('adminProducts'); if(!box) return;
    const all = productsRaw().map(p => normalizeProduct({...p}));
    const instock = all.filter(p => !isAdminOut(p));
    const out = all.filter(p => isAdminOut(p));
    const active = adminView();
    const list = active === 'out' ? out : instock;
    box.innerHTML = `<div class="admin-toolbar nita-products-toolbar"><div><h2>${active==='out'?'Out-of-stock products':'In-stock products'}</h2><p class="muted">Out-of-stock products stay on the website for 72 hours, then stay here in admin until restocked.</p></div><div class="nita-product-tabs"><button type="button" class="nita-product-tab ${active==='in'?'active':''}" onclick="nitaSwitchAdminProducts('in')">In-stock products <span>${instock.length}</span></button><button type="button" class="nita-product-tab ${active==='out'?'active':''}" onclick="nitaSwitchAdminProducts('out')">Out-of-stock products <span>${out.length}</span></button></div></div>` +
      (list.length ? list.map(p => {
        const img = productMain(p);
        const qty = qtyNumber(p.quantity);
        const hidden = isAdminOut(p) && !isPublicVisible(p);
        return `<div class="admin-product-card" id="edit-${esc(p.id)}"><div class="admin-product-top"><div class="admin-product-photo" style="${bg(img)}"></div><div><div class="admin-product-name">${esc(p.name||'Product')}</div><span class="muted">${esc(p.category||'')} · ${moneyX(p.price||0)} · Private stock: ${qty===null?'Not set':qty}</span><div>${window.stockStatusHtml(p.status)} ${hidden?'<span class="admin-hidden-badge">Hidden from website after 72h</span>':''}</div></div><button type="button" onclick="toggleProductEditor('${String(p.id).replace(/'/g,"\\'")}')">Edit listing</button><button type="button" onclick="removeProduct('${String(p.id).replace(/'/g,"\\'")}')">Remove</button></div><div class="product-editor" id="editor-${esc(p.id)}">${editorHTML(p)}</div></div>`;
      }).join('') : `<div class="admin-empty">${active==='out'?'No out-of-stock products yet.':'No in-stock products yet.'}</div>`);
  };

  // Save product edits with restock notification trigger.
  const previousSaveProductEditor = window.saveProductEditor;
  window.saveProductEditor = async function(id){
    const oldProducts = productsRaw().map(p => ({...p, sizes:[...(p.sizes||[])], outOfStockSizes:[...(p.outOfStockSizes||[])]}));
    const old = oldProducts.find(p => String(p.id) === String(id));
    if(previousSaveProductEditor) await previousSaveProductEditor.apply(this, arguments);
    const ps = productsRaw().map(p => normalizeProduct(p));
    const p = ps.find(x => String(x.id) === String(id));
    if(p){
      const root = document.getElementById('editor-' + id);
      const qtyField = root?.querySelector('.edit-quantity');
      if(qtyField){ const qv = qtyField.value; p.quantity = qv === '' ? '' : Math.max(0, Number(qv || 0)); if(qtyNumber(p.quantity) !== null && qtyNumber(p.quantity) > 0 && p.status === 'out-of-stock') p.status = 'in-stock'; }
      const statusField = root?.querySelector('.edit-status');
      if(statusField) p.status = statusField.value;
      normalizeProduct(p);
      await sendBackInStockFor(p, old);
      await saveProductsFinal(ps);
    }
    setTimeout(()=>window.renderAdminProducts?.(), 150);
  };

  const previousAddProductAdmin = window.addProductAdmin;
  window.addProductAdmin = async function(){
    if(previousAddProductAdmin) await previousAddProductAdmin.apply(this, arguments);
    const ps = productsRaw().map(p => normalizeProduct(p));
    await saveProductsFinal(ps);
    setTimeout(()=>window.renderAdminProducts?.(), 150);
  };

  // Normalize existing products once so old out-of-stock products receive an exact timestamp and persist.
  async function normalizeAndSaveExisting(){
    const ps = productsRaw(); let changed = false;
    ps.forEach(p => { const before = JSON.stringify({status:p.status,outOfStockAt:p.outOfStockAt,quantity:p.quantity,initialQuantity:p.initialQuantity}); normalizeProduct(p); if(JSON.stringify({status:p.status,outOfStockAt:p.outOfStockAt,quantity:p.quantity,initialQuantity:p.initialQuantity}) !== before) changed = true; });
    if(changed) await saveProductsFinal(ps);
    if(document.getElementById('adminProducts')) window.renderAdminProducts?.();
    if(document.getElementById('products')) window.shopPage ? window.shopPage() : window.renderProducts('#products', ps);
    if(document.getElementById('trendingMarquee') || document.getElementById('newArrivalsMarquee')) window.renderHomeSections?.();
  }
  document.addEventListener('DOMContentLoaded', () => setTimeout(normalizeAndSaveExisting, 600));
  window.addEventListener('nita-store-ready', () => setTimeout(normalizeAndSaveExisting, 300));
  window.addEventListener('load', () => setTimeout(normalizeAndSaveExisting, 900));
})();
/* === END NITA STYLE BACK-IN-STOCK NOTIFY + 72H OUT-OF-STOCK + ADMIN PRODUCT SPLIT FINAL === */

/* === NITA STYLE FINAL PATCH: notify-me sign-in modal + guest checkout account creation === */
(function(){
  const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const esc=(v)=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const norm=(v)=>String(v||'').trim().toLowerCase();
  const validEmail=(v)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(norm(v));
  async function cloudSave(key,val){
    write(key,val);
    try{ if(typeof window.nitaSaveKeyStrict==='function') return await window.nitaSaveKeyStrict(key,val); }catch(e){}
    try{ if(typeof window.saveCloudKey==='function') return await window.saveCloudKey(key,val); }catch(e){}
    try{ if(typeof window.saveSharedKeyNow==='function') return await window.saveSharedKeyNow(key,val); }catch(e){}
    try{ await fetch('/.netlify/functions/store',{method:'POST',headers:{'Content-Type':'application/json','Cache-Control':'no-cache'},body:JSON.stringify({key,value:val})}); }catch(e){}
  }
  function users(){return read('nitaUsersByEmail',{})}
  async function saveUserRecord(user){
    if(!user || !validEmail(user.email)) return null;
    const email=norm(user.email);
    const all=users();
    const old=all[email]||{};
    const merged={...old,...user,email,createdAt:old.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};
    all[email]=merged;
    await cloudSave('nitaUsersByEmail',all);
    write('nitaUser',merged);
    localStorage.setItem('nitaSessionEmail',email);
    try{ window.currentUser=merged; currentUser=merged; }catch(e){}
    return merged;
  }
  function getCurrentUser(){
    const local=read('nitaUser',null)||{};
    const email=norm(local.email || localStorage.getItem('nitaSessionEmail'));
    if(!email) return null;
    const all=users();
    return all[email] ? {...all[email],email} : {...local,email};
  }
  function splitName(full){
    const parts=String(full||'').trim().split(/\s+/).filter(Boolean);
    return {firstName:parts.shift()||'',lastName:parts.join(' ')};
  }
  function addressFromForm(form){
    if(!form) return null;
    return {
      label:String(form.get('addressLabel')||'Home').trim()||'Home',
      city:String(form.get('city')||'').trim(),
      street:String(form.get('street')||'').trim(),
      building:String(form.get('building')||'').trim(),
      floor:String(form.get('floor')||'').trim(),
      apartment:String(form.get('apartment')||'').trim(),
      landmark:String(form.get('landmark')||'').trim(),
      preferredTime:String(form.get('preferredTime')||'').trim(),
      notes:String(form.get('notes')||'').trim()
    };
  }
  function sameAddress(a,b){
    return ['city','street','building','floor','apartment'].map(k=>norm(a?.[k])).join('|') === ['city','street','building','floor','apartment'].map(k=>norm(b?.[k])).join('|');
  }
  async function createOrUpdateAccountFromCheckout(){
    const formEl=document.getElementById('checkoutForm'); if(!formEl) return null;
    const form=new FormData(formEl);
    const email=norm(form.get('email'));
    if(!validEmail(email)) return null;
    const full=String(form.get('name')||form.get('fullName')||'').trim();
    const names=splitName(full);
    const phone=String(form.get('phone')||'').trim();
    const addr=addressFromForm(form);
    const all=users();
    const old=all[email]||{};
    let addresses=Array.isArray(old.addresses)?old.addresses.slice():[];
    if(addr && (addr.city || addr.street || addr.building)){
      const idx=addresses.findIndex(a=>sameAddress(a,addr));
      if(idx>=0) addresses[idx]={...addresses[idx],...addr}; else addresses.push(addr);
    }
    return await saveUserRecord({
      ...old,
      email,
      firstName:old.firstName || names.firstName,
      lastName:old.lastName || names.lastName,
      name:old.name || full,
      phone:phone || old.phone || '',
      defaultAddress:addr || old.defaultAddress || null,
      addresses,
      autoCreatedFromCheckout:true
    });
  }

  function modalHtml(){
    return `<div class="nita-auth-modal-backdrop" id="nitaAuthNotifyModal" role="dialog" aria-modal="true" aria-labelledby="nitaAuthNotifyTitle">
      <div class="nita-auth-modal-card">
        <button class="nita-auth-modal-close" type="button" onclick="nitaCloseAuthNotifyModal()" aria-label="Close">×</button>
        <p class="eyebrow">Back-in-stock alert</p>
        <h2 id="nitaAuthNotifyTitle">Sign in to be notified</h2>
        <p class="muted">To save this request and email you when the product is back in stock, please sign in or create an account first.</p>
        <div class="nita-auth-modal-actions">
          <button class="btn" type="button" onclick="nitaGoAuthForNotify()">SIGN IN / CREATE ACCOUNT</button>
          <button class="btn light" type="button" onclick="nitaCloseAuthNotifyModal()">NOT NOW</button>
        </div>
      </div>
    </div>`;
  }
  function ensureModal(){
    if(!document.getElementById('nitaAuthNotifyModal')) document.body.insertAdjacentHTML('beforeend',modalHtml());
    return document.getElementById('nitaAuthNotifyModal');
  }
  window.nitaCloseAuthNotifyModal=function(){document.getElementById('nitaAuthNotifyModal')?.classList.remove('show')};
  window.nitaGoAuthForNotify=function(){
    const pending=read('nitaPendingNotifyMe',null);
    const returnUrl=pending?.returnUrl || location.href;
    localStorage.setItem('nitaAfterLoginRedirect',returnUrl);
    location.href='login.html';
  };
  function openAuthModal(productId,size){
    write('nitaPendingNotifyMe',{productId,size:size||'',returnUrl:location.href,createdAt:new Date().toISOString()});
    ensureModal().classList.add('show');
  }

  const previousNotifyMe=window.notifyMe;
  window.notifyMe=async function(productId,size){
    const user=getCurrentUser();
    if(!user || !validEmail(user.email)){
      openAuthModal(productId,size);
      return;
    }
    return previousNotifyMe ? previousNotifyMe.apply(this,arguments) : undefined;
  };

  async function completePendingNotifyAfterLogin(){
    const pending=read('nitaPendingNotifyMe',null);
    const user=getCurrentUser();
    if(!pending || !user || !validEmail(user.email) || !window.notifyMe) return;
    localStorage.removeItem('nitaPendingNotifyMe');
    try{ await window.notifyMe(pending.productId,pending.size); }catch(e){ console.warn(e); }
  }

  const previousLogin=window.login;
  window.login=function(){
    const beforeRedirect=localStorage.getItem('nitaAfterLoginRedirect');
    if(previousLogin) previousLogin.apply(this,arguments);
    // If the legacy login did not navigate immediately, handle the saved return URL.
    setTimeout(()=>{
      const u=getCurrentUser();
      const target=beforeRedirect || localStorage.getItem('nitaAfterLoginRedirect');
      if(u && validEmail(u.email) && target){
        localStorage.removeItem('nitaAfterLoginRedirect');
        location.href=target;
      }
    },60);
  };

  const previousPlaceOrder=window.placeOrder;
  window.placeOrder=async function(){
    await createOrUpdateAccountFromCheckout();
    return previousPlaceOrder ? previousPlaceOrder.apply(this,arguments) : undefined;
  };

  function boot(){
    ensureModal();
    setTimeout(completePendingNotifyAfterLogin,500);
  }
  document.addEventListener('DOMContentLoaded',boot);
  window.addEventListener('load',boot);
})();
/* === END NITA STYLE FINAL PATCH: notify-me sign-in modal + guest checkout account creation === */


/* === NITA STYLE FINAL FIX: admin product tabs without counts + account order popups === */
(function(){
  const esc=(v)=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}};
  const money=(n)=>{try{return typeof window.money==='function'?window.money(Number(n||0)):'$'+Number(n||0).toFixed(2)}catch(e){return '$'+Number(n||0).toFixed(2)}};
  function productList(){try{return typeof window.getProducts==='function'?window.getProducts():read('nitaProducts',[])}catch(e){return read('nitaProducts',[])}}
  function normStatus(p){
    const q = p && p.quantity !== '' && p.quantity !== undefined && p.quantity !== null ? Number(p.quantity) : null;
    const st = String(p?.status||'in-stock').toLowerCase();
    return st==='out-of-stock' || st==='sold-out' || st==='sold out' || q===0;
  }
  function productImg(p){try{if(typeof window.productMainImage==='function')return window.productMainImage(p)}catch(e){}; const photos=Array.isArray(p?.photos)?p.photos:[]; return photos[Number(p?.mainPhotoIndex||0)]||photos[0]||p?.img||'';}
  function bg(img){try{if(typeof window.cssBgImage==='function')return window.cssBgImage(img)}catch(e){}; return String(img||'').startsWith('linear-gradient')?`background:${img};background-size:cover;background-position:center`:`background-image:url('${String(img||'').replace(/'/g,"%27")}');background-size:cover;background-position:center`;}
  function editor(p){try{if(typeof window.productEditorHTML==='function')return window.productEditorHTML(p)}catch(e){}; return '<p class="muted">Edit form unavailable. Please refresh.</p>';}
  function statusHtml(p){try{if(typeof window.stockStatusHtml==='function')return window.stockStatusHtml(p.status)}catch(e){}; return `<span class="stock-badge">${esc(p.status||'In stock')}</span>`;}
  window.nitaProductAdminView = window.nitaProductAdminView || 'in';
  window.nitaSwitchAdminProducts=function(view){window.nitaProductAdminView=view==='out'?'out':'in'; window.renderAdminProducts?.();};
  window.renderAdminProducts=function(){
    const box=document.getElementById('adminProducts'); if(!box)return;
    const all=productList();
    const inStock=all.filter(p=>!normStatus(p));
    const outStock=all.filter(p=>normStatus(p));
    const active=window.nitaProductAdminView==='out'?'out':'in';
    const list=active==='out'?outStock:inStock;
    box.innerHTML=`<div class="admin-toolbar nita-products-toolbar"><div><h2>${active==='out'?'Out-of-stock products':'In-stock products'}</h2><p class="muted">Manage live products separately from products that are out of stock.</p></div><div class="nita-product-tabs"><button type="button" class="nita-product-tab ${active==='in'?'active':''}" onclick="nitaSwitchAdminProducts('in')">In-stock products</button><button type="button" class="nita-product-tab ${active==='out'?'active':''}" onclick="nitaSwitchAdminProducts('out')">Out-of-stock products</button></div></div>` + (list.length?list.map(p=>{
      const id=String(p.id||'').replace(/'/g,"\\'");
      const img=productImg(p);
      return `<div class="admin-product-card" id="edit-${esc(p.id)}"><div class="admin-product-top"><div class="admin-product-photo" style="${bg(img)}"></div><div><div class="admin-product-name">${esc(p.name||'Product')}</div><span class="muted">${esc(p.category||'')} · ${money(p.price||0)} · Private stock: ${esc(p.quantity??'Not set')}</span><div>${statusHtml(p)}</div></div><button type="button" onclick="toggleProductEditor('${id}')">Edit listing</button><button type="button" onclick="removeProduct('${id}')">Remove</button></div><div class="product-editor" id="editor-${esc(p.id)}">${editor(p)}</div></div>`;
    }).join(''):`<div class="admin-empty">${active==='out'?'No out-of-stock products yet.':'No in-stock products yet.'}</div>`);
  };

  function enhanceAccountOrders(){
    const root=document.getElementById('accountRoot'); if(!root || root.dataset.nitaOrderPopupReady==='1') return;
    const sections=[...root.querySelectorAll('section.account-card.full-span')].filter(sec=>/^(ongoing orders|previous orders)$/i.test(sec.querySelector('h2')?.textContent?.trim()||''));
    if(!sections.length)return;
    sections.forEach((sec,idx)=>{
      const title=sec.querySelector('h2')?.textContent?.trim()||'Orders';
      const content=[...sec.children].filter(el=>el.tagName!=='H2').map(el=>el.outerHTML).join('') || '<p class="muted">No orders yet.</p>';
      const modalId='nitaAccountOrdersModal'+idx;
      sec.className='card account-card full-span nita-account-order-popup-card';
      sec.innerHTML=`<button type="button" class="nita-account-order-popup-trigger" onclick="nitaOpenAccountOrders('${modalId}')"><span>${esc(title)}</span><span class="plus">+</span></button><div class="nita-account-modal-backdrop" id="${modalId}"><div class="nita-account-modal"><div class="nita-account-modal-head"><h2>${esc(title)}</h2><button type="button" class="nita-account-modal-close" onclick="nitaCloseAccountOrders('${modalId}')">×</button></div><div class="nita-account-modal-body">${content}</div></div></div>`;
    });
    root.dataset.nitaOrderPopupReady='1';
  }
  window.nitaOpenAccountOrders=function(id){document.getElementById(id)?.classList.add('show')};
  window.nitaCloseAccountOrders=function(id){document.getElementById(id)?.classList.remove('show')};
  document.addEventListener('click',function(e){const back=e.target.closest('.nita-account-modal-backdrop'); if(back && e.target===back) back.classList.remove('show');});
  const oldRenderAccount=window.renderAccount;
  window.renderAccount=async function(){const r=oldRenderAccount?await oldRenderAccount.apply(this,arguments):undefined; setTimeout(enhanceAccountOrders,60); return r;};
  const oldRenderAdmin=window.renderAdmin;
  window.renderAdmin=async function(){const r=oldRenderAdmin?await oldRenderAdmin.apply(this,arguments):undefined; setTimeout(()=>window.renderAdminProducts?.(),80); return r;};
  document.addEventListener('DOMContentLoaded',()=>{setTimeout(enhanceAccountOrders,500); setTimeout(()=>window.renderAdminProducts?.(),700);});
})();
/* === END NITA STYLE FINAL FIX: admin product tabs without counts + account order popups === */

/* === NITA FINAL ACCOUNT ORDER POPUP CLEAN FIX 20260613 === */
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  window.nitaCleanAccountOrderContent = window.nitaCleanAccountOrderContent || {};
  function getTitle(sec){
    return (sec.querySelector('.nita-account-order-popup-trigger span')?.textContent || sec.querySelector('.nita-account-order-toggle span')?.textContent || sec.querySelector('h2')?.textContent || '').trim();
  }
  function getContent(sec){
    const existingModal = sec.querySelector('.nita-account-modal-body');
    if(existingModal) return existingModal.innerHTML || '<p class="muted">No orders yet.</p>';
    const body = sec.querySelector('.orders-list') || sec.querySelector('.nita-account-order-body');
    if(body) return body.innerHTML || '<p class="muted">No orders yet.</p>';
    const clone = sec.cloneNode(true);
    clone.querySelectorAll('h2,.nita-account-order-toggle,.nita-account-order-popup-trigger,.nita-account-modal-backdrop').forEach(n=>n.remove());
    return clone.innerHTML.trim() || '<p class="muted">No orders yet.</p>';
  }
  function makeClean(){
    const root=document.getElementById('accountRoot'); if(!root) return;
    const sections=[...root.querySelectorAll('section.card.account-card.full-span, section.nita-account-order-popup-card, section.nita-account-order-accordion')]
      .filter(sec=>/^(ongoing orders|previous orders)$/i.test(getTitle(sec)) || /ongoing orders|previous orders/i.test(sec.textContent||''));
    sections.forEach((sec,idx)=>{
      const title=/previous/i.test(getTitle(sec)||sec.textContent)?'Previous orders':'Ongoing orders';
      const key=title.toLowerCase().replace(/\s+/g,'-');
      if(!window.nitaCleanAccountOrderContent[key]) window.nitaCleanAccountOrderContent[key]=getContent(sec);
      sec.className='card account-card full-span nita-clean-order-launch-card';
      sec.removeAttribute('data-nita-ready');
      sec.innerHTML='<button type="button" class="nita-clean-order-launch" onclick="nitaOpenCleanAccountOrders(\''+key+'\')"><span>'+esc(title)+'</span><strong>+</strong></button>';
    });
  }
  window.nitaOpenCleanAccountOrders=function(key){
    const title=key==='previous-orders'?'Previous orders':'Ongoing orders';
    const content=window.nitaCleanAccountOrderContent[key] || '<p class="muted">No orders yet.</p>';
    let overlay=document.getElementById('nitaCleanAccountOrdersModal');
    if(!overlay){
      overlay=document.createElement('div');
      overlay.id='nitaCleanAccountOrdersModal';
      overlay.className='nita-clean-orders-overlay';
      document.body.appendChild(overlay);
    }
    overlay.innerHTML='<div class="nita-clean-orders-modal" role="dialog" aria-modal="true"><div class="nita-clean-orders-head"><h2>'+esc(title)+'</h2><button type="button" class="nita-clean-orders-close" onclick="nitaCloseCleanAccountOrders()">×</button></div><div class="nita-clean-orders-body">'+content+'</div></div>';
    overlay.classList.add('show');
  };
  window.nitaCloseCleanAccountOrders=function(){document.getElementById('nitaCleanAccountOrdersModal')?.classList.remove('show');};
  document.addEventListener('click',function(e){const overlay=e.target.closest('#nitaCleanAccountOrdersModal'); if(overlay && e.target===overlay) window.nitaCloseCleanAccountOrders();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape') window.nitaCloseCleanAccountOrders();});
  const old=window.renderAccount;
  window.renderAccount=async function(){const r=old?await old.apply(this,arguments):undefined; setTimeout(makeClean,180); return r;};
  document.addEventListener('DOMContentLoaded',function(){setTimeout(makeClean,900);});
  window.addEventListener('load',function(){setTimeout(makeClean,1100);});
})();
/* === END NITA FINAL ACCOUNT ORDER POPUP CLEAN FIX 20260613 === */

/* === NITA STYLE REAL FIX: account order launch bars + clean modal only === */
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function read(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f));}catch(e){return f;}}
  function currentEmail(){
    try{ if(window.currentUser&&window.currentUser.email) return String(window.currentUser.email).toLowerCase(); }catch(e){}
    const u=read('nitaCurrentUser',null)||read('currentUser',null)||read('nitaUser',null);
    return u&&u.email?String(u.email).toLowerCase():'';
  }
  function fmtMoney(n){try{return typeof window.money==='function'?window.money(Number(n||0)):'$'+Number(n||0).toFixed(2);}catch(e){return '$'+Number(n||0).toFixed(2);}}
  function allOrders(){
    const email=currentEmail();
    return read('nitaOrders',[]).filter(function(o){return String(o.email||'').toLowerCase()===email;}).sort(function(a,b){return String(b.id||'').localeCompare(String(a.id||''));});
  }
  function splitOrders(type){
    const orders=allOrders();
    const isPast=function(o){return /^(delivered|cancelled|canceled)$/i.test(String(o.status||''));};
    return type==='past'?orders.filter(isPast):orders.filter(function(o){return !isPast(o);});
  }
  function itemsText(o){
    const items=Array.isArray(o.items)?o.items:[];
    if(!items.length) return '';
    return items.map(function(it){return esc((it.name||it.title||it.productName||'Item'))+' × '+esc(it.qty||it.quantity||1);}).join(', ');
  }
  function orderCard(o){
    const status=esc(o.status||'Order submitted');
    const road=(typeof window.orderRoadmapHtml==='function')?window.orderRoadmapHtml(o.status||'Order submitted'):'';
    return '<article class="nita-final-order-card">'
      +'<div class="nita-final-order-main"><div><b>'+esc(o.id||'Order')+'</b><p>'+esc(o.date||'')+' · '+esc(o.payment||'Cash on Delivery')+'</p>'+(itemsText(o)?'<p>'+itemsText(o)+'</p>':'')+'</div><div class="nita-final-order-side"><strong>'+fmtMoney(o.total||0)+'</strong><span>'+status+'</span></div></div>'
      +(road?'<div class="nita-final-order-road">'+road+'</div>':'')+'</article>';
  }
  function modalHtml(type){
    const title=type==='past'?'Previous Orders':'Ongoing Orders';
    const list=splitOrders(type);
    return '<div class="nita-final-orders-box" role="dialog" aria-modal="true"><div class="nita-final-orders-head"><h2>'+title+'</h2><button type="button" class="nita-final-orders-close" onclick="nitaFinalCloseOrders()">×</button></div><div class="nita-final-orders-content">'+(list.length?list.map(orderCard).join(''):'<p class="muted">No '+(type==='past'?'previous':'ongoing')+' orders yet.</p>')+'</div></div>';
  }
  window.nitaFinalOpenOrders=function(type){
    let ov=document.getElementById('nitaFinalOrdersOverlay');
    if(!ov){ov=document.createElement('div');ov.id='nitaFinalOrdersOverlay';ov.className='nita-final-orders-overlay';document.body.appendChild(ov);}
    ov.innerHTML=modalHtml(type);
    ov.classList.add('show');
  };
  window.nitaFinalCloseOrders=function(){document.getElementById('nitaFinalOrdersOverlay')?.classList.remove('show');};
  document.addEventListener('click',function(e){const ov=e.target.closest('#nitaFinalOrdersOverlay'); if(ov && e.target===ov) window.nitaFinalCloseOrders();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape') window.nitaFinalCloseOrders();});
  function replaceSections(){
    const root=document.getElementById('accountRoot'); if(!root) return;
    const sections=[].slice.call(root.querySelectorAll('section.card.account-card.full-span, section.nita-account-order-popup-card, section.nita-clean-order-launch-card, section.nita-account-order-accordion, section'));
    sections.forEach(function(sec){
      const text=(sec.querySelector('h2')?.textContent || sec.querySelector('button span')?.textContent || sec.textContent || '').trim();
      if(!/^(ongoing orders|previous orders)$/i.test(text.replace(/\s+/g,' ').slice(0,40))) return;
      const type=/previous/i.test(text)?'past':'ongoing';
      if(sec.dataset.nitaFinalOrderFixed==='1') return;
      sec.dataset.nitaFinalOrderFixed='1';
      sec.className='card account-card full-span nita-final-order-launch-card';
      sec.innerHTML='<button type="button" class="nita-final-order-trigger" onclick="nitaFinalOpenOrders(\''+type+'\')"><span>'+(type==='past'?'Previous Orders':'Ongoing Orders')+'</span><b>+</b></button>';
    });
  }
  const oldRender=window.renderAccount;
  window.renderAccount=async function(){const r=oldRender?await oldRender.apply(this,arguments):undefined; [20,120,350,800,1400].forEach(function(t){setTimeout(replaceSections,t);}); return r;};
  document.addEventListener('DOMContentLoaded',function(){[50,300,700,1300,2200].forEach(function(t){setTimeout(replaceSections,t);});});
  window.addEventListener('load',function(){[100,500,1000,1800,2800].forEach(function(t){setTimeout(replaceSections,t);});});
})();
/* === END NITA STYLE REAL FIX: account order launch bars + clean modal only === */

/* === NITA ADD PRODUCT SAVE ERROR FIX ONLY 2026-06-13 ===
   Fixes product add internal errors by compressing product images before cloud save.
   Does not change layout/design or other website sections. */
(function(){
  function esc(v){return String(v||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function notifyUser(text, ok, sticky){
    try{ if(typeof window.nitaNotify==='function') return window.nitaNotify(text, ok!==false, !!sticky); }catch(e){}
    try{ if(typeof window.notify==='function') return window.notify(text, ok!==false, !!sticky); }catch(e){}
    try{ if(typeof window.toast==='function') return window.toast(text); }catch(e){}
    console[ok===false?'error':'log'](text);
  }
  function compressFile(file){
    return new Promise(function(resolve){
      try{
        var reader = new FileReader();
        reader.onload = function(ev){
          var raw = ev.target && ev.target.result;
          var img = new Image();
          img.onload = function(){
            try{
              var maxSide = 900;
              var w = img.naturalWidth || img.width;
              var h = img.naturalHeight || img.height;
              var ratio = Math.min(1, maxSide / Math.max(w,h));
              w = Math.max(1, Math.round(w * ratio));
              h = Math.max(1, Math.round(h * ratio));
              var canvas = document.createElement('canvas');
              canvas.width = w; canvas.height = h;
              var ctx = canvas.getContext('2d');
              ctx.fillStyle = '#fff'; ctx.fillRect(0,0,w,h);
              ctx.drawImage(img,0,0,w,h);
              resolve(canvas.toDataURL('image/jpeg', 0.94));
            }catch(err){ resolve(raw || ''); }
          };
          img.onerror = function(){ resolve(raw || ''); };
          img.src = raw;
        };
        reader.onerror = function(){ resolve(''); };
        reader.readAsDataURL(file);
      }catch(err){ resolve(''); }
    });
  }
  function unique(list){
    var out=[];
    (Array.isArray(list)?list:[]).forEach(function(u){u=String(u||''); if(u && out.indexOf(u)===-1) out.push(u);});
    return out;
  }
  function renderPhotos(){
    var box=document.getElementById('photoPreview');
    if(!box) return;
    var photos=unique(window.pendingAdminPhotos || []);
    window.pendingAdminPhotos=photos;
    box.innerHTML = photos.map(function(url,i){
      return '<div class="admin-thumb photo-order-thumb">'
        + '<img src="'+esc(url)+'" alt="Product photo '+(i+1)+'">'
        + '<span>'+(i===0?'Photo 1':'Photo '+(i+1))+'</span>'
        + '<div class="photo-order-controls">'
        + '<button type="button" aria-label="Move photo left" onclick="movePendingPhoto('+i+',-1)" '+(i===0?'disabled':'')+'>←</button>'
        + '<button type="button" aria-label="Move photo right" onclick="movePendingPhoto('+i+',1)" '+(i===photos.length-1?'disabled':'')+'>→</button>'
        + '<button type="button" aria-label="Remove photo" onclick="removePendingPhoto('+i+')">×</button>'
        + '</div></div>';
    }).join('') + (photos.length ? '<p class="muted admin-photo-note">Photo 1 is the main product photo. Images are optimized at high quality for clear product display.</p>' : '');
  }
  window.previewAdminPhotos = function(event){
    var input = event && event.target;
    var files = Array.prototype.slice.call((input && input.files) || []);
    if(!files.length) return;
    notifyUser('Preparing product photos...', true, false);
    Promise.all(files.map(compressFile)).then(function(urls){
      window.pendingAdminPhotos = unique((window.pendingAdminPhotos || []).concat(urls.filter(Boolean)));
      window.pendingAdminMainIndex = 0;
      renderPhotos();
      if(input) input.value='';
    });
  };
  window.movePendingPhoto = function(index, direction){
    var photos=unique(window.pendingAdminPhotos || []);
    index=Number(index); direction=Number(direction);
    var target=index+direction;
    if(target<0 || target>=photos.length) return;
    var tmp=photos[index]; photos[index]=photos[target]; photos[target]=tmp;
    window.pendingAdminPhotos=photos; window.pendingAdminMainIndex=0; renderPhotos();
  };
  window.removePendingPhoto = function(index){
    var photos=unique(window.pendingAdminPhotos || []);
    photos.splice(Number(index),1);
    window.pendingAdminPhotos=photos; window.pendingAdminMainIndex=0; renderPhotos();
  };
  document.addEventListener('change', function(e){
    var input=e.target && e.target.closest && e.target.closest('#pphotos');
    if(!input) return;
    e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    window.previewAdminPhotos({target:input});
  }, true);
})();
/* === END NITA ADD PRODUCT SAVE ERROR FIX ONLY === */


/* === NITA STYLE FINAL PRODUCT SAVE + REMOVE STYLE NOTE FIX 2026-06-13 ===
   Fixes only: add-product global save reliability and removes Style note selector/logic. */
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function readJSON(k,f){try{return JSON.parse(localStorage.getItem(k)||'null')??f}catch(e){return f}}
  function writeJSON(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
  function msg(text, ok, sticky){
    try{ if(typeof window.nitaNotify==='function') return window.nitaNotify(text, ok!==false, !!sticky); }catch(e){}
    try{ if(typeof window.toast==='function') return window.toast(text); }catch(e){}
    console[ok===false?'error':'log'](text);
  }
  function products(){try{return typeof getProducts==='function'?getProducts():readJSON('nitaProducts',[])}catch(e){return readJSON('nitaProducts',[])}}
  function moneyNum(v){return Number(String(v==null?'':v).trim()||0)}
  function selected(selector){
    var out=[]; document.querySelectorAll(selector).forEach(function(el){
      if(el.classList.contains('on')||el.classList.contains('active')||el.checked){var v=el.dataset.size||el.value||el.textContent; v=String(v||'').trim(); if(v && !out.includes(v)) out.push(v);}
    }); return out;
  }
  function normalize(p){try{if(typeof normalizeProductStatus==='function')return normalizeProductStatus(p)}catch(e){} try{if(typeof normalizeProduct==='function')return normalizeProduct(p)}catch(e){} return p}

  function compressDataUrl(url){
    return new Promise(function(resolve){
      url=String(url||'');
      if(!url.startsWith('data:image/')) return resolve(url);
      var img=new Image();
      img.onload=function(){
        try{
          var maxSide=520;
          var w=img.naturalWidth||img.width||1, h=img.naturalHeight||img.height||1;
          var ratio=Math.min(1, maxSide/Math.max(w,h));
          w=Math.max(1,Math.round(w*ratio)); h=Math.max(1,Math.round(h*ratio));
          var canvas=document.createElement('canvas'); canvas.width=w; canvas.height=h;
          var ctx=canvas.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h); ctx.drawImage(img,0,0,w,h);
          resolve(canvas.toDataURL('image/jpeg',0.94));
        }catch(e){resolve(url)}
      };
      img.onerror=function(){resolve(url)};
      img.src=url;
    });
  }
  async function compactProduct(p){
    p=normalize(Object.assign({},p));
    delete p.style; delete p.styleNote; delete p.colorStyle;
    // Remove the style note idea from new/edited products. Keep only real product info.
    p.note = '';
    var photos=Array.isArray(p.photos)?p.photos.filter(Boolean):[];
    if(!photos.length && p.img) photos=[p.img];
    photos = photos.slice(0,4);
    photos = await Promise.all(photos.map(compressDataUrl));
    p.photos = photos;
    p.mainPhotoIndex = Math.max(0, Math.min(Number(p.mainPhotoIndex||0), Math.max(photos.length-1,0)));
    p.img = photos[p.mainPhotoIndex] || photos[0] || 'linear-gradient(135deg,#fff,#ddd)';
    return p;
  }
  async function compactProducts(list){return Promise.all((Array.isArray(list)?list:[]).map(compactProduct));}

  window.saveProducts = async function(next){
    var clean = await compactProducts(next);
    writeJSON('nitaProducts', clean);
    try{
      var res = await fetch('/.netlify/functions/store', {
        method:'POST',
        headers:{'Content-Type':'application/json','Cache-Control':'no-cache'},
        body: JSON.stringify({ key:'nitaProducts', value: clean })
      });
      var bodyText = await res.text();
      if(!res.ok) throw new Error(bodyText || ('Cloud save failed '+res.status));
      var remoteRes = await fetch('/.netlify/functions/store?ts='+Date.now(), {cache:'no-store', headers:{'Cache-Control':'no-cache'}});
      if(remoteRes.ok){
        var remote = await remoteRes.json();
        if(remote && Array.isArray(remote.nitaProducts)) writeJSON('nitaProducts', remote.nitaProducts);
      }
      msg('Product saved globally.', true);
      return true;
    }catch(err){
      console.error('Nita product save failed:', err);
      msg('Product was not saved globally: '+(err.message||err)+'. Please check Netlify Functions before adding products.', false, true);
      return false;
    }
  };

  function compressFile(file){
    return new Promise(function(resolve){
      try{
        var reader=new FileReader();
        reader.onload=function(ev){compressDataUrl(ev.target.result).then(resolve)};
        reader.onerror=function(){resolve('')};
        reader.readAsDataURL(file);
      }catch(e){resolve('')}
    });
  }
  function unique(a){var out=[];(Array.isArray(a)?a:[]).forEach(function(v){v=String(v||''); if(v && !out.includes(v)) out.push(v)});return out;}
  function renderPhotos(){
    var box=document.getElementById('photoPreview'); if(!box)return;
    var photos=unique(window.pendingAdminPhotos||[]); window.pendingAdminPhotos=photos;
    box.innerHTML=photos.map(function(u,i){return '<div class="admin-thumb photo-order-thumb"><img src="'+esc(u)+'" alt="Product photo '+(i+1)+'"><span>'+(i===0?'Photo 1':'Photo '+(i+1))+'</span><div class="photo-order-controls"><button type="button" onclick="movePendingPhoto('+i+',-1)" '+(i===0?'disabled':'')+'>←</button><button type="button" onclick="movePendingPhoto('+i+',1)" '+(i===photos.length-1?'disabled':'')+'>→</button><button type="button" onclick="removePendingPhoto('+i+')">×</button></div></div>'}).join('') + (photos.length?'<p class="muted admin-photo-note">Photo 1 is the main product photo. Photos are optimized at high quality for clear product display.</p>':'');
  }
  window.previewAdminPhotos=function(event){
    var input=event&&event.target; var files=Array.prototype.slice.call((input&&input.files)||[]); if(!files.length)return;
    msg('Preparing product photos...', true);
    Promise.all(files.map(compressFile)).then(function(urls){
      window.pendingAdminPhotos=unique((window.pendingAdminPhotos||[]).concat(urls.filter(Boolean)));
      window.pendingAdminMainIndex=0; renderPhotos(); if(input)input.value='';
    });
  };
  window.movePendingPhoto=function(i,d){var photos=unique(window.pendingAdminPhotos||[]);i=Number(i);d=Number(d);var t=i+d;if(t<0||t>=photos.length)return;var tmp=photos[i];photos[i]=photos[t];photos[t]=tmp;window.pendingAdminPhotos=photos;window.pendingAdminMainIndex=0;renderPhotos();};
  window.removePendingPhoto=function(i){var photos=unique(window.pendingAdminPhotos||[]);photos.splice(Number(i),1);window.pendingAdminPhotos=photos;window.pendingAdminMainIndex=0;renderPhotos();};

  function removeStyleFields(root){
    (root||document).querySelectorAll('#pstyle, .edit-style').forEach(function(el){var wrap=el.closest('div'); if(wrap) wrap.remove();});
    (root||document).querySelectorAll('label').forEach(function(label){
      if(/style note/i.test(label.textContent||'')){var wrap=label.closest('div'); if(wrap) wrap.remove();}
    });
  }
  window.nitaRemoveStyleFields = removeStyleFields;

  var oldRenderAdmin = window.renderAdmin;
  if(typeof oldRenderAdmin==='function'){
    window.renderAdmin = async function(){var r=await oldRenderAdmin.apply(this,arguments); setTimeout(function(){removeStyleFields(document)},20); setTimeout(function(){removeStyleFields(document)},250); return r;};
  }
  document.addEventListener('DOMContentLoaded',function(){setTimeout(function(){removeStyleFields(document)},300);});
  window.addEventListener('load',function(){setTimeout(function(){removeStyleFields(document)},800);});

  window.addProductAdmin = async function(){
    var name=String(document.getElementById('pname')?.value||'').trim();
    var price=moneyNum(document.getElementById('pprice')?.value);
    if(!name){msg('Please enter a product name.', false);return false;}
    if(!price||price<=0){msg('Please enter a valid product price.', false);return false;}
    var photos=unique(window.pendingAdminPhotos||[]);
    photos=await Promise.all(photos.map(compressDataUrl));
    var main=Math.max(0,Math.min(Number(window.pendingAdminMainIndex||0),Math.max(photos.length-1,0)));
    var sale=String(document.getElementById('psale')?.value||'').trim();
    var available=selected('#sizePicker .pill.on,#sizePicker .pill.active,#sizePicker input:checked');
    var out=selected('#sizeOutPicker .pill.on,#sizeOutPicker .pill.active,#sizeOutPicker input:checked');
    var sizes=unique((available.length?available:[]).concat(out));
    var qtyRaw=document.getElementById('pquantity')?.value;
    var qty=(qtyRaw===undefined||qtyRaw==='')?'':Math.max(0,Number(qtyRaw));
    var section=document.getElementById('phome')?.value||'trending-now';
    var product=normalize({
      id:'p'+Date.now(), name:name, price:price, salePrice:sale===''?'':Number(sale),
      status:document.getElementById('pstatus')?.value||'in-stock',
      category:document.getElementById('pcat')?.value||'Tops',
      collection:document.getElementById('pcollection')?.value||'Everyday Edit',
      displaySection:section, homeSection:section, note:'',
      sizes:sizes.length?sizes:['One Size'], outOfStockSizes:out, quantity:qty, initialQuantity:qty,
      photos:photos, mainPhotoIndex:main, img:photos[main]||photos[0]||'linear-gradient(135deg,#fff,#ddd)',
      desc:String(document.getElementById('pdesc')?.value||'').trim()||'A carefully selected piece for a clean, feminine wardrobe.'
    });
    msg('Saving product globally...', true);
    try{ if(typeof window.loadSharedStore==='function') await window.loadSharedStore(); }catch(e){}
    var next=products().filter(function(p){return String(p.id)!==String(product.id)}); next.push(product);
    var ok=await window.saveProducts(next); if(!ok)return false;
    window.pendingAdminPhotos=[]; window.pendingAdminMainIndex=0;
    ['pname','pprice','psale','pdesc','pquantity'].forEach(function(id){var el=document.getElementById(id); if(el) el.value='';});
    document.querySelectorAll('#sizePicker .pill.on,#sizePicker .pill.active,#sizeOutPicker .pill.on,#sizeOutPicker .pill.active').forEach(function(el){el.classList.remove('on','active')});
    var input=document.getElementById('pphotos'); if(input) input.value=''; var prev=document.getElementById('photoPreview'); if(prev) prev.innerHTML='';
    try{await window.loadSharedStore?.()}catch(e){} try{await window.renderAdmin?.()}catch(e){}
    msg('Product added to the website globally.', true); return true;
  };

  var oldSaveEditor = window.saveProductEditor;
  window.saveProductEditor = async function(id){
    removeStyleFields(document);
    if(typeof oldSaveEditor === 'function'){
      await oldSaveEditor.apply(this, arguments);
      try{
        var ps=products().map(function(p){ if(String(p.id)===String(id)){p.note=''; delete p.style; delete p.styleNote;} return p; });
        await window.saveProducts(ps);
      }catch(e){console.warn(e)}
    }
  };
})();
/* === END NITA STYLE FINAL PRODUCT SAVE + REMOVE STYLE NOTE FIX === */


/* Final 20260613: high-quality product image handling.
   Keeps uploaded product photos clear while still resizing very large files safely for Netlify. */
(function(){
  function readAsDataURL(file){
    return new Promise(function(resolve,reject){
      var reader=new FileReader();
      reader.onload=function(e){resolve(e.target.result)};
      reader.onerror=reject;
      reader.readAsDataURL(file);
    });
  }
  function optimizeImage(dataUrl){
    return new Promise(function(resolve){
      var img=new Image();
      img.onload=function(){
        var w=img.naturalWidth||img.width, h=img.naturalHeight||img.height;
        var max=2400;
        if(w<=max && h<=max){ resolve(dataUrl); return; }
        var scale=Math.min(max/w,max/h);
        var canvas=document.createElement('canvas');
        canvas.width=Math.round(w*scale);
        canvas.height=Math.round(h*scale);
        var ctx=canvas.getContext('2d');
        ctx.imageSmoothingEnabled=true;
        ctx.imageSmoothingQuality='high';
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        resolve(canvas.toDataURL('image/jpeg',0.94));
      };
      img.onerror=function(){resolve(dataUrl)};
      img.src=dataUrl;
    });
  }
  function fileToHighQualityDataURL(file){ return readAsDataURL(file).then(optimizeImage); }
  window.fileToHighQualityDataURL=fileToHighQualityDataURL;

  window.renderPendingPhotos=function(){
    var box=document.getElementById('photoPreview'); if(!box) return;
    var photos=window.pendingPhotos||[];
    var esc=function(v){return String(v||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
    box.innerHTML=photos.map(function(u,i){return '<div class="admin-thumb photo-order-thumb"><img src="'+esc(u)+'" alt="Product photo '+(i+1)+'"><span>'+(i===0?'Photo 1':'Photo '+(i+1))+'</span><div class="photo-order-controls"><button type="button" onclick="movePendingPhoto('+i+',-1)" '+(i===0?'disabled':'')+'>←</button><button type="button" onclick="movePendingPhoto('+i+',1)" '+(i===photos.length-1?'disabled':'')+'>→</button><button type="button" onclick="removePendingPhoto('+i+')">×</button></div></div>'}).join('') + (photos.length?'<p class="muted admin-photo-note">Photo 1 is the main product photo. Photos are saved in high quality and only resized if they are extremely large.</p>':'');
  };
  window.handleProductPhotos=function(e){
    var files=Array.from((e&&e.target&&e.target.files)||[]);
    if(!files.length) return;
    var status=document.getElementById('productSaveStatus');
    if(status) status.innerHTML='<div class="admin-save-hint">Preparing high-quality photos…</div>';
    Promise.all(files.slice(0,8).map(fileToHighQualityDataURL)).then(function(urls){
      window.pendingPhotos=urls;
      window.renderPendingPhotos();
      if(status) status.innerHTML='';
    }).catch(function(){
      if(status) status.innerHTML='<div class="email-status-warn">One photo could not be prepared. Please try another image.</div>';
    });
  };
})();

/* Final 20260613: premium product image quality override.
   Keeps product uploads as close as possible to the original device image.
   Only very large images are resized, and compression is near-lossless for product clarity. */
(function(){
  function readFile(file){
    return new Promise(function(resolve,reject){
      var r=new FileReader();
      r.onload=function(e){resolve(e.target.result)};
      r.onerror=reject;
      r.readAsDataURL(file);
    });
  }
  function preserveProductImage(dataUrl){
    return new Promise(function(resolve){
      var img=new Image();
      img.onload=function(){
        var w=img.naturalWidth||img.width;
        var h=img.naturalHeight||img.height;
        /* For normal product photos, keep the original file data exactly.
           Resize only oversized photos so Netlify/global storage does not fail. */
        var maxSide=3600;
        if(w<=maxSide && h<=maxSide){
          resolve(dataUrl);
          return;
        }
        var scale=Math.min(maxSide/w,maxSide/h);
        var canvas=document.createElement('canvas');
        canvas.width=Math.round(w*scale);
        canvas.height=Math.round(h*scale);
        var ctx=canvas.getContext('2d');
        ctx.imageSmoothingEnabled=true;
        ctx.imageSmoothingQuality='high';
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        resolve(canvas.toDataURL('image/jpeg',0.985));
      };
      img.onerror=function(){resolve(dataUrl)};
      img.src=dataUrl;
    });
  }
  window.fileToHighQualityDataURL=function(file){
    return readFile(file).then(preserveProductImage);
  };
  window.handleProductPhotos=function(e){
    var files=Array.from((e&&e.target&&e.target.files)||[]);
    if(!files.length) return;
    var status=document.getElementById('productSaveStatus');
    if(status) status.innerHTML='<div class="admin-save-hint">Preparing premium-quality photos…</div>';
    Promise.all(files.slice(0,8).map(window.fileToHighQualityDataURL)).then(function(urls){
      window.pendingPhotos=urls;
      if(typeof window.renderPendingPhotos==='function') window.renderPendingPhotos();
      if(status) status.innerHTML='<div class="admin-save-ok">Premium-quality photos ready.</div>';
      setTimeout(function(){ if(status) status.innerHTML=''; },1600);
    }).catch(function(){
      if(status) status.innerHTML='<div class="email-status-warn">One photo could not be prepared. Please try another image.</div>';
    });
  };
})();

/* Final 20260613: product gallery arrows + reliable hover second image + smoother homepage marquees */
(function(){
  function esc(v){return String(v ?? '').replace(/[&<>"']/g,function(ch){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[ch];});}
  function getProductsSafe(){try{return typeof getProducts==='function'?getProducts():[]}catch(e){return []}}
  function normalize(p){try{return typeof normalizeProductStatus==='function'?normalizeProductStatus(p||{}):(p||{})}catch(e){return p||{}}}
  function moneySafe(v){try{return typeof money==='function'?money(v):('$'+Number(v||0).toFixed(2))}catch(e){return '$'+Number(v||0).toFixed(2)}}
  function priceHtml(p){try{return typeof productPriceStatusRow==='function'?productPriceStatusRow(p,'p'):'<p>'+moneySafe(p.salePrice||p.price)+'</p>'}catch(e){return '<p>'+moneySafe(p.salePrice||p.price)+'</p>'}}
  function bg(u){
    var s=String(u||'');
    if(!s) return 'background:linear-gradient(135deg,#f7f7f7,#e9e9e9)';
    if(typeof cssBgImage==='function') return cssBgImage(s);
    if(s.indexOf('data:')===0 || /^https?:/i.test(s) || s.indexOf('/')>=0) return 'background-image:url("'+s.replace(/"/g,'&quot;')+'")';
    return 'background:'+s;
  }
  function photosOf(raw){
    var p=normalize(raw);
    var photos=[];
    if(Array.isArray(p.photos)) photos=p.photos.filter(Boolean);
    if(!photos.length && p.img) photos=[p.img];
    if(!photos.length) photos=['linear-gradient(135deg,#f7f7f7,#e9e9e9)'];
    return photos;
  }
  function productById(id){return getProductsSafe().map(normalize).find(function(p){return String(p.id)===String(id)})}

  window.nitaCardPhotoNext=function(btn,dir){
    var card=btn && btn.closest ? btn.closest('.product') : null;
    if(!card) return false;
    var id=card.getAttribute('data-product-id');
    var p=productById(id); if(!p) return false;
    var photos=photosOf(p); if(photos.length<2) return false;
    var idx=Number(card.dataset.photoIndex||0);
    idx=(idx+dir+photos.length)%photos.length;
    card.dataset.photoIndex=String(idx);
    var primary=card.querySelector('.product-img-primary');
    var secondary=card.querySelector('.product-img-secondary');
    if(primary){primary.setAttribute('style',bg(photos[idx])+';background-size:cover;background-position:center;');}
    if(secondary){secondary.setAttribute('style',bg(photos[(idx+1)%photos.length])+';background-size:cover;background-position:center;');}
    var dots=card.querySelectorAll('.product-photo-dot');
    dots.forEach(function(d,i){d.classList.toggle('active',i===idx);});
    return false;
  };

  window.productCard=function(raw){
    var p=normalize(raw); var photos=photosOf(p); var sale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price);
    var title=esc(p.name||'Product'); var second=photos[1] || photos[0];
    var controls = photos.length>1 ? '<button class="product-photo-arrow product-photo-prev" type="button" aria-label="Previous product photo" onclick="event.preventDefault();event.stopPropagation();return nitaCardPhotoNext(this,-1)">‹</button><button class="product-photo-arrow product-photo-next" type="button" aria-label="Next product photo" onclick="event.preventDefault();event.stopPropagation();return nitaCardPhotoNext(this,1)">›</button><div class="product-photo-dots">'+photos.slice(0,5).map(function(_,i){return '<span class="product-photo-dot '+(i===0?'active':'')+'"></span>';}).join('')+'</div>' : '';
    return '<article class="product status-'+esc(p.status||'in-stock')+'" data-product-id="'+esc(p.id)+'" data-photo-index="0"><a class="product-hit" href="product.html?id='+encodeURIComponent(p.id)+'"><div class="product-img">'+(sale?'<span class="sale-badge">PRICE DROP</span>':'')+'<span class="product-img-layer product-img-primary" style="'+bg(photos[0])+';background-size:cover;background-position:center;"></span><span class="product-img-layer product-img-secondary" style="'+bg(second)+';background-size:cover;background-position:center;"></span>'+controls+'</div><h3>'+title+'</h3>'+priceHtml(p)+'</a><button class="quick-view-btn" type="button" data-quick-id="'+esc(p.id)+'" aria-label="Quick view '+title+'">QUICK VIEW</button></article>';
  };

  window.renderProducts=function(el,list){
    var node=document.querySelector(el||'#products'); if(!node) return;
    var arr=list || getProductsSafe();
    node.innerHTML=(arr||[]).map(window.productCard).join('') || '<p class="muted">No products listed yet.</p>';
  };

  function productHomeSection(p){try{return window.productHomeSection?p.homeSection||p.displaySection||window.productHomeSection(p):p.homeSection||p.displaySection||''}catch(e){return p.homeSection||p.displaySection||''}}
  function renderHomeSmooth(){
    var products=getProductsSafe().map(normalize);
    var pairs=[['trendingMarquee','trending-now'],['newArrivalsMarquee','new-arrivals']];
    pairs.forEach(function(pair){
      var box=document.getElementById(pair[0]); if(!box) return;
      var list=products.filter(function(p){return productHomeSection(p)===pair[1];});
      if(!list.length) list=products.slice(0,8);
      if(!list.length){box.innerHTML='<p class="muted">No products listed yet.</p>'; return;}
      var repeated=[]; for(var i=0;i<5;i++) repeated=repeated.concat(list);
      box.classList.add('nita-smooth-marquee');
      box.innerHTML=repeated.map(window.productCard).join('');
      box.style.setProperty('--nita-marquee-distance','-'+(100/5)+'%');
    });
  }
  window.renderHomeSections=renderHomeSmooth;

  function injectProductPageArrows(){
    var detail=document.getElementById('detail'); if(!detail) return;
    var id=new URL(location.href).searchParams.get('id'); var p=productById(id); if(!p) return;
    var photos=photosOf(p); if(photos.length<2) return;
    var img=detail.querySelector('.detail-img'); if(!img || img.querySelector('.detail-photo-arrow')) return;
    img.classList.add('has-detail-arrows');
    img.insertAdjacentHTML('beforeend','<button type="button" class="detail-photo-arrow detail-photo-prev" aria-label="Previous product photo">‹</button><button type="button" class="detail-photo-arrow detail-photo-next" aria-label="Next product photo">›</button>');
    img.querySelector('.detail-photo-prev').addEventListener('click',function(e){e.preventDefault();e.stopPropagation();window.selectedPhoto=(Number(window.selectedPhoto||0)-1+photos.length)%photos.length; window.productPage&&window.productPage();});
    img.querySelector('.detail-photo-next').addEventListener('click',function(e){e.preventDefault();e.stopPropagation();window.selectedPhoto=(Number(window.selectedPhoto||0)+1)%photos.length; window.productPage&&window.productPage();});
  }
  var oldProductPage=window.productPage;
  if(typeof oldProductPage==='function'){
    window.productPage=function(){var r=oldProductPage.apply(this,arguments); setTimeout(injectProductPageArrows,0); return r;};
  }
  document.addEventListener('DOMContentLoaded',function(){setTimeout(function(){if(document.getElementById('products')) window.renderProducts('#products',getProductsSafe()); renderHomeSmooth(); injectProductPageArrows();},250);});
  window.addEventListener('load',function(){setTimeout(function(){renderHomeSmooth(); injectProductPageArrows();},650);});
  window.addEventListener('nita-store-ready',function(){setTimeout(function(){if(document.getElementById('products')) window.renderProducts('#products',getProductsSafe()); renderHomeSmooth(); injectProductPageArrows();},100);});
})();

/* Final 20260613: true premium image preservation, clean product title, centered gallery arrows */
(function(){
  function esc(v){return String(v ?? '').replace(/[&<>"']/g,function(ch){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[ch];});}
  function safeId(v){return String(v ?? '').replace(/\\/g,'\\\\').replace(/'/g,"\\'");}
  function productsSafe(){try{return typeof getProducts==='function'?getProducts():[]}catch(e){return []}}
  function norm(p){try{return typeof normalizeProductStatus==='function'?normalizeProductStatus(p||{}):(p||{})}catch(e){return p||{}}}
  function photosOf(p){p=norm(p); var ph=Array.isArray(p.photos)?p.photos.filter(Boolean):[]; if(!ph.length&&p.img) ph=[p.img]; if(!ph.length) ph=['']; return ph;}
  function moneySafe(v){try{return typeof money==='function'?money(v):('$'+Number(v||0).toFixed(2))}catch(e){return '$'+Number(v||0).toFixed(2)}}
  function isOOS(p,s){try{return typeof isSizeOOS==='function'?isSizeOOS(p,s):false}catch(e){return false}}
  function prodImages(p){try{return typeof productImagesForDisplay==='function'?productImagesForDisplay(p):{all:photosOf(p),first:photosOf(p)[0]}}catch(e){return {all:photosOf(p),first:photosOf(p)[0]}}}
  function priceStatus(p,tag){try{return typeof productPriceStatusRow==='function'?productPriceStatusRow(p,tag):('<'+tag+'>'+moneySafe(p.salePrice||p.price)+'</'+tag+'>')}catch(e){return '<'+tag+'>'+moneySafe(p.salePrice||p.price)+'</'+tag+'>'}}
  function sizeButtons(p){
    p=norm(p); var sizes=Array.isArray(p.sizes)&&p.sizes.length?p.sizes:['One Size'];
    var active=sizes.find(function(s){return !isOOS(p,s)})||sizes[0];
    window.selectedSize=(window.selectedSize&&sizes.includes(window.selectedSize)&&!isOOS(p,window.selectedSize))?window.selectedSize:active;
    return sizes.map(function(s){var off=isOOS(p,s); return '<button type="button" class="size '+(s===window.selectedSize?'active':'')+' '+(off?'size-disabled':'')+'" '+(off?'disabled aria-disabled="true" title="Out of stock"':'onclick="selectedSize=\''+esc(s)+'\';productPage()"')+'>'+esc(s)+'</button>';}).join('');
  }
  function isVisualSource(s){return String(s||'').indexOf('data:image')===0 || /^https?:/i.test(String(s||'')) || /^assets\//i.test(String(s||''));}
  function imgTag(src,cls,alt){
    src=String(src||'');
    if(!isVisualSource(src)) return '<div class="'+cls+' nita-image-placeholder"></div>';
    return '<img class="'+cls+'" src="'+esc(src)+'" alt="'+esc(alt||'Product image')+'" loading="eager" decoding="async" draggable="false">';
  }
  window.nitaDetailPhoto=function(dir){
    var id=new URL(location.href).searchParams.get('id');
    var p=norm(productsSafe().find(function(x){return String(x.id)===String(id)})||productsSafe()[0]);
    var imgs=prodImages(p).all||photosOf(p); if(!imgs.length) return;
    window.selectedPhoto=(Number(window.selectedPhoto||0)+dir+imgs.length)%imgs.length;
    if(typeof window.productPage==='function') window.productPage();
  };
  window.productPage=function(){
    var detail=document.getElementById('detail'); if(!detail) return;
    var id=new URL(location.href).searchParams.get('id');
    var p=norm(productsSafe().find(function(x){return String(x.id)===String(id)})||productsSafe()[0]);
    if(!p||!p.id){detail.innerHTML='<div class="card"><h1>Product not found</h1><a class="btn" href="shop.html">BACK TO SHOP</a></div>';return;}
    var imgs=(prodImages(p).all||photosOf(p)).filter(Boolean); if(!imgs.length) imgs=[''];
    window.selectedPhoto=Math.min(Math.max(Number(window.selectedPhoto||0),0),imgs.length-1);
    var current=imgs[window.selectedPhoto];
    var canBuy=(p.status||'in-stock')==='in-stock' && !isOOS(p,window.selectedSize);
    var action=canBuy?'<button class="btn" onclick="addToCart(\''+safeId(p.id)+'\',selectedSize||\'One Size\')">ADD TO CART</button><a class="btn light" href="checkout.html">BUY NOW</a>':'<button class="btn disabled" disabled aria-disabled="true">'+((p.status==='coming-soon')?'COMING SOON':((p.status==='out-of-stock')?'OUT OF STOCK':'SIZE OUT OF STOCK'))+'</button><button class="notify-btn" type="button" onclick="notifyMe&&notifyMe(\''+safeId(p.id)+'\')">NOTIFY ME</button>';
    var arrows=imgs.length>1?'<button type="button" class="detail-photo-arrow detail-photo-prev" aria-label="Previous product photo" onclick="nitaDetailPhoto(-1)"><span>‹</span></button><button type="button" class="detail-photo-arrow detail-photo-next" aria-label="Next product photo" onclick="nitaDetailPhoto(1)"><span>›</span></button>':'';
    detail.innerHTML='<div class="product-media nita-premium-product-media"><div class="detail-img nita-premium-detail-img">'+imgTag(current,'nita-detail-real-img',p.name)+arrows+'</div><div class="product-thumbs">'+imgs.map(function(ph,i){return '<button class="'+(i===window.selectedPhoto?'active':'')+'" onclick="selectedPhoto='+i+';productPage()">'+imgTag(ph,'nita-thumb-real-img',p.name+' photo '+(i+1))+'</button>';}).join('')+'</div></div><div class="product-info nita-premium-product-info"><p class="muted">'+esc(p.category||'')+'</p><h1>'+esc(p.name||'Product')+'</h1>'+priceStatus(p,'h2')+'<p>'+esc(p.desc||'')+'</p><div class="sizes product-size-list">'+sizeButtons(p)+'</div><div class="product-actions">'+action+'</div></div>';
  };

  function readOriginal(file){return new Promise(function(resolve,reject){var r=new FileReader(); r.onload=function(e){resolve(e.target.result)}; r.onerror=reject; r.readAsDataURL(file);});}
  function optionalResizeOnlyIfExtreme(dataUrl){
    return new Promise(function(resolve){
      var img=new Image();
      img.onload=function(){
        var w=img.naturalWidth||img.width, h=img.naturalHeight||img.height;
        var maxSide=6000;
        if(w<=maxSide && h<=maxSide){resolve(dataUrl);return;}
        var scale=Math.min(maxSide/w,maxSide/h), canvas=document.createElement('canvas');
        canvas.width=Math.round(w*scale); canvas.height=Math.round(h*scale);
        var ctx=canvas.getContext('2d'); ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality='high';
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        resolve(canvas.toDataURL('image/jpeg',0.995));
      };
      img.onerror=function(){resolve(dataUrl)}; img.src=dataUrl;
    });
  }
  window.fileToHighQualityDataURL=function(file){return readOriginal(file).then(optionalResizeOnlyIfExtreme);};
  window.handleProductPhotos=function(e){
    var files=Array.from((e&&e.target&&e.target.files)||[]); if(!files.length) return;
    var status=document.getElementById('productSaveStatus');
    if(status) status.innerHTML='<div class="admin-save-hint">Preparing original-quality product photos…</div>';
    Promise.all(files.slice(0,8).map(window.fileToHighQualityDataURL)).then(function(urls){
      window.pendingPhotos=urls; window.pendingAdminPhotos=urls;
      if(typeof window.renderPendingPhotos==='function') window.renderPendingPhotos();
      if(status) status.innerHTML='<div class="admin-save-ok">Original-quality photos ready.</div>';
      setTimeout(function(){if(status) status.innerHTML='';},1400);
    }).catch(function(){if(status) status.innerHTML='<div class="email-status-warn">One photo could not be prepared. Please try another image.</div>';});
  };
  window.previewEditPhotos=function(e,id){
    var files=Array.from((e&&e.target&&e.target.files)||[]); if(!files.length) return;
    Promise.all(files.slice(0,8).map(window.fileToHighQualityDataURL)).then(function(urls){
      window.editingPhotoBuffers=window.editingPhotoBuffers||{}; window.editingMainPhotoIndex=window.editingMainPhotoIndex||{};
      window.editingPhotoBuffers[id]=urls; window.editingMainPhotoIndex[id]=0;
      if(typeof window.setEditMainPhoto==='function') window.setEditMainPhoto(id,0);
    });
  };
})();

/* Final override 20260613: EXACT ORIGINAL PRODUCT IMAGE QUALITY
   This deliberately stops all product-photo resizing/compression.
   Uploaded product images are stored as the original FileReader data URL.
   This is heavier, but keeps the uploaded device quality as closely as a browser can display it. */
(function(){
  function $(id){return document.getElementById(id)}
  function esc(s){return String(s==null?'':s).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function readJSON(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}}
  function writeJSON(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
  function msg(t,ok){
    try{ if(typeof nitaNotify==='function') return nitaNotify(t, ok!==false, ok===false); }catch(e){}
    try{ if(typeof toast==='function') return toast(t); }catch(e){}
    console[ok===false?'error':'log'](t);
  }
  function getPs(){try{return typeof getProducts==='function'?getProducts():readJSON('nitaProducts',[])}catch(e){return readJSON('nitaProducts',[])}}
  function unique(arr){var out=[];(Array.isArray(arr)?arr:[]).forEach(function(v){v=String(v||''); if(v && out.indexOf(v)===-1) out.push(v)});return out;}
  function selected(selector){var out=[];document.querySelectorAll(selector).forEach(function(el){if(el.classList.contains('on')||el.classList.contains('active')||el.checked){var v=String(el.dataset.size||el.value||el.textContent||'').trim(); if(v&&out.indexOf(v)===-1) out.push(v);}});return out;}
  function moneyNum(v){return Number(String(v==null?'':v).trim()||0)}
  function normalize(p){try{if(typeof normalizeProductStatus==='function')return normalizeProductStatus(p)}catch(e){} try{if(typeof normalizeProduct==='function')return normalizeProduct(p)}catch(e){} return p;}
  function readOriginalDataUrl(file){
    return new Promise(function(resolve){
      if(!file) return resolve('');
      try{var r=new FileReader(); r.onload=function(e){resolve(e.target.result||'')}; r.onerror=function(){resolve('')}; r.readAsDataURL(file);}catch(e){resolve('')}
    });
  }
  window.fileToHighQualityDataURL = readOriginalDataUrl;
  window.fileToOriginalQualityDataURL = readOriginalDataUrl;

  function renderOriginalPhotoPreview(){
    var box=$('photoPreview'); if(!box) return;
    var photos=unique(window.pendingAdminPhotos||[]); window.pendingAdminPhotos=photos; window.pendingPhotos=photos;
    box.innerHTML=photos.map(function(u,i){return '<div class="admin-thumb photo-order-thumb"><img src="'+esc(u)+'" alt="Product photo '+(i+1)+'"><span>'+(i===0?'Photo 1':'Photo '+(i+1))+'</span><div class="photo-order-controls"><button type="button" onclick="movePendingPhoto('+i+',-1)" '+(i===0?'disabled':'')+'>←</button><button type="button" onclick="movePendingPhoto('+i+',1)" '+(i===photos.length-1?'disabled':'')+'>→</button><button type="button" onclick="removePendingPhoto('+i+')">×</button></div></div>'}).join('') + (photos.length?'<p class="muted admin-photo-note">Original uploaded files are kept at full quality. For best speed, upload clean JPG/PNG photos from your device.</p>':'');
  }
  window.renderPendingPhotos = renderOriginalPhotoPreview;
  window.previewAdminPhotos = function(event){
    var input=event&&event.target; var files=Array.prototype.slice.call((input&&input.files)||[]); if(!files.length) return;
    msg('Preparing original-quality product photos…', true);
    Promise.all(files.slice(0,10).map(readOriginalDataUrl)).then(function(urls){
      window.pendingAdminPhotos=unique((window.pendingAdminPhotos||[]).concat(urls.filter(Boolean)));
      window.pendingPhotos=window.pendingAdminPhotos;
      window.pendingAdminMainIndex=0; window.pendingMainIndex=0;
      renderOriginalPhotoPreview();
      if(input) input.value='';
      msg('Original-quality photos ready.', true);
    });
  };
  window.handleProductPhotos = window.previewAdminPhotos;
  window.movePendingPhoto=function(i,d){var photos=unique(window.pendingAdminPhotos||[]);i=Number(i);d=Number(d);var t=i+d;if(t<0||t>=photos.length)return;var tmp=photos[i];photos[i]=photos[t];photos[t]=tmp;window.pendingAdminPhotos=photos;window.pendingPhotos=photos;window.pendingAdminMainIndex=0;renderOriginalPhotoPreview();};
  window.removePendingPhoto=function(i){var photos=unique(window.pendingAdminPhotos||[]);photos.splice(Number(i),1);window.pendingAdminPhotos=photos;window.pendingPhotos=photos;window.pendingAdminMainIndex=0;renderOriginalPhotoPreview();};

  window.saveProducts = async function(next){
    var clean=(Array.isArray(next)?next:[]).map(function(p){
      p=normalize(Object.assign({},p));
      var photos=unique(Array.isArray(p.photos)?p.photos:(p.img?[p.img]:[]));
      p.photos=photos;
      p.mainPhotoIndex=Math.max(0,Math.min(Number(p.mainPhotoIndex||0),Math.max(photos.length-1,0)));
      p.img=photos[p.mainPhotoIndex]||photos[0]||p.img||'linear-gradient(135deg,#fff,#ddd)';
      delete p.style; delete p.styleNote; delete p.colorStyle; p.note=p.note||'';
      return p;
    });
    writeJSON('nitaProducts',clean);
    try{
      var res=await fetch('/.netlify/functions/store',{method:'POST',headers:{'Content-Type':'application/json','Cache-Control':'no-cache'},body:JSON.stringify({key:'nitaProducts',value:clean})});
      var txt=await res.text();
      if(!res.ok) throw new Error(txt||('Cloud save failed '+res.status));
      msg('Product saved globally in original image quality.', true);
      return true;
    }catch(err){
      console.error('Original-quality product save failed:',err);
      msg('Product was not saved globally: '+(err.message||err)+'. If the images are extremely large, Netlify may reject the upload. Use fewer photos or smaller original files.', false);
      return false;
    }
  };

  window.previewEditPhotos=function(e,id){
    var files=Array.prototype.slice.call((e&&e.target&&e.target.files)||[]); if(!files.length) return;
    Promise.all(files.slice(0,10).map(readOriginalDataUrl)).then(function(urls){
      window.editingPhotoBuffers=window.editingPhotoBuffers||{}; window.editingMainPhotoIndex=window.editingMainPhotoIndex||{};
      window.editingPhotoBuffers[id]=urls.filter(Boolean); window.editingMainPhotoIndex[id]=0;
      if(typeof window.setEditMainPhoto==='function') window.setEditMainPhoto(id,0);
    });
  };

  window.addProductAdmin=async function(){
    var name=String($('pname')?.value||'').trim();
    var price=moneyNum($('pprice')?.value);
    if(!name){msg('Please enter a product name.', false);return false;}
    if(!price||price<=0){msg('Please enter a valid product price.', false);return false;}
    var photos=unique(window.pendingAdminPhotos||window.pendingPhotos||[]);
    var main=Math.max(0,Math.min(Number(window.pendingAdminMainIndex||0),Math.max(photos.length-1,0)));
    var available=selected('#sizePicker .pill.on,#sizePicker .pill.active,#sizePicker input:checked');
    var out=selected('#sizeOutPicker .pill.on,#sizeOutPicker .pill.active,#sizeOutPicker input:checked');
    var sizes=unique((available.length?available:[]).concat(out));
    var qtyRaw=$('pquantity')?.value;
    var qty=(qtyRaw===undefined||qtyRaw==='')?'':Math.max(0,Number(qtyRaw));
    var sale=String($('psale')?.value||'').trim();
    var section=$('phome')?.value||'trending-now';
    var product=normalize({
      id:'p'+Date.now(), name:name, price:price, salePrice:sale===''?'':Number(sale),
      status:$('pstatus')?.value||'in-stock', category:$('pcat')?.value||'Tops', collection:$('pcollection')?.value||'Everyday Edit',
      displaySection:section, homeSection:section, note:'', sizes:sizes.length?sizes:['One Size'], outOfStockSizes:out,
      quantity:qty, initialQuantity:qty, photos:photos, mainPhotoIndex:main, img:photos[main]||photos[0]||'linear-gradient(135deg,#fff,#ddd)',
      desc:String($('pdesc')?.value||'').trim()||'A carefully selected piece for a clean, feminine wardrobe.'
    });
    msg('Saving original-quality product globally…', true);
    try{if(typeof window.loadSharedStore==='function') await window.loadSharedStore();}catch(e){}
    var next=getPs().filter(function(p){return String(p.id)!==String(product.id)}); next.push(product);
    var ok=await window.saveProducts(next); if(!ok) return false;
    window.pendingAdminPhotos=[]; window.pendingPhotos=[]; window.pendingAdminMainIndex=0;
    ['pname','pprice','psale','pdesc','pquantity'].forEach(function(id){var el=$(id); if(el) el.value='';});
    var input=$('pphotos'); if(input) input.value=''; var prev=$('photoPreview'); if(prev) prev.innerHTML='';
    try{await window.loadSharedStore?.()}catch(e){} try{await window.renderAdmin?.()}catch(e){}
    msg('Product added globally with original-quality images.', true);
    return true;
  };
})();

/* FINAL 20260613: product page premium fit + admin listed product real image preview */
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function safe(v){return String(v==null?'':v).replace(/\\/g,'\\\\').replace(/'/g,"\\'")}
  function read(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}}
  function products(){try{return typeof window.getProducts==='function'?window.getProducts():read('nitaProducts',[])}catch(e){return read('nitaProducts',[])}}
  function norm(p){try{return typeof window.normalizeProductStatus==='function'?window.normalizeProductStatus(p||{}):(p||{})}catch(e){return p||{}}}
  function money(v){try{return typeof window.money==='function'?window.money(v):('$'+Number(v||0).toFixed(2))}catch(e){return '$'+Number(v||0).toFixed(2)}}
  function statusHtml(p){try{return typeof window.stockStatusHtml==='function'?window.stockStatusHtml(p.status):'<span class="stock-status">'+esc(p.status||'In stock')+'</span>'}catch(e){return '<span class="stock-status">'+esc(p.status||'In stock')+'</span>'}}
  function photos(p){p=norm(p);var a=Array.isArray(p.photos)?p.photos.filter(Boolean):[];if(!a.length&&p.img)a=[p.img];return a;}
  function mainPhoto(p){var a=photos(p);var i=Math.max(0,Math.min(Number(p&&p.mainPhotoIndex||0),Math.max(a.length-1,0)));return a[i]||a[0]||'';}
  function isImage(src){src=String(src||'');return src.indexOf('data:image')===0||/^https?:/i.test(src)||/^assets\//i.test(src);}
  function imgTag(src,cls,alt){return isImage(src)?'<img class="'+cls+'" src="'+esc(src)+'" alt="'+esc(alt||'Product image')+'" loading="eager" decoding="sync" draggable="false">':'<div class="'+cls+' nita-image-placeholder"></div>';}
  function oos(p){var q=(p&&p.quantity!==''&&p.quantity!=null)?Number(p.quantity):null;var s=String(p&&p.status||'in-stock').toLowerCase();return s==='out-of-stock'||s==='sold-out'||s==='sold out'||q===0;}
  function editor(p){try{return typeof window.productEditorHTML==='function'?window.productEditorHTML(p):'<p class="muted">Edit form unavailable. Refresh the page.</p>'}catch(e){return '<p class="muted">Edit form unavailable. Refresh the page.</p>'}}
  function sizeOOS(p,s){try{return typeof window.isSizeOOS==='function'?window.isSizeOOS(p,s):false}catch(e){return false}}
  function priceRow(p){try{return typeof window.productPriceStatusRow==='function'?window.productPriceStatusRow(p,'h2'):'<h2>'+money(p.salePrice||p.price)+'</h2>'}catch(e){return '<h2>'+money(p.salePrice||p.price)+'</h2>'}}
  function sizes(p){p=norm(p);var list=Array.isArray(p.sizes)&&p.sizes.length?p.sizes:['One Size'];var active=list.find(function(s){return !sizeOOS(p,s)})||list[0];window.selectedSize=(window.selectedSize&&list.includes(window.selectedSize)&&!sizeOOS(p,window.selectedSize))?window.selectedSize:active;return list.map(function(s){var off=sizeOOS(p,s);return '<button type="button" class="size '+(s===window.selectedSize?'active':'')+' '+(off?'size-disabled':'')+'" '+(off?'disabled aria-disabled="true"':'onclick="selectedSize=\''+esc(s)+'\';productPage()"')+'>'+esc(s)+'</button>';}).join('')}
  window.nitaDetailPhoto=function(dir){var id=new URL(location.href).searchParams.get('id');var p=norm(products().find(function(x){return String(x.id)===String(id)})||products()[0]);var a=photos(p);if(!a.length)return;window.selectedPhoto=(Number(window.selectedPhoto||0)+Number(dir||0)+a.length)%a.length;window.productPage&&window.productPage();};
  window.productPage=function(){
    var detail=document.getElementById('detail');if(!detail)return;
    var id=new URL(location.href).searchParams.get('id');var p=norm(products().find(function(x){return String(x.id)===String(id)})||products()[0]);
    if(!p||!p.id){detail.innerHTML='<div class="card"><h1>Product not found</h1><a class="btn" href="shop.html">BACK TO SHOP</a></div>';return;}
    var a=photos(p);if(!a.length)a=[''];window.selectedPhoto=Math.max(0,Math.min(Number(window.selectedPhoto||0),a.length-1));var current=a[window.selectedPhoto];
    var canBuy=String(p.status||'in-stock')==='in-stock'&&!sizeOOS(p,window.selectedSize);
    var action=canBuy?'<button class="btn" onclick="addToCart(\''+safe(p.id)+'\',selectedSize||\'One Size\')">ADD TO CART</button><a class="btn light" href="checkout.html">BUY NOW</a>':'<button class="btn disabled" disabled>'+(p.status==='coming-soon'?'COMING SOON':'OUT OF STOCK')+'</button><button class="notify-btn" type="button" onclick="notifyMe&&notifyMe(\''+safe(p.id)+'\')">NOTIFY ME</button>';
    var arrows=a.length>1?'<button type="button" class="detail-photo-arrow detail-photo-prev" aria-label="Previous product photo" onclick="nitaDetailPhoto(-1)"><span>‹</span></button><button type="button" class="detail-photo-arrow detail-photo-next" aria-label="Next product photo" onclick="nitaDetailPhoto(1)"><span>›</span></button>':'';
    detail.innerHTML='<div class="product-media nita-premium-product-media"><div class="detail-img nita-premium-detail-img">'+imgTag(current,'nita-detail-real-img',p.name)+arrows+'</div><div class="product-thumbs">'+a.map(function(ph,i){return '<button type="button" class="'+(i===window.selectedPhoto?'active':'')+'" onclick="selectedPhoto='+i+';productPage()">'+imgTag(ph,'nita-thumb-real-img',p.name+' photo '+(i+1))+'</button>';}).join('')+'</div></div><div class="product-info nita-premium-product-info"><p class="muted">'+esc(p.category||'')+'</p><h1>'+esc(p.name||'Product')+'</h1>'+priceRow(p)+'<button class="btn light product-detail-fav" onclick="toggleLike&&toggleLike(\''+safe(p.id)+'\',event)">♡ ADD TO LIKED ITEMS</button><p>'+esc(p.desc||'')+'</p><div class="sizes product-size-list">'+sizes(p)+'</div><div class="product-actions">'+action+'</div></div>';
  };
  window.nitaProductAdminView=window.nitaProductAdminView||'in';
  window.nitaSwitchAdminProducts=function(view){window.nitaProductAdminView=view==='out'?'out':'in';window.renderAdminProducts&&window.renderAdminProducts();};
  window.renderAdminProducts=function(){var box=document.getElementById('adminProducts');if(!box)return;var all=products().map(norm);var active=window.nitaProductAdminView==='out'?'out':'in';var list=all.filter(function(p){return active==='out'?oos(p):!oos(p)});box.innerHTML='<div class="admin-toolbar nita-products-toolbar"><div><h2>'+(active==='out'?'Out-of-stock products':'In-stock products')+'</h2><p class="muted">Manage live products separately from products that are out of stock.</p></div><div class="nita-product-tabs"><button type="button" class="nita-product-tab '+(active==='in'?'active':'')+'" onclick="nitaSwitchAdminProducts(\'in\')">In-stock products</button><button type="button" class="nita-product-tab '+(active==='out'?'active':'')+'" onclick="nitaSwitchAdminProducts(\'out\')">Out-of-stock products</button></div></div>'+(list.length?list.map(function(p){var im=mainPhoto(p);return '<div class="admin-product-card" id="edit-'+esc(p.id)+'"><div class="admin-product-top"><div class="admin-product-photo '+(isImage(im)?'':'is-empty')+'">'+(isImage(im)?'<img src="'+esc(im)+'" alt="'+esc(p.name||'Product')+'">':'')+'</div><div><div class="admin-product-name">'+esc(p.name||'Product')+'</div><span class="muted">'+esc(p.category||'')+' · '+money(p.price||0)+' · Private stock: '+esc(p.quantity??'Not set')+'</span><div>'+statusHtml(p)+'</div></div><button type="button" onclick="toggleProductEditor(\''+safe(p.id)+'\')">Edit listing</button><button type="button" onclick="removeProduct(\''+safe(p.id)+'\')">Remove</button></div><div class="product-editor" id="editor-'+esc(p.id)+'">'+editor(p)+'</div></div>';}).join(''):'<div class="admin-empty">'+(active==='out'?'No out-of-stock products yet.':'No in-stock products yet.')+'</div>')};
  document.addEventListener('DOMContentLoaded',function(){setTimeout(function(){if(document.getElementById('detail'))window.productPage();if(document.getElementById('adminProducts'))window.renderAdminProducts();},250)});
  window.addEventListener('nita-store-ready',function(){setTimeout(function(){if(document.getElementById('detail'))window.productPage();if(document.getElementById('adminProducts'))window.renderAdminProducts();},150)});
})();

/* TRUE FINAL 20260613-1535: premium product media/buttons + admin preview + original photo storage */
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function safe(v){return String(v==null?'':v).replace(/\\/g,'\\\\').replace(/'/g,"\\'")}
  function read(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}}
  function write(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
  function products(){try{return typeof window.getProducts==='function'?window.getProducts():read('nitaProducts',[])}catch(e){return read('nitaProducts',[])}}
  function norm(p){try{return typeof window.normalizeProductStatus==='function'?window.normalizeProductStatus(p||{}):(p||{})}catch(e){return p||{}}}
  function money(v){try{return typeof window.money==='function'?window.money(v):('$'+Number(v||0).toFixed(2))}catch(e){return '$'+Number(v||0).toFixed(2)}}
  function statusHtml(p){try{return typeof window.stockStatusHtml==='function'?window.stockStatusHtml(p.status):'<span class="stock-status">'+esc(p.status||'In stock')+'</span>'}catch(e){return '<span class="stock-status">'+esc(p.status||'In stock')+'</span>'}}
  function unique(arr){var out=[];(Array.isArray(arr)?arr:[]).forEach(function(v){v=String(v||''); if(v&&out.indexOf(v)===-1) out.push(v)});return out;}
  function photos(p){p=norm(p);var a=unique(Array.isArray(p.photos)?p.photos:(p.img?[p.img]:[])); if(!a.length&&p.img)a=[p.img]; return a.filter(Boolean);}
  function mainPhoto(p){var a=photos(p);var i=Math.max(0,Math.min(Number(p&&p.mainPhotoIndex||0),Math.max(a.length-1,0)));return a[i]||a[0]||'';}
  function isImage(src){src=String(src||'');return src.indexOf('data:image')===0||/^https?:/i.test(src)||/^assets\//i.test(src);}
  function imgTag(src,cls,alt){return isImage(src)?'<img class="'+cls+'" src="'+esc(src)+'" alt="'+esc(alt||'Product image')+'" loading="eager" decoding="sync" draggable="false">':'<div class="'+cls+' nita-image-placeholder"></div>';}
  function sizeOOS(p,s){try{return typeof window.isSizeOOS==='function'?window.isSizeOOS(p,s):false}catch(e){return false}}
  function priceRow(p){try{return typeof window.productPriceStatusRow==='function'?window.productPriceStatusRow(p,'h2'):'<h2>'+money(p.salePrice||p.price)+'</h2>'}catch(e){return '<h2>'+money(p.salePrice||p.price)+'</h2>'}}
  function sizeButtons(p){p=norm(p);var list=Array.isArray(p.sizes)&&p.sizes.length?p.sizes:['One Size'];var active=list.find(function(s){return !sizeOOS(p,s)})||list[0];window.selectedSize=(window.selectedSize&&list.includes(window.selectedSize)&&!sizeOOS(p,window.selectedSize))?window.selectedSize:active;return list.map(function(s){var off=sizeOOS(p,s);return '<button type="button" class="size '+(s===window.selectedSize?'active':'')+' '+(off?'size-disabled':'')+'" '+(off?'disabled aria-disabled="true"':'onclick="selectedSize=\''+esc(s)+'\';productPage()"')+'>'+esc(s)+'</button>';}).join('')}
  function outOfStock(p){var q=(p&&p.quantity!==''&&p.quantity!=null)?Number(p.quantity):null;var s=String(p&&p.status||'in-stock').toLowerCase();return s==='out-of-stock'||s==='sold-out'||s==='sold out'||q===0;}
  function editor(p){try{return typeof window.productEditorHTML==='function'?window.productEditorHTML(p):'<p class="muted">Edit form unavailable. Refresh the page.</p>'}catch(e){return '<p class="muted">Edit form unavailable. Refresh the page.</p>'}}

  function readOriginal(file){return new Promise(function(resolve){try{var r=new FileReader();r.onload=function(e){resolve(e.target.result||'')};r.onerror=function(){resolve('')};r.readAsDataURL(file)}catch(e){resolve('')}})}
  window.fileToHighQualityDataURL=readOriginal;
  window.fileToOriginalQualityDataURL=readOriginal;
  window.previewAdminPhotos=function(event){
    var input=event&&event.target; var files=Array.prototype.slice.call((input&&input.files)||[]); if(!files.length)return;
    Promise.all(files.map(readOriginal)).then(function(urls){
      window.pendingAdminPhotos=unique((window.pendingAdminPhotos||[]).concat(urls.filter(Boolean)));
      window.pendingPhotos=window.pendingAdminPhotos; window.pendingAdminMainIndex=0; window.pendingMainIndex=0;
      if(typeof window.renderPendingPhotos==='function') window.renderPendingPhotos();
      if(input) input.value='';
      try{if(typeof nitaNotify==='function') nitaNotify('Original-quality photos ready.',true,false); else if(typeof toast==='function') toast('Original-quality photos ready.')}catch(e){}
    });
  };
  window.handleProductPhotos=window.previewAdminPhotos;

  window.nitaDetailPhoto=function(dir){var id=new URL(location.href).searchParams.get('id');var p=norm(products().find(function(x){return String(x.id)===String(id)})||products()[0]);var a=photos(p);if(!a.length)return;window.selectedPhoto=(Number(window.selectedPhoto||0)+Number(dir||0)+a.length)%a.length;window.productPage&&window.productPage();};
  window.productPage=function(){
    var detail=document.getElementById('detail');if(!detail)return;
    var id=new URL(location.href).searchParams.get('id');var p=norm(products().find(function(x){return String(x.id)===String(id)})||products()[0]);
    if(!p||!p.id){detail.innerHTML='<div class="card"><h1>Product not found</h1><a class="btn" href="shop.html">BACK TO SHOP</a></div>';return;}
    var a=photos(p);if(!a.length)a=[''];window.selectedPhoto=Math.max(0,Math.min(Number(window.selectedPhoto||0),a.length-1));var current=a[window.selectedPhoto];
    var canBuy=String(p.status||'in-stock')==='in-stock'&&!sizeOOS(p,window.selectedSize);
    var action=canBuy?'<button class="btn" onclick="addToCart(\''+safe(p.id)+'\',selectedSize||\'One Size\')">ADD TO CART</button><a class="btn light" href="checkout.html">BUY NOW</a>':'<button class="btn disabled" disabled>'+(p.status==='coming-soon'?'COMING SOON':'OUT OF STOCK')+'</button><button class="notify-btn" type="button" onclick="notifyMe&&notifyMe(\''+safe(p.id)+'\')">NOTIFY ME</button>';
    var arrows=a.length>1?'<button type="button" class="detail-photo-arrow detail-photo-prev" aria-label="Previous product photo" onclick="nitaDetailPhoto(-1)"></button><button type="button" class="detail-photo-arrow detail-photo-next" aria-label="Next product photo" onclick="nitaDetailPhoto(1)"></button>':'';
    detail.innerHTML='<div class="product-media nita-premium-product-media"><div class="detail-img nita-premium-detail-img">'+imgTag(current,'nita-detail-real-img',p.name)+arrows+'</div><div class="product-thumbs">'+a.map(function(ph,i){return '<button type="button" class="'+(i===window.selectedPhoto?'active':'')+'" onclick="selectedPhoto='+i+';productPage()">'+imgTag(ph,'nita-thumb-real-img',p.name+' photo '+(i+1))+'</button>';}).join('')+'</div></div><div class="product-info nita-premium-product-info"><p class="muted">'+esc(p.category||'')+'</p><h1>'+esc(p.name||'Product')+'</h1>'+priceRow(p)+'<button class="btn light product-detail-fav" onclick="toggleLike&&toggleLike(\''+safe(p.id)+'\',event)">♡ ADD TO LIKED ITEMS</button><p>'+esc(p.desc||'')+'</p><div class="sizes product-size-list">'+sizeButtons(p)+'</div><div class="product-actions">'+action+'</div></div>';
  };

  window.nitaProductAdminView=window.nitaProductAdminView||'in';
  window.nitaSwitchAdminProducts=function(view){window.nitaProductAdminView=view==='out'?'out':'in';window.renderAdminProducts&&window.renderAdminProducts();};
  window.renderAdminProducts=function(){var box=document.getElementById('adminProducts');if(!box)return;var all=products().map(norm);var active=window.nitaProductAdminView==='out'?'out':'in';var list=all.filter(function(p){return active==='out'?outOfStock(p):!outOfStock(p)});box.innerHTML='<div class="admin-toolbar nita-products-toolbar"><div><h2>'+(active==='out'?'Out-of-stock products':'In-stock products')+'</h2><p class="muted">Manage live products separately from products that are out of stock.</p></div><div class="nita-product-tabs"><button type="button" class="nita-product-tab '+(active==='in'?'active':'')+'" onclick="nitaSwitchAdminProducts(\'in\')">In-stock products</button><button type="button" class="nita-product-tab '+(active==='out'?'active':'')+'" onclick="nitaSwitchAdminProducts(\'out\')">Out-of-stock products</button></div></div>'+(list.length?list.map(function(p){var im=mainPhoto(p);var style=isImage(im)?' style="background-image:url('+esc(im)+')"':'';return '<div class="admin-product-card" id="edit-'+esc(p.id)+'"><div class="admin-product-top"><div class="admin-product-photo '+(isImage(im)?'':'is-empty')+'"'+style+'>'+(isImage(im)?'<img src="'+esc(im)+'" alt="'+esc(p.name||'Product')+'" loading="eager" decoding="sync">':'')+'</div><div><div class="admin-product-name">'+esc(p.name||'Product')+'</div><span class="muted">'+esc(p.category||'')+' · '+money(p.price||0)+' · Private stock: '+esc(p.quantity??'Not set')+'</span><div>'+statusHtml(p)+'</div></div><button type="button" onclick="toggleProductEditor(\''+safe(p.id)+'\')">Edit listing</button><button type="button" onclick="removeProduct(\''+safe(p.id)+'\')">Remove</button></div><div class="product-editor" id="editor-'+esc(p.id)+'">'+editor(p)+'</div></div>';}).join(''):'<div class="admin-empty">'+(active==='out'?'No out-of-stock products yet.':'No in-stock products yet.')+'</div>')};

  document.addEventListener('DOMContentLoaded',function(){setTimeout(function(){if(document.getElementById('detail'))window.productPage();if(document.getElementById('adminProducts'))window.renderAdminProducts();},450)});
  window.addEventListener('load',function(){setTimeout(function(){if(document.getElementById('detail'))window.productPage();if(document.getElementById('adminProducts'))window.renderAdminProducts();},800)});
  window.addEventListener('nita-store-ready',function(){setTimeout(function(){if(document.getElementById('detail'))window.productPage();if(document.getElementById('adminProducts'))window.renderAdminProducts();},220)});
})();

/* REAL FINAL FIX 20260613-1525: product page no-zoom media + admin visible previews */
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function safe(v){return String(v==null?'':v).replace(/'/g,"\\'").replace(/\n/g,' ')}
  function read(k,d){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d))}catch(e){return d}}
  function allProducts(){try{return typeof window.getProducts==='function'?window.getProducts():read('nitaProducts',[])}catch(e){return read('nitaProducts',[])}}
  function money(v){try{return typeof window.money==='function'?window.money(v):'$'+Number(v||0).toFixed(2)}catch(e){return '$'+Number(v||0).toFixed(2)}}
  function norm(p){try{return typeof window.normalizeProductStatus==='function'?window.normalizeProductStatus(p):p}catch(e){return p||{}}}
  function isImage(src){src=String(src||'');return src.indexOf('data:image')===0||/^https?:/i.test(src)||/^assets\//i.test(src)}
  function photos(p){p=norm(p);var arr=Array.isArray(p.photos)?p.photos.filter(Boolean):[];if(!arr.length&&p.img)arr=[p.img];return arr.filter(Boolean)}
  function mainPhoto(p){var a=photos(p);var i=Math.max(0,Math.min(Number((p&&p.mainPhotoIndex)||0),Math.max(a.length-1,0)));return a[i]||a[0]||''}
  function img(src,cls,alt){return isImage(src)?'<img class="'+cls+'" src="'+esc(src)+'" alt="'+esc(alt||'Product image')+'" loading="eager" decoding="sync" draggable="false">':'<div class="'+cls+' nita-image-placeholder"></div>'}
  function sizeOOS(p,s){try{return typeof window.isProductSizeOutOfStock==='function'?window.isProductSizeOutOfStock(p,s):false}catch(e){return false}}
  function status(p){return String((p&&p.status)||'in-stock').toLowerCase()}
  function statusHtml(p){try{return typeof window.stockStatusHtml==='function'?window.stockStatusHtml(status(p)):('<span class="stock-dot"></span> '+esc(status(p)))}catch(e){return esc(status(p))}}
  function priceRow(p){try{return typeof window.productPriceStatusRow==='function'?window.productPriceStatusRow(p,'h2'):'<h2>'+money(p.salePrice||p.price)+'</h2>'}catch(e){return '<h2>'+money(p.salePrice||p.price)+'</h2>'}}
  function sizes(p){p=norm(p);var list=Array.isArray(p.sizes)&&p.sizes.length?p.sizes:['One Size'];var active=list.find(function(s){return !sizeOOS(p,s)})||list[0];window.selectedSize=(window.selectedSize&&list.indexOf(window.selectedSize)>-1&&!sizeOOS(p,window.selectedSize))?window.selectedSize:active;return list.map(function(s){var off=sizeOOS(p,s);return '<button type="button" class="size '+(s===window.selectedSize?'active':'')+' '+(off?'size-disabled':'')+'" '+(off?'disabled aria-disabled="true"':'onclick="selectedSize=\''+esc(s)+'\';productPage()"')+'>'+esc(s)+'</button>'}).join('')}
  window.nitaDetailPhoto=function(dir){var id=new URL(location.href).searchParams.get('id');var p=norm(allProducts().find(function(x){return String(x.id)===String(id)})||allProducts()[0]);var a=photos(p);if(!a.length)return;window.selectedPhoto=(Number(window.selectedPhoto||0)+Number(dir||0)+a.length)%a.length;window.productPage&&window.productPage();};
  window.productPage=function(){
    var detail=document.getElementById('detail');if(!detail)return;
    var id=new URL(location.href).searchParams.get('id');var p=norm(allProducts().find(function(x){return String(x.id)===String(id)})||allProducts()[0]);
    if(!p||!p.id){detail.innerHTML='<div class="card"><h1>Product not found</h1><a class="btn" href="shop.html">BACK TO SHOP</a></div>';return;}
    var a=photos(p);window.selectedPhoto=Math.max(0,Math.min(Number(window.selectedPhoto||0),Math.max(a.length-1,0)));var current=a[window.selectedPhoto]||'';
    var can=status(p)==='in-stock'&&!sizeOOS(p,window.selectedSize);
    var action=can?'<button class="btn" type="button" onclick="addToCart(\''+safe(p.id)+'\',selectedSize||\'One Size\')">ADD TO CART</button><a class="btn light" href="checkout.html">BUY NOW</a>':'<button class="btn disabled" disabled>'+(status(p)==='coming-soon'?'COMING SOON':'OUT OF STOCK')+'</button><button class="notify-btn" type="button" onclick="notifyMe&&notifyMe(\''+safe(p.id)+'\')">NOTIFY ME</button>';
    var arrows=a.length>1?'<button type="button" class="detail-photo-arrow detail-photo-prev" aria-label="Previous product photo" onclick="nitaDetailPhoto(-1)"></button><button type="button" class="detail-photo-arrow detail-photo-next" aria-label="Next product photo" onclick="nitaDetailPhoto(1)"></button>':'';
    detail.innerHTML='<div class="product-media nita-premium-product-media"><div class="detail-img nita-premium-detail-img">'+img(current,'nita-detail-real-img',p.name)+arrows+'</div><div class="product-thumbs">'+a.map(function(ph,i){return '<button type="button" class="'+(i===window.selectedPhoto?'active':'')+'" onclick="selectedPhoto='+i+';productPage()">'+img(ph,'nita-thumb-real-img',(p.name||'Product')+' photo '+(i+1))+'</button>'}).join('')+'</div></div><div class="product-info nita-premium-product-info"><p class="muted">'+esc(p.category||'')+'</p><h1>'+esc(p.name||'Product')+'</h1>'+priceRow(p)+'<button class="btn light product-detail-fav" onclick="toggleLike&&toggleLike(\''+safe(p.id)+'\',event)">♡ ADD TO LIKED ITEMS</button><p>'+esc(p.desc||'')+'</p><div class="sizes product-size-list">'+sizes(p)+'</div><div class="product-actions">'+action+'</div></div>';
  };
  function outOfStock(p){var q=(p&&p.quantity!==''&&p.quantity!=null)?Number(p.quantity):null;var s=status(p);return s==='out-of-stock'||s==='sold-out'||s==='sold out'||q===0;}
  function editor(p){try{return typeof window.productEditorHTML==='function'?window.productEditorHTML(p):'<p class="muted">Edit form unavailable. Refresh the page.</p>'}catch(e){return '<p class="muted">Edit form unavailable. Refresh the page.</p>'}}
  window.nitaProductAdminView=window.nitaProductAdminView||'in';
  window.nitaSwitchAdminProducts=function(view){window.nitaProductAdminView=view==='out'?'out':'in';window.renderAdminProducts&&window.renderAdminProducts();};
  window.renderAdminProducts=function(){var box=document.getElementById('adminProducts');if(!box)return;var active=window.nitaProductAdminView==='out'?'out':'in';var list=allProducts().map(norm).filter(function(p){return active==='out'?outOfStock(p):!outOfStock(p)});box.innerHTML='<div class="admin-toolbar nita-products-toolbar"><div><h2>'+(active==='out'?'Out-of-stock products':'In-stock products')+'</h2><p class="muted">Manage live products separately from products that are out of stock.</p></div><div class="nita-product-tabs"><button type="button" class="nita-product-tab '+(active==='in'?'active':'')+'" onclick="nitaSwitchAdminProducts(\'in\')">In-stock products</button><button type="button" class="nita-product-tab '+(active==='out'?'active':'')+'" onclick="nitaSwitchAdminProducts(\'out\')">Out-of-stock products</button></div></div>'+(list.length?list.map(function(p){var im=mainPhoto(p);return '<div class="admin-product-card" id="edit-'+esc(p.id)+'"><div class="admin-product-top"><div class="admin-product-photo '+(isImage(im)?'':'is-empty')+'">'+(isImage(im)?'<img src="'+esc(im)+'" alt="'+esc(p.name||'Product')+'" loading="eager" decoding="sync">':'')+'</div><div><div class="admin-product-name">'+esc(p.name||'Product')+'</div><span class="muted">'+esc(p.category||'')+' · '+money(p.price||0)+' · Private stock: '+esc(p.quantity??'Not set')+'</span><div>'+statusHtml(p)+'</div></div><button type="button" onclick="toggleProductEditor(\''+safe(p.id)+'\')">Edit listing</button><button type="button" onclick="removeProduct(\''+safe(p.id)+'\')">Remove</button></div><div class="product-editor" id="editor-'+esc(p.id)+'">'+editor(p)+'</div></div>';}).join(''):'<div class="admin-empty">'+(active==='out'?'No out-of-stock products yet.':'No in-stock products yet.')+'</div>')};
  document.addEventListener('DOMContentLoaded',function(){setTimeout(function(){if(document.getElementById('detail'))window.productPage();if(document.getElementById('adminProducts'))window.renderAdminProducts();},500)});
  window.addEventListener('load',function(){setTimeout(function(){if(document.getElementById('detail'))window.productPage();if(document.getElementById('adminProducts'))window.renderAdminProducts();},900)});
  window.addEventListener('nita-store-ready',function(){setTimeout(function(){if(document.getElementById('detail'))window.productPage();if(document.getElementById('adminProducts'))window.renderAdminProducts();},260)});
})();

/* FINAL 20260613: visible original-quality product file-name field for admin add/edit product */
(function(){
  function $(id){return document.getElementById(id)}
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function cleanLines(v){return String(v||'').split(/\n|,/).map(function(s){return s.trim()}).filter(Boolean)}
  function normalizeProductAssetPath(s){
    s=String(s||'').trim();
    if(!s) return '';
    if(/^data:image\//i.test(s) || /^https?:\/\//i.test(s)) return s;
    if(/^\//.test(s)) return s;
    if(/^assets\/products\//i.test(s)) return '/' + s.replace(/^\/+/, '');
    if(/^assets\//i.test(s)) return '/' + s.replace(/^\/+/, '');
    return '/assets/products/' + s.replace(/^\/+/, '');
  }
  function getAssetPhotoLines(){return cleanLines(($('pPhotoPaths')||{}).value).map(normalizeProductAssetPath).filter(Boolean)}
  function unique(arr){var seen={};return (arr||[]).map(function(x){return String(x||'').trim()}).filter(function(x){if(!x||seen[x]) return false; seen[x]=1; return true;});}
  function renderAssetPreview(photos){
    var box=$('photoPreview'); if(!box) return;
    photos=unique(photos||[]);
    if(!photos.length) return;
    box.innerHTML=photos.map(function(u,i){return '<div class="admin-thumb photo-order-thumb asset-path-thumb"><img src="'+esc(u)+'" alt="Product photo '+(i+1)+'" loading="eager" onerror="this.closest(\'.admin-thumb\').classList.add(\'missing-asset\')"><span>'+(i===0?'Photo 1':'Photo '+(i+1))+'</span><small>'+esc(u)+'</small><div class="photo-order-controls"><button type="button" onclick="movePendingPhoto&&movePendingPhoto('+i+',-1)" '+(i===0?'disabled':'')+'>←</button><button type="button" onclick="movePendingPhoto&&movePendingPhoto('+i+',1)" '+(i===photos.length-1?'disabled':'')+'>→</button><button type="button" onclick="removePendingPhoto&&removePendingPhoto('+i+')">×</button></div></div>'}).join('');
  }
  function ensureAssetPhotoBox(){
    var addBox=document.getElementById('addProductBox') || document.querySelector('.admin-add-product-form') || document.querySelector('[data-add-product-form="true"]');
    var input=$('pphotos');
    if(!input) return;
    if($('pPhotoPaths')) return;
    var upload=input.closest('.upload-zone') || input.parentElement;
    if(!upload) return;
    var wrap=document.createElement('div');
    wrap.className='asset-photo-box full';
    wrap.innerHTML='<label>Original image file names / links</label><p class="muted"><b>Best quality method:</b> put your original product photos inside <b>assets/products</b> in the ZIP, then write the file names here, one per line. This avoids Netlify large-upload errors and keeps the original image quality.</p><textarea id="pPhotoPaths" class="field" rows="4" placeholder="red-bag-1.jpg\nred-bag-2.jpg\nred-bag-3.jpg"></textarea><button type="button" class="btn light asset-preview-btn" onclick="previewAssetProductPhotos()">PREVIEW FILE PHOTOS</button><p class="field-help">Use this box for large professional photos. You can still use the normal upload above for smaller images.</p>';
    upload.insertAdjacentElement('afterend', wrap);
  }
  window.previewAssetProductPhotos=function(){
    var paths=getAssetPhotoLines();
    if(!paths.length){try{if(typeof msg==='function')msg('Write at least one image file name first.',false);else alert('Write at least one image file name first.')}catch(e){} return;}
    window.pendingAdminPhotos=unique(paths.concat(window.pendingAdminPhotos||window.pendingPhotos||[]));
    window.pendingPhotos=window.pendingAdminPhotos;
    window.pendingAdminMainIndex=0;
    renderAssetPreview(window.pendingAdminPhotos);
    try{if(typeof msg==='function')msg('Original file photos added. Make sure the files exist in assets/products before deploying.',true);else if(typeof toast==='function')toast('Original file photos added.')}catch(e){}
  };
  var oldAdd=window.addProductAdmin;
  window.addProductAdmin=async function(){
    var paths=getAssetPhotoLines();
    if(paths.length){
      window.pendingAdminPhotos=unique(paths.concat(window.pendingAdminPhotos||window.pendingPhotos||[]));
      window.pendingPhotos=window.pendingAdminPhotos;
      window.pendingAdminMainIndex=0;
    }
    return oldAdd ? oldAdd.apply(this, arguments) : undefined;
  };
  var oldSave=window.saveProducts;
  window.saveProducts=async function(next){
    if(Array.isArray(next)){
      next=next.map(function(p){
        if(!p) return p;
        var photos=unique((Array.isArray(p.photos)?p.photos:(p.img?[p.img]:[])).map(normalizeProductAssetPath));
        if(photos.length){
          p.photos=photos;
          p.mainPhotoIndex=Math.max(0,Math.min(Number(p.mainPhotoIndex||0),photos.length-1));
          p.img=photos[p.mainPhotoIndex]||photos[0];
        }
        return p;
      });
    }
    return oldSave ? oldSave.call(this,next) : false;
  };
  ['DOMContentLoaded','click'].forEach(function(ev){document.addEventListener(ev,function(){setTimeout(ensureAssetPhotoBox,150);setTimeout(ensureAssetPhotoBox,700);});});
  window.addEventListener('load',function(){setTimeout(ensureAssetPhotoBox,250);setTimeout(ensureAssetPhotoBox,1200);});
})();

/* One Size exclusive selection fix - 20260613 */
(function(){
  function normSizeText(el){return ((el && (el.dataset && el.dataset.size ? el.dataset.size : el.textContent || el.value || '')) || '').trim().toLowerCase().replace(/\s+/g,' ');}
  function isOneSize(el){return normSizeText(el)==='one size' || normSizeText(el)==='onesize';}
  function setOff(el){
    if(!el) return;
    el.classList.remove('on','active');
    if(el.matches && el.matches('input')) el.checked=false;
    var input = el.querySelector && el.querySelector('input');
    if(input) input.checked=false;
  }
  function setOn(el){
    if(!el) return;
    el.classList.add('on','active');
    if(el.matches && el.matches('input')) el.checked=true;
    var input = el.querySelector && el.querySelector('input');
    if(input) input.checked=true;
  }
  function itemSelector(container){
    return Array.from(container.querySelectorAll('.pill, .size, button, input[type="checkbox"], input[type="radio"]'))
      .filter(function(x){ return normSizeText(x); });
  }
  function normalizeSizePicker(picker, clicked){
    if(!picker || !clicked) return;
    var items = itemSelector(picker);
    if(!items.length) return;
    if(isOneSize(clicked)){
      items.forEach(function(item){ if(item!==clicked) setOff(item); });
      setOn(clicked);
    } else {
      items.forEach(function(item){ if(isOneSize(item)) setOff(item); });
      if(clicked.classList && (clicked.classList.contains('pill') || clicked.classList.contains('size'))) clicked.classList.toggle('on');
    }
  }
  document.addEventListener('click', function(e){
    var clicked = e.target.closest && e.target.closest('.size-picker .pill, .size-picker .size, #sizePicker .pill, #sizePicker .size, .available-size-picker .pill, .available-size-picker .size');
    if(!clicked) return;
    var picker = clicked.closest('.size-picker, #sizePicker, .available-size-picker');
    if(!picker) return;
    setTimeout(function(){ normalizeSizePicker(picker, clicked); }, 0);
  }, true);
  window.nitaNormalizeOneSizePickers = function(root){
    (root || document).querySelectorAll('.size-picker, #sizePicker, .available-size-picker').forEach(function(picker){
      var ones = itemSelector(picker).filter(isOneSize).filter(function(x){return x.classList.contains('on') || x.classList.contains('active') || x.checked;});
      if(ones.length) normalizeSizePicker(picker, ones[0]);
    });
  };
})();

/* FINAL VISUAL FIX 20260613-1615: product cards show asset photos, product page no-refresh gallery, admin previews */
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function safe(v){return String(v==null?'':v).replace(/'/g,"\\'")}
  function money(v){try{return '$'+Number(v||0).toFixed(2)}catch(e){return '$0.00'}}
  function assetPath(src){
    src=String(src||'').trim();
    if(!src) return '';
    if(/^data:image\//i.test(src)||/^https?:\/\//i.test(src)||/^\//.test(src)||/^assets\//i.test(src)) return src;
    return 'assets/products/'+src.replace(/^\/+/, '');
  }
  function productPhotos(p){
    var arr=[];
    if(p&&Array.isArray(p.photos)) arr=arr.concat(p.photos);
    if(p&&p.img) arr.unshift(p.img);
    var seen={};
    return arr.map(assetPath).filter(function(x){if(!x||seen[x])return false;seen[x]=1;return true;});
  }
  function productMainPhoto(p){var a=productPhotos(p);var i=Math.max(0,Math.min(Number((p&&p.mainPhotoIndex)||0),Math.max(a.length-1,0)));return a[i]||a[0]||'';}
  function stockValue(p){return String((p&&p.status)||'in-stock').toLowerCase()}
  function isOut(p){var q=(p&&p.quantity!==''&&p.quantity!=null)?Number(p.quantity):null;var s=stockValue(p);return s==='out-of-stock'||s==='sold-out'||s==='sold out'||q===0;}
  function statusLine(p){try{return typeof window.stockStatusHtml==='function'?window.stockStatusHtml(stockValue(p)):'<span class="stock-dot"></span> '+esc(stockValue(p))}catch(e){return ''}}
  function priceHtml(p){
    var hasSale=p&&p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price);
    return hasSale?'<p><span class="muted old-price">'+money(p.price)+'</span><span class="price-drop">'+money(p.salePrice)+'</span></p>':'<p>'+money(p&&p.price)+'</p>';
  }
  function imgTag(src,cls,alt){src=assetPath(src);return src?'<img class="'+cls+'" src="'+esc(src)+'" alt="'+esc(alt||'Product photo')+'" loading="eager" decoding="async" draggable="false">':'<div class="'+cls+' nita-image-placeholder"></div>'}

  window.productCard=function(p){
    p=p||{};var photos=productPhotos(p);var first=photos[0]||'';var second=photos[1]||first;var hasSale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price);
    return '<article class="product nita-visible-product-card"><a class="product-hit" href="product.html?id='+encodeURIComponent(p.id||'')+'"><div class="product-img nita-card-img-wrap">'+imgTag(first,'nita-card-img primary',p.name)+ (second&&second!==first?imgTag(second,'nita-card-img secondary',p.name+' alternate'):'') + (hasSale?'<span class="sale-badge">PRICE DROP</span>':'')+'</div><h3>'+esc(p.name||'Product')+'</h3>'+priceHtml(p)+'<div class="card-status">'+statusLine(p)+'</div></a><button class="quick-view-btn" type="button" onclick="event.stopPropagation();event.preventDefault();openQuickView&&openQuickView(\''+safe(p.id||'')+'\')">QUICK VIEW</button></article>';
  };
  window.renderProducts=function(el,list){var node=document.querySelector(el||'#products');if(!node)return;var arr=list||(typeof getProducts==='function'?getProducts():[]);node.innerHTML=arr.map(window.productCard).join('')};

  function sizeDisabled(p,s){try{return typeof window.isProductSizeOutOfStock==='function'?window.isProductSizeOutOfStock(p,s):false}catch(e){return false}}
  function renderSizes(p){
    var list=Array.isArray(p.sizes)&&p.sizes.length?p.sizes:['One Size'];
    if(!window.selectedSize||list.indexOf(window.selectedSize)===-1||sizeDisabled(p,window.selectedSize)) window.selectedSize=list.find(function(s){return !sizeDisabled(p,s)})||list[0];
    return list.map(function(s){var off=sizeDisabled(p,s);return '<button type="button" class="size nita-size-choice '+(s===window.selectedSize?'active':'')+' '+(off?'size-disabled':'')+'" '+(off?'disabled aria-disabled="true"':'onclick="nitaSelectSize(\''+safe(s)+'\')"')+'>'+esc(s)+'</button>'}).join('');
  }
  window.nitaSelectSize=function(s){window.selectedSize=s;document.querySelectorAll('.nita-size-choice').forEach(function(b){b.classList.toggle('active',b.textContent.trim()===s)});};
  window.nitaDetailPhoto=function(dir){
    var photos=window.nitaCurrentPhotos||[]; if(!photos.length)return;
    window.selectedPhoto=(Number(window.selectedPhoto||0)+Number(dir||0)+photos.length)%photos.length;
    var main=document.querySelector('.nita-detail-real-img'); if(main) main.src=photos[window.selectedPhoto];
    document.querySelectorAll('.product-thumbs button').forEach(function(b,i){b.classList.toggle('active',i===window.selectedPhoto)});
  };
  window.nitaSetDetailPhoto=function(i){window.selectedPhoto=Number(i)||0;window.nitaDetailPhoto(0)};

  window.productPage=function(){
    var detail=document.getElementById('detail'); if(!detail)return;
    var list=typeof getProducts==='function'?getProducts():(window.products||[]);
    var id=new URL(location.href).searchParams.get('id');
    var p=(list||[]).find(function(x){return String(x.id)===String(id)})||(list||[])[0];
    if(!p){detail.innerHTML='<div class="card"><h1>Product not found</h1><a class="btn" href="shop.html">BACK TO SHOP</a></div>';return;}
    var photos=productPhotos(p); window.nitaCurrentPhotos=photos; window.selectedPhoto=Math.max(0,Math.min(Number(window.selectedPhoto||0),Math.max(photos.length-1,0)));
    var current=photos[window.selectedPhoto]||'';
    var can=!isOut(p)&&stockValue(p)!=='coming-soon';
    var actions=can?'<button class="btn nita-action-btn add" type="button" onclick="addToCart(\''+safe(p.id)+'\',window.selectedSize||\'One Size\')">ADD TO CART</button><a class="btn light nita-action-btn buy" href="checkout.html">BUY NOW</a>':'<button class="btn disabled nita-action-btn" disabled>'+(stockValue(p)==='coming-soon'?'COMING SOON':'OUT OF STOCK')+'</button><button class="notify-btn nita-action-btn" type="button" onclick="notifyMe&&notifyMe(\''+safe(p.id)+'\')">NOTIFY ME</button>';
    var arrows=photos.length>1?'<button type="button" class="detail-photo-arrow detail-photo-prev" aria-label="Previous product photo" onclick="nitaDetailPhoto(-1)"><span>‹</span></button><button type="button" class="detail-photo-arrow detail-photo-next" aria-label="Next product photo" onclick="nitaDetailPhoto(1)"><span>›</span></button>':'';
    detail.innerHTML='<div class="product-media nita-premium-product-media"><div class="detail-img nita-premium-detail-img">'+imgTag(current,'nita-detail-real-img',p.name)+arrows+'</div><div class="product-thumbs">'+photos.map(function(ph,i){return '<button type="button" class="'+(i===window.selectedPhoto?'active':'')+'" onclick="nitaSetDetailPhoto('+i+')">'+imgTag(ph,'nita-thumb-real-img',(p.name||'Product')+' photo '+(i+1))+'</button>'}).join('')+'</div></div><div class="product-info nita-premium-product-info"><p class="muted">'+esc(p.category||'')+'</p><h1>'+esc(p.name||'Product')+'</h1><h2>'+money(p.salePrice||p.price)+'</h2><div class="inline-stock">'+statusLine(p)+'</div><button class="btn light product-detail-fav" onclick="toggleLike&&toggleLike(\''+safe(p.id)+'\',event)">♡ ADD TO LIKED ITEMS</button><p>'+esc(p.desc||'')+'</p><div class="sizes product-size-list">'+renderSizes(p)+'</div><div class="product-actions nita-premium-actions">'+actions+'</div></div>';
  };

  window.renderAdminProducts=function(){
    var box=document.getElementById('adminProducts'); if(!box)return;
    var all=(typeof getProducts==='function'?getProducts():[]); var active=window.nitaProductAdminView==='out'?'out':'in';
    var list=all.filter(function(p){return active==='out'?isOut(p):!isOut(p)});
    box.innerHTML='<div class="admin-toolbar nita-products-toolbar"><div><h2>'+(active==='out'?'Out-of-stock products':'In-stock products')+'</h2><p class="muted">Manage live products separately from products that are out of stock.</p></div><div class="nita-product-tabs"><button type="button" class="nita-product-tab '+(active==='in'?'active':'')+'" onclick="nitaProductAdminView=\'in\';renderAdminProducts()">In-stock products</button><button type="button" class="nita-product-tab '+(active==='out'?'active':'')+'" onclick="nitaProductAdminView=\'out\';renderAdminProducts()">Out-of-stock products</button></div></div>'+(list.length?list.map(function(p){var im=productMainPhoto(p);return '<div class="admin-product-card" id="edit-'+esc(p.id)+'"><div class="admin-product-top"><div class="admin-product-photo nita-admin-preview-photo">'+(im?'<img src="'+esc(im)+'" alt="'+esc(p.name||'Product')+'" loading="eager" decoding="async">':'<span>No photo</span>')+'</div><div><div class="admin-product-name">'+esc(p.name||'Product')+'</div><span class="muted">'+esc(p.category||'')+' · '+money(p.price||0)+' · Private stock: '+esc(p.quantity==null?'Not set':p.quantity)+'</span><div>'+statusLine(p)+'</div></div><button type="button" onclick="toggleProductEditor(\''+safe(p.id)+'\')">Edit listing</button><button type="button" onclick="removeProduct(\''+safe(p.id)+'\')">Remove</button></div><div class="product-editor" id="editor-'+esc(p.id)+'">'+(typeof productEditorHTML==='function'?productEditorHTML(p):'')+'</div></div>'}).join(''):'<div class="admin-empty">'+(active==='out'?'No out-of-stock products yet.':'No in-stock products yet.')+'</div>')
  };
  document.addEventListener('DOMContentLoaded',function(){setTimeout(function(){if(document.getElementById('products')) renderProducts('#products', (typeof getProducts==='function'?getProducts():[])); if(document.getElementById('detail')) productPage(); if(document.getElementById('adminProducts')) renderAdminProducts();},700)});
})();

/* FINAL FINAL PRODUCT VISIBILITY + COMPACT DETAIL + DESCRIPTION LIMIT 20260613-1638 */
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function safe(v){return String(v==null?'':v).replace(/'/g,"\\'")}
  function money(v){return '$'+Number(v||0).toFixed(2)}
  function assetPath(src){
    src=String(src||'').trim();
    if(!src) return '';
    if(/^data:image\//i.test(src)||/^https?:\/\//i.test(src)||/^\//.test(src)||/^assets\//i.test(src)) return src;
    return 'assets/products/'+src.replace(/^\/+/, '');
  }
  function photosOf(p){
    var arr=[];
    if(p&&Array.isArray(p.photos)) arr=arr.concat(p.photos);
    if(p&&p.img) arr.unshift(p.img);
    var seen={};
    return arr.map(assetPath).filter(function(x){if(!x||seen[x])return false;seen[x]=1;return true;});
  }
  function mainPhoto(p){var a=photosOf(p);var i=Math.max(0,Math.min(Number((p&&p.mainPhotoIndex)||0),Math.max(a.length-1,0)));return a[i]||a[0]||'';}
  function stockValue(p){return String((p&&p.status)||'in-stock').toLowerCase()}
  function isUnavailable(p){var q=(p&&p.quantity!==''&&p.quantity!=null)?Number(p.quantity):null;var s=stockValue(p);return s==='out-of-stock'||s==='sold-out'||s==='sold out'||q===0;}
  function statusHtml(p){try{return window.stockStatusHtml?window.stockStatusHtml(stockValue(p)):'<span class="stock-status '+stockValue(p)+'"><span class="stock-dot"></span><span>'+esc(stockValue(p))+'</span></span>'}catch(e){return ''}}
  function img(src,cls,alt){src=assetPath(src);return src?'<img class="'+cls+'" src="'+esc(src)+'" alt="'+esc(alt||'Product photo')+'" loading="eager" decoding="async" draggable="false" onerror="this.classList.add(\'image-error\');this.style.display=\'none\'">':'<span class="'+cls+' nita-image-placeholder"></span>'}
  function priceRow(p){var sale=p&&p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price);return '<div class="nita-card-price-row"><span>'+(sale?'<span class="old-price">'+money(p.price)+'</span> <span class="price-drop">'+money(p.salePrice)+'</span>':money(p&&p.price))+'</span>'+statusHtml(p)+'</div>'}

  window.productCard=function(p){
    p=p||{};var ph=photosOf(p);var first=ph[0]||'';var second=ph[1]||'';var sale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price);
    return '<article class="product nita-visible-product-card"><a class="product-hit" href="product.html?id='+encodeURIComponent(p.id||'')+'"><div class="product-img nita-card-img-wrap">'+img(first,'nita-card-img primary',p.name)+(second?img(second,'nita-card-img secondary',p.name+' second photo'):'')+(sale?'<span class="sale-badge">PRICE DROP</span>':'')+'</div><h3>'+esc(p.name||'Product')+'</h3>'+priceRow(p)+'</a><button class="quick-view-btn" type="button" onclick="event.stopPropagation();event.preventDefault();openQuickView&&openQuickView(\''+safe(p.id||'')+'\')">QUICK VIEW</button></article>';
  };
  window.renderProducts=function(el,list){var node=document.querySelector(el||'#products');if(!node)return;var arr=list||(typeof getProducts==='function'?getProducts():[]);node.innerHTML=(arr||[]).map(window.productCard).join('')||'<p class="muted">No products listed yet.</p>';};

  function renderSizes(p){
    var sizes=Array.isArray(p.sizes)&&p.sizes.length?p.sizes:['One Size'];
    if(!window.selectedSize||sizes.indexOf(window.selectedSize)===-1) window.selectedSize=sizes[0];
    return sizes.map(function(s){return '<button type="button" class="size nita-size-choice '+(s===window.selectedSize?'active':'')+'" onclick="nitaSelectSize(\''+safe(s)+'\')">'+esc(s)+'</button>'}).join('');
  }
  window.nitaSelectSize=function(s){window.selectedSize=s;document.querySelectorAll('.nita-size-choice').forEach(function(b){b.classList.toggle('active',b.textContent.trim()===s);});};
  window.nitaDetailPhoto=function(dir){
    var ph=window.nitaCurrentPhotos||[];if(!ph.length)return;
    window.selectedPhoto=(Number(window.selectedPhoto||0)+Number(dir||0)+ph.length)%ph.length;
    var im=document.querySelector('.nita-detail-real-img');if(im) im.src=ph[window.selectedPhoto];
    document.querySelectorAll('.product-thumbs button').forEach(function(b,i){b.classList.toggle('active',i===window.selectedPhoto);});
  };
  window.nitaSetDetailPhoto=function(i){window.selectedPhoto=Number(i)||0;window.nitaDetailPhoto(0);};

  window.productPage=function(){
    var detail=document.getElementById('detail'); if(!detail)return;
    var list=typeof getProducts==='function'?getProducts():(window.products||[]);
    var id=new URL(location.href).searchParams.get('id');
    var p=(list||[]).find(function(x){return String(x.id)===String(id)})||(list||[])[0];
    if(!p){detail.innerHTML='<div class="card"><h1>Product not found</h1><a class="btn" href="shop.html">BACK TO SHOP</a></div>';return;}
    var ph=photosOf(p);window.nitaCurrentPhotos=ph;window.selectedPhoto=Math.max(0,Math.min(Number(window.selectedPhoto||0),Math.max(ph.length-1,0)));
    var can=!isUnavailable(p)&&stockValue(p)!=='coming-soon';
    var arrows=ph.length>1?'<button type="button" class="detail-photo-arrow detail-photo-prev" aria-label="Previous product photo" onclick="nitaDetailPhoto(-1)"><span>‹</span></button><button type="button" class="detail-photo-arrow detail-photo-next" aria-label="Next product photo" onclick="nitaDetailPhoto(1)"><span>›</span></button>':'';
    var actions=can?'<button class="btn nita-action-btn add" type="button" onclick="addToCart(\''+safe(p.id)+'\',window.selectedSize||\'One Size\')">ADD TO CART</button><a class="btn light nita-action-btn buy" href="checkout.html">BUY NOW</a>':'<button class="btn disabled nita-action-btn" disabled>'+(stockValue(p)==='coming-soon'?'COMING SOON':'OUT OF STOCK')+'</button><button class="notify-btn nita-action-btn" type="button" onclick="notifyMe&&notifyMe(\''+safe(p.id)+'\')">NOTIFY ME</button>';
    var desc=esc(p.desc||'');
    detail.innerHTML='<div class="product-media nita-premium-product-media compact-product-media"><div class="detail-img nita-premium-detail-img">'+img(ph[window.selectedPhoto]||'','nita-detail-real-img',p.name)+arrows+'</div><div class="product-thumbs">'+ph.map(function(x,i){return '<button type="button" class="'+(i===window.selectedPhoto?'active':'')+'" onclick="nitaSetDetailPhoto('+i+')">'+img(x,'nita-thumb-real-img',(p.name||'Product')+' photo '+(i+1))+'</button>'}).join('')+'</div></div><div class="product-info nita-premium-product-info"><p class="muted product-cat">'+esc(p.category||'')+'</p><h1>'+esc(p.name||'Product')+'</h1><div class="price-stock-line"><h2>'+money(p.salePrice||p.price)+'</h2><div class="inline-stock">'+statusHtml(p)+'</div></div><button class="btn light product-detail-fav" onclick="toggleLike&&toggleLike(\''+safe(p.id)+'\',event)">♡ ADD TO LIKED ITEMS</button><div class="sizes product-size-list">'+renderSizes(p)+'</div><div class="product-actions nita-premium-actions">'+actions+'</div><div class="product-description-block"><h3>Product details</h3><p>'+desc+'</p></div></div>';
  };

  var oldRenderHome=window.renderHomeSections;
  window.renderHomeSections=function(){ if(typeof oldRenderHome==='function') oldRenderHome(); setTimeout(function(){document.querySelectorAll('#trendingTrack,#newArrivalsTrack,#products,.product-grid,.grid').forEach(function(n){ if(n) n.querySelectorAll('.product').length&&n.querySelectorAll('.product').forEach(function(){}); });},50); };

  window.renderAdminProducts=function(){
    var box=document.getElementById('adminProducts'); if(!box)return;
    var all=typeof getProducts==='function'?getProducts():[];var active=window.nitaProductAdminView==='out'?'out':'in';var list=all.filter(function(p){return active==='out'?isUnavailable(p):!isUnavailable(p)});
    box.innerHTML='<div class="admin-toolbar nita-products-toolbar"><div><h2>'+(active==='out'?'Out-of-stock products':'In-stock products')+'</h2><p class="muted">Manage live products separately from products that are out of stock.</p></div><div class="nita-product-tabs"><button type="button" class="nita-product-tab '+(active==='in'?'active':'')+'" onclick="nitaProductAdminView=\'in\';renderAdminProducts()">In-stock products</button><button type="button" class="nita-product-tab '+(active==='out'?'active':'')+'" onclick="nitaProductAdminView=\'out\';renderAdminProducts()">Out-of-stock products</button></div></div>'+(list.length?list.map(function(p){var im=mainPhoto(p);return '<div class="admin-product-card" id="edit-'+esc(p.id)+'"><div class="admin-product-top"><div class="admin-product-photo nita-admin-preview-photo">'+(im?img(im,'nita-admin-preview-img',p.name):'<span>No photo</span>')+'</div><div><div class="admin-product-name">'+esc(p.name||'Product')+'</div><span class="muted">'+esc(p.category||'')+' · '+money(p.price||0)+' · Private stock: '+esc(p.quantity==null?'Not set':p.quantity)+'</span><div>'+statusHtml(p)+'</div></div><button type="button" onclick="toggleProductEditor(\''+safe(p.id)+'\')">Edit listing</button><button type="button" onclick="removeProduct(\''+safe(p.id)+'\')">Remove</button></div><div class="product-editor" id="editor-'+esc(p.id)+'">'+(typeof productEditorHTML==='function'?productEditorHTML(p):'')+'</div></div>'}).join(''):'<div class="admin-empty">'+(active==='out'?'No out-of-stock products yet.':'No in-stock products yet.')+'</div>');
  };

  function enforceDescriptionLimit(){
    var t=document.getElementById('pdesc'); if(t){t.setAttribute('maxlength','500'); if(!t.nextElementSibling||!t.nextElementSibling.classList.contains('desc-limit-help')) t.insertAdjacentHTML('afterend','<p class="field-help desc-limit-help">Maximum 500 characters. Keep product details short, clean, and professional.</p>');}
    document.querySelectorAll('textarea.edit-desc').forEach(function(x){x.setAttribute('maxlength','500');});
  }
  document.addEventListener('input',function(e){if(e.target&&e.target.matches('#pdesc, textarea.edit-desc')&&e.target.value.length>500)e.target.value=e.target.value.slice(0,500);},true);
  document.addEventListener('DOMContentLoaded',function(){setTimeout(function(){if(document.getElementById('products')) renderProducts('#products', typeof getProducts==='function'?getProducts():[]); if(document.getElementById('detail')) productPage(); if(document.getElementById('adminProducts')) renderAdminProducts(); enforceDescriptionLimit();},900);});
  document.addEventListener('click',function(){setTimeout(enforceDescriptionLimit,100);},true);
})();

/* FINAL QUICK VIEW IMAGE + DESCRIPTION COUNTER FIX 20260613 */
(function(){
  const MAX_DESC = 500;
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function safe(v){return String(v==null?'':v).replace(/'/g,"\\'");}
  function money(v){return '$'+Number(v||0).toFixed(2);}
  function imgUrl(src){
    src=String(src||'').trim();
    if(!src || /^linear-gradient/i.test(src)) return '';
    if(/^data:image\//i.test(src) || /^https?:\/\//i.test(src) || /^\//.test(src) || /^assets\//i.test(src)) return src;
    return 'assets/products/' + src.replace(/^\/+/, '');
  }
  function photos(p){
    let arr=[];
    if(p && Array.isArray(p.photos)) arr=arr.concat(p.photos);
    if(p && p.img) arr.unshift(p.img);
    const seen={};
    return arr.map(imgUrl).filter(x=>x && !seen[x] && (seen[x]=1));
  }
  function imageTag(src, cls, alt){
    src=imgUrl(src);
    return src ? `<img class="${cls}" src="${esc(src)}" alt="${esc(alt||'Product image')}" loading="eager" decoding="async" draggable="false">` : `<span class="${cls} nita-image-placeholder"></span>`;
  }
  function stockText(p){
    const s=String(p?.status||'in-stock').toLowerCase();
    if(typeof window.stockStatusHtml==='function') return window.stockStatusHtml(s);
    return `<span class="stock-status ${esc(s)}"><span class="stock-dot"></span><span>${esc(s.replace(/-/g,' '))}</span></span>`;
  }
  function priceStatus(p){
    const sale=p?.salePrice!=='' && p?.salePrice!=null && Number(p.salePrice)<Number(p.price);
    return `<div class="nita-card-price-row"><span>${sale?`<span class="old-price">${money(p.price)}</span> <span class="price-drop">${money(p.salePrice)}</span>`:money(p?.price)}</span>${stockText(p)}</div>`;
  }
  function unavailable(p){
    const s=String(p?.status||'in-stock').toLowerCase();
    const q=(p?.quantity!==''&&p?.quantity!=null)?Number(p.quantity):null;
    return s==='out-of-stock'||s==='sold-out'||s==='sold out'||q===0;
  }
  function comingSoon(p){return String(p?.status||'').toLowerCase()==='coming-soon';}
  function renderSizeBtns(p){
    const sizes=(Array.isArray(p?.sizes)&&p.sizes.length?p.sizes:['One Size']);
    if(!window.selectedSize || !sizes.includes(window.selectedSize)) window.selectedSize=sizes[0];
    return sizes.map(s=>`<button type="button" class="size nita-size-choice ${s===window.selectedSize?'active':''}" onclick="nitaSelectSize('${safe(s)}')">${esc(s)}</button>`).join('');
  }
  window.nitaSelectSize = window.nitaSelectSize || function(s){window.selectedSize=s;document.querySelectorAll('.nita-size-choice').forEach(b=>b.classList.toggle('active',b.textContent.trim()===s));};

  // Product cards: show real image files everywhere, including homepage + shop + collections.
  window.productCard=function(p){
    p=p||{}; const ph=photos(p); const first=ph[0]||''; const second=ph[1]||''; const hasSale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price);
    return `<article class="product nita-visible-product-card"><a class="product-hit" href="product.html?id=${encodeURIComponent(p.id||'')}"><div class="product-img nita-card-img-wrap">${imageTag(first,'nita-card-img primary',p.name)}${second?imageTag(second,'nita-card-img secondary',(p.name||'Product')+' second photo'):''}${hasSale?'<span class="sale-badge">PRICE DROP</span>':''}</div><h3>${esc(p.name||'Product')}</h3>${priceStatus(p)}</a><button class="quick-view-btn" type="button" onclick="event.stopPropagation();event.preventDefault();openQuickView('${safe(p.id||'')}')">QUICK VIEW</button></article>`;
  };
  window.renderProducts=function(el,list){const node=document.querySelector(el||'#products');if(!node)return;const arr=list||(typeof getProducts==='function'?getProducts():[]);node.innerHTML=(arr||[]).map(window.productCard).join('')||'<p class="muted">No products listed yet.</p>';};

  // Quick view: show the same visible product image instead of a grey block.
  window.openQuickView=function(id){
    const p=(typeof getProducts==='function'?getProducts():[]).find(x=>String(x.id)===String(id)); if(!p) return;
    const ph=photos(p); const can=!unavailable(p)&&!comingSoon(p);
    const btn=can?`<button class="btn" onclick="addToCart('${safe(p.id)}',document.querySelector('#quickContent .size.active')?.textContent||'One Size');closeQuickView()">ADD TO CART</button>`:`<button class="btn disabled" disabled>${comingSoon(p)?'COMING SOON':'OUT OF STOCK'}</button>`;
    const q=document.getElementById('quickContent'); if(!q)return;
    q.innerHTML=`<div class="quick-grid"><div class="quick-image nita-quick-real-image">${imageTag(ph[0]||'','nita-quick-img',p.name)}</div><div class="quick-info"><p class="muted">${esc(p.category||'')}</p><h2>${esc(p.name||'Product')}</h2>${priceStatus(p)}<div class="sizes">${renderSizeBtns(p)}</div>${btn}<a class="btn light" href="product.html?id=${encodeURIComponent(p.id)}">VIEW FULL PRODUCT</a></div></div>`;
    document.getElementById('quickModal')?.classList.add('open');
    document.getElementById('quickModal')?.setAttribute('aria-hidden','false');
  };

  // Product page: build once; changing photo only changes image/thumb active, never re-renders product text/buttons.
  window.nitaDetailPhoto=function(dir){
    const ph=window.nitaCurrentPhotos||[]; if(!ph.length)return;
    window.selectedPhoto=(Number(window.selectedPhoto||0)+Number(dir||0)+ph.length)%ph.length;
    const im=document.querySelector('.nita-detail-real-img'); if(im) im.src=ph[window.selectedPhoto];
    document.querySelectorAll('.product-thumbs button').forEach((b,i)=>b.classList.toggle('active',i===window.selectedPhoto));
  };
  window.nitaSetDetailPhoto=function(i){window.selectedPhoto=Number(i)||0;window.nitaDetailPhoto(0);};

  window.productPage=function(){
    const detail=document.getElementById('detail'); if(!detail)return;
    const list=typeof getProducts==='function'?getProducts():(window.products||[]);
    const id=new URL(location.href).searchParams.get('id');
    const p=(list||[]).find(x=>String(x.id)===String(id))||(list||[])[0];
    if(!p){detail.innerHTML='<div class="card"><h1>Product not found</h1><a class="btn" href="shop.html">BACK TO SHOP</a></div>';return;}
    const ph=photos(p); window.nitaCurrentPhotos=ph; window.selectedPhoto=Math.max(0,Math.min(Number(window.selectedPhoto||0),Math.max(ph.length-1,0)));
    const can=!unavailable(p)&&!comingSoon(p);
    const arrows=ph.length>1?`<button type="button" class="detail-photo-arrow detail-photo-prev" aria-label="Previous product photo" onclick="nitaDetailPhoto(-1)"><span>‹</span></button><button type="button" class="detail-photo-arrow detail-photo-next" aria-label="Next product photo" onclick="nitaDetailPhoto(1)"><span>›</span></button>`:'';
    const actions=can?`<button class="btn nita-action-btn add" type="button" onclick="addToCart('${safe(p.id)}',window.selectedSize||'One Size')">ADD TO CART</button><a class="btn light nita-action-btn buy" href="checkout.html">BUY NOW</a>`:`<button class="btn disabled nita-action-btn" disabled>${comingSoon(p)?'COMING SOON':'OUT OF STOCK'}</button><button class="notify-btn nita-action-btn" type="button" onclick="notifyMe&&notifyMe('${safe(p.id)}')">NOTIFY ME</button>`;
    detail.innerHTML=`<div class="product-media nita-premium-product-media compact-product-media"><div class="detail-img nita-premium-detail-img">${imageTag(ph[window.selectedPhoto]||'','nita-detail-real-img',p.name)}${arrows}</div><div class="product-thumbs">${ph.map((x,i)=>`<button type="button" class="${i===window.selectedPhoto?'active':''}" onclick="nitaSetDetailPhoto(${i})">${imageTag(x,'nita-thumb-real-img',(p.name||'Product')+' photo '+(i+1))}</button>`).join('')}</div></div><div class="product-info nita-premium-product-info"><p class="muted product-cat">${esc(p.category||'')}</p><h1>${esc(p.name||'Product')}</h1><div class="price-stock-line"><h2>${money(p.salePrice||p.price)}</h2><div class="inline-stock">${stockText(p)}</div></div><button class="btn light product-detail-fav" onclick="toggleLike&&toggleLike('${safe(p.id)}',event)">♡ ADD TO LIKED ITEMS</button><div class="sizes product-size-list">${renderSizeBtns(p)}</div><div class="product-actions nita-premium-actions">${actions}</div><div class="product-description-block"><h3>Product details</h3><p>${esc(p.desc||'')}</p></div></div>`;
  };

  function addCounter(textarea){
    if(!textarea || textarea.dataset.nitaCounterReady==='1') return;
    textarea.dataset.nitaCounterReady='1'; textarea.setAttribute('maxlength',String(MAX_DESC));
    const wrap=document.createElement('div'); wrap.className='desc-counter-wrap';
    textarea.parentNode.insertBefore(wrap,textarea); wrap.appendChild(textarea);
    const c=document.createElement('div'); c.className='desc-counter'; wrap.appendChild(c);
    const update=()=>{ if(textarea.value.length>MAX_DESC) textarea.value=textarea.value.slice(0,MAX_DESC); c.textContent=(MAX_DESC-textarea.value.length)+'/'+MAX_DESC; };
    textarea.addEventListener('input',update); update();
  }
  function enhanceDescCounters(){
    document.querySelectorAll('#pdesc, textarea.edit-desc, .product-editor textarea, textarea[name*="desc" i], textarea[id*="desc" i]').forEach(addCounter);
  }
  document.addEventListener('input',e=>{if(e.target&&e.target.matches('textarea')&&/desc/i.test((e.target.id||'')+' '+(e.target.name||'')+' '+(e.target.className||''))){if(e.target.value.length>MAX_DESC)e.target.value=e.target.value.slice(0,MAX_DESC);}},true);
  document.addEventListener('DOMContentLoaded',()=>{setTimeout(()=>{ if(document.getElementById('products')) window.renderProducts('#products',typeof getProducts==='function'?getProducts():[]); if(document.getElementById('detail')) window.productPage(); enhanceDescCounters(); },500); setTimeout(enhanceDescCounters,1500);});
  document.addEventListener('click',()=>setTimeout(enhanceDescCounters,80),true);
})();

/* === NITA STYLE PRODUCT MATERIAL SELECTOR FIX 2026-06-13 ===
   Adds product material selector to Add/Edit Product, saves material with product,
   and shows it in product details. Does not change unrelated features. */
(function(){
  const MATERIALS = ['Leather','Faux leather','Suede','Linen','Cotton','Denim','Silk','Satin','Wool','Knit','Cashmere','Polyester','Viscose','Tweed','Crochet','Lace','Nylon','Canvas','Mixed materials','Other'];
  window.NITA_MATERIAL_OPTIONS = MATERIALS;
  const esc = (v='') => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const opts = (selected='') => MATERIALS.map(m => `<option value="${esc(m)}" ${String(selected||'')===m?'selected':''}>${esc(m)}</option>`).join('');

  function materialField(id, cls, value){
    return `<div class="nita-material-field"><label>Product material</label><select id="${id||''}" class="field ${cls||''}">${opts(value||'Leather')}</select><p class="field-help">Choose the main material shown in the product details.</p></div>`;
  }

  function insertAddMaterial(){
    const addForm = document.querySelector('.admin-add-product-form');
    if(!addForm || addForm.querySelector('#pmaterial')) return;
    const category = addForm.querySelector('#pcat')?.closest('div');
    if(category) category.insertAdjacentHTML('afterend', materialField('pmaterial','', 'Leather'));
    else addForm.insertAdjacentHTML('beforeend', materialField('pmaterial','', 'Leather'));
  }

  function insertEditorMaterials(){
    document.querySelectorAll('.product-editor').forEach(editor => {
      if(editor.querySelector('.edit-material')) return;
      const id = (editor.id || '').replace(/^editor-/,'');
      let product = null;
      try{
        const list = typeof products === 'function' ? products() : (window.PRODUCTS || []);
        product = (list || []).find(p => String(p.id) === String(id));
      }catch(e){}
      const current = product?.material || product?.productMaterial || 'Leather';
      const category = editor.querySelector('.edit-category')?.closest('div');
      if(category) category.insertAdjacentHTML('afterend', materialField('', 'edit-material', current));
    });
  }

  function applyMaterialFields(){
    insertAddMaterial();
    insertEditorMaterials();
  }

  // Capture selected material before add/edit save, then attach it to the product array during saveProducts.
  const oldAdd = window.addProductAdmin;
  if(typeof oldAdd === 'function'){
    window.addProductAdmin = async function(){
      window.__nitaPendingAddMaterial = document.getElementById('pmaterial')?.value || 'Leather';
      const result = await oldAdd.apply(this, arguments);
      setTimeout(() => { window.__nitaPendingAddMaterial = null; applyMaterialFields(); }, 800);
      return result;
    };
  }

  const oldSaveEditor = window.saveProductEditor;
  if(typeof oldSaveEditor === 'function'){
    window.saveProductEditor = async function(id){
      const root = document.getElementById('editor-' + id);
      window.__nitaPendingEditMaterial = { id: String(id), material: root?.querySelector('.edit-material')?.value || 'Leather' };
      const result = await oldSaveEditor.apply(this, arguments);
      setTimeout(() => { window.__nitaPendingEditMaterial = null; applyMaterialFields(); }, 800);
      return result;
    };
  }

  const oldSaveProducts = window.saveProducts;
  if(typeof oldSaveProducts === 'function'){
    window.saveProducts = async function(list){
      try{
        if(Array.isArray(list)){
          const addMat = window.__nitaPendingAddMaterial;
          if(addMat){
            const addName = document.getElementById('pname')?.value?.trim();
            for(let i=list.length-1;i>=0;i--){
              const p = list[i];
              if(p && (!addName || String(p.name||'') === addName)) { p.material = addMat; p.productMaterial = addMat; break; }
            }
          }
          const edit = window.__nitaPendingEditMaterial;
          if(edit?.id){
            const p = list.find(x => String(x.id) === edit.id);
            if(p){ p.material = edit.material; p.productMaterial = edit.material; }
          }
        }
      }catch(e){ console.warn('Material save helper skipped:', e); }
      return oldSaveProducts.apply(this, arguments);
    };
  }

  function addMaterialToProductDetails(){
    const detailRoot = document.getElementById('productDetail') || document.querySelector('.product-detail, .product-page, .product-info');
    const block = document.querySelector('.product-description-block');
    if(!block || block.querySelector('.product-material-line')) return;
    let material = '';
    try{
      const params = new URLSearchParams(location.search);
      const id = params.get('id') || params.get('product') || window.currentProductId;
      const list = typeof products === 'function' ? products() : (window.PRODUCTS || []);
      const p = (list || []).find(x => String(x.id) === String(id)) || window.currentProduct;
      material = p?.material || p?.productMaterial || '';
    }catch(e){}
    if(!material) return;
    block.insertAdjacentHTML('afterbegin', `<p class="product-material-line"><strong>Material:</strong> ${esc(material)}</p>`);
  }

  const oldRenderAdmin = window.renderAdmin;
  if(typeof oldRenderAdmin === 'function'){
    window.renderAdmin = async function(){
      const result = await oldRenderAdmin.apply(this, arguments);
      setTimeout(applyMaterialFields, 0);
      return result;
    };
  }
  const oldShow = window.showAdminSection;
  if(typeof oldShow === 'function'){
    window.showAdminSection = function(){
      const result = oldShow.apply(this, arguments);
      setTimeout(applyMaterialFields, 0);
      return result;
    };
  }
  const oldProductPage = window.productPage;
  if(typeof oldProductPage === 'function'){
    window.productPage = function(){
      const result = oldProductPage.apply(this, arguments);
      setTimeout(addMaterialToProductDetails, 0);
      return result;
    };
  }
  document.addEventListener('DOMContentLoaded', () => { setTimeout(applyMaterialFields, 300); setTimeout(addMaterialToProductDetails, 500); });
  window.addEventListener('load', () => { setTimeout(applyMaterialFields, 500); setTimeout(addMaterialToProductDetails, 700); });
})();
/* === END NITA STYLE PRODUCT MATERIAL SELECTOR FIX === */

/* =========================================================
   NITA STYLE FINAL COMBINED FIX
   - Quick View product image from assets/products filenames
   - Live 500/500 description remaining counter
   - Product material selector in Add/Edit Product
   ========================================================= */
(function(){
  const MATERIAL_OPTIONS = ['Leather','Faux leather','Suede','Linen','Cotton','Denim','Silk','Satin','Wool','Knit','Cashmere','Polyester','Viscose','Tweed','Crochet','Lace','Nylon','Canvas','Mixed materials','Other'];
  const DESC_LIMIT = 500;
  const esc = (s)=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const money2 = (v)=>{ try { return typeof money==='function'?money(v):('$'+Number(v||0).toFixed(2)); } catch(e){ return '$'+Number(v||0).toFixed(2); } };
  function resolveProductImage(src){
    src = String(src||'').trim();
    if(!src) return '';
    if(src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/') || src.startsWith('assets/')) return src;
    if(src.includes('gradient(')) return '';
    return 'assets/products/' + src.replace(/^\.\//,'');
  }
  function photosOfProduct(p){
    let list=[];
    if(Array.isArray(p?.photos)) list=list.concat(p.photos);
    if(Array.isArray(p?.imageFiles)) list=list.concat(p.imageFiles);
    if(Array.isArray(p?.filePhotos)) list=list.concat(p.filePhotos);
    if(p?.img) list.unshift(p.img);
    list = list.map(resolveProductImage).filter(Boolean);
    return [...new Set(list)];
  }
  window.nitaResolveProductImage = resolveProductImage;
  window.productImagesForDisplay = function(p){
    const all = photosOfProduct(p);
    const fallback = 'assets/logo-cropped.png';
    return { first: all[0] || fallback, second: all[1] || all[0] || fallback, all: all.length ? all : [fallback] };
  };

  function ensureQuickModal(){
    let m=document.getElementById('quickModal');
    if(!m){
      document.body.insertAdjacentHTML('beforeend','<div class="quick-modal" id="quickModal" aria-hidden="true"><div class="quick-backdrop" data-quick-close="true"></div><div class="quick-dialog" role="dialog" aria-modal="true"><button class="quick-close" type="button" data-quick-close="true">×</button><div id="quickContent"></div></div></div>');
      m=document.getElementById('quickModal');
    }
    return m;
  }
  window.openQuickView = function(id){
    const list = typeof getProducts==='function' ? getProducts() : [];
    const p = list.find(x=>String(x.id)===String(id));
    if(!p) return false;
    const imgs = productImagesForDisplay(p);
    const sizes = (Array.isArray(p.sizes)&&p.sizes.length?p.sizes:['One Size']).map((s,i)=>`<button type="button" class="size ${i===0?'active':''}" onclick="this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${esc(s)}</button>`).join('');
    const status = p.status || 'in-stock';
    const canBuy = status === 'in-stock';
    const action = canBuy
      ? `<button class="btn quick-add" type="button" onclick="addToCart('${String(p.id).replace(/'/g,"\\'")}', document.querySelector('#quickContent .size.active')?.textContent || 'One Size'); closeQuickView();">ADD TO CART</button>`
      : `<button class="btn disabled quick-disabled" type="button" disabled>${status==='coming-soon'?'COMING SOON':'OUT OF STOCK'}</button>`;
    const price = (p.salePrice!=='' && p.salePrice!=null && Number(p.salePrice)<Number(p.price))
      ? `<h3><span class="muted" style="text-decoration:line-through;margin-right:8px">${money2(p.price)}</span><span class="price-drop">${money2(p.salePrice)}</span></h3>`
      : `<h3>${money2(p.price)}</h3>`;
    const q = document.getElementById('quickContent') || ensureQuickModal().querySelector('#quickContent');
    q.innerHTML = `<div class="quick-grid quick-grid-fixed">
      <div class="quick-image quick-image-fixed"><img src="${esc(imgs.first)}" alt="${esc(p.name||'Product image')}" loading="eager"></div>
      <div class="quick-info"><p class="muted">${esc(p.category||'')}</p><h2>${esc(p.name||'Product')}</h2>${price}<p>${esc(p.desc||'')}</p><div class="sizes">${sizes}</div>${action}<a class="btn light" href="product.html?id=${encodeURIComponent(p.id)}">VIEW FULL PRODUCT</a></div>
    </div>`;
    const m=ensureQuickModal(); m.classList.add('open'); m.setAttribute('aria-hidden','false'); document.body.classList.add('quick-open','panel-open'); return false;
  };
  window.closeQuickView = function(){ const m=document.getElementById('quickModal'); if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true')} document.body.classList.remove('quick-open','panel-open'); };
  document.addEventListener('click',function(e){ if(e.target.closest('[data-quick-close]')){ e.preventDefault(); closeQuickView(); }});

  function ensureDescCounter(textarea){
    if(!textarea || textarea.dataset.nitaCounterReady==='1') return;
    textarea.dataset.nitaCounterReady='1';
    textarea.setAttribute('maxlength', String(DESC_LIMIT));
    let counter = textarea.parentElement?.querySelector('.nita-desc-counter');
    if(!counter){
      counter = document.createElement('div');
      counter.className = 'nita-desc-counter';
      textarea.insertAdjacentElement('afterend', counter);
    }
    function update(){
      if(textarea.value.length > DESC_LIMIT) textarea.value = textarea.value.slice(0,DESC_LIMIT);
      counter.textContent = `${DESC_LIMIT - textarea.value.length}/${DESC_LIMIT}`;
    }
    textarea.addEventListener('input', update);
    update();
  }
  function materialSelectHtml(value){
    const current = value || 'Leather';
    return `<div class="nita-material-field"><label>Product material</label><select id="pmaterial" class="field nita-material-select">${MATERIAL_OPTIONS.map(m=>`<option value="${esc(m)}" ${m===current?'selected':''}>${esc(m)}</option>`).join('')}</select><p class="field-help">Choose the main material of this product.</p></div>`;
  }
  function editMaterialSelectHtml(value){
    const current = value || 'Leather';
    return `<div class="nita-material-field edit-material-wrap"><label>Product material</label><select class="field edit-material nita-material-select">${MATERIAL_OPTIONS.map(m=>`<option value="${esc(m)}" ${m===current?'selected':''}>${esc(m)}</option>`).join('')}</select><p class="field-help">Choose the main material of this product.</p></div>`;
  }
  function ensureMaterialFields(){
    const addCat = document.getElementById('pcat');
    if(addCat && !document.getElementById('pmaterial')){
      const wrap = addCat.closest('div') || addCat.parentElement;
      if(wrap) wrap.insertAdjacentHTML('afterend', materialSelectHtml('Leather'));
    }
    document.querySelectorAll('.product-editor').forEach(editor=>{
      if(editor.querySelector('.edit-material')) return;
      const id = (editor.id||'').replace(/^editor-/,'');
      const p = (typeof getProducts==='function'?getProducts():[]).find(x=>String(x.id)===String(id));
      const cat = editor.querySelector('.edit-category');
      const wrap = cat?.closest('div') || cat?.parentElement;
      if(wrap) wrap.insertAdjacentHTML('afterend', editMaterialSelectHtml(p?.material || p?.productMaterial || 'Leather'));
    });
  }
  function ensureAllAdminEnhancements(){
    document.querySelectorAll('#pdesc, textarea.edit-desc').forEach(ensureDescCounter);
    ensureMaterialFields();
  }
  const oldAdd = window.addProductAdmin;
  if(typeof oldAdd === 'function'){
    window.addProductAdmin = async function(){
      const mat = document.getElementById('pmaterial')?.value || 'Leather';
      const before = (typeof getProducts==='function'?getProducts():[]).map(p=>String(p.id));
      const result = await oldAdd.apply(this, arguments);
      try{
        const ps = typeof getProducts==='function'?getProducts():[];
        const added = [...ps].reverse().find(p=>!before.includes(String(p.id)));
        if(added && !added.material){ added.material = mat; added.productMaterial = mat; if(typeof saveProducts==='function') await saveProducts(ps); }
      }catch(e){}
      setTimeout(ensureAllAdminEnhancements, 300);
      return result;
    };
  }
  const oldEditSave = window.saveProductEditor;
  if(typeof oldEditSave === 'function'){
    window.saveProductEditor = async function(id){
      const editor = document.getElementById('editor-'+CSS.escape(String(id)));
      const mat = editor?.querySelector('.edit-material')?.value || 'Leather';
      const result = await oldEditSave.apply(this, arguments);
      try{
        const ps = typeof getProducts==='function'?getProducts():[];
        const p = ps.find(x=>String(x.id)===String(id));
        if(p){ p.material = mat; p.productMaterial = mat; if(typeof saveProducts==='function') await saveProducts(ps); }
      }catch(e){}
      setTimeout(ensureAllAdminEnhancements, 300);
      return result;
    };
  }
  const oldRenderAdmin = window.renderAdmin;
  if(typeof oldRenderAdmin==='function'){
    window.renderAdmin = async function(){ const r=await oldRenderAdmin.apply(this, arguments); setTimeout(ensureAllAdminEnhancements, 300); return r; };
  }
  const oldToggle = window.toggleProductEditor;
  if(typeof oldToggle==='function'){
    window.toggleProductEditor=function(){ const r=oldToggle.apply(this,arguments); setTimeout(ensureAllAdminEnhancements, 150); return r; };
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(ensureAllAdminEnhancements,500));
  window.addEventListener('load',()=>setTimeout(ensureAllAdminEnhancements,800));
  new MutationObserver(()=>ensureAllAdminEnhancements()).observe(document.documentElement,{childList:true,subtree:true});
})();


/* === NITA STYLE FINAL SHOP FILTERS + COLLECTION PREVIEWS + SIGNUP FLAG FIX 20260614 === */
(function(){
  const CATS=['All','Dresses','Skirts','T-Shirts','Tops','Pants','Bags','Scarves','Overalls'];
  const COLORS=['All','Black','White','Ivory','Cream','Beige','Taupe','Grey','Silver','Gold','Rose Gold','Bronze','Brown','Cognac','Camel','Navy','Blue','Denim Blue','Red','Burgundy','Pink','Green','Olive','Khaki','Yellow','Orange','Purple','Print / Pattern','Multi-color'];
  const MATERIALS=['All','Leather','Faux leather','Suede','Linen','Cotton','Denim','Silk','Satin','Wool','Knit','Cashmere','Polyester','Viscose','Tweed','Crochet','Lace','Nylon','Canvas','Mixed materials','Other'];
  const SIZES=['All','XS','S','M','L','XL','One Size'];
  const PHONE_COUNTRIES={'+961':'🇱🇧','+966':'🇸🇦','+965':'🇰🇼','+971':'🇦🇪','+974':'🇶🇦','+973':'🇧🇭','+968':'🇴🇲','+962':'🇯🇴','+20':'🇪🇬','+33':'🇫🇷','+39':'🇮🇹','+44':'🇬🇧','+1':'🇺🇸','+61':'🇦🇺','+49':'🇩🇪','+34':'🇪🇸','+90':'🇹🇷','+212':'🇲🇦','+216':'🇹🇳','+213':'🇩🇿'};
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm=v=>String(v??'').trim().toLowerCase();
  function list(){try{return typeof getProducts==='function'?getProducts():JSON.parse(localStorage.getItem('nitaProducts')||'[]')}catch(e){return []}}
  function imgUrl(v){v=String(v||'').trim(); if(!v||/^linear-gradient/i.test(v))return ''; const m=v.match(/url\((['"]?)(.*?)\1\)/i); if(m)v=m[2]; if(/^data:image\//i.test(v)||/^https?:\/\//i.test(v)||v.startsWith('/'))return v; if(/^assets\/products\//i.test(v))return '/'+v.replace(/^\/+/, ''); if(/^assets\//i.test(v))return '/'+v.replace(/^\/+/, ''); if(/\.(png|jpe?g|webp|gif|avif)$/i.test(v))return '/assets/products/'+v; return '';}
  function photos(p){let a=[]; if(Array.isArray(p?.photos))a=a.concat(p.photos); if(Array.isArray(p?.images))a=a.concat(p.images); if(p?.img)a.unshift(p.img); if(p?.image)a.unshift(p.image); const seen={}; return a.map(imgUrl).filter(x=>x&&!seen[x]&&(seen[x]=1));}
  function price(p){return Number(p?.salePrice||p?.price||0)}
  function productVisible(p){try{return typeof window.nitaProductIsPublicVisible==='function'?window.nitaProductIsPublicVisible(p):true}catch(e){return true}}
  function opt(arr,selected){return arr.map(x=>'<option value="'+esc(x)+'" '+(String(selected)===String(x)?'selected':'')+'>'+esc(x)+'</option>').join('')}
  function ensureShopFilters(){
    const box=document.getElementById('nitaShopFilters'); if(!box)return;
    if(box.dataset.ready==='1')return; box.dataset.ready='1';
    const url=new URL(location.href);
    box.innerHTML='<div class="nita-filter-shell"><div class="nita-filter-bar"><button type="button" class="nita-filter-toggle" onclick="nitaToggleShopFilters()"><span>Filters</span><b>+</b></button><div class="nita-sort-wrap"><button type="button" class="nita-sort-toggle" onclick="nitaToggleSortMenu()">Sort by</button><div class="nita-sort-menu" id="nitaSortMenu"><button type="button" data-sort="new">New arrivals</button><button type="button" data-sort="low">Price (low-high)</button><button type="button" data-sort="high">Price (high-low)</button></div></div></div><div class="nita-filter-panel" id="nitaFilterPanel"><div><label>Category</label><select id="filter" class="field">'+opt(CATS,url.searchParams.get('cat')||'All')+'</select></div><div><label>Color</label><select id="filterColor" class="field">'+opt(COLORS,'All')+'</select></div><div><label>Material</label><select id="filterMaterial" class="field">'+opt(MATERIALS,'All')+'</select></div><div><label>Size</label><select id="filterSize" class="field">'+opt(SIZES,'All')+'</select></div><div><label>Min price</label><input id="filterMin" class="field" type="number" min="0" placeholder="Min"></div><div><label>Max price</label><input id="filterMax" class="field" type="number" min="0" placeholder="Max"></div><button type="button" class="btn light nita-clear-filters" onclick="nitaClearShopFilters()">Clear</button></div></div>';
    box.querySelectorAll('select,input').forEach(el=>el.addEventListener('input',()=>window.shopPage&&window.shopPage()));
    box.querySelectorAll('select').forEach(el=>el.addEventListener('change',()=>window.shopPage&&window.shopPage()));
    box.querySelectorAll('[data-sort]').forEach(btn=>btn.addEventListener('click',()=>{window.nitaShopSort=btn.dataset.sort||'new'; const m=document.getElementById('nitaSortMenu'); if(m)m.classList.remove('open'); window.shopPage&&window.shopPage();}));
  }
  window.nitaShopSort='new';
  window.nitaToggleShopFilters=function(){
    const panel=document.getElementById('nitaFilterPanel'); const toggle=document.querySelector('.nita-filter-toggle');
    if(!panel)return; const open=!panel.classList.contains('open'); panel.classList.toggle('open',open); if(toggle){toggle.classList.toggle('open',open); const b=toggle.querySelector('b'); if(b)b.textContent=open?'−':'+';}
  };
  window.nitaToggleSortMenu=function(){const m=document.getElementById('nitaSortMenu'); if(m)m.classList.toggle('open');};
  document.addEventListener('click',function(e){const m=document.getElementById('nitaSortMenu'); if(m && !e.target.closest('.nita-sort-wrap'))m.classList.remove('open');});
  window.nitaClearShopFilters=function(){['filterColor','filterMaterial','filterSize'].forEach(id=>{const e=document.getElementById(id); if(e)e.value='All'}); ['filterMin','filterMax'].forEach(id=>{const e=document.getElementById(id); if(e)e.value=''}); const f=document.getElementById('filter'); if(f)f.value='All'; history.replaceState(null,'','shop.html'); window.shopPage&&window.shopPage();}
  window.shopPage=function(){
    ensureShopFilters();
    const url=new URL(location.href); const cat=document.getElementById('filter')?.value||url.searchParams.get('cat')||'All';
    const color=document.getElementById('filterColor')?.value||'All', mat=document.getElementById('filterMaterial')?.value||'All', size=document.getElementById('filterSize')?.value||'All';
    const min=Number(document.getElementById('filterMin')?.value||0), max=Number(document.getElementById('filterMax')?.value||0);
    const collection=url.searchParams.get('collection')||'';
    let arr=list().filter(productVisible).filter(p=>cat==='All'||norm(p.category)===norm(cat)).filter(p=>!collection||norm(p.collection||p.displaySection||p.homeSection).includes(norm(collection))).filter(p=>color==='All'||norm(p.color||p.colour).includes(norm(color))).filter(p=>mat==='All'||norm(p.material||p.productMaterial).includes(norm(mat))).filter(p=>size==='All'||(Array.isArray(p.sizes)&&p.sizes.map(norm).includes(norm(size)))).filter(p=>!min||price(p)>=min).filter(p=>!max||price(p)<=max);
    const sort=window.nitaShopSort||'new';
    if(sort==='low')arr.sort((a,b)=>price(a)-price(b));
    if(sort==='high')arr.sort((a,b)=>price(b)-price(a));
    if(sort==='new')arr.sort((a,b)=>Number(b.createdAt||b.id?.replace(/\D/g,'')||0)-Number(a.createdAt||a.id?.replace(/\D/g,'')||0));
    const grid=document.getElementById('products'); if(!grid)return;
    grid.innerHTML=arr.length?arr.map(p=>window.productCard?window.productCard(p):'').join(''):'<div class="nita-empty-products"><h2>No products found</h2><p class="muted">Try changing the category, color, material, size, or price range.</p></div>';
  };
  function collectionUrl(name){ if(name==='New Arrivals')return 'shop.html?collection=New%20Arrivals'; if(name==='Accessories')return 'shop.html?cat=Bags'; return 'shop.html?collection='+encodeURIComponent(name); }
  function matchesCollection(p,name){const c=norm(p.collection||p.displaySection||p.homeSection||p.category||''); if(name==='New Arrivals')return /new|arrival|drop/.test(c)||norm(p.homeSection)==='new-arrivals'; if(name==='Everyday Edit')return /everyday|edit/.test(c); if(name==='Summer Pieces')return /summer/.test(c); if(name==='Accessories')return /accessor|bags|bag|scarf|scarves/.test(norm(p.category)+' '+c); return false;}
  window.nitaRenderCollectionsPage=function(){
    const grid=document.getElementById('nitaCollectionsGrid'); if(!grid)return; const ps=list().filter(productVisible);
    const names=['New Arrivals','Everyday Edit','Summer Pieces','Accessories'];
    grid.innerHTML=names.map(name=>{let items=ps.filter(p=>matchesCollection(p,name)); if(!items.length)items=ps.slice(0,3); const imgs=items.slice(0,4).map(p=>photos(p)[0]).filter(Boolean); const preview=imgs.length?'<div class="nita-collection-preview '+(imgs.length>1?'multi':'')+'">'+imgs.map(src=>'<img src="'+esc(src)+'" alt="'+esc(name)+' preview" loading="lazy">').join('')+'</div>':'<div class="nita-collection-preview empty"><img src="assets/logo-cropped.png" alt="Nita Style"></div>'; return '<a class="nita-collection-card" href="'+collectionUrl(name)+'">'+preview+'<div class="nita-collection-title"><h3>'+esc(name)+'</h3><span>'+items.length+' piece'+(items.length===1?'':'s')+'</span></div></a>';}).join('');
  };
  function applyVisibleFlags(){
    // Keep only one visible country flag: the flag inside the selected option text.
    // Remove the separate visual flag span that made the flag appear twice.
    document.querySelectorAll('.nita-phone-flag-visual').forEach(el=>el.remove());
    document.querySelectorAll('.nita-phone-row .nita-phone-code').forEach(sel=>{
      sel.classList.add('nita-phone-code-single-flag');
    });
  }
  function forceSignupPhoneFlags(){
    try{ if(document.getElementById('signupFields') && getComputedStyle(document.getElementById('signupFields')).display!=='none' && typeof window.nitaUpdatePhoneHidden==='function'){} }catch(e){}
    applyVisibleFlags();
  }
  document.addEventListener('DOMContentLoaded',()=>{setTimeout(()=>{ensureShopFilters(); if(document.getElementById('products')) window.shopPage(); if(document.getElementById('nitaCollectionsGrid')) window.nitaRenderCollectionsPage(); forceSignupPhoneFlags();},500); setInterval(forceSignupPhoneFlags,1000);});
  window.addEventListener('nita-store-ready',()=>setTimeout(()=>{if(document.getElementById('products'))window.shopPage(); if(document.getElementById('nitaCollectionsGrid'))window.nitaRenderCollectionsPage();},300));
})();
/* === END NITA STYLE FINAL SHOP FILTERS + COLLECTION PREVIEWS + SIGNUP FLAG FIX === */


/* === NITA STYLE MOBILE HEADER / SLIDE MENU FINAL 20260614 === */
(function(){
  const SHOP_CATEGORIES=[['Dresses','shop.html?cat=Dresses'],['Skirts','shop.html?cat=Skirts'],['T-Shirts','shop.html?cat=T-Shirts'],['Tops','shop.html?cat=Tops'],['Pants','shop.html?cat=Pants'],['Bags','shop.html?cat=Bags'],['Scarves','shop.html?cat=Scarves'],['Overalls','shop.html?cat=Overalls']];
  const COLLECTION_LINKS=[['Latest Added','collections.html'],['Everyday Boutique','shop.html?collection=Everyday%20Edit'],['Minimal','shop.html?collection=Minimal'],['Essential','shop.html?cat=Essentials'],['Daywear','shop.html?cat=Daywear'],['Evening','shop.html?cat=Evening'],['Accessories','shop.html?cat=Bags']];
  function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  function activeUser(){
    try{return window.nitaActiveUser?window.nitaActiveUser():JSON.parse(localStorage.getItem('nitaUser')||'null')}catch(e){return null}
  }
  function lineLinks(items){return items.map(([label,href])=>`<a href="${href}" onclick="closeMobileMenu()">${esc(label)}</a>`).join('');}
  window.openMobileMenu=function(){document.body.classList.add('mobile-menu-open');document.getElementById('mobileMenuDrawer')?.setAttribute('aria-hidden','false');};
  window.closeMobileMenu=function(){document.body.classList.remove('mobile-menu-open');document.getElementById('mobileMenuDrawer')?.setAttribute('aria-hidden','true');};
  window.toggleMobileSubmenu=function(id){
    const panel=document.getElementById(id); if(!panel)return;
    const isOpen=panel.classList.toggle('open');
    const btn=document.querySelector(`[data-mobile-toggle="${id}"]`);
    if(btn){btn.classList.toggle('open',isOpen);btn.setAttribute('aria-expanded',isOpen?'true':'false');}
  };
  function mobileDrawer(admin){
    return `<div class="mobile-menu-backdrop" onclick="closeMobileMenu()"></div><aside class="mobile-menu-drawer" id="mobileMenuDrawer" aria-hidden="true"><div class="mobile-menu-head"><span>Menu</span><button type="button" onclick="closeMobileMenu()" aria-label="Close menu">×</button></div><div class="mobile-menu-icons"><a href="${activeUser()?'account.html':'login.html'}" onclick="closeMobileMenu()" aria-label="Account">♡ Account</a><a href="liked.html" onclick="closeMobileMenu()" aria-label="Liked items">♡ Liked</a></div><button type="button" class="mobile-menu-row" data-mobile-toggle="mobileShopSub" onclick="toggleMobileSubmenu('mobileShopSub')"><span>Shop</span><b>+</b></button><div class="mobile-submenu" id="mobileShopSub">${lineLinks(SHOP_CATEGORIES)}</div><button type="button" class="mobile-menu-row" data-mobile-toggle="mobileCollectionsSub" onclick="toggleMobileSubmenu('mobileCollectionsSub')"><span>Collections</span><b>+</b></button><div class="mobile-submenu" id="mobileCollectionsSub">${lineLinks(COLLECTION_LINKS)}</div><a class="mobile-menu-row link" href="about.html" onclick="closeMobileMenu()">About</a><a class="mobile-menu-row link" href="${activeUser()?'account.html':'login.html'}" onclick="closeMobileMenu()">Account</a>${admin?`<a class="mobile-menu-row link" href="admin.html" onclick="closeMobileMenu()">Admin</a>`:''}</aside>`;
  }
  header=function(){
    const user=activeUser();
    const isAdmin=ADMIN_EMAILS.includes(String(user?.email||'').toLowerCase());
    const admin=isAdmin?'<a class="admin-link" href="admin.html">ADMIN</a>':'';
    const desktopNav=`<nav class="nav"><div class="nav-item"><a href="shop.html">SHOP</a><div class="mega compact-mega"><div class="mega-block"><h4>SHOP BY CATEGORY</h4><div class="mega-links">${lineLinks(SHOP_CATEGORIES)}</div></div><div class="mega-block"><h4>SHOP BY EDIT</h4><div class="mega-links"><a href="collections.html">New Arrivals</a><a href="shop.html?cat=Essentials">Essentials</a><a href="shop.html?cat=Evening">Evening Pieces</a><a href="shop.html?cat=Sale">Price Drops</a></div></div></div></div><div class="nav-item"><a href="collections.html">COLLECTIONS</a><div class="mega compact-mega"><div class="mega-block"><h4>FEATURED</h4><div class="mega-links"><a href="collections.html">Latest Edit</a><a href="collections.html">Everyday Boutique</a><a href="collections.html">Minimal Essentials</a></div></div><div class="mega-block"><h4>OCCASION</h4><div class="mega-links"><a href="shop.html?cat=Daywear">Daywear</a><a href="shop.html?cat=Evening">Evening</a><a href="shop.html?cat=Accessories">Accessories</a></div></div></div></div><a href="about.html">ABOUT</a></nav>`;
    const mobileLeft=`<div class="mobile-header-left"><button type="button" class="mobile-icon-btn mobile-menu-btn" onclick="openMobileMenu()" aria-label="Open menu"><span></span><span></span><span></span></button><button type="button" class="mobile-icon-btn mobile-search-btn" onclick="openSearch()" aria-label="Search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="M15.5 15.5 21 21"></path></svg></button></div>`;
    const desktopActions=`<div class="actions"><button onclick="openSearch()" style="border:0;background:0;font-weight:800;cursor:pointer">SEARCH</button><a class="account-nav-link" href="${user?'account.html':'login.html'}">${user?'ACCOUNT':'SIGN IN'}</a>${admin}<a class="liked-nav-link" href="liked.html" aria-label="Liked items" title="Liked items"><span class="heart-nav">♡</span><span class="liked-label">LIKED</span><span class="liked-count">0</span></a><button class="cart-icon-btn" aria-label="Cart" onclick="openCart()"><span class="cart-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.5 8.5h11l.8 11H5.7l.8-11Z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/></svg></span><span class="cart-count">0</span></button></div>`;
    const mobileRight=`<div class="mobile-header-right"><a class="mobile-icon-btn mobile-liked-btn" href="liked.html" aria-label="Liked items"><span>♡</span><span class="liked-count">0</span></a><button class="mobile-icon-btn mobile-cart-btn" type="button" onclick="openCart()" aria-label="Cart"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5h11l.8 11H5.7l.8-11Z"></path><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"></path></svg><span class="cart-count">0</span></button></div>`;
    return `<header class="topbar mobile-pro-header">${mobileLeft}${desktopNav}<a class="brand" href="index.html"><img src="assets/logo-cropped.png" alt="Nita Style"></a>${desktopActions}${mobileRight}</header>${mobileDrawer(admin)}<aside class="search-panel" id="searchPanel"><button class="close" onclick="closeSearch()">×</button><h2>Search</h2><input class="field" id="searchInput" placeholder="Search dresses, skirts, t-shirts, tops, pants, bags..." oninput="renderSearch()"><div id="searchResults"></div></aside><aside class="cart-panel" id="cartPanel"><button class="close" onclick="closeCart()">×</button><h2>Your Cart</h2><div id="cartItems"></div><a class="btn" href="checkout.html" style="display:block;text-align:center;margin-top:20px">CHECKOUT</a></aside>`;
  };
})();
/* === END NITA STYLE MOBILE HEADER / SLIDE MENU FINAL === */


/* === NITA STYLE REMOVE LIKES + MOBILE NAV ALIGNMENT 20260614 === */
(function(){
  const SHOP_CATEGORIES=[['Dresses','shop.html?cat=Dresses'],['Skirts','shop.html?cat=Skirts'],['T-Shirts','shop.html?cat=T-Shirts'],['Tops','shop.html?cat=Tops'],['Pants','shop.html?cat=Pants'],['Bags','shop.html?cat=Bags'],['Scarves','shop.html?cat=Scarves'],['Overalls','shop.html?cat=Overalls']];
  const COLLECTION_LINKS=[['Latest Added','collections.html'],['Everyday Boutique','shop.html?collection=Everyday%20Edit'],['Minimal','shop.html?collection=Minimal'],['Essential','shop.html?cat=Essentials'],['Daywear','shop.html?cat=Daywear'],['Evening','shop.html?cat=Evening'],['Accessories','shop.html?cat=Bags']];
  function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  function activeUser(){try{return window.nitaActiveUser?window.nitaActiveUser():JSON.parse(localStorage.getItem('nitaUser')||'null')}catch(e){return null}}
  function links(items){return items.map(([label,href])=>`<a href="${href}" onclick="closeMobileMenu()">${esc(label)}</a>`).join('');}
  window.openMobileMenu=function(){document.body.classList.add('mobile-menu-open');document.getElementById('mobileMenuDrawer')?.setAttribute('aria-hidden','false');};
  window.closeMobileMenu=function(){document.body.classList.remove('mobile-menu-open');document.getElementById('mobileMenuDrawer')?.setAttribute('aria-hidden','true');};
  window.toggleMobileSubmenu=function(id){const panel=document.getElementById(id); if(!panel)return; const open=panel.classList.toggle('open'); const btn=document.querySelector(`[data-mobile-toggle="${id}"]`); if(btn){btn.classList.toggle('open',open);btn.setAttribute('aria-expanded',open?'true':'false'); const plus=btn.querySelector('b'); if(plus)plus.textContent=open?'−':'+';}};
  function mobileDrawer(){return `<div class="mobile-menu-backdrop" onclick="closeMobileMenu()"></div><aside class="mobile-menu-drawer" id="mobileMenuDrawer" aria-hidden="true"><div class="mobile-menu-head"><span>Menu</span><button type="button" onclick="closeMobileMenu()" aria-label="Close menu">×</button></div><button type="button" class="mobile-menu-row" data-mobile-toggle="mobileShopSub" onclick="toggleMobileSubmenu('mobileShopSub')"><span>Shop</span><b>+</b></button><div class="mobile-submenu" id="mobileShopSub">${links(SHOP_CATEGORIES)}</div><button type="button" class="mobile-menu-row" data-mobile-toggle="mobileCollectionsSub" onclick="toggleMobileSubmenu('mobileCollectionsSub')"><span>Collections</span><b>+</b></button><div class="mobile-submenu" id="mobileCollectionsSub">${links(COLLECTION_LINKS)}</div><a class="mobile-menu-row link" href="about.html" onclick="closeMobileMenu()">About</a></aside>`;}
  function userIcon(){return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="4"></circle><path d="M4.5 21a7.5 7.5 0 0 1 15 0"></path></svg>`;}
  function cartIcon(){return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5h11l.8 11H5.7l.8-11Z"></path><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"></path></svg>`;}
  header=function(){
    const user=activeUser();
    const isAdmin=(typeof ADMIN_EMAILS!=='undefined')&&ADMIN_EMAILS.includes(String(user?.email||'').toLowerCase());
    const admin=isAdmin?'<a class="admin-link" href="admin.html">ADMIN</a>':'';
    const desktopNav=`<nav class="nav"><div class="nav-item"><a href="shop.html">SHOP</a><div class="mega compact-mega"><div class="mega-block"><h4>SHOP BY CATEGORY</h4><div class="mega-links">${links(SHOP_CATEGORIES)}</div></div><div class="mega-block"><h4>SHOP BY EDIT</h4><div class="mega-links"><a href="collections.html">New Arrivals</a><a href="shop.html?cat=Essentials">Essentials</a><a href="shop.html?cat=Evening">Evening Pieces</a><a href="shop.html?cat=Sale">Price Drops</a></div></div></div></div><div class="nav-item"><a href="collections.html">COLLECTIONS</a><div class="mega compact-mega"><div class="mega-block"><h4>FEATURED</h4><div class="mega-links"><a href="collections.html">Latest Edit</a><a href="collections.html">Everyday Boutique</a><a href="collections.html">Minimal Essentials</a></div></div><div class="mega-block"><h4>OCCASION</h4><div class="mega-links"><a href="shop.html?cat=Daywear">Daywear</a><a href="shop.html?cat=Evening">Evening</a><a href="shop.html?cat=Accessories">Accessories</a></div></div></div></div><a href="about.html">ABOUT</a></nav>`;
    const mobileLeft=`<div class="mobile-header-left"><button type="button" class="mobile-icon-btn mobile-menu-btn" onclick="openMobileMenu()" aria-label="Open menu"><span></span><span></span><span></span></button><button type="button" class="mobile-icon-btn mobile-search-btn" onclick="openSearch()" aria-label="Search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="M15.5 15.5 21 21"></path></svg></button></div>`;
    const desktopActions=`<div class="actions"><button onclick="openSearch()" style="border:0;background:0;font-weight:800;cursor:pointer">SEARCH</button><a class="account-nav-link" href="${user?'account.html':'login.html'}">${user?'ACCOUNT':'SIGN IN'}</a>${admin}<button class="cart-icon-btn" aria-label="Cart" onclick="openCart()"><span class="cart-icon" aria-hidden="true">${cartIcon()}</span><span class="cart-count">0</span></button></div>`;
    const mobileRight=`<div class="mobile-header-right"><a class="mobile-icon-btn mobile-account-btn" href="${user?'account.html':'login.html'}" aria-label="Account">${userIcon()}</a><button class="mobile-icon-btn mobile-cart-btn" type="button" onclick="openCart()" aria-label="Cart">${cartIcon()}<span class="cart-count">0</span></button></div>`;
    return `<header class="topbar mobile-pro-header nita-no-like-header">${mobileLeft}${desktopNav}<a class="brand" href="index.html"><img src="assets/logo-cropped.png" alt="Nita Style"></a>${desktopActions}${mobileRight}</header>${mobileDrawer()}<aside class="search-panel" id="searchPanel"><button class="close" onclick="closeSearch()">×</button><h2>Search</h2><input class="field" id="searchInput" placeholder="Search dresses, skirts, t-shirts, tops, pants, bags..." oninput="renderSearch()"><div id="searchResults"></div></aside><aside class="cart-panel" id="cartPanel"><button class="close" onclick="closeCart()">×</button><h2>Your Cart</h2><div id="cartItems"></div><a class="btn" href="checkout.html" style="display:block;text-align:center;margin-top:20px">CHECKOUT</a></aside>`;
  };
  window.toggleLike=function(){return false;};
  window.likedIds=function(){return [];};
  document.addEventListener('DOMContentLoaded',function(){
    setTimeout(function(){document.querySelectorAll('.liked-nav-link,.mobile-liked-btn,.favorite-btn,.product-detail-fav,.liked-remove-btn,[data-like-id]').forEach(el=>el.remove());},300);
  });
})();
/* === END NITA STYLE REMOVE LIKES + MOBILE NAV ALIGNMENT 20260614 === */


/* === NITA STYLE SINGLE PHONE FLAG PATCH 20260614 === */
(function(){
  function removeDuplicatePhoneFlags(){
    document.querySelectorAll('.nita-phone-flag-visual').forEach(el=>el.remove());
    document.querySelectorAll('.nita-phone-row .nita-phone-code').forEach(sel=>sel.classList.add('nita-phone-code-single-flag'));
  }
  document.addEventListener('DOMContentLoaded',function(){ removeDuplicatePhoneFlags(); setTimeout(removeDuplicatePhoneFlags,400); setTimeout(removeDuplicatePhoneFlags,1200); });
  window.addEventListener('load',function(){ removeDuplicatePhoneFlags(); setTimeout(removeDuplicatePhoneFlags,600); });
  document.addEventListener('change',function(e){ if(e.target && e.target.classList && e.target.classList.contains('nita-phone-code')) removeDuplicatePhoneFlags(); });
})();
/* === END NITA STYLE SINGLE PHONE FLAG PATCH === */


/* === NITA STYLE PREMIUM COLLECTION PREVIEWS + MOBILE HEADER ALIGN FIX 20260614 === */
(function(){
  function esc(v){return String(v??'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function norm(v){return String(v??'').trim().toLowerCase();}
  function allProducts(){try{return typeof getProducts==='function'?getProducts():JSON.parse(localStorage.getItem('nitaProducts')||'[]')}catch(e){return []}}
  function imgUrl(v){
    v=String(v||'').trim();
    if(!v || /^linear-gradient/i.test(v)) return '';
    var m=v.match(/url\((['"]?)(.*?)\1\)/i); if(m) v=m[2];
    if(/^data:image\//i.test(v)||/^https?:\/\//i.test(v)||/^assets\//i.test(v)||v.startsWith('/')) return v;
    if(/\.(png|jpe?g|webp|gif|avif)$/i.test(v)) return 'assets/products/'+v;
    return '';
  }
  function productPhotos(p){
    var arr=[];
    if(Array.isArray(p&&p.photos)) arr=arr.concat(p.photos);
    if(Array.isArray(p&&p.images)) arr=arr.concat(p.images);
    if(p&&p.img) arr.unshift(p.img);
    if(p&&p.image) arr.unshift(p.image);
    var seen={};
    return arr.map(imgUrl).filter(function(x){return x && !seen[x] && (seen[x]=1);});
  }
  function visible(p){try{return typeof nitaProductIsPublicVisible==='function'?nitaProductIsPublicVisible(p):true}catch(e){return true}}
  function matches(p,name){
    var cat=norm(p&&p.category), col=norm(p&&p.collection), home=norm(p&&(p.homeSection||p.displaySection)), text=[cat,col,home,norm(p&&p.name)].join(' ');
    if(name==='New Arrivals') return home==='new-arrivals' || /new|arrival|drop|latest/.test(text);
    if(name==='Everyday Edit') return /everyday|edit|daily|daywear/.test(text);
    if(name==='Summer Pieces') return /summer|linen|cotton|light|beach|vacation/.test(text);
    if(name==='Accessories') return /accessor|bags|bag|scarf|scarves/.test(text);
    return false;
  }
  function collectionUrl(name){
    if(name==='New Arrivals') return 'shop.html?collection=New%20Arrivals';
    if(name==='Everyday Edit') return 'shop.html?collection=Everyday%20Edit';
    if(name==='Summer Pieces') return 'shop.html?collection=Summer%20Pieces';
    if(name==='Accessories') return 'shop.html?cat=Bags';
    return 'shop.html';
  }
  function tile(product, fallbackName, index){
    var src=productPhotos(product)[0];
    var name=product&&product.name?product.name:fallbackName;
    if(src){
      return '<div class="nita-premium-collection-tile tile-'+index+'"><img src="'+esc(src)+'" alt="'+esc(name)+'" loading="lazy"><span>'+esc(name)+'</span></div>';
    }
    return '<div class="nita-premium-collection-tile tile-'+index+' empty"><img src="assets/logo-cropped.png" alt="Nita Style"><span>'+esc(fallbackName)+'</span></div>';
  }
  window.nitaRenderCollectionsPage=function(){
    var grid=document.getElementById('nitaCollectionsGrid');
    if(!grid) return;
    var ps=allProducts().filter(visible);
    var names=[
      {name:'New Arrivals',sub:'Freshly added pieces'},
      {name:'Everyday Edit',sub:'Clean daily wardrobe'},
      {name:'Summer Pieces',sub:'Light seasonal styling'},
      {name:'Accessories',sub:'Bags, scarves and finishers'}
    ];
    grid.innerHTML=names.map(function(meta){
      var items=ps.filter(function(p){return matches(p,meta.name)});
      var previews=(items.length?items:ps).slice(0,3);
      var count=items.length;
      return '<a class="nita-premium-collection-card" href="'+collectionUrl(meta.name)+'" aria-label="Open '+esc(meta.name)+'">'
        + '<div class="nita-premium-collection-media">'
        + tile(previews[0],meta.name,1)+tile(previews[1]||previews[0],meta.name,2)+tile(previews[2]||previews[0],meta.name,3)
        + '<div class="nita-premium-collection-overlay"><small>'+esc(meta.sub)+'</small><strong>'+esc(meta.name)+'</strong><em>'+count+' piece'+(count===1?'':'s')+'</em></div>'
        + '</div>'
        + '<div class="nita-premium-collection-footer"><span>Explore edit</span><b>→</b></div>'
        + '</a>';
    }).join('');
  };
  document.addEventListener('DOMContentLoaded',function(){setTimeout(function(){if(document.getElementById('nitaCollectionsGrid')) window.nitaRenderCollectionsPage();},250);});
  window.addEventListener('load',function(){setTimeout(function(){if(document.getElementById('nitaCollectionsGrid')) window.nitaRenderCollectionsPage();},600);});
})();
/* === END NITA STYLE PREMIUM COLLECTION PREVIEWS + MOBILE HEADER ALIGN FIX === */


/* === NITA STYLE MOBILE MENU MOTION + STABLE HOMEPAGE MARQUEE 20260614-1825 === */
(function(){
  window.openMobileMenu=function(){
    document.body.classList.add('mobile-menu-open');
    var drawer=document.getElementById('mobileMenuDrawer');
    if(drawer) drawer.setAttribute('aria-hidden','false');
  };
  window.closeMobileMenu=function(){
    document.body.classList.remove('mobile-menu-open');
    var drawer=document.getElementById('mobileMenuDrawer');
    if(drawer) drawer.setAttribute('aria-hidden','true');
  };
  window.toggleMobileSubmenu=function(id){
    var panel=document.getElementById(id);
    if(!panel) return;
    var open=!panel.classList.contains('open');
    panel.classList.toggle('open',open);
    var btn=document.querySelector('[data-mobile-toggle="'+id+'"]');
    if(btn){
      btn.classList.toggle('open',open);
      btn.setAttribute('aria-expanded',open?'true':'false');
      var plus=btn.querySelector('b');
      if(plus) plus.textContent=open?'+':'+';
    }
  };

  function makeStable(track){
    if(!track) return;
    var products=[].slice.call(track.children).filter(function(el){return el.classList&&el.classList.contains('product');});
    if(!products.length) return;
    track.classList.remove('nita-js-marquee','nita-premium-auto','nita-force-marquee','nita-new-arrivals-only-scroll','nita-smooth-css-marquee');
    track.classList.add('nita-ultra-stable-marquee');
    if(!track.dataset.nitaStableBase){
      track.dataset.nitaStableBase=track.innerHTML;
    }
    var base=track.dataset.nitaStableBase;
    // Rebuild only if the rendered product set changed, not on every timer, to avoid the visible refresh/jump.
    if(track.dataset.nitaLastBase!==base){
      track.innerHTML=base;
      var safety=0;
      while(track.scrollWidth < window.innerWidth*2.6 && safety<6){
        track.insertAdjacentHTML('beforeend',base);
        safety++;
      }
      if(safety===0) track.insertAdjacentHTML('beforeend',base);
      track.dataset.nitaLastBase=base;
    }
  }
  function stableHome(){
    makeStable(document.getElementById('trendingMarquee'));
    makeStable(document.getElementById('newArrivalsMarquee'));
  }
  var prev=window.renderHomeSections;
  window.renderHomeSections=function(){
    var out=prev?prev.apply(this,arguments):undefined;
    requestAnimationFrame(function(){setTimeout(stableHome,60);});
    return out;
  };
  document.addEventListener('DOMContentLoaded',function(){setTimeout(stableHome,350);setTimeout(stableHome,1200);});
  window.addEventListener('load',function(){setTimeout(stableHome,250);},{once:true});
})();
/* === END NITA STYLE MOBILE MENU MOTION + STABLE HOMEPAGE MARQUEE 20260614-1825 === */

/* === NITA STYLE COLORWAY WORKFLOW + SMOOTH MARQUEE FINAL 20260614-1815 === */
(function(){
  const COLOR_HEX={
    'Black':'#111111','White':'#ffffff','Ivory':'#f6f1e8','Cream':'#f3eadb','Beige':'#d8c4a5','Taupe':'#a79686','Grey':'#8f8f8f','Gray':'#8f8f8f','Silver':'#c9c9c9','Gold':'#c9a227','Rose Gold':'#b76e79','Bronze':'#8c5a2b','Brown':'#6b3f25','Cognac':'#a55f2a','Camel':'#c28b55','Navy':'#17243f','Dark Blue':'#0c1b3d','Blue':'#2d62b7','Denim Blue':'#496b8a','Cyan':'#24bfd3','Red':'#d51224','Burgundy':'#681421','Pink':'#e8a6b8','Green':'#16845b','Olive':'#6f7741','Khaki':'#b6a87c','Yellow':'#f0c94b','Orange':'#e87824','Purple':'#51406f','Print / Pattern':'linear-gradient(135deg,#111 0 20%,#fff 20% 40%,#999 40% 60%,#ddd 60% 80%,#111 80%)','Multi-color':'linear-gradient(135deg,#e33,#f6c343,#34a853,#4285f4,#8e44ad)'};
  const COLORWAY_OPTIONS=['Black','White','Ivory','Cream','Beige','Taupe','Grey','Silver','Gold','Rose Gold','Bronze','Brown','Cognac','Camel','Navy','Dark Blue','Blue','Denim Blue','Cyan','Red','Burgundy','Pink','Green','Olive','Khaki','Yellow','Orange','Purple','Print / Pattern','Multi-color'];
  window.NITA_COLOR_OPTIONS = COLORWAY_OPTIONS;
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function safe(v){return String(v==null?'':v).replace(/'/g,"\\'");}
  function money(v){try{return '$'+Number(v||0).toFixed(2)}catch(e){return '$0.00'}}
  function read(k,f){try{const raw=localStorage.getItem(k);return raw?JSON.parse(raw):f}catch(e){return f}}
  function write(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
  function products(){try{return typeof getProducts==='function'?getProducts():read('nitaProducts',[])}catch(e){return read('nitaProducts',[])}}
  function normalizePath(src){
    src=String(src||'').trim(); if(!src) return '';
    if(/^data:image\//i.test(src)||/^https?:\/\//i.test(src)||src.startsWith('/')) return src;
    if(/^assets\/products\//i.test(src)) return '/' + src.replace(/^\/+/, '');
    if(/^assets\//i.test(src)) return '/' + src.replace(/^\/+/, '');
    if(/\.(png|jpe?g|webp|gif|avif)$/i.test(src)) return '/assets/products/' + src.replace(/^\/+/, '');
    return src;
  }
  function lines(v){return String(v||'').split(/\n|,/).map(s=>normalizePath(s)).filter(Boolean);}
  function colorHex(c){return COLOR_HEX[c]||'#ddd';}
  function swatch(c,extra){return '<span class="nita-color-swatch '+(extra||'')+'" title="'+esc(c)+'" style="--swatch:'+esc(colorHex(c))+'"></span>';}
  function colorways(p){
    if(p && Array.isArray(p.colorways) && p.colorways.length){return p.colorways.map(cw=>({color:cw.color||'Color',photos:(cw.photos||[]).map(normalizePath).filter(Boolean)}));}
    const c=(p&&p.color)||(p&&p.colour)||String((p&&p.note)||'').split(' · ')[0]||'Black';
    let photos=[]; if(p&&Array.isArray(p.photos)) photos=photos.concat(p.photos); if(p&&p.img) photos.unshift(p.img);
    photos=photos.map(normalizePath).filter(Boolean);
    return [{color:c,photos:photos}];
  }
  function photosFor(p){
    const cws=colorways(p); const sel=window.nitaSelectedColorway || (p&&p.selectedColorway) || (cws[0]&&cws[0].color);
    const cw=cws.find(x=>String(x.color).toLowerCase()===String(sel).toLowerCase())||cws[0]||{photos:[]};
    return (cw.photos&&cw.photos.length?cw.photos:[]);
  }
  function firstPhoto(p){return (photosFor(p)[0] || (p&&Array.isArray(p.photos)&&p.photos[0]) || p?.img || '').toString();}
  window.nitaProductColorways=colorways;
  window.nitaColorwaySwatch=function(c){return swatch(c)};

  function selectedColorwayNames(){
    let arr=[].slice.call(document.querySelectorAll('.nita-colorway-pill.on')).map(b=>b.dataset.color).filter(Boolean);
    const base=document.getElementById('pcolor')?.value; if(!arr.length && base) arr=[base];
    return Array.from(new Set(arr));
  }
  window.nitaToggleColorway=function(btn){
    if(!btn) return;
    btn.classList.toggle('on');
    const chosen=selectedColorwayNames();
    if(!chosen.length){btn.classList.add('on');}
    renderColorwayPanels();
  };
  window.nitaUseSingleColorway=function(color){
    window.nitaSelectedColorway=color;
    const p=window.nitaCurrentProductForDetail; if(!p)return;
    const cws=colorways(p); const cw=cws.find(x=>String(x.color)===String(color))||cws[0];
    const ph=(cw&&cw.photos||[]).map(normalizePath).filter(Boolean);
    window.nitaCurrentPhotos=ph; window.selectedPhoto=0;
    const main=document.querySelector('.nita-detail-real-img'); if(main&&ph[0]) main.src=ph[0];
    const thumbs=document.querySelector('.product-thumbs');
    if(thumbs){thumbs.innerHTML=ph.map((src,i)=>'<button type="button" class="'+(i===0?'active':'')+'" onclick="nitaSetDetailPhoto('+i+')"><img class="nita-thumb-real-img" src="'+esc(src)+'" alt="'+esc((p.name||'Product')+' photo '+(i+1))+'"></button>').join('');}
    document.querySelectorAll('.nita-detail-color-btn').forEach(b=>b.classList.toggle('active',b.dataset.color===color));
  };
  function renderColorwayPanels(){
    const box=document.getElementById('nitaColorwayPhotoPanels'); if(!box)return;
    const selected=selectedColorwayNames();
    box.innerHTML=selected.map(c=>'<div class="nita-colorway-photo-panel" data-color="'+esc(c)+'"><div class="nita-colorway-panel-head">'+swatch(c)+'<b>'+esc(c)+' photos</b></div><p class="muted">Write original image file names for this color, one per line. Example: red-bag-1.jpg</p><textarea class="field nita-colorway-paths" data-color="'+esc(c)+'" rows="3" placeholder="'+esc(c.toLowerCase().replace(/\s+/g,'-'))+'-1.jpg\n'+esc(c.toLowerCase().replace(/\s+/g,'-'))+'-2.jpg"></textarea><input type="file" accept="image/*" multiple class="nita-colorway-file" data-color="'+esc(c)+'"><div class="nita-colorway-preview"></div></div>').join('');
  }
  function ensureColorwayAdminUI(){
    const form=document.querySelector('.admin-add-product-form'); if(!form || form.querySelector('.nita-colorway-admin-box')) return;
    const colorField=document.getElementById('pcolor')?.closest('div');
    const html='<div class="full nita-colorway-admin-box"><label>Available colorways</label><p class="field-help">Choose one or multiple colorways. If you choose multiple, add photos for each color below.</p><div class="nita-colorway-pill-grid">'+COLORWAY_OPTIONS.map((c,i)=>'<button type="button" class="nita-colorway-pill '+(i===0?'on':'')+'" data-color="'+esc(c)+'" onclick="nitaToggleColorway(this)">'+swatch(c)+'<span>'+esc(c)+'</span></button>').join('')+'</div><div id="nitaColorwayPhotoPanels" class="nita-colorway-photo-panels"></div></div>';
    if(colorField) colorField.insertAdjacentHTML('afterend',html); else form.insertAdjacentHTML('afterbegin',html);
    renderColorwayPanels();
  }
  document.addEventListener('change',function(e){
    const input=e.target&&e.target.closest&&e.target.closest('.nita-colorway-file'); if(!input) return;
    const panel=input.closest('.nita-colorway-photo-panel'); const prev=panel&&panel.querySelector('.nita-colorway-preview');
    const files=[].slice.call(input.files||[]); if(!files.length)return;
    Promise.all(files.map(f=>new Promise(res=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>res('');r.readAsDataURL(f);}))).then(urls=>{
      input._nitaFiles=(input._nitaFiles||[]).concat(urls.filter(Boolean));
      if(prev) prev.innerHTML=input._nitaFiles.map(u=>'<img src="'+esc(u)+'" alt="Colorway preview">').join('');
      input.value='';
    });
  });
  function getColorwayData(){
    return selectedColorwayNames().map(c=>{
      const panel=document.querySelector('.nita-colorway-photo-panel[data-color="'+CSS.escape(c)+'"]');
      let ph=[]; if(panel){ ph=ph.concat(lines(panel.querySelector('.nita-colorway-paths')?.value||'')); const inp=panel.querySelector('.nita-colorway-file'); if(inp&&Array.isArray(inp._nitaFiles)) ph=ph.concat(inp._nitaFiles); }
      return {color:c,photos:Array.from(new Set(ph))};
    }).filter(cw=>cw.color);
  }
  async function saveProductsCloud(next){
    write('nitaProducts',next);
    try{localStorage.removeItem('nitaStoreSessionCache');localStorage.removeItem('nitaStoreCache');}catch(e){}
    try{
      if(typeof window.nitaSaveKeyStrict==='function') await window.nitaSaveKeyStrict('nitaProducts',next);
      else if(typeof window.saveProducts==='function') await window.saveProducts(next);
      else await fetch('/.netlify/functions/store',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:'nitaProducts',value:next})});
    }catch(e){console.warn('Cloud save failed, local copy kept.',e); if(typeof toast==='function') toast('Product saved locally, but global save may need Netlify check.'); return false;}
    return true;
  }
  window.addProductAdmin=async function(){
    const name=String(document.getElementById('pname')?.value||'').trim(); const price=Number(document.getElementById('pprice')?.value||0);
    if(!name){toast?.('Please enter a product name.');return false;} if(!price){toast?.('Please enter a valid price.');return false;}
    let cws=getColorwayData();
    let basePaths=[]; try{basePaths=lines(document.getElementById('pPhotoPaths')?.value||'')}catch(e){}
    const pending=Array.isArray(window.pendingAdminPhotos)?window.pendingAdminPhotos.filter(Boolean):[];
    if(cws.length===1 && !cws[0].photos.length) cws[0].photos=basePaths.length?basePaths:pending;
    if(!cws.length) cws=[{color:document.getElementById('pcolor')?.value||'Black',photos:basePaths.length?basePaths:pending}];
    const mainCw=cws.find(cw=>cw.photos.length)||cws[0]; const mainPhotos=(mainCw.photos||[]).filter(Boolean);
    const selectedSizes=[].slice.call(document.querySelectorAll('#sizePicker .pill.on,#sizePicker .pill.active')).map(x=>x.textContent.trim()).filter(Boolean);
    const out=[].slice.call(document.querySelectorAll('#sizeOutPicker .pill.on,#sizeOutPicker .pill.active')).map(x=>x.textContent.trim()).filter(Boolean);
    const saleRaw=String(document.getElementById('psale')?.value||'').trim(); const section=document.getElementById('phome')?.value||'trending-now';
    const qtyRaw=document.getElementById('pquantity')?.value; const qty=qtyRaw===''?'':Math.max(0,Number(qtyRaw||0));
    const p={id:'p'+Date.now(),name,price,salePrice:saleRaw===''?'':Number(saleRaw),status:document.getElementById('pstatus')?.value||'in-stock',category:document.getElementById('pcat')?.value||'Tops',collection:document.getElementById('pcollection')?.value||'Everyday Edit',displaySection:section,homeSection:section,color:mainCw.color,material:document.getElementById('pmaterial')?.value||document.querySelector('#pmaterial,.edit-material')?.value||'',note:(mainCw.color||'Black')+' · '+(document.getElementById('pstyle')?.value||'Clean everyday piece'),sizes:selectedSizes.length?selectedSizes:['One Size'],outOfStockSizes:out,quantity:qty,initialQuantity:qty,colorways:cws,photos:mainPhotos,img:mainPhotos[0]||'linear-gradient(135deg,#fff,#ddd)',mainPhotoIndex:0,desc:String(document.getElementById('pdesc')?.value||'').trim()||'A carefully selected piece for a clean, feminine wardrobe.'};
    try{if(typeof normalizeProductStatus==='function') Object.assign(p,normalizeProductStatus(p));}catch(e){}
    const next=products().filter(x=>String(x.id)!==String(p.id)); next.push(p);
    toast?.('Saving product globally...'); const ok=await saveProductsCloud(next);
    if(ok) toast?.('Product added to the website.');
    try{window.pendingAdminPhotos=[]; window.pendingAdminMainIndex=0; ['pname','pprice','psale','pdesc','pquantity','pPhotoPaths'].forEach(id=>{const el=document.getElementById(id); if(el)el.value='';}); document.querySelectorAll('.nita-colorway-paths').forEach(t=>t.value=''); document.querySelectorAll('.nita-colorway-preview').forEach(p=>p.innerHTML=''); renderAdmin?.();}catch(e){}
    return ok;
  };

  const oldCard=window.productCard;
  window.productCard=function(p){
    p=p||{}; const cws=colorways(p); const first=firstPhoto(p); const second=(photosFor(p)[1]||first); const hasSale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price);
    const price=hasSale?'<p><span class="muted old-price">'+money(p.price)+'</span><span class="price-drop">'+money(p.salePrice)+'</span></p>':'<p>'+money(p.price)+'</p>';
    const status=(typeof stockStatusHtml==='function'?stockStatusHtml(p.status||'in-stock'):'');
    const colorInfo=cws.length>1?'<div class="nita-card-colorways">'+swatch(cws[0].color)+'<span>+'+(cws.length-1)+' colour'+(cws.length-1===1?'':'s')+'</span></div>':(cws.length===1?'<div class="nita-card-colorways single">'+swatch(cws[0].color)+'</div>':'');
    return '<article class="product nita-visible-product-card"><a class="product-hit" href="product.html?id='+encodeURIComponent(p.id||'')+'"><div class="product-img nita-card-img-wrap"><img class="nita-card-img primary" src="'+esc(first)+'" alt="'+esc(p.name||'Product')+'" loading="lazy" decoding="async">'+(second&&second!==first?'<img class="nita-card-img secondary" src="'+esc(second)+'" alt="'+esc((p.name||'Product')+' alternate')+'" loading="lazy" decoding="async">':'')+(hasSale?'<span class="sale-badge">PRICE DROP</span>':'')+'</div><h3>'+esc(p.name||'Product')+'</h3>'+price+colorInfo+'<div class="card-status">'+status+'</div></a><button class="quick-view-btn" type="button" onclick="event.stopPropagation();event.preventDefault();openQuickView&&openQuickView(\''+safe(p.id||'')+'\')">QUICK VIEW</button></article>';
  };
  const oldProductPage=window.productPage;
  window.productPage=function(){
    const detail=document.getElementById('detail'); if(!detail) return oldProductPage&&oldProductPage();
    const id=new URL(location.href).searchParams.get('id'); const p=products().find(x=>String(x.id)===String(id))||products()[0]; if(!p) return oldProductPage&&oldProductPage();
    window.nitaCurrentProductForDetail=p; window.nitaSelectedColorway=(colorways(p)[0]||{}).color; if(oldProductPage) oldProductPage();
    const info=document.querySelector('.product-info,.nita-premium-product-info'); if(info && colorways(p).length){
      const existing=info.querySelector('.nita-detail-colorways'); if(existing) existing.remove();
      const html='<div class="nita-detail-colorways"><p>Colour</p><div>'+colorways(p).map((cw,i)=>'<button type="button" aria-label="'+esc(cw.color)+'" title="'+esc(cw.color)+'" class="nita-detail-color-btn '+(i===0?'active':'')+'" data-color="'+esc(cw.color)+'" onclick="nitaUseSingleColorway(\''+safe(cw.color)+'\')">'+swatch(cw.color)+'</button>').join('')+'</div></div>';
      const sizeBlock=info.querySelector('.sizes,.product-size-list'); if(sizeBlock) sizeBlock.insertAdjacentHTML('beforebegin',html); else info.insertAdjacentHTML('beforeend',html);
    }
    setTimeout(()=>window.nitaUseSingleColorway(window.nitaSelectedColorway),30);
  };
  const oldAdd=window.addToCart;
  window.addToCart=function(id,size){
    const p=products().find(x=>String(x.id)===String(id));
    const color=(window.nitaSelectedColorway || (colorways(p)[0]||{}).color || '');
    const cart=read('nitaCart',[]); const keyColor=String(color||'');
    const existing=cart.find(i=>String(i.id)===String(id)&&String(i.size||'One Size')===String(size||'One Size')&&String(i.color||'')===keyColor);
    if(existing){existing.qty=Number(existing.qty||1)+1;} else {cart.push({id:id,size:size||'One Size',color:keyColor,qty:1,name:p?.name,price:Number(p?.salePrice||p?.price||0),photo:firstPhoto(p)});}
    write('nitaCart',cart); try{window.cart=cart; saveCart?.(); renderCartPanel?.(); updateCartCount?.(); toast?.('Added to cart');}catch(e){}
  };

  function smoothHomeRows(){
    ['trendingMarquee','newArrivalsMarquee'].forEach(id=>{
      const track=document.getElementById(id); if(!track) return;
      track.classList.add('nita-smooth-auto-marquee');
      if(!track.dataset.nitaOriginalHtml) track.dataset.nitaOriginalHtml=track.innerHTML;
      const base=track.dataset.nitaOriginalHtml;
      if(track.children.length && !track.dataset.nitaSmoothReady){
        track.innerHTML=base+base+base;
        track.dataset.nitaSmoothReady='1';
      }
    });
  }
  const prevHome=window.renderHomeSections;
  window.renderHomeSections=function(){const r=prevHome?prevHome.apply(this,arguments):undefined;setTimeout(smoothHomeRows,80);return r;};
  document.addEventListener('DOMContentLoaded',()=>{setTimeout(ensureColorwayAdminUI,400);setTimeout(smoothHomeRows,600);});
  window.addEventListener('load',()=>{setTimeout(ensureColorwayAdminUI,500);setTimeout(smoothHomeRows,700);});
})();
/* === END NITA STYLE COLORWAY WORKFLOW + SMOOTH MARQUEE FINAL 20260614-1815 === */

/* === NITA STYLE COLORWAYS VISIBLE IN ADMIN FORM FIX 20260614-2045 ===
   Makes the Available colorways section appear reliably in Add Product, even after admin page rerenders. */
(function(){
  const COLORS = window.NITA_COLOR_OPTIONS || ['Black','White','Ivory','Cream','Beige','Taupe','Grey','Silver','Gold','Rose Gold','Bronze','Brown','Cognac','Camel','Navy','Dark Blue','Blue','Denim Blue','Cyan','Red','Burgundy','Pink','Green','Olive','Khaki','Yellow','Orange','Purple','Print / Pattern','Multi-color'];
  function esc(v){return String(v||'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function swatch(c){
    const map={'Black':'#111','White':'#fff','Ivory':'#f8f4e8','Cream':'#f2ead7','Beige':'#d6c1a6','Taupe':'#9b8b7a','Grey':'#777','Silver':'#c9c9c9','Gold':'#d4af37','Rose Gold':'#b76e79','Bronze':'#8c6239','Brown':'#6b3f25','Cognac':'#9a5a25','Camel':'#c19a6b','Navy':'#111a3a','Dark Blue':'#0c2250','Blue':'#2f6fbd','Denim Blue':'#496f9e','Cyan':'#00bcd4','Red':'#e00022','Burgundy':'#6d001a','Pink':'#f2a0b9','Green':'#168a52','Olive':'#6b7d33','Khaki':'#b6aa7c','Yellow':'#f0d332','Orange':'#f47b20','Purple':'#5a3b82','Print / Pattern':'linear-gradient(45deg,#111 25%,#fff 25%,#fff 50%,#111 50%,#111 75%,#fff 75%)','Multi-color':'linear-gradient(90deg,#e00,#fc0,#0a6,#06c,#70c)'};
    return '<span class="nita-swatch" style="background:'+esc(map[c]||'#ddd')+'"></span>';
  }
  function selectedColors(){
    return Array.from(document.querySelectorAll('.nita-colorway-pill.on')).map(b=>b.dataset.color).filter(Boolean);
  }
  function normaliseFileName(v){
    v=String(v||'').trim(); if(!v) return '';
    if(/^https?:\/\//i.test(v) || v.startsWith('/')) return v;
    if(v.startsWith('assets/products/')) return '/' + v;
    return '/assets/products/' + v.replace(/^\/+/, '');
  }
  function renderPanels(){
    const box=document.getElementById('nitaColorwayPhotoPanels'); if(!box) return;
    const colors=selectedColors();
    box.innerHTML = colors.map(c=>`<div class="nita-colorway-photo-panel" data-color="${esc(c)}">
      <div class="nita-colorway-panel-head">${swatch(c)}<b>${esc(c)} photos</b></div>
      <p class="field-help">Write photo file names for ${esc(c)}, one per line. Example: ${esc(c.toLowerCase().replace(/\s+/g,'-'))}-1.jpg</p>
      <textarea class="field nita-colorway-paths" data-color="${esc(c)}" rows="3" placeholder="${esc(c.toLowerCase().replace(/\s+/g,'-'))}-1.jpg\n${esc(c.toLowerCase().replace(/\s+/g,'-'))}-2.jpg"></textarea>
      <button type="button" class="btn light nita-colorway-preview-btn">PREVIEW ${esc(c)} PHOTOS</button>
      <div class="nita-colorway-preview"></div>
    </div>`).join('');
  }
  function html(){
    return `<div class="full nita-colorway-admin-box">
      <label>Available colorways</label>
      <p class="field-help">Choose one or multiple colorways for this product. If you choose more than one, photo boxes appear for each color.</p>
      <div class="nita-colorway-pill-grid">${COLORS.map((c,i)=>`<button type="button" class="nita-colorway-pill ${i===0?'on':''}" data-color="${esc(c)}">${swatch(c)}<span>${esc(c)}</span></button>`).join('')}</div>
      <div id="nitaColorwayPhotoPanels" class="nita-colorway-photo-panels"></div>
    </div>`;
  }
  function ensureVisibleColorways(){
    const form=document.querySelector('.admin-add-product-form');
    if(!form || form.querySelector('.nita-colorway-admin-box')) return;
    const assetBox=document.querySelector('.nita-asset-photo-box') || Array.from(form.children).find(el=>String(el.textContent||'').toLowerCase().includes('original image file names'));
    if(assetBox) assetBox.insertAdjacentHTML('afterend', html());
    else {
      const firstFull=form.querySelector('.full');
      if(firstFull) firstFull.insertAdjacentHTML('afterend', html()); else form.insertAdjacentHTML('afterbegin', html());
    }
    renderPanels();
  }
  window.nitaEnsureVisibleColorways = ensureVisibleColorways;
  window.nitaGetAdminColorways = function(){
    const selected=selectedColors();
    return selected.map(c=>{
      const panel=document.querySelector('.nita-colorway-photo-panel[data-color="'+(window.CSS&&CSS.escape?CSS.escape(c):c.replace(/"/g,'\\"'))+'"]');
      const text=panel?.querySelector('.nita-colorway-paths')?.value || '';
      const photos=text.split(/\n+/).map(normaliseFileName).filter(Boolean);
      return { color:c, photos };
    }).filter(cw=>cw.color);
  };
  document.addEventListener('click',function(e){
    const pill=e.target.closest && e.target.closest('.nita-colorway-pill');
    if(pill){
      pill.classList.toggle('on');
      if(!document.querySelector('.nita-colorway-pill.on')) pill.classList.add('on');
      renderPanels();
      return;
    }
    const prevBtn=e.target.closest && e.target.closest('.nita-colorway-preview-btn');
    if(prevBtn){
      const panel=prevBtn.closest('.nita-colorway-photo-panel');
      const preview=panel?.querySelector('.nita-colorway-preview');
      const files=(panel?.querySelector('.nita-colorway-paths')?.value||'').split(/\n+/).map(normaliseFileName).filter(Boolean);
      if(preview){ preview.innerHTML = files.length ? files.map(src=>`<img src="${esc(src)}" alt="Color preview" onerror="this.closest('.nita-colorway-preview').insertAdjacentHTML('beforeend','<p class=&quot;field-error&quot;>Photo not found: ${esc(src)}</p>'); this.remove();">`).join('') : '<p class="muted">No file names written yet.</p>'; }
    }
  });
  const oldShow=window.showAdminSection;
  if(typeof oldShow==='function') window.showAdminSection=function(){ const r=oldShow.apply(this,arguments); setTimeout(ensureVisibleColorways,60); setTimeout(ensureVisibleColorways,350); return r; };
  const oldRender=window.renderAdmin;
  if(typeof oldRender==='function') window.renderAdmin=async function(){ const r=await oldRender.apply(this,arguments); setTimeout(ensureVisibleColorways,80); setTimeout(ensureVisibleColorways,400); return r; };
  document.addEventListener('DOMContentLoaded',()=>{ setTimeout(ensureVisibleColorways,250); setTimeout(ensureVisibleColorways,900); });
  window.addEventListener('load',()=>{ setTimeout(ensureVisibleColorways,300); setTimeout(ensureVisibleColorways,1000); });
  try{ new MutationObserver(()=>ensureVisibleColorways()).observe(document.documentElement,{childList:true,subtree:true}); }catch(e){}
})();
/* === END NITA STYLE COLORWAYS VISIBLE IN ADMIN FORM FIX === */


/* === NITA COLORWAY POLISH FIX 20260614-2105 ===
   Keep admin buttons readable, show clear swatches, and display product-page color choices as swatches only. */
(function(){
  function cleanDetailColorButtons(){
    document.querySelectorAll('.nita-detail-color-btn').forEach(function(btn){
      const color = btn.getAttribute('data-color') || btn.getAttribute('title') || 'Colour';
      btn.setAttribute('aria-label', color);
      btn.setAttribute('title', color);
      btn.querySelectorAll('span:not(.nita-color-swatch):not(.nita-swatch)').forEach(function(label){ label.remove(); });
    });
  }
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(cleanDetailColorButtons, 300); });
  document.addEventListener('click', function(){ setTimeout(cleanDetailColorButtons, 80); }, true);
  const oldUse = window.nitaUseSingleColorway;
  if(typeof oldUse === 'function'){
    window.nitaUseSingleColorway = function(){
      const r = oldUse.apply(this, arguments);
      setTimeout(cleanDetailColorButtons, 20);
      return r;
    };
  }
})();
/* === END NITA COLORWAY POLISH FIX 20260614-2105 === */

/* === NITA STYLE ADMIN IMAGE PREVIEW CACHE FIX 20260614-2128 ===
   Direct asset links are correct, so the bug is Safari/admin preview caching thumbnails.
   This only cache-busts the admin preview images. Saved product paths stay clean.
*/
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]});}
  function normalizeAsset(v){
    v=String(v||'').trim();
    if(!v) return '';
    if(/^data:image\//i.test(v) || /^https?:\/\//i.test(v) || v.startsWith('/')) return v;
    if(/^assets\/products\//i.test(v)) return '/' + v.replace(/^\/+/, '');
    if(/^assets\//i.test(v)) return '/' + v.replace(/^\/+/, '');
    return '/assets/products/' + v.replace(/^\/+/, '');
  }
  function cleanLines(v){return String(v||'').split(/\n|,/).map(function(s){return normalizeAsset(s)}).filter(Boolean);}
  function unique(arr){var out=[],seen={};(arr||[]).forEach(function(x){x=String(x||'').trim();if(x&&!seen[x]){seen[x]=1;out.push(x)}});return out;}
  function previewSrc(path,index){
    if(/^data:image\//i.test(path)) return path;
    var joiner = path.indexOf('?') === -1 ? '?' : '&';
    return path + joiner + 'nitaPreview=' + Date.now() + '-' + index;
  }
  function renderPreview(box,photos){
    photos=unique(photos);
    box.innerHTML=photos.map(function(u,i){
      return '<div class="admin-thumb photo-order-thumb asset-path-thumb">'
        + '<img src="'+esc(previewSrc(u,i))+'" data-original-src="'+esc(u)+'" alt="Product photo '+(i+1)+'" loading="eager" decoding="sync" onerror="this.closest(\'.admin-thumb\').classList.add(\'missing-asset\')">'
        + '<span>'+(i===0?'Photo 1':'Photo '+(i+1))+'</span>'
        + '<small>'+esc(u)+'</small>'
        + '<div class="photo-order-controls">'
        + '<button type="button" onclick="movePendingPhoto&&movePendingPhoto('+i+',-1)" '+(i===0?'disabled':'')+'>←</button>'
        + '<button type="button" onclick="movePendingPhoto&&movePendingPhoto('+i+',1)" '+(i===photos.length-1?'disabled':'')+'>→</button>'
        + '<button type="button" onclick="removePendingPhoto&&removePendingPhoto('+i+')">×</button>'
        + '</div></div>';
    }).join('');
  }
  window.previewAssetProductPhotos=function(){
    var input=document.getElementById('pPhotoPaths');
    var box=document.getElementById('photoPreview');
    var paths=cleanLines(input&&input.value);
    if(!paths.length){try{typeof msg==='function'?msg('Write at least one image file name first.',false):alert('Write at least one image file name first.')}catch(e){} return;}
    window.pendingAdminPhotos=unique(paths);
    window.pendingPhotos=window.pendingAdminPhotos;
    window.pendingAdminMainIndex=0;
    if(box) renderPreview(box, window.pendingAdminPhotos);
    try{typeof msg==='function'?msg('Preview refreshed with the latest original files.',true):(typeof toast==='function'&&toast('Preview refreshed.'))}catch(e){}
  };
  document.addEventListener('click',function(e){
    var prevBtn=e.target.closest&&e.target.closest('.nita-colorway-preview-btn');
    if(!prevBtn) return;
    var panel=prevBtn.closest('.nita-colorway-photo-panel');
    var preview=panel&&panel.querySelector('.nita-colorway-preview');
    var files=cleanLines(panel&&panel.querySelector('.nita-colorway-paths')&&panel.querySelector('.nita-colorway-paths').value);
    if(preview){
      preview.innerHTML=files.length?files.map(function(src,i){return '<img src="'+esc(previewSrc(src,i))+'" data-original-src="'+esc(src)+'" alt="Color preview '+(i+1)+'" onerror="this.closest(\'.nita-colorway-preview\').insertAdjacentHTML(\'beforeend\',\'<p class=&quot;field-error&quot;>Photo not found: '+esc(src)+'<\/p>\'); this.remove();">';}).join(''):'<p class="muted">No file names written yet.</p>';
    }
  },true);
})();
/* === END NITA STYLE ADMIN IMAGE PREVIEW CACHE FIX === */

/* === NITA FINAL: COLORWAY PHOTO INDEX + ADMIN PREVIEW NO-CACHE 20260614-2135 ===
   Fixes: keep same photo index when switching product colorways and force admin previews to show the real image for each filename. */
(function(){
  function esc(s){return String(s==null?'':s).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c];});}
  function normalizeProductAssetPath(value){
    var s=String(value||'').trim();
    if(!s) return '';
    if(/^data:image\//i.test(s) || /^https?:\/\//i.test(s) || s.indexOf('/')===0) return s;
    if(s.indexOf('assets/products/')===0) return '/' + s;
    return '/assets/products/' + s;
  }
  function noCacheSrc(src){
    if(!src || /^data:image\//i.test(src) || /^https?:\/\//i.test(src)) return src;
    return src + (src.indexOf('?')>-1?'&':'?') + 'v=' + Date.now() + '-' + Math.floor(Math.random()*99999);
  }
  window.nitaNormalizeProductAssetPath = normalizeProductAssetPath;
  window.nitaNoCacheSrc = noCacheSrc;

  function getColorways(product){
    if(window.nitaProductColorways) return window.nitaProductColorways(product)||[];
    if(product && Array.isArray(product.colorways)) return product.colorways;
    return [];
  }
  function photosForColorway(cw){
    return ((cw&&cw.photos)||[]).map(normalizeProductAssetPath).filter(Boolean);
  }

  const previousUseColorway = window.nitaUseSingleColorway;
  window.nitaUseSingleColorway = function(color){
    var currentIndex = Math.max(0, Number(window.selectedPhoto || 0));
    var product = window.nitaCurrentProductForDetail;
    if(!product && typeof products==='function'){
      var id = new URL(location.href).searchParams.get('id');
      product = products().find(function(p){return String(p.id)===String(id);}) || products()[0];
    }
    if(!product){ if(typeof previousUseColorway==='function') return previousUseColorway(color); return; }
    var cws = getColorways(product);
    var cw = cws.find(function(x){return String(x.color)===String(color);}) || cws[0];
    var photos = photosForColorway(cw);
    if(!photos.length && typeof previousUseColorway==='function') return previousUseColorway(color);
    var nextIndex = Math.min(currentIndex, Math.max(photos.length-1, 0));
    window.nitaSelectedColorway = color;
    window.nitaCurrentPhotos = photos;
    window.selectedPhoto = nextIndex;

    var main = document.querySelector('.nita-detail-real-img');
    if(main && photos[nextIndex]) main.src = photos[nextIndex];

    var thumbs = document.querySelector('.product-thumbs');
    if(thumbs){
      thumbs.innerHTML = photos.map(function(src,i){
        return '<button type="button" class="'+(i===nextIndex?'active':'')+'" onclick="nitaSetDetailPhoto('+i+')"><img class="nita-thumb-real-img" src="'+esc(src)+'" alt="Product photo '+(i+1)+'"></button>';
      }).join('');
    }
    document.querySelectorAll('.nita-detail-color-btn').forEach(function(btn){
      btn.classList.toggle('active', String(btn.dataset.color)===String(color));
    });
  };

  document.addEventListener('click', function(e){
    var btn = e.target.closest && e.target.closest('#previewPhotoPaths,.nita-colorway-preview-btn');
    if(!btn) return;
    setTimeout(function(){
      document.querySelectorAll('.photo-preview-card img, .nita-colorway-preview img, .admin-photo-preview img').forEach(function(img){
        var src = img.getAttribute('src') || '';
        if(src && !/^data:image\//i.test(src)) img.setAttribute('src', noCacheSrc(src.replace(/[?&]v=[^&]+/g,'')));
      });
    }, 80);
  }, true);
})();
/* === END NITA FINAL: COLORWAY PHOTO INDEX + ADMIN PREVIEW NO-CACHE === */

/* === NITA FINAL STABILITY: ADMIN PHOTO ORDER + MOBILE FILTER SELECT CLEAN 20260614-2148 === */
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function normalizeAsset(v){
    v=String(v||'').trim();
    if(!v) return '';
    if(/^data:image\//i.test(v) || /^https?:\/\//i.test(v) || v.startsWith('/')) return v;
    if(/^assets\//i.test(v)) return '/' + v.replace(/^\/+/, '');
    return '/assets/products/' + v.replace(/^\/+/, '');
  }
  function cleanLines(v){return String(v||'').split(/\n|,/).map(normalizeAsset).filter(Boolean)}
  function stripAsset(path){
    path=String(path||'').trim();
    return path.replace(/^\/assets\/products\//,'').replace(/^assets\/products\//,'');
  }
  function unique(arr){var out=[],seen={};(arr||[]).forEach(function(x){x=normalizeAsset(x);if(x&&!seen[x]){seen[x]=1;out.push(x)}});return out;}
  function cacheBust(src,i){
    if(!src || /^data:image\//i.test(src)) return src;
    var base=src.replace(/([?&])(nitaPreview|v|cache)=[^&]*/g,'').replace(/[?&]$/,'');
    return base + (base.indexOf('?')>-1?'&':'?') + 'nitaPreview=' + Date.now() + '-' + i + '-' + Math.floor(Math.random()*9999);
  }
  function syncTextarea(photos){
    var ta=document.getElementById('pPhotoPaths');
    if(ta) ta.value=(photos||[]).map(stripAsset).join('\n');
  }
  function renderOriginalPhotoPreview(photos){
    var box=document.getElementById('photoPreview'); if(!box) return;
    photos=unique(photos||window.pendingAdminPhotos||[]);
    window.pendingAdminPhotos=photos; window.pendingPhotos=photos;
    box.innerHTML=photos.length?photos.map(function(src,i){
      return '<div class="admin-thumb photo-order-thumb asset-path-thumb" data-index="'+i+'">'
        + '<img src="'+esc(cacheBust(src,i))+'" data-clean-src="'+esc(src)+'" alt="Product photo '+(i+1)+'" loading="eager" decoding="sync" onload="this.closest(\'.admin-thumb\').classList.remove(\'missing-asset\')" onerror="this.closest(\'.admin-thumb\').classList.add(\'missing-asset\')">'
        + '<span>'+(i===0?'Photo 1':'Photo '+(i+1))+'</span>'
        + '<small>'+esc(src)+'</small>'
        + '<div class="photo-order-controls">'
        + '<button type="button" aria-label="Move photo left" onclick="movePendingPhoto('+i+',-1)" '+(i===0?'disabled':'')+'>←</button>'
        + '<button type="button" aria-label="Move photo right" onclick="movePendingPhoto('+i+',1)" '+(i===photos.length-1?'disabled':'')+'>→</button>'
        + '<button type="button" aria-label="Remove photo" onclick="removePendingPhoto('+i+')">×</button>'
        + '</div></div>';
    }).join(''):'<p class="muted">No photos previewed yet.</p>';
  }
  window.previewAssetProductPhotos=function(){
    var ta=document.getElementById('pPhotoPaths');
    var photos=unique(cleanLines(ta&&ta.value));
    if(!photos.length){try{toast&&toast('Write at least one image file name first.')}catch(e){} return;}
    window.pendingAdminPhotos=photos; window.pendingPhotos=photos; window.pendingAdminMainIndex=0;
    renderOriginalPhotoPreview(photos);
  };
  window.movePendingPhoto=function(index,direction){
    var photos=unique(window.pendingAdminPhotos&&window.pendingAdminPhotos.length?window.pendingAdminPhotos:cleanLines(document.getElementById('pPhotoPaths')&&document.getElementById('pPhotoPaths').value));
    index=Number(index); direction=Number(direction); var next=index+direction;
    if(next<0||next>=photos.length) return;
    var tmp=photos[index]; photos[index]=photos[next]; photos[next]=tmp;
    window.pendingAdminPhotos=photos; window.pendingPhotos=photos; window.pendingAdminMainIndex=0;
    syncTextarea(photos); renderOriginalPhotoPreview(photos);
  };
  window.removePendingPhoto=function(index){
    var photos=unique(window.pendingAdminPhotos&&window.pendingAdminPhotos.length?window.pendingAdminPhotos:cleanLines(document.getElementById('pPhotoPaths')&&document.getElementById('pPhotoPaths').value));
    photos.splice(Number(index),1);
    window.pendingAdminPhotos=photos; window.pendingPhotos=photos; window.pendingAdminMainIndex=0;
    syncTextarea(photos); renderOriginalPhotoPreview(photos);
  };
  document.addEventListener('change',function(e){
    if(e.target && e.target.id==='pPhotoPaths'){
      window.pendingAdminPhotos=unique(cleanLines(e.target.value)); window.pendingPhotos=window.pendingAdminPhotos;
    }
  },true);
})();
/* === END NITA FINAL STABILITY: ADMIN PHOTO ORDER + MOBILE FILTER SELECT CLEAN === */

/* === NITA FINAL CLEAN: ROCK-SOLID ADMIN PRODUCT PHOTO PREVIEW / ORDER 20260614-2355 === */
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function normalize(v){
    v=String(v||'').trim();
    if(!v) return '';
    if(/^data:image\//i.test(v)||/^https?:\/\//i.test(v)||v.charAt(0)==='/') return v;
    if(/^assets\//i.test(v)) return '/' + v.replace(/^\/+/, '');
    return '/assets/products/' + v.replace(/^\/+/, '');
  }
  function strip(v){return String(v||'').trim().replace(/^\/assets\/products\//i,'').replace(/^assets\/products\//i,'')}
  function fromText(){
    var ta=document.getElementById('pPhotoPaths');
    return String(ta&&ta.value||'').split(/\n|,/).map(normalize).filter(Boolean);
  }
  function uniqueKeepOrder(arr){
    var out=[],seen={};
    (arr||[]).forEach(function(x){x=normalize(x); if(x&&!seen[x]){seen[x]=1;out.push(x)}});
    return out;
  }
  function writeText(arr){
    var ta=document.getElementById('pPhotoPaths');
    if(ta) ta.value=(arr||[]).map(strip).join('\n');
  }
  function bust(src,i){
    if(!src || /^data:image\//i.test(src)) return src;
    var clean=src.replace(/([?&])(nitaPreview|nitaAdminPreview|v|cache|t)=[^&]*/g,'').replace(/[?&]$/,'');
    return clean + (clean.indexOf('?')>-1?'&':'?') + 'nitaAdminPreview=' + Date.now() + '-' + i + '-' + Math.random().toString(16).slice(2);
  }
  function render(arr){
    arr=uniqueKeepOrder(arr&&arr.length?arr:fromText());
    window.pendingAdminPhotos=arr;
    window.pendingPhotos=arr;
    window.pendingAdminMainIndex=0;
    var box=document.getElementById('photoPreview');
    if(!box) return;
    if(!arr.length){box.innerHTML='<p class="muted">No photos previewed yet.</p>';return;}
    box.innerHTML=arr.map(function(src,i){return ''+
      '<div class="admin-thumb photo-order-thumb asset-path-thumb" data-index="'+i+'">'+
        '<img src="'+esc(bust(src,i))+'" data-clean-src="'+esc(src)+'" alt="Product photo '+(i+1)+'" loading="eager" decoding="async" onload="this.closest(\'.admin-thumb\').classList.remove(\'missing-asset\')" onerror="this.closest(\'.admin-thumb\').classList.add(\'missing-asset\')">'+
        '<span>'+(i===0?'Photo 1':'Photo '+(i+1))+'</span>'+ 
        '<small>'+esc(src)+'</small>'+ 
        '<div class="photo-order-controls">'+
          '<button type="button" data-nita-photo-move="left" data-index="'+i+'" '+(i===0?'disabled':'')+'>←</button>'+ 
          '<button type="button" data-nita-photo-move="right" data-index="'+i+'" '+(i===arr.length-1?'disabled':'')+'>→</button>'+ 
          '<button type="button" data-nita-photo-remove="1" data-index="'+i+'">×</button>'+ 
        '</div>'+ 
      '</div>';}).join('');
  }
  window.nitaRenderAdminPhotoPreview=render;
  window.previewAssetProductPhotos=function(){
    var arr=uniqueKeepOrder(fromText());
    if(!arr.length){try{toast&&toast('Write at least one image file name first.')}catch(e){}return;}
    writeText(arr);
    render(arr);
  };
  window.movePendingPhoto=function(index,direction){
    var arr=uniqueKeepOrder((window.pendingAdminPhotos&&window.pendingAdminPhotos.length)?window.pendingAdminPhotos:fromText());
    index=Number(index); direction=Number(direction); var next=index+direction;
    if(!arr.length||next<0||next>=arr.length) return;
    var tmp=arr[index]; arr[index]=arr[next]; arr[next]=tmp;
    writeText(arr); render(arr);
  };
  window.removePendingPhoto=function(index){
    var arr=uniqueKeepOrder((window.pendingAdminPhotos&&window.pendingAdminPhotos.length)?window.pendingAdminPhotos:fromText());
    index=Number(index); if(index<0||index>=arr.length) return;
    arr.splice(index,1); writeText(arr); render(arr);
  };
  document.addEventListener('click',function(e){
    var left=e.target.closest && e.target.closest('[data-nita-photo-move="left"]');
    var right=e.target.closest && e.target.closest('[data-nita-photo-move="right"]');
    var rem=e.target.closest && e.target.closest('[data-nita-photo-remove]');
    if(left||right||rem){
      e.preventDefault(); e.stopPropagation();
      var btn=left||right||rem; var i=Number(btn.getAttribute('data-index'));
      if(rem) window.removePendingPhoto(i); else window.movePendingPhoto(i,left?-1:1);
    }
  },true);
  document.addEventListener('input',function(e){
    if(e.target&&e.target.id==='pPhotoPaths'){
      window.pendingAdminPhotos=uniqueKeepOrder(fromText());
      window.pendingPhotos=window.pendingAdminPhotos;
    }
  },true);
})();
/* === END NITA FINAL CLEAN: ROCK-SOLID ADMIN PRODUCT PHOTO PREVIEW / ORDER === */

/* === NITA FINAL PRO: 100% ADMIN PHOTO WORKFLOW + CLEAR COLORWAY PHOTO PANELS 20260615-0015 === */
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function normalise(v){
    v=String(v||'').trim();
    if(!v) return '';
    if(/^data:image\//i.test(v) || /^https?:\/\//i.test(v) || v.charAt(0)==='/') return v;
    if(/^assets\//i.test(v)) return '/' + v.replace(/^\/+/, '');
    return '/assets/products/' + v.replace(/^\/+/, '');
  }
  function cleanFileName(v){return String(v||'').trim().replace(/^\/assets\/products\//i,'').replace(/^assets\/products\//i,'')}
  function readLines(textarea){
    return String(textarea && textarea.value || '').split(/\n|,/).map(normalise).filter(Boolean);
  }
  function uniqueKeepOrder(arr){
    var out=[], seen={};
    (arr||[]).forEach(function(x){x=normalise(x); if(x && !seen[x]){seen[x]=1; out.push(x);}});
    return out;
  }
  function writeLines(textarea, arr){
    if(textarea) textarea.value = (arr||[]).map(cleanFileName).join('\n');
  }
  function freshSrc(src,i){
    if(!src || /^data:image\//i.test(src)) return src;
    var clean = src.replace(/([?&])(nitaPreview|nitaAdminPreview|v|cache|t)=[^&]*/g,'').replace(/[?&]$/,'');
    return clean + (clean.indexOf('?')>-1?'&':'?') + 'nitaAdminPreview=' + Date.now() + '-' + i + '-' + Math.random().toString(16).slice(2);
  }
  function renderCards(target, arr, opts){
    if(!target) return;
    opts = opts || {};
    arr = uniqueKeepOrder(arr);
    if(!arr.length){ target.innerHTML = '<p class="muted">No photos previewed yet.</p>'; return; }
    target.innerHTML = arr.map(function(src,i){
      var label = opts.color ? (opts.color + ' photo ' + (i+1)) : ('Photo ' + (i+1));
      return '<div class="admin-thumb photo-order-thumb asset-path-thumb nita-photo-manager-card" data-index="'+i+'">'
        + '<img src="'+esc(freshSrc(src,i))+'" data-clean-src="'+esc(src)+'" alt="'+esc(label)+'" loading="eager" decoding="async" onload="this.closest(\'.admin-thumb\').classList.remove(\'missing-asset\')" onerror="this.closest(\'.admin-thumb\').classList.add(\'missing-asset\')">'
        + '<span>'+(i===0?(opts.color?opts.color+' main photo':'Photo 1'):(opts.color?opts.color+' photo '+(i+1):'Photo '+(i+1)))+'</span>'
        + '<small>'+esc(src)+'</small>'
        + '<div class="photo-order-controls">'
        + '<button type="button" data-nita-photo-left="1" data-index="'+i+'" '+(i===0?'disabled':'')+'>←</button>'
        + '<button type="button" data-nita-photo-right="1" data-index="'+i+'" '+(i===arr.length-1?'disabled':'')+'>→</button>'
        + '<button type="button" data-nita-photo-delete="1" data-index="'+i+'">×</button>'
        + '</div>'
        + '</div>';
    }).join('');
  }
  function renderMain(){
    var ta=document.getElementById('pPhotoPaths');
    var box=document.getElementById('photoPreview');
    var arr=uniqueKeepOrder(window.pendingAdminPhotos && window.pendingAdminPhotos.length ? window.pendingAdminPhotos : readLines(ta));
    window.pendingAdminPhotos = arr;
    window.pendingPhotos = arr;
    window.pendingAdminMainIndex = 0;
    writeLines(ta, arr);
    renderCards(box, arr, {});
  }
  window.previewAssetProductPhotos = function(){
    var ta=document.getElementById('pPhotoPaths');
    var arr=uniqueKeepOrder(readLines(ta));
    if(!arr.length){ try{toast&&toast('Write at least one image file name first.')}catch(e){} return; }
    window.pendingAdminPhotos = arr;
    window.pendingPhotos = arr;
    window.pendingAdminMainIndex = 0;
    writeLines(ta, arr);
    renderCards(document.getElementById('photoPreview'), arr, {});
  };
  window.movePendingPhoto = function(index, direction){
    var ta=document.getElementById('pPhotoPaths');
    var arr=uniqueKeepOrder(window.pendingAdminPhotos && window.pendingAdminPhotos.length ? window.pendingAdminPhotos : readLines(ta));
    index=Number(index); direction=Number(direction); var next=index+direction;
    if(next<0 || next>=arr.length) return;
    var tmp=arr[index]; arr[index]=arr[next]; arr[next]=tmp;
    window.pendingAdminPhotos=arr; window.pendingPhotos=arr; window.pendingAdminMainIndex=0;
    writeLines(ta, arr); renderCards(document.getElementById('photoPreview'), arr, {});
  };
  window.removePendingPhoto = function(index){
    var ta=document.getElementById('pPhotoPaths');
    var arr=uniqueKeepOrder(window.pendingAdminPhotos && window.pendingAdminPhotos.length ? window.pendingAdminPhotos : readLines(ta));
    index=Number(index); if(index<0 || index>=arr.length) return;
    arr.splice(index,1); window.pendingAdminPhotos=arr; window.pendingPhotos=arr; window.pendingAdminMainIndex=0;
    writeLines(ta, arr); renderCards(document.getElementById('photoPreview'), arr, {});
  };
  function panelParts(panel){
    return {
      panel: panel,
      color: panel ? (panel.getAttribute('data-color') || 'Color') : 'Color',
      ta: panel && panel.querySelector('.nita-colorway-paths'),
      box: panel && panel.querySelector('.nita-colorway-preview')
    };
  }
  function renderColorPanel(panel){
    var p=panelParts(panel); if(!p.panel || !p.ta || !p.box) return;
    var arr=uniqueKeepOrder(readLines(p.ta));
    p.panel._nitaColorwayPhotos = arr;
    writeLines(p.ta, arr);
    renderCards(p.box, arr, {color:p.color});
  }
  function moveColorPanel(panel, index, direction){
    var p=panelParts(panel); if(!p.panel || !p.ta || !p.box) return;
    var arr=uniqueKeepOrder(p.panel._nitaColorwayPhotos && p.panel._nitaColorwayPhotos.length ? p.panel._nitaColorwayPhotos : readLines(p.ta));
    index=Number(index); direction=Number(direction); var next=index+direction;
    if(next<0 || next>=arr.length) return;
    var tmp=arr[index]; arr[index]=arr[next]; arr[next]=tmp;
    p.panel._nitaColorwayPhotos = arr; writeLines(p.ta, arr); renderCards(p.box, arr, {color:p.color});
  }
  function removeColorPanel(panel, index){
    var p=panelParts(panel); if(!p.panel || !p.ta || !p.box) return;
    var arr=uniqueKeepOrder(p.panel._nitaColorwayPhotos && p.panel._nitaColorwayPhotos.length ? p.panel._nitaColorwayPhotos : readLines(p.ta));
    index=Number(index); if(index<0 || index>=arr.length) return;
    arr.splice(index,1); p.panel._nitaColorwayPhotos = arr; writeLines(p.ta, arr); renderCards(p.box, arr, {color:p.color});
  }
  document.addEventListener('click', function(e){
    var previewBtn = e.target.closest && e.target.closest('.nita-colorway-preview-btn');
    if(previewBtn){ e.preventDefault(); renderColorPanel(previewBtn.closest('.nita-colorway-photo-panel')); return; }
    var cardBtn = e.target.closest && e.target.closest('[data-nita-photo-left],[data-nita-photo-right],[data-nita-photo-delete]');
    if(!cardBtn) return;
    e.preventDefault(); e.stopPropagation();
    var i=Number(cardBtn.getAttribute('data-index'));
    var colorPanel = cardBtn.closest('.nita-colorway-photo-panel');
    if(colorPanel){
      if(cardBtn.hasAttribute('data-nita-photo-delete')) removeColorPanel(colorPanel, i);
      else moveColorPanel(colorPanel, i, cardBtn.hasAttribute('data-nita-photo-left')?-1:1);
      return;
    }
    if(cardBtn.hasAttribute('data-nita-photo-delete')) window.removePendingPhoto(i);
    else window.movePendingPhoto(i, cardBtn.hasAttribute('data-nita-photo-left')?-1:1);
  }, true);
  document.addEventListener('input', function(e){
    if(e.target && e.target.id==='pPhotoPaths'){
      window.pendingAdminPhotos = uniqueKeepOrder(readLines(e.target));
      window.pendingPhotos = window.pendingAdminPhotos;
    }
    if(e.target && e.target.classList && e.target.classList.contains('nita-colorway-paths')){
      var panel=e.target.closest('.nita-colorway-photo-panel');
      if(panel) panel._nitaColorwayPhotos = uniqueKeepOrder(readLines(e.target));
    }
  }, true);
  // Make colorway photo panels clearer after they are generated.
  function polishColorPanels(){
    document.querySelectorAll('.nita-colorway-photo-panel').forEach(function(panel){
      if(panel.dataset.nitaClearPolished==='1') return;
      panel.dataset.nitaClearPolished='1';
      var color=panel.getAttribute('data-color') || 'Color';
      var head=panel.querySelector('.nita-colorway-panel-head');
      if(head){
        head.insertAdjacentHTML('afterend','<p class="nita-colorway-clear-note">Add only the photos for the <b>'+esc(color)+'</b> version here. The first photo is the main photo for this color. Use the arrows to reorder.</p>');
      }
      var btn=panel.querySelector('.nita-colorway-preview-btn');
      if(btn) btn.textContent='PREVIEW / ORDER '+String(color).toUpperCase()+' PHOTOS';
    });
  }
  new MutationObserver(polishColorPanels).observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded', function(){setTimeout(polishColorPanels,250);});
})();
/* === END NITA FINAL PRO ADMIN PHOTO WORKFLOW === */


/* === NITA FINAL CONSOLIDATED FIX: PHOTO ORDER, FILTER/SORT, COLLECTION PREVIEWS, PRICE STATUS ROW 20260615-1015 === */
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]});}
  function safe(v){return String(v||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'");}
  function read(k,d){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d));}catch(e){return d;}}
  function write(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
  function allProducts(){try{return (typeof getProducts==='function'?getProducts():read('nitaProducts',[]))||[];}catch(e){return read('nitaProducts',[]);}}
  function money(v){try{return typeof window.money==='function'?window.money(v):'$'+Number(v||0).toFixed(2);}catch(e){return '$'+Number(v||0).toFixed(2);}}
  function imagePath(v){v=String(v||'').trim(); if(!v)return ''; if(/^data:image\//i.test(v)||/^https?:\/\//i.test(v)||v[0]==='/')return v; if(/^assets\//i.test(v))return '/'+v.replace(/^\/+/, ''); return '/assets/products/'+v.replace(/^\/+/, '');}
  function cleanName(v){return String(v||'').trim().replace(/^\/assets\/products\//i,'').replace(/^assets\/products\//i,'');}
  function lines(v){return String(v||'').split(/\n|,/).map(imagePath).filter(Boolean);}
  function uniqueKeep(arr){var out=[],seen={};(arr||[]).forEach(function(x){x=imagePath(x); if(x&&!seen[x]){seen[x]=1;out.push(x);}});return out;}
  function photos(p){var a=[]; if(Array.isArray(p&&p.photos))a=a.concat(p.photos); if(Array.isArray(p&&p.images))a=a.concat(p.images); if(p&&p.img)a.unshift(p.img); if(p&&p.image)a.unshift(p.image); if(Array.isArray(p&&p.colorways)&&p.colorways.length){var cw=p.colorways.find(function(c){return c&&Array.isArray(c.photos)&&c.photos.length;}); if(cw)a=cw.photos.concat(a);} return uniqueKeep(a).filter(Boolean);}
  function photoOf(p,i){var ph=photos(p);return ph[i]||ph[0]||'';}
  function statusVal(p){return (p&&p.status)||((p&&p.soldOut)?'out-of-stock':'in-stock');}
  function statusHtml(status){status=status||'in-stock';var label={'in-stock':'In stock','coming-soon':'Coming soon','out-of-stock':'Out of stock'}[status]||'In stock';return '<span class="stock-status '+esc(status)+'"><span class="stock-dot"></span><span>'+esc(label)+'</span></span>';}
  function colorways(p){ if(Array.isArray(p&&p.colorways)&&p.colorways.length){return p.colorways.map(function(c){return {color:c.color||'Color',photos:uniqueKeep(c.photos||[])};});} return [{color:(p&&p.color)||'Color',photos:photos(p)}]; }
  function swatch(color){var map={'Black':'#111','White':'#fff','Ivory':'#f8f4e8','Cream':'#f2ead7','Beige':'#d6c1a6','Taupe':'#9b8b7a','Grey':'#777','Silver':'#c9c9c9','Gold':'#d4af37','Rose Gold':'#b76e79','Bronze':'#8c6239','Brown':'#6b3f25','Cognac':'#9a5a25','Camel':'#c19a6b','Navy':'#111a3a','Dark Blue':'#0c2250','Blue':'#2f6fbd','Denim Blue':'#496f9e','Cyan':'#00bcd4','Red':'#e00022','Burgundy':'#6d001a','Pink':'#f2a0b9','Green':'#168a52','Olive':'#6b7d33','Khaki':'#b6aa7c','Yellow':'#f0d332','Orange':'#f47b20','Purple':'#5a3b82'}; var bg=map[color]||'#ddd'; if(/print|pattern/i.test(color)) bg='linear-gradient(45deg,#111 25%,#fff 25%,#fff 50%,#111 50%,#111 75%,#fff 75%)'; if(/multi/i.test(color)) bg='linear-gradient(90deg,#e00,#fc0,#0a6,#06c,#70c)'; return '<span class="nita-swatch nita-color-swatch" style="background:'+esc(bg)+'"></span>';}

  // Product card: price + stock status on the SAME line, with quick view centered.
  window.productCard=function(p){
    p=p||{}; var ph=photos(p), first=ph[0]||'', second=ph[1]||first; var sale=p.salePrice!==''&&p.salePrice!=null&&Number(p.salePrice)<Number(p.price); var price=sale?'<span class="muted old-price">'+money(p.price)+'</span><span class="price-drop">'+money(p.salePrice)+'</span>':money(p.price); var cws=colorways(p); var colors=cws.length>1?'<div class="nita-card-colorways">'+swatch(cws[0].color)+'<span>+'+(cws.length-1)+' colour'+(cws.length-1===1?'':'s')+'</span></div>':(cws.length===1?'<div class="nita-card-colorways single">'+swatch(cws[0].color)+'</div>':'');
    return '<article class="product nita-visible-product-card status-'+esc(statusVal(p))+'"><a class="product-hit" href="product.html?id='+encodeURIComponent(p.id||'')+'"><div class="product-img nita-card-img-wrap">'+(first?'<img class="nita-card-img primary" src="'+esc(first)+'" alt="'+esc(p.name||'Product')+'" loading="lazy" decoding="async">':'')+(second&&second!==first?'<img class="nita-card-img secondary" src="'+esc(second)+'" alt="'+esc((p.name||'Product')+' alternate')+'" loading="lazy" decoding="async">':'')+(sale?'<span class="sale-badge">PRICE DROP</span>':'')+'</div><h3>'+esc(p.name||'Product')+'</h3><div class="product-price-row nita-card-price-status"><p class="price-line">'+price+'</p>'+statusHtml(statusVal(p))+'</div>'+colors+'</a><button class="quick-view-btn" type="button" onclick="event.stopPropagation();event.preventDefault();openQuickView&&openQuickView(\''+safe(p.id||'')+'\')">QUICK VIEW</button></article>';
  };

  // Professional filter/sort workflow. One filter or multiple filters both work.
  var CATS=['All','Dresses','Skirts','T-Shirts','Tops','Pants','Bags','Scarves','Overalls'];
  var COLORS=['All','Black','White','Ivory','Cream','Beige','Taupe','Grey','Silver','Gold','Rose Gold','Bronze','Brown','Cognac','Camel','Navy','Dark Blue','Blue','Denim Blue','Cyan','Red','Burgundy','Pink','Green','Olive','Khaki','Yellow','Orange','Purple','Print / Pattern','Multi-color'];
  var MATERIALS=['All','Leather','Pebbled leather','Linen','Cotton','Silk','Satin','Denim','Knit','Wool','Cashmere','Polyester','Viscose','Suede','Faux leather','Metal','Straw','Canvas'];
  var SIZES=['All','XS','S','M','L','XL','One Size'];
  function opt(arr,val){return arr.map(function(x){return '<option '+(String(x)===String(val)?'selected':'')+'>'+esc(x)+'</option>';}).join('');}
  window.nitaEnsureShopFilters=function(){
    if(!document.getElementById('products'))return;
    var tools=document.querySelector('.shop-tools'); if(!tools)return;
    var old=tools.querySelector('select#filter'); if(old)old.style.display='none';
    if(document.getElementById('nitaFilterShell'))return;
    tools.insertAdjacentHTML('afterend','<div id="nitaFilterShell" class="nita-filter-shell"><div class="nita-filter-bar"><button type="button" class="nita-filter-toggle" onclick="nitaToggleShopFilters()"><span>Filters</span><b>+</b></button><div class="nita-sort-wrap"><button type="button" class="nita-sort-toggle" onclick="nitaToggleSortMenu()">Sort by</button><div class="nita-sort-menu" id="nitaSortMenu"><button type="button" data-sort="new">New arrivals</button><button type="button" data-sort="low">Price (low-high)</button><button type="button" data-sort="high">Price (high-low)</button></div></div></div><div class="nita-filter-panel" id="nitaFilterPanel"><div><label>Category</label><select id="nitaFilterCategory" class="field">'+opt(CATS,new URL(location.href).searchParams.get('cat')||'All')+'</select></div><div><label>Color</label><select id="nitaFilterColor" class="field">'+opt(COLORS,'All')+'</select></div><div><label>Material</label><select id="nitaFilterMaterial" class="field">'+opt(MATERIALS,'All')+'</select></div><div><label>Size</label><select id="nitaFilterSize" class="field">'+opt(SIZES,'All')+'</select></div><div><label>Min price</label><input id="nitaFilterMin" class="field" type="number" min="0" placeholder="Min"></div><div><label>Max price</label><input id="nitaFilterMax" class="field" type="number" min="0" placeholder="Max"></div><button type="button" class="btn light nita-clear-filters" onclick="nitaClearShopFilters()">Clear</button></div></div>');
    ['nitaFilterCategory','nitaFilterColor','nitaFilterMaterial','nitaFilterSize','nitaFilterMin','nitaFilterMax'].forEach(function(id){var el=document.getElementById(id); if(el)el.addEventListener('change',window.shopPage); if(el&&el.tagName==='INPUT')el.addEventListener('input',window.shopPage);});
    var menu=document.getElementById('nitaSortMenu'); if(menu)menu.addEventListener('click',function(e){var b=e.target.closest('[data-sort]'); if(!b)return; window.nitaShopSort=b.dataset.sort; menu.classList.remove('open'); window.shopPage();});
  };
  window.nitaToggleShopFilters=function(){var p=document.getElementById('nitaFilterPanel'),b=document.querySelector('.nita-filter-toggle'); if(!p)return; p.classList.toggle('open'); if(b){b.classList.toggle('open',p.classList.contains('open')); var s=b.querySelector('b'); if(s)s.textContent=p.classList.contains('open')?'−':'+';}};
  window.nitaToggleSortMenu=function(){var m=document.getElementById('nitaSortMenu'); if(m)m.classList.toggle('open');};
  window.nitaClearShopFilters=function(){['nitaFilterCategory','nitaFilterColor','nitaFilterMaterial','nitaFilterSize'].forEach(function(id){var e=document.getElementById(id); if(e)e.value='All';}); ['nitaFilterMin','nitaFilterMax'].forEach(function(id){var e=document.getElementById(id); if(e)e.value='';}); window.nitaShopSort='new'; history.replaceState(null,'','shop.html'); window.shopPage();};
  window.shopPage=function(){
    window.nitaEnsureShopFilters();
    var cat=(document.getElementById('nitaFilterCategory')||document.getElementById('filter'))?.value || new URL(location.href).searchParams.get('cat') || 'All';
    var color=document.getElementById('nitaFilterColor')?.value||'All', mat=document.getElementById('nitaFilterMaterial')?.value||'All', size=document.getElementById('nitaFilterSize')?.value||'All';
    var min=Number(document.getElementById('nitaFilterMin')?.value||0), max=Number(document.getElementById('nitaFilterMax')?.value||0);
    function n(v){return String(v||'').toLowerCase().trim();}
    function price(p){return Number(p.salePrice||p.price||0);}
    var arr=allProducts().filter(function(p){return statusVal(p)!=='hidden';}).filter(function(p){return cat==='All'||n(p.category)===n(cat);}).filter(function(p){return color==='All'||n(p.color).includes(n(color))||(Array.isArray(p.colorways)&&p.colorways.some(function(c){return n(c.color)===n(color);}));}).filter(function(p){return mat==='All'||n(p.material||p.productMaterial).includes(n(mat));}).filter(function(p){return size==='All'||(Array.isArray(p.sizes)&&p.sizes.map(n).indexOf(n(size))>-1);}).filter(function(p){return !min||price(p)>=min;}).filter(function(p){return !max||price(p)<=max;});
    var sort=window.nitaShopSort||'new'; if(sort==='low')arr.sort(function(a,b){return price(a)-price(b)}); if(sort==='high')arr.sort(function(a,b){return price(b)-price(a)}); if(sort==='new')arr.sort(function(a,b){return String(b.id||'').localeCompare(String(a.id||''));});
    var grid=document.getElementById('products'); if(grid)grid.innerHTML=arr.length?arr.map(window.productCard).join(''):'<div class="nita-empty-products"><h3>No products found</h3><p class="muted">Try changing the filters.</p></div>';
  };

  // Collection page previews, even when HTML still has old grey blocks.
  function matchCollection(p,name){var n=String(name||'').toLowerCase(); var c=String(p.collection||p.displaySection||p.homeSection||'').toLowerCase(); if(n.includes('new'))return c.includes('new'); if(n.includes('everyday'))return c.includes('everyday'); if(n.includes('summer'))return c.includes('summer'); if(n.includes('access'))return c.includes('access')||String(p.category||'').toLowerCase().includes('bag')||String(p.category||'').toLowerCase().includes('scarf'); return c.includes(n);}
  window.nitaRenderCollectionsPage=function(){
    var page=document.querySelector('.page'); if(!page||!/collections/i.test(document.title))return;
    var grid=document.getElementById('nitaCollectionsGrid')||page.querySelector('.grid'); if(!grid)return; grid.id='nitaCollectionsGrid'; grid.className='nita-collections-grid';
    var names=['New Arrivals','Everyday Edit','Summer Pieces','Accessories']; var ps=allProducts();
    grid.innerHTML=names.map(function(name){var items=ps.filter(function(p){return matchCollection(p,name)}); var imgs=items.slice(0,4).map(function(p){return photoOf(p,0)}).filter(Boolean); if(!imgs.length)imgs=ps.slice(0,4).map(function(p){return photoOf(p,0)}).filter(Boolean); var href=name==='New Arrivals'?'shop.html?collection=new-arrivals':(name==='Accessories'?'shop.html?cat=Bags':'shop.html?collection='+encodeURIComponent(name)); return '<a class="nita-collection-card" href="'+href+'"><div class="nita-collection-preview '+(imgs.length>1?'multi':'')+'">'+(imgs.length?imgs.map(function(src){return '<img src="'+esc(src)+'" alt="'+esc(name)+' preview" loading="lazy">';}).join(''):'<div class="nita-collection-empty">Nita Style</div>')+'</div><div class="nita-collection-title"><h3>'+esc(name)+'</h3><span>'+items.length+' piece'+(items.length===1?'':'s')+'</span></div></a>';}).join('');
  };

  // Photo order: always save exactly what is visible in the textarea, in order, no stale order.
  function renderPhotoManager(target, arr, opts){
    if(!target)return; opts=opts||{}; arr=uniqueKeep(arr); if(!arr.length){target.innerHTML='<p class="muted">No photos previewed yet.</p>';return;}
    target.innerHTML=arr.map(function(src,i){var fresh=/^data:image\//i.test(src)?src:src+(src.indexOf('?')>-1?'&':'?')+'nitaPhotoFresh='+(Date.now())+'-'+i+'-'+Math.random().toString(16).slice(2); return '<div class="admin-thumb nita-photo-manager-card" data-index="'+i+'"><img src="'+esc(fresh)+'" data-clean-src="'+esc(src)+'" alt="Photo '+(i+1)+'" loading="eager" decoding="async"><span>'+esc(opts.color?opts.color+' photo '+(i+1):'Photo '+(i+1))+'</span><small>'+esc(src)+'</small><div class="photo-order-controls"><button type="button" data-nita-photo-left="1" data-index="'+i+'" '+(i===0?'disabled':'')+'>←</button><button type="button" data-nita-photo-right="1" data-index="'+i+'" '+(i===arr.length-1?'disabled':'')+'>→</button><button type="button" data-nita-photo-delete="1" data-index="'+i+'">×</button></div></div>';}).join('');
  }
  function readMainPhotoLines(){return uniqueKeep(lines(document.getElementById('pPhotoPaths')?.value||''));}
  function writeMain(arr){var ta=document.getElementById('pPhotoPaths'); if(ta)ta.value=uniqueKeep(arr).map(cleanName).join('\n'); window.pendingAdminPhotos=uniqueKeep(arr); window.pendingPhotos=uniqueKeep(arr);}
  window.previewAssetProductPhotos=function(){var arr=readMainPhotoLines(); writeMain(arr); renderPhotoManager(document.getElementById('photoPreview'),arr,{});};
  window.movePendingPhoto=function(i,d){var arr=readMainPhotoLines(); i=Number(i); d=Number(d); var j=i+d; if(j<0||j>=arr.length)return; var t=arr[i]; arr[i]=arr[j]; arr[j]=t; writeMain(arr); renderPhotoManager(document.getElementById('photoPreview'),arr,{});};
  window.removePendingPhoto=function(i){var arr=readMainPhotoLines(); i=Number(i); if(i<0||i>=arr.length)return; arr.splice(i,1); writeMain(arr); renderPhotoManager(document.getElementById('photoPreview'),arr,{});};
  function panelData(panel){return {ta:panel&&panel.querySelector('.nita-colorway-paths'),box:panel&&panel.querySelector('.nita-colorway-preview'),color:panel&&panel.getAttribute('data-color')||'Color'};}
  function renderPanel(panel){var p=panelData(panel),arr=uniqueKeep(lines(p.ta?.value||'')); if(p.ta)p.ta.value=arr.map(cleanName).join('\n'); renderPhotoManager(p.box,arr,{color:p.color});}
  function movePanel(panel,i,d){var p=panelData(panel),arr=uniqueKeep(lines(p.ta?.value||'')); i=Number(i); d=Number(d); var j=i+d; if(j<0||j>=arr.length)return; var t=arr[i]; arr[i]=arr[j]; arr[j]=t; if(p.ta)p.ta.value=arr.map(cleanName).join('\n'); renderPhotoManager(p.box,arr,{color:p.color});}
  function removePanel(panel,i){var p=panelData(panel),arr=uniqueKeep(lines(p.ta?.value||'')); i=Number(i); if(i<0||i>=arr.length)return; arr.splice(i,1); if(p.ta)p.ta.value=arr.map(cleanName).join('\n'); renderPhotoManager(p.box,arr,{color:p.color});}
  document.addEventListener('click',function(e){var btn=e.target.closest&&e.target.closest('[data-nita-photo-left],[data-nita-photo-right],[data-nita-photo-delete],.nita-colorway-preview-btn'); if(!btn)return; var panel=btn.closest('.nita-colorway-photo-panel'); if(btn.classList.contains('nita-colorway-preview-btn')){e.preventDefault();renderPanel(panel);return;} if(!btn.hasAttribute('data-nita-photo-left')&&!btn.hasAttribute('data-nita-photo-right')&&!btn.hasAttribute('data-nita-photo-delete'))return; e.preventDefault(); e.stopPropagation(); var i=Number(btn.dataset.index); if(panel){ if(btn.hasAttribute('data-nita-photo-delete'))removePanel(panel,i); else movePanel(panel,i,btn.hasAttribute('data-nita-photo-left')?-1:1); } else { if(btn.hasAttribute('data-nita-photo-delete'))window.removePendingPhoto(i); else window.movePendingPhoto(i,btn.hasAttribute('data-nita-photo-left')?-1:1); } },true);

  // Keep addProductAdmin from using stale image order.
  var previousAdd=window.addProductAdmin;
  window.addProductAdmin=async function(){ window.pendingAdminPhotos=readMainPhotoLines(); window.pendingPhotos=window.pendingAdminPhotos; document.querySelectorAll('.nita-colorway-photo-panel').forEach(renderPanel); return previousAdd?previousAdd.apply(this,arguments):false; };

  document.addEventListener('DOMContentLoaded',function(){setTimeout(function(){window.nitaEnsureShopFilters(); if(document.getElementById('products'))window.shopPage(); window.nitaRenderCollectionsPage();},350);});
  window.addEventListener('load',function(){setTimeout(function(){window.nitaEnsureShopFilters(); if(document.getElementById('products'))window.shopPage(); window.nitaRenderCollectionsPage();},550);});
})();
/* === END NITA FINAL CONSOLIDATED FIX === */


/* === NITA FINAL PATCH: remove Accessories collection + premium real collection previews === */
(function(){
  const COLLECTIONS = [
    {name:'New Arrivals', sub:'Freshly added pieces', url:'shop.html?collection=New%20Arrivals'},
    {name:'Everyday Edit', sub:'Clean everyday wardrobe', url:'shop.html?collection=Everyday%20Edit'},
    {name:'Summer Pieces', sub:'Light seasonal styling', url:'shop.html?collection=Summer%20Pieces'}
  ];
  window.ADMIN_COLLECTIONS = ['New Arrivals','Everyday Edit','Summer Pieces','Minimal Essentials','Evening Pieces','Price Drops','Sale'];
  window.NITA_ADMIN_COLLECTION_OPTIONS = ['New Arrivals','Everyday Edit','Summer Pieces','Minimal Essentials','Evening Pieces','Price Drops','Sale'];
  const norm=s=>String(s||'').trim().toLowerCase();
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  function allProducts(){try{return (typeof getProducts==='function'?getProducts():(window.products||[])).map(p=>typeof normalizeProductStatus==='function'?normalizeProductStatus(p):p).filter(Boolean);}catch(e){return [];}}
  function imageOf(p,i=0){
    let src='';
    if(p && p.colorways && p.colorways.length){
      const cw=p.colorways.find(x=>x && x.photos && x.photos.length) || p.colorways[0];
      src=(cw.photos||[])[i] || (cw.photos||[])[0] || '';
    }
    src = src || (p && ((p.photos||[])[i] || (p.photos||[])[0] || p.img || p.image || ''));
    if(!src || /^linear-gradient/i.test(src)) return '';
    return String(src).startsWith('assets/products/') ? '/'+src : src;
  }
  function matches(p,name){
    const text=norm([p.collection,p.displaySection,p.homeSection,p.category,p.name,p.desc,p.material].join(' '));
    const home=norm(p.displaySection||p.homeSection);
    if(name==='New Arrivals') return home==='new-arrivals' || /new arrivals|new arrival|latest|fresh/.test(text) || norm(p.collection)==='new arrivals';
    if(name==='Everyday Edit') return /everyday edit|everyday|daily|daywear/.test(text) || norm(p.collection)==='everyday edit';
    if(name==='Summer Pieces') return /summer pieces|summer|linen|cotton|light|vacation|beach/.test(text) || norm(p.collection)==='summer pieces';
    return false;
  }
  function buildCard(col, products){
    let items=products.filter(p=>matches(p,col.name));
    // Never show empty grey blocks: use real products as a tasteful fallback if this edit has no products yet.
    const previewItems=(items.length?items:products).slice(0,4);
    const imgs=previewItems.map((p,idx)=>imageOf(p,idx===0?0:0)).filter(Boolean).slice(0,4);
    const count=items.length;
    return `<a class="nita-pro-collection-card" href="${esc(col.url)}" aria-label="${esc(col.name)}">
      <div class="nita-pro-collection-media ${imgs.length>1?'is-collage':'is-single'}">
        ${imgs.length?imgs.map(src=>`<span class="nita-pro-collection-img"><img src="${esc(src)}" alt="${esc(col.name)} preview" loading="lazy" decoding="async"></span>`).join(''):`<span class="nita-pro-collection-placeholder"><b>${esc(col.name)}</b><small>Products will appear here when added.</small></span>`}
        <span class="nita-pro-collection-shade"></span>
        <span class="nita-pro-collection-label">${esc(col.name)}</span>
      </div>
      <div class="nita-pro-collection-copy">
        <div><h3>${esc(col.name)}</h3><p>${esc(col.sub)}</p></div>
        <span>${count || previewItems.length} piece${(count || previewItems.length)===1?'':'s'} →</span>
      </div>
    </a>`;
  }
  function renderPremiumCollections(){
    if(!/collections\.html/i.test(location.pathname)) return;
    const page=document.querySelector('main .page') || document.querySelector('.page');
    if(!page) return;
    const products=allProducts();
    page.innerHTML=`<h1>Collections</h1><p class="muted">Explore selected edits created for easy styling.</p><div class="nita-pro-collections-grid">${COLLECTIONS.map(c=>buildCard(c,products)).join('')}</div>`;
  }
  function cleanCollectionSelects(){
    const banned=/^accessories$/i;
    document.querySelectorAll('select').forEach(sel=>{
      Array.from(sel.options).forEach(o=>{ if(banned.test(String(o.textContent||o.value).trim())) o.remove(); });
      if(banned.test(sel.value||'')) sel.value='Everyday Edit';
    });
  }
  function cleanNavAccessories(){
    // Remove old Accessories collection links, but keep Bags/Scarves product categories.
    document.querySelectorAll('a').forEach(a=>{
      const t=String(a.textContent||'').trim(); const href=String(a.getAttribute('href')||'');
      if(/^Accessories$/i.test(t) && /cat=Accessories|cat=Bags|collections/i.test(href)){
        const parent=a.closest('.mega-links')||a; if(parent===a) a.remove(); else a.remove();
      }
    });
  }
  const run=()=>{renderPremiumCollections(); cleanCollectionSelects(); cleanNavAccessories();};
  document.addEventListener('DOMContentLoaded',()=>setTimeout(run,80));
  window.addEventListener('load',()=>setTimeout(run,200));
  const oldRenderAdmin=window.renderAdmin;
  if(typeof oldRenderAdmin==='function') window.renderAdmin=function(){const r=oldRenderAdmin.apply(this,arguments); setTimeout(cleanCollectionSelects,80); return r;};
  const oldRenderAdd=window.renderAdminAddProductForm || window.renderAddProductForm;
  if(typeof oldRenderAdd==='function'){
    const wrap=function(){const r=oldRenderAdd.apply(this,arguments); setTimeout(cleanCollectionSelects,40); return r;};
    if(window.renderAdminAddProductForm) window.renderAdminAddProductForm=wrap;
    if(window.renderAddProductForm) window.renderAddProductForm=wrap;
  }
})();
