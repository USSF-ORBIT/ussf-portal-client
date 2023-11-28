"use strict";(self.webpackChunkussf_portal=self.webpackChunkussf_portal||[]).push([[959],{"./node_modules/@apollo/client/react/hooks/useQuery.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{a:function(){return useQuery}});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),globals=__webpack_require__("./node_modules/@apollo/client/utilities/globals/index.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),react_namespaceObject=__webpack_require__.t(react,2),canUse=__webpack_require__("./node_modules/@apollo/client/utilities/common/canUse.js"),didWarnUncachedGetSnapshot=!1,useSyncExternalStore=react_namespaceObject.useSyncExternalStore||function(subscribe,getSnapshot,getServerSnapshot){var value=getSnapshot();!1===globalThis.__DEV__||didWarnUncachedGetSnapshot||value===getSnapshot()||(didWarnUncachedGetSnapshot=!0,!1!==globalThis.__DEV__&&globals.kG.error(58));var _a=react.useState({inst:{value:value,getSnapshot:getSnapshot}}),inst=_a[0].inst,forceUpdate=_a[1];return canUse.JC?react.useLayoutEffect((function(){Object.assign(inst,{value:value,getSnapshot:getSnapshot}),checkIfSnapshotChanged(inst)&&forceUpdate({inst:inst})}),[subscribe,value,getSnapshot]):Object.assign(inst,{value:value,getSnapshot:getSnapshot}),react.useEffect((function(){return checkIfSnapshotChanged(inst)&&forceUpdate({inst:inst}),subscribe((function handleStoreChange(){checkIfSnapshotChanged(inst)&&forceUpdate({inst:inst})}))}),[subscribe]),value};function checkIfSnapshotChanged(_a){var value=_a.value,getSnapshot=_a.getSnapshot;try{return value!==getSnapshot()}catch(_b){return!0}}var lib=__webpack_require__("./node_modules/@wry/equality/lib/index.js"),mergeOptions=__webpack_require__("./node_modules/@apollo/client/utilities/common/mergeOptions.js"),ApolloContext=__webpack_require__("./node_modules/@apollo/client/react/context/ApolloContext.js"),errors=__webpack_require__("./node_modules/@apollo/client/errors/index.js"),networkStatus=__webpack_require__("./node_modules/@apollo/client/core/networkStatus.js"),parser=__webpack_require__("./node_modules/@apollo/client/react/parser/index.js"),useApolloClient=__webpack_require__("./node_modules/@apollo/client/react/hooks/useApolloClient.js"),maybeDeepFreeze=__webpack_require__("./node_modules/@apollo/client/utilities/common/maybeDeepFreeze.js"),compact=__webpack_require__("./node_modules/@apollo/client/utilities/common/compact.js"),arrays=__webpack_require__("./node_modules/@apollo/client/utilities/common/arrays.js"),useQuery_hasOwnProperty=Object.prototype.hasOwnProperty;function useQuery(query,options){return void 0===options&&(options=Object.create(null)),function useInternalState(client,query){var stateRef=react.useRef();stateRef.current&&client===stateRef.current.client&&query===stateRef.current.query||(stateRef.current=new InternalState(client,query,stateRef.current));var state=stateRef.current;return state.forceUpdateState=react.useReducer((function(tick){return tick+1}),0)[1],state}((0,useApolloClient.x)(options.client),query).useQuery(options)}var InternalState=function(){function InternalState(client,query,previous){var _this=this;this.client=client,this.query=query,this.forceUpdate=function(){return _this.forceUpdateState()},this.ssrDisabledResult=(0,maybeDeepFreeze.J)({loading:!0,data:void 0,error:void 0,networkStatus:networkStatus.Ie.loading}),this.skipStandbyResult=(0,maybeDeepFreeze.J)({loading:!1,data:void 0,error:void 0,networkStatus:networkStatus.Ie.ready}),this.toQueryResultCache=new(canUse.mr?WeakMap:Map),(0,parser.Vp)(query,parser.n_.Query);var previousResult=previous&&previous.result,previousData=previousResult&&previousResult.data;previousData&&(this.previousData=previousData)}return InternalState.prototype.forceUpdateState=function(){!1!==globalThis.__DEV__&&globals.kG.warn(50)},InternalState.prototype.executeQuery=function(options){var _a,_this=this;options.query&&Object.assign(this,{query:options.query}),this.watchQueryOptions=this.createWatchQueryOptions(this.queryHookOptions=options);var concast=this.observable.reobserveAsConcast(this.getObsQueryOptions());return this.previousData=(null===(_a=this.result)||void 0===_a?void 0:_a.data)||this.previousData,this.result=void 0,this.forceUpdate(),new Promise((function(resolve){var result;concast.subscribe({next:function(value){result=value},error:function(){resolve(_this.toQueryResult(_this.observable.getCurrentResult()))},complete:function(){resolve(_this.toQueryResult(result))}})}))},InternalState.prototype.useQuery=function(options){var _this=this;this.renderPromises=react.useContext((0,ApolloContext.K)()).renderPromises,this.useOptions(options);var obsQuery=this.useObservableQuery(),result=useSyncExternalStore(react.useCallback((function(handleStoreChange){if(_this.renderPromises)return function(){};_this.forceUpdate=handleStoreChange;var onNext=function(){var previousResult=_this.result,result=obsQuery.getCurrentResult();previousResult&&previousResult.loading===result.loading&&previousResult.networkStatus===result.networkStatus&&(0,lib.D)(previousResult.data,result.data)||_this.setResult(result)},onError=function(error){if(subscription.unsubscribe(),subscription=obsQuery.resubscribeAfterError(onNext,onError),!useQuery_hasOwnProperty.call(error,"graphQLErrors"))throw error;var previousResult=_this.result;(!previousResult||previousResult&&previousResult.loading||!(0,lib.D)(error,previousResult.error))&&_this.setResult({data:previousResult&&previousResult.data,error:error,loading:!1,networkStatus:networkStatus.Ie.error})},subscription=obsQuery.subscribe(onNext,onError);return function(){setTimeout((function(){return subscription.unsubscribe()})),_this.forceUpdate=function(){return _this.forceUpdateState()}}}),[obsQuery,this.renderPromises,this.client.disableNetworkFetches]),(function(){return _this.getCurrentResult()}),(function(){return _this.getCurrentResult()}));return this.unsafeHandlePartialRefetch(result),this.toQueryResult(result)},InternalState.prototype.useOptions=function(options){var _a,watchQueryOptions=this.createWatchQueryOptions(this.queryHookOptions=options),currentWatchQueryOptions=this.watchQueryOptions;(0,lib.D)(watchQueryOptions,currentWatchQueryOptions)||(this.watchQueryOptions=watchQueryOptions,currentWatchQueryOptions&&this.observable&&(this.observable.reobserve(this.getObsQueryOptions()),this.previousData=(null===(_a=this.result)||void 0===_a?void 0:_a.data)||this.previousData,this.result=void 0)),this.onCompleted=options.onCompleted||InternalState.prototype.onCompleted,this.onError=options.onError||InternalState.prototype.onError,!this.renderPromises&&!this.client.disableNetworkFetches||!1!==this.queryHookOptions.ssr||this.queryHookOptions.skip?this.queryHookOptions.skip||"standby"===this.watchQueryOptions.fetchPolicy?this.result=this.skipStandbyResult:this.result!==this.ssrDisabledResult&&this.result!==this.skipStandbyResult||(this.result=void 0):this.result=this.ssrDisabledResult},InternalState.prototype.getObsQueryOptions=function(){var toMerge=[],globalDefaults=this.client.defaultOptions.watchQuery;return globalDefaults&&toMerge.push(globalDefaults),this.queryHookOptions.defaultOptions&&toMerge.push(this.queryHookOptions.defaultOptions),toMerge.push((0,compact.o)(this.observable&&this.observable.options,this.watchQueryOptions)),toMerge.reduce(mergeOptions.J)},InternalState.prototype.createWatchQueryOptions=function(_a){var _b;void 0===_a&&(_a={});var skip=_a.skip,otherOptions=(_a.ssr,_a.onCompleted,_a.onError,_a.defaultOptions,(0,tslib_es6._T)(_a,["skip","ssr","onCompleted","onError","defaultOptions"])),watchQueryOptions=Object.assign(otherOptions,{query:this.query});if(!this.renderPromises||"network-only"!==watchQueryOptions.fetchPolicy&&"cache-and-network"!==watchQueryOptions.fetchPolicy||(watchQueryOptions.fetchPolicy="cache-first"),watchQueryOptions.variables||(watchQueryOptions.variables={}),skip){var _c=watchQueryOptions.fetchPolicy,fetchPolicy=void 0===_c?this.getDefaultFetchPolicy():_c,_d=watchQueryOptions.initialFetchPolicy,initialFetchPolicy=void 0===_d?fetchPolicy:_d;Object.assign(watchQueryOptions,{initialFetchPolicy:initialFetchPolicy,fetchPolicy:"standby"})}else watchQueryOptions.fetchPolicy||(watchQueryOptions.fetchPolicy=(null===(_b=this.observable)||void 0===_b?void 0:_b.options.initialFetchPolicy)||this.getDefaultFetchPolicy());return watchQueryOptions},InternalState.prototype.getDefaultFetchPolicy=function(){var _a,_b;return(null===(_a=this.queryHookOptions.defaultOptions)||void 0===_a?void 0:_a.fetchPolicy)||(null===(_b=this.client.defaultOptions.watchQuery)||void 0===_b?void 0:_b.fetchPolicy)||"cache-first"},InternalState.prototype.onCompleted=function(data){},InternalState.prototype.onError=function(error){},InternalState.prototype.useObservableQuery=function(){var obsQuery=this.observable=this.renderPromises&&this.renderPromises.getSSRObservable(this.watchQueryOptions)||this.observable||this.client.watchQuery(this.getObsQueryOptions());this.obsQueryFields=react.useMemo((function(){return{refetch:obsQuery.refetch.bind(obsQuery),reobserve:obsQuery.reobserve.bind(obsQuery),fetchMore:obsQuery.fetchMore.bind(obsQuery),updateQuery:obsQuery.updateQuery.bind(obsQuery),startPolling:obsQuery.startPolling.bind(obsQuery),stopPolling:obsQuery.stopPolling.bind(obsQuery),subscribeToMore:obsQuery.subscribeToMore.bind(obsQuery)}}),[obsQuery]);var ssrAllowed=!(!1===this.queryHookOptions.ssr||this.queryHookOptions.skip);return this.renderPromises&&ssrAllowed&&(this.renderPromises.registerSSRObservable(obsQuery),obsQuery.getCurrentResult().loading&&this.renderPromises.addObservableQueryPromise(obsQuery)),obsQuery},InternalState.prototype.setResult=function(nextResult){var previousResult=this.result;previousResult&&previousResult.data&&(this.previousData=previousResult.data),this.result=nextResult,this.forceUpdate(),this.handleErrorOrCompleted(nextResult,previousResult)},InternalState.prototype.handleErrorOrCompleted=function(result,previousResult){var _this=this;if(!result.loading){var error_1=this.toApolloError(result);Promise.resolve().then((function(){error_1?_this.onError(error_1):result.data&&(null==previousResult?void 0:previousResult.networkStatus)!==result.networkStatus&&result.networkStatus===networkStatus.Ie.ready&&_this.onCompleted(result.data)})).catch((function(error){!1!==globalThis.__DEV__&&globals.kG.warn(error)}))}},InternalState.prototype.toApolloError=function(result){return(0,arrays.O)(result.errors)?new errors.cA({graphQLErrors:result.errors}):result.error},InternalState.prototype.getCurrentResult=function(){return this.result||this.handleErrorOrCompleted(this.result=this.observable.getCurrentResult()),this.result},InternalState.prototype.toQueryResult=function(result){var queryResult=this.toQueryResultCache.get(result);if(queryResult)return queryResult;var data=result.data,resultWithoutPartial=(result.partial,(0,tslib_es6._T)(result,["data","partial"]));return this.toQueryResultCache.set(result,queryResult=(0,tslib_es6.pi)((0,tslib_es6.pi)((0,tslib_es6.pi)({data:data},resultWithoutPartial),this.obsQueryFields),{client:this.client,observable:this.observable,variables:this.observable.variables,called:!this.queryHookOptions.skip,previousData:this.previousData})),!queryResult.error&&(0,arrays.O)(result.errors)&&(queryResult.error=new errors.cA({graphQLErrors:result.errors})),queryResult},InternalState.prototype.unsafeHandlePartialRefetch=function(result){!result.partial||!this.queryHookOptions.partialRefetch||result.loading||result.data&&0!==Object.keys(result.data).length||"cache-only"===this.observable.options.fetchPolicy||(Object.assign(result,{loading:!0,networkStatus:networkStatus.Ie.refetch}),this.observable.refetch())},InternalState}()},"./node_modules/@fortawesome/react-fontawesome/index.es.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{G:function(){return FontAwesomeIcon}});var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@fortawesome/fontawesome-svg-core/index.mjs"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),console=__webpack_require__("./node_modules/console-browserify/index.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function _toConsumableArray(arr){return function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function camelize(string){return function _isNumerical(obj){return(obj-=0)==obj}(string)?string:(string=string.replace(/[\-_\s]+(.)?/g,(function(match,chr){return chr?chr.toUpperCase():""}))).substr(0,1).toLowerCase()+string.substr(1)}var _excluded=["style"];var PRODUCTION=!1;try{PRODUCTION=!0}catch(e){}function normalizeIconArgs(icon){return icon&&"object"===_typeof(icon)&&icon.prefix&&icon.iconName&&icon.icon?icon:_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__.Qc.icon?_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__.Qc.icon(icon):null===icon?null:icon&&"object"===_typeof(icon)&&icon.prefix&&icon.iconName?icon:Array.isArray(icon)&&2===icon.length?{prefix:icon[0],iconName:icon[1]}:"string"==typeof icon?{prefix:"fas",iconName:icon}:void 0}function objectWithKey(key,value){return Array.isArray(value)&&value.length>0||!Array.isArray(value)&&value?_defineProperty({},key,value):{}}var FontAwesomeIcon=react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((function(props,ref){var iconArgs=props.icon,maskArgs=props.mask,symbol=props.symbol,className=props.className,title=props.title,titleId=props.titleId,maskId=props.maskId,iconLookup=normalizeIconArgs(iconArgs),classes=objectWithKey("classes",[].concat(_toConsumableArray(function classList(props){var _classes,beat=props.beat,fade=props.fade,beatFade=props.beatFade,bounce=props.bounce,shake=props.shake,flash=props.flash,spin=props.spin,spinPulse=props.spinPulse,spinReverse=props.spinReverse,pulse=props.pulse,fixedWidth=props.fixedWidth,inverse=props.inverse,border=props.border,listItem=props.listItem,flip=props.flip,size=props.size,rotation=props.rotation,pull=props.pull,classes=(_defineProperty(_classes={"fa-beat":beat,"fa-fade":fade,"fa-beat-fade":beatFade,"fa-bounce":bounce,"fa-shake":shake,"fa-flash":flash,"fa-spin":spin,"fa-spin-reverse":spinReverse,"fa-spin-pulse":spinPulse,"fa-pulse":pulse,"fa-fw":fixedWidth,"fa-inverse":inverse,"fa-border":border,"fa-li":listItem,"fa-flip":!0===flip,"fa-flip-horizontal":"horizontal"===flip||"both"===flip,"fa-flip-vertical":"vertical"===flip||"both"===flip},"fa-".concat(size),null!=size),_defineProperty(_classes,"fa-rotate-".concat(rotation),null!=rotation&&0!==rotation),_defineProperty(_classes,"fa-pull-".concat(pull),null!=pull),_defineProperty(_classes,"fa-swap-opacity",props.swapOpacity),_classes);return Object.keys(classes).map((function(key){return classes[key]?key:null})).filter((function(key){return key}))}(props)),_toConsumableArray(className.split(" ")))),transform=objectWithKey("transform","string"==typeof props.transform?_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__.Qc.transform(props.transform):props.transform),mask=objectWithKey("mask",normalizeIconArgs(maskArgs)),renderedIcon=(0,_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__.qv)(iconLookup,_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({},classes),transform),mask),{},{symbol:symbol,title:title,titleId:titleId,maskId:maskId}));if(!renderedIcon)return function log(){var _console;!PRODUCTION&&console&&"function"==typeof console.error&&(_console=console).error.apply(_console,arguments)}("Could not find icon",iconLookup),null;var abstract=renderedIcon.abstract,extraProps={ref:ref};return Object.keys(props).forEach((function(key){FontAwesomeIcon.defaultProps.hasOwnProperty(key)||(extraProps[key]=props[key])})),convertCurry(abstract[0],extraProps)}));FontAwesomeIcon.displayName="FontAwesomeIcon",FontAwesomeIcon.propTypes={beat:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,border:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,beatFade:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,bounce:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,className:prop_types__WEBPACK_IMPORTED_MODULE_2___default().string,fade:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,flash:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,mask:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().object,prop_types__WEBPACK_IMPORTED_MODULE_2___default().array,prop_types__WEBPACK_IMPORTED_MODULE_2___default().string]),maskId:prop_types__WEBPACK_IMPORTED_MODULE_2___default().string,fixedWidth:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,inverse:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,flip:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOf([!0,!1,"horizontal","vertical","both"]),icon:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().object,prop_types__WEBPACK_IMPORTED_MODULE_2___default().array,prop_types__WEBPACK_IMPORTED_MODULE_2___default().string]),listItem:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,pull:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOf(["right","left"]),pulse:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,rotation:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOf([0,90,180,270]),shake:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,size:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,spinPulse:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,spinReverse:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,symbol:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,prop_types__WEBPACK_IMPORTED_MODULE_2___default().string]),title:prop_types__WEBPACK_IMPORTED_MODULE_2___default().string,titleId:prop_types__WEBPACK_IMPORTED_MODULE_2___default().string,transform:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().string,prop_types__WEBPACK_IMPORTED_MODULE_2___default().object]),swapOpacity:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool},FontAwesomeIcon.defaultProps={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1};var convertCurry=function convert(createElement,element){var extraProps=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"==typeof element)return element;var children=(element.children||[]).map((function(child){return convert(createElement,child)})),mixins=Object.keys(element.attributes||{}).reduce((function(acc,key){var val=element.attributes[key];switch(key){case"class":acc.attrs.className=val,delete element.attributes.class;break;case"style":acc.attrs.style=function styleToObject(style){return style.split(";").map((function(s){return s.trim()})).filter((function(s){return s})).reduce((function(acc,pair){var i=pair.indexOf(":"),prop=camelize(pair.slice(0,i)),value=pair.slice(i+1).trim();return prop.startsWith("webkit")?acc[function capitalize(val){return val.charAt(0).toUpperCase()+val.slice(1)}(prop)]=value:acc[prop]=value,acc}),{})}(val);break;default:0===key.indexOf("aria-")||0===key.indexOf("data-")?acc.attrs[key.toLowerCase()]=val:acc.attrs[camelize(key)]=val}return acc}),{attrs:{}}),_extraProps$style=extraProps.style,existingStyle=void 0===_extraProps$style?{}:_extraProps$style,remaining=_objectWithoutProperties(extraProps,_excluded);return mixins.attrs.style=_objectSpread2(_objectSpread2({},mixins.attrs.style),existingStyle),createElement.apply(void 0,[element.tag,_objectSpread2(_objectSpread2({},mixins.attrs),remaining)].concat(_toConsumableArray(children)))}.bind(null,react__WEBPACK_IMPORTED_MODULE_1__.createElement)}}]);