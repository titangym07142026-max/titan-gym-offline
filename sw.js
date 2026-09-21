const CACHE='titan-gym-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./sw.js'];
self.addEventListener('install',e=>{
 e.waitUntil(caches.open(CACHE).then(async c=>{
   await c.addAll(CORE);
   try{await c.add('https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js')}catch(e){}
 }).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
   const copy=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return res;
 }).catch(()=>caches.match('./index.html'))));
});