// ================================================================
// IPL CRICKET PORTAL 2026 — PORTAL.JS (v7)
// ================================================================

const TEAM_COLORS = {
  MI:'#005DAB',CSK:'#FDB913',RCB:'#EC1C24',KKR:'#3A225D',
  DC:'#17479E',PBKS:'#ED1B24',RR:'#254AA5',SRH:'#F7A721',
  GT:'#1C1C74',LSG:'#A72B2A'
};

// ── Team logo element — uses local uploaded logos ──────────
function teamLogoEl(teamCode, size=48) {
  const c = TEAM_COLORS[teamCode] || '#666';
  const light = ['CSK','SRH'].includes(teamCode);
  const txt = light ? '#1a1a00' : '#ffffff';
  const localLogo = TEAM_LOGO_LOCAL ? TEAM_LOGO_LOCAL[teamCode] : null;
  return `<div style="
    width:${size}px;height:${size}px;border-radius:50%;
    overflow:hidden;border:2px solid ${c}88;
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;background:${c}22;box-shadow:0 2px 8px ${c}44">
    <img src="${localLogo||''}" alt="${teamCode}"
      style="width:100%;height:100%;object-fit:cover;border-radius:50%"
      onerror="this.style.display='none';this.parentElement.style.background='${c}';this.parentElement.innerHTML='<span style=\\'font-family:Oswald,sans-serif;font-weight:800;font-size:${Math.max(9,Math.round(size*0.28))}px;color:${txt};letter-spacing:0.5px\\'>${teamCode}</span>'">
  </div>`;
}

// ── Matches ────────────────────────────────────────────────────
const IPL_MATCHES=[
  {id:'m31',team1:'MI',  team2:'SRH', date:'27 Mar 2026',time:'7:30 PM IST',venue:'Wankhede Stadium, Mumbai',       matchNo:'Match 31',availability:'fast',    filled:72, prices:[{stand:'East Stand (General)',price:800},{stand:'West Stand (Premium)',price:2200},{stand:'VIP Corporate Box',price:8500}]},
  {id:'m32',team1:'RR',  team2:'DC',  date:'28 Mar 2026',time:'3:30 PM IST',venue:'Sawai Mansingh Stadium, Jaipur',  matchNo:'Match 32',availability:'available',filled:38, prices:[{stand:'North Stand (General)',price:700},{stand:'Premium Pavilion',price:1800},{stand:'VIP Corporate Box',price:7000}]},
  {id:'m33',team1:'CSK', team2:'KKR', date:'28 Mar 2026',time:'7:30 PM IST',venue:'MA Chidambaram Stadium, Chennai', matchNo:'Match 33',availability:'fast',    filled:88, prices:[{stand:'Anna Stand (General)',price:900},{stand:'Ladies Stand (Premium)',price:2500},{stand:'VIP Corporate Box',price:10000}]},
  {id:'m34',team1:'LSG', team2:'PBKS',date:'29 Mar 2026',time:'3:30 PM IST',venue:'Ekana Cricket Stadium, Lucknow',  matchNo:'Match 34',availability:'available',filled:41, prices:[{stand:'General Enclosure',price:600},{stand:'Premium Stand',price:1600},{stand:'VIP Corporate Box',price:6000}]},
  {id:'m35',team1:'GT',  team2:'RCB', date:'29 Mar 2026',time:'7:30 PM IST',venue:'Narendra Modi Stadium, Ahmedabad',matchNo:'Match 35',availability:'available',filled:55, prices:[{stand:'General Enclosure',price:750},{stand:'Premium Pavilion',price:2000},{stand:'VIP Corporate Box',price:8000}]},
  {id:'m36',team1:'SRH', team2:'MI',  date:'30 Mar 2026',time:'3:30 PM IST',venue:'Rajiv Gandhi Stadium, Hyderabad', matchNo:'Match 36',availability:'available',filled:48, prices:[{stand:'General Stand',price:700},{stand:'Deccan Pavilion',price:1900},{stand:'VIP Corporate Box',price:7500}]},
  {id:'m37',team1:'DC',  team2:'CSK', date:'30 Mar 2026',time:'7:30 PM IST',venue:'Arun Jaitley Stadium, Delhi',     matchNo:'Match 37',availability:'soldout', filled:100,prices:[{stand:'General Stand',price:1000},{stand:'Premium Upper Tier',price:3000},{stand:'VIP Corporate Box',price:12000}]},
  {id:'m38',team1:'KKR', team2:'RR',  date:'31 Mar 2026',time:'7:30 PM IST',venue:'Eden Gardens, Kolkata',           matchNo:'Match 38',availability:'fast',    filled:80, prices:[{stand:'Club House Stand',price:900},{stand:'B+C Block Premium',price:2400},{stand:'VIP Corporate Box',price:9500}]},
  {id:'m39',team1:'RCB', team2:'LSG', date:'1 Apr 2026', time:'7:30 PM IST',venue:'M Chinnaswamy Stadium, Bengaluru',matchNo:'Match 39',availability:'available',filled:60, prices:[{stand:'General Enclosure',price:850},{stand:'KSCA Premium',price:2200},{stand:'VIP Corporate Box',price:8800}]},
  {id:'m40',team1:'PBKS',team2:'GT',  date:'2 Apr 2026', time:'7:30 PM IST',venue:'PCA Stadium, Mohali',             matchNo:'Match 40',availability:'available',filled:44, prices:[{stand:'General Stand',price:650},{stand:'Premium Pavilion',price:1700},{stand:'VIP Corporate Box',price:6500}]},
  {id:'m41',team1:'MI',  team2:'RCB', date:'4 Apr 2026', time:'7:30 PM IST',venue:'Wankhede Stadium, Mumbai',        matchNo:'Match 41',availability:'soldout', filled:100,prices:[{stand:'East Stand (General)',price:1200},{stand:'West Stand (Premium)',price:3500},{stand:'VIP Corporate Box',price:15000}]},
  {id:'m42',team1:'CSK', team2:'RR',  date:'5 Apr 2026', time:'7:30 PM IST',venue:'MA Chidambaram Stadium, Chennai', matchNo:'Match 42',availability:'fast',    filled:77, prices:[{stand:'Anna Stand (General)',price:950},{stand:'Ladies Stand (Premium)',price:2600},{stand:'VIP Corporate Box',price:10500}]},
];

// ── Jerseys — team-colored jersey card images using CSS ────────
// Using picsum.photos seeded IDs for reliable images + team color overlay
// ── Local jersey images (real IPL 2026/2026 jerseys) ─────────
const JERSEY_IMG = {
  MI:   'images/jerseys/MI.png',
  CSK:  'images/jerseys/CSK.png',
  RCB:  'images/jerseys/RCB.jpg',
  KKR:  'images/jerseys/KKR.png',
  DC:   'images/jerseys/DC.jpg',
  PBKS: 'images/jerseys/PBKS.jpg',
  RR:   'images/jerseys/RR.jpg',
  SRH:  'images/jerseys/SRH.jpg',
  GT:   'images/jerseys/GT.jpg',
  LSG:  'images/jerseys/LSG.png',
};

// ── Local team logo images ───────────────────────────────────
const TEAM_LOGO_LOCAL = {
  MI:   'images/logos/MI.jpg',
  CSK:  'images/logos/CSK.jpg',
  RCB:  'images/logos/RCB.png',
  KKR:  'images/logos/KKR.png',
  DC:   'images/logos/DC.png',
  PBKS: 'images/logos/PBKS.jpg',
  RR:   'images/logos/RR.png',
  SRH:  'images/logos/SRH.jpg',
  GT:   'images/logos/GT.jpg',
  LSG:  'images/logos/LSG.jpg',
};

const JERSEYS=[
  {id:'j1', team:'MI',  name:'Mumbai Indians Home Jersey 2026',       price:1299,mrp:1799, imgAlt:'👕',sizes:['S','M','L','XL','XXL'],isNew:true, inStock:true },
  {id:'j2', team:'MI',  name:'Mumbai Indians Away Jersey 2026',        price:1299,mrp:1799, imgAlt:'👔',sizes:['XS','S','M','L','XL'], isNew:true, inStock:true },
  {id:'j3', team:'CSK', name:'Chennai Super Kings Yellow Jersey 2026', price:1199,mrp:1699, imgAlt:'👕',sizes:['S','M','L','XL','XXL'],isNew:true, inStock:true },
  {id:'j4', team:'CSK', name:'CSK Dhoni Captain Special Edition',      price:1899,mrp:2499, imgAlt:'⭐',sizes:['M','L','XL'],          isNew:true, inStock:true,  specialImg:'images/jerseys/CSK_special.png'},
  {id:'j5', team:'RCB', name:'RCB Home Jersey 2026',                   price:1299,mrp:1799, imgAlt:'👕',sizes:['S','M','L','XL','XXL'],isNew:true, inStock:true },
  {id:'j6', team:'RCB', name:'RCB Virat Kohli Signature Jersey',       price:1999,mrp:2699, imgAlt:'⭐',sizes:['S','M','L','XL'],      isNew:true, inStock:true,  specialImg:'images/jerseys/RCB_special.png'},
  {id:'j7', team:'KKR', name:'KKR Purple Jersey 2026',                 price:1199,mrp:1599, imgAlt:'👕',sizes:['XS','S','M','L','XL','XXL'],isNew:false,inStock:true},
  {id:'j8', team:'KKR', name:'KKR Russell Power Edition',              price:1699,mrp:2199, imgAlt:'💪',sizes:['M','L','XL','XXL'],   isNew:true, inStock:true,  specialImg:'images/jerseys/KKR_special.png'},
  {id:'j9', team:'DC',  name:'Delhi Capitals Blue Jersey 2026',        price:1099,mrp:1499, imgAlt:'👕',sizes:['S','M','L','XL'],      isNew:false,inStock:true },
  {id:'j10',team:'DC',  name:'DC KL Rahul Special Kit',                price:1599,mrp:2099, imgAlt:'⭐',sizes:['M','L','XL'],          isNew:true, inStock:true,  specialImg:'images/jerseys/DC_special.png'},
  {id:'j11',team:'PBKS',name:'Punjab Kings Red Jersey 2026',           price:1099,mrp:1499, imgAlt:'👕',sizes:['S','M','L','XL','XXL'],isNew:false,inStock:true },
  {id:'j12',team:'RR',  name:'Rajasthan Royals Pink Jersey 2026',      price:1199,mrp:1699, imgAlt:'👕',sizes:['XS','S','M','L','XL'], isNew:true, inStock:true },
  {id:'j13',team:'RR',  name:'RR Yashasvi Jaiswal Edition',            price:1799,mrp:2399, imgAlt:'⭐',sizes:['S','M','L','XL'],      isNew:true, inStock:true,  specialImg:'images/jerseys/RR_special.png'},
  {id:'j14',team:'SRH', name:'Sunrisers Hyderabad Orange 2026',        price:1199,mrp:1699, imgAlt:'👕',sizes:['S','M','L','XL','XXL'],isNew:false,inStock:true },
  {id:'j15',team:'SRH', name:'SRH Travis Head Batting Kit',            price:1699,mrp:2199, imgAlt:'⭐',sizes:['M','L','XL'],          isNew:true, inStock:true,  specialImg:'images/jerseys/SRH_special.png'},
  {id:'j16',team:'GT',  name:'Gujarat Titans Blue Jersey 2026',        price:1199,mrp:1699, imgAlt:'👕',sizes:['S','M','L','XL','XXL'],isNew:false,inStock:true },
  {id:'j17',team:'GT',  name:'GT Shubman Gill Captain Edition',        price:1899,mrp:2499, imgAlt:'⭐',sizes:['S','M','L','XL'],      isNew:true, inStock:true,  specialImg:'images/jerseys/GT_special.png'},
  {id:'j18',team:'LSG', name:'Lucknow Super Giants Teal Jersey',       price:1099,mrp:1499, imgAlt:'👕',sizes:['S','M','L','XL','XXL'],isNew:false,inStock:true },
  {id:'j19',team:'LSG', name:'LSG Rishabh Pant Captain Edition',       price:1999,mrp:2699, imgAlt:'⭐',sizes:['S','M','L','XL'],      isNew:true, inStock:true, specialImg:'images/jerseys/LSG_special.jpg'},
  {id:'j20',team:'MI',  name:'MI Kids Jersey 2026 (Ages 6–14)',        price:799, mrp:1099, imgAlt:'👦',sizes:['XS','S','M'],          isNew:true, inStock:true },
  {id:'j21',team:'CSK', name:'CSK Kids Jersey 2026',                   price:799, mrp:1099, imgAlt:'👧',sizes:['XS','S','M'],          isNew:true, inStock:true },
  {id:'j22',team:'RCB', name:"RCB Women's Fit Jersey 2026",            price:1199,mrp:1599, imgAlt:'👗',sizes:['XS','S','M','L'],      isNew:true, inStock:true },
];

// ── Merchandise — reliable image URLs per category ─────────────
const MERCH_IMGS = {
  bat:         'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=80',
  bat2:        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80',
  bat3:        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80',
  bat4:        'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400&q=80',
  signed:      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80',
  signed2:     'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
  signed3:     'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
  signed4:     'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
  watch:       'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
  bag:         'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
  sunglass:    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80',
  scarf:       'https://images.unsplash.com/photo-1586380951230-54d84eea0cec?w=400&q=80',
  trophy:      'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80',
  bobble:      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  bobble2:     'https://images.unsplash.com/photo-1587653263995-8bcbedc4b704?w=400&q=80',
  book:        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
};

