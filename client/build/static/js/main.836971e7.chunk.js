(this["webpackJsonpyt-downloader"]=this["webpackJsonpyt-downloader"]||[]).push([[1],{13:function(e,n,t){e.exports=t.p+"static/media/coon.c7bb7959.png"},16:function(e,n,t){"use strict";function a(e){if(e&&e.location&&e.location.search){var n=new URL(window.location.toString()).searchParams.get("url");if(n){var t=o(n);if(t)return e.push("/video/".concat(t));e.push("/")}}}function o(e){var n=e.match(/^.*(youtu.be\/|youtube(-nocookie)?.com\/(v\/|.*u\/\w\/|embed\/|.*v=))([\w-]{11}).*/);return!(!n||!n[4])&&n[4]}t.d(n,"b",(function(){return a})),t.d(n,"a",(function(){return o}))},21:function(e,n,t){e.exports=t(32)},26:function(e,n,t){},27:function(e,n,t){},32:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(17),i=t.n(r),c=(t(26),t(8)),l=(t(27),t(7)),u=t(5),s=t(13),d=t.n(s),f=function(){return o.a.createElement(l.b,{id:"mainIcon",className:"centerAll",to:"/"},"YT",o.a.createElement("img",{src:d.a,alt:"coon icon"}),"COON")},m=function(){return o.a.createElement("nav",{id:"nav"},o.a.createElement("div",{className:"inner"},o.a.createElement(f,null),o.a.createElement("section",null,o.a.createElement(l.b,{to:"/search",className:"pointer undecoratedLink"},"SEARCH"))))},h=t(16),v=function(){var e=Object(a.useState)(!1),n=Object(c.a)(e,2),t=n[0],r=n[1];return Object(a.useEffect)((function(){var e=setTimeout((function(){return r(!0)}),800);return function(){clearTimeout(e)}}),[]),t&&o.a.createElement("div",{id:"loadingScreen",className:"centerAll"},"LOADING...")},b=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(6)]).then(t.bind(null,71))})),w=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(7)]).then(t.bind(null,72))})),g=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(5)]).then(t.bind(null,73))})),p=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(4)]).then(t.bind(null,74))}));var E=function(){var e=Object(a.useState)(null),n=Object(c.a)(e,2),t=n[0],r=n[1],i=Object(a.useState)(window.innerHeight),s=Object(c.a)(i,2),d=s[0],f=s[1];return Object(a.useEffect)((function(){var e=window.addEventListener("resize",(function(){f(window.innerHeight)}));return function(){window.removeEventListener(e)}}),[]),o.a.createElement(l.a,null,o.a.createElement("div",{style:{minHeight:"".concat(d,"px")},className:"fullSizeContainer borderBox"},o.a.createElement(a.Suspense,{fallback:v},o.a.createElement(m,null),o.a.createElement("main",null,o.a.createElement(u.c,null,o.a.createElement(u.a,{path:"/share",render:function(e){var n=e.history;return Object(h.b)(n)}}),o.a.createElement(u.a,{path:"/search",component:g}),o.a.createElement(u.a,{path:"/",render:function(e){var n=e.history;return o.a.createElement(p,{history:n,video:t,setVideo:r})}})),o.a.createElement(u.a,{path:"/video/:query/confirm/:itag",render:function(e){return o.a.createElement(b,Object.assign({},e,{video:t}))}}),o.a.createElement(u.a,{path:"/video/:query/confirm_mp3/:itag",render:function(e){return o.a.createElement(w,Object.assign({},e,{video:t}))}})),o.a.createElement("footer",{className:"centerText"},o.a.createElement("p",null,"found a bug or have a question?"),o.a.createElement("a",{href:"mailto:kantemir.imam@gmail.com"},"<Contact!>")))))},y=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function O(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(o.a.createElement(E,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("","/service-worker.js");y?(!function(e,n){fetch(e).then((function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):O(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):O(n,e)}))}}()}},[[21,2,3]]]);
//# sourceMappingURL=main.836971e7.chunk.js.map