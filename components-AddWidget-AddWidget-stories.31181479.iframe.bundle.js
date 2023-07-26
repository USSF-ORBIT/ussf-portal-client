"use strict";(self.webpackChunkussf_portal=self.webpackChunkussf_portal||[]).push([[5888],{"./src/components/AddWidget/AddWidget.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AddCollectionDisabled:function(){return AddCollectionDisabled},DefaultAddWidget:function(){return DefaultAddWidget},NewsWidgetDisabled:function(){return NewsWidgetDisabled}});var _home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_stores_myspaceContext__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/stores/myspaceContext.tsx"),_AddWidget__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/AddWidget/AddWidget.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const mockMySpaceContext={mySpace:[],disableDragAndDrop:!1,setDisableDragAndDrop:()=>{},initializeMySpace:()=>{},isCollection:()=>!0,isGuardianIdeal:()=>!0,isNewsWidget:()=>!0,isFeaturedShortcuts:()=>!0,canAddCollections:!0,canAddNews:!0,canAddGuardianIdeal:!0,canAddFeaturedShortcuts:!0,addNewsWidget:()=>{},addGuardianIdeal:()=>{},addFeaturedShortcuts:()=>{},addNewCollection:()=>{},handleOnDragEnd:()=>{}},MockContextProvider=({children:children,mockValue:mockValue})=>__jsx(_stores_myspaceContext__WEBPACK_IMPORTED_MODULE_2__.Kr.Provider,{value:mockValue},children);MockContextProvider.displayName="MockContextProvider",__webpack_exports__.default={title:"Base/AddWidget",component:_AddWidget__WEBPACK_IMPORTED_MODULE_3__.Z,argTypes:{handleSelectCollection:{action:"Select collection from template"},handleCreateCollection:{action:"Create new collection"}}};const DefaultAddWidget=argTypes=>__jsx(_AddWidget__WEBPACK_IMPORTED_MODULE_3__.Z,{handleSelectCollection:argTypes.handleSelectCollection,handleCreateCollection:argTypes.handleCreateCollection});DefaultAddWidget.displayName="DefaultAddWidget";const AddCollectionDisabled=argTypes=>__jsx(MockContextProvider,{mockValue:_objectSpread(_objectSpread({},mockMySpaceContext),{},{canAddCollections:!1})},__jsx(_AddWidget__WEBPACK_IMPORTED_MODULE_3__.Z,{handleSelectCollection:argTypes.handleSelectCollection,handleCreateCollection:argTypes.handleCreateCollection}));AddCollectionDisabled.displayName="AddCollectionDisabled";const NewsWidgetDisabled=argTypes=>__jsx(MockContextProvider,{mockValue:_objectSpread(_objectSpread({},mockMySpaceContext),{},{canAddNews:!1})},__jsx(_AddWidget__WEBPACK_IMPORTED_MODULE_3__.Z,{handleSelectCollection:argTypes.handleSelectCollection,handleCreateCollection:argTypes.handleCreateCollection}));NewsWidgetDisabled.displayName="NewsWidgetDisabled",DefaultAddWidget.parameters=_objectSpread(_objectSpread({},DefaultAddWidget.parameters),{},{docs:_objectSpread(_objectSpread({},DefaultAddWidget.parameters?.docs),{},{source:_objectSpread({originalSource:"(argTypes: StorybookArgTypes) => <AddWidget handleSelectCollection={argTypes.handleSelectCollection} handleCreateCollection={argTypes.handleCreateCollection} />"},DefaultAddWidget.parameters?.docs?.source)})}),AddCollectionDisabled.parameters=_objectSpread(_objectSpread({},AddCollectionDisabled.parameters),{},{docs:_objectSpread(_objectSpread({},AddCollectionDisabled.parameters?.docs),{},{source:_objectSpread({originalSource:"(argTypes: StorybookArgTypes) => <MockContextProvider mockValue={{\n  ...mockMySpaceContext,\n  canAddCollections: false\n}}>\n    <AddWidget handleSelectCollection={argTypes.handleSelectCollection} handleCreateCollection={argTypes.handleCreateCollection} />\n  </MockContextProvider>"},AddCollectionDisabled.parameters?.docs?.source)})}),NewsWidgetDisabled.parameters=_objectSpread(_objectSpread({},NewsWidgetDisabled.parameters),{},{docs:_objectSpread(_objectSpread({},NewsWidgetDisabled.parameters?.docs),{},{source:_objectSpread({originalSource:"(argTypes: StorybookArgTypes) => <MockContextProvider mockValue={{\n  ...mockMySpaceContext,\n  canAddNews: false\n}}>\n    <AddWidget handleSelectCollection={argTypes.handleSelectCollection} handleCreateCollection={argTypes.handleCreateCollection} />\n  </MockContextProvider>"},NewsWidgetDisabled.parameters?.docs?.source)})}),DefaultAddWidget.__docgenInfo={description:"",methods:[],displayName:"DefaultAddWidget",props:{handleSelectCollection:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},handleCreateCollection:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}},AddCollectionDisabled.__docgenInfo={description:"",methods:[],displayName:"AddCollectionDisabled",props:{handleSelectCollection:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},handleCreateCollection:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}},NewsWidgetDisabled.__docgenInfo={description:"",methods:[],displayName:"NewsWidgetDisabled",props:{handleSelectCollection:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},handleCreateCollection:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};try{DefaultAddWidget.displayName="DefaultAddWidget",DefaultAddWidget.__docgenInfo={description:"",displayName:"DefaultAddWidget",props:{handleSelectCollection:{defaultValue:null,description:"",name:"handleSelectCollection",required:!0,type:{name:"() => void"}},handleCreateCollection:{defaultValue:null,description:"",name:"handleCreateCollection",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/AddWidget/AddWidget.stories.tsx#DefaultAddWidget"]={docgenInfo:DefaultAddWidget.__docgenInfo,name:"DefaultAddWidget",path:"src/components/AddWidget/AddWidget.stories.tsx#DefaultAddWidget"})}catch(__react_docgen_typescript_loader_error){}try{AddCollectionDisabled.displayName="AddCollectionDisabled",AddCollectionDisabled.__docgenInfo={description:"",displayName:"AddCollectionDisabled",props:{handleSelectCollection:{defaultValue:null,description:"",name:"handleSelectCollection",required:!0,type:{name:"() => void"}},handleCreateCollection:{defaultValue:null,description:"",name:"handleCreateCollection",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/AddWidget/AddWidget.stories.tsx#AddCollectionDisabled"]={docgenInfo:AddCollectionDisabled.__docgenInfo,name:"AddCollectionDisabled",path:"src/components/AddWidget/AddWidget.stories.tsx#AddCollectionDisabled"})}catch(__react_docgen_typescript_loader_error){}try{NewsWidgetDisabled.displayName="NewsWidgetDisabled",NewsWidgetDisabled.__docgenInfo={description:"",displayName:"NewsWidgetDisabled",props:{handleSelectCollection:{defaultValue:null,description:"",name:"handleSelectCollection",required:!0,type:{name:"() => void"}},handleCreateCollection:{defaultValue:null,description:"",name:"handleCreateCollection",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/AddWidget/AddWidget.stories.tsx#NewsWidgetDisabled"]={docgenInfo:NewsWidgetDisabled.__docgenInfo,name:"NewsWidgetDisabled",path:"src/components/AddWidget/AddWidget.stories.tsx#NewsWidgetDisabled"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/index.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{VY:function(){return CONTENT_CATEGORIES},_p:function(){return MAXIMUM_COLLECTIONS},hg:function(){return WIDGET_TYPES},yp:function(){return SPACEFORCE_NEWS_RSS_URL}});const SPACEFORCE_NEWS_RSS_URL="https://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=1060",WIDGET_TYPES={COLLECTION:"Collection",NEWS:"News",GUARDIANIDEAL:"GuardianIdeal",FEATUREDSHORTCUTS:"FeaturedShortcuts"},MAXIMUM_COLLECTIONS=(WIDGET_TYPES.GUARDIANIDEAL,WIDGET_TYPES.FEATUREDSHORTCUTS,25),CONTENT_CATEGORIES={EXTERNAL_NEWS:{value:"ExternalNews",label:"External USSF News"},INTERNAL_NEWS:{value:"InternalNews",label:"Internal USSF News"},NEWS:{value:"News",label:"USSF News"},ANNOUNCEMENT:{value:"Announcement",label:"Announcement"},DOCUMENTATION:{value:"Documentation",label:"USSF Documentation"},APPLICATION:{value:"Application",label:"Application"},GUARDIANIDEAL:{value:"GuardianIdeal",label:"Guardian Ideal"},FEATUREDSHORTCUTS:{value:"FeaturedShortcuts",label:"FeaturedShortcuts"}}},"./src/stores/analyticsContext.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{z$:function(){return useAnalytics}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),next_router__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/router.js"),console=__webpack_require__("./node_modules/console-browserify/index.js"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const AnalyticsContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({push:()=>{},trackEvent:()=>{}}),AnalyticsProvider=({children:children,debug:debug=!1})=>{const router=(0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();let previousPath="";const push=args=>{if(!window)return void console.warn("ANALYTICS: Cannot call push from server side code");const windowWithAnalytics=window;windowWithAnalytics._paq||(windowWithAnalytics._paq=[]),!0===debug&&console.debug("ANALYTICS:",...args),windowWithAnalytics._paq.push(args)},handleRouteChange=url=>{previousPath&&push(["setReferrerUrl",previousPath]),push(["setCustomUrl",url]),push(["setDocumentTitle",document.title]),push(["trackPageView"]),push(["enableLinkTracking"]),previousPath=url};(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{(async()=>{const{analyticsUrl:analyticsUrl,analyticsSiteId:analyticsSiteId}=await fetch("/api/sysinfo").then((resp=>resp.json()));if(!analyticsUrl)return void console.warn("ANALYTICS: No Matomo URL provided");if(!analyticsSiteId)return void console.warn("ANALYTICS: No Site ID provided");previousPath=location.href,push(["setDocumentTitle",document.title]),push(["setDoNotTrack",!0]),push(["trackPageView"]),push(["enableLinkTracking"]),push(["setTrackerUrl",`${analyticsUrl}/matomo.php`]),push(["setSiteId",analyticsSiteId]);const scriptEl=document.createElement("script"),refElement=document.getElementsByTagName("script")[0];scriptEl.type="text/javascript",scriptEl.async=!0,scriptEl.defer=!0,scriptEl.src=`${analyticsUrl}/matomo.js`,refElement.parentNode&&refElement.parentNode.insertBefore(scriptEl,refElement),previousPath=location.pathname,router.events.on("routeChangeStart",handleRouteChange)})()}),[]);const context={push:push,trackEvent:(category,action,name,value)=>{const pushParams=["trackEvent",category,action];void 0!==name&&(pushParams.push(name),void 0!==value&&pushParams.push(value)),push(pushParams)}};return __jsx(AnalyticsContext.Provider,{value:context},children)};AnalyticsProvider.displayName="AnalyticsProvider";const useAnalytics=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(AnalyticsContext);if(void 0===context)throw new Error("useAnalytics must be used within an AnalyticsContextProvider");return context};AnalyticsProvider.__docgenInfo={description:"",methods:[],displayName:"AnalyticsProvider",props:{debug:{defaultValue:{value:"process.env.NODE_ENV === 'development'",computed:!1},required:!1,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};try{AnalyticsProvider.displayName="AnalyticsProvider",AnalyticsProvider.__docgenInfo={description:"",displayName:"AnalyticsProvider",props:{debug:{defaultValue:{value:"process.env.NODE_ENV === 'development'"},description:"",name:"debug",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stores/analyticsContext.tsx#AnalyticsProvider"]={docgenInfo:AnalyticsProvider.__docgenInfo,name:"AnalyticsProvider",path:"src/stores/analyticsContext.tsx#AnalyticsProvider"})}catch(__react_docgen_typescript_loader_error){}},"./src/stores/myspaceContext.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kr:function(){return MySpaceContext},Iw:function(){return useMySpaceContext}});var defineProperty=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/react/index.js"),sortable_esm=__webpack_require__("./node_modules/@dnd-kit/sortable/dist/sortable.esm.js");let WidgetType=function(WidgetType){return WidgetType.Collection="Collection",WidgetType.FeaturedShortcuts="FeaturedShortcuts",WidgetType.GuardianIdeal="GuardianIdeal",WidgetType.News="News",WidgetType}({});var analyticsContext=__webpack_require__("./src/stores/analyticsContext.tsx"),constants=__webpack_require__("./src/constants/index.ts"),lib=__webpack_require__("./node_modules/graphql-tag/lib/index.js"),useMutation=__webpack_require__("./node_modules/@apollo/client/react/hooks/useMutation.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const defaultOptions={},AddCollectionDocument=lib.Ps`
    mutation addCollection($title: String!, $bookmarks: [BookmarkInput!]!) {
  addCollection(title: $title, bookmarks: $bookmarks) {
    _id
    title
    bookmarks {
      _id
      url
      label
      cmsId
    }
  }
}
    `;function addWidget_g_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function addWidget_g_objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?addWidget_g_ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):addWidget_g_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const addWidget_g_defaultOptions={},AddWidgetDocument=lib.Ps`
    mutation addWidget($title: String!, $type: WidgetType!) {
  addWidget(title: $title, type: $type) {
    _id
    title
    type
  }
}
    `;function editMySpace_g_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function editMySpace_g_objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?editMySpace_g_ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):editMySpace_g_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const editMySpace_g_defaultOptions={},EditMySpaceDocument=lib.Ps`
    mutation editMySpace($mySpace: [WidgetReorderInput!]!) {
  editMySpace(mySpace: $mySpace) {
    mySpace {
      _id
      title
      type
      ... on Collection {
        bookmarks {
          _id
          url
          label
          cmsId
          isRemoved
        }
      }
    }
  }
}
    `;var __jsx=react.createElement;function myspaceContext_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function myspaceContext_objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?myspaceContext_ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):myspaceContext_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const MySpaceContext=(0,react.createContext)({mySpace:[],disableDragAndDrop:!1,setDisableDragAndDrop:()=>{},initializeMySpace:()=>{},isCollection:()=>!0,isGuardianIdeal:()=>!0,isNewsWidget:()=>!0,isFeaturedShortcuts:()=>!0,canAddCollections:!0,canAddNews:!0,canAddGuardianIdeal:!0,canAddFeaturedShortcuts:!0,addNewsWidget:()=>{},addGuardianIdeal:()=>{},addFeaturedShortcuts:()=>{},addNewCollection:()=>{},handleOnDragEnd:()=>{}}),MySpaceProvider=({children:children})=>{const{0:mySpace,1:setMySpace}=(0,react.useState)([]),{0:disableDragAndDrop,1:setDisableDragAndDrop}=(0,react.useState)(!1),{trackEvent:trackEvent}=(0,analyticsContext.z$)(),[handleAddCollection]=function useAddCollectionMutation(baseOptions){const options=_objectSpread(_objectSpread({},defaultOptions),baseOptions);return useMutation.D(AddCollectionDocument,options)}(),[handleAddWidget]=function useAddWidgetMutation(baseOptions){const options=addWidget_g_objectSpread(addWidget_g_objectSpread({},addWidget_g_defaultOptions),baseOptions);return useMutation.D(AddWidgetDocument,options)}(),[handleEditMySpace]=function useEditMySpaceMutation(baseOptions){const options=editMySpace_g_objectSpread(editMySpace_g_objectSpread({},editMySpace_g_defaultOptions),baseOptions);return useMutation.D(EditMySpaceDocument,options)}();function isCollection(widget){return widget.type===constants.hg.COLLECTION}const canAddCollections=mySpace&&mySpace.filter((w=>isCollection(w))).length<constants._p,canAddNews=mySpace&&mySpace.filter((w=>w.type===constants.hg.NEWS)).length<1,canAddGuardianIdeal=mySpace&&mySpace.filter((w=>w.type===constants.hg.GUARDIANIDEAL)).length<1,canAddFeaturedShortcuts=mySpace&&mySpace.filter((w=>w.type===constants.hg.FEATUREDSHORTCUTS)).length<1,context={mySpace:mySpace,disableDragAndDrop:disableDragAndDrop,setDisableDragAndDrop:setDisableDragAndDrop,initializeMySpace:mySpace=>{setMySpace(mySpace.map((w=>myspaceContext_objectSpread(myspaceContext_objectSpread({},w),{},{id:w._id.toString()}))))},isCollection:isCollection,isGuardianIdeal:function isGuardianIdeal(widget){return widget.type===constants.hg.GUARDIANIDEAL},isNewsWidget:function isNewsWidget(widget){return widget.type===constants.hg.NEWS},isFeaturedShortcuts:function isFeaturedShortcuts(widget){return widget.type===constants.hg.FEATUREDSHORTCUTS},canAddCollections:canAddCollections,canAddNews:canAddNews,canAddGuardianIdeal:canAddGuardianIdeal,canAddFeaturedShortcuts:canAddFeaturedShortcuts,addNewsWidget:()=>{trackEvent("Add section","Add news"),handleAddWidget({variables:{title:"Recent news",type:WidgetType.News},refetchQueries:["getUser"]})},addGuardianIdeal:()=>{trackEvent("Guardian Ideal Carousel","Click on add Ideal carousel","Add Ideal"),handleAddWidget({variables:{title:"Guardian Ideal",type:WidgetType.GuardianIdeal},refetchQueries:["getUser"]})},addFeaturedShortcuts:()=>{trackEvent("Featured Shortcuts","Click on add Featured Shortcuts","Add Featured Shortcuts"),handleAddWidget({variables:{title:"Featured Shortcuts",type:WidgetType.FeaturedShortcuts},refetchQueries:["getUser"]})},addNewCollection:()=>{trackEvent("Add section","Create new collection"),handleAddCollection({variables:{title:"",bookmarks:[]},refetchQueries:["getUser"]})},handleOnDragEnd:async event=>{const{active:active,over:over}=event;if(over&&active.id!==over.id){const oldIndex=mySpace.findIndex((w=>w._id.toString()===active.id)),newIndex=mySpace.findIndex((w=>w._id.toString()===over.id)),sortedWidgets=(0,sortable_esm.Rp)(mySpace,oldIndex,newIndex);setMySpace(sortedWidgets);const updatedMySpace=sortedWidgets.map((({_id:_id,title:title,type:type,bookmarks:bookmarks})=>{const updatedBookmarks=bookmarks?.map((({_id:_id,url:url,label:label,cmsId:cmsId,isRemoved:isRemoved})=>({_id:_id,url:url,label:label,cmsId:cmsId,isRemoved:isRemoved})));return{_id:_id,title:title,type:type,bookmarks:updatedBookmarks}}));handleEditMySpace({variables:{mySpace:updatedMySpace}})}}};return __jsx(MySpaceContext.Provider,{value:context},children)};MySpaceProvider.displayName="MySpaceProvider";const useMySpaceContext=()=>{const context=(0,react.useContext)(MySpaceContext);if(void 0===context)throw new Error("useMySpaceContext must be used within a MySpaceProvider");return context};MySpaceProvider.__docgenInfo={description:"",methods:[],displayName:"MySpaceProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};try{MySpaceProvider.displayName="MySpaceProvider",MySpaceProvider.__docgenInfo={description:"",displayName:"MySpaceProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stores/myspaceContext.tsx#MySpaceProvider"]={docgenInfo:MySpaceProvider.__docgenInfo,name:"MySpaceProvider",path:"src/stores/myspaceContext.tsx#MySpaceProvider"})}catch(__react_docgen_typescript_loader_error){}}}]);