const MERCHANDISE=[
  {id:'mc5', cat:'bats',        imgAlt:'🏏',name:'Virat Kohli Slazenger V500 Bat',          team:'RCB', price:4999, mrp:6999, desc:'Slazenger V500 English Willow bat with Virat Kohli autograph & India flag print',     limited:true },
  {id:'mc6', cat:'bats',        imgAlt:'🏏',name:'Rohit Sharma SS Vintage Bat',             team:'MI',  price:5499, mrp:7499, desc:'SS Vintage English Willow Grade 1 bat — Rohit Sharma signature edition, display ready',limited:true },
  {id:'mc7', cat:'bats',        imgAlt:'🏏',name:'CEAT Hitman Edition Bat',                 team:'MI',  price:1999, mrp:2799, desc:"Rohit Sharma's CEAT Hitman bat — full size with all-terrain grip, match standard",     limited:false},
  {id:'mc8', cat:'bats',        imgAlt:'🏏',name:'MRF Genius Grand Edition Bat',            team:'CSK', price:3499, mrp:4999, desc:'MRF Genius Grand Edition game-used bat with authentic player signature',               limited:true },
  {id:'mc9', cat:'signed',      imgAlt:'✍️',name:'Virat Kohli Signed India Jersey (Framed)',team:'RCB', price:24999,mrp:29999,desc:'India blue jersey signed by Virat Kohli — premium display frame with player photo',     limited:true },
  {id:'mc10',cat:'signed',      imgAlt:'✍️',name:'MS Dhoni SG Savage WK Gloves',           team:'CSK', price:18999,mrp:24999,desc:"Dhoni's SG Savage wicket-keeping gloves, hand-signed with certificate of authenticity",  limited:true },
  {id:'mc11',cat:'signed',      imgAlt:'✍️',name:'Jasprit Bumrah Signed Match Ball',        team:'MI',  price:7999, mrp:10999,desc:'Official white match cricket ball signed by Jasprit Bumrah with certificate',           limited:true },
  {id:'mc12',cat:'signed',      imgAlt:'✍️',name:'Rohit Sharma Signed Bat (Framed)',        team:'MI',  price:21999,mrp:27999,desc:'SS Vintage bat signed by Rohit Sharma in premium display frame with certificate',       limited:true },
  {id:'mc13',cat:'accessories', imgAlt:'⌚',name:'IPL Smart Wristband 2026',                team:null,  price:1299, mrp:1799, desc:'Smart fitness wristband with IPL team themes, heart rate & step tracking',             limited:false},
  {id:'mc14',cat:'accessories', imgAlt:'🎒',name:'MI Official Backpack 30L',               team:'MI',  price:1999, mrp:2799, desc:'30L official MI backpack, padded laptop sleeve, water bottle pocket, premium build',    limited:false},
  {id:'mc15',cat:'accessories', imgAlt:'🕶️',name:'Cricket UV400 Sports Sunglasses',        team:'RCB', price:899,  mrp:1299, desc:'UV400 polarised blue mirror sports sunglasses, wraparound frame for stadium cricket',   limited:false},
  {id:'mc16',cat:'accessories', imgAlt:'🧣',name:'CSK Official Fan Scarf',                  team:'CSK', price:599,  mrp:799,  desc:'Official CSK yellow & blue fan scarf — "Chennai Super Kings" printed text, fringe ends',limited:false},
  {id:'mc17',cat:'collectibles',imgAlt:'🏆',name:'IPL Trophy Replica Set (3 Sizes)',        team:null,  price:3499, mrp:4999, desc:'Set of 3 gold-plated IPL trophy replicas — large, medium, small with blue ribbons',    limited:true },
  {id:'mc18',cat:'collectibles',imgAlt:'🪆',name:'MS Dhoni Cricketer Bobblehead',          team:'CSK', price:1299, mrp:1799, desc:'Hand-painted MS Dhoni bobblehead in India blue kit with bat & ball, 18cm figurine',    limited:true },
  {id:'mc19',cat:'collectibles',imgAlt:'🪆',name:'Virat Kohli Bobblehead Figurine',        team:'RCB', price:1299, mrp:1799, desc:'Virat Kohli collectible figurine — India jersey, sitting pose on "VIRAT KOHLI" base',   limited:true },
  {id:'mc20',cat:'collectibles',imgAlt:'📸',name:'IPL All Team Fan Paddle Set',             team:null,  price:1799, mrp:2499, desc:'Set of 10 IPL team fan paddles — all teams with logos, perfect for stadium support',    limited:false},
];

// ── Merch image map — local uploaded real product images ────────
const MERCH_IMG_MAP = {
  mc5:  'images/merch/mc5_vk_bat.png',
  mc6:  'images/merch/mc6_rohit_bat.jpg',
  mc7:  'images/merch/mc7_mini_bat.jpg',
  mc8:  'images/merch/mc8_dhoni_bat.png',
  mc9:  'images/merch/mc9_vk_signed_jersey.jpg',
  mc10: 'images/merch/mc10_dhoni_gloves.jpg',
  mc11: 'images/merch/mc11_bumrah_ball.jpg',
  mc12: 'images/merch/mc12_rohit_signed_bat.png',
  mc13: 'images/merch/mc13_wristband.jpg',
  mc14: 'images/merch/mc14_backpack.jpg',
  mc15: 'images/merch/mc15_sunglasses.jpg',
  mc16: 'images/merch/mc16_scarf.jpg',
  mc17: 'images/merch/mc17_trophy.jpg',
  mc18: 'images/merch/mc18_dhoni_bobble.jpg',
  mc19: 'images/merch/mc19_vk_bobble.jpg',
  mc20: 'images/merch/mc20_photobook.jpg',
};

// ================================================================
// TOAST
// ================================================================
let toastTimer = null;
function showToast(msg, type='info') {
  const t = document.getElementById('toast'); if(!t) return;
  t.textContent = msg; t.className = `toast show ${type}`;
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>{ t.className='toast'; }, 3000);
}

// ================================================================
// CART SYSTEM
// ================================================================
let cart = [];
try { cart = JSON.parse(localStorage.getItem('ipl_cart_v5') || '[]'); } catch(e) { cart = []; }

const COUPONS = {
  IPL25:    { type:'percent', val:25, label:'25% OFF' },
  CRICKET10:{ type:'percent', val:10, label:'10% OFF' },
  FLAT500:  { type:'flat',    val:500, label:'₹500 OFF' },
  NEWUSER:  { type:'percent', val:15, label:'15% OFF' },
};
let activeCoupon = null;

function saveCart(){localStorage.setItem('ipl_cart_v5',JSON.stringify(cart));updateCartBadge();}

function updateCartBadge(){
  const count=cart.reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll('#cart-count,#jersey-cart-count,#merch-cart-count').forEach(el=>{if(el)el.textContent=count;});
  const badge=document.getElementById('cart-count');
  if(badge){badge.classList.remove('bump');void badge.offsetWidth;badge.classList.add('bump');setTimeout(()=>badge.classList.remove('bump'),300);}
}

function addToCart(item){
  const key=item.id+'_'+(item.variant||'');
  const ex=cart.find(c=>(c.id+'_'+(c.variant||''))===key);
  if(ex) ex.qty++;
  else cart.push({...item,qty:1});
  saveCart();renderCartItems();
  showToast(`🛒 ${item.name} added to cart!`,'success');
  // Open cart after short delay so toast is visible
  setTimeout(openCart, 400);
}

function removeCartItem(id,variant){
  cart=cart.filter(c=>!(c.id===id&&(c.variant||'')===(variant||'')));
  saveCart();renderCartItems();
}

function changeCartQty(id,variant,d){
  const item=cart.find(c=>c.id===id&&(c.variant||'')===(variant||''));
  if(!item)return;
  item.qty=Math.max(0,item.qty+d);
  if(item.qty===0) removeCartItem(id,variant);
  else{saveCart();renderCartItems();}
}

function renderCartItems(){
  const list=document.getElementById('cart-items-list');
  const footer=document.getElementById('cart-footer');
  if(!list)return;
  if(!cart.length){
    list.innerHTML='<div class="cart-empty">🛒 Your cart is empty<br><small style="color:var(--text-muted);font-size:0.75rem;margin-top:6px;display:block">Browse jerseys, merch or book tickets</small></div>';
    if(footer)footer.style.display='none';return;
  }
  if(footer)footer.style.display='block';
  const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const discount=getCouponDiscount(subtotal);
  const total=subtotal-discount;
  list.innerHTML=cart.map(item=>`
    <div class="cart-item">
      <div class="ci-icon">${item.emoji||'🛍️'}</div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-meta">${item.variant||''}</div>
        <div class="ci-qty-row">
          <button class="ci-qty-btn" onclick="changeCartQty('${item.id}','${item.variant||''}',-1)">−</button>
          <span class="ci-qty">${item.qty}</span>
          <button class="ci-qty-btn" onclick="changeCartQty('${item.id}','${item.variant||''}',1)">+</button>
          <span class="ci-remove" onclick="removeCartItem('${item.id}','${item.variant||''}')">✕</span>
        </div>
      </div>
      <div class="ci-price">₹${(item.price*item.qty).toLocaleString()}</div>
    </div>`).join('');
  const discRow=document.getElementById('cart-discount-row');
  if(discRow) discRow.style.display=discount>0?'flex':'none';
  [['cart-subtotal-val',`₹${subtotal.toLocaleString()}`],['cart-discount-val',`-₹${discount.toLocaleString()}`],['cart-total-val',`₹${total.toLocaleString()}`]].forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.textContent=v;});
}

function getCouponDiscount(s){if(!activeCoupon)return 0;const c=COUPONS[activeCoupon];if(!c)return 0;return c.type==='percent'?Math.round(s*c.val/100):Math.min(c.val,s);}
function applyCoupon(){
  const code=(document.getElementById('coupon-input')?.value||'').trim().toUpperCase();
  if(COUPONS[code]){activeCoupon=code;showToast(`🎉 Coupon ${code} applied!`,'success');renderCartItems();}
  else showToast('❌ Invalid. Try: IPL25, CRICKET10, FLAT500, NEWUSER','error');
}

function openCart(){
  document.getElementById('cart-sidebar')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
  renderCartItems();
}
function closeCart(){
  document.getElementById('cart-sidebar')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
}

// ================================================================
// SIZE PICKER MODAL — ADD/CART for jerseys (→ add to cart)
// ================================================================
let sizePick={jid:null,size:null,qty:1};

function openAddJersey(jid){
  const j=JERSEYS.find(x=>x.id===jid);
  if(!j||!j.inStock)return;
  sizePick={jid,size:j.sizes[0],qty:1};
  renderSizePicker();
  document.getElementById('buyNow-modal').classList.add('open');
  document.body.style.overflow='hidden';
}

function renderSizePicker(){
  const j=JERSEYS.find(x=>x.id===sizePick.jid);
  if(!j)return;
  const tc=TEAM_COLORS[j.team]||'#888';
  document.getElementById('buyNow-modal-inner').innerHTML=`
    <div class="tbm-header">
      <div style="font-size:0.75rem;color:var(--accent-gold);font-family:Space Mono,monospace;letter-spacing:1px;margin-bottom:4px">ADD TO CART</div>
      <div class="tbm-match-title" style="font-size:1.2rem">${j.img} ${j.name}</div>
      <div class="tbm-meta">${IPL_2026[j.team]?.name||j.team} · Official BCCI Licensed · ₹${j.price.toLocaleString()}</div>
    </div>
    <div class="checkout-steps" style="margin-bottom:1.25rem">
      <div class="cs-step active">1 Pick Size</div>
      <div class="cs-step">2 Added to Cart</div>
    </div>
    <div class="tbm-section-title">SELECT YOUR SIZE</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1rem">
      ${j.sizes.map(s=>`<button class="size-pick-btn${s===sizePick.size?' selected':''}" onclick="spSelectSize('${s}')">${s}</button>`).join('')}
    </div>
    <div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:1.25rem">📏 Size guide: XS=34, S=36, M=38, L=40, XL=42, XXL=44 (chest inches)</div>
    <div class="tbm-qty-row">
      <span class="qty-label">Quantity:</span>
      <div class="qty-controls">
        <button class="qty-btn" onclick="spQty(-1)">−</button>
        <span class="qty-val">${sizePick.qty}</span>
        <button class="qty-btn" onclick="spQty(1)">+</button>
      </div>
    </div>
    <div class="pay-summary-box">
      <div class="pay-row"><span>${j.name} · Size ${sizePick.size} × ${sizePick.qty}</span><span>₹${(j.price*sizePick.qty).toLocaleString()}</span></div>
      <div class="pay-row"><span>Delivery</span><span style="color:var(--accent-green)">${j.price*sizePick.qty>=999?'FREE':'₹49'}</span></div>
      <div class="pay-row grand"><span>TOTAL</span><span>₹${(j.price*sizePick.qty+(j.price*sizePick.qty<999?49:0)).toLocaleString()}</span></div>
    </div>
    <div style="display:flex;gap:8px;margin-top:0.5rem">
      <button class="tbm-add-cart-btn" style="background:var(--bg-card3);color:var(--text-secondary);flex:0.4" onclick="closePayModal()">CANCEL</button>
      <button class="tbm-add-cart-btn" style="flex:1" onclick="spConfirmAdd()">🛒 ADD TO CART →</button>
    </div>`;
}

window.spSelectSize=(s)=>{sizePick.size=s;renderSizePicker();};
window.spQty=(d)=>{sizePick.qty=Math.max(1,Math.min(10,sizePick.qty+d));renderSizePicker();};
window.spConfirmAdd=()=>{
  const j=JERSEYS.find(x=>x.id===sizePick.jid);
  if(!j)return;
  closePayModal();
  addToCart({id:j.id,name:j.name,variant:`${j.team} · Size: ${sizePick.size}`,emoji:j.img,price:j.price,qty:sizePick.qty});
};

// ================================================================
// QTY PICKER — ADD/CART for merch (→ add to cart)
// ================================================================
let merchPick={mid:null,qty:1};

function openAddMerch(mid){
  const m=MERCHANDISE.find(x=>x.id===mid);
  if(!m)return;
  merchPick={mid,qty:1};
  renderMerchPicker();
  document.getElementById('buyNow-modal').classList.add('open');
  document.body.style.overflow='hidden';
}

function renderMerchPicker(){
  const m=MERCHANDISE.find(x=>x.id===merchPick.mid);
  if(!m)return;
  document.getElementById('buyNow-modal-inner').innerHTML=`
    <div class="tbm-header">
      <div style="font-size:0.75rem;color:var(--accent-gold);font-family:Space Mono,monospace;letter-spacing:1px;margin-bottom:4px">ADD TO CART</div>
      <div class="tbm-match-title" style="font-size:1.2rem">${m.img} ${m.name}</div>
      <div class="tbm-meta">${m.desc}</div>
    </div>
    <div class="checkout-steps" style="margin-bottom:1.25rem">
      <div class="cs-step active">1 Choose Qty</div>
      <div class="cs-step">2 Added to Cart</div>
    </div>
    <div class="tbm-qty-row">
      <span class="qty-label">Quantity:</span>
      <div class="qty-controls">
        <button class="qty-btn" onclick="mpQty(-1)">−</button>
        <span class="qty-val">${merchPick.qty}</span>
        <button class="qty-btn" onclick="mpQty(1)">+</button>
      </div>
    </div>
    <div class="pay-summary-box">
      <div class="pay-row"><span>${m.name} × ${merchPick.qty}</span><span>₹${(m.price*merchPick.qty).toLocaleString()}</span></div>
      <div class="pay-row"><span>Delivery</span><span style="color:var(--accent-green)">${m.price*merchPick.qty>=999?'FREE':'₹49'}</span></div>
      <div class="pay-row grand"><span>TOTAL</span><span>₹${(m.price*merchPick.qty+(m.price*merchPick.qty<999?49:0)).toLocaleString()}</span></div>
    </div>
    <div style="display:flex;gap:8px;margin-top:0.5rem">
      <button class="tbm-add-cart-btn" style="background:var(--bg-card3);color:var(--text-secondary);flex:0.4" onclick="closePayModal()">CANCEL</button>
      <button class="tbm-add-cart-btn" style="flex:1" onclick="mpConfirmAdd()">🛒 ADD TO CART →</button>
    </div>`;
}

