"use strict";function supportWebP(){var A=document.createElement("canvas");if(A.getContext&&A.getContext("2d")){var e="image/webp";return 0===A.toDataURL(e).indexOf("data:"+e)}return!1}function supportAVIF(){return new Promise((function(A){var e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=",e.onerror=function(){A(!1)},e.onload=function(){A(!0)},setTimeout((function(){A(!1)}),1e3)}))}function ossCompress(A,e){var t="",s="";if("undefined"!=typeof document){var o=document.createElement("a");o.href=A,t=o.search,s=o.hostname}else if("function"==typeof URL){var r=new URL(/^\/\//.test(A)?"https:"+A:A);t=r.search,s=r.hostname}if(s=s.toLowerCase(),-1===["liveimages.videocc.net","vod-assets.videocc.net","polyvschool.videocc.net","img.videocc.net"].indexOf(s)||/(?:\?|&)x-oss-process(?:=|&|$)/.test(t))return A;var n="";return null==e.width&&null==e.height||(n+="/resize",e.width&&(n+=",w_"+e.width),e.height&&(n+=",h_"+e.height),n+=",limit_1"),e.allowAVIF?n+="/format,avif":e.allowWebP&&(n+="/format,webp"),n&&(n="x-oss-process=image"+n,A+=(-1===A.indexOf("?")?"?":"&")+n),A}function compressHTMLImgs(A,e){return A?A.replace(/(<img.*?\ssrc=)(["']?)(.+?)\2(.*?>)/gi,(function(A,t,s,o,r){return t+'"'+ossCompress(o,e)+'" data-src="'+o+'"'+r})):""}Object.defineProperty(exports,"__esModule",{value:!0}),exports.supportWebP=supportWebP,exports.supportAVIF=supportAVIF,exports.ossCompress=ossCompress,exports.compressHTMLImgs=compressHTMLImgs;