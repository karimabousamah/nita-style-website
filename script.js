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
 return `<header class="topbar"><nav class="nav"><div class="nav-item"><a href="shop.html">SHOP</a><div class="mega compact-mega"><div class="mega-block"><h4>SHOP BY CATEGORY</h4><div class="mega-links"><a href="shop.html?cat=Dresses">Dresses</a><a href="shop.html?cat=Tops">Tops</a><a href="shop.html?cat=Pants">Pants</a><a href="shop.html?cat=Jackets">Jackets</a><a href="shop.html?cat=Accessories">Accessories</a></div></div><div class="mega-block"><h4>SHOP BY EDIT</h4><div class="mega-links"><a href="collections.html">New Arrivals</a><a href="shop.html?cat=Essentials">Essentials</a><a href="shop.html?cat=Evening">Evening Pieces</a><a href="shop.html?cat=Sale">Price Drops</a></div></div></div></div><div class="nav-item"><a href="collections.html">COLLECTIONS</a><div class="mega compact-mega"><div class="mega-block"><h4>FEATURED</h4><div class="mega-links"><a href="collections.html">Latest Edit</a><a href="collections.html">Everyday Boutique</a><a href="collections.html">Minimal Essentials</a></div></div><div class="mega-block"><h4>OCCASION</h4><div class="mega-links"><a href="shop.html?cat=Daywear">Daywear</a><a href="shop.html?cat=Evening">Evening</a><a href="shop.html?cat=Accessories">Accessories</a></div></div></div></div><a href="about.html">ABOUT</a></nav><a class="brand" href="index.html"><img src="assets/logo-cropped.png" alt="Nita Style"></a><div class="actions"><button onclick="openSearch()" style="border:0;background:0;font-weight:800;cursor:pointer">SEARCH</button><a href="${currentUser?'account.html':'login.html'}">${currentUser?'ACCOUNT':'SIGN IN'}</a>${admin}<button class="cart-icon-btn" aria-label="Cart" onclick="openCart()"><span class="cart-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.5 8.5h11l.8 11H5.7l.8-11Z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/></svg></span><span class="cart-count">0</span></button></div></header><aside class="search-panel" id="searchPanel"><button class="close" onclick="closeSearch()">×</button><h2>Search</h2><input class="field" id="searchInput" placeholder="Search dresses, tops, pants..." oninput="renderSearch()"><div id="searchResults"></div></aside><aside class="cart-panel" id="cartPanel"><button class="close" onclick="closeCart()">×</button><h2>Your Cart</h2><div id="cartItems"></div><a class="btn" href="checkout.html" style="display:block;text-align:center;margin-top:20px">CHECKOUT</a></aside>`
}