window.mpQty=(d)=>{merchPick.qty=Math.max(1,Math.min(10,merchPick.qty+d));renderMerchPicker();};
window.mpConfirmAdd=()=>{
  const m=MERCHANDISE.find(x=>x.id===merchPick.mid);
  if(!m)return;
  closePayModal();
  addToCart({id:m.id,name:m.name,variant:m.cat,emoji:m.img,price:m.price,qty:merchPick.qty});
};

// ================================================================
// BUY NOW — Full 4-step payment flow (jerseys & merch)
// ================================================================
let buyNowState={type:null,itemId:null,size:null,qty:1,step:1,item:null};

function openBuyNow(type,itemId){
  const item=(type==='jersey'?JERSEYS:MERCHANDISE).find(x=>x.id===itemId);
  if(!item)return;
  buyNowState={type,itemId,size:type==='jersey'?item.sizes[0]:null,qty:1,step:1,item};
  renderBuyNow();
  document.getElementById('buyNow-modal').classList.add('open');
  document.body.style.overflow='hidden';
}

function getBuyNowImageHtml(item, type){
  if(type==='jersey'){
    const url = item.specialImg || JERSEY_IMG[item.team] || '';
    if(url) return `<img src="${url}" alt="${item.name}" style="width:100px;height:100px;object-fit:contain;border-radius:12px;box-shadow:0 10px 20px rgba(0,0,0,0.2);">`;
  }
  const url = MERCH_IMG_MAP[item.id] || '';
  if(url) return `<img src="${url}" alt="${item.name}" style="width:100px;height:100px;object-fit:contain;border-radius:12px;box-shadow:0 10px 20px rgba(0,0,0,0.2);">`;
  return `<span style="font-size:3rem">${item.img||'📦'}</span>`;
}

