/*! For license information please see 3050.8e0846fb.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkussf_portal=self.webpackChunkussf_portal||[]).push([[3050,1856],{"./node_modules/@apollo/client/react/hooks/useApolloClient.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{x:function(){return useApolloClient}});var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@apollo/client/utilities/globals/index.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/index.js"),_context_index_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@apollo/client/react/context/ApolloContext.js");function useApolloClient(override){var context=(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)((0,_context_index_js__WEBPACK_IMPORTED_MODULE_2__.K)()),client=override||context.client;return __DEV__?(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(!!client,'Could not find "client" in the context or passed in as an option. Wrap the root component in an <ApolloProvider>, or pass an ApolloClient instance in via options.'):(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(!!client,32),client}},"./node_modules/@apollo/client/react/hooks/useMutation.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{D:function(){return useMutation}});var tslib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_core_index_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@apollo/client/utilities/common/mergeOptions.js"),_wry_equality__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@wry/equality/lib/index.js"),_parser_index_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@apollo/client/react/parser/index.js"),_errors_index_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@apollo/client/errors/index.js"),_useApolloClient_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@apollo/client/react/hooks/useApolloClient.js");function useMutation(mutation,options){var client=(0,_useApolloClient_js__WEBPACK_IMPORTED_MODULE_2__.x)(null==options?void 0:options.client);(0,_parser_index_js__WEBPACK_IMPORTED_MODULE_3__.Vp)(mutation,_parser_index_js__WEBPACK_IMPORTED_MODULE_3__.n_.Mutation);var _a=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({called:!1,loading:!1,client:client}),result=_a[0],setResult=_a[1],ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({result:result,mutationId:0,isMounted:!0,client:client,mutation:mutation,options:options});Object.assign(ref.current,{client:client,options:options,mutation:mutation});var execute=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(executeOptions){void 0===executeOptions&&(executeOptions={});var _a=ref.current,options=_a.options,mutation=_a.mutation,baseOptions=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.pi)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.pi)({},options),{mutation:mutation}),client=executeOptions.client||ref.current.client;ref.current.result.loading||baseOptions.ignoreResults||!ref.current.isMounted||setResult(ref.current.result={loading:!0,error:void 0,data:void 0,called:!0,client:client});var mutationId=++ref.current.mutationId,clientOptions=(0,_core_index_js__WEBPACK_IMPORTED_MODULE_5__.J)(baseOptions,executeOptions);return client.mutate(clientOptions).then((function(response){var _a,data=response.data,errors=response.errors,error=errors&&errors.length>0?new _errors_index_js__WEBPACK_IMPORTED_MODULE_6__.cA({graphQLErrors:errors}):void 0;if(mutationId===ref.current.mutationId&&!clientOptions.ignoreResults){var result_1={called:!0,loading:!1,data:data,error:error,client:client};ref.current.isMounted&&!(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.D)(ref.current.result,result_1)&&setResult(ref.current.result=result_1)}var onCompleted=executeOptions.onCompleted||(null===(_a=ref.current.options)||void 0===_a?void 0:_a.onCompleted);return null==onCompleted||onCompleted(response.data,clientOptions),response})).catch((function(error){var _a;if(mutationId===ref.current.mutationId&&ref.current.isMounted){var result_2={loading:!1,error:error,data:void 0,called:!0,client:client};(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.D)(ref.current.result,result_2)||setResult(ref.current.result=result_2)}var onError=executeOptions.onError||(null===(_a=ref.current.options)||void 0===_a?void 0:_a.onError);if(onError)return onError(error,clientOptions),{data:void 0,errors:error};throw error}))}),[]),reset=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(){ref.current.isMounted&&setResult({called:!1,loading:!1,client:client})}),[]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return ref.current.isMounted=!0,function(){ref.current.isMounted=!1}}),[]),[execute,(0,tslib__WEBPACK_IMPORTED_MODULE_4__.pi)({reset:reset},result)]}},"./node_modules/@apollo/client/react/parser/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Vp:function(){return verifyDocumentType},n_:function(){return DocumentType}});var DocumentType,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@apollo/client/utilities/globals/index.js");!function(DocumentType){DocumentType[DocumentType.Query=0]="Query",DocumentType[DocumentType.Mutation=1]="Mutation",DocumentType[DocumentType.Subscription=2]="Subscription"}(DocumentType||(DocumentType={}));var cache=new Map;function operationName(type){var name;switch(type){case DocumentType.Query:name="Query";break;case DocumentType.Mutation:name="Mutation";break;case DocumentType.Subscription:name="Subscription"}return name}function verifyDocumentType(document,type){var operation=function parser(document){var variables,type,cached=cache.get(document);if(cached)return cached;__DEV__?(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(!!document&&!!document.kind,"Argument of ".concat(document," passed to parser was not a valid GraphQL ")+"DocumentNode. You may need to use 'graphql-tag' or another method to convert your operation into a document"):(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(!!document&&!!document.kind,33);for(var fragments=[],queries=[],mutations=[],subscriptions=[],_i=0,_a=document.definitions;_i<_a.length;_i++){var x=_a[_i];if("FragmentDefinition"!==x.kind){if("OperationDefinition"===x.kind)switch(x.operation){case"query":queries.push(x);break;case"mutation":mutations.push(x);break;case"subscription":subscriptions.push(x)}}else fragments.push(x)}__DEV__?(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(!fragments.length||queries.length||mutations.length||subscriptions.length,"Passing only a fragment to 'graphql' is not yet supported. You must include a query, subscription or mutation as well"):(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(!fragments.length||queries.length||mutations.length||subscriptions.length,34),__DEV__?(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(queries.length+mutations.length+subscriptions.length<=1,"react-apollo only supports a query, subscription, or a mutation per HOC. "+"".concat(document," had ").concat(queries.length," queries, ").concat(subscriptions.length," ")+"subscriptions and ".concat(mutations.length," mutations. ")+"You can use 'compose' to join multiple operation types to a component"):(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(queries.length+mutations.length+subscriptions.length<=1,35),type=queries.length?DocumentType.Query:DocumentType.Mutation,queries.length||mutations.length||(type=DocumentType.Subscription);var definitions=queries.length?queries:mutations.length?mutations:subscriptions;__DEV__?(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(1===definitions.length,"react-apollo only supports one definition per HOC. ".concat(document," had ")+"".concat(definitions.length," definitions. ")+"You can use 'compose' to join multiple operation types to a component"):(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(1===definitions.length,36);var definition=definitions[0];variables=definition.variableDefinitions||[];var payload={name:definition.name&&"Name"===definition.name.kind?definition.name.value:"data",type:type,variables:variables};return cache.set(document,payload),payload}(document),requiredOperationName=operationName(type),usedOperationName=operationName(operation.type);__DEV__?(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(operation.type===type,"Running a ".concat(requiredOperationName," requires a graphql ")+"".concat(requiredOperationName,", but a ").concat(usedOperationName," was used instead.")):(0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.kG)(operation.type===type,37)}},"./node_modules/@babel/runtime/helpers/esm/extends.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}__webpack_require__.d(__webpack_exports__,{Z:function(){return _extends}})},"./node_modules/classnames/index.js":function(module,exports){var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/graphql-tag/lib/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Ps:function(){return gql}});var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),graphql__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/graphql/language/parser.mjs"),console=__webpack_require__("./node_modules/console-browserify/index.js"),docCache=new Map,fragmentSourceMap=new Map,printFragmentWarnings=!0,experimentalFragmentVariables=!1;function normalize(string){return string.replace(/[\s,]+/g," ").trim()}function processFragments(ast){var seenKeys=new Set,definitions=[];return ast.definitions.forEach((function(fragmentDefinition){if("FragmentDefinition"===fragmentDefinition.kind){var fragmentName=fragmentDefinition.name.value,sourceKey=function cacheKeyFromLoc(loc){return normalize(loc.source.body.substring(loc.start,loc.end))}(fragmentDefinition.loc),sourceKeySet=fragmentSourceMap.get(fragmentName);sourceKeySet&&!sourceKeySet.has(sourceKey)?printFragmentWarnings&&console.warn("Warning: fragment with name "+fragmentName+" already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names"):sourceKeySet||fragmentSourceMap.set(fragmentName,sourceKeySet=new Set),sourceKeySet.add(sourceKey),seenKeys.has(sourceKey)||(seenKeys.add(sourceKey),definitions.push(fragmentDefinition))}else definitions.push(fragmentDefinition)})),(0,tslib__WEBPACK_IMPORTED_MODULE_0__.pi)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.pi)({},ast),{definitions:definitions})}function parseDocument(source){var cacheKey=normalize(source);if(!docCache.has(cacheKey)){var parsed=(0,graphql__WEBPACK_IMPORTED_MODULE_1__.Qc)(source,{experimentalFragmentVariables:experimentalFragmentVariables,allowLegacyFragmentVariables:experimentalFragmentVariables});if(!parsed||"Document"!==parsed.kind)throw new Error("Not a valid GraphQL document.");docCache.set(cacheKey,function stripLoc(doc){var workSet=new Set(doc.definitions);workSet.forEach((function(node){node.loc&&delete node.loc,Object.keys(node).forEach((function(key){var value=node[key];value&&"object"==typeof value&&workSet.add(value)}))}));var loc=doc.loc;return loc&&(delete loc.startToken,delete loc.endToken),doc}(processFragments(parsed)))}return docCache.get(cacheKey)}function gql(literals){for(var args=[],_i=1;_i<arguments.length;_i++)args[_i-1]=arguments[_i];"string"==typeof literals&&(literals=[literals]);var result=literals[0];return args.forEach((function(arg,i){arg&&"Document"===arg.kind?result+=arg.loc.source.body:result+=arg,result+=literals[i+1]})),parseDocument(result)}var gql_1,extras_gql=gql,extras_resetCaches=function resetCaches(){docCache.clear(),fragmentSourceMap.clear()},extras_disableFragmentWarnings=function disableFragmentWarnings(){printFragmentWarnings=!1},extras_enableExperimentalFragmentVariables=function enableExperimentalFragmentVariables(){experimentalFragmentVariables=!0},extras_disableExperimentalFragmentVariables=function disableExperimentalFragmentVariables(){experimentalFragmentVariables=!1};(gql_1=gql||(gql={})).gql=extras_gql,gql_1.resetCaches=extras_resetCaches,gql_1.disableFragmentWarnings=extras_disableFragmentWarnings,gql_1.enableExperimentalFragmentVariables=extras_enableExperimentalFragmentVariables,gql_1.disableExperimentalFragmentVariables=extras_disableExperimentalFragmentVariables,gql.default=gql},"./node_modules/next/dist/client/router.js":function(module,exports,__webpack_require__){"use strict";var console=__webpack_require__("./node_modules/console-browserify/index.js");Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"Router",{enumerable:!0,get:function(){return _router.default}}),Object.defineProperty(exports,"withRouter",{enumerable:!0,get:function(){return _withRouter.default}}),exports.useRouter=function useRouter(){return _react.default.useContext(_routerContext.RouterContext)},exports.createRouter=function createRouter(...args){return singletonRouter.router=new _router.default(...args),singletonRouter.readyCallbacks.forEach((cb=>cb())),singletonRouter.readyCallbacks=[],singletonRouter.router},exports.makePublicRouterInstance=function makePublicRouterInstance(router){const scopedRouter=router,instance={};for(const property of urlPropertyFields)"object"!=typeof scopedRouter[property]?instance[property]=scopedRouter[property]:instance[property]=Object.assign(Array.isArray(scopedRouter[property])?[]:{},scopedRouter[property]);return instance.events=_router.default.events,coreMethodFields.forEach((field=>{instance[field]=(...args)=>scopedRouter[field](...args)})),instance},exports.default=void 0;var _interop_require_default=__webpack_require__("./node_modules/@swc/helpers/lib/_interop_require_default.js").Z,_react=_interop_require_default(__webpack_require__("./node_modules/react/index.js")),_router=_interop_require_default(__webpack_require__("./node_modules/next/dist/shared/lib/router/router.js")),_routerContext=__webpack_require__("./node_modules/next/dist/shared/lib/router-context.js"),_isError=_interop_require_default(__webpack_require__("./node_modules/next/dist/lib/is-error.js")),_withRouter=_interop_require_default(__webpack_require__("./node_modules/next/dist/client/with-router.js"));const singletonRouter={router:null,readyCallbacks:[],ready(cb){if(this.router)return cb();"undefined"!=typeof window&&this.readyCallbacks.push(cb)}},urlPropertyFields=["pathname","route","query","asPath","components","isFallback","basePath","locale","locales","defaultLocale","isReady","isPreview","isLocaleDomain","domainLocales"],coreMethodFields=["push","replace","reload","back","prefetch","beforePopState"];function getRouter(){if(!singletonRouter.router){throw new Error('No router instance found.\nYou should only use "next/router" on the client side of your app.\n')}return singletonRouter.router}Object.defineProperty(singletonRouter,"events",{get(){return _router.default.events}}),urlPropertyFields.forEach((field=>{Object.defineProperty(singletonRouter,field,{get(){return getRouter()[field]}})})),coreMethodFields.forEach((field=>{singletonRouter[field]=(...args)=>getRouter()[field](...args)})),["routeChangeStart","beforeHistoryChange","routeChangeComplete","routeChangeError","hashChangeStart","hashChangeComplete"].forEach((event=>{singletonRouter.ready((()=>{_router.default.events.on(event,((...args)=>{const eventField=`on${event.charAt(0).toUpperCase()}${event.substring(1)}`,_singletonRouter=singletonRouter;if(_singletonRouter[eventField])try{_singletonRouter[eventField](...args)}catch(err){console.error(`Error when running the Router event: ${eventField}`),console.error(_isError.default(err)?`${err.message}\n${err.stack}`:err+"")}}))}))}));var _default=singletonRouter;exports.default=_default,("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/with-router.js":function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function withRouter(ComposedComponent){function WithRouterWrapper(props){return _react.default.createElement(ComposedComponent,Object.assign({router:_router.useRouter()},props))}WithRouterWrapper.getInitialProps=ComposedComponent.getInitialProps,WithRouterWrapper.origGetInitialProps=ComposedComponent.origGetInitialProps,!1;return WithRouterWrapper};var _react=(0,__webpack_require__("./node_modules/@swc/helpers/lib/_interop_require_default.js").Z)(__webpack_require__("./node_modules/react/index.js")),_router=__webpack_require__("./node_modules/next/dist/client/router.js");("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/router.js":function(module,__unused_webpack_exports,__webpack_require__){module.exports=__webpack_require__("./node_modules/next/dist/client/router.js")}}]);