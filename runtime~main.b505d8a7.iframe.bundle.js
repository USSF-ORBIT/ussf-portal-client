!function(){"use strict";var deferred,leafPrototypes,getProto,inProgress,__webpack_modules__={},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={id:moduleId,loaded:!1,exports:{}};return __webpack_modules__[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.amdO={},deferred=[],__webpack_require__.O=function(result,chunkIds,fn,priority){if(!chunkIds){var notFulfilled=1/0;for(i=0;i<deferred.length;i++){chunkIds=deferred[i][0],fn=deferred[i][1],priority=deferred[i][2];for(var fulfilled=!0,j=0;j<chunkIds.length;j++)(!1&priority||notFulfilled>=priority)&&Object.keys(__webpack_require__.O).every((function(key){return __webpack_require__.O[key](chunkIds[j])}))?chunkIds.splice(j--,1):(fulfilled=!1,priority<notFulfilled&&(notFulfilled=priority));if(fulfilled){deferred.splice(i--,1);var r=fn();void 0!==r&&(result=r)}}return result}priority=priority||0;for(var i=deferred.length;i>0&&deferred[i-1][2]>priority;i--)deferred[i]=deferred[i-1];deferred[i]=[chunkIds,fn,priority]},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,{a:getter}),getter},getProto=Object.getPrototypeOf?function(obj){return Object.getPrototypeOf(obj)}:function(obj){return obj.__proto__},__webpack_require__.t=function(value,mode){if(1&mode&&(value=this(value)),8&mode)return value;if("object"==typeof value&&value){if(4&mode&&value.__esModule)return value;if(16&mode&&"function"==typeof value.then)return value}var ns=Object.create(null);__webpack_require__.r(ns);var def={};leafPrototypes=leafPrototypes||[null,getProto({}),getProto([]),getProto(getProto)];for(var current=2&mode&&value;"object"==typeof current&&!~leafPrototypes.indexOf(current);current=getProto(current))Object.getOwnPropertyNames(current).forEach((function(key){def[key]=function(){return value[key]}}));return def.default=function(){return value},__webpack_require__.d(ns,def),ns},__webpack_require__.d=function(exports,definition){for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.f={},__webpack_require__.e=function(chunkId){return Promise.all(Object.keys(__webpack_require__.f).reduce((function(promises,key){return __webpack_require__.f[key](chunkId,promises),promises}),[]))},__webpack_require__.u=function(chunkId){return({76:"components-ApplicationsTable-ApplicationsTable-stories",1068:"components-FeedbackCard-FeedbackCard-stories",1102:"components-ArticleListItem-ArticleListItem-stories",1190:"stories-colors-stories",1219:"components-ArticleDateIcon-ArticleDateIcon-stories",1314:"components-Header-Header-stories",1325:"components-Tooltip-Tooltip-stories",1356:"components-NewsWidget-NewsWidget-stories",1387:"stories-grid-stories",1812:"components-EPubsCard-EPubsCard-stories",1864:"components-ThemeToggle-ThemeToggle-stories",2377:"components-PageNav-PageNav-stories",2711:"components-LoadingWidget-LoadingWidget-stories",2843:"components-CustomCollection-CustomCollection-stories",3499:"components-SingleArticle-SingleArticle-stories",3544:"components-SearchFilter-SearchFilter-stories",3754:"components-NewsItem-NewsItem-stories",4010:"components-DropdownFilter-DropdownFilter-stories",4212:"components-MySpace-MySpace-stories",4404:"stories-GovBanner-stories",4462:"components-Loader-Loader-stories",4466:"components-NewsCarousel-NewsCarousel-stories",4747:"components-Tag-Tag-stories",4792:"components-SearchResultItem-SearchResultItem-stories",4941:"stories-introduction-stories",4995:"components-NewsCarouselItem-NewsCarouselItem-stories",5042:"components-PersonalData-PersonalData-stories",5562:"components-Widget-Widget-stories",5632:"components-Search-Search-stories",5888:"components-AddWidget-AddWidget-stories",5945:"stories-buttons-stories",6027:"stories-Pagination-stories",6051:"components-EditDisplayName-EditDisplayName-stories",7218:"components-Announcement-Announcement-stories",7300:"components-CustomModal-CustomModal-stories",7524:"components-BreadcrumbNav-BreadcrumbNav-stories",7586:"components-Alert-Alert-stories",8089:"components-SearchBanner-SearchBanner-stories",8110:"components-Footer-Footer-stories",8239:"components-FeaturedShortcuts-FeaturedShortcuts-stories",8679:"components-PageHeader-PageHeader-stories",8771:"stories-type-stories",8948:"components-ArticleList-ArticleList-stories",9060:"components-SelectableCollection-SelectableCollection-stories",9360:"components-Bookmark-Bookmark-stories",9524:"components-Collection-Collection-stories",9602:"stories-searchresults-stories",9756:"components-GuardianIdeal-GuardianIdealCarousel-stories",9981:"components-Logo-Logo-stories"}[chunkId]||chunkId)+"."+{76:"97c57683",350:"cf47a79e",1068:"c781b23c",1102:"dd910f7e",1190:"7f03d153",1219:"60b8724e",1314:"37c8e873",1325:"8e00cf45",1341:"1bd8d525",1356:"d789de7f",1387:"3f2c8fbf",1506:"d8de593b",1573:"daf5cb3e",1611:"d27d668f",1612:"9dd10886",1729:"0e7ab5bb",1812:"b3cea6eb",1864:"bcd0f60d",2020:"7d2a0096",2092:"e15f1a4f",2336:"81a18f2f",2373:"9c3a1469",2377:"d0de2827",2711:"cdad3974",2843:"5d1e77d3",2983:"cb11c0e5",3069:"282ad8dd",3103:"9c1e71aa",3182:"7ce9b87b",3294:"f58af409",3321:"1c393b6c",3499:"299414d0",3544:"944f0587",3671:"f127ae06",3682:"706357f6",3754:"2d9468ab",3927:"4d41eb95",4010:"13344e3d",4125:"e431da78",4212:"cc517132",4314:"e7ea2762",4404:"2e403d7a",4462:"5cd63a65",4466:"82354cab",4549:"ea4dd5ea",4747:"f1c76725",4792:"ffca8e94",4905:"f62e69ca",4906:"a81caa9b",4941:"0a42eaef",4995:"e2b631dc",5042:"0f0a64ca",5093:"f39c24e6",5201:"1603834a",5562:"74dce737",5632:"847e3c65",5665:"60162a88",5888:"739374fd",5945:"a9706523",6027:"49a7fc66",6051:"46e491ec",6119:"0357044d",6122:"3c60c9af",6169:"42a67b7c",6536:"9af11c03",6870:"bda09243",7218:"e7ef0991",7300:"6f71ebf0",7513:"8b648939",7524:"a52de378",7586:"a65f9264",7644:"8554cda9",8089:"ecb596b5",8096:"29a217e2",8110:"a2d2c0ce",8239:"47aa1cd2",8263:"7dc5d1f0",8504:"4ae765a9",8639:"212a6fdb",8679:"760dc025",8690:"3e1e6efd",8771:"569a3e98",8948:"1c5d1bb9",9060:"05700a48",9115:"6966a501",9169:"4ea8ec6e",9251:"3e9422f2",9360:"37db4fd7",9524:"f63aecb9",9602:"8446f194",9756:"88b07683",9981:"c91f048c"}[chunkId]+".iframe.bundle.js"},__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.hmd=function(module){return(module=Object.create(module)).children||(module.children=[]),Object.defineProperty(module,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+module.id)}}),module},__webpack_require__.o=function(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)},inProgress={},__webpack_require__.l=function(url,done,key,chunkId){if(inProgress[url])inProgress[url].push(done);else{var script,needAttach;if(void 0!==key)for(var scripts=document.getElementsByTagName("script"),i=0;i<scripts.length;i++){var s=scripts[i];if(s.getAttribute("src")==url||s.getAttribute("data-webpack")=="ussf-portal:"+key){script=s;break}}script||(needAttach=!0,(script=document.createElement("script")).charset="utf-8",script.timeout=120,__webpack_require__.nc&&script.setAttribute("nonce",__webpack_require__.nc),script.setAttribute("data-webpack","ussf-portal:"+key),script.src=url),inProgress[url]=[done];var onScriptComplete=function(prev,event){script.onerror=script.onload=null,clearTimeout(timeout);var doneFns=inProgress[url];if(delete inProgress[url],script.parentNode&&script.parentNode.removeChild(script),doneFns&&doneFns.forEach((function(fn){return fn(event)})),prev)return prev(event)},timeout=setTimeout(onScriptComplete.bind(null,void 0,{type:"timeout",target:script}),12e4);script.onerror=onScriptComplete.bind(null,script.onerror),script.onload=onScriptComplete.bind(null,script.onload),needAttach&&document.head.appendChild(script)}},__webpack_require__.r=function(exports){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.nmd=function(module){return module.paths=[],module.children||(module.children=[]),module},__webpack_require__.p="",function(){__webpack_require__.b=document.baseURI||self.location.href;var installedChunks={1303:0};__webpack_require__.f.j=function(chunkId,promises){var installedChunkData=__webpack_require__.o(installedChunks,chunkId)?installedChunks[chunkId]:void 0;if(0!==installedChunkData)if(installedChunkData)promises.push(installedChunkData[2]);else if(1303!=chunkId){var promise=new Promise((function(resolve,reject){installedChunkData=installedChunks[chunkId]=[resolve,reject]}));promises.push(installedChunkData[2]=promise);var url=__webpack_require__.p+__webpack_require__.u(chunkId),error=new Error;__webpack_require__.l(url,(function(event){if(__webpack_require__.o(installedChunks,chunkId)&&(0!==(installedChunkData=installedChunks[chunkId])&&(installedChunks[chunkId]=void 0),installedChunkData)){var errorType=event&&("load"===event.type?"missing":event.type),realSrc=event&&event.target&&event.target.src;error.message="Loading chunk "+chunkId+" failed.\n("+errorType+": "+realSrc+")",error.name="ChunkLoadError",error.type=errorType,error.request=realSrc,installedChunkData[1](error)}}),"chunk-"+chunkId,chunkId)}else installedChunks[chunkId]=0},__webpack_require__.O.j=function(chunkId){return 0===installedChunks[chunkId]};var webpackJsonpCallback=function(parentChunkLoadingFunction,data){var moduleId,chunkId,chunkIds=data[0],moreModules=data[1],runtime=data[2],i=0;if(chunkIds.some((function(id){return 0!==installedChunks[id]}))){for(moduleId in moreModules)__webpack_require__.o(moreModules,moduleId)&&(__webpack_require__.m[moduleId]=moreModules[moduleId]);if(runtime)var result=runtime(__webpack_require__)}for(parentChunkLoadingFunction&&parentChunkLoadingFunction(data);i<chunkIds.length;i++)chunkId=chunkIds[i],__webpack_require__.o(installedChunks,chunkId)&&installedChunks[chunkId]&&installedChunks[chunkId][0](),installedChunks[chunkId]=0;return __webpack_require__.O(result)},chunkLoadingGlobal=self.webpackChunkussf_portal=self.webpackChunkussf_portal||[];chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null,0)),chunkLoadingGlobal.push=webpackJsonpCallback.bind(null,chunkLoadingGlobal.push.bind(chunkLoadingGlobal))}(),__webpack_require__.nc=void 0}();