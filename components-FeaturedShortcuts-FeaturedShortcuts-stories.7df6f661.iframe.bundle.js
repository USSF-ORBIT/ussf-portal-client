/*! For license information please see components-FeaturedShortcuts-FeaturedShortcuts-stories.7df6f661.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkussf_portal=self.webpackChunkussf_portal||[]).push([[8239],{"./node_modules/@fortawesome/react-fontawesome/index.es.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{G:function(){return FontAwesomeIcon}});var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@fortawesome/fontawesome-svg-core/index.mjs"),prop_types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),console=__webpack_require__("./node_modules/console-browserify/index.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function _toConsumableArray(arr){return function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function camelize(string){return function _isNumerical(obj){return(obj-=0)==obj}(string)?string:(string=string.replace(/[\-_\s]+(.)?/g,(function(match,chr){return chr?chr.toUpperCase():""}))).substr(0,1).toLowerCase()+string.substr(1)}var _excluded=["style"];var PRODUCTION=!1;try{PRODUCTION=!0}catch(e){}function normalizeIconArgs(icon){return icon&&"object"===_typeof(icon)&&icon.prefix&&icon.iconName&&icon.icon?icon:_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__.Qc.icon?_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__.Qc.icon(icon):null===icon?null:icon&&"object"===_typeof(icon)&&icon.prefix&&icon.iconName?icon:Array.isArray(icon)&&2===icon.length?{prefix:icon[0],iconName:icon[1]}:"string"==typeof icon?{prefix:"fas",iconName:icon}:void 0}function objectWithKey(key,value){return Array.isArray(value)&&value.length>0||!Array.isArray(value)&&value?_defineProperty({},key,value):{}}var FontAwesomeIcon=react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((function(props,ref){var iconArgs=props.icon,maskArgs=props.mask,symbol=props.symbol,className=props.className,title=props.title,titleId=props.titleId,maskId=props.maskId,iconLookup=normalizeIconArgs(iconArgs),classes=objectWithKey("classes",[].concat(_toConsumableArray(function classList(props){var _classes,beat=props.beat,fade=props.fade,beatFade=props.beatFade,bounce=props.bounce,shake=props.shake,flash=props.flash,spin=props.spin,spinPulse=props.spinPulse,spinReverse=props.spinReverse,pulse=props.pulse,fixedWidth=props.fixedWidth,inverse=props.inverse,border=props.border,listItem=props.listItem,flip=props.flip,size=props.size,rotation=props.rotation,pull=props.pull,classes=(_defineProperty(_classes={"fa-beat":beat,"fa-fade":fade,"fa-beat-fade":beatFade,"fa-bounce":bounce,"fa-shake":shake,"fa-flash":flash,"fa-spin":spin,"fa-spin-reverse":spinReverse,"fa-spin-pulse":spinPulse,"fa-pulse":pulse,"fa-fw":fixedWidth,"fa-inverse":inverse,"fa-border":border,"fa-li":listItem,"fa-flip":!0===flip,"fa-flip-horizontal":"horizontal"===flip||"both"===flip,"fa-flip-vertical":"vertical"===flip||"both"===flip},"fa-".concat(size),null!=size),_defineProperty(_classes,"fa-rotate-".concat(rotation),null!=rotation&&0!==rotation),_defineProperty(_classes,"fa-pull-".concat(pull),null!=pull),_defineProperty(_classes,"fa-swap-opacity",props.swapOpacity),_classes);return Object.keys(classes).map((function(key){return classes[key]?key:null})).filter((function(key){return key}))}(props)),_toConsumableArray(className.split(" ")))),transform=objectWithKey("transform","string"==typeof props.transform?_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__.Qc.transform(props.transform):props.transform),mask=objectWithKey("mask",normalizeIconArgs(maskArgs)),renderedIcon=(0,_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_0__.qv)(iconLookup,_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({},classes),transform),mask),{},{symbol:symbol,title:title,titleId:titleId,maskId:maskId}));if(!renderedIcon)return function log(){var _console;!PRODUCTION&&console&&"function"==typeof console.error&&(_console=console).error.apply(_console,arguments)}("Could not find icon",iconLookup),null;var abstract=renderedIcon.abstract,extraProps={ref:ref};return Object.keys(props).forEach((function(key){FontAwesomeIcon.defaultProps.hasOwnProperty(key)||(extraProps[key]=props[key])})),convertCurry(abstract[0],extraProps)}));FontAwesomeIcon.displayName="FontAwesomeIcon",FontAwesomeIcon.propTypes={beat:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,border:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,beatFade:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,bounce:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,className:prop_types__WEBPACK_IMPORTED_MODULE_2___default().string,fade:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,flash:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,mask:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().object,prop_types__WEBPACK_IMPORTED_MODULE_2___default().array,prop_types__WEBPACK_IMPORTED_MODULE_2___default().string]),maskId:prop_types__WEBPACK_IMPORTED_MODULE_2___default().string,fixedWidth:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,inverse:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,flip:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOf([!0,!1,"horizontal","vertical","both"]),icon:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().object,prop_types__WEBPACK_IMPORTED_MODULE_2___default().array,prop_types__WEBPACK_IMPORTED_MODULE_2___default().string]),listItem:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,pull:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOf(["right","left"]),pulse:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,rotation:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOf([0,90,180,270]),shake:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,size:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,spinPulse:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,spinReverse:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,symbol:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool,prop_types__WEBPACK_IMPORTED_MODULE_2___default().string]),title:prop_types__WEBPACK_IMPORTED_MODULE_2___default().string,titleId:prop_types__WEBPACK_IMPORTED_MODULE_2___default().string,transform:prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().string,prop_types__WEBPACK_IMPORTED_MODULE_2___default().object]),swapOpacity:prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool},FontAwesomeIcon.defaultProps={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1};var convertCurry=function convert(createElement,element){var extraProps=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"==typeof element)return element;var children=(element.children||[]).map((function(child){return convert(createElement,child)})),mixins=Object.keys(element.attributes||{}).reduce((function(acc,key){var val=element.attributes[key];switch(key){case"class":acc.attrs.className=val,delete element.attributes.class;break;case"style":acc.attrs.style=function styleToObject(style){return style.split(";").map((function(s){return s.trim()})).filter((function(s){return s})).reduce((function(acc,pair){var i=pair.indexOf(":"),prop=camelize(pair.slice(0,i)),value=pair.slice(i+1).trim();return prop.startsWith("webkit")?acc[function capitalize(val){return val.charAt(0).toUpperCase()+val.slice(1)}(prop)]=value:acc[prop]=value,acc}),{})}(val);break;default:0===key.indexOf("aria-")||0===key.indexOf("data-")?acc.attrs[key.toLowerCase()]=val:acc.attrs[camelize(key)]=val}return acc}),{attrs:{}}),_extraProps$style=extraProps.style,existingStyle=void 0===_extraProps$style?{}:_extraProps$style,remaining=_objectWithoutProperties(extraProps,_excluded);return mixins.attrs.style=_objectSpread2(_objectSpread2({},mixins.attrs.style),existingStyle),createElement.apply(void 0,[element.tag,_objectSpread2(_objectSpread2({},mixins.attrs),remaining)].concat(_toConsumableArray(children)))}.bind(null,react__WEBPACK_IMPORTED_MODULE_1__.createElement)},"./src/components/FeaturedShortcuts/FeaturedShortcuts.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FeaturedShorcutsWidget:function(){return FeaturedShorcutsWidget}});var _home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),bson__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/bson/dist/bson.browser.esm.js"),_FeaturedShorcuts__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/FeaturedShortcuts/FeaturedShorcuts.tsx"),_FeaturedShortcutItems__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/FeaturedShortcuts/FeaturedShortcutItems.ts"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const mockFeaturedShortcutsWidget={_id:new bson__WEBPACK_IMPORTED_MODULE_2__.Zw,title:"Featured Shortcuts",type:"FeaturedShortcuts"};__webpack_exports__.default={title:"Components/Widgets/FeaturedShortcuts",component:_FeaturedShorcuts__WEBPACK_IMPORTED_MODULE_3__.Z};const FeaturedShorcutsWidget=()=>__jsx(_FeaturedShorcuts__WEBPACK_IMPORTED_MODULE_3__.Z,{featuredShortcuts:_FeaturedShortcutItems__WEBPACK_IMPORTED_MODULE_4__.K,widget:mockFeaturedShortcutsWidget});FeaturedShorcutsWidget.displayName="FeaturedShorcutsWidget",FeaturedShorcutsWidget.parameters=_objectSpread(_objectSpread({},FeaturedShorcutsWidget.parameters),{},{docs:_objectSpread(_objectSpread({},FeaturedShorcutsWidget.parameters?.docs),{},{source:_objectSpread({originalSource:"() => <FeaturedShortcuts featuredShortcuts={featuredShortcutItems} widget={mockFeaturedShortcutsWidget} />"},FeaturedShorcutsWidget.parameters?.docs?.source)})}),FeaturedShorcutsWidget.__docgenInfo={description:"",methods:[],displayName:"FeaturedShorcutsWidget"}},"./src/operations/portal/mutations/addBookmark.g.ts":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{z:function(){return useAddBookmarkMutation}});var _home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),_apollo_client__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/graphql-tag/lib/index.js"),_apollo_client__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@apollo/client/react/hooks/useMutation.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const defaultOptions={},AddBookmarkDocument=_apollo_client__WEBPACK_IMPORTED_MODULE_1__.Ps`
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
    `;function useRemoveCollectionMutation(baseOptions){const options=_objectSpread(_objectSpread({},defaultOptions),baseOptions);return _apollo_client__WEBPACK_IMPORTED_MODULE_2__.D(RemoveCollectionDocument,options)}},"./src/stores/modalContext.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{DY:function(){return ModalProvider},vR:function(){return useModalContext}});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),analyticsContext=__webpack_require__("./src/stores/analyticsContext.tsx"),myspaceContext=__webpack_require__("./src/stores/myspaceContext.tsx"),addBookmark_g=__webpack_require__("./src/operations/portal/mutations/addBookmark.g.ts"),removeCollection_g=__webpack_require__("./src/operations/portal/mutations/removeCollection.g.ts"),defineProperty=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),lib=__webpack_require__("./node_modules/graphql-tag/lib/index.js"),useMutation=__webpack_require__("./node_modules/@apollo/client/react/hooks/useMutation.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const defaultOptions={},RemoveWidgetDocument=lib.Ps`
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
    `;var __jsx=react.createElement;const ModalContext=(0,react.createContext)({modalId:"",updateModalId:()=>{},modalRef:null,modalHeadingText:"",closeModal:()=>{},onDelete:()=>{},onSave:()=>{},updateWidget:()=>{},updateBookmark:()=>{},updateCustomLinkLabel:()=>{},updateModalText:()=>{},additionalText:"",isAddingLinkContext:!1}),ModalProvider=({children:children})=>{const{0:modalHeadingText,1:setModalHeadingText}=(0,react.useState)(""),{0:additionalText,1:setAdditionalText}=(0,react.useState)(""),{0:modalId,1:setModalId}=(0,react.useState)(""),{0:customLinkLabel,1:setCustomLinkLabel}=(0,react.useState)(""),{0:showAddWarning,1:setShowAddWarning}=(0,react.useState)(!1),{0:widgetState,1:setWidgetState}=(0,react.useState)(),{0:bookmark,1:setBookmark}=(0,react.useState)(),{0:isAddingLinkContext,1:setIsAddingLinkContext}=(0,react.useState)(!1),modalRef=(0,react.useRef)(null),{trackEvent:trackEvent}=(0,analyticsContext.z$)(),{setDisableDragAndDrop:setDisableDragAndDrop}=(0,myspaceContext.Iw)(),[handleAddBookmark]=(0,addBookmark_g.z)(),[handleRemoveCollection]=(0,removeCollection_g.S)(),[handleRemoveWidget]=function useRemoveWidgetMutation(baseOptions){const options=_objectSpread(_objectSpread({},defaultOptions),baseOptions);return useMutation.D(RemoveWidgetDocument,options)}(),[handleRemoveBookmark]=(0,removeBookmark_g.I)(),[handleEditBookmark]=function useEditBookmarkMutation(baseOptions){const options=editBookmark_g_objectSpread(editBookmark_g_objectSpread({},editBookmark_g_defaultOptions),baseOptions);return useMutation.D(EditBookmarkDocument,options)}(),closeModal=()=>{setWidgetState(null),setBookmark(null),setCustomLinkLabel(""),setModalId(""),setDisableDragAndDrop(!1),isAddingLinkContext&&setIsAddingLinkContext(!1),modalRef.current?.toggleModal(void 0,!1)},context={modalId:"",updateModalId:modalId=>{setModalId(modalId)},modalRef:modalRef,modalHeadingText:modalHeadingText,closeModal:closeModal,onDelete:()=>{switch(modalId){case"removeWeatherWidgetModal":trackEvent("Section settings","Remove this section","Weather"),handleRemoveWidget({variables:{_id:widgetState?._id},refetchQueries:["getUser"]}),closeModal();break;case"removeNewsWidgetModal":trackEvent("Section settings","Remove this section","News"),handleRemoveWidget({variables:{_id:widgetState?._id},refetchQueries:["getUser"]}),closeModal();break;case"removeGuardianIdealWidgetModal":trackEvent("Guardian Ideal Carousel","Click on remove Ideal carousel","Remove Ideal"),handleRemoveWidget({variables:{_id:widgetState?._id},refetchQueries:["getUser"]}),closeModal();break;case"removeFeaturedShortcutsWidgetModal":trackEvent("Featured Shortcuts Section","Click on remove Featured Shortcuts","Remove Featured Shortcuts"),handleRemoveWidget({variables:{_id:widgetState?._id},refetchQueries:["getUser"]}),closeModal();break;case"removeCustomCollectionModal":trackEvent("Collection settings","Delete collection",widgetState?.title),handleRemoveCollection({variables:{_id:widgetState?._id},refetchQueries:["getUser"]}),closeModal();break;case"editCustomLinkModal":handleRemoveBookmark({variables:{_id:bookmark?._id,collectionId:widgetState?._id},refetchQueries:["getUser"]}),closeModal();break;default:return null}},updateWidget:widget=>{setWidgetState(widget)},updateModalText:({headingText:headingText,descriptionText:descriptionText=""})=>{setModalHeadingText(headingText),setAdditionalText(descriptionText)},additionalText:additionalText,customLinkLabel:customLinkLabel,updateCustomLinkLabel:(customLinkLabel,showAddWarning=!1,isAddingLink=!1)=>{setCustomLinkLabel(customLinkLabel),setShowAddWarning(showAddWarning),setIsAddingLinkContext(isAddingLink)},showAddWarning:showAddWarning,isAddingLinkContext:isAddingLinkContext,onSave:"addCustomLinkModal"===modalId?(url,label)=>{trackEvent("Add link","Save custom link",`${widgetState?.title} / ${label} / ${url}`),handleAddBookmark({variables:{collectionId:widgetState?._id,url:url,label:label},refetchQueries:["getUser"]}),closeModal()}:(url,label)=>{handleEditBookmark({variables:{_id:bookmark?._id,collectionId:widgetState?._id,url:url,label:label},refetchQueries:["getUser"]}),closeModal()},bookmark:bookmark,updateBookmark:bookmark=>{setBookmark(bookmark)}};return __jsx(ModalContext.Provider,{value:context},children)};ModalProvider.displayName="ModalProvider";const useModalContext=()=>(0,react.useContext)(ModalContext);ModalProvider.__docgenInfo={description:"",methods:[],displayName:"ModalProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};try{ModalProvider.displayName="ModalProvider",ModalProvider.__docgenInfo={description:"",displayName:"ModalProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stores/modalContext.tsx#ModalProvider"]={docgenInfo:ModalProvider.__docgenInfo,name:"ModalProvider",path:"src/stores/modalContext.tsx#ModalProvider"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/extends.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}__webpack_require__.d(__webpack_exports__,{Z:function(){return _extends}})},"./node_modules/classnames/index.js":function(module,exports){var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()}}]);
//# sourceMappingURL=components-FeaturedShortcuts-FeaturedShortcuts-stories.7df6f661.iframe.bundle.js.map