function renderBuyNow(){
  const{type,item,size,qty,step}=buyNowState;
  if(!item)return;
  const steps4=['1 Options','2 Details','3 Payment','4 Confirmed'];
  const stepsHtml=steps4.map((s,i)=>`<div class="cs-step ${i+1===step?'active':i+1<step?'done':''}">${s}</div>`).join('');
  const total=item.price*qty;
  const delivery=total<999?49:0;
  const grand=total+delivery;
  let body='';

  if(step===1){
    body=`
      <div style="display:flex;gap:1rem;align-items:center;background:var(--bg-deep);border-radius:8px;padding:1rem;margin-bottom:1rem">
        ${getBuyNowImageHtml(item, type)}
        <div><div style="font-weight:700">${item.name}</div><div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">${type==='jersey'?(IPL_2026[item.team]?.name||item.team):(item.desc||'')}</div><div style="color:var(--accent-gold);font-family:Space Mono,monospace;font-weight:700;margin-top:4px">₹${item.price.toLocaleString()}</div></div>
      </div>
      ${type==='jersey'?`
        <div class="tbm-section-title">SELECT SIZE</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1rem">${item.sizes.map(s=>`<button class="size-pick-btn${s===size?' selected':''}" onclick="bnSelectSize('${s}')">${s}</button>`).join('')}</div>
        <div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:0.75rem">📏 XS=34, S=36, M=38, L=40, XL=42, XXL=44 (chest inches)</div>`:''}
      <div class="tbm-qty-row"><span class="qty-label">Quantity:</span><div class="qty-controls"><button class="qty-btn" onclick="bnQty(-1)">−</button><span class="qty-val">${qty}</span><button class="qty-btn" onclick="bnQty(1)">+</button></div></div>
      <div class="pay-summary-box">
        <div class="pay-row"><span>${item.name}${size?' · Size '+size:''} × ${qty}</span><span>₹${total.toLocaleString()}</span></div>
        <div class="pay-row"><span>Delivery</span><span style="color:var(--accent-green)">${delivery===0?'FREE':'₹'+delivery}</span></div>
        <div class="pay-row grand"><span>TOTAL</span><span>₹${grand.toLocaleString()}</span></div>
      </div>
      <button class="tbm-add-cart-btn" onclick="bnStep(2)">CONTINUE — ENTER DETAILS →</button>`;
  } else if(step===2){
    body=`
      <div class="tbm-section-title">DELIVERY DETAILS</div>
      <div class="checkout-form">
        <div class="checkout-two-col"><div class="form-field"><label>First Name *</label><input id="bn-fname" placeholder="Rahul" inputmode="text" oninput="sanitizeNameInput(this)"></div><div class="form-field"><label>Last Name *</label><input id="bn-lname" placeholder="Sharma" inputmode="text" oninput="sanitizeNameInput(this)"></div></div>
        <div class="form-field"><label>Email Address *</label><input id="bn-email" placeholder="you@email.com" type="email"></div>
        <div class="form-field"><label>Phone *</label><input id="bn-phone" placeholder="+91 98765 43210" type="tel" inputmode="tel" oninput="sanitizePhoneInput(this)"></div>
        <div class="form-field"><label>Full Delivery Address *</label><input id="bn-addr" placeholder="Flat No., Building, Street, City — PIN Code"></div>
        <div class="form-field"><label>State</label><select id="bn-state"><option>Maharashtra</option><option>Tamil Nadu</option><option>Karnataka</option><option>Delhi</option><option>West Bengal</option><option>Rajasthan</option><option>Gujarat</option><option>Telangana</option><option>Punjab</option><option>Uttar Pradesh</option><option>Other</option></select></div>
      </div>
      <div class="pay-summary-box" style="font-size:0.78rem;color:var(--text-muted)">📦 ${item.name}${size?' · Size '+size:''} · Qty ${qty} · Total ₹${grand.toLocaleString()}</div>
      <div style="display:flex;gap:8px"><button class="tbm-add-cart-btn" style="background:var(--bg-card3);color:var(--text-secondary);flex:0.4" onclick="bnStep(1)">← BACK</button><button class="tbm-add-cart-btn" style="flex:1" onclick="bnStep(3)">CONTINUE TO PAYMENT →</button></div>`;
  } else if(step===3){
    body=`
      <div class="tbm-section-title">CHOOSE PAYMENT METHOD</div>
      <div class="payment-methods">
        <div class="pm-option selected" onclick="selectPM(this)"><span class="pm-icon">💳</span>Credit / Debit Card</div>
        <div class="pm-option" onclick="selectPM(this)"><span class="pm-icon">📱</span>UPI / GPay / PhonePe</div>
        <div class="pm-option" onclick="selectPM(this)"><span class="pm-icon">🏦</span>Net Banking</div>
      </div>
      <div class="checkout-form" style="margin-top:0.75rem">
        <div class="form-field"><label>Card Number</label><input placeholder="4242 4242 4242 4242" maxlength="19" oninput="fmtCard(this)"></div>
        <div class="checkout-two-col"><div class="form-field"><label>MM/YY</label><input placeholder="12/27" maxlength="5"></div><div class="form-field"><label>CVV</label><input placeholder="•••" maxlength="3" type="password"></div></div>
        <div class="form-field"><label>Name on Card</label><input placeholder="RAHUL SHARMA"></div>
      </div>
      <div class="pay-summary-box">
        <div class="pay-row"><span>${item.name}${size?' · '+size:''} × ${qty}</span><span>₹${total.toLocaleString()}</span></div>
        <div class="pay-row"><span>Delivery</span><span style="color:var(--accent-green)">${delivery===0?'FREE':'₹'+delivery}</span></div>
        <div class="pay-row grand"><span>TOTAL</span><span>₹${grand.toLocaleString()}</span></div>
      </div>
      <div style="display:flex;gap:8px"><button class="tbm-add-cart-btn" style="background:var(--bg-card3);color:var(--text-secondary);flex:0.4" onclick="bnStep(2)">← BACK</button><button class="tbm-add-cart-btn" style="flex:1" onclick="bnStep(4)">🔒 PAY ₹${grand.toLocaleString()} SECURELY →</button></div>`;
  } else if(step===4){
    const orderId=type[0].toUpperCase()+'RS-'+Math.random().toString(36).slice(2,8).toUpperCase();
    saveOrderToUser({
      orderId, emoji:item.img,
      name: item.name+(size?' (Size: '+size+')':''),
      category: type==='jersey'?'Jersey':'Merchandise',
      team: item.team||'—', size: size||'—', qty, amount:grand,
      unitPrice: item.price,
      date: new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}),
      status:'Processing'
    }, false);
    body=`
      <div class="order-success-box">
        <span class="success-icon">✅</span>
        <h3 style="font-family:Oswald,sans-serif;font-size:1.5rem;letter-spacing:1px;margin-bottom:0.5rem">ORDER CONFIRMED!</h3>
        <p style="color:var(--text-secondary);margin-bottom:0.75rem">${item.name}${size?' · Size: '+size:''} · Qty: ${qty}</p>
        <div class="order-id">Order ID: ${orderId}</div>
        <div class="pay-summary-box" style="text-align:left;margin:0.75rem 0">
          <div class="pay-row"><span>${type==='jersey'?'Size':'Category'}</span><span>${size||item.cat||'—'}</span></div>
          <div class="pay-row"><span>Quantity</span><span>${qty}</span></div>
          ${delivery>0?`<div class="pay-row"><span>Delivery</span><span>₹${delivery}</span></div>`:'<div class="pay-row"><span>Delivery</span><span style="color:var(--accent-green)">FREE</span></div>'}
          <div class="pay-row grand"><span>AMOUNT PAID</span><span>₹${grand.toLocaleString()}</span></div>
        </div>
        ${(()=>{const _d=buildOrderQRData(orderId,{item:item.name,date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}),size:size||item.cat||'—',qty,unitPrice:'₹'+item.price.toLocaleString(),delivery:delivery===0?'FREE':'₹'+delivery,total:'₹'+grand.toLocaleString(),isJersey:type==='jersey'});return qrBlock(orderId,type==='jersey'?'jersey_order':'merch_order',_d.text,_d.userName);})()}
        <p style="font-size:0.78rem;color:var(--text-muted)">📧 Confirmation sent to your email · 🚚 Delivery in 3–5 business days · Show QR for delivery verification</p>
        <div style="display:flex;gap:8px;margin-top:1.25rem;justify-content:center;flex-wrap:wrap">
          <button class="tbm-add-cart-btn" style="max-width:160px;background:var(--bg-card3);color:var(--text-secondary)" onclick="closePayModal()">CLOSE</button>
          <button class="tbm-add-cart-btn" style="max-width:200px" onclick="closePayModal();switchSection('myaccount',null)">👤 MY ACCOUNT →</button>
        </div>
      </div>`;
  }

  const hdr=type==='jersey'
    ?`<div class="tbm-header"><div class="tbm-match-title">👕 BUY NOW — ${item.team}</div><div class="tbm-meta">Official BCCI Licensed Jersey</div></div>`
    :`<div class="tbm-header"><div class="tbm-match-title">🛍️ BUY NOW</div><div class="tbm-meta">IPL Official Merchandise</div></div>`;

  document.getElementById('buyNow-modal-inner').innerHTML=`${step<4?hdr:''}<div class="checkout-steps" style="margin-bottom:1.5rem">${stepsHtml}</div>${body}`;
}

window.bnSelectSize=(s)=>{buyNowState.size=s;renderBuyNow();};
window.bnQty=(d)=>{buyNowState.qty=Math.max(1,Math.min(10,buyNowState.qty+d));renderBuyNow();};
window.bnStep=(s)=>{ if(s===3 && !validateBuyNowDetails()) return; buyNowState.step=s; renderBuyNow(); };
window.selectPM=(el)=>{document.querySelectorAll('.pm-option').forEach(b=>b.classList.remove('selected'));el.classList.add('selected');};
window.fmtCard=(el)=>{el.value=el.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().slice(0,19);};

// ================================================================
// TICKET BOOKING — 5-step flow with STADIUM SEAT MAP
// ================================================================

// ================================================================
// TICKET BOOKING — 3-STEP: Stand → Seat Map (3 sub-steps) → Details
// ================================================================
let ticketState={matchId:null,stand:null,qty:1,step:1,zone:null,block:null,selectedSeats:[],seats:null,seatStep:1};

const STADIUM_ZONES={
  'East Stand (General)'   :{color:'#22c55e',blocks:['E1','E2','E3','E4'],rows:8,cols:20},
  'West Stand (Premium)'   :{color:'#0ea5e9',blocks:['W1','W2','W3'],rows:6,cols:16},
  'North Stand (General)'  :{color:'#22c55e',blocks:['N1','N2','N3','N4'],rows:8,cols:20},
  'South Stand (General)'  :{color:'#22c55e',blocks:['S1','S2','S3','S4'],rows:8,cols:20},
  'Anna Stand (General)'   :{color:'#22c55e',blocks:['A1','A2','A3','A4'],rows:8,cols:20},
  'General Enclosure'      :{color:'#22c55e',blocks:['G1','G2','G3','G4'],rows:8,cols:22},
  'General Stand'          :{color:'#22c55e',blocks:['G1','G2','G3','G4'],rows:8,cols:22},
  'Club House Stand'       :{color:'#a855f7',blocks:['C1','C2','C3'],rows:5,cols:14},
  'Premium Pavilion'       :{color:'#0ea5e9',blocks:['P1','P2','P3'],rows:6,cols:16},
  'Premium Upper Tier'     :{color:'#0ea5e9',blocks:['PU1','PU2'],rows:6,cols:16},
  'KSCA Premium'           :{color:'#0ea5e9',blocks:['KP1','KP2','KP3'],rows:6,cols:16},
  'Deccan Pavilion'        :{color:'#0ea5e9',blocks:['DP1','DP2','DP3'],rows:6,cols:16},
  'B+C Block Premium'      :{color:'#0ea5e9',blocks:['B1','B2','C1','C2'],rows:6,cols:16},
  'Ladies Stand (Premium)' :{color:'#ec4899',blocks:['L1','L2','L3'],rows:5,cols:14},
  'VIP Corporate Box'      :{color:'#f59e0b',blocks:['VIP-A','VIP-B','VIP-C'],rows:3,cols:8},
};
function getZoneDef(stand){
  if(STADIUM_ZONES[stand]) return STADIUM_ZONES[stand];
  for(const[k,v] of Object.entries(STADIUM_ZONES)){
    if(stand.includes(k.split(' ')[0])) return v;
  }
  return {color:'#22c55e',blocks:['A','B','C','D'],rows:8,cols:20};
}

function generateBlockSeats(block,rows,cols){
  const bookedPct=block.startsWith('VIP')?0.2:0.45;
  const seats=[];
  for(let r=0;r<rows;r++){
    const rl=String.fromCharCode(65+r);
    for(let c=1;c<=cols;c++){
      seats.push({id:`${block}-${rl}${c}`,row:rl,col:c,booked:Math.random()<bookedPct});
    }
  }
  return seats;
}

// ── STADIUM ZONE MAP (sub-step 1) ────────────────────────────
function buildStadiumZoneMap(m,stand,zd,qty,price){
  const allPrices=m.prices;
  // SVG cricket ground with coloured stands
  const cx=240,cy=190,fw=120,fh=75;
  const zones=[
    {id:'north', label:'NORTH',   x:cx,   y:cy-160, w:160, h:50,  rx:8,  ry:0,  transform:`translate(${cx-80},${cy-170})`, color:'#22c55e', stands:allPrices.filter(p=>p.stand.includes('North')||p.stand.includes('Anna')||p.stand.includes('General')||p.stand.includes('Enclosure'))},
    {id:'south', label:'SOUTH',   x:cx,   y:cy+120, w:160, h:50,  rx:8,  ry:0,  transform:`translate(${cx-80},${cy+118})`, color:'#22c55e', stands:allPrices.filter(p=>p.stand.includes('South'))},
    {id:'east',  label:'EAST',    x:cx+150,y:cy,    w:55,  h:120, rx:0,  ry:8,  transform:`translate(${cx+148},${cy-60})`,  color:'#22c55e', stands:allPrices.filter(p=>p.stand.includes('East')||p.stand.includes('B+C'))},
    {id:'west',  label:'WEST',    x:cx-200,y:cy,    w:55,  h:120, rx:0,  ry:8,  transform:`translate(${cx-200},${cy-60})`,  color:'#0ea5e9', stands:allPrices.filter(p=>p.stand.includes('West')||p.stand.includes('Premium')||p.stand.includes('Pavilion')||p.stand.includes('KSCA')||p.stand.includes('Club')||p.stand.includes('Deccan'))},
    {id:'ladies',label:'LADIES',  x:cx-80, y:cy-160,w:60,  h:40,  rx:4,  ry:0,  transform:`translate(${cx-80},${cy-165})`, color:'#ec4899', stands:allPrices.filter(p=>p.stand.includes('Ladies'))},
    {id:'vip',   label:'VIP',     x:cx+20, y:cy+118,w:60,  h:40,  rx:4,  ry:0,  transform:`translate(${cx+20},${cy+118})`,  color:'#f59e0b', stands:allPrices.filter(p=>p.stand.includes('VIP'))},
  ];

  const svgZones=zones.map(z=>{
    if(!z.stands.length) return '';
    const isActive=z.stands.some(s=>s.stand===stand);
    const opacity=isActive?1:0.5;
    const strokeW=isActive?3:1.5;
    const w=z.id==='east'||z.id==='west'?55:160;
    const h=z.id==='east'||z.id==='west'?120:50;
    const rx=z.id==='east'||z.id==='west'?0:8;
    const ry=z.id==='east'||z.id==='west'?8:0;
    return `<g transform="${z.transform}" style="cursor:pointer" onclick="tsSelectZone('${z.id}')">
      <rect width="${w}" height="${h}" rx="${rx}" ry="${ry}"
        fill="${z.color}" fill-opacity="${opacity*0.75}"
        stroke="${z.color}" stroke-width="${strokeW}" stroke-opacity="${opacity}"/>
      <text x="${w/2}" y="${h/2-4}" text-anchor="middle" dominant-baseline="middle"
        style="font-family:Oswald,sans-serif;font-size:11px;font-weight:700;fill:#fff;letter-spacing:1px;text-shadow:0 1px 3px #000">${z.label}</text>
      <text x="${w/2}" y="${h/2+10}" text-anchor="middle" dominant-baseline="middle"
        style="font-family:Space Mono,monospace;font-size:8px;fill:rgba(255,255,255,0.85)">₹${z.stands[0]?.price?.toLocaleString()||''}</text>
    </g>`;
  }).join('');

  return `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div>
        <div style="font-family:Oswald,sans-serif;font-size:1rem;font-weight:700;color:#fff;letter-spacing:1px">SELECT YOUR ZONE</div>
        <div style="font-size:0.68rem;color:var(--text-muted);margin-top:2px">Tap a stand to choose your section</div>
      </div>
      <div style="font-family:Space Mono,monospace;font-size:0.7rem;color:var(--accent-gold)">${qty} ticket${qty>1?'s':''}</div>
    </div>

    <!-- SVG Stadium Map -->
    <div style="background:#030810;border-radius:14px;border:1px solid #1e3a5f;padding:12px;overflow:hidden;margin-bottom:14px">
      <svg width="100%" viewBox="0 0 480 380" style="display:block">
        <!-- Outer stadium oval -->
        <ellipse cx="${cx}" cy="${cy}" rx="210" ry="165" fill="none" stroke="#1e3a5f" stroke-width="12" stroke-opacity="0.8"/>
        <!-- Field -->
        <ellipse cx="${cx}" cy="${cy}" rx="140" ry="105" fill="rgba(0,100,30,0.35)" stroke="rgba(0,200,80,0.3)" stroke-width="1.5"/>
        <!-- Pitch rectangle -->
        <rect x="${cx-18}" y="${cy-50}" width="36" height="100" rx="4" fill="rgba(180,160,80,0.3)" stroke="rgba(200,180,80,0.4)" stroke-width="1"/>
        <!-- Pitch crease lines -->
        <line x1="${cx-14}" y1="${cy-35}" x2="${cx+14}" y2="${cy-35}" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
        <line x1="${cx-14}" y1="${cy+35}" x2="${cx+14}" y2="${cy+35}" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
        <!-- GROUND label -->
        <text x="${cx}" y="${cy+4}" text-anchor="middle" style="font-family:Space Mono,monospace;font-size:9px;fill:rgba(0,220,100,0.7);letter-spacing:2px">PITCH</text>
        <!-- Zone stands -->
        ${svgZones}
        <!-- Compass / entry indicators -->
        <text x="${cx}" y="22" text-anchor="middle" style="font-family:Oswald,sans-serif;font-size:9px;fill:#4a6584;letter-spacing:2px">MAIN GATE</text>
        <line x1="${cx}" y1="28" x2="${cx}" y2="38" stroke="#4a6584" stroke-width="1" stroke-dasharray="2,2"/>
      </svg>
    </div>

    <!-- Zone price legend -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">
      ${allPrices.map(p=>{
        const zd2=getZoneDef(p.stand);
        const isActive=p.stand===stand;
        return `<div onclick="tsSelectStandAndZone('${p.stand.replace(/'/g,"\\'")}', '${p.stand.replace(/'/g,"\\'")}');"
          style="background:${isActive?zd2.color+'22':'#060f1f'};border:1.5px solid ${isActive?zd2.color:'#1e3a5f'};border-radius:8px;padding:8px 10px;cursor:pointer;transition:all 0.15s">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
            <div style="width:8px;height:8px;border-radius:50%;background:${zd2.color};flex-shrink:0"></div>
            <span style="font-size:0.65rem;font-family:Oswald,sans-serif;color:#8ba3c7;letter-spacing:0.5px">${p.stand.length>18?p.stand.substring(0,17)+'…':p.stand}</span>
          </div>
          <div style="font-family:Oswald,sans-serif;font-size:1rem;font-weight:700;color:${isActive?zd2.color:'#fff'}">₹${p.price.toLocaleString()}</div>
        </div>`;
      }).join('')}
    </div>
    <button class="tbm-add-cart-btn" onclick="tsSeatStep(2)">SELECT BLOCK IN ${stand.toUpperCase().substring(0,20)} →</button>`;
}

// ── BLOCK SELECTOR (sub-step 2) ──────────────────────────────
function buildBlockSelector(stand,zd,qty,price){
  const blocks=zd.blocks;
  const bookedMap={};
  blocks.forEach(b=>{ bookedMap[b]=Math.floor(Math.random()*40)+10; });

  return `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
      <button onclick="tsSeatStep(1)" style="background:#0a1628;border:1px solid #1e3a5f;color:#8ba3c7;border-radius:6px;padding:4px 10px;cursor:pointer;font-size:0.75rem">← Back</button>
      <div>
        <div style="font-family:Oswald,sans-serif;font-size:0.95rem;font-weight:700;color:#fff">${stand}</div>
        <div style="font-size:0.65rem;color:var(--text-muted)">Choose a block · ₹${price.toLocaleString()} per seat</div>
      </div>
    </div>

    <!-- Stadium arc showing blocks -->
    <div style="background:#030810;border-radius:14px;border:1px solid #1e3a5f;padding:12px;margin-bottom:14px;overflow:hidden">
      <svg width="100%" viewBox="0 0 480 260" style="display:block">
        <!-- Ground hint -->
        <ellipse cx="240" cy="290" rx="180" ry="140" fill="rgba(0,100,30,0.2)" stroke="rgba(0,200,80,0.15)" stroke-width="1"/>
        <text x="240" y="240" text-anchor="middle" style="font-family:Space Mono,monospace;font-size:8px;fill:rgba(0,200,80,0.4);letter-spacing:2px">← FIELD VIEW →</text>
        ${blocks.map((blk,i)=>{
          const n=blocks.length;
          const startAngle=Math.PI*1.15;
          const endAngle=Math.PI*1.85;
          const range=endAngle-startAngle;
          const segStart=startAngle+(i/n)*range;
          const segEnd=startAngle+((i+1)/n)*range;
          const midAngle=(segStart+segEnd)/2;
          const r1=110,r2=170;
          const x1=240+r1*Math.cos(segStart),y1=230+r1*Math.sin(segStart);
          const x2=240+r2*Math.cos(segStart),y2=230+r2*Math.sin(segStart);
          const x3=240+r2*Math.cos(segEnd),y3=230+r2*Math.sin(segEnd);
          const x4=240+r1*Math.cos(segEnd),y4=230+r1*Math.sin(segEnd);
          const mx=240+(r1+r2)/2*Math.cos(midAngle);
          const my=230+(r1+r2)/2*Math.sin(midAngle);
          const isActive=ticketState.block===blk;
          const fillOp=isActive?0.85:0.5;
          const gap=bookedMap[blk];
          return `<g style="cursor:pointer" onclick="tsSelectBlock('${blk}')">
            <path d="M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} A${r2},${r2} 0 0,1 ${x3.toFixed(1)},${y3.toFixed(1)} L${x4.toFixed(1)},${y4.toFixed(1)} A${r1},${r1} 0 0,0 ${x1.toFixed(1)},${y1.toFixed(1)}Z"
              fill="${zd.color}" fill-opacity="${fillOp}" stroke="#040d1a" stroke-width="2"/>
            <text x="${mx.toFixed(1)}" y="${(my-6).toFixed(1)}" text-anchor="middle"
              style="font-family:Oswald,sans-serif;font-size:${isActive?13:11}px;font-weight:700;fill:#fff;pointer-events:none">${blk}</text>
            <text x="${mx.toFixed(1)}" y="${(my+8).toFixed(1)}" text-anchor="middle"
              style="font-family:Space Mono,monospace;font-size:7px;fill:rgba(255,255,255,0.7);pointer-events:none">${100-gap}% avail</text>
          </g>`;
        }).join('')}
      </svg>
    </div>

    <!-- Block list cards -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:8px;margin-bottom:14px">
      ${blocks.map(blk=>{
        const isActive=ticketState.block===blk;
        const avail=100-bookedMap[blk];
        return `<div onclick="tsSelectBlock('${blk}')" style="background:${isActive?zd.color+'33':'#060f1f'};border:2px solid ${isActive?zd.color:'#1e3a5f'};border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all 0.15s">
          <div style="font-family:Oswald,sans-serif;font-size:1.1rem;font-weight:800;color:${isActive?zd.color:'#fff'}">${blk}</div>
          <div style="font-size:0.62rem;color:${avail>40?'#22c55e':avail>20?'#f59e0b':'#ef4444'};margin-top:2px">${avail}% available</div>
        </div>`;
      }).join('')}
    </div>

    <button class="tbm-add-cart-btn"
      style="${ticketState.block?'':'opacity:0.5;cursor:not-allowed'}"
      onclick="${ticketState.block?'tsSeatStep(3)':`showToast('Please select a block','error')`}">
      ${ticketState.block?`VIEW SEATS IN BLOCK ${ticketState.block} →`:'SELECT A BLOCK FIRST'}
    </button>`;
}

// ── INDIVIDUAL SEAT GRID (sub-step 3) ────────────────────────
function buildSeatGrid(stand,zd,qty,price,selected){
  const seats=ticketState.seats;
  const rows=[...new Set(seats.map(s=>s.row))];
  const cols=Math.max(...seats.map(s=>s.col));
  const isVIP=stand.includes('VIP');
  const isPrem=stand.includes('Premium')||stand.includes('Pavilion')||stand.includes('Ladies')||stand.includes('Club')||stand.includes('KSCA')||stand.includes('Deccan');
  const seatW=isVIP?30:isPrem?24:18;
  const seatH=isVIP?26:isPrem?20:15;
  const gap=isVIP?6:isPrem?5:4;
  const tc=zd.color;

  const rowsHTML=rows.map(row=>{
    const rowSeats=seats.filter(s=>s.row===row);
    const seatsHTML=rowSeats.map(s=>{
      const isSel=selected.includes(s.id);
      const bkd=s.booked;
      const fill=bkd?'#0f172a':isSel?tc:'transparent';
      const border=bkd?'#1e2a40':isSel?tc:tc+'88';
      const textColor=bkd?'#2a3a5a':isSel?'#fff':tc;
      const cur=bkd?'not-allowed':'pointer';
      const shortId=s.id.split('-').pop(); // just "A1" not "G1-A1"
      return `<div title="${bkd?s.id+' · Booked':isSel?s.id+' · Selected ✓':s.id+' · ₹'+price.toLocaleString()}"
        onclick="${bkd?'':'tsSeatClick(\''+s.id+'\')'}"
        onmouseenter="${bkd?'':'showSeatTip(\''+s.id+'\','+price+')'}"
        onmouseleave="hideSeatTip()"
        style="width:${seatW}px;height:${seatH}px;background:${fill};border:1.5px solid ${border};
          border-radius:${Math.round(seatW/2)}px ${Math.round(seatW/2)}px 3px 3px;
          cursor:${cur};flex-shrink:0;display:flex;align-items:center;justify-content:center;
          transition:all 0.12s;box-shadow:${isSel?'0 0 10px '+tc+'88':'none'};
          transform:${isSel?'scale(1.12)':'scale(1)'};opacity:${bkd?0.35:1}">
        <span style="font-size:${Math.max(6,seatW*0.32)}px;color:${textColor};font-family:Space Mono,monospace;line-height:1;pointer-events:none">${shortId}</span>
      </div>`;
    }).join('');
    return `<div style="display:flex;align-items:center;gap:${gap}px;margin-bottom:${gap}px">
      <span style="font-family:Space Mono,monospace;font-size:0.58rem;color:#4a6584;width:14px;text-align:right;flex-shrink:0">${row}</span>
      <div style="display:flex;gap:${gap}px">${seatsHTML}</div>
      <span style="font-family:Space Mono,monospace;font-size:0.58rem;color:#4a6584;width:14px;flex-shrink:0">${row}</span>
    </div>`;
  }).join('');

  const colNums=Array.from({length:cols},(_,i)=>`<div style="width:${seatW}px;text-align:center;font-family:Space Mono,monospace;font-size:0.45rem;color:#2a3a5a;flex-shrink:0">${(i+1)%5===0?i+1:''}</div>`).join('');

  return `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div style="display:flex;align-items:center;gap:8px">
        <button onclick="tsSeatStep(2)" style="background:#0a1628;border:1px solid #1e3a5f;color:#8ba3c7;border-radius:6px;padding:4px 10px;cursor:pointer;font-size:0.75rem">← Back</button>
        <div>
          <div style="font-family:Oswald,sans-serif;font-size:0.9rem;font-weight:700;color:#fff">Block ${ticketState.block||''}</div>
          <div style="font-size:0.65rem;color:var(--text-muted)">₹${price.toLocaleString()} · Select ${qty} seat${qty>1?'s':''}</div>
        </div>
      </div>
      <div style="display:flex;gap:6px">
        <button id="zm-in" onclick="(function(){const w=document.getElementById('smapwrap');const s=parseFloat(w.dataset.scale||1);const ns=Math.min(2,s+0.2);w.style.transform='scale('+ns+')';w.dataset.scale=ns;})()" style="background:#0a1628;border:1px solid #1e3a5f;color:#8ba3c7;border-radius:5px;width:26px;height:26px;cursor:pointer;font-size:1rem">+</button>
        <button id="zm-out" onclick="(function(){const w=document.getElementById('smapwrap');const s=parseFloat(w.dataset.scale||1);const ns=Math.max(0.5,s-0.2);w.style.transform='scale('+ns+')';w.dataset.scale=ns;})()" style="background:#0a1628;border:1px solid #1e3a5f;color:#8ba3c7;border-radius:5px;width:26px;height:26px;cursor:pointer;font-size:1rem">−</button>
      </div>
    </div>

    <!-- Legend -->
    <div style="display:flex;gap:14px;align-items:center;margin-bottom:10px;padding:7px 12px;background:rgba(10,22,40,0.6);border-radius:8px;border:1px solid #1e3a5f;flex-wrap:wrap">
      <div style="display:flex;align-items:center;gap:5px">
        <div style="width:16px;height:13px;border-radius:8px 8px 2px 2px;border:1.5px solid ${tc}88;background:transparent"></div>
        <span style="font-size:0.65rem;color:#6a8aaa">Available</span>
      </div>
      <div style="display:flex;align-items:center;gap:5px">
        <div style="width:16px;height:13px;border-radius:8px 8px 2px 2px;border:1.5px solid ${tc};background:${tc};box-shadow:0 0 6px ${tc}66"></div>
        <span style="font-size:0.65rem;color:#6a8aaa">Selected</span>
      </div>
      <div style="display:flex;align-items:center;gap:5px">
        <div style="width:16px;height:13px;border-radius:8px 8px 2px 2px;border:1.5px solid #1e2a40;background:#0f172a;opacity:0.5"></div>
        <span style="font-size:0.65rem;color:#6a8aaa">Booked</span>
      </div>
      <div style="margin-left:auto;font-family:Space Mono,monospace;font-size:0.72rem;font-weight:700;color:${selected.length>=qty?'#22c55e':tc}">${selected.length}/${qty}</div>
    </div>

    <!-- Field direction -->
    <div style="text-align:center;margin-bottom:10px">
      <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(0,150,50,0.1);border:1px solid rgba(0,200,80,0.25);border-radius:20px;padding:4px 20px">
        <span style="font-size:0.7rem">🏏</span>
        <span style="font-family:Oswald,sans-serif;font-size:0.62rem;letter-spacing:3px;color:rgba(0,200,80,0.8)">FIELD VIEW</span>
        <span style="font-size:0.7rem">🏏</span>
      </div>
    </div>

    <!-- Seat map -->
    <div style="overflow:auto;max-height:300px;background:#030810;border-radius:12px;border:1px solid #1a3050;padding:14px 10px 8px" id="smapouter">
      <div id="smapwrap" data-scale="1" style="transform-origin:top center;transition:transform 0.2s;display:inline-block;min-width:100%">
        ${rowsHTML}
        <div style="display:flex;gap:${gap}px;padding-left:20px;margin-top:4px">${colNums}</div>
      </div>
    </div>

    <!-- Tooltip -->
    <div id="seat-tip" style="min-height:20px;margin:6px 0 4px;text-align:center;font-family:Space Mono,monospace;font-size:0.7rem;color:${tc};opacity:0.7;transition:opacity 0.15s">
      👆 Click a seat to select · Hover to preview
    </div>

    <!-- Selected seats summary -->
    <div style="background:#06101e;border:1px solid #1a3050;border-radius:10px;padding:10px 14px;margin-bottom:12px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <span style="font-family:Oswald,sans-serif;font-size:0.7rem;letter-spacing:1.5px;color:#4a6584">SELECTED SEATS</span>
        <span style="font-family:Space Mono,monospace;font-size:0.7rem;color:${selected.length>=qty?'#22c55e':tc}">${selected.length} / ${qty}</span>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;min-height:26px;align-items:center">
        ${selected.length
          ?selected.map(sid=>`<div style="display:inline-flex;align-items:center;gap:4px;background:${tc}18;border:1px solid ${tc}55;border-radius:6px;padding:3px 8px;font-family:Space Mono,monospace;font-size:0.7rem;color:${tc}">
              ${sid.split('-').pop()}
              <span onclick="tsSeatClick('${sid}')" style="cursor:pointer;opacity:0.6;font-size:0.75rem;margin-left:2px">✕</span>
            </div>`).join('')
          :`<span style="color:#2a3a5a;font-size:0.72rem">No seats selected yet</span>`}
      </div>
      ${selected.length>0?`<div style="margin-top:8px;padding-top:8px;border-top:1px solid #1a3050;display:flex;justify-content:space-between">
        <span style="font-size:0.67rem;color:#4a6584">${selected.length} × ₹${price.toLocaleString()} + 18% GST</span>
        <span style="font-family:Oswald,sans-serif;font-size:0.95rem;font-weight:700;color:${tc}">₹${Math.round(price*selected.length*1.18).toLocaleString()}</span>
      </div>`:''}
    </div>

    <button class="tbm-add-cart-btn"
      style="background:${selected.length>=qty?'linear-gradient(135deg,'+tc+','+tc+'cc)':'#0d1e35'};color:${selected.length>=qty?'#000':'#3a5070'};border:1px solid ${selected.length>=qty?tc:'#1a3050'};font-weight:700;letter-spacing:1px"
      onclick="${selected.length>=qty?'tsStep(3)':`showToast('Please select ${qty} seat${qty>1?'s':''} to continue','error')`}">
      ${selected.length>=qty?`✓ CONFIRM ${qty} SEAT${qty>1?'S':''} →`:`SELECT ${qty-selected.length} MORE SEAT${qty-selected.length!==1?'S':''}`}
    </button>`;
}

function openTicketBooking(matchId){
  const m=IPL_MATCHES.find(x=>x.id===matchId);
  if(!m)return;
  ticketState={matchId,stand:m.prices[0].stand,qty:1,step:1,zone:null,block:null,selectedSeats:[],seats:null,seatStep:1};
  renderTicketModal();
  document.getElementById('buyNow-modal').classList.add('open');
  document.body.style.overflow='hidden';
}

function renderTicketModal(){
  const{matchId,stand,qty,step,selectedSeats,zone,block,seatStep}=ticketState;
  const m=IPL_MATCHES.find(x=>x.id===matchId);
  if(!m)return;
  const selPrice=m.prices.find(p=>p.stand===stand);
  const total=(selPrice?.price||0)*qty;
  const gst=Math.round(total*0.18);
  const grand=total+gst;
  const stepLabels=['1 Stand','2 Map','3 Details','4 Payment','5 Done'];
  const stepsHtml=stepLabels.map((s,i)=>`<div class="cs-step ${i+1===step?'active':i+1<step?'done':''}">${s}</div>`).join('');
  let body='';

  if(step===1){
    const allZd=m.prices.map(p=>getZoneDef(p.stand));
    body=`
      <div class="tbm-section-title">SELECT STAND</div>
      <div class="tbm-stands-grid">${m.prices.map((p,i)=>{
        const zd=getZoneDef(p.stand);
        return `<div class="stand-option${p.stand===stand?' selected':''}" onclick="tsSelectStand('${p.stand.replace(/'/g,"\\'")}')">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
            <div style="width:9px;height:9px;border-radius:50%;background:${zd.color};flex-shrink:0"></div>
            <div class="so-name" style="font-size:0.8rem;line-height:1.2">${p.stand}</div>
          </div>
          <div class="so-price">₹${p.price.toLocaleString()}</div>
          <div class="so-avail" style="font-size:0.62rem">${p.stand.includes('VIP')?'Limited boxes':p.stand.includes('Premium')||p.stand.includes('Pavilion')||p.stand.includes('Club')||p.stand.includes('Ladies')?'Premium seating':'General seating'}</div>
        </div>`;
      }).join('')}</div>
      <div class="tbm-qty-row"><span class="qty-label">Tickets (max 6):</span>
        <div class="qty-controls">
          <button class="qty-btn" onclick="tsQty(-1)">−</button>
          <span class="qty-val">${qty}</span>
          <button class="qty-btn" onclick="tsQty(1)">+</button>
        </div>
      </div>
      <div class="pay-summary-box">
        <div class="pay-row"><span>${qty} × ${stand}</span><span>₹${total.toLocaleString()}</span></div>
        <div class="pay-row"><span>GST (18%)</span><span>₹${gst.toLocaleString()}</span></div>
        <div class="pay-row grand"><span>TOTAL</span><span>₹${grand.toLocaleString()}</span></div>
      </div>
      <button class="tbm-add-cart-btn" onclick="tsGoToSeatMap()">VIEW STADIUM MAP →</button>`;
  }
  else if(step===2){
    const zd=getZoneDef(stand);
    const price=selPrice?.price||0;
    if(seatStep===1) body=buildStadiumZoneMap(m,stand,zd,qty,price);
    else if(seatStep===2) body=buildBlockSelector(stand,zd,qty,price);
    else if(seatStep===3){
      if(!ticketState.seats) ticketState.seats=generateBlockSeats(block||'A',zd.rows,zd.cols);
      body=buildSeatGrid(stand,zd,qty,price,selectedSeats);
    }
  }
  else if(step===3){
    const seatList=ticketState.selectedSeats.map(s=>s.split('-').pop()).join(', ');
    body=`
      <div class="tbm-section-title">BOOKING DETAILS</div>
      <div class="checkout-form">
        <div class="checkout-two-col"><div class="form-field"><label>First Name *</label><input id="ts-fname" placeholder="Rahul" inputmode="text" oninput="sanitizeNameInput(this)"></div><div class="form-field"><label>Last Name *</label><input id="ts-lname" placeholder="Sharma" inputmode="text" oninput="sanitizeNameInput(this)"></div></div>
        <div class="form-field"><label>Email *</label><input id="ts-email" placeholder="you@email.com" type="email"></div>
        <div class="form-field"><label>Phone *</label><input id="ts-phone" placeholder="+91 98765 43210" type="tel" inputmode="tel" oninput="sanitizePhoneInput(this)"></div>
        <div class="form-field"><label>ID Proof Type</label><select id="ts-id"><option>Aadhaar Card</option><option>PAN Card</option><option>Passport</option><option>Voter ID</option><option>Driving Licence</option></select></div>
        <div class="form-field"><label>ID Number</label><input id="ts-idnum" placeholder="Enter ID number"></div>
      </div>
      <div class="pay-summary-box" style="font-size:0.78rem">
        <div class="pay-row"><span>Match</span><span>${m.team1} vs ${m.team2}</span></div>
        <div class="pay-row"><span>Stand · Block</span><span>${stand} · ${block||''}</span></div>
        <div class="pay-row"><span>Seats</span><span style="color:var(--accent-gold);font-family:Space Mono,monospace">${seatList}</span></div>
        <div class="pay-row grand"><span>TOTAL</span><span>₹${grand.toLocaleString()}</span></div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="tbm-add-cart-btn" style="background:var(--bg-card3);color:var(--text-secondary);flex:0.4" onclick="tsStep(2)">← BACK</button>
        <button class="tbm-add-cart-btn" style="flex:1" onclick="proceedToTicketPayment()">CONTINUE TO PAYMENT →</button>
      </div>`;
  }

  // ── STEP 4: PAYMENT ───────────────────────────────────────
  else if(step===4){
    body=`
      <div class="tbm-section-title">CHOOSE PAYMENT METHOD</div>
      <div class="payment-methods">
        <div class="pm-option selected" onclick="selectPM(this)"><span class="pm-icon">💳</span>Credit / Debit Card</div>
        <div class="pm-option" onclick="selectPM(this)"><span class="pm-icon">📱</span>UPI / GPay / PhonePe</div>
        <div class="pm-option" onclick="selectPM(this)"><span class="pm-icon">🏦</span>Net Banking</div>
      </div>
      <div class="checkout-form" style="margin-top:0.75rem">
        <div class="form-field"><label>Card Number</label><input placeholder="4242 4242 4242 4242" maxlength="19" oninput="fmtCard(this)"></div>
        <div class="checkout-two-col"><div class="form-field"><label>MM/YY</label><input placeholder="12/27" maxlength="5"></div><div class="form-field"><label>CVV</label><input placeholder="•••" maxlength="3" type="password"></div></div>
      </div>
      <div class="pay-summary-box">
        <div class="pay-row"><span>${qty} × ${stand}</span><span>₹${total.toLocaleString()}</span></div>
        <div class="pay-row"><span>Seats</span><span style="color:var(--accent-gold);font-family:Space Mono,monospace;font-size:0.72rem">${ticketState.selectedSeats.join(', ')}</span></div>
        <div class="pay-row"><span>GST (18%)</span><span>₹${gst.toLocaleString()}</span></div>
        <div class="pay-row grand"><span>TOTAL</span><span>₹${grand.toLocaleString()}</span></div>
      </div>
      <div style="display:flex;gap:8px"><button class="tbm-add-cart-btn" style="background:var(--bg-card3);color:var(--text-secondary);flex:0.4" onclick="tsStep(3)">← BACK</button><button class="tbm-add-cart-btn" style="flex:1" onclick="tsStep(5)">🔒 PAY ₹${grand.toLocaleString()} SECURELY →</button></div>`;
  }

  // ── STEP 5: CONFIRMED ─────────────────────────────────────
  else if(step===5){
    const bookingId='TKT-'+Math.random().toString(36).slice(2,8).toUpperCase();
    const seatList = ticketState.selectedSeats.join(', ');
    saveOrderToUser({
      orderId: bookingId, emoji:'🎟️',
      name:`${m.team1} vs ${m.team2}`,
      category:'Match Ticket',
      matchNo: m.matchNo, stand, qty,
      seats: seatList,
      venue: m.venue, date: m.date, time: m.time,
      amount: grand, unitPrice: selPrice?.price||0,
      bookedOn: new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}),
      status:'Confirmed'
    }, true);
    body=`
      <div class="order-success-box">
        <span class="success-icon">🎟️</span>
        <h3 style="font-family:Oswald,sans-serif;font-size:1.5rem;letter-spacing:1px;margin-bottom:0.5rem">BOOKING CONFIRMED!</h3>
        <p style="color:var(--text-secondary);margin-bottom:0.75rem">${qty} ticket(s) — <b>${m.team1} vs ${m.team2}</b><br><span style="font-size:0.82rem">${m.date} · ${m.time}</span><br><span style="font-size:0.78rem;color:var(--text-muted)">${m.venue}</span></p>
        <div class="order-id">Booking ID: ${bookingId}</div>
        <div class="pay-summary-box" style="text-align:left;margin:0.75rem 0">
          <div class="pay-row"><span>Stand</span><span>${stand}</span></div>
          <div class="pay-row"><span>Seat Numbers</span><span style="color:var(--accent-gold);font-family:Space Mono,monospace">${seatList}</span></div>
          <div class="pay-row"><span>Tickets</span><span>${qty}</span></div>
          <div class="pay-row"><span>Unit Price</span><span>₹${(selPrice?.price||0).toLocaleString()}</span></div>
          <div class="pay-row"><span>GST (18%)</span><span>₹${gst.toLocaleString()}</span></div>
          <div class="pay-row grand"><span>AMOUNT PAID</span><span>₹${grand.toLocaleString()}</span></div>
        </div>
        ${(()=>{const _d=buildTicketQRData(bookingId,{match:`${m.team1} vs ${m.team2}`,date:m.date,time:m.time,venue:m.venue,stand,block:ticketState.block||'—',seats:seatList,tickets:qty,unitPrice:'₹'+(selPrice?.price||0).toLocaleString(),total:'₹'+grand.toLocaleString(),bookedOn:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})});return qrBlock(bookingId,'match_ticket',_d.text,_d.userName);})()}
        <p style="font-size:0.78rem;color:var(--text-muted)">📧 E-tickets sent to email · 📱 Show QR code at stadium gate · 🆔 Carry valid govt ID proof</p>
        <div style="display:flex;gap:8px;margin-top:1.25rem;justify-content:center;flex-wrap:wrap">
          <button class="tbm-add-cart-btn" style="max-width:160px;background:var(--bg-card3);color:var(--text-secondary)" onclick="closePayModal()">CLOSE</button>
          <button class="tbm-add-cart-btn" style="max-width:200px" onclick="closePayModal();switchSection('myaccount',null)">👤 MY ACCOUNT →</button>
        </div>
      </div>`;
  }

  document.getElementById('buyNow-modal-inner').innerHTML=`
    <div class="tbm-header"><div class="tbm-match-title">${m.team1} <span style="color:var(--text-muted);font-size:0.9rem">vs</span> ${m.team2}</div><div class="tbm-meta">📅 ${m.date} · ⏰ ${m.time} · 📍 ${m.venue}</div></div>
    <div class="checkout-steps" style="margin-bottom:1.5rem">${stepsHtml}</div>
    ${body}`;
}

window.tsSelectStand=(s)=>{ticketState.stand=s;ticketState.seats=null;ticketState.selectedSeats=[];ticketState.block=null;renderTicketModal();};
window.tsSelectStandAndZone=(s)=>{ticketState.stand=s;ticketState.seats=null;ticketState.selectedSeats=[];ticketState.block=null;tsSeatStep(2);};
window.tsSelectZone=(zoneId)=>{tsSeatStep(2);};
window.tsSelectBlock=(blk)=>{ticketState.block=blk;ticketState.seats=null;ticketState.selectedSeats=[];renderTicketModal();};
window.tsSeatStep=(s)=>{ticketState.seatStep=s;if(s===1||s===2){ticketState.seats=null;ticketState.selectedSeats=[];}renderTicketModal();};
window.tsQty=(d)=>{ticketState.qty=Math.max(1,Math.min(6,ticketState.qty+d));renderTicketModal();};
window.tsStep=(s)=>{ticketState.step=s;if(s===2)ticketState.seatStep=1;renderTicketModal();};
window.tsGoToSeatMap=()=>{ticketState.step=2;ticketState.seatStep=1;ticketState.seats=null;ticketState.selectedSeats=[];renderTicketModal();};
window.tsSeatClick=(seatId)=>{
  const sel=ticketState.selectedSeats;
  const idx=sel.indexOf(seatId);
  if(idx>=0){ sel.splice(idx,1); }
  else if(sel.length<ticketState.qty){ sel.push(seatId); }
  else { showToast(`You can only select ${ticketState.qty} seat(s)`, 'info'); return; }
  renderTicketModal();
};

window.showSeatTip = (seatId, price) => {
  const tip = document.getElementById('seat-tip');
  if(!tip) return;
  const isSel = ticketState.selectedSeats.includes(seatId);
  tip.style.opacity='1';
  tip.innerHTML = isSel
    ? `<span style="color:#f0a500;font-weight:700">✓ ${seatId} selected</span> &nbsp;·&nbsp; <span style="color:#ff6b6b;cursor:pointer;text-decoration:underline" onclick="tsSeatClick('${seatId}')">Remove</span>`
    : `<span style="color:#fff;font-weight:700">${seatId}</span> &nbsp;·&nbsp; <span style="color:#00d97e">₹${price.toLocaleString()} + 18% GST</span> &nbsp;·&nbsp; <span style="color:#8ba3c7">Click to select</span>`;
};
window.hideSeatTip = () => {
  const tip = document.getElementById('seat-tip');
  if(tip){ tip.style.opacity='0.6'; tip.innerHTML='👆 Click on a seat to select it'; }
};


// ================================================================
// CART → CHECKOUT MODAL
// ================================================================
let checkoutStep=1;
function proceedCheckout(){
  if(!cart.length){showToast('Your cart is empty!','error');return;}
  closeCart();checkoutStep=1;renderCheckoutModal();
  document.getElementById('checkout-modal').classList.add('open');
  document.body.style.overflow='hidden';
}
function renderCheckoutModal(){
  const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const discount=getCouponDiscount(subtotal);
  const total=subtotal-discount;
  const stepsHtml=['1 Details','2 Payment','3 Done'].map((s,i)=>`<div class="cs-step ${i+1===checkoutStep?'active':i+1<checkoutStep?'done':''}">${s}</div>`).join('');
  let body='';
  if(checkoutStep===1){
    body=`<h3 style="font-family:Oswald,sans-serif;font-size:1.3rem;margin-bottom:1rem;letter-spacing:1px">DELIVERY DETAILS</h3>
    <div class="checkout-form">
      <div class="checkout-two-col"><div class="form-field"><label>First Name</label><input id="co-fname" placeholder="Rahul" inputmode="text" oninput="sanitizeNameInput(this)"></div><div class="form-field"><label>Last Name</label><input id="co-lname" placeholder="Sharma" inputmode="text" oninput="sanitizeNameInput(this)"></div></div>
      <div class="form-field"><label>Email</label><input id="co-email" placeholder="you@email.com" type="email"></div>
      <div class="form-field"><label>Phone</label><input id="co-phone" placeholder="+91 98765 43210" type="tel" inputmode="tel" oninput="sanitizePhoneInput(this)"></div>
      <div class="form-field"><label>Address</label><input id="co-addr" placeholder="Flat No., Building, Street, City — PIN Code"></div>
      <div class="form-field"><label>State</label><select id="co-state"><option>Maharashtra</option><option>Tamil Nadu</option><option>Karnataka</option><option>Delhi</option><option>West Bengal</option><option>Rajasthan</option><option>Gujarat</option><option>Telangana</option><option>Punjab</option><option>Uttar Pradesh</option><option>Other</option></select></div>
    </div>
    <button class="checkout-btn" onclick="proceedToMerchPayment()" style="margin-top:1rem">CONTINUE TO PAYMENT →</button>`;
  } else if(checkoutStep===2){
    body=`<h3 style="font-family:Oswald,sans-serif;font-size:1.3rem;margin-bottom:1rem;letter-spacing:1px">PAYMENT METHOD</h3>
    <div class="payment-methods">
      <div class="pm-option selected" onclick="selectPM(this)"><span class="pm-icon">💳</span>Credit/Debit Card</div>
      <div class="pm-option" onclick="selectPM(this)"><span class="pm-icon">📱</span>UPI / GPay</div>
      <div class="pm-option" onclick="selectPM(this)"><span class="pm-icon">🏦</span>Net Banking</div>
    </div>
    <div class="checkout-form" style="margin-top:0.75rem">
      <div class="form-field"><label>Card Number</label><input placeholder="4242 4242 4242 4242" maxlength="19" oninput="fmtCard(this)"></div>
      <div class="checkout-two-col"><div class="form-field"><label>MM/YY</label><input placeholder="12/27" maxlength="5"></div><div class="form-field"><label>CVV</label><input placeholder="•••" maxlength="3" type="password"></div></div>
    </div>
    <div class="pay-summary-box">
      <div class="pay-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString()}</span></div>
      ${discount>0?`<div class="pay-row"><span>Discount</span><span style="color:var(--accent-green)">-₹${discount.toLocaleString()}</span></div>`:''}
      <div class="pay-row"><span>Delivery</span><span style="color:var(--accent-green)">FREE</span></div>
      <div class="pay-row grand"><span>TOTAL</span><span>₹${total.toLocaleString()}</span></div>
    </div>
    <div style="display:flex;gap:8px">
      <button class="checkout-btn" style="background:var(--bg-card3);color:var(--text-secondary);flex:0.4" onclick="goCheckoutStep(1)">← BACK</button>
      <button class="checkout-btn" style="flex:1" onclick="goCheckoutStep(3)">🔒 PAY ₹${total.toLocaleString()} →</button>
    </div>`;
  } else if(checkoutStep===3){
    const orderId='IPL-'+Math.random().toString(36).slice(2,8).toUpperCase();
    const subtotalPaid = subtotal - discount;
    cart.forEach(item=>saveOrderToUser({
      orderId, emoji:item.emoji||'📦',
      name:item.name, category:item.variant||'Order',
      qty:item.qty, amount:item.price*item.qty,
      unitPrice:item.price,
      date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}),
      status:'Processing'
    },false));
    const cartItemLines = cart.map((it,i)=>`ITEM ${i+1}      : ${it.name}${it.variant?' ('+it.variant+')':''} x${it.qty} @ ₹${it.price.toLocaleString()}`).join('\n');
    const orderDate=new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
    const cartQRText=[
      '============================',
      '   CRICKET HUB — IPL 2026  ',
      '============================',
      `ORDER ID    : ${orderId}`,
      `DATE        : ${orderDate}`,
      `ITEMS       : ${cart.length} item(s)`,
      cartItemLines,
      `SUBTOTAL    : ₹${subtotal.toLocaleString()}`,
      discount>0?`DISCOUNT    : -₹${discount.toLocaleString()}`:'',
      `TOTAL PAID  : ₹${subtotalPaid.toLocaleString()}`,
      '----------------------------',
      'Show QR for delivery.',
      '============================',
    ].filter(Boolean).join('\n');
    cart=[];saveCart();renderCartItems();
    body=`
      <div class="order-success-box">
        <span class="success-icon">🎉</span>
        <h3 style="font-family:Oswald,sans-serif;font-size:1.5rem;margin-bottom:0.5rem">ORDER CONFIRMED!</h3>
        <p style="color:var(--text-secondary)">Your IPL order has been placed. Delivery in 3–5 business days.</p>
        <div class="order-id" style="margin:0.75rem 0">Order ID: ${orderId}</div>
        ${(()=>{const _d=buildCartQRData(orderId,cart.slice(),{date:orderDate,subtotal:'₹'+subtotal.toLocaleString(),discount:discount>0?'₹'+discount.toLocaleString():'',total:'₹'+subtotalPaid.toLocaleString()});return qrBlock(orderId,'cart_order',_d.text,_d.userName);})()}
        <p style="font-size:0.78rem;color:var(--text-muted)">📧 Confirmation sent to your email · 🚚 Show QR for delivery verification</p>
        <div style="display:flex;gap:8px;margin-top:1.25rem;justify-content:center;flex-wrap:wrap">
          <button class="checkout-btn" style="max-width:200px;background:var(--bg-card3);color:var(--text-secondary)" onclick="closeCheckoutModalDirect();switchSection('myaccount',null)">👤 MY ACCOUNT</button>
          <button class="checkout-btn" style="max-width:220px" onclick="closeCheckoutModalDirect();switchSection('portal',document.querySelector('[data-section=portal]'))">🏠 CONTINUE SHOPPING →</button>
        </div>
      </div>`;
  }
  document.getElementById('checkout-inner').innerHTML=`<div class="checkout-steps">${stepsHtml}</div>${body}`;
}
// VALIDATION FUNCTIONS
function isAlphabeticName(value) {
  return /^[A-Za-z\s'\-]+$/.test(value);
}

function sanitizeNameInput(input){
  if(!input) return;
  const original = input.value;
  const sanitized = original.replace(/[^A-Za-z\s'\-]/g, '');
  if(original !== sanitized){
    input.value = sanitized;
    showToast('Name Must Contain Alphabet Only','error');
  }
}

function sanitizePhoneInput(input){
  if(!input) return;
  const original = input.value;
  const sanitized = original.replace(/[^0-9+\s\-]/g, '');
  if(original !== sanitized){
    input.value = sanitized;
    showToast('Enter Number Only','error');
  }
}

function validateNameField(value, label) {
  if(!value){
    showToast(`Please enter your ${label}`,'error');
    return false;
  }
  if(!isAlphabeticName(value)){
    showToast(`Please enter alphabet characters only for ${label}`,'error');
    return false;
  }
  return true;
}

function validatePhoneField(value){
  if(!value){
    showToast('Please enter your Phone Number','error');
    return false;
  }
  if(/[^0-9+\s\-]/.test(value)){
    showToast('Enter Number Only','error');
    return false;
  }
  if(value.replace(/\D/g,'').length<10){
    showToast('Phone number must be at least 10 digits','error');
    return false;
  }
  return true;
}

function validateTicketDetails(){
  const fname = document.getElementById('ts-fname')?.value?.trim();
  const lname = document.getElementById('ts-lname')?.value?.trim();
  const email = document.getElementById('ts-email')?.value?.trim();
  const phone = document.getElementById('ts-phone')?.value?.trim();
  
  if(!validateNameField(fname,'First Name')) return false;
  if(!validateNameField(lname,'Last Name')) return false;
  if(!email){showToast('Please enter your Email','error');return false;}
  if(!email.includes('@')){showToast('Please enter a valid Email address','error');return false;}
  if(!validatePhoneField(phone)) return false;
  
  return true;
}

function validateBuyNowDetails(){
  const fname = document.getElementById('bn-fname')?.value?.trim();
  const lname = document.getElementById('bn-lname')?.value?.trim();
  const email = document.getElementById('bn-email')?.value?.trim();
  const phone = document.getElementById('bn-phone')?.value?.trim();
  const addr = document.getElementById('bn-addr')?.value?.trim();
  const state = document.getElementById('bn-state')?.value?.trim();

  if(!validateNameField(fname,'First Name')) return false;
  if(!validateNameField(lname,'Last Name')) return false;
  if(!email){showToast('Please enter your Email Address','error');return false;}
  if(!email.includes('@')){showToast('Please enter a valid Email address','error');return false;}
  if(!validatePhoneField(phone)) return false;
  if(!addr){showToast('Please enter your Address','error');return false;}
  if(!state){showToast('Please select a State','error');return false;}

  return true;
}

function validateCheckoutDetails(){
  const fname = document.getElementById('co-fname')?.value?.trim();
  const lname = document.getElementById('co-lname')?.value?.trim();
  const email = document.getElementById('co-email')?.value?.trim();
  const phone = document.getElementById('co-phone')?.value?.trim();
  const addr = document.getElementById('co-addr')?.value?.trim();
  const state = document.getElementById('co-state')?.value?.trim();
  
  if(!validateNameField(fname,'First Name')) return false;
  if(!validateNameField(lname,'Last Name')) return false;
  if(!email){showToast('Please enter your Email','error');return false;}
  if(!email.includes('@')){showToast('Please enter a valid Email address','error');return false;}
  if(!validatePhoneField(phone)) return false;
  if(!addr){showToast('Please enter your Address','error');return false;}
  if(!state){showToast('Please select a State','error');return false;}
  
  return true;
}

function proceedToTicketPayment(){
  if(validateTicketDetails()){
    tsStep(4);
  }
}

function proceedToMerchPayment(){
  if(validateCheckoutDetails()){
    goCheckoutStep(2);
  }
}

window.goCheckoutStep=(s)=>{checkoutStep=s;renderCheckoutModal();};
function closeCheckoutModal(e){if(e.target===document.getElementById('checkout-modal'))closeCheckoutModalDirect();}
function closeCheckoutModalDirect(){document.getElementById('checkout-modal')?.classList.remove('open');document.body.style.overflow='';checkoutStep=1;}

// ================================================================
// CLOSE MODAL (universal)
// ================================================================
function closePayModal(){
  document.getElementById('buyNow-modal')?.classList.remove('open');
  document.body.style.overflow='';
}
window.closeBuyNowModal=(e)=>{if(e.target===document.getElementById('buyNow-modal'))closePayModal();};
window.closeBuyNowModalDirect=closePayModal;

// ================================================================
// QR CODE HELPER
// ================================================================
// ================================================================
// QR CODE — encodes compact plain text (works on ALL phones/scanners)
// Google Lens, iPhone Camera, any QR app shows full details instantly
// ================================================================
function makeQRUrl(text, size=260) {
  // White bg + black modules + medium error correction = max phone compatibility
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&bgcolor=ffffff&color=000000&format=png&margin=6&qzone=2&ecc=M`;
}

