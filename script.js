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
 return `<header class="topbar"><nav class="nav"><div class="nav-item"><a href="shop.html">SHOP</a><div class="mega compact-mega"><div class="mega-block"><h4>SHOP BY CATEGORY</h4><div class="mega-links"><a href="shop.html?cat=Dresses">Dresses</a><a href="shop.html?cat=Tops">Tops</a><a href="shop.html?cat=Pants">Pants</a><a href="shop.html?cat=Jackets">Jackets</a><a href="shop.html?cat=Accessories">Accessories</a></div></div><div class="mega-block"><h4>SHOP BY EDIT</h4><div class="mega-links"><a href="collections.html">New Arrivals</a><a href="shop.html?cat=Essentials">Essentials</a><a href="shop.html?cat=Evening">Evening Pieces</a><a href="shop.html?cat=Sale">Price Drops</a></div></div></div></div><div class="nav-item"><a href="collections.html">COLLECTIONS</a><div class="mega compact-mega"><div class="mega-block"><h4>FEATURED</h4><div class="mega-links"><a href="collections.html">Latest Edit</a><a href="collections.html">Everyday Boutique</a><a href="collections.html">Minimal Essentials</a></div></div><div class="mega-block"><h4>OCCASION</h4><div class="mega-links"><a href="shop.html?cat=Daywear">Daywear</a><a href="shop.html?cat=Evening">Evening</a><a href="shop.html?cat=Accessories">Accessories</a></div></div></div></div><a href="about.html">ABOUT</a></nav><a class="brand" href="index.html"><img src="assets/logo-cropped.png" alt="Nita Style"></a><div class="actions"><button onclick="openSearch()" style="border:0;background:0;font-weight:800;cursor:pointer">SEARCH</button><a href="${currentUser?'account.html':'login.html'}">${currentUser?'ACCOUNT':'SIGN IN'}</a>${admin}<a class="liked-nav-link" href="liked.html" aria-label="Liked items" title="Liked items"><span class="heart-nav">♡</span><span class="liked-label">LIKED</span><span class="liked-count">0</span></a><button class="cart-icon-btn" aria-label="Cart" onclick="openCart()"><span class="cart-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.5 8.5h11l.8 11H5.7l.8-11Z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/></svg></span><span class="cart-count">0</span></button></div></header><aside class="search-panel" id="searchPanel"><button class="close" onclick="closeSearch()">×</button><h2>Search</h2><input class="field" id="searchInput" placeholder="Search dresses, tops, pants..." oninput="renderSearch()"><div id="searchResults"></div></aside><aside class="cart-panel" id="cartPanel"><button class="close" onclick="closeCart()">×</button><h2>Your Cart</h2><div id="cartItems"></div><a class="btn" href="checkout.html" style="display:block;text-align:center;margin-top:20px">CHECKOUT</a></aside>`
}

