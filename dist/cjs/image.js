"use strict";function supportWebP(){var A=document.createElement("canvas");if(A.getContext&&A.getContext("2d")){var e="image/webp";return 0===A.toDataURL(e).indexOf("data:"+e)}return!1}function supportAVIF(){return new Promise((function(A){var e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=",e.onerror=function(){A(!1)},e.onload=function(){A(!0)},setTimeout((function(){A(!1)}),1e3)}))}function genOssProcessParams(A,e){var t="";return null==e.width&&null==e.height||(t+="/resize",e.width&&(t+=",w_"+e.width),e.height&&(t+=",h_"+e.height),t+=",limit_1"),"gif"!==A&&(e.allowAVIF?t+="/format,avif":e.allowWebP?t+="/format,webp/quality,Q_80":e.allowJPG&&(t+="/format,jpg/quality,Q_80")),t}function ossCompress(A,e){var t;if("undefined"!=typeof document){var s=document.createElement("a");s.href=A,t=s}else"function"==typeof URL&&(t=new URL(/^\/\//.test(A)?"https:"+A:A));if(!t)return A;if(-1===["liveimages.videocc.net","vod-assets.videocc.net","polyvschool.videocc.net","img.videocc.net"].indexOf(t.hostname)||/(?:\?|&)x-oss-process(?:=|&|$)/.test(t.search))return A;var o=(t.pathname.split("/").pop()||"").split("."),r=genOssProcessParams(o[o.length-1].toLowerCase(),e);if(r){var n=t.search;n+=(-1===n.indexOf("?")?"?":"&")+"x-oss-process=image"+r,t.search=n}return t.href}function compressHTMLImgs(A,e){return A?A.replace(/(<img.*?\ssrc=)(["']?)(.+?)\2(.*?>)/gi,(function(A,t,s,o,r){return t+'"'+ossCompress(o,e)+'" data-src="'+o+'"'+r})):""}Object.defineProperty(exports,"__esModule",{value:!0}),exports.supportWebP=supportWebP,exports.supportAVIF=supportAVIF,exports.ossCompress=ossCompress,exports.compressHTMLImgs=compressHTMLImgs;