function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem('ipl_current_user') || localStorage.getItem('ipl_current_user_remember') || 'null');
  } catch(e) { return null; }
}

function buildTicketQRData(bookingId, details) {
  const user = getCurrentUser();
  const userName = user ? `${(user.fname||'')} ${(user.lname||'')}`.trim() : '';
  // Compact plain text — every QR scanner app shows this clearly
  const text = [
    '*** CRICKET HUB - IPL 2026 ***',
    '          MATCH TICKET',
    '------------------------------',
    `BOOKING ID: ${bookingId}`,
    userName ? `BOOKED BY: ${userName}` : null,
    `MATCH: ${details.match}`,
    `DATE: ${details.date}`,
    `TIME: ${details.time}`,
    `VENUE: ${details.venue.split(',')[0]}`,
    `STAND: ${details.stand}`,
    details.block && details.block!=='—' ? `BLOCK: ${details.block}` : null,
    `SEATS: ${details.seats}`,
    `TICKETS: ${details.tickets}`,
    `UNIT PRICE: ${details.unitPrice}`,
    `TOTAL PAID: ${details.total}`,
    `BOOKED ON: ${details.bookedOn}`,
    '------------------------------',
    'Show this at stadium entry.',
    'Carry valid Govt Photo ID.',
    '******************************',
  ].filter(Boolean).join('\n');
  return { text, userName };
}

