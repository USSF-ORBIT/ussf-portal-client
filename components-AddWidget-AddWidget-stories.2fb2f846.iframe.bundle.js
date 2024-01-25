(self.webpackChunkussf_portal=self.webpackChunkussf_portal||[]).push([[5888],{"./node_modules/@apollo/client/react/hooks/useApolloClient.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{x:function(){return useApolloClient}});var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@apollo/client/utilities/globals/index.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_context_index_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@apollo/client/react/context/ApolloContext.js");function useApolloClient(override){var context=react__WEBPACK_IMPORTED_MODULE_1__.useContext((0,_context_index_js__WEBPACK_IMPORTED_MODULE_2__.K)()),client=override||context.client;return(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(!!client,49),client}},"./node_modules/@apollo/client/react/hooks/useMutation.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{D:function(){return useMutation}});var tslib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@apollo/client/utilities/common/mergeOptions.js"),_wry_equality__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@wry/equality/lib/index.js"),_parser_index_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@apollo/client/react/parser/index.js"),_errors_index_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@apollo/client/errors/index.js"),_useApolloClient_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@apollo/client/react/hooks/useApolloClient.js");function useMutation(mutation,options){var client=(0,_useApolloClient_js__WEBPACK_IMPORTED_MODULE_2__.x)(null==options?void 0:options.client);(0,_parser_index_js__WEBPACK_IMPORTED_MODULE_3__.Vp)(mutation,_parser_index_js__WEBPACK_IMPORTED_MODULE_3__.n_.Mutation);var _a=react__WEBPACK_IMPORTED_MODULE_0__.useState({called:!1,loading:!1,client:client}),result=_a[0],setResult=_a[1],ref=react__WEBPACK_IMPORTED_MODULE_0__.useRef({result:result,mutationId:0,isMounted:!0,client:client,mutation:mutation,options:options});Object.assign(ref.current,{client:client,options:options,mutation:mutation});var execute=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((function(executeOptions){void 0===executeOptions&&(executeOptions={});var _a=ref.current,options=_a.options,mutation=_a.mutation,baseOptions=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.pi)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.pi)({},options),{mutation:mutation}),client=executeOptions.client||ref.current.client;ref.current.result.loading||baseOptions.ignoreResults||!ref.current.isMounted||setResult(ref.current.result={loading:!0,error:void 0,data:void 0,called:!0,client:client});var mutationId=++ref.current.mutationId,clientOptions=(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.J)(baseOptions,executeOptions);return client.mutate(clientOptions).then((function(response){var _a,_b,data=response.data,errors=response.errors,error=errors&&errors.length>0?new _errors_index_js__WEBPACK_IMPORTED_MODULE_6__.cA({graphQLErrors:errors}):void 0,onError=executeOptions.onError||(null===(_a=ref.current.options)||void 0===_a?void 0:_a.onError);if(error&&onError&&onError(error,clientOptions),mutationId===ref.current.mutationId&&!clientOptions.ignoreResults){var result_1={called:!0,loading:!1,data:data,error:error,client:client};ref.current.isMounted&&!(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.D)(ref.current.result,result_1)&&setResult(ref.current.result=result_1)}var onCompleted=executeOptions.onCompleted||(null===(_b=ref.current.options)||void 0===_b?void 0:_b.onCompleted);return error||null==onCompleted||onCompleted(response.data,clientOptions),response})).catch((function(error){var _a;if(mutationId===ref.current.mutationId&&ref.current.isMounted){var result_2={loading:!1,error:error,data:void 0,called:!0,client:client};(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.D)(ref.current.result,result_2)||setResult(ref.current.result=result_2)}var onError=executeOptions.onError||(null===(_a=ref.current.options)||void 0===_a?void 0:_a.onError);if(onError)return onError(error,clientOptions),{data:void 0,errors:error};throw error}))}),[]),reset=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((function(){if(ref.current.isMounted){var result_3={called:!1,loading:!1,client:client};Object.assign(ref.current,{mutationId:0,result:result_3}),setResult(result_3)}}),[]);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((function(){return ref.current.isMounted=!0,function(){ref.current.isMounted=!1}}),[]),[execute,(0,tslib__WEBPACK_IMPORTED_MODULE_4__.pi)({reset:reset},result)]}},"./node_modules/@apollo/client/react/parser/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Vp:function(){return verifyDocumentType},n_:function(){return DocumentType}});var DocumentType,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@apollo/client/utilities/globals/index.js");!function(DocumentType){DocumentType[DocumentType.Query=0]="Query",DocumentType[DocumentType.Mutation=1]="Mutation",DocumentType[DocumentType.Subscription=2]="Subscription"}(DocumentType||(DocumentType={}));var cache=new Map;function operationName(type){var name;switch(type){case DocumentType.Query:name="Query";break;case DocumentType.Mutation:name="Mutation";break;case DocumentType.Subscription:name="Subscription"}return name}function verifyDocumentType(document,type){var operation=function parser(document){var variables,type,cached=cache.get(document);if(cached)return cached;(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(!!document&&!!document.kind,59,document);for(var fragments=[],queries=[],mutations=[],subscriptions=[],_i=0,_a=document.definitions;_i<_a.length;_i++){var x=_a[_i];if("FragmentDefinition"!==x.kind){if("OperationDefinition"===x.kind)switch(x.operation){case"query":queries.push(x);break;case"mutation":mutations.push(x);break;case"subscription":subscriptions.push(x)}}else fragments.push(x)}(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(!fragments.length||queries.length||mutations.length||subscriptions.length,60),(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(queries.length+mutations.length+subscriptions.length<=1,61,document,queries.length,subscriptions.length,mutations.length),type=queries.length?DocumentType.Query:DocumentType.Mutation,queries.length||mutations.length||(type=DocumentType.Subscription);var definitions=queries.length?queries:mutations.length?mutations:subscriptions;(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(1===definitions.length,62,document,definitions.length);var definition=definitions[0];variables=definition.variableDefinitions||[];var payload={name:definition.name&&"Name"===definition.name.kind?definition.name.value:"data",type:type,variables:variables};return cache.set(document,payload),payload}(document),requiredOperationName=operationName(type),usedOperationName=operationName(operation.type);(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(operation.type===type,63,requiredOperationName,requiredOperationName,usedOperationName)}},"./src/components/AddWidget/AddWidget.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AddCollectionDisabled:function(){return AddCollectionDisabled},DefaultAddWidget:function(){return DefaultAddWidget},NewsWidgetDisabled:function(){return NewsWidgetDisabled}});var _home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_stores_myspaceContext__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/stores/myspaceContext.tsx"),_AddWidget__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/AddWidget/AddWidget.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const mockMySpaceContext={mySpace:[],disableDragAndDrop:!1,setDisableDragAndDrop:()=>{},isAddingWidget:!1,setIsAddingWidget:()=>{},initializeMySpace:()=>{},isCollection:()=>!0,isGuardianIdeal:()=>!0,isNewsWidget:()=>!0,isFeaturedShortcuts:()=>!0,isWeather:()=>!0,canAddCollections:!0,canAddNews:!0,canAddWeather:!0,canAddGuardianIdeal:!0,canAddFeaturedShortcuts:!0,addNewsWidget:()=>{},addGuardianIdeal:()=>{},addFeaturedShortcuts:()=>{},addNewCollection:()=>{},addNewWeatherWidget:()=>{},editWeatherWidget:()=>{},handleOnDragEnd:()=>{},temporaryWidget:"",setTemporaryWidget:()=>{}},MockContextProvider=({children:children,mockValue:mockValue})=>__jsx(_stores_myspaceContext__WEBPACK_IMPORTED_MODULE_2__.Kr.Provider,{value:mockValue},children);MockContextProvider.displayName="MockContextProvider",__webpack_exports__.default={title:"Base/AddWidget",component:_AddWidget__WEBPACK_IMPORTED_MODULE_3__.Z,argTypes:{handleSelectCollection:{action:"Select collection from template"},handleCreateCollection:{action:"Create new collection"}}};const DefaultAddWidget=argTypes=>__jsx(_AddWidget__WEBPACK_IMPORTED_MODULE_3__.Z,{handleSelectCollection:argTypes.handleSelectCollection});DefaultAddWidget.displayName="DefaultAddWidget";const AddCollectionDisabled=argTypes=>__jsx(MockContextProvider,{mockValue:_objectSpread(_objectSpread({},mockMySpaceContext),{},{canAddCollections:!1})},__jsx(_AddWidget__WEBPACK_IMPORTED_MODULE_3__.Z,{handleSelectCollection:argTypes.handleSelectCollection}));AddCollectionDisabled.displayName="AddCollectionDisabled";const NewsWidgetDisabled=argTypes=>__jsx(MockContextProvider,{mockValue:_objectSpread(_objectSpread({},mockMySpaceContext),{},{canAddNews:!1})},__jsx(_AddWidget__WEBPACK_IMPORTED_MODULE_3__.Z,{handleSelectCollection:argTypes.handleSelectCollection}));NewsWidgetDisabled.displayName="NewsWidgetDisabled",DefaultAddWidget.parameters=_objectSpread(_objectSpread({},DefaultAddWidget.parameters),{},{docs:_objectSpread(_objectSpread({},DefaultAddWidget.parameters?.docs),{},{source:_objectSpread({originalSource:"(argTypes: StorybookArgTypes) => <AddWidget handleSelectCollection={argTypes.handleSelectCollection} />"},DefaultAddWidget.parameters?.docs?.source)})}),AddCollectionDisabled.parameters=_objectSpread(_objectSpread({},AddCollectionDisabled.parameters),{},{docs:_objectSpread(_objectSpread({},AddCollectionDisabled.parameters?.docs),{},{source:_objectSpread({originalSource:"(argTypes: StorybookArgTypes) => <MockContextProvider mockValue={{\n  ...mockMySpaceContext,\n  canAddCollections: false\n}}>\n    <AddWidget handleSelectCollection={argTypes.handleSelectCollection} />\n  </MockContextProvider>"},AddCollectionDisabled.parameters?.docs?.source)})}),NewsWidgetDisabled.parameters=_objectSpread(_objectSpread({},NewsWidgetDisabled.parameters),{},{docs:_objectSpread(_objectSpread({},NewsWidgetDisabled.parameters?.docs),{},{source:_objectSpread({originalSource:"(argTypes: StorybookArgTypes) => <MockContextProvider mockValue={{\n  ...mockMySpaceContext,\n  canAddNews: false\n}}>\n    <AddWidget handleSelectCollection={argTypes.handleSelectCollection} />\n  </MockContextProvider>"},NewsWidgetDisabled.parameters?.docs?.source)})}),DefaultAddWidget.__docgenInfo={description:"",methods:[],displayName:"DefaultAddWidget",props:{handleSelectCollection:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},handleCreateCollection:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}},AddCollectionDisabled.__docgenInfo={description:"",methods:[],displayName:"AddCollectionDisabled",props:{handleSelectCollection:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},handleCreateCollection:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}},NewsWidgetDisabled.__docgenInfo={description:"",methods:[],displayName:"NewsWidgetDisabled",props:{handleSelectCollection:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},handleCreateCollection:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};try{DefaultAddWidget.displayName="DefaultAddWidget",DefaultAddWidget.__docgenInfo={description:"",displayName:"DefaultAddWidget",props:{handleSelectCollection:{defaultValue:null,description:"",name:"handleSelectCollection",required:!0,type:{name:"() => void"}},handleCreateCollection:{defaultValue:null,description:"",name:"handleCreateCollection",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/AddWidget/AddWidget.stories.tsx#DefaultAddWidget"]={docgenInfo:DefaultAddWidget.__docgenInfo,name:"DefaultAddWidget",path:"src/components/AddWidget/AddWidget.stories.tsx#DefaultAddWidget"})}catch(__react_docgen_typescript_loader_error){}try{AddCollectionDisabled.displayName="AddCollectionDisabled",AddCollectionDisabled.__docgenInfo={description:"",displayName:"AddCollectionDisabled",props:{handleSelectCollection:{defaultValue:null,description:"",name:"handleSelectCollection",required:!0,type:{name:"() => void"}},handleCreateCollection:{defaultValue:null,description:"",name:"handleCreateCollection",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/AddWidget/AddWidget.stories.tsx#AddCollectionDisabled"]={docgenInfo:AddCollectionDisabled.__docgenInfo,name:"AddCollectionDisabled",path:"src/components/AddWidget/AddWidget.stories.tsx#AddCollectionDisabled"})}catch(__react_docgen_typescript_loader_error){}try{NewsWidgetDisabled.displayName="NewsWidgetDisabled",NewsWidgetDisabled.__docgenInfo={description:"",displayName:"NewsWidgetDisabled",props:{handleSelectCollection:{defaultValue:null,description:"",name:"handleSelectCollection",required:!0,type:{name:"() => void"}},handleCreateCollection:{defaultValue:null,description:"",name:"handleCreateCollection",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/AddWidget/AddWidget.stories.tsx#NewsWidgetDisabled"]={docgenInfo:NewsWidgetDisabled.__docgenInfo,name:"NewsWidgetDisabled",path:"src/components/AddWidget/AddWidget.stories.tsx#NewsWidgetDisabled"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/index.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{VY:function(){return CONTENT_CATEGORIES},_p:function(){return MAXIMUM_COLLECTIONS},hg:function(){return WIDGET_TYPES},yp:function(){return SPACEFORCE_NEWS_RSS_URL}});const SPACEFORCE_NEWS_RSS_URL="https://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=1060",WIDGET_TYPES={COLLECTION:"Collection",NEWS:"News",GUARDIANIDEAL:"GuardianIdeal",FEATUREDSHORTCUTS:"FeaturedShortcuts",WEATHER:"Weather"},MAXIMUM_COLLECTIONS=(WIDGET_TYPES.GUARDIANIDEAL,WIDGET_TYPES.FEATUREDSHORTCUTS,25),CONTENT_CATEGORIES={EXTERNAL_NEWS:{value:"ExternalNews",label:"External USSF News"},INTERNAL_NEWS:{value:"InternalNews",label:"Internal USSF News"},NEWS:{value:"News",label:"USSF News"},ANNOUNCEMENT:{value:"Announcement",label:"Announcement"},DOCUMENTATION:{value:"Documentation",label:"USSF Documentation"},LANDING_PAGE:{value:"LandingPage",label:"Landing Page"},APPLICATION:{value:"Application",label:"Application"},GUARDIANIDEAL:{value:"GuardianIdeal",label:"Guardian Ideal"},FEATUREDSHORTCUTS:{value:"FeaturedShortcuts",label:"FeaturedShortcuts"}}},"./src/stores/analyticsContext.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{z$:function(){return useAnalytics}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),next_router__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/router.js"),console=__webpack_require__("./node_modules/console-browserify/index.js"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const AnalyticsContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({push:()=>{},setUserIdFn:()=>{},unsetUserIdFn:()=>{},trackEvent:()=>{},trackBaseLocation:()=>{},trackRank:()=>{}}),AnalyticsProvider=({children:children,debug:debug=!1})=>{const router=(0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();let previousPath="";const push=args=>{if(!window)return void console.warn("ANALYTICS: Cannot call push from server side code");const windowWithAnalytics=window;windowWithAnalytics._paq||(windowWithAnalytics._paq=[]),!0===debug&&console.debug("ANALYTICS:",...args),windowWithAnalytics._paq.push(args)},handleRouteChange=url=>{previousPath&&push(["setReferrerUrl",previousPath]),push(["setCustomUrl",url]),push(["setDocumentTitle",document.title]),push(["trackPageView"]),push(["enableLinkTracking"]),previousPath=url};(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{(async()=>{const{analyticsUrl:analyticsUrl,analyticsSiteId:analyticsSiteId}=await fetch("/api/sysinfo").then((resp=>resp.json()));if(!analyticsUrl)return void console.warn("ANALYTICS: No Matomo URL provided");if(!analyticsSiteId)return void console.warn("ANALYTICS: No Site ID provided");previousPath=location.href,push(["setDocumentTitle",document.title]),push(["setDoNotTrack",!1]),push(["trackPageView"]),push(["enableLinkTracking"]),push(["setTrackerUrl",`${analyticsUrl}/matomo.php`]),push(["setSiteId",analyticsSiteId]);const scriptEl=document.createElement("script"),refElement=document.getElementsByTagName("script")[0];scriptEl.type="text/javascript",scriptEl.async=!0,scriptEl.defer=!0,scriptEl.src=`${analyticsUrl}/matomo.js`,refElement.parentNode&&refElement.parentNode.insertBefore(scriptEl,refElement),previousPath=location.pathname,router.events.on("routeChangeStart",handleRouteChange)})()}),[]);const context={push:push,setUserIdFn:userId=>{!0===debug&&console.debug("ANALYTICS(setUserId):",userId),push(["setUserId",userId])},unsetUserIdFn:()=>{!0===debug&&console.debug("ANALYTICS(unsetUserId)"),push(["resetUserId"]),push(["appendToTrackingUrl","new_visit=1"]),push(["trackPageView"]),push(["appendToTrackingUrl",""])},trackEvent:(category,action,name,value)=>{const pushParams=["trackEvent",category,action];void 0!==name&&(pushParams.push(name),void 0!==value&&pushParams.push(value)),push(pushParams)},trackBaseLocation:baseLocation=>{!0===debug&&console.debug("ANALYTICS(trackBaseLocation):",baseLocation),push(["setCustomDimension",1,baseLocation]),push(["trackPageView"])},trackRank:rank=>{!0===debug&&console.debug("ANALYTICS(trackRank):",rank),push(["setCustomDimension",2,rank]),push(["trackPageView"])}};return __jsx(AnalyticsContext.Provider,{value:context},children)};AnalyticsProvider.displayName="AnalyticsProvider";const useAnalytics=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(AnalyticsContext);if(void 0===context)throw new Error("useAnalytics must be used within an AnalyticsContextProvider");return context};AnalyticsProvider.__docgenInfo={description:"",methods:[],displayName:"AnalyticsProvider",props:{debug:{defaultValue:{value:"process.env.NODE_ENV === 'development'",computed:!1},required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};try{AnalyticsProvider.displayName="AnalyticsProvider",AnalyticsProvider.__docgenInfo={description:"",displayName:"AnalyticsProvider",props:{debug:{defaultValue:{value:"process.env.NODE_ENV === 'development'"},description:"",name:"debug",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stores/analyticsContext.tsx#AnalyticsProvider"]={docgenInfo:AnalyticsProvider.__docgenInfo,name:"AnalyticsProvider",path:"src/stores/analyticsContext.tsx#AnalyticsProvider"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/graphql-tag/lib/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Ps:function(){return gql}});var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),graphql__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/graphql/language/parser.mjs"),console=__webpack_require__("./node_modules/console-browserify/index.js"),docCache=new Map,fragmentSourceMap=new Map,printFragmentWarnings=!0,experimentalFragmentVariables=!1;function normalize(string){return string.replace(/[\s,]+/g," ").trim()}function processFragments(ast){var seenKeys=new Set,definitions=[];return ast.definitions.forEach((function(fragmentDefinition){if("FragmentDefinition"===fragmentDefinition.kind){var fragmentName=fragmentDefinition.name.value,sourceKey=function cacheKeyFromLoc(loc){return normalize(loc.source.body.substring(loc.start,loc.end))}(fragmentDefinition.loc),sourceKeySet=fragmentSourceMap.get(fragmentName);sourceKeySet&&!sourceKeySet.has(sourceKey)?printFragmentWarnings&&console.warn("Warning: fragment with name "+fragmentName+" already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names"):sourceKeySet||fragmentSourceMap.set(fragmentName,sourceKeySet=new Set),sourceKeySet.add(sourceKey),seenKeys.has(sourceKey)||(seenKeys.add(sourceKey),definitions.push(fragmentDefinition))}else definitions.push(fragmentDefinition)})),(0,tslib__WEBPACK_IMPORTED_MODULE_0__.pi)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.pi)({},ast),{definitions:definitions})}function parseDocument(source){var cacheKey=normalize(source);if(!docCache.has(cacheKey)){var parsed=(0,graphql__WEBPACK_IMPORTED_MODULE_1__.Qc)(source,{experimentalFragmentVariables:experimentalFragmentVariables,allowLegacyFragmentVariables:experimentalFragmentVariables});if(!parsed||"Document"!==parsed.kind)throw new Error("Not a valid GraphQL document.");docCache.set(cacheKey,function stripLoc(doc){var workSet=new Set(doc.definitions);workSet.forEach((function(node){node.loc&&delete node.loc,Object.keys(node).forEach((function(key){var value=node[key];value&&"object"==typeof value&&workSet.add(value)}))}));var loc=doc.loc;return loc&&(delete loc.startToken,delete loc.endToken),doc}(processFragments(parsed)))}return docCache.get(cacheKey)}function gql(literals){for(var args=[],_i=1;_i<arguments.length;_i++)args[_i-1]=arguments[_i];"string"==typeof literals&&(literals=[literals]);var result=literals[0];return args.forEach((function(arg,i){arg&&"Document"===arg.kind?result+=arg.loc.source.body:result+=arg,result+=literals[i+1]})),parseDocument(result)}var gql_1,extras_gql=gql,extras_resetCaches=function resetCaches(){docCache.clear(),fragmentSourceMap.clear()},extras_disableFragmentWarnings=function disableFragmentWarnings(){printFragmentWarnings=!1},extras_enableExperimentalFragmentVariables=function enableExperimentalFragmentVariables(){experimentalFragmentVariables=!0},extras_disableExperimentalFragmentVariables=function disableExperimentalFragmentVariables(){experimentalFragmentVariables=!1};(gql_1=gql||(gql={})).gql=extras_gql,gql_1.resetCaches=extras_resetCaches,gql_1.disableFragmentWarnings=extras_disableFragmentWarnings,gql_1.enableExperimentalFragmentVariables=extras_enableExperimentalFragmentVariables,gql_1.disableExperimentalFragmentVariables=extras_disableExperimentalFragmentVariables,gql.default=gql},"?c969":function(){},"?ed1b":function(){},"?d17e":function(){}}]);