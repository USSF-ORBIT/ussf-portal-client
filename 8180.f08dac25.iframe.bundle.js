"use strict";(self.webpackChunkussf_portal=self.webpackChunkussf_portal||[]).push([[8180],{"./src/stores/myspaceContext.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Kr:function(){return MySpaceContext},Iw:function(){return useMySpaceContext}});var defineProperty=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),sortable_esm=__webpack_require__("./node_modules/@dnd-kit/sortable/dist/sortable.esm.js");let WidgetType=function(WidgetType){return WidgetType.Collection="Collection",WidgetType.FeaturedShortcuts="FeaturedShortcuts",WidgetType.GuardianIdeal="GuardianIdeal",WidgetType.News="News",WidgetType.Weather="Weather",WidgetType}({});var analyticsContext=__webpack_require__("./src/stores/analyticsContext.tsx"),constants=__webpack_require__("./src/constants/index.ts"),lib=__webpack_require__("./node_modules/graphql-tag/lib/index.js"),useMutation=__webpack_require__("./node_modules/@apollo/client/react/hooks/useMutation.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const defaultOptions={},AddCollectionDocument=lib.Ps`
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
      ... on WeatherWidget {
        coords {
          lat
          long
          forecastUrl
          hourlyForecastUrl
          city
          state
          zipcode
        }
      }
    }
  }
}
    `;function addWeatherWidget_g_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function addWeatherWidget_g_objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?addWeatherWidget_g_ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):addWeatherWidget_g_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const addWeatherWidget_g_defaultOptions={},AddWeatherWidgetDocument=lib.Ps`
    mutation addWeatherWidget($title: String!, $type: WidgetType!, $zipcode: String!) {
  addWeatherWidget(title: $title, type: $type, zipcode: $zipcode) {
    _id
    title
    type
    coords {
      lat
      long
      forecastUrl
      hourlyForecastUrl
      city
      state
      zipcode
    }
  }
}
    `;function editWeatherWidget_g_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function editWeatherWidget_g_objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?editWeatherWidget_g_ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):editWeatherWidget_g_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const editWeatherWidget_g_defaultOptions={},EditWeatherWidgetDocument=lib.Ps`
    mutation editWeatherWidget($_id: OID!, $zipcode: String!) {
  editWeatherWidget(_id: $_id, zipcode: $zipcode) {
    _id
    title
    coords {
      lat
      long
      forecastUrl
      hourlyForecastUrl
      city
      state
      zipcode
    }
  }
}
    `;var __jsx=react.createElement;function myspaceContext_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function myspaceContext_objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?myspaceContext_ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):myspaceContext_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const MySpaceContext=(0,react.createContext)({mySpace:[],disableDragAndDrop:!1,setDisableDragAndDrop:()=>{},isAddingWidget:!1,setIsAddingWidget:()=>{},initializeMySpace:()=>{},isCollection:()=>!0,isGuardianIdeal:()=>!0,isNewsWidget:()=>!0,isFeaturedShortcuts:()=>!0,isWeather:()=>!0,canAddCollections:!0,canAddNews:!0,canAddWeather:!0,canAddGuardianIdeal:!0,canAddFeaturedShortcuts:!0,addNewsWidget:()=>{},addGuardianIdeal:()=>{},addFeaturedShortcuts:()=>{},addNewCollection:()=>{},addNewWeatherWidget:()=>{},editWeatherWidget:()=>{},handleOnDragEnd:()=>{},temporaryWidget:"",setTemporaryWidget:()=>{}}),MySpaceProvider=({children:children})=>{const{0:mySpace,1:setMySpace}=(0,react.useState)([]),{0:disableDragAndDrop,1:setDisableDragAndDrop}=(0,react.useState)(!1),{0:temporaryWidget,1:setTemporaryWidget}=(0,react.useState)(""),{0:isAddingWidget,1:setIsAddingWidget}=(0,react.useState)(!1),{trackEvent:trackEvent}=(0,analyticsContext.z$)(),[handleAddCollection]=function useAddCollectionMutation(baseOptions){const options=_objectSpread(_objectSpread({},defaultOptions),baseOptions);return useMutation.D(AddCollectionDocument,options)}(),[handleAddWidget]=function useAddWidgetMutation(baseOptions){const options=addWidget_g_objectSpread(addWidget_g_objectSpread({},addWidget_g_defaultOptions),baseOptions);return useMutation.D(AddWidgetDocument,options)}(),[handleEditMySpace]=function useEditMySpaceMutation(baseOptions){const options=editMySpace_g_objectSpread(editMySpace_g_objectSpread({},editMySpace_g_defaultOptions),baseOptions);return useMutation.D(EditMySpaceDocument,options)}(),[handleAddWeatherWidget]=function useAddWeatherWidgetMutation(baseOptions){const options=addWeatherWidget_g_objectSpread(addWeatherWidget_g_objectSpread({},addWeatherWidget_g_defaultOptions),baseOptions);return useMutation.D(AddWeatherWidgetDocument,options)}(),[handleEditWeatherWidget]=function useEditWeatherWidgetMutation(baseOptions){const options=editWeatherWidget_g_objectSpread(editWeatherWidget_g_objectSpread({},editWeatherWidget_g_defaultOptions),baseOptions);return useMutation.D(EditWeatherWidgetDocument,options)}();function isCollection(widget){return widget.type===constants.hg.COLLECTION}const canAddCollections=mySpace&&mySpace.filter((w=>isCollection(w))).length<constants._p,canAddNews=mySpace&&mySpace.filter((w=>w.type===constants.hg.NEWS)).length<1,canAddWeather=mySpace&&mySpace.filter((w=>w.type===constants.hg.WEATHER)).length<5,canAddGuardianIdeal=mySpace&&mySpace.filter((w=>w.type===constants.hg.GUARDIANIDEAL)).length<1,canAddFeaturedShortcuts=mySpace&&mySpace.filter((w=>w.type===constants.hg.FEATUREDSHORTCUTS)).length<1,context={mySpace:mySpace,disableDragAndDrop:disableDragAndDrop,setDisableDragAndDrop:setDisableDragAndDrop,isAddingWidget:isAddingWidget,setIsAddingWidget:setIsAddingWidget,initializeMySpace:mySpace=>{setMySpace(mySpace.map((w=>myspaceContext_objectSpread(myspaceContext_objectSpread({},w),{},{id:w._id.toString()}))))},isCollection:isCollection,isGuardianIdeal:function isGuardianIdeal(widget){return widget.type===constants.hg.GUARDIANIDEAL},isNewsWidget:function isNewsWidget(widget){return widget.type===constants.hg.NEWS},isFeaturedShortcuts:function isFeaturedShortcuts(widget){return widget.type===constants.hg.FEATUREDSHORTCUTS},isWeather:function isWeather(widget){return widget.type===constants.hg.WEATHER},canAddCollections:canAddCollections,canAddNews:canAddNews,canAddWeather:canAddWeather,canAddGuardianIdeal:canAddGuardianIdeal,canAddFeaturedShortcuts:canAddFeaturedShortcuts,addNewsWidget:()=>{trackEvent("Add section","Add news"),handleAddWidget({variables:{title:"Recent news",type:WidgetType.News},refetchQueries:["getUser"]})},addGuardianIdeal:()=>{trackEvent("Guardian Ideal Carousel","Click on add Ideal carousel","Add Ideal"),handleAddWidget({variables:{title:"Guardian Ideal",type:WidgetType.GuardianIdeal},refetchQueries:["getUser"]})},addFeaturedShortcuts:()=>{trackEvent("Featured Shortcuts","Click on add Featured Shortcuts","Add Featured Shortcuts"),handleAddWidget({variables:{title:"Featured Shortcuts",type:WidgetType.FeaturedShortcuts},refetchQueries:["getUser"]})},addNewCollection:()=>{trackEvent("Add section","Create new collection"),handleAddCollection({variables:{title:"",bookmarks:[]},refetchQueries:["getUser"]})},addNewWeatherWidget:zipcode=>{trackEvent("Add weather widget","Create new weather widget"),handleAddWeatherWidget({variables:{title:"Weather",type:WidgetType.Weather,zipcode:zipcode},refetchQueries:["getUser"]})},editWeatherWidget:({_id:_id,zipcode:zipcode})=>{trackEvent("Edit weather widget","Edit weather widget"),handleEditWeatherWidget({variables:{_id:_id,zipcode:zipcode},refetchQueries:["getUser"]})},handleOnDragEnd:async event=>{const{active:active,over:over}=event;if(over&&active.id!==over.id){const oldIndex=mySpace.findIndex((w=>w._id.toString()===active.id)),newIndex=mySpace.findIndex((w=>w._id.toString()===over.id)),sortedWidgets=(0,sortable_esm.Rp)(mySpace,oldIndex,newIndex);setMySpace(sortedWidgets);const updatedMySpace=sortedWidgets.map((widget=>{if(widget.type===constants.hg.FEATUREDSHORTCUTS)return{_id:widget._id,title:widget.title,type:widget.type};if(widget.type===constants.hg.GUARDIANIDEAL)return{_id:widget._id,title:widget.title,type:widget.type};if(widget.type===constants.hg.COLLECTION)return{_id:widget._id,title:widget.title,type:widget.type,bookmarks:widget.bookmarks?.map((({_id:_id,url:url,label:label,cmsId:cmsId,isRemoved:isRemoved})=>({_id:_id,url:url,label:label,cmsId:cmsId,isRemoved:isRemoved})))};if(widget.type===constants.hg.NEWS)return{_id:widget._id,title:widget.title,type:widget.type};if(widget.type===constants.hg.WEATHER){const weatherWidget=widget;return{_id:weatherWidget._id,title:weatherWidget.title,type:weatherWidget.type,coords:{lat:weatherWidget.coords.lat,long:weatherWidget.coords.long,forecastUrl:weatherWidget.coords.forecastUrl,hourlyForecastUrl:weatherWidget.coords.hourlyForecastUrl,city:weatherWidget.coords.city,state:weatherWidget.coords.state,zipcode:weatherWidget.coords.zipcode}}}}));handleEditMySpace({variables:{mySpace:updatedMySpace}})}},temporaryWidget:temporaryWidget,setTemporaryWidget:setTemporaryWidget};return __jsx(MySpaceContext.Provider,{value:context},children)};MySpaceProvider.displayName="MySpaceProvider";const useMySpaceContext=()=>{const context=(0,react.useContext)(MySpaceContext);if(void 0===context)throw new Error("useMySpaceContext must be used within a MySpaceProvider");return context};MySpaceProvider.__docgenInfo={description:"",methods:[],displayName:"MySpaceProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};try{MySpaceProvider.displayName="MySpaceProvider",MySpaceProvider.__docgenInfo={description:"",displayName:"MySpaceProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stores/myspaceContext.tsx#MySpaceProvider"]={docgenInfo:MySpaceProvider.__docgenInfo,name:"MySpaceProvider",path:"src/stores/myspaceContext.tsx#MySpaceProvider"})}catch(__react_docgen_typescript_loader_error){}}}]);