function buildOrderQRData(orderId, details) {
  const user = getCurrentUser();
  const userName = user ? `${(user.fname||'')} ${(user.lname||'')}`.trim() : '';
  const typeLabel = details.isJersey ? 'JERSEY ORDER' : 'MERCHANDISE ORDER';
  const text = [
    '*** CRICKET HUB - IPL 2026 ***',
    `        ${typeLabel}`,
    '------------------------------',
    `ORDER ID: ${orderId}`,
    userName ? `ORDERED BY: ${userName}` : null,
    `ITEM: ${details.item}`,
    `DATE & TIME: ${details.date}`,
    details.size && details.size!=='—' ? `SIZE: ${details.size}` : null,
    `QUANTITY: ${details.qty}`,
    `UNIT PRICE: ${details.unitPrice}`,
    `DELIVERY: ${details.delivery}`,
    `TOTAL PAID: ${details.total}`,
    '------------------------------',
    'Show to delivery person.',
    '******************************',
  ].filter(Boolean).join('\n');
  return { text, userName };
}

function buildCartQRData(orderId, cartItems, totals) {
  const user = getCurrentUser();
  const userName = user ? `${(user.fname||'')} ${(user.lname||'')}`.trim() : '';
  const itemLines = cartItems.slice(0,5).map((it,i) => `ITEM ${i+1}: ${it.name.slice(0,22)} x${it.qty}`);
  const text = [
    '*** CRICKET HUB - IPL 2026 ***',
    '          CART ORDER',
    '------------------------------',
    `ORDER ID: ${orderId}`,
    userName ? `ORDERED BY: ${userName}` : null,
    `DATE: ${totals.date}`,
    ...itemLines,
    cartItems.length > 5 ? `...+${cartItems.length-5} more items` : null,
    `SUBTOTAL: ${totals.subtotal}`,
    totals.discount ? `DISCOUNT: -${totals.discount}` : null,
    `TOTAL PAID: ${totals.total}`,
    'DELIVERY: FREE',
    '------------------------------',
    'Show to delivery person.',
    '******************************',
  ].filter(Boolean).join('\n');
  return { text, userName };
}