function siteFooter(){return `<footer class="footer site-footer"><div><img class="footer-logo-img" src="assets/logo-cropped.png" alt="Nita Style"><p class="muted">Founded by Nicole and Tania, Nita Style curates Italian-made pieces for women who value clean silhouettes, refined textures, and effortless everyday elegance.</p></div><div><h4>Shop</h4><a href="shop.html">All products</a><a href="collections.html">Collections</a><a href="cart.html">Cart</a><a href="checkout.html">Checkout</a></div><div><h4>Support</h4><a href="contact.html">Contact</a><a href="about.html">About</a><a href="checkout.html">Cash on delivery</a><a href="checkout.html">WishMoney coming soon</a></div><div><h4>Join the list</h4><p class="muted">Receive the first-order code and new drop updates.</p><div class="footer-newsletter"><input placeholder="Email address"><button onclick="toast('Use code NITA10 for 10% off')">SIGN UP</button></div></div></footer><div class="copyright site-footer"><span>© 2026 Nita Style. All rights reserved.</span><span>Privacy Policy · Terms · Shipping</span></div>`}

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
function openSearch(){$('#searchPanel').classList.add('open');renderSearch();setTimeout(()=>$('#searchInput')?.focus(),100)} function closeSearch(){$('#searchPanel').classList.remove('open')}
function openCart(){renderCartPanel();$('#cartPanel').classList.add('open')} function closeCart(){$('#cartPanel').classList.remove('open')}
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
  <div class="account-hero"><div><p class="eyebrow">My account</p><h1>Welcome${user.firstName?' '+user.firstName:''}</h1><p class="muted">Manage your profile, saved delivery address, and orders.</p></div><button class="btn light" onclick="logoutUser()">LOG OUT</button></div>
  <div class="account-grid">
    <section class="card account-card"><h2>Personal information</h2><p class="muted">Your email is your login and cannot be edited.</p><div class="form-grid"><div><label>First name</label><input class="field" id="accFirst" value="${user.firstName||''}" placeholder="First name"></div><div><label>Last name</label><input class="field" id="accLast" value="${user.lastName||''}" placeholder="Last name"></div><div><label>Email address</label><input class="field disabled-field" value="${user.email}" disabled></div><div><label>Phone number</label><input class="field" id="accPhone" value="${user.phone||''}" placeholder="Phone number"></div></div><button class="btn" onclick="saveAccountInfo()">SAVE DETAILS</button></section>
    <section class="card account-card"><h2>Saved delivery address</h2>${accountAddressFields('accAddr_',addr)}<button class="btn" onclick="saveAccountAddress()">SAVE ADDRESS</button></section>
    <section class="card account-card full-span"><h2>Ongoing orders</h2><div class="orders-list">${accountOrdersHtml(ongoing,'No ongoing orders yet.')}</div></section>
    <section class="card account-card full-span"><h2>Previous orders</h2><div class="orders-list">${accountOrdersHtml(previous,'No previous orders yet.')}</div></section>
    <section class="card danger-zone full-span"><h2>Account control</h2><p class="muted">You can log out or delete the saved account from this browser.</p><button class="btn light" onclick="logoutUser()">LOG OUT</button><button class="btn danger" onclick="deleteAccount()">DELETE ACCOUNT</button></section>
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
    <section class="card danger-zone full-span"><h2>Account control</h2><p class="muted">You can log out or delete the saved account from this website.</p><button class="btn light" onclick="logoutUser()">LOG OUT</button><button class="btn danger" onclick="deleteAccount()">DELETE ACCOUNT</button></section>
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
    root.innerHTML = `<div class="account-hero clean-account-hero"><div><p class="eyebrow">My account</p><h1>Welcome${user.firstName?' '+safe(user.firstName):''}</h1><p class="muted">Manage your profile, saved delivery address, and orders.</p></div></div><div class="account-grid"><section class="card account-card"><h2>Personal information</h2><p class="muted">Your email is your login and cannot be edited.</p><div class="form-grid"><div><label>First name</label><input class="field" id="accFirst" value="${safe(user.firstName||'')}" placeholder="First name"></div><div><label>Last name</label><input class="field" id="accLast" value="${safe(user.lastName||'')}" placeholder="Last name"></div><div><label>Email address</label><input class="field disabled-field" value="${safe(user.email)}" disabled></div><div><label>Phone number</label><input class="field" id="accPhone" value="${safe(user.phone||'')}" placeholder="Phone number"></div></div><button class="btn" onclick="saveAccountInfo()">SAVE DETAILS</button></section><section class="card account-card"><h2>Saved delivery address</h2>${accountAddressFields('accAddr_',addr)}<button class="btn" onclick="saveAccountAddress()">SAVE ADDRESS</button></section><section class="card account-card full-span"><h2>Ongoing orders</h2><div class="orders-list">${accountOrdersHtml(ongoing,'No ongoing orders yet.')}</div></section><section class="card account-card full-span"><h2>Previous orders</h2><div class="orders-list">${accountOrdersHtml(previous,'No previous orders yet.')}</div></section><section class="card danger-zone full-span"><h2>Account control</h2><button class="btn light" onclick="logoutUser()">LOG OUT</button><button class="btn danger" onclick="deleteAccount()">DELETE ACCOUNT</button></section></div>`;
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
  const PERSIST_KEYS_FINAL=['nitaProducts','nitaOrders','nitaCoupons','nitaUsersByEmail','nitaDiscountUses'];
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
