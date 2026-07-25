/* Sahawan Clinic PWA — cache-first app shell (ข้อมูลผู้ใช้อยู่ใน localStorage ไม่เกี่ยวกับ cache นี้) */
const CACHE = "sahawan-v1";
const SHELL = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon-64.png",
  "icons/icon-180.png",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// app shell = cache first, fallback network · อื่นๆ (ลิงก์ citation ฯลฯ) = network ตรง
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(
      (hit) =>
        hit ||
        fetch(e.request).then((res) => {
          if (res.ok && url.pathname.startsWith(new URL("./", location).pathname)) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
    )
  );
});