function qrBlock(refId, type, qrText, userName) {
  const isTicket = type === 'match_ticket';
  const isJersey = type === 'jersey_order';
  const typeLabel = isTicket ? '🎟️ MATCH TICKET' : isJersey ? '👕 JERSEY ORDER' : '🛍️ ORDER RECEIPT';
  const icon = isTicket ? '🎟️' : isJersey ? '👕' : '🛍️';

  // Parse the text to show in the card below the QR
  const lines = qrText.split('\n').filter(l => l && !l.startsWith('*') && !l.startsWith('-') && !l.includes('Show') && !l.includes('Carry') && !l.includes('Cricket Hub') && !l.includes('TICKET') && !l.includes('ORDER') && !l.includes('RECEIPT'));

  const detailRows = lines.map(line => {
    const colon = line.indexOf(':');
    if(colon < 0) return '';
    const label = line.slice(0, colon).trim();
    const val = line.slice(colon+1).trim();
    const isHighlight = ['BOOKING ID','ORDER ID','SEATS','TOTAL PAID'].includes(label);
    return `<div style="display:flex;justify-content:space-between;align-items:flex-start;padding:7px 0;border-bottom:1px solid #0d1e35;gap:8px">
      <span style="font-size:0.68rem;color:#64748b;text-transform:uppercase;letter-spacing:0.3px;flex-shrink:0">${label}</span>
      <span style="font-size:0.75rem;color:${isHighlight?'#f0a500':'#e2e8f0'};font-weight:${isHighlight?'700':'400'};text-align:right;font-family:${isHighlight?'Space Mono,monospace':'inherit'};word-break:break-word;max-width:62%">${val}</span>
    </div>`;
  }).filter(Boolean).join('');

  return `
    <div style="background:#030810;border:2px solid rgba(240,165,0,0.3);border-radius:16px;overflow:hidden;margin:1.25rem 0">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#0a1628,#0f2244);padding:12px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #1e3a5f">
        <span style="font-size:1.3rem">${icon}</span>
        <div>
          <div style="font-family:Oswald,sans-serif;font-size:0.8rem;font-weight:700;letter-spacing:2px;color:#f0a500">${typeLabel}</div>
          <div style="font-family:Space Mono,monospace;font-size:0.62rem;color:#4a6584;margin-top:1px">${refId}</div>
        </div>
        ${userName?`<div style="margin-left:auto;font-size:0.72rem;color:#7dd3fc;display:flex;align-items:center;gap:4px"><span>👤</span><span>${userName}</span></div>`:''}
      </div>

      <div style="display:flex;gap:0;flex-wrap:wrap">
        <!-- QR Code panel -->
        <div style="background:#fff;padding:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:180px;flex-shrink:0">
          <img src="${makeQRUrl(qrText)}" alt="QR"
            style="width:170px;height:170px;display:block"
            onerror="this.outerHTML='<div style=\\'width:170px;height:170px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f1f5f9;gap:8px\\'><span style=\\'font-size:2.5rem\\'>📱</span><span style=\\'font-size:0.6rem;color:#64748b;font-family:monospace\\'>${refId}</span></div>'">
          <div style="font-size:0.58rem;color:#1e3a5f;margin-top:8px;letter-spacing:1px;font-weight:700;text-align:center">SCAN WITH CAMERA</div>
          <div style="font-size:0.52rem;color:#94a3b8;margin-top:2px;text-align:center">Google Lens · iPhone Camera</div>
        </div>

        <!-- Details panel -->
        <div style="flex:1;min-width:200px;padding:12px 14px">
          ${detailRows}
          <div style="margin-top:10px;padding:8px 10px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:8px;font-size:0.65rem;color:#4ade80;line-height:1.7">
            ✅ ${isTicket ? 'Show QR at stadium gate · Carry Govt Photo ID' : 'Show QR to delivery person · 3-5 business days'}
          </div>
        </div>
      </div>
    </div>`;
}
function saveOrderToUser(order, isTicket){
  try{
    const SESSION_KEY='ipl_current_user';
    let u=JSON.parse(sessionStorage.getItem(SESSION_KEY)||localStorage.getItem(SESSION_KEY+'_remember')||'null');
    if(!u)return;
    const fullOrder={
      id:'ORD-'+Math.random().toString(36).slice(2,8).toUpperCase(),
      ...order,
      savedAt: new Date().toISOString(),
    };
    if(isTicket){ u.tickets=[...(u.tickets||[]),fullOrder]; }
    else { u.orders=[...(u.orders||[]),fullOrder]; u.totalSpent=(u.totalSpent||0)+(order.amount||0); }
    sessionStorage.setItem(SESSION_KEY,JSON.stringify(u));
    localStorage.setItem(SESSION_KEY+'_remember',JSON.stringify(u));
    // Update main DB
    const db=JSON.parse(localStorage.getItem('ipl_users_db')||'[]');
    const idx=db.findIndex(x=>x.id===u.id);
    if(idx>=0){db[idx]=u;localStorage.setItem('ipl_users_db',JSON.stringify(db));}
    // Refresh account section if open
    if(document.getElementById('sec-myaccount')?.classList.contains('active')) renderMyAccount();
  }catch(e){console.error('saveOrderToUser:',e);}
}

