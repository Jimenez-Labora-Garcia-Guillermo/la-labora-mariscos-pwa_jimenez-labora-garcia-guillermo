module.exports = {
  globDirectory: "./",
  globPatterns: [
    "**/*.{html,css,js,json,svg,png,jpg,jpeg,webp}"
  ],
  // Lo que NO debe entrar al caché de la PWA
  globIgnores: [
    "docs/**",
    "servidor-ssr*/**",
    "node_modules/**",
    "workbox-config.js",
    "workbox-*.js",
    "sw.js",
    "**/*lighthouse*"
  ],
  swDest: "sw.js",
  // el Service Worker nuevo se activa y toma el control sin esperar a cerrar pestañas
  skipWaiting: true,
  clientsClaim: true,
  // Leaflet viene de un CDN: se guarda la primera vez que se usa para que el mapa
  // siga cargando después aunque no haya internet
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/,
      handler: "CacheFirst",
      options: {
        cacheName: "cdn-leaflet",
        cacheableResponse: { statuses: [0, 200] }
      }
    }
  ]
};
