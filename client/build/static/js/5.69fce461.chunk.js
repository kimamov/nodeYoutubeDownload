(this["webpackJsonpyt-downloader"]=this["webpackJsonpyt-downloader"]||[]).push([[5],{34:function(e,t,n){"use strict";n.d(t,"d",(function(){return m})),n.d(t,"b",(function(){return v})),n.d(t,"a",(function(){return h})),n.d(t,"c",(function(){return b})),n.d(t,"e",(function(){return g}));var a=n(35),r=n.n(a),c=n(36),o=n(37),i=n.n(o),u=n(38),s=n(39),l=n.n(s),f="/api",d=f+"/ytdl";function m(e){return p.apply(this,arguments)}function p(){return(p=Object(c.a)(r.a.mark((function e(t){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(d,"/simpleinfo?videolink=").concat(t));case 2:if(!((n=e.sent).status>=400)){e.next=5;break}throw new Error(n);case 5:return e.next=7,n.json();case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(e,t,n,a){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(e){return console.log(e)},c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:function(e){return console.log(e)};l()({url:"".concat(d,"/download?videolink=").concat(e).concat(t?"&format=".concat(t):""),method:"GET",responseType:"arraybuffer",onDownloadProgress:a?function(e){console.log(e.loaded),r(e.loaded)}:null}).then((function(e){var t=a?a.format.container:"mp4";Object(u.saveAs)(new Blob([e.data]),n?"".concat(n,".").concat(t):"video".concat(Date.now(),".mp4")),c("finished")})).catch((function(e){console.log(e),c("failed! :(")}))}function h(e,t,n,a,r){var c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:function(e){return console.log(e)},o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:function(e){return console.log(e)};l()({url:"".concat(d,"/downloadmp3?videolink=").concat(e).concat(t?"&format=".concat(t):""),method:"GET",responseType:"arraybuffer",onDownloadProgress:a?function(e){c(e.loaded)}:null}).then((function(e){var t=new i.a(e.data);if(r){var a=r.title,c=r.artist;r.cover;a&&t.setFrame("TIT2",a),c&&t.setFrame("TPE1",[c])}t.addTag();var s=t.getBlob();Object(u.saveAs)(s,n?"".concat(n,".mp3"):"music".concat(Date.now(),".mp3")),o("finished")})).catch((function(e){console.log(e),o("failed! :(")}))}function b(e,t){return l()({url:"".concat(d,"/getsize?videolink=").concat(e).concat(t?"&format=".concat(t):""),method:"GET"})}function g(e,t){return fetch("".concat(f,"/search?q=").concat(e).concat(t?"&page="+t:"")).then((function(e){if(!e.ok)throw Error(e.statusText);return e.json()}))}},42:function(e,t,n){"use strict";var a=n(8),r=n(0),c=n.n(r);t.a=function(e){var t=e.onSubmit,n=e.placeholder,o=void 0===n?"SEARCH FOR YOUTUBE URL":n,i=e.match,u=Object(r.useState)(""),s=Object(a.a)(u,2),l=s[0],f=s[1];return Object(r.useEffect)((function(){i.params.query?f(decodeURIComponent(i.params.query)):f("")}),[i.params.query]),c.a.createElement("form",{onSubmit:function(e){e.preventDefault(),t(l)},id:"searchbar",className:"margin0Auto"},c.a.createElement("input",{value:l,onChange:function(e){return f(e.target.value)},placeholder:o,type:"text",id:"searchText",required:!0}),c.a.createElement("input",{type:"submit",value:"SEARCH",id:"searchSubmit"}))}},43:function(e,t,n){"use strict";var a=n(0),r=n.n(a);t.a=function(){return r.a.createElement("div",{className:"loading centerText textUpper"},"LOADING...")}},44:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(13),o=n.n(c);t.a=function(e){var t=e.text,n=void 0===t?"YOUTUBE COON":t;return r.a.createElement("div",{id:"banner",className:"centerText"},r.a.createElement("img",{alt:"panda",src:o.a}),r.a.createElement("h1",null,n))}},73:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(5),o=n(42);function i(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=n(8),l=n(7),f=function(e){var t=e.video,n=t&&t.link?t.link.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)[1]:"";return r.a.createElement(l.b,{to:"/video/".concat(n)},r.a.createElement("div",{id:"videoListCard",className:"pointer"},r.a.createElement("img",{alt:"video thumbnail",src:t.thumbnail}),r.a.createElement("h3",null,t.title)))},d=function(e){var t=e.videos,n=void 0===t?[]:t;return r.a.createElement("section",{id:"videoList"},n.map((function(e){return r.a.createElement(f,{key:e.link,video:e})})))},m=n(43),p=n(34),v=function(e){var t=Object(a.useRef)();return Object(a.useEffect)((function(){t.current=e}),[e]),t.current};function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(n,!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=function(e,t){for(var n=t.length-1;n>=0;n--)for(var a=0;a<e.length;a++)if(e[a].link===t[n].link){t.splice(n,1);break}return t},E=new Set,y=function(e){var t=e.page,n=void 0===t?1:t,a=e.query;return r.a.createElement("div",{id:"pageNavContainer"},n>1&&r.a.createElement(l.b,{to:"/search/".concat(a,"/").concat(Number(n)-1),className:"undecoratedLink centerText"},r.a.createElement("h3",{id:"videoSearchNav"},"PREV")),r.a.createElement(l.b,{to:"/search/".concat(a,"/").concat(Number(n)+1),className:"undecoratedLink centerText"},r.a.createElement("h3",{id:"videoSearchNav"},"NEXT")))},O=function(e){var t=e.match,n=(e.history,Object(a.useState)(null)),c=Object(s.a)(n,2),o=c[0],u=c[1],f=Object(a.useState)(null),h=Object(s.a)(f,2),O=h[0],j=h[1],w=v(t.params.page||1),T=v(t.params.query);return Object(a.useEffect)((function(){T!==t.params.query||E.has(t.params.page)||(j(null),Object(p.e)(t.params.query,t.params.page).catch((function(e){console.log(e),j(!0)})).then((function(e){if(E.add(t.params.page),w>t.params.page)return u(b({},e,{videos:[].concat(i(g(o.videos,e.videos)),i(o.videos))}));u(b({},e,{videos:[].concat(i(o.videos),i(g(o.videos,e.videos)))}))})))}),[t.params.page]),Object(a.useEffect)((function(){return j(null),Object(p.e)(t.params.query,t.params.page).catch((function(e){console.log(e),j(!0)})).then((function(e){E.add(t.params.page),u(e)})),function(){E.clear()}}),[t.params.query]),O?r.a.createElement(l.b,{to:"/search"},r.a.createElement("h1",{className:"centerText errorMessage"},"SEARCH FAILED!")):o&&o.videos.length?r.a.createElement(r.a.Fragment,null,r.a.createElement(d,{videos:o.videos}),r.a.createElement(y,{page:t.params.page,query:t.params.query})):r.a.createElement(m.a,null)},j=n(44);t.default=function(e){var t=e.history;e.match;return r.a.createElement("div",{className:"inner"},r.a.createElement(j.a,{text:"YOUTUBE COON <SEARCH>"}),r.a.createElement(c.a,{path:"/search/:query?",render:function(e){var n=e.match;return r.a.createElement(o.a,{match:n,placeholder:"SEARCH FOR VIDEO",onSubmit:function(e){return t.push("/search/".concat(encodeURIComponent(e),"/1"))}})}}),r.a.createElement(c.a,{path:"/search/:query/:page?",component:O}))}}}]);
//# sourceMappingURL=5.69fce461.chunk.js.map