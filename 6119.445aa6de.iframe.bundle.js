/*! For license information please see 6119.445aa6de.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkussf_portal=self.webpackChunkussf_portal||[]).push([[6119],{"./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":function(module,__unused_webpack_exports,__webpack_require__){"use strict";var reactIs=__webpack_require__("./node_modules/react-is/index.js"),REACT_STATICS={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},KNOWN_STATICS={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},MEMO_STATICS={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},TYPE_STATICS={};function getStatics(component){return reactIs.isMemo(component)?MEMO_STATICS:TYPE_STATICS[component.$$typeof]||REACT_STATICS}TYPE_STATICS[reactIs.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},TYPE_STATICS[reactIs.Memo]=MEMO_STATICS;var defineProperty=Object.defineProperty,getOwnPropertyNames=Object.getOwnPropertyNames,getOwnPropertySymbols=Object.getOwnPropertySymbols,getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor,getPrototypeOf=Object.getPrototypeOf,objectPrototype=Object.prototype;module.exports=function hoistNonReactStatics(targetComponent,sourceComponent,blacklist){if("string"!=typeof sourceComponent){if(objectPrototype){var inheritedComponent=getPrototypeOf(sourceComponent);inheritedComponent&&inheritedComponent!==objectPrototype&&hoistNonReactStatics(targetComponent,inheritedComponent,blacklist)}var keys=getOwnPropertyNames(sourceComponent);getOwnPropertySymbols&&(keys=keys.concat(getOwnPropertySymbols(sourceComponent)));for(var targetStatics=getStatics(targetComponent),sourceStatics=getStatics(sourceComponent),i=0;i<keys.length;++i){var key=keys[i];if(!(KNOWN_STATICS[key]||blacklist&&blacklist[key]||sourceStatics&&sourceStatics[key]||targetStatics&&targetStatics[key])){var descriptor=getOwnPropertyDescriptor(sourceComponent,key);try{defineProperty(targetComponent,key,descriptor)}catch(e){}}}}return targetComponent}},"./node_modules/launchdarkly-react-client-sdk/lib/esm/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Vb:function(){return esm_ce}});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),console=__webpack_require__("./node_modules/console-browserify/index.js");function ldclient_es_e(e){function t(e,t){Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.message=e,this.code=t}return t.prototype=new Error,t.prototype.name=e,t.prototype.constructor=t,t}const ldclient_es_t=ldclient_es_e("LaunchDarklyUnexpectedResponseError"),ldclient_es_n=ldclient_es_e("LaunchDarklyInvalidEnvironmentIdError"),r=ldclient_es_e("LaunchDarklyInvalidUserError"),ldclient_es_o=ldclient_es_e("LaunchDarklyInvalidEventKeyError"),ldclient_es_i=ldclient_es_e("LaunchDarklyInvalidArgumentError"),ldclient_es_a=ldclient_es_e("LaunchDarklyFlagFetchError");for(var ldclient_es_s={LDUnexpectedResponseError:ldclient_es_t,LDInvalidEnvironmentIdError:ldclient_es_n,LDInvalidUserError:r,LDInvalidEventKeyError:ldclient_es_o,LDInvalidArgumentError:ldclient_es_i,LDInvalidDataError:ldclient_es_e("LaunchDarklyInvalidDataError"),LDFlagFetchError:ldclient_es_a,isHttpErrorRecoverable:function(e){return!(e>=400&&e<500)||400===e||408===e||429===e}},d=[],f=[],g="undefined"!=typeof Uint8Array?Uint8Array:Array,v="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",p=0;p<64;++p)d[p]=v[p],f[v.charCodeAt(p)]=p;function m(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=e.indexOf("=");return-1===n&&(n=t),[n,n===t?0:4-n%4]}function h(e,t,n){for(var r,o,i=[],a=t;a<n;a+=3)r=(e[a]<<16&16711680)+(e[a+1]<<8&65280)+(255&e[a+2]),i.push(d[(o=r)>>18&63]+d[o>>12&63]+d[o>>6&63]+d[63&o]);return i.join("")}f["-".charCodeAt(0)]=62,f["_".charCodeAt(0)]=63;var y={byteLength:function(e){var t=m(e),n=t[0],r=t[1];return 3*(n+r)/4-r},toByteArray:function(e){var t,n,r=m(e),o=r[0],i=r[1],a=new g(function(e,t,n){return 3*(t+n)/4-n}(0,o,i)),s=0,c=i>0?o-4:o;for(n=0;n<c;n+=4)t=f[e.charCodeAt(n)]<<18|f[e.charCodeAt(n+1)]<<12|f[e.charCodeAt(n+2)]<<6|f[e.charCodeAt(n+3)],a[s++]=t>>16&255,a[s++]=t>>8&255,a[s++]=255&t;return 2===i&&(t=f[e.charCodeAt(n)]<<2|f[e.charCodeAt(n+1)]>>4,a[s++]=255&t),1===i&&(t=f[e.charCodeAt(n)]<<10|f[e.charCodeAt(n+1)]<<4|f[e.charCodeAt(n+2)]>>2,a[s++]=t>>8&255,a[s++]=255&t),a},fromByteArray:function(e){for(var t,n=e.length,r=n%3,o=[],i=16383,a=0,s=n-r;a<s;a+=i)o.push(h(e,a,a+i>s?s:a+i));return 1===r?(t=e[n-1],o.push(d[t>>2]+d[t<<4&63]+"==")):2===r&&(t=(e[n-2]<<8)+e[n-1],o.push(d[t>>10]+d[t>>4&63]+d[t<<2&63]+"=")),o.join("")}},w=Array.isArray,b=Object.keys,k=Object.prototype.hasOwnProperty,E=function e(t,n){if(t===n)return!0;if(t&&n&&"object"==typeof t&&"object"==typeof n){var r,o,i,a=w(t),s=w(n);if(a&&s){if((o=t.length)!=n.length)return!1;for(r=o;0!=r--;)if(!e(t[r],n[r]))return!1;return!0}if(a!=s)return!1;var c=t instanceof Date,u=n instanceof Date;if(c!=u)return!1;if(c&&u)return t.getTime()==n.getTime();var l=t instanceof RegExp,d=n instanceof RegExp;if(l!=d)return!1;if(l&&d)return t.toString()==n.toString();var f=b(t);if((o=f.length)!==b(n).length)return!1;for(r=o;0!=r--;)if(!k.call(n,f[r]))return!1;for(r=o;0!=r--;)if(!e(t[i=f[r]],n[i]))return!1;return!0}return t!=t&&n!=n};const D=["key","ip","country","email","firstName","lastName","avatar","name"];function C(e){const t=unescape(encodeURIComponent(e));return y.fromByteArray(function(e){const t=[];for(let n=0;n<e.length;n++)t.push(e.charCodeAt(n));return t}(t))}function x(e){return C(e).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function P(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var S,I={appendUrlPath:function(e,t){return(e.endsWith("/")?e.substring(0,e.length-1):e)+(t.startsWith("/")?"":"/")+t},base64URLEncode:x,btoa:C,chunkEventsForUrl:function(e,t){const n=t.slice(0),r=[];let o,i=e;for(;n.length>0;){for(o=[];i>0;){const e=n.shift();if(!e)break;i-=x(JSON.stringify(e)).length,i<0&&o.length>0?n.unshift(e):o.push(e)}i=e,r.push(o)}return r},clone:function(e){return JSON.parse(JSON.stringify(e))},deepEquals:function(e,t){return E(e,t)},extend:function(...e){return e.reduce(((e,t)=>({...e,...t})),{})},getLDUserAgentString:function(e){const t=e.version||"?";return e.userAgent+"/"+t},objectHasOwnProperty:P,onNextTick:function(e){setTimeout(e,0)},sanitizeContext:function(e){if(!e)return e;let t;return null!==e.kind&&void 0!==e.kind||D.forEach((n=>{const r=e[n];void 0!==r&&"string"!=typeof r&&(t=t||{...e},t[n]=String(r))})),t||e},transformValuesToVersionedValues:function(e){const t={};for(const n in e)P(e,n)&&(t[n]={value:e[n],version:0});return t},transformVersionedValuesToValues:function(e){const t={};for(const n in e)P(e,n)&&(t[n]=e[n].value);return t},wrapPromiseCallback:function(e,t){const n=e.then((e=>(t&&setTimeout((()=>{t(null,e)}),0),e)),(e=>{if(!t)return Promise.reject(e);setTimeout((()=>{t(e,null)}),0)}));return t?void 0:n}},O=new Uint8Array(16);function L(){if(!S&&!(S="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return S(O)}var U=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function T(e){return"string"==typeof e&&U.test(e)}for(var R,A,j=[],F=0;F<256;++F)j.push((F+256).toString(16).substr(1));function N(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(j[e[t+0]]+j[e[t+1]]+j[e[t+2]]+j[e[t+3]]+"-"+j[e[t+4]]+j[e[t+5]]+"-"+j[e[t+6]]+j[e[t+7]]+"-"+j[e[t+8]]+j[e[t+9]]+"-"+j[e[t+10]]+j[e[t+11]]+j[e[t+12]]+j[e[t+13]]+j[e[t+14]]+j[e[t+15]]).toLowerCase();if(!T(n))throw TypeError("Stringified UUID is invalid");return n}var $=0,V=0;function H(e){if(!T(e))throw TypeError("Invalid UUID");var t,n=new Uint8Array(16);return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n}function q(e,t,n){function r(e,r,o,i){if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));for(var t=[],n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof r&&(r=H(r)),16!==r.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var a=new Uint8Array(16+e.length);if(a.set(r),a.set(e,r.length),(a=n(a))[6]=15&a[6]|t,a[8]=63&a[8]|128,o){i=i||0;for(var s=0;s<16;++s)o[i+s]=a[s];return o}return N(a)}try{r.name=e}catch(e){}return r.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",r.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",r}function M(e){return 14+(e+64>>>9<<4)+1}function K(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function _(e,t,n,r,o,i){return K((a=K(K(t,e),K(r,i)))<<(s=o)|a>>>32-s,n);var a,s}function J(e,t,n,r,o,i,a){return _(t&n|~t&r,e,t,o,i,a)}function z(e,t,n,r,o,i,a){return _(t&r|n&~r,e,t,o,i,a)}function B(e,t,n,r,o,i,a){return _(t^n^r,e,t,o,i,a)}function G(e,t,n,r,o,i,a){return _(n^(t|~r),e,t,o,i,a)}var W=q("v3",48,(function(e){if("string"==typeof e){var t=unescape(encodeURIComponent(e));e=new Uint8Array(t.length);for(var n=0;n<t.length;++n)e[n]=t.charCodeAt(n)}return function(e){for(var t=[],n=32*e.length,r="0123456789abcdef",o=0;o<n;o+=8){var i=e[o>>5]>>>o%32&255,a=parseInt(r.charAt(i>>>4&15)+r.charAt(15&i),16);t.push(a)}return t}(function(e,t){e[t>>5]|=128<<t%32,e[M(t)-1]=t;for(var n=1732584193,r=-271733879,o=-1732584194,i=271733878,a=0;a<e.length;a+=16){var s=n,c=r,u=o,l=i;n=J(n,r,o,i,e[a],7,-680876936),i=J(i,n,r,o,e[a+1],12,-389564586),o=J(o,i,n,r,e[a+2],17,606105819),r=J(r,o,i,n,e[a+3],22,-1044525330),n=J(n,r,o,i,e[a+4],7,-176418897),i=J(i,n,r,o,e[a+5],12,1200080426),o=J(o,i,n,r,e[a+6],17,-1473231341),r=J(r,o,i,n,e[a+7],22,-45705983),n=J(n,r,o,i,e[a+8],7,1770035416),i=J(i,n,r,o,e[a+9],12,-1958414417),o=J(o,i,n,r,e[a+10],17,-42063),r=J(r,o,i,n,e[a+11],22,-1990404162),n=J(n,r,o,i,e[a+12],7,1804603682),i=J(i,n,r,o,e[a+13],12,-40341101),o=J(o,i,n,r,e[a+14],17,-1502002290),n=z(n,r=J(r,o,i,n,e[a+15],22,1236535329),o,i,e[a+1],5,-165796510),i=z(i,n,r,o,e[a+6],9,-1069501632),o=z(o,i,n,r,e[a+11],14,643717713),r=z(r,o,i,n,e[a],20,-373897302),n=z(n,r,o,i,e[a+5],5,-701558691),i=z(i,n,r,o,e[a+10],9,38016083),o=z(o,i,n,r,e[a+15],14,-660478335),r=z(r,o,i,n,e[a+4],20,-405537848),n=z(n,r,o,i,e[a+9],5,568446438),i=z(i,n,r,o,e[a+14],9,-1019803690),o=z(o,i,n,r,e[a+3],14,-187363961),r=z(r,o,i,n,e[a+8],20,1163531501),n=z(n,r,o,i,e[a+13],5,-1444681467),i=z(i,n,r,o,e[a+2],9,-51403784),o=z(o,i,n,r,e[a+7],14,1735328473),n=B(n,r=z(r,o,i,n,e[a+12],20,-1926607734),o,i,e[a+5],4,-378558),i=B(i,n,r,o,e[a+8],11,-2022574463),o=B(o,i,n,r,e[a+11],16,1839030562),r=B(r,o,i,n,e[a+14],23,-35309556),n=B(n,r,o,i,e[a+1],4,-1530992060),i=B(i,n,r,o,e[a+4],11,1272893353),o=B(o,i,n,r,e[a+7],16,-155497632),r=B(r,o,i,n,e[a+10],23,-1094730640),n=B(n,r,o,i,e[a+13],4,681279174),i=B(i,n,r,o,e[a],11,-358537222),o=B(o,i,n,r,e[a+3],16,-722521979),r=B(r,o,i,n,e[a+6],23,76029189),n=B(n,r,o,i,e[a+9],4,-640364487),i=B(i,n,r,o,e[a+12],11,-421815835),o=B(o,i,n,r,e[a+15],16,530742520),n=G(n,r=B(r,o,i,n,e[a+2],23,-995338651),o,i,e[a],6,-198630844),i=G(i,n,r,o,e[a+7],10,1126891415),o=G(o,i,n,r,e[a+14],15,-1416354905),r=G(r,o,i,n,e[a+5],21,-57434055),n=G(n,r,o,i,e[a+12],6,1700485571),i=G(i,n,r,o,e[a+3],10,-1894986606),o=G(o,i,n,r,e[a+10],15,-1051523),r=G(r,o,i,n,e[a+1],21,-2054922799),n=G(n,r,o,i,e[a+8],6,1873313359),i=G(i,n,r,o,e[a+15],10,-30611744),o=G(o,i,n,r,e[a+6],15,-1560198380),r=G(r,o,i,n,e[a+13],21,1309151649),n=G(n,r,o,i,e[a+4],6,-145523070),i=G(i,n,r,o,e[a+11],10,-1120210379),o=G(o,i,n,r,e[a+2],15,718787259),r=G(r,o,i,n,e[a+9],21,-343485551),n=K(n,s),r=K(r,c),o=K(o,u),i=K(i,l)}return[n,r,o,i]}(function(e){if(0===e.length)return[];for(var t=8*e.length,n=new Uint32Array(M(t)),r=0;r<t;r+=8)n[r>>5]|=(255&e[r/8])<<r%32;return n}(e),8*e.length))})),X=W;function Q(e,t,n,r){switch(e){case 0:return t&n^~t&r;case 1:case 3:return t^n^r;case 2:return t&n^t&r^n&r}}function Y(e,t){return e<<t|e>>>32-t}var Z=q("v5",80,(function(e){var t=[1518500249,1859775393,2400959708,3395469782],n=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){var r=unescape(encodeURIComponent(e));e=[];for(var o=0;o<r.length;++o)e.push(r.charCodeAt(o))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);for(var i=e.length/4+2,a=Math.ceil(i/16),s=new Array(a),c=0;c<a;++c){for(var u=new Uint32Array(16),l=0;l<16;++l)u[l]=e[64*c+4*l]<<24|e[64*c+4*l+1]<<16|e[64*c+4*l+2]<<8|e[64*c+4*l+3];s[c]=u}s[a-1][14]=8*(e.length-1)/Math.pow(2,32),s[a-1][14]=Math.floor(s[a-1][14]),s[a-1][15]=8*(e.length-1)&4294967295;for(var d=0;d<a;++d){for(var f=new Uint32Array(80),g=0;g<16;++g)f[g]=s[d][g];for(var v=16;v<80;++v)f[v]=Y(f[v-3]^f[v-8]^f[v-14]^f[v-16],1);for(var p=n[0],m=n[1],h=n[2],y=n[3],w=n[4],b=0;b<80;++b){var k=Math.floor(b/20),E=Y(p,5)+Q(k,m,h,y)+w+t[k]+f[b]>>>0;w=y,y=h,h=Y(m,30)>>>0,m=p,p=E}n[0]=n[0]+p>>>0,n[1]=n[1]+m>>>0,n[2]=n[2]+h>>>0,n[3]=n[3]+y>>>0,n[4]=n[4]+w>>>0}return[n[0]>>24&255,n[0]>>16&255,n[0]>>8&255,255&n[0],n[1]>>24&255,n[1]>>16&255,n[1]>>8&255,255&n[1],n[2]>>24&255,n[2]>>16&255,n[2]>>8&255,255&n[2],n[3]>>24&255,n[3]>>16&255,n[3]>>8&255,255&n[3],n[4]>>24&255,n[4]>>16&255,n[4]>>8&255,255&n[4]]})),ee=Z,te=Object.freeze({__proto__:null,v1:function(e,t,n){var r=t&&n||0,o=t||new Array(16),i=(e=e||{}).node||R,a=void 0!==e.clockseq?e.clockseq:A;if(null==i||null==a){var s=e.random||(e.rng||L)();null==i&&(i=R=[1|s[0],s[1],s[2],s[3],s[4],s[5]]),null==a&&(a=A=16383&(s[6]<<8|s[7]))}var c=void 0!==e.msecs?e.msecs:Date.now(),u=void 0!==e.nsecs?e.nsecs:V+1,l=c-$+(u-V)/1e4;if(l<0&&void 0===e.clockseq&&(a=a+1&16383),(l<0||c>$)&&void 0===e.nsecs&&(u=0),u>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");$=c,V=u,A=a;var d=(1e4*(268435455&(c+=122192928e5))+u)%4294967296;o[r++]=d>>>24&255,o[r++]=d>>>16&255,o[r++]=d>>>8&255,o[r++]=255&d;var f=c/4294967296*1e4&268435455;o[r++]=f>>>8&255,o[r++]=255&f,o[r++]=f>>>24&15|16,o[r++]=f>>>16&255,o[r++]=a>>>8|128,o[r++]=255&a;for(var g=0;g<6;++g)o[r+g]=i[g];return t||N(o)},v3:X,v4:function(e,t,n){var r=(e=e||{}).random||(e.rng||L)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t){n=n||0;for(var o=0;o<16;++o)t[n+o]=r[o];return t}return N(r)},v5:ee,NIL:"00000000-0000-0000-0000-000000000000",version:function(e){if(!T(e))throw TypeError("Invalid UUID");return parseInt(e.substr(14,1),16)},validate:T,stringify:N,parse:H});const ne=["debug","info","warn","error","none"];var re={commonBasicLogger:function(e,t){if(e&&e.destination&&"function"!=typeof e.destination)throw new Error("destination for basicLogger was set to a non-function");function n(e){return function(t){console&&console[e]&&console[e].call(console,t)}}const r=e&&e.destination?[e.destination,e.destination,e.destination,e.destination]:[n("log"),n("info"),n("warn"),n("error")],o=!(!e||!e.destination),i=e&&void 0!==e.prefix&&null!==e.prefix?e.prefix:"[LaunchDarkly] ";let a=1;if(e&&e.level)for(let t=0;t<ne.length;t++)ne[t]===e.level&&(a=t);function s(e,n,a){if(a.length<1)return;let s;const c=o?n+": "+i:i;if(1!==a.length&&t){const e=[...a];e[0]=c+e[0],s=t(...e)}else s=c+a[0];try{r[e](s)}catch(e){console&&console.log&&console.log("[LaunchDarkly] Configured logger's "+n+" method threw an exception: "+e)}}const c={};for(let e=0;e<ne.length;e++){const t=ne[e];if("none"!==t)if(e<a)c[t]=()=>{};else{const n=e;c[t]=function(){s(n,t,arguments)}}}return c},validateLogger:function(e){ne.forEach((t=>{if("none"!==t&&(!e[t]||"function"!=typeof e[t]))throw new Error("Provided logger instance must support logger."+t+"(...) method")}))}};function oe(e){return e&&e.message?e.message:"string"==typeof e||e instanceof String?e:JSON.stringify(e)}const ie=" Please see https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client for instructions on SDK initialization.";var ae={bootstrapInvalid:function(){return"LaunchDarkly bootstrap data is not available because the back end could not read the flags."},bootstrapOldFormat:function(){return"LaunchDarkly client was initialized with bootstrap data that did not include flag metadata. Events may not be sent correctly."+ie},clientInitialized:function(){return"LaunchDarkly client initialized"},clientNotReady:function(){return"LaunchDarkly client is not ready"},debugEnqueueingEvent:function(e){return'enqueueing "'+e+'" event'},debugPostingDiagnosticEvent:function(e){return"sending diagnostic event ("+e.kind+")"},debugPostingEvents:function(e){return"sending "+e+" events"},debugStreamDelete:function(e){return'received streaming deletion for flag "'+e+'"'},debugStreamDeleteIgnored:function(e){return'received streaming deletion for flag "'+e+'" but ignored due to version check'},debugStreamPatch:function(e){return'received streaming update for flag "'+e+'"'},debugStreamPatchIgnored:function(e){return'received streaming update for flag "'+e+'" but ignored due to version check'},debugStreamPing:function(){return"received ping message from stream"},debugPolling:function(e){return"polling for feature flags at "+e},debugStreamPut:function(){return"received streaming update for all flags"},deprecated:function(e,t){return t?'"'+e+'" is deprecated, please use "'+t+'"':'"'+e+'" is deprecated'},environmentNotFound:function(){return"Environment not found. Double check that you specified a valid environment/client-side ID."+ie},environmentNotSpecified:function(){return"No environment/client-side ID was specified."+ie},errorFetchingFlags:function(e){return"Error fetching flag settings: "+oe(e)},eventCapacityExceeded:function(){return"Exceeded event queue capacity. Increase capacity to avoid dropping events."},eventWithoutContext:function(){return"Be sure to call `identify` in the LaunchDarkly client: https://docs.launchdarkly.com/sdk/features/identify#javascript"},httpErrorMessage:function(e,t,n){return"Received error "+e+(401===e?" (invalid SDK key)":"")+" for "+t+" - "+(ldclient_es_s.isHttpErrorRecoverable(e)?n:"giving up permanently")},httpUnavailable:function(){return"Cannot make HTTP requests in this environment."+ie},identifyDisabled:function(){return"identify() has no effect here; it must be called on the main client instance"},inspectorMethodError:(e,t)=>`an inspector: "${t}" of type: "${e}" generated an exception`,invalidContentType:function(e){return'Expected application/json content type but got "'+e+'"'},invalidData:function(){return"Invalid data received from LaunchDarkly; connection may have been interrupted"},invalidInspector:(e,t)=>`an inspector: "${t}" of an invalid type (${e}) was configured`,invalidKey:function(){return"Event key must be a string"},invalidContext:function(){return"Invalid context specified."+ie},invalidTagValue:e=>`Config option "${e}" must only contain letters, numbers, ., _ or -.`,localStorageUnavailable:function(e){return"local storage is unavailable: "+oe(e)},networkError:e=>"network error"+(e?" ("+e+")":""),optionBelowMinimum:(e,t,n)=>'Config option "'+e+'" was set to '+t+", changing to minimum value of "+n,streamClosing:function(){return"Closing stream connection"},streamConnecting:function(e){return"Opening stream connection to "+e},streamError:function(e,t){return"Error on stream connection: "+oe(e)+", will continue retrying after "+t+" milliseconds."},tagValueTooLong:e=>`Value of "${e}" was longer than 64 characters and was discarded.`,unknownCustomEventKey:function(e){return'Custom event "'+e+'" does not exist'},unknownOption:e=>'Ignoring unknown config option "'+e+'"',contextNotSpecified:function(){return"No context specified."+ie},unrecoverableStreamError:e=>`Error on stream connection ${oe(e)}, giving up permanently`,wrongOptionType:(e,t,n)=>'Config option "'+e+'" should be of type '+t+", got "+n+", using default value",wrongOptionTypeBoolean:(e,t)=>'Config option "'+e+'" should be a boolean, got '+t+", converting to boolean"};const{validateLogger:se}=re,ce={baseUrl:{default:"https://app.launchdarkly.com"},streamUrl:{default:"https://clientstream.launchdarkly.com"},eventsUrl:{default:"https://events.launchdarkly.com"},sendEvents:{default:!0},streaming:{type:"boolean"},sendLDHeaders:{default:!0},requestHeaderTransform:{type:"function"},sendEventsOnlyForVariation:{default:!1},useReport:{default:!1},evaluationReasons:{default:!1},eventCapacity:{default:100,minimum:1},flushInterval:{default:2e3,minimum:2e3},samplingInterval:{default:0,minimum:0},streamReconnectDelay:{default:1e3,minimum:0},allAttributesPrivate:{default:!1},privateAttributes:{default:[]},bootstrap:{type:"string|object"},diagnosticRecordingInterval:{default:9e5,minimum:2e3},diagnosticOptOut:{default:!1},wrapperName:{type:"string"},wrapperVersion:{type:"string"},stateProvider:{type:"object"},application:{validator:function(e,t,n){const r={};return t.id&&(r.id=de(`${e}.id`,t.id,n)),t.version&&(r.version=de(`${e}.version`,t.version,n)),r}},inspectors:{default:[]}},ue=/^(\w|\.|-)+$/;function le(e){return e&&e.replace(/\/+$/,"")}function de(e,t,n){if("string"==typeof t&&t.match(ue)){if(!(t.length>64))return t;n.warn(ae.tagValueTooLong(e))}else n.warn(ae.invalidTagValue(e))}var fe={baseOptionDefs:ce,validate:function(e,t,n,r){const o=I.extend({logger:{default:r}},ce,n),i={};function a(e){I.onNextTick((()=>{t&&t.maybeReportError(new ldclient_es_s.LDInvalidArgumentError(e))}))}let c=I.extend({},e||{});return function(e){const t=e;Object.keys(i).forEach((e=>{if(void 0!==t[e]){const n=i[e];r&&r.warn(ae.deprecated(e,n)),n&&(void 0===t[n]&&(t[n]=t[e]),delete t[e])}}))}(c),c=function(e){const t=I.extend({},e);return Object.keys(o).forEach((e=>{void 0!==t[e]&&null!==t[e]||(t[e]=o[e]&&o[e].default)})),t}(c),c=function(e){const t=I.extend({},e),n=e=>{if(null===e)return"any";if(void 0===e)return;if(Array.isArray(e))return"array";const t=typeof e;return"boolean"===t||"string"===t||"number"===t||"function"===t?t:"object"};return Object.keys(e).forEach((i=>{const s=e[i];if(null!=s){const c=o[i];if(void 0===c)a(ae.unknownOption(i));else{const o=c.type||n(c.default),u=c.validator;if(u){const n=u(i,e[i],r);void 0!==n?t[i]=n:delete t[i]}else if("any"!==o){const e=o.split("|"),r=n(s);e.indexOf(r)<0?"boolean"===o?(t[i]=!!s,a(ae.wrongOptionTypeBoolean(i,r))):(a(ae.wrongOptionType(i,o,r)),t[i]=c.default):"number"===r&&void 0!==c.minimum&&s<c.minimum&&(a(ae.optionBelowMinimum(i,s,c.minimum)),t[i]=c.minimum)}}}})),t.baseUrl=le(t.baseUrl),t.streamUrl=le(t.streamUrl),t.eventsUrl=le(t.eventsUrl),t}(c),se(c.logger),c},getTags:function(e){const t={};return e&&(e.application&&void 0!==e.application.id&&null!==e.application.id&&(t["application-id"]=[e.application.id]),e.application&&void 0!==e.application.version&&null!==e.application.id&&(t["application-version"]=[e.application.version])),t}};const{getLDUserAgentString:ge}=I;var ve={getLDHeaders:function(e,t){if(t&&!t.sendLDHeaders)return{};const n={};n[e.userAgentHeaderName||"User-Agent"]=ge(e),t&&t.wrapperName&&(n["X-LaunchDarkly-Wrapper"]=t.wrapperVersion?t.wrapperName+"/"+t.wrapperVersion:t.wrapperName);const r=fe.getTags(t),o=Object.keys(r);return o.length&&(n["x-launchdarkly-tags"]=o.sort().map((e=>Array.isArray(r[e])?r[e].sort().map((t=>`${e}/${t}`)):[`${e}/${r[e]}`])).reduce(((e,t)=>e.concat(t)),[]).join(" ")),n},transformHeaders:function(e,t){return t&&t.requestHeaderTransform?t.requestHeaderTransform({...e}):e}};const{v1:pe}=te,{getLDHeaders:me,transformHeaders:he}=ve;const{commonBasicLogger:we}=re;function be(e){return"string"==typeof e&&"kind"!==e&&e.match(/^(\w|\.|-)+$/)}function ke(e){return e.includes("%")||e.includes(":")?e.replace(/%/g,"%25").replace(/:/g,"%3A"):e}var Ee={checkContext:function(e,t){if(e){if(t&&(void 0===e.kind||null===e.kind))return void 0!==e.key&&null!==e.key;const n=e.key,r=void 0===e.kind?"user":e.kind,o=be(r),i="multi"===r||null!=n&&""!==n;if("multi"===r){const t=Object.keys(e).filter((e=>"kind"!==e));return i&&t.every((e=>be(e)))&&t.every((t=>{const n=e[t].key;return null!=n&&""!==n}))}return i&&o}return!1},getContextKeys:function(e,t=we()){if(!e)return;const n={},{kind:r,key:o}=e;switch(r){case void 0:n.user=`${o}`;break;case"multi":Object.entries(e).filter((([e])=>"kind"!==e)).forEach((([e,t])=>{t&&t.key&&(n[e]=t.key)}));break;case null:t.warn(`null is not a valid context kind: ${e}`);break;case"":t.warn(`'' is not a valid context kind: ${e}`);break;default:n[r]=`${o}`}return n},getContextKinds:function(e){return e?null===e.kind||void 0===e.kind?["user"]:"multi"!==e.kind?[e.kind]:Object.keys(e).filter((e=>"kind"!==e)):[]},getCanonicalKey:function(e){if(e){if((void 0===e.kind||null===e.kind||"user"===e.kind)&&e.key)return e.key;if("multi"!==e.kind&&e.key)return`${e.kind}:${ke(e.key)}`;if("multi"===e.kind)return Object.keys(e).sort().filter((e=>"kind"!==e)).map((t=>`${t}:${ke(e[t].key)}`)).join(":")}}};const{getContextKinds:De}=Ee;const{getContextKeys:Te}=Ee;const{appendUrlPath:qe,base64URLEncode:Me,objectHasOwnProperty:Ke}=I,{getLDHeaders:_e,transformHeaders:Je}=ve,{isHttpErrorRecoverable:ze}=ldclient_es_s;const{transformHeaders:We,getLDHeaders:Xe}=ve;const{v1:et}=te,{getContextKinds:tt}=Ee;const{v1:rt}=te,{baseOptionDefs:ot}=fe,{appendUrlPath:it}=I;const{onNextTick:ct}=I,ut={flagUsed:"flag-used",flagDetailsChanged:"flag-details-changed",flagDetailChanged:"flag-detail-changed",clientIdentityChanged:"client-identity-changed"};Object.freeze(ut);var lt={InspectorTypes:ut,InspectorManager:function(e,t){const n={},r={[ut.flagUsed]:[],[ut.flagDetailsChanged]:[],[ut.flagDetailChanged]:[],[ut.clientIdentityChanged]:[]},o=e&&e.map((e=>function(e,t){let n=!1;const r={type:e.type,name:e.name,method:(...o)=>{try{e.method(...o)}catch{n||(n=!0,t.warn(ae.inspectorMethodError(r.type,r.name)))}}};return r}(e,t)));return o&&o.forEach((e=>{Object.prototype.hasOwnProperty.call(r,e.type)?r[e.type].push(e):t.warn(ae.invalidInspector(e.type,e.name))})),n.hasListeners=e=>r[e]&&r[e].length,n.onFlagUsed=(e,t,n)=>{r[ut.flagUsed].length&&ct((()=>{r[ut.flagUsed].forEach((r=>r.method(e,t,n)))}))},n.onFlags=e=>{r[ut.flagDetailsChanged].length&&ct((()=>{r[ut.flagDetailsChanged].forEach((t=>t.method(e)))}))},n.onFlagChanged=(e,t)=>{r[ut.flagDetailChanged].length&&ct((()=>{r[ut.flagDetailChanged].forEach((n=>n.method(e,t)))}))},n.onIdentityChanged=e=>{r[ut.clientIdentityChanged].length&&ct((()=>{r[ut.clientIdentityChanged].forEach((t=>t.method(e)))}))},n}};const{commonBasicLogger:dt}=re,{checkContext:ft,getContextKeys:gt}=Ee,{InspectorTypes:vt,InspectorManager:pt}=lt;Promise.resolve({status:200,header:function(){return null},body:null});var lodash_camelcase=__webpack_require__("./node_modules/lodash.camelcase/index.js"),lodash_camelcase_default=__webpack_require__.n(lodash_camelcase);__webpack_require__("./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");const esm_u=(0,react.createContext)({flags:{},flagKeyMap:{},ldClient:void 0}),{Provider:esm_f,Consumer:esm_y}=esm_u,esm_g=e=>{const t={};for(const r in e)0!==r.indexOf("$")&&(t[lodash_camelcase_default()(r)]=e[r]);return t};esm_g.camelCaseKeys=esm_g;Object.defineProperty,Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;Object.defineProperty,Object.defineProperties,Object.getOwnPropertyDescriptors,Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;Object.defineProperty,Object.defineProperties,Object.getOwnPropertyDescriptors,Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;Object.defineProperty,Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;Object.defineProperty,Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;const esm_ce=()=>{const{flags:e}=(0,react.useContext)(esm_u);return e}},"./node_modules/lodash.camelcase/index.js":function(module,__unused_webpack_exports,__webpack_require__){var INFINITY=1/0,symbolTag="[object Symbol]",reAsciiWord=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,reLatin=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,rsBreakRange="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",rsAstral="[\\ud800-\\udfff]",rsBreak="["+rsBreakRange+"]",rsCombo="[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]",rsDigits="\\d+",rsDingbat="[\\u2700-\\u27bf]",rsLower="[a-z\\xdf-\\xf6\\xf8-\\xff]",rsMisc="[^\\ud800-\\udfff"+rsBreakRange+rsDigits+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",rsFitz="\\ud83c[\\udffb-\\udfff]",rsNonAstral="[^\\ud800-\\udfff]",rsRegional="(?:\\ud83c[\\udde6-\\uddff]){2}",rsSurrPair="[\\ud800-\\udbff][\\udc00-\\udfff]",rsUpper="[A-Z\\xc0-\\xd6\\xd8-\\xde]",rsLowerMisc="(?:"+rsLower+"|"+rsMisc+")",rsUpperMisc="(?:"+rsUpper+"|"+rsMisc+")",reOptMod="(?:"+rsCombo+"|"+rsFitz+")"+"?",rsSeq="[\\ufe0e\\ufe0f]?"+reOptMod+("(?:\\u200d(?:"+[rsNonAstral,rsRegional,rsSurrPair].join("|")+")[\\ufe0e\\ufe0f]?"+reOptMod+")*"),rsEmoji="(?:"+[rsDingbat,rsRegional,rsSurrPair].join("|")+")"+rsSeq,rsSymbol="(?:"+[rsNonAstral+rsCombo+"?",rsCombo,rsRegional,rsSurrPair,rsAstral].join("|")+")",reApos=RegExp("['’]","g"),reComboMark=RegExp(rsCombo,"g"),reUnicode=RegExp(rsFitz+"(?="+rsFitz+")|"+rsSymbol+rsSeq,"g"),reUnicodeWord=RegExp([rsUpper+"?"+rsLower+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[rsBreak,rsUpper,"$"].join("|")+")",rsUpperMisc+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[rsBreak,rsUpper+rsLowerMisc,"$"].join("|")+")",rsUpper+"?"+rsLowerMisc+"+(?:['’](?:d|ll|m|re|s|t|ve))?",rsUpper+"+(?:['’](?:D|LL|M|RE|S|T|VE))?",rsDigits,rsEmoji].join("|"),"g"),reHasUnicode=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0\\ufe0e\\ufe0f]"),reHasUnicodeWord=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,freeGlobal="object"==typeof __webpack_require__.g&&__webpack_require__.g&&__webpack_require__.g.Object===Object&&__webpack_require__.g,freeSelf="object"==typeof self&&self&&self.Object===Object&&self,root=freeGlobal||freeSelf||Function("return this")();var deburrLetter=function basePropertyOf(object){return function(key){return null==object?void 0:object[key]}}({"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"ss"});function hasUnicode(string){return reHasUnicode.test(string)}function stringToArray(string){return hasUnicode(string)?function unicodeToArray(string){return string.match(reUnicode)||[]}(string):function asciiToArray(string){return string.split("")}(string)}var objectToString=Object.prototype.toString,Symbol=root.Symbol,symbolProto=Symbol?Symbol.prototype:void 0,symbolToString=symbolProto?symbolProto.toString:void 0;function baseToString(value){if("string"==typeof value)return value;if(function isSymbol(value){return"symbol"==typeof value||function isObjectLike(value){return!!value&&"object"==typeof value}(value)&&objectToString.call(value)==symbolTag}(value))return symbolToString?symbolToString.call(value):"";var result=value+"";return"0"==result&&1/value==-INFINITY?"-0":result}function castSlice(array,start,end){var length=array.length;return end=void 0===end?length:end,!start&&end>=length?array:function baseSlice(array,start,end){var index=-1,length=array.length;start<0&&(start=-start>length?0:length+start),(end=end>length?length:end)<0&&(end+=length),length=start>end?0:end-start>>>0,start>>>=0;for(var result=Array(length);++index<length;)result[index]=array[index+start];return result}(array,start,end)}function toString(value){return null==value?"":baseToString(value)}var camelCase=function createCompounder(callback){return function(string){return function arrayReduce(array,iteratee,accumulator,initAccum){var index=-1,length=array?array.length:0;for(initAccum&&length&&(accumulator=array[++index]);++index<length;)accumulator=iteratee(accumulator,array[index],index,array);return accumulator}(function words(string,pattern,guard){if(string=toString(string),void 0===(pattern=guard?void 0:pattern))return function hasUnicodeWord(string){return reHasUnicodeWord.test(string)}(string)?function unicodeWords(string){return string.match(reUnicodeWord)||[]}(string):function asciiWords(string){return string.match(reAsciiWord)||[]}(string);return string.match(pattern)||[]}(function deburr(string){return string=toString(string),string&&string.replace(reLatin,deburrLetter).replace(reComboMark,"")}(string).replace(reApos,"")),callback,"")}}((function(result,word,index){return word=word.toLowerCase(),result+(index?function capitalize(string){return upperFirst(toString(string).toLowerCase())}(word):word)}));var upperFirst=function createCaseFirst(methodName){return function(string){var strSymbols=hasUnicode(string=toString(string))?stringToArray(string):void 0,chr=strSymbols?strSymbols[0]:string.charAt(0),trailing=strSymbols?castSlice(strSymbols,1).join(""):string.slice(1);return chr[methodName]()+trailing}}("toUpperCase");module.exports=camelCase},"./node_modules/react-is/cjs/react-is.production.min.js":function(__unused_webpack_module,exports){"use strict";var b="function"==typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;function z(a){if("object"==typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l,exports.ConcurrentMode=m,exports.ContextConsumer=k,exports.ContextProvider=h,exports.Element=c,exports.ForwardRef=n,exports.Fragment=e,exports.Lazy=t,exports.Memo=r,exports.Portal=d,exports.Profiler=g,exports.StrictMode=f,exports.Suspense=p,exports.isAsyncMode=function(a){return A(a)||z(a)===l},exports.isConcurrentMode=A,exports.isContextConsumer=function(a){return z(a)===k},exports.isContextProvider=function(a){return z(a)===h},exports.isElement=function(a){return"object"==typeof a&&null!==a&&a.$$typeof===c},exports.isForwardRef=function(a){return z(a)===n},exports.isFragment=function(a){return z(a)===e},exports.isLazy=function(a){return z(a)===t},exports.isMemo=function(a){return z(a)===r},exports.isPortal=function(a){return z(a)===d},exports.isProfiler=function(a){return z(a)===g},exports.isStrictMode=function(a){return z(a)===f},exports.isSuspense=function(a){return z(a)===p},exports.isValidElementType=function(a){return"string"==typeof a||"function"==typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"==typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)},exports.typeOf=z},"./node_modules/react-is/index.js":function(module,__unused_webpack_exports,__webpack_require__){"use strict";module.exports=__webpack_require__("./node_modules/react-is/cjs/react-is.production.min.js")}}]);