if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const f=e=>n(e,i),o={module:{uri:i},exports:t,require:f};s[i]=Promise.all(a.map((e=>o[e]||f(e)))).then((e=>(c(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"155f48279dbfc77a2bb24e86f9a24895"},{url:"/_next/static/F0mpAQfVMlcpLf57XXZ2a/_buildManifest.js",revision:"35e98385413b509a6e07120a034ada4c"},{url:"/_next/static/F0mpAQfVMlcpLf57XXZ2a/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/14-708996d047c54a2f.js",revision:"F0mpAQfVMlcpLf57XXZ2a"},{url:"/_next/static/chunks/4bd1b696-fed123c76ed00bc4.js",revision:"F0mpAQfVMlcpLf57XXZ2a"},{url:"/_next/static/chunks/517-209321341b8bdff2.js",revision:"F0mpAQfVMlcpLf57XXZ2a"},{url:"/_next/static/chunks/app/_not-found/page-1c507256defa9281.js",revision:"F0mpAQfVMlcpLf57XXZ2a"},{url:"/_next/static/chunks/app/layout-35b029163d07fd9f.js",revision:"F0mpAQfVMlcpLf57XXZ2a"},{url:"/_next/static/chunks/app/page-14fbdefaeeb69cf8.js",revision:"F0mpAQfVMlcpLf57XXZ2a"},{url:"/_next/static/chunks/framework-6b27c2b7aa38af2d.js",revision:"F0mpAQfVMlcpLf57XXZ2a"},{url:"/_next/static/chunks/main-app-cbba11cb442fe986.js",revision:"F0mpAQfVMlcpLf57XXZ2a"},{url:"/_next/static/chunks/main-fc70824132101adf.js",revision:"F0mpAQfVMlcpLf57XXZ2a"},{url:"/_next/static/chunks/pages/_app-d23763e3e6c904ff.js",revision:"F0mpAQfVMlcpLf57XXZ2a"},{url:"/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js",revision:"F0mpAQfVMlcpLf57XXZ2a"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-d85b57e9df896aa3.js",revision:"F0mpAQfVMlcpLf57XXZ2a"},{url:"/_next/static/css/a63524e425603c53.css",revision:"a63524e425603c53"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/favicon.png",revision:"2adb17e148bf884f274532c8a462a41c"},{url:"/favicon.svg",revision:"b648e2d39c95b1f4b667cc4811508f9e"},{url:"/icons/icon-128x128.png",revision:"cb7ec2223d19e12c525552815fbae498"},{url:"/icons/icon-144x144.png",revision:"b20cb354bb8d132c805e50fa43a55329"},{url:"/icons/icon-152x152.png",revision:"2bbf256fdc5d3aad9d5e14468098057b"},{url:"/icons/icon-16x16.png",revision:"70962a2f7dd73404e92b5492c0cba96d"},{url:"/icons/icon-192x192.png",revision:"2ba5483c45fb5fab20029cec70e2fd27"},{url:"/icons/icon-32x32.png",revision:"2adb17e148bf884f274532c8a462a41c"},{url:"/icons/icon-384x384.png",revision:"5872a6d591cd200b47baedf4722940d3"},{url:"/icons/icon-512x512.png",revision:"465e8781911d85bf4c736b9326f7743c"},{url:"/icons/icon-72x72.png",revision:"7efad97dead3044ddb9fce849afb2fca"},{url:"/icons/icon-96x96.png",revision:"c05369ef492633011667f8e137e11d76"},{url:"/manifest.json",revision:"4459ef137fc457ff0c94efd80e72b8eb"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));