// ================================================================
// HOME
// ================================================================
function renderHomePortal(){
  const offersEl=document.getElementById('featured-offers-grid');
  if(offersEl){
    [{icon:'🎟️',title:'EARLY BIRD TICKETS',desc:'Book 7+ days ahead and save 15%. Limited seats available!',section:'tickets'},
     {icon:'👕',title:'JERSEY BUNDLE DEAL',desc:'Buy any 2 jerseys and get an official team wristband FREE worth ₹299',section:'jerseys'},
     {icon:'✍️',title:'SIGNED MEMORABILIA',desc:'Virat Kohli & Rohit Sharma signed bats — only 10 remaining!',section:'merch'},
     {icon:'🎁',title:'FREE SHIPPING',desc:'Free delivery on all orders above ₹999. Express 2-day delivery for ₹99',section:'merch'}
    ].forEach(o=>{offersEl.innerHTML+=`<div class="offer-card" onclick="switchSection('${o.section}',document.querySelector('[data-section=${o.section}]'))" style="--oc:var(--accent-gold)"><div class="oc-icon">${o.icon}</div><div class="oc-title">${o.title}</div><div class="oc-desc">${o.desc}</div><div class="oc-btn">Explore →</div></div>`;});
  }
  const sellersEl=document.getElementById('top-sellers-grid');
  if(sellersEl){
    JERSEYS.filter(j=>j.inStock).slice(0,4).forEach(j=>{
      const disc=Math.round((j.mrp-j.price)/j.mrp*100);
      const tc=TEAM_COLORS[j.team]||'#888';
      const txtColor=['CSK','SRH'].includes(j.team)?'#000':'#fff';
      const imgUrl=(j.specialImg||JERSEY_IMG[j.team]||'')+'?v=21';
      sellersEl.innerHTML+=`<div class="top-seller-card">
        <div class="tsc-img-box" style="position:relative;overflow:hidden;background:linear-gradient(135deg,${tc}22,${tc}08);height:180px">
          ${j.isNew?'<span class="tsc-new-badge">NEW</span>':''}
          <img src="${imgUrl}" alt="${j.name}"
            style="width:100%;height:180px;object-fit:contain;padding:6px;box-sizing:border-box;transition:transform 0.3s"
            onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"
            onerror="this.style.display='none';this.parentElement.style.background='linear-gradient(160deg,${tc}44,${tc}11)';this.parentElement.insertAdjacentHTML('beforeend','<div style=\\'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%\\'><span style=\\'font-size:3.5rem\\'>👕</span><span style=\\'font-family:Oswald,sans-serif;font-weight:800;color:${tc};font-size:0.9rem\\'>${j.team}</span></div>')">
          <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.5));padding:6px 8px">
            <span style="background:${tc};color:${txtColor};font-family:Oswald,sans-serif;font-weight:800;font-size:0.62rem;padding:2px 8px;border-radius:3px">${j.team}</span>
          </div>
        </div>
        <div class="tsc-body">
          <div class="tsc-name" style="font-size:0.82rem;line-height:1.3">${j.name}</div>
          <div class="tsc-price-row"><span class="tsc-price">₹${j.price.toLocaleString()}</span><span class="tsc-mrp">₹${j.mrp.toLocaleString()}</span><span class="tsc-disc">-${disc}%</span></div>
          <button class="tsc-add-btn" onclick="openAddJersey('${j.id}')">🛒 ADD TO CART</button>
        </div>
      </div>`;
    });
  }
}

// ================================================================
// TICKET GRID
// ================================================================
function renderTicketMatches(list){
  const grid=document.getElementById('ticket-matches-grid');
  if(!grid)return;
  if(!list.length){grid.innerHTML='<div style="color:var(--text-muted);padding:2rem;text-align:center">No matches found.</div>';return;}
  grid.innerHTML=list.map(m=>{
    const isSold=m.availability==='soldout',isFast=m.availability==='fast';
    const barC=isSold?'var(--accent-red)':isFast?'var(--accent-gold)':'var(--accent-green)';
    const sc=isSold?'sold':isFast?'fast':'avail';
    const st=isSold?'● Sold Out':isFast?'● Filling Fast':'● Available';
    const fullNames={MI:'Mumbai Indians',CSK:'Chennai Super Kings',RCB:'Royal Challengers',KKR:'Kolkata Knight Riders',DC:'Delhi Capitals',PBKS:'Punjab Kings',RR:'Rajasthan Royals',SRH:'Sunrisers Hyderabad',GT:'Gujarat Titans',LSG:'Lucknow Super Giants'};
    return `<div class="ticket-match-card">
      <div class="tmc-header"><div class="tmc-series">🏆 IPL 2026 · ${m.matchNo}</div>
        <div class="tmc-teams">
          <div class="tmc-team">
            ${teamLogoEl(m.team1,48)}
            <div class="tmc-team-name">${fullNames[m.team1]||m.team1}</div>
          </div>
          <div class="tmc-vs">VS</div>
          <div class="tmc-team">
            ${teamLogoEl(m.team2,48)}
            <div class="tmc-team-name">${fullNames[m.team2]||m.team2}</div>
          </div>
        </div>
      </div>
      <div class="tmc-body">
        <div class="tmc-info-row"><span>📅</span><span>${m.date}</span></div>
        <div class="tmc-info-row"><span>⏰</span><span>${m.time}</span></div>
        <div class="tmc-info-row"><span>📍</span><span>${m.venue}</span></div>
        <div class="tmc-avail-bar"><div class="tmc-avail-label"><span>Seats filled</span><span>${m.filled}%</span></div><div class="tmc-bar-bg"><div class="tmc-bar-fill" style="width:${m.filled}%;background:${barC}"></div></div></div>
        <div class="tmc-prices">${m.prices.map(p=>`<div class="tmc-price-tag">${p.stand}: <b>₹${p.price.toLocaleString()}</b></div>`).join('')}</div>
        <div class="tmc-footer"><div class="tmc-status-dot ${sc}">${st}</div>
          <button class="tmc-book-btn${isSold?' sold-out':''}" onclick="openTicketBooking('${m.id}')" ${isSold?'disabled':''}>${isSold?'SOLD OUT':'BOOK NOW'}</button>
        </div>
      </div>
    </div>`;
  }).join('');
}
function filterTickets(){
  const tf=document.getElementById('ticket-team-filter')?.value||'';
  const vf=document.getElementById('ticket-venue-filter')?.value||'';
  const q=(document.getElementById('ticket-search')?.value||'').toLowerCase();
  renderTicketMatches(IPL_MATCHES.filter(m=>(!tf||m.team1===tf||m.team2===tf)&&(!vf||m.venue===vf)&&(!q||`${m.team1} ${m.team2} ${m.venue} ${m.matchNo}`.toLowerCase().includes(q))));
}

// ================================================================
// JERSEY GRID
// ================================================================
let activeJerseyTeam='all';
function buildJerseyTeamTabs(){
  const el=document.getElementById('jersey-team-tabs');
  if(!el)return;
  el.innerHTML=['all',...Object.keys(TEAM_COLORS)].map(t=>`<button class="jf-team-btn${t===activeJerseyTeam?' active':''}" onclick="filterByJerseyTeam('${t}')">${t==='all'?'All Teams':t}</button>`).join('');
}
window.filterByJerseyTeam=(t)=>{activeJerseyTeam=t;buildJerseyTeamTabs();filterJerseys();};
function filterJerseys(){
  const sf=document.getElementById('jersey-size-filter')?.value||'';
  const so=document.getElementById('jersey-sort')?.value||'default';
  let list=JERSEYS.filter(j=>(activeJerseyTeam==='all'||j.team===activeJerseyTeam)&&(!sf||j.sizes.includes(sf)));
  if(so==='price-asc') list.sort((a,b)=>a.price-b.price);
  if(so==='price-desc')list.sort((a,b)=>b.price-a.price);
  const grid=document.getElementById('jersey-grid');
  if(!grid)return;
  if(!list.length){grid.innerHTML='<div style="color:var(--text-muted);padding:2rem;text-align:center;grid-column:1/-1">No jerseys found.</div>';return;}
  grid.innerHTML=list.map(j=>{
    const disc=Math.round((j.mrp-j.price)/j.mrp*100);
    const tc=TEAM_COLORS[j.team]||'#888';
    const txtColor=['CSK','SRH'].includes(j.team)?'#000':'#fff';
    const teamNames={MI:'Mumbai Indians',CSK:'Chennai Super Kings',RCB:'Royal Challengers Bengaluru',KKR:'Kolkata Knight Riders',DC:'Delhi Capitals',PBKS:'Punjab Kings',RR:'Rajasthan Royals',SRH:'Sunrisers Hyderabad',GT:'Gujarat Titans',LSG:'Lucknow Super Giants'};
    const imgUrl=(j.specialImg||JERSEY_IMG[j.team]||'')+'?v=21';
    const logoUrl = TEAM_LOGO_LOCAL[j.team]||'';
    return `<div class="jersey-card">
      <div class="jersey-img-box" style="position:relative;overflow:hidden;background:linear-gradient(135deg,${tc}22,${tc}08);height:220px">
        ${j.isNew?'<div class="jersey-new-badge">NEW 2026</div>':''}
        <img src="${imgUrl}" alt="${j.name}"
          style="width:100%;height:220px;object-fit:contain;display:block;padding:8px;box-sizing:border-box;transition:transform 0.3s"
          onmouseover="this.style.transform='scale(1.05)'"
          onmouseout="this.style.transform='scale(1)'"
          onerror="this.style.display='none';this.parentElement.style.background='linear-gradient(160deg,${tc}44,${tc}11)';this.parentElement.insertAdjacentHTML('beforeend','<div style=\\'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:8px\\'><span style=\\'font-size:4.5rem\\'>👕</span><span style=\\'font-family:Oswald,sans-serif;font-weight:800;font-size:1.1rem;color:${tc}\\'>${j.team}</span></div>')">
        <div style="position:absolute;top:8px;left:8px;z-index:3">
          <img src="${logoUrl}" alt="${j.team}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;border:2px solid ${tc}88;background:${tc}22"
            onerror="this.outerHTML='<div style=\\'width:32px;height:32px;border-radius:50%;background:${tc};display:flex;align-items:center;justify-content:center;font-family:Oswald,sans-serif;font-weight:800;font-size:0.6rem;color:${txtColor}\\'>${j.team}</div>'">
        </div>
        ${!j.inStock?'<div class="jersey-sold-overlay">OUT OF STOCK</div>':''}
      </div>
      <div class="jersey-info">
        <div class="jersey-name">${j.name}</div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
          <div style="width:14px;height:14px;border-radius:50%;background:${tc};flex-shrink:0"></div>
          <span style="color:var(--text-muted);font-size:0.72rem">${teamNames[j.team]||j.team}</span>
        </div>
        <div class="jersey-sizes">${j.sizes.map(s=>`<span class="size-dot">${s}</span>`).join('')}</div>
        <div class="jersey-footer">
          <div><span class="jersey-price">₹${j.price.toLocaleString()}</span><span class="jersey-mrp">₹${j.mrp.toLocaleString()}</span><span class="jersey-discount">-${disc}%</span></div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="add-to-cart-btn" ${!j.inStock?'disabled':''} onclick="${j.inStock?`openAddJersey('${j.id}')`:''}">${j.inStock?'🛒 ADD':'OOS'}</button>
            ${j.inStock?`<button class="buy-now-jersey-btn" onclick="openBuyNow('jersey','${j.id}')">Buy Now</button>`:''}
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ================================================================
// MERCH GRID
// ================================================================
let activeMerchCat='all';
function filterMerch(cat,btn){
  activeMerchCat=cat;
  document.querySelectorAll('.mct-btn').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  renderMerchGrid();
}
function renderMerchGrid(){
  const grid=document.getElementById('merch-grid');
  if(!grid)return;
  const list=activeMerchCat==='all'?MERCHANDISE:MERCHANDISE.filter(m=>m.cat===activeMerchCat);
  grid.innerHTML=list.map(m=>{
    const disc=Math.round((m.mrp-m.price)/m.mrp*100);
    const catColors={bats:'#f0a500',signed:'#a855f7',accessories:'#00d97e',collectibles:'#e85d04'};
    const cc=catColors[m.cat]||'#888';
    const imgUrl=(MERCH_IMG_MAP[m.id]||'')+'?nocache='+m.id+'_v28';
    return `<div class="merch-card">
      <div class="merch-img-box" style="position:relative;overflow:hidden;background:#060f1f;height:190px">
        ${m.limited?'<div class="merch-limited-badge">LIMITED</div>':''}
        <img src="${imgUrl}" alt="${m.name}"
          style="width:100%;height:190px;object-fit:cover;display:block;transition:transform 0.3s"
          onmouseover="this.style.transform='scale(1.05)'"
          onmouseout="this.style.transform='scale(1)'"
          onerror="this.outerHTML='<div style=\\'width:100%;height:190px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,${cc}18,${cc}06);gap:10px\\'><span style=\\'font-size:3.5rem\\'>${m.imgAlt||'🏏'}</span><span style=\\'font-family:Space Mono,monospace;font-size:0.65rem;color:${cc};text-transform:uppercase;letter-spacing:1px\\'>${m.cat}</span></div>'">
        <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.55));padding:8px">
          <span style="background:${cc}22;color:${cc};border:1px solid ${cc}44;font-size:0.6rem;font-family:Space Mono,monospace;padding:2px 8px;border-radius:3px;text-transform:uppercase">${m.cat}</span>
        </div>
      </div>
      <div class="merch-info">
        <div class="merch-name">${m.name}</div>
        <div class="merch-desc">${m.desc}</div>
        <div class="merch-footer">
          <div><span class="merch-price">₹${m.price.toLocaleString()}</span><span class="merch-mrp">₹${m.mrp.toLocaleString()}</span><span style="font-size:0.68rem;color:var(--accent-green);margin-left:4px">-${disc}%</span></div>
          <div style="display:flex;gap:5px;flex-wrap:wrap">
            <button class="merch-add-btn" onclick="openAddMerch('${m.id}')">🛒 CART</button>
            <button class="merch-buy-btn" onclick="openBuyNow('merch','${m.id}')">Buy Now</button>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ================================================================
// INIT
// ================================================================
document.addEventListener('DOMContentLoaded',()=>{
  renderHomePortal();
  renderTicketMatches(IPL_MATCHES);
  buildJerseyTeamTabs();
  filterJerseys();
  renderMerchGrid();
  updateCartBadge();
  renderCartItems();
});
