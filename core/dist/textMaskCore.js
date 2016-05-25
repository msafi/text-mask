!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.textMaskCore=r():e.textMaskCore=r()}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var a=t[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,r),a.loaded=!0,a.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(r,"__esModule",{value:!0});var a=t(4);Object.defineProperty(r,"conformToMask",{enumerable:!0,get:function(){return n(a)["default"]}});var o=t(3);Object.defineProperty(r,"adjustCaretPosition",{enumerable:!0,get:function(){return n(o)["default"]}});var u=t(6);Object.defineProperty(r,"safeSetSelection",{enumerable:!0,get:function(){return n(u)["default"]}});var i=t(5);Object.defineProperty(r,"processComponentChanges",{enumerable:!0,get:function(){return n(i)["default"]}});var c=t(2);Object.defineProperty(r,"convertMaskToPlaceholder",{enumerable:!0,get:function(){return c.convertMaskToPlaceholder}})},function(e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.maskingCharactersEnums={numeric:"1",alphabetic:"A",alphanumeric:"?",uppercase:"U",lowercase:"L",any:"*"},r.maskingCharactersWithDescription={1:"Any number",A:"Any letter","?":"Any number or letter",U:"Any letter (will be transformed to uppercase)",L:"Any letter (will be transformed to lowercase)","*":"Any character"},r.maskingCharacters=["1","A","?","U","L","*"],r.placeholderCharacter="_"},function(e,r,t){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return a(e).map(function(e){return-1!==l.maskingCharacters.indexOf(e)?l.placeholderCharacter:e}).join("")}function a(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return e.split("")}function o(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],r=arguments[1];switch(r){case l.maskingCharactersEnums.numeric:return i(e);case l.maskingCharactersEnums.uppercase:case l.maskingCharactersEnums.lowercase:case l.maskingCharactersEnums.alphabetic:return c(e);case l.maskingCharactersEnums.alphanumeric:return i(e)||c(e);case l.maskingCharactersEnums.any:return!0;default:return!1}}function u(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],r=arguments[1];switch(r){case l.maskingCharactersEnums.uppercase:return e.toUpperCase();case l.maskingCharactersEnums.lowercase:return e.toLowerCase();default:return e}}function i(e){return!isNaN(e)&&" "!==e}function c(e){return/^[a-zA-Z]+$/.test(e)}function s(e,r){for(var t=e.length>r.length?e.length:r.length,n=0;t>n;n++)if(e[n]!==r[n])return n;return null}Object.defineProperty(r,"__esModule",{value:!0}),r.convertMaskToPlaceholder=n,r.tokenize=a,r.isAcceptableCharacter=o,r.potentiallyTransformCharacter=u,r.getIndexOfFirstChange=s;var l=t(1)},function(e,r,t){"use strict";function n(e){var r=e.previousConformedInput,t=void 0===r?"":r,n=e.conformToMaskResults,u=void 0===n?{}:n,i=e.currentCaretPosition,c=void 0===i?0:i;if(0===c)return 0;var s=u.output,l=void 0===s?"":s,f=u.meta,d=void 0===f?{}:f,h=d.input,p=void 0===h?"":h,v=d.mask,m=void 0===v?"":v,g=(0,a.getIndexOfFirstChange)(t,p),C=g-c>1;if(C)return c;var b=(0,a.convertMaskToPlaceholder)(m),k=!(p.length<t.length),y=Math.abs(t.length-p.length)>1,P=k&&(t===l||l===b),M=""===t&&l===b,_=y?l:b,j=b[g]!==o.placeholderCharacter,O=c;if(y)O=0;else if(P)O--;else if(k)for(var x=c;x<b.length;x++){var A=j&&M===!1;if(b[x]===o.placeholderCharacter){O=x+(A?1:0);break}}if(k){for(var E=O;E<=_.length;E++)if(_[E]===o.placeholderCharacter||E===_.length)return E>l.length?l.length:E}else for(var T=O;T>=0;T--)if(_[T-1]===o.placeholderCharacter||0===T)return T}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=n;var a=t(2),o=t(1)},function(e,r,t){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],r=arguments.length<=1||void 0===arguments[1]?"":arguments[1],t=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],n=t.guide,u=void 0===n?!0:n,i=t.previousConformedInput,c=(0,a.convertMaskToPlaceholder)(r),s=u===!1&&void 0!==i,l=(0,a.tokenize)(e),f=s&&!(e.length<i.length),d="";e:for(var h=0;h<c.length;h++){var p=c[h];if(p===o.placeholderCharacter){if(l.length>0)for(;l.length>0;){var v=l.shift();if(v===o.placeholderCharacter&&s!==!0){d+=o.placeholderCharacter;continue e}if((0,a.isAcceptableCharacter)(v,r[h])){d+=(0,a.potentiallyTransformCharacter)(v,r[h]);continue e}}s===!1&&(d+=c.substr(h,c.length));break}p===e[h]&&l.shift(),d+=p}if(s&&f===!1){for(var m=null,g=0;g<d.length;g++)c[g]===o.placeholderCharacter&&(m=g);d=null!==m?d.substr(0,m+1):""}return{output:d,meta:{input:e,mask:r,guide:u}}}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=n;var a=t(2),o=t(1)},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){var r=e.userInput,t=void 0===r?"":r,n=e.placeholder,a=void 0===n?"":n,o=e.previousConformedInput,i=void 0===o?"":o,s=e.mask,l=void 0===s?"":s,f=e.guide,d=void 0===f?"":f,h=e.currentCaretPosition,p=void 0===h?0:h,v=(0,c["default"])(t,l,d===!1?{guide:d,previousConformedInput:i}:{}),m=v.output,g=(0,u["default"])({previousConformedInput:i,conformToMaskResults:v,currentCaretPosition:p}),C=m===a&&0===g?"":m;return{conformedInput:C,adjustedCaretPosition:g}}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=a;var o=t(3),u=n(o),i=t(4),c=n(i)},function(e,r){"use strict";function t(e,r){document.activeElement===e&&e.setSelectionRange(r,r,"none")}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=t}])});