"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var n=require("magic-string");const t={appEntry:void 0,handleMobile:!0,transformPixels:!1},a={ignoreSelectors:[],centralizeText:["h1","h2","h3","h4","h5","h6","p"],breakpoint:"480px"},e={ignoreAttributes:[],ignoreSelectors:[]},i="ignore-responsive-app",o="/index.html",r=[o,"/app.js","/main.js","src/index.js"],d=/([.#\w\-\s,:]+)\s*\{([^}]+?)\}/gs,p=/([\w-]+)\s*:\s*([^}]+)/g;function m(n,t){const a=new Map;let e;for(;null!==(e=d.exec(n));){const n=e[1].trim(),i=e[2].trim();if(t.ignoreSelectors.some((t=>n.includes(t))))continue;const o=[];let r;for(;null!==(r=p.exec(i));){const n=r[1].trim(),a=r[2].trim();a.includes("px")&&!t.ignoreAttributes.includes(n)&&o.push({key:n,value:a})}o.length>0&&a.set(n,o)}let o="";return a.size>0&&a.forEach(((n,t)=>{o+=`${t}:not(.${i}){`,n.forEach(((t,a)=>{n.length;var e;o+=`${t.key}:${e=t.value,e.replace(/[0-9]+px/g,(n=>function(n){return(n/16).toFixed(4).replace(/[.,]0+$/,"")}(Number(n.replace("px","")))+"rem"))}`})),o+="}"})),o}var x=(t,o,r)=>{const x={...e,..."object"==typeof t.transformPixels?t.transformPixels:{}},h={...a,..."object"==typeof t.handleMobile?t.handleMobile:{}};let s="";if(s+=t.transformPixels?m(o,x):"",s+=t.handleMobile?function(n,t){const a=new Set;let e;for(;null!==(e=d.exec(n));){const n=e[1].trim(),i=e[2].trim();if(t.ignoreSelectors.some((t=>n.includes(t))))continue;let o,r=!1,d=!1;for(;null!==(o=p.exec(i));){const n=o[1].trim(),t=o[2].trim();"display"===n&&"flex"===t&&(r=!0),"flex-direction"===n&&"column"===t&&(d=!0)}r&&!d&&a.add(n)}let o="";return a.size>0&&(o=`@media only screen and (max-width: ${t.breakpoint}) and (orientation: portrait){`,a.forEach((n=>{o+=`${n}:not(.${i}){flex-direction: column; margin-left: 0; margin-right: 0}`})),o+="}"),o}(o,h):"",s){const t=new n(o),a=function(n){const t=['const __vite__css = "','export default "'];let a,e,i=-1;do{if(a=t.pop(),e=a?n.indexOf(a):-1,a&&-1!==e){const t=e+a.length-1;i=n.indexOf('"',t+1)}}while(a&&-1===e);return i}(o);return-1!==a?t.prependLeft(a,s):'"'===o.charAt(o.length-1)?t.replace(/"$/,`${s}"`):t.append(s),{code:t.toString(),map:t.generateMap({source:r,file:r,includeContent:!0})}}return null},h="\n:root {\n  --v-rem: 32;\n}\n@media (orientation: landscape) and (max-width: 2480px), (orientation: landscape) and (max-height: 1395px) {\n  :root {\n    --v-rem: 31;\n }\n}\n@media (orientation: landscape) and (max-width: 2400px), (orientation: landscape) and (max-height: 1350px) {\n  :root {\n    --v-rem: 30;\n }\n}\n@media (orientation: landscape) and (max-width: 2320px), (orientation: landscape) and (max-height: 1305px) {\n  :root {\n    --v-rem: 29;\n }\n}\n@media (orientation: landscape) and (max-width: 2240px), (orientation: landscape) and (max-height: 1260px) {\n  :root {\n    --v-rem: 28;\n }\n}\n@media (orientation: landscape) and (max-width: 2160px), (orientation: landscape) and (max-height: 1215px) {\n  :root {\n    --v-rem: 27;\n }\n}\n@media (orientation: landscape) and (max-width: 2080px), (orientation: landscape) and (max-height: 1170px) {\n  :root {\n    --v-rem: 26;\n }\n}\n@media (orientation: landscape) and (max-width: 2000px), (orientation: landscape) and (max-height: 1125px) {\n  :root {\n    --v-rem: 25;\n }\n}\n@media (orientation: landscape) and (max-width: 1920px), (orientation: landscape) and (max-height: 1080px) {\n  :root {\n    --v-rem: 24;\n }\n}\n@media (orientation: landscape) and (max-width: 1840px), (orientation: landscape) and (max-height: 1035px) {\n  :root {\n    --v-rem: 23;\n }\n}\n@media (orientation: landscape) and (max-width: 1760px), (orientation: landscape) and (max-height: 990px) {\n  :root {\n    --v-rem: 22;\n }\n}\n@media (orientation: landscape) and (max-width: 1680px), (orientation: landscape) and (max-height: 945px) {\n  :root {\n    --v-rem: 21;\n }\n}\n@media (orientation: landscape) and (max-width: 1600px), (orientation: landscape) and (max-height: 900px) {\n  :root {\n    --v-rem: 20;\n }\n}\n@media (orientation: landscape) and (max-width: 1520px), (orientation: landscape) and (max-height: 855px) {\n  :root {\n    --v-rem: 19;\n }\n}\n@media (orientation: landscape) and (max-width: 1440px), (orientation: landscape) and (max-height: 810px) {\n  :root {\n    --v-rem: 18;\n }\n}\n@media (orientation: landscape) and (max-width: 1360px), (orientation: landscape) and (max-height: 765px) {\n  :root {\n    --v-rem: 17;\n }\n}\n@media (orientation: landscape) and (max-width: 1280px), (orientation: landscape) and (max-height: 720px) {\n  :root {\n    --v-rem: 16;\n }\n}\n@media (orientation: landscape) and (max-width: 1200px), (orientation: landscape) and (max-height: 675px) {\n  :root {\n    --v-rem: 15;\n }\n}\n@media (orientation: landscape) and (max-width: 1120px), (orientation: landscape) and (max-height: 630px) {\n  :root {\n    --v-rem: 14;\n }\n}\n@media (orientation: landscape) and (max-width: 1040px), (orientation: landscape) and (max-height: 585px) {\n  :root {\n    --v-rem: 13;\n }\n}\n@media (orientation: landscape) and (max-width: 960px), (orientation: landscape) and (max-height: 540px) {\n  :root {\n    --v-rem: 12;\n }\n}\n@media (orientation: landscape) and (max-width: 880px), (orientation: landscape) and (max-height: 495px) {\n  :root {\n    --v-rem: 11;\n }\n}\n@media (orientation: landscape) and (max-width: 800px), (orientation: landscape) and (max-height: 450px) {\n  :root {\n    --v-rem: 10;\n }\n}\n@media (orientation: landscape) and (max-width: 720px), (orientation: landscape) and (max-height: 405px) {\n  :root {\n    --v-rem: 9;\n }\n}\n@media (orientation: landscape) and (max-width: 640px), (orientation: landscape) and (max-height: 360px) {\n  :root {\n    --v-rem: 8;\n }\n}\n@media (orientation: landscape) and (max-width: 560px), (orientation: landscape) and (max-height: 315px) {\n  :root {\n    --v-rem: 7;\n }\n}\n@media (orientation: landscape) and (max-width: 480px), (orientation: landscape) and (max-height: 270px) {\n  :root {\n    --v-rem: 6;\n }\n}\n@media (orientation: landscape) and (max-width: 400px), (orientation: landscape) and (max-height: 225px) {\n  :root {\n    --v-rem: 5;\n }\n}\n@media (orientation: landscape) and (max-width: 320px), (orientation: landscape) and (max-height: 180px) {\n  :root {\n    --v-rem: 4;\n }\n}\n@media (orientation: landscape) and (max-width: 240px), (orientation: landscape) and (max-height: 135px) {\n  :root {\n    --v-rem: 3;\n }\n}\n@media (orientation: landscape) and (max-width: 160px), (orientation: landscape) and (max-height: 90px) {\n  :root {\n    --v-rem: 2;\n }\n}\n@media (orientation: landscape) and (max-width: 80px), (orientation: landscape) and (max-height: 45px) {\n  :root {\n    --v-rem: 1;\n }\n}\n@media (orientation: portrait) and (max-width: 1395px), (orientation: portrait) and (max-height: 2480px) {\n  :root {\n    --v-rem: 31;\n }\n}\n@media (orientation: portrait) and (max-width: 1350px), (orientation: portrait) and (max-height: 2400px) {\n  :root {\n    --v-rem: 30;\n }\n}\n@media (orientation: portrait) and (max-width: 1305px), (orientation: portrait) and (max-height: 2320px) {\n  :root {\n    --v-rem: 29;\n }\n}\n@media (orientation: portrait) and (max-width: 1260px), (orientation: portrait) and (max-height: 2240px) {\n  :root {\n    --v-rem: 28;\n }\n}\n@media (orientation: portrait) and (max-width: 1215px), (orientation: portrait) and (max-height: 2160px) {\n  :root {\n    --v-rem: 27;\n }\n}\n@media (orientation: portrait) and (max-width: 1170px), (orientation: portrait) and (max-height: 2080px) {\n  :root {\n    --v-rem: 26;\n }\n}\n@media (orientation: portrait) and (max-width: 1125px), (orientation: portrait) and (max-height: 2000px) {\n  :root {\n    --v-rem: 25;\n }\n}\n@media (orientation: portrait) and (max-width: 1080px), (orientation: portrait) and (max-height: 1920px) {\n  :root {\n    --v-rem: 24;\n }\n}\n@media (orientation: portrait) and (max-width: 1035px), (orientation: portrait) and (max-height: 1840px) {\n  :root {\n    --v-rem: 23;\n }\n}\n@media (orientation: portrait) and (max-width: 990px), (orientation: portrait) and (max-height: 1760px) {\n  :root {\n    --v-rem: 22;\n }\n}\n@media (orientation: portrait) and (max-width: 945px), (orientation: portrait) and (max-height: 1680px) {\n  :root {\n    --v-rem: 21;\n }\n}\n@media (orientation: portrait) and (max-width: 900px), (orientation: portrait) and (max-height: 1600px) {\n  :root {\n    --v-rem: 20;\n }\n}\n@media (orientation: portrait) and (max-width: 855px), (orientation: portrait) and (max-height: 1520px) {\n  :root {\n    --v-rem: 19;\n }\n}\n@media (orientation: portrait) and (max-width: 810px), (orientation: portrait) and (max-height: 1440px) {\n  :root {\n    --v-rem: 18;\n }\n}\n@media (orientation: portrait) and (max-width: 765px), (orientation: portrait) and (max-height: 1360px) {\n  :root {\n    --v-rem: 17;\n }\n}\n@media (orientation: portrait) and (max-width: 720px), (orientation: portrait) and (max-height: 1280px) {\n  :root {\n    --v-rem: 16;\n }\n}\n@media (orientation: portrait) and (max-width: 675px), (orientation: portrait) and (max-height: 1200px) {\n  :root {\n    --v-rem: 15;\n }\n}\n@media (orientation: portrait) and (max-width: 630px), (orientation: portrait) and (max-height: 1120px) {\n  :root {\n    --v-rem: 14;\n }\n}\n@media (orientation: portrait) and (max-width: 585px), (orientation: portrait) and (max-height: 1040px) {\n  :root {\n    --v-rem: 13;\n }\n}\n@media (orientation: portrait) and (max-width: 540px), (orientation: portrait) and (max-height: 960px) {\n  :root {\n    --v-rem: 12;\n }\n}\n@media (orientation: portrait) and (max-width: 495px), (orientation: portrait) and (max-height: 880px) {\n  :root {\n    --v-rem: 11;\n }\n}\n@media (orientation: portrait) and (max-width: 450px), (orientation: portrait) and (max-height: 800px) {\n  :root {\n    --v-rem: 10;\n }\n}\n@media (orientation: portrait) and (max-width: 405px), (orientation: portrait) and (max-height: 720px) {\n  :root {\n    --v-rem: 9;\n }\n}\n@media (orientation: portrait) and (max-width: 360px), (orientation: portrait) and (max-height: 640px) {\n  :root {\n    --v-rem: 8;\n }\n}\n@media (orientation: portrait) and (max-width: 315px), (orientation: portrait) and (max-height: 560px) {\n  :root {\n    --v-rem: 7;\n }\n}\n@media (orientation: portrait) and (max-width: 270px), (orientation: portrait) and (max-height: 480px) {\n  :root {\n    --v-rem: 6;\n }\n}\n@media (orientation: portrait) and (max-width: 225px), (orientation: portrait) and (max-height: 400px) {\n  :root {\n    --v-rem: 5;\n }\n}\n@media (orientation: portrait) and (max-width: 180px), (orientation: portrait) and (max-height: 320px) {\n  :root {\n    --v-rem: 4;\n }\n}\n@media (orientation: portrait) and (max-width: 135px), (orientation: portrait) and (max-height: 240px) {\n  :root {\n    --v-rem: 3;\n }\n}\n@media (orientation: portrait) and (max-width: 90px), (orientation: portrait) and (max-height: 160px) {\n  :root {\n    --v-rem: 2;\n }\n}\n@media (orientation: portrait) and (max-width: 45px), (orientation: portrait) and (max-height: 80px) {\n  :root {\n    --v-rem: 1;\n }\n}\n",s=()=>`\n    if (typeof window !== 'undefined') {\n      const baseFontSize = 16\n    \n      const updateHtmlFontSize = function() {\n        const htmlElement = document.querySelector('html');\n        htmlElement.style.removeProperty('font-size');\n        const browserFontSize = window.getComputedStyle(htmlElement).getPropertyValue('font-size');\n\n        const browserDifference = Number(browserFontSize.replace('px', '')) - baseFontSize;\n\n        const vRem = window.getComputedStyle(document.documentElement).getPropertyValue('--v-rem');\n        const fontSize = Number(vRem) + Number(browserDifference)\n        htmlElement.style.setProperty('font-size', fontSize + 'px')\n      }\n\n      const addVirtualRemQueries = function() {\n        const style = document.createElement('style')\n        style.setAttribute('type', 'text/css')\n        style.setAttribute('data-magic-responsive', 'true')\n        style.textContent = "${h.replace(/\n/g,"")}"\n        document.head.appendChild(style)\n      }\n\n      const initResponsive = function() {\n        window.addEventListener('resize', updateHtmlFontSize)\n        addVirtualRemQueries()\n        updateHtmlFontSize()\n      }\n\n      if (window.document.readyState !== 'loading') {\n        initResponsive();\n      } else {\n        window.document.addEventListener('DOMContentLoaded', function() {\n          initResponsive();\n        });\n      }\n    }`;let l=!1;exports.default=function(a){const e={...t,...a||{}};return{name:"responsive-app-rollup-plugin",transform:{order:"post",handler(t,a){if((e.handleMobile||e.transformPixels)&&a.includes(".css"))return x(e,t,a);const i=e.appEntry&&a.includes(e.appEntry),d=!e.appEntry&&r.some((n=>a.includes(n)))&&!a.includes("/server");return l||!i&&!d?null:(l=!0,((t,a)=>{const e=new n(t);if(a.includes(o)){const n=t.indexOf("</body>");e.prependLeft(n,`<script>${s()}<\/script>`)}else e.append(`\n\n(function() {\n${s()}\n}())`);return{code:e.toString(),map:e.generateMap({source:a,file:a,includeContent:!0})}})(t,a))}}}};
//# sourceMappingURL=index.cjs.js.map
