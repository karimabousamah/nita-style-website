const defaultProducts = [
  {id:'p1',name:'Firenze Wide Pants',price:64,category:'Pants',collection:'Everyday Edit',sizes:['XS','S','M','L'],img:'linear-gradient(135deg,#f8f8f8,#d7d7d7)',desc:'Soft wide-leg pants selected for an elegant everyday silhouette.'},
  {id:'p2',name:'Capri Summer Dress',price:72,category:'Dresses',collection:'Summer Pieces',sizes:['S','M','L'],img:'linear-gradient(135deg,#ffffff,#ececec)',desc:'A light feminine dress for simple, polished summer styling.'},
  {id:'p3',name:'Verona Light Jacket',price:88,category:'Jackets',collection:'New Arrivals',sizes:['S','M'],img:'linear-gradient(135deg,#eeeeee,#cfcfcf)',desc:'A refined lightweight layer with a clean Italian-inspired cut.'},
  {id:'p4',name:'Torino Mini Bag',price:46,category:'Accessories',collection:'Accessories',sizes:['One Size'],img:'linear-gradient(135deg,#fafafa,#dddddd)',desc:'Minimal mini bag selected to complete everyday outfits.'},
  {id:'p5',name:'Milano Knit Top',price:52,category:'Tops',collection:'Everyday Edit',sizes:['XS','S','M','L'],img:'linear-gradient(135deg,#f7f7f7,#e5e5e5)',desc:'A clean knit top with a modern feminine fit.'},
  {id:'p6',name:'Roma Linen Shirt',price:58,category:'Tops',collection:'New Arrivals',sizes:['S','M','L'],img:'linear-gradient(135deg,#fff,#dcdcdc)',desc:'A breathable shirt for effortless weekday and weekend styling.'}
];

const NITA_PERSIST_KEYS = ['nitaProducts','nitaOrders','nitaCoupons','nitaUsersByEmail','nitaDiscountUses','nitaStockNotifications'];
let nitaStoreLoaded = false;
let nitaApplyingRemote = false;
let nitaBackendOnline = false;
const nitaPendingKeySaves = new Map();

function getProducts(){
  return JSON.parse(localStorage.getItem('nitaProducts')||'null') || defaultProducts;
}
function saveProducts(p){
  localStorage.setItem('nitaProducts', JSON.stringify(p));
  saveSharedKeyNow('nitaProducts', p);
}

function defaultSharedStore(){
  return {
    nitaProducts: defaultProducts,
    nitaOrders: [],
    nitaCoupons: [],
    nitaUsersByEmail: {},
    nitaDiscountUses: {},
    nitaStockNotifications: []
  };
}

function currentSharedStore(){
  const store = defaultSharedStore();
  NITA_PERSIST_KEYS.forEach(key => {
    const value = localStorage.getItem(key);
    if(value !== null){
      try { store[key] = JSON.parse(value); }
      catch { store[key] = value; }
    }
  });
  if(!Array.isArray(store.nitaProducts) || !store.nitaProducts.length) store.nitaProducts = defaultProducts;
  if(!Array.isArray(store.nitaOrders)) store.nitaOrders = [];
  if(!Array.isArray(store.nitaCoupons)) store.nitaCoupons = [];
  if(!store.nitaUsersByEmail || typeof store.nitaUsersByEmail !== 'object') store.nitaUsersByEmail = {};
  if(!store.nitaDiscountUses || typeof store.nitaDiscountUses !== 'object') store.nitaDiscountUses = {};
  if(!Array.isArray(store.nitaStockNotifications)) store.nitaStockNotifications = [];
  return store;
}

async function loadSharedStore(){
  if(nitaStoreLoaded) return currentSharedStore();
  try{
    const response = await fetch('/.netlify/functions/store?ts=' + Date.now(), { cache:'no-store' });
    if(response.ok){
      const remote = await response.json();
      nitaBackendOnline = true;
      nitaApplyingRemote = true;
      const fallback = defaultSharedStore();
      NITA_PERSIST_KEYS.forEach(key => {
        const value = remote[key] !== undefined ? remote[key] : fallback[key];
        localStorage.setItem(key, JSON.stringify(value));
      });
      nitaApplyingRemote = false;
    } else {
      console.warn('Nita shared store is not active yet. Status:', response.status);
    }
  }catch(error){
    console.warn('Shared store unavailable, using local browser copy:', error);
  }
  nitaApplyingRemote = false;
  nitaStoreLoaded = true;
  window.dispatchEvent(new CustomEvent('nita-store-ready'));
  return currentSharedStore();
}

async function saveSharedKeyNow(key, value){
  if(nitaApplyingRemote || !NITA_PERSIST_KEYS.includes(key)) return false;
  try{
    const parsedValue = value === undefined ? JSON.parse(localStorage.getItem(key) || 'null') : value;
    const response = await fetch('/.netlify/functions/store', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ key, value: parsedValue })
    });
    if(!response.ok){
      const text = await response.text();
      console.warn('Global save failed for', key, text);
      return false;
    }
    nitaBackendOnline = true;
    return true;
  }catch(error){
    console.warn('Could not save globally yet for', key, error);
    return false;
  }
}

function scheduleSharedKeySave(key){
  if(nitaApplyingRemote || !NITA_PERSIST_KEYS.includes(key)) return;
  clearTimeout(nitaPendingKeySaves.get(key));
  nitaPendingKeySaves.set(key, setTimeout(() => saveSharedKeyNow(key), 80));
}

async function saveSharedStoreNow(){
  const store = currentSharedStore();
  const results = await Promise.all(NITA_PERSIST_KEYS.map(key => saveSharedKeyNow(key, store[key])));
  return results.every(Boolean);
}

// Any old code that writes localStorage for products/orders/coupons/customers now also writes to the live Netlify database.
const nitaOriginalSetItem = Storage.prototype.setItem;
Storage.prototype.setItem = function(key, value){
  nitaOriginalSetItem.call(this, key, value);
  if(NITA_PERSIST_KEYS.includes(key)) scheduleSharedKeySave(key);
};