function siteFooter(){return `<footer class="footer site-footer"><div><img class="footer-logo-img" src="assets/logo-cropped.png" alt="Nita Style"><p class="muted">Founded by Nicole and Tania, Nita Style curates Italian-made pieces for women who value clean silhouettes, refined textures, and effortless everyday elegance.</p></div><div><h4>Shop</h4><a href="shop.html">All products</a><a href="collections.html">Collections</a><a href="cart.html">Cart</a><a href="checkout.html">Checkout</a></div><div><h4>Support</h4><a href="contact.html">Contact</a><a href="about.html">About</a><a href="checkout.html">Cash on delivery</a><a href="checkout.html">Online payment coming soon</a><a class="footer-instagram" href="https://www.instagram.com/thenitastyle/" target="_blank" rel="noopener noreferrer" aria-label="Nita Style Instagram"><img class="footer-instagram-icon" src="assets/instagram-icon.webp" alt="Instagram"><span>thenitastyle</span></a></div><div><h4>Join the list</h4><p class="muted">Receive the first-order code and new drop updates.</p><div class="footer-newsletter"><input placeholder="Email address"><button onclick="toast('Use code NITA10 for 10% off')">SIGN UP</button></div></div></footer><div class="copyright site-footer"><span>© 2026 Nita Style. All rights reserved. <span class="footer-codeviq">Developed by CODEVIQ.</span></span><span class="footer-legal-links"><a href="privacy-policy.html">Privacy Policy</a><span>·</span><a href="terms.html">Terms and Conditions</a><span>·</span><a href="shipping.html">Shipping</a></span></div>`}

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
const ADMIN_CATEGORIES=['Dresses','Tops','Pants','Jackets','Accessories','Essentials','Evening','Sale'];
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
      const max=1200; let w=img.width,h=img.height; if(Math.max(w,h)>max){const ratio=max/Math.max(w,h); w=Math.round(w*ratio); h=Math.round(h*ratio);} 
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
    detail.innerHTML=`<div><div class="detail-img" style="${cssBgImage(imgs.all[window.selectedPhoto])};background-size:cover;background-position:center"></div><div class="product-thumbs">${imgs.all.map((ph,i)=>`<button class="${i===window.selectedPhoto?'active':''}" onclick="selectedPhoto=${i};productPage()" style="${cssBgImage(ph)};background-size:cover;background-position:center"></button>`).join('')}</div></div><div><p class="muted">${safe(p.category||'')}</p><h1>${safe(p.name)}</h1>${productPriceStatusRow(p,'h2')}<p>${safe(p.desc||'')}</p><div class="sizes">${p.sizes.map(s=>`<span class="size ${s===window.selectedSize?'active':''}" onclick="selectedSize='${safe(s)}';productPage()">${safe(s)}</span>`).join('')}</div>${action}<hr><p class="muted">Cash on delivery available. Online payment will be available soon.</p></div>`;
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
    detail.innerHTML=`<div class="product-media"><div class="detail-img" style="${cssBgImage(imgs.all[window.selectedPhoto])};background-size:cover;background-position:center"></div><div class="product-thumbs">${imgs.all.map((ph,i)=>`<button class="${i===window.selectedPhoto?'active':''}" onclick="selectedPhoto=${i};productPage()" style="${cssBgImage(ph)};background-size:cover;background-position:center"></button>`).join('')}</div></div><div class="product-info"><p class="muted">${safe(p.category||'')}</p><h1>${safe(p.name)}</h1>${productPriceStatusRow(p,'h2')}<p>${safe(p.desc||'')}</p><div class="sizes">${p.sizes.map(s=>`<span class="size ${s===window.selectedSize?'active':''}" onclick="selectedSize='${safe(s)}';productPage()">${safe(s)}</span>`).join('')}</div><div class="product-actions">${action}</div><hr><p class="muted">Cash on delivery available. Online payment will be available soon.</p></div>`;
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
    detail.innerHTML=`<div class="product-media"><div class="detail-img" style="${bg(imgs.all[window.selectedPhoto])};background-size:contain;background-repeat:no-repeat;background-position:center;background-color:#f5f5f5"></div><div class="product-thumbs">${imgs.all.map((ph,i)=>`<button class="${i===window.selectedPhoto?'active':''}" onclick="selectedPhoto=${i};productPage()" style="${bg(ph)};background-size:cover;background-position:center"></button>`).join('')}</div></div><div class="product-info"><p class="muted">${esc(p.category||'')}</p><h1>${esc(p.name)}</h1>${priceRow(p,'h2')}<p>${esc(p.desc||'')}</p><div class="sizes">${sizes.map(s=>`<span class="size ${s===window.selectedSize?'active':''}" onclick="selectedSize='${esc(s)}';productPage()">${esc(s)}</span>`).join('')}</div><div class="product-actions">${action}</div><hr><p class="muted">Cash on delivery available. Online payment will be available soon.</p></div>`;
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
  window.NITA_ADMIN_CATEGORY_OPTIONS = ['Dresses','Tops','Pants','Jackets','Accessories'];
  window.NITA_ADMIN_COLLECTION_OPTIONS = ['Everyday Edit','Minimal Essentials','Evening Pieces','Accessories','Price Drops'];
  window.NITA_COLOR_OPTIONS = ['Black','White','Beige','Cream','Grey','Brown','Navy','Blue','Red','Pink','Green','Yellow','Print / Pattern','Multi-color'];
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
    return `<header class="topbar"><nav class="nav"><div class="nav-item"><a href="shop.html">SHOP</a><div class="mega compact-mega"><div class="mega-block"><h4>SHOP BY CATEGORY</h4><div class="mega-links"><a href="shop.html?cat=Dresses">Dresses</a><a href="shop.html?cat=Tops">Tops</a><a href="shop.html?cat=Pants">Pants</a><a href="shop.html?cat=Jackets">Jackets</a><a href="shop.html?cat=Accessories">Accessories</a></div></div><div class="mega-block"><h4>SHOP BY EDIT</h4><div class="mega-links"><a href="collections.html">New Arrivals</a><a href="shop.html?cat=Essentials">Essentials</a><a href="shop.html?cat=Evening">Evening Pieces</a><a href="shop.html?cat=Sale">Price Drops</a></div></div></div></div><div class="nav-item"><a href="collections.html">COLLECTIONS</a><div class="mega compact-mega"><div class="mega-block"><h4>FEATURED</h4><div class="mega-links"><a href="collections.html">Latest Edit</a><a href="collections.html">Everyday Boutique</a><a href="collections.html">Minimal Essentials</a></div></div><div class="mega-block"><h4>OCCASION</h4><div class="mega-links"><a href="shop.html?cat=Daywear">Daywear</a><a href="shop.html?cat=Evening">Evening</a><a href="shop.html?cat=Accessories">Accessories</a></div></div></div></div><a href="about.html">ABOUT</a></nav><a class="brand" href="index.html"><img src="assets/logo-cropped.png" alt="Nita Style"></a><div class="actions"><button onclick="openSearch()" style="border:0;background:0;font-weight:800;cursor:pointer">SEARCH</button><a class="account-nav-link" href="${user?'account.html':'login.html'}">${user?'ACCOUNT':'SIGN IN'}</a>${admin}<a class="liked-nav-link" href="liked.html" aria-label="Liked items" title="Liked items"><span class="heart-nav">♡</span><span class="liked-label">LIKED</span><span class="liked-count">0</span></a><button class="cart-icon-btn" aria-label="Cart" onclick="openCart()"><span class="cart-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.5 8.5h11l.8 11H5.7l.8-11Z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/></svg></span><span class="cart-count">0</span></button></div></header><aside class="search-panel" id="searchPanel"><button class="close" onclick="closeSearch()">×</button><h2>Search</h2><input class="field" id="searchInput" placeholder="Search dresses, tops, pants..." oninput="renderSearch()"><div id="searchResults"></div></aside><aside class="cart-panel" id="cartPanel"><button class="close" onclick="closeCart()">×</button><h2>Your Cart</h2><div id="cartItems"></div><a class="btn" href="checkout.html" style="display:block;text-align:center;margin-top:20px">CHECKOUT</a></aside>`;
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
    detail.innerHTML=`<div class="product-media"><div class="detail-img" style="${bg(imgs.all[window.selectedPhoto])}"></div><div class="product-thumbs">${imgs.all.map((ph,i)=>`<button class="${i===window.selectedPhoto?'active':''}" onclick="selectedPhoto=${i};productPage()" style="${bg(ph)}"></button>`).join('')}</div></div><div class="product-info"><p class="muted">${esc(p.category||'')}</p><h1>${esc(p.name||'Product')}</h1>${price}<p>${esc(p.desc||'')}</p><div class="sizes product-size-list">${sizesHtml}</div><div class="product-actions">${action}</div><hr><p class="muted">Cash on delivery available. Online payment will be available soon.</p></div>`;
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
  const COLORS=window.COLOR_OPTIONS||['Black','White','Beige','Cream','Grey','Brown','Navy','Blue','Red','Pink','Green','Yellow','Print / Pattern','Multi-color'];
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
      <div><label>Product category</label><select class="field edit-category">${opts(window.ADMIN_CATEGORIES||['Dresses','Tops','Pants','Jackets','Accessories'],p.category)}</select></div>
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
    detail.innerHTML=`<div class="product-media"><div class="detail-img" style="${bg(im.all[window.selectedPhoto])}"></div><div class="product-thumbs">${im.all.map((ph,i)=>`<button class="${i===window.selectedPhoto?'active':''}" onclick="selectedPhoto=${i};productPage()" style="${bg(ph)}"></button>`).join('')}</div></div><div class="product-info"><p class="muted">${esc(p.category||'')}</p><h1>${esc(p.name||'Product')}</h1>${typeof productPriceStatusRow==='function'?productPriceStatusRow(p,'h2'):`<h2>${moneySafe(p.salePrice||p.price)}</h2>`}<p>${esc(p.desc||'')}</p><div class="sizes product-size-list">${sizeButtonsForCustomer(p)}</div><div class="product-actions">${action}</div><hr><p class="muted">Cash on delivery available. Online payment will be available soon.</p></div>`;
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
      <div><label>Product category</label><select class="field edit-category">${opts(['Dresses','Tops','Pants','Jackets','Accessories'], p.category || 'Tops')}</select></div>
      <div><label>Collection</label><select class="field edit-collection">${opts(['Everyday Edit','Minimal Essentials','Evening Pieces','Accessories','Price Drops','New Arrivals'], p.collection || 'Everyday Edit')}</select></div>
      <div><label>Homepage display section</label><select class="field edit-home-section">${opts([['trending-now','Trending Now'],['new-arrivals','New Arrivals']], home)}</select></div>
      <div><label>Color</label><select class="field edit-color">${opts(['Black','White','Beige','Cream','Grey','Brown','Navy','Blue','Red','Pink','Green','Yellow','Print / Pattern','Multi-color'], (p.note||'').split(' · ')[0] || 'Black')}</select></div>
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
    detail.innerHTML = `<div class="product-media"><div class="detail-img" style="${cssBg(im.all[window.selectedPhoto])}"></div><div class="product-thumbs">${im.all.map((ph,i)=>`<button class="${i===window.selectedPhoto?'active':''}" onclick="selectedPhoto=${i};productPage()" style="${cssBg(ph)}"></button>`).join('')}</div></div><div class="product-info"><p class="muted">${safe(p.category || '')}</p><h1>${safe(p.name || 'Product')}</h1>${typeof productPriceStatusRow === 'function' ? productPriceStatusRow(p,'h2') : `<h2>${moneySafe(p.salePrice || p.price)}</h2>`}<p>${safe(p.desc || '')}</p><div class="sizes product-size-list">${sizeHtml}</div><div class="product-actions">${action}</div><hr><p class="muted">Cash on delivery available. Online payment will be available soon.</p></div>`;
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
      return `<button type="button" data-size="${esc(s)}" class="size ${active?'active':''} ${oos?'size-disabled':''}" ${oos?'disabled aria-disabled="true" title="Out of stock"':`onclick="quickSelectedSize='${esc(s)}';this.parentElement.querySelectorAll('.size').forEach(b=>b.classList.remove('active'));this.classList.add('active')"`}>${esc(s)}${oos?'<span class="size-oos-text">Out of stock</span>':''}</button>`;
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
   Adds admin controls for the three homepage wallpaper areas without changing other features. */
(function(){
  const WALL_KEY = 'nitaHomepageWallpapers';
  const DEFAULTS = { shopNow:'', newCollection:'', exploreCollections:'' };
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
    applyOne(panels[1], w.newCollection, '--nita-home-wallpaper');
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
    root.innerHTML = `<div class="admin-toolbar"><div><h2>Homepage wallpapers</h2><p class="muted">Choose the three background images shown behind Shop Now, New Collection, and Explore Collections.</p></div><span class="pill">Homepage</span></div>`+
      previewHtml('Shop Now wallpaper','shopNow',w.shopNow)+
      previewHtml('New Collection wallpaper','newCollection',w.newCollection)+
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
    var cats = window.ADMIN_CATEGORIES || ['Dresses','Tops','Pants','Jackets','Accessories','Essentials','Evening','Sale'];
    var cols = window.ADMIN_COLLECTIONS || ['New Arrivals','Everyday Edit','Summer Pieces','Minimal Essentials','Accessories','Sale'];
    var colors = window.NITA_COLOR_OPTIONS || ['Black','White','Beige','Cream','Grey','Brown','Navy','Blue','Red','Pink','Green','Yellow','Print / Pattern','Multi-color'];
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
