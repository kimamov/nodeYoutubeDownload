(this["webpackJsonpyt-downloader"]=this["webpackJsonpyt-downloader"]||[]).push([[6],{34:function(e,t,n){"use strict";n.d(t,"d",(function(){return m})),n.d(t,"b",(function(){return v})),n.d(t,"a",(function(){return h})),n.d(t,"c",(function(){return g})),n.d(t,"e",(function(){return w}));var a=n(35),o=n.n(a),c=n(36),r=n(37),i=n.n(r),u=n(38),s=n(39),l=n.n(s),d="/api",f=d+"/ytdl";function m(e){return p.apply(this,arguments)}function p(){return(p=Object(c.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(f,"/simpleinfo?videolink=").concat(t));case 2:if(!((n=e.sent).status>=400)){e.next=5;break}throw new Error(n);case 5:return e.next=7,n.json();case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(e,t,n,a){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(e){return console.log(e)},c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:function(e){return console.log(e)};l()({url:"".concat(f,"/download?videolink=").concat(e).concat(t?"&format=".concat(t):""),method:"GET",responseType:"arraybuffer",onDownloadProgress:a?function(e){console.log(e.loaded),o(e.loaded)}:null}).then((function(e){var t=a?a.format.container:"mp4";Object(u.saveAs)(new Blob([e.data]),n?"".concat(n,".").concat(t):"video".concat(Date.now(),".mp4")),c("finished")})).catch((function(e){console.log(e),c("failed! :(")}))}function h(e,t,n,a,o){var c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:function(e){return console.log(e)},r=arguments.length>6&&void 0!==arguments[6]?arguments[6]:function(e){return console.log(e)};l()({url:"".concat(f,"/downloadmp3?videolink=").concat(e).concat(t?"&format=".concat(t):""),method:"GET",responseType:"arraybuffer",onDownloadProgress:a?function(e){c(e.loaded)}:null}).then((function(e){var t=new i.a(e.data);if(o){var a=o.title,c=o.artist;o.cover;a&&t.setFrame("TIT2",a),c&&t.setFrame("TPE1",[c])}t.addTag();var s=t.getBlob();Object(u.saveAs)(s,n?"".concat(n,".mp3"):"music".concat(Date.now(),".mp3")),r("finished")})).catch((function(e){console.log(e),r("failed! :(")}))}function g(e,t){return l()({url:"".concat(f,"/getsize?videolink=").concat(e).concat(t?"&format=".concat(t):""),method:"GET"})}function w(e,t){return fetch("".concat(d,"/search?q=").concat(e).concat(t?"&page="+t:"")).then((function(e){if(!e.ok)throw Error(e.statusText);return e.json()}))}},40:function(e,t,n){"use strict";var a=n(0),o=n.n(a);t.a=function(e){var t=e.onClick;e.className;return o.a.createElement("div",{onClick:t,id:"closeIcon",className:"centerAll pointer"},o.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24"},o.a.createElement("path",{d:"M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"})))}},41:function(e,t,n){"use strict";var a=n(0),o=n.n(a);t.a=function(e){var t=e.size,n=e.progress;return o.a.createElement("div",{className:"progressContainer centerText fancyShadow"},o.a.createElement("p",null,"SIZE: ",(t/1e6).toFixed(2)," MB"),o.a.createElement("progress",{value:n,max:t}))}},71:function(e,t,n){"use strict";n.r(t);var a=n(8),o=n(0),c=n.n(o),r=n(34),i=n(40),u=n(41);t.default=function(e){var t=e.match,n=e.video,s=e.history,l=Object(o.useState)("download"),d=Object(a.a)(l,2),f=d[0],m=d[1],p=Object(o.useState)(""),v=Object(a.a)(p,2),h=v[0],g=v[1],w=Object(o.useState)(0),b=Object(a.a)(w,2),E=b[0],y=b[1],O=Object(o.useState)(""),j=Object(a.a)(O,2),k=(j[0],j[1]),x=Object(o.useState)(0),T=Object(a.a)(x,2),N=T[0],S=T[1],D=function(){y(null),S(0),k(""),m("download")},A=function(){s.push("/video/".concat(t.params.query))};return Object(o.useEffect)((function(){D(),n&&g(n.title),Object(r.c)(t.params.query,t.params.itag).then((function(e){y(e.data)})).catch((function(e){console.log(e),k("failed to get videoinfo... you can try download anyway")}))}),[n,t.params.query,t.params.itag]),n?c.a.createElement("div",{id:"confirmModal",className:"centerAll"},c.a.createElement("form",{id:"customNameForm",onSubmit:function(e){return e.preventDefault(),"download"===f?(m("loading"),Object(r.b)(t.params.query,t.params.itag,h,E,(function(e){return S(e)}),(function(e){return m(e)}))):"failed :("===f?D():"finished"===f?A():void 0}},c.a.createElement(i.a,{onClick:A}),c.a.createElement("h1",{className:"centerText"},"CONFIRM DOWNLOAD"),E&&c.a.createElement(u.a,{size:E.size,progress:N}),c.a.createElement("input",{value:h,onChange:function(e){return g(e.target.value)},type:"text"}),c.a.createElement("input",{className:"submit hoverShadow",value:f,type:"submit"}))):c.a.createElement("div",{id:"confirmModal",className:"centerAll"},c.a.createElement("h1",null,"LOADING"))}}}]);
//# sourceMappingURL=6.2fa2c3e7.chunk.js.map