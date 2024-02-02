(self.webpackChunkussf_portal=self.webpackChunkussf_portal||[]).push([[3220],{"./src/operations/portal/mutations/addBookmark.g.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{z:function(){return useAddBookmarkMutation}});var _home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),_apollo_client__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/graphql-tag/lib/index.js"),_apollo_client__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@apollo/client/react/hooks/useMutation.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const defaultOptions={},AddBookmarkDocument=_apollo_client__WEBPACK_IMPORTED_MODULE_1__.Ps`
    mutation addBookmark($url: String!, $label: String, $collectionId: OID!, $cmsId: ID) {
  addBookmark(
    url: $url
    label: $label
    collectionId: $collectionId
    cmsId: $cmsId
  ) {
    _id
    url
    label
    cmsId
  }
}
    `;function useAddBookmarkMutation(baseOptions){const options=_objectSpread(_objectSpread({},defaultOptions),baseOptions);return _apollo_client__WEBPACK_IMPORTED_MODULE_2__.D(AddBookmarkDocument,options)}},"./src/operations/portal/mutations/removeBookmark.g.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{I:function(){return useRemoveBookmarkMutation}});var _home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),_apollo_client__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/graphql-tag/lib/index.js"),_apollo_client__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@apollo/client/react/hooks/useMutation.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const defaultOptions={},RemoveBookmarkDocument=_apollo_client__WEBPACK_IMPORTED_MODULE_1__.Ps`
    mutation removeBookmark($_id: OID!, $collectionId: OID!, $cmsId: ID) {
  removeBookmark(_id: $_id, collectionId: $collectionId, cmsId: $cmsId) {
    _id
  }
}
    `;function useRemoveBookmarkMutation(baseOptions){const options=_objectSpread(_objectSpread({},defaultOptions),baseOptions);return _apollo_client__WEBPACK_IMPORTED_MODULE_2__.D(RemoveBookmarkDocument,options)}},"./src/operations/portal/mutations/removeCollection.g.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{S:function(){return useRemoveCollectionMutation}});var _home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),_apollo_client__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/graphql-tag/lib/index.js"),_apollo_client__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@apollo/client/react/hooks/useMutation.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const defaultOptions={},RemoveCollectionDocument=_apollo_client__WEBPACK_IMPORTED_MODULE_1__.Ps`
    mutation removeCollection($_id: OID!) {
  removeCollection(_id: $_id) {
    _id
  }
}
    `;function useRemoveCollectionMutation(baseOptions){const options=_objectSpread(_objectSpread({},defaultOptions),baseOptions);return _apollo_client__WEBPACK_IMPORTED_MODULE_2__.D(RemoveCollectionDocument,options)}},"./src/stores/analyticsContext.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{z$:function(){return useAnalytics}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),next_router__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/router.js"),console=__webpack_require__("./node_modules/console-browserify/index.js"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const AnalyticsContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({push:()=>{},setUserIdFn:()=>{},unsetUserIdFn:()=>{},trackEvent:()=>{},trackBaseLocation:()=>{},trackRank:()=>{}}),AnalyticsProvider=({children:children,debug:debug=!1})=>{const router=(0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();let previousPath="";const push=args=>{if(!window)return void console.warn("ANALYTICS: Cannot call push from server side code");const windowWithAnalytics=window;windowWithAnalytics._paq||(windowWithAnalytics._paq=[]),!0===debug&&console.debug("ANALYTICS:",...args),windowWithAnalytics._paq.push(args)},handleRouteChange=url=>{previousPath&&push(["setReferrerUrl",previousPath]),push(["setCustomUrl",url]),push(["setDocumentTitle",document.title]),push(["trackPageView"]),push(["enableLinkTracking"]),previousPath=url};(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{(async()=>{const{analyticsUrl:analyticsUrl,analyticsSiteId:analyticsSiteId}=await fetch("/api/sysinfo").then((resp=>resp.json()));if(!analyticsUrl)return void console.warn("ANALYTICS: No Matomo URL provided");if(!analyticsSiteId)return void console.warn("ANALYTICS: No Site ID provided");previousPath=location.href,push(["setDocumentTitle",document.title]),push(["setDoNotTrack",!1]),push(["trackPageView"]),push(["enableLinkTracking"]),push(["setTrackerUrl",`${analyticsUrl}/matomo.php`]),push(["setSiteId",analyticsSiteId]);const scriptEl=document.createElement("script"),refElement=document.getElementsByTagName("script")[0];scriptEl.type="text/javascript",scriptEl.async=!0,scriptEl.defer=!0,scriptEl.src=`${analyticsUrl}/matomo.js`,refElement.parentNode&&refElement.parentNode.insertBefore(scriptEl,refElement),previousPath=location.pathname,router.events.on("routeChangeStart",handleRouteChange)})()}),[]);const context={push:push,setUserIdFn:userId=>{!0===debug&&console.debug("ANALYTICS(setUserId):",userId),push(["setUserId",userId])},unsetUserIdFn:()=>{!0===debug&&console.debug("ANALYTICS(unsetUserId)"),push(["resetUserId"]),push(["appendToTrackingUrl","new_visit=1"]),push(["trackPageView"]),push(["appendToTrackingUrl",""])},trackEvent:(category,action,name,value)=>{const pushParams=["trackEvent",category,action];void 0!==name&&(pushParams.push(name),void 0!==value&&pushParams.push(value)),push(pushParams)},trackBaseLocation:baseLocation=>{!0===debug&&console.debug("ANALYTICS(trackBaseLocation):",baseLocation),push(["setCustomDimension",1,baseLocation]),push(["trackPageView"])},trackRank:rank=>{!0===debug&&console.debug("ANALYTICS(trackRank):",rank),push(["setCustomDimension",2,rank]),push(["trackPageView"])}};return __jsx(AnalyticsContext.Provider,{value:context},children)};AnalyticsProvider.displayName="AnalyticsProvider";const useAnalytics=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(AnalyticsContext);if(void 0===context)throw new Error("useAnalytics must be used within an AnalyticsContextProvider");return context};AnalyticsProvider.__docgenInfo={description:"",methods:[],displayName:"AnalyticsProvider",props:{debug:{defaultValue:{value:"process.env.NODE_ENV === 'development'",computed:!1},required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};try{AnalyticsProvider.displayName="AnalyticsProvider",AnalyticsProvider.__docgenInfo={description:"",displayName:"AnalyticsProvider",props:{debug:{defaultValue:{value:"process.env.NODE_ENV === 'development'"},description:"",name:"debug",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stores/analyticsContext.tsx#AnalyticsProvider"]={docgenInfo:AnalyticsProvider.__docgenInfo,name:"AnalyticsProvider",path:"src/stores/analyticsContext.tsx#AnalyticsProvider"})}catch(__react_docgen_typescript_loader_error){}},"./src/stores/modalContext.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{DY:function(){return ModalProvider},vR:function(){return useModalContext}});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),analyticsContext=__webpack_require__("./src/stores/analyticsContext.tsx"),addBookmark_g=__webpack_require__("./src/operations/portal/mutations/addBookmark.g.ts"),removeCollection_g=__webpack_require__("./src/operations/portal/mutations/removeCollection.g.ts"),defineProperty=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),lib=__webpack_require__("./node_modules/graphql-tag/lib/index.js"),useMutation=__webpack_require__("./node_modules/@apollo/client/react/hooks/useMutation.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const defaultOptions={},RemoveWidgetDocument=lib.Ps`
    mutation removeWidget($_id: OID!) {
  removeWidget(_id: $_id) {
    _id
  }
}
    `;var removeBookmark_g=__webpack_require__("./src/operations/portal/mutations/removeBookmark.g.ts");function editBookmark_g_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function editBookmark_g_objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?editBookmark_g_ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):editBookmark_g_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const editBookmark_g_defaultOptions={},EditBookmarkDocument=lib.Ps`
    mutation editBookmark($_id: OID!, $collectionId: OID!, $label: String, $url: String) {
  editBookmark(_id: $_id, collectionId: $collectionId, label: $label, url: $url) {
    _id
    label
    url
  }
}
    `;var __jsx=react.createElement;const ModalContext=(0,react.createContext)({modalId:"",updateModalId:()=>{},modalRef:null,modalHeadingText:"",closeModal:()=>{},onDelete:()=>{},onSave:()=>{},updateWidget:()=>{},updateBookmark:()=>{},updateCustomLinkLabel:()=>{},updateModalText:()=>{},additionalText:"",isAddingLinkContext:!1}),ModalProvider=({children:children})=>{const{0:modalHeadingText,1:setModalHeadingText}=(0,react.useState)(""),{0:additionalText,1:setAdditionalText}=(0,react.useState)(""),{0:modalId,1:setModalId}=(0,react.useState)(""),{0:customLinkLabel,1:setCustomLinkLabel}=(0,react.useState)(""),{0:showAddWarning,1:setShowAddWarning}=(0,react.useState)(!1),{0:widgetState,1:setWidgetState}=(0,react.useState)(),{0:bookmark,1:setBookmark}=(0,react.useState)(),{0:isAddingLinkContext,1:setIsAddingLinkContext}=(0,react.useState)(!1),modalRef=(0,react.useRef)(null),{trackEvent:trackEvent}=(0,analyticsContext.z$)(),[handleAddBookmark]=(0,addBookmark_g.z)(),[handleRemoveCollection]=(0,removeCollection_g.S)(),[handleRemoveWidget]=function useRemoveWidgetMutation(baseOptions){const options=_objectSpread(_objectSpread({},defaultOptions),baseOptions);return useMutation.D(RemoveWidgetDocument,options)}(),[handleRemoveBookmark]=(0,removeBookmark_g.I)(),[handleEditBookmark]=function useEditBookmarkMutation(baseOptions){const options=editBookmark_g_objectSpread(editBookmark_g_objectSpread({},editBookmark_g_defaultOptions),baseOptions);return useMutation.D(EditBookmarkDocument,options)}(),closeModal=()=>{setWidgetState(null),setBookmark(null),setCustomLinkLabel(""),setModalId(""),isAddingLinkContext&&setIsAddingLinkContext(!1),modalRef.current?.toggleModal(void 0,!1)},context={modalId:"",updateModalId:modalId=>{setModalId(modalId)},modalRef:modalRef,modalHeadingText:modalHeadingText,closeModal:closeModal,onDelete:()=>{switch(modalId){case"removeWeatherWidgetModal":trackEvent("Section settings","Remove this section","Weather"),handleRemoveWidget({variables:{_id:widgetState?._id},refetchQueries:["getUser"]}),closeModal();break;case"removeNewsWidgetModal":trackEvent("Section settings","Remove this section","News"),handleRemoveWidget({variables:{_id:widgetState?._id},refetchQueries:["getUser"]}),closeModal();break;case"removeGuardianIdealWidgetModal":trackEvent("Guardian Ideal Carousel","Click on remove Ideal carousel","Remove Ideal"),handleRemoveWidget({variables:{_id:widgetState?._id},refetchQueries:["getUser"]}),closeModal();break;case"removeFeaturedShortcutsWidgetModal":trackEvent("Featured Shortcuts Section","Click on remove Featured Shortcuts","Remove Featured Shortcuts"),handleRemoveWidget({variables:{_id:widgetState?._id},refetchQueries:["getUser"]}),closeModal();break;case"removeCustomCollectionModal":trackEvent("Collection settings","Delete collection",widgetState?.title),handleRemoveCollection({variables:{_id:widgetState?._id},refetchQueries:["getUser"]}),closeModal();break;case"editCustomLinkModal":handleRemoveBookmark({variables:{_id:bookmark?._id,collectionId:widgetState?._id},refetchQueries:["getUser"]}),closeModal();break;default:return null}},updateWidget:widget=>{setWidgetState(widget)},updateModalText:({headingText:headingText,descriptionText:descriptionText=""})=>{setModalHeadingText(headingText),setAdditionalText(descriptionText)},additionalText:additionalText,customLinkLabel:customLinkLabel,updateCustomLinkLabel:(customLinkLabel,showAddWarning=!1,isAddingLink=!1)=>{setCustomLinkLabel(customLinkLabel),setShowAddWarning(showAddWarning),setIsAddingLinkContext(isAddingLink)},showAddWarning:showAddWarning,isAddingLinkContext:isAddingLinkContext,onSave:"addCustomLinkModal"===modalId?(url,label)=>{trackEvent("Add link","Save custom link",`${widgetState?.title} / ${label} / ${url}`),handleAddBookmark({variables:{collectionId:widgetState?._id,url:url,label:label},refetchQueries:["getUser"]}),closeModal()}:(url,label)=>{handleEditBookmark({variables:{_id:bookmark?._id,collectionId:widgetState?._id,url:url,label:label},refetchQueries:["getUser"]}),closeModal()},bookmark:bookmark,updateBookmark:bookmark=>{setBookmark(bookmark)}};return __jsx(ModalContext.Provider,{value:context},children)};ModalProvider.displayName="ModalProvider";const useModalContext=()=>(0,react.useContext)(ModalContext);ModalProvider.__docgenInfo={description:"",methods:[],displayName:"ModalProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};try{ModalProvider.displayName="ModalProvider",ModalProvider.__docgenInfo={description:"",displayName:"ModalProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stores/modalContext.tsx#ModalProvider"]={docgenInfo:ModalProvider.__docgenInfo,name:"ModalProvider",path:"src/stores/modalContext.tsx#ModalProvider"})}catch(__react_docgen_typescript_loader_error){}},"?c969":function(){},"?ed1b":function(){},"?d17e":function(){}}]);
//# sourceMappingURL=3220.fbf22b63.iframe.bundle.js.map