"use strict";(self.webpackChunkussf_portal=self.webpackChunkussf_portal||[]).push([[8679],{"./src/components/PageHeader/PageHeader.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{NewsAndAnnouncements:function(){return NewsAndAnnouncements},PortalHome:function(){return PortalHome},default:function(){return PageHeader_stories}});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@trussworks/react-uswds/lib/index.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),PageHeader_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/@storybook/nextjs/node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/@storybook/nextjs/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[4]!./src/components/PageHeader/PageHeader.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(PageHeader_module.Z,options);var PageHeader_PageHeader_module=PageHeader_module.Z&&PageHeader_module.Z.locals?PageHeader_module.Z.locals:void 0,Search=__webpack_require__("./src/components/Search/Search.tsx"),__jsx=react.createElement;const PageHeader=({children:children})=>__jsx("div",{className:PageHeader_PageHeader_module.PageHeader},__jsx(lib.GridContainer,null,__jsx(lib.Grid,{row:!0,gap:!0},__jsx(lib.Grid,{col:"auto",desktop:{col:6}},children),__jsx(lib.Grid,{col:"auto",desktop:{col:6}},__jsx(Search.Z,null)))));PageHeader.displayName="PageHeader",PageHeader.__docgenInfo={description:"",methods:[],displayName:"PageHeader",props:{searchQuery:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};var PageHeader_PageHeader=PageHeader;try{PageHeader.displayName="PageHeader",PageHeader.__docgenInfo={description:"",displayName:"PageHeader",props:{searchQuery:{defaultValue:null,description:"",name:"searchQuery",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/PageHeader/PageHeader.tsx#PageHeader"]={docgenInfo:PageHeader.__docgenInfo,name:"PageHeader",path:"src/components/PageHeader/PageHeader.tsx#PageHeader"})}catch(__react_docgen_typescript_loader_error){}var PersonalData=__webpack_require__("./src/components/PersonalData/PersonalData.tsx"),NavLink=__webpack_require__("./src/components/util/NavLink/NavLink.tsx"),PageHeader_stories_jsx=react.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}var PageHeader_stories={title:"Navigation/PageHeader",component:PageHeader_PageHeader};const PortalHome=()=>PageHeader_stories_jsx(PageHeader_PageHeader,null,PageHeader_stories_jsx(PersonalData.Z,{userDisplayName:"Test Name"}));PortalHome.displayName="PortalHome";const NewsAndAnnouncements=()=>PageHeader_stories_jsx(PageHeader_PageHeader,null,PageHeader_stories_jsx("div",null,PageHeader_stories_jsx("h1",null,"News & Announcements"),PageHeader_stories_jsx(lib.BreadcrumbBar,null,PageHeader_stories_jsx(lib.Breadcrumb,null,PageHeader_stories_jsx(lib.BreadcrumbLink,{asCustom:NavLink.Z,href:"/"},"Service portal home")),PageHeader_stories_jsx(lib.Breadcrumb,{current:!0},"News & Announcements"))));NewsAndAnnouncements.displayName="NewsAndAnnouncements",PortalHome.parameters=_objectSpread(_objectSpread({},PortalHome.parameters),{},{docs:_objectSpread(_objectSpread({},PortalHome.parameters?.docs),{},{source:_objectSpread({originalSource:'() => <PageHeader>\n    <PersonalData userDisplayName="Test Name" />\n  </PageHeader>'},PortalHome.parameters?.docs?.source)})}),NewsAndAnnouncements.parameters=_objectSpread(_objectSpread({},NewsAndAnnouncements.parameters),{},{docs:_objectSpread(_objectSpread({},NewsAndAnnouncements.parameters?.docs),{},{source:_objectSpread({originalSource:'() => <PageHeader>\n    <div>\n      <h1>News &amp; Announcements</h1>\n      <BreadcrumbBar>\n        <Breadcrumb>\n          <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/">\n            Service portal home\n          </BreadcrumbLink>\n        </Breadcrumb>\n        <Breadcrumb current>News & Announcements</Breadcrumb>\n      </BreadcrumbBar>\n    </div>\n  </PageHeader>'},NewsAndAnnouncements.parameters?.docs?.source)})}),PortalHome.__docgenInfo={description:"",methods:[],displayName:"PortalHome"},NewsAndAnnouncements.__docgenInfo={description:"",methods:[],displayName:"NewsAndAnnouncements"}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/@storybook/nextjs/node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/@storybook/nextjs/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[4]!./src/components/PageHeader/PageHeader.module.scss":function(module,__webpack_exports__,__webpack_require__){var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".PageHeader_PageHeader__szzo0{color:var(--text);padding-bottom:2rem}.PageHeader_PageHeader__szzo0 h1{text-transform:uppercase;margin-bottom:0}.PageHeader_PageHeader__szzo0 li{color:var(--text)}.PageHeader_PageHeader__szzo0 .usa-breadcrumb__list-item:not(:last-child)::after{background:var(--text)}.PageHeader_PageHeader__szzo0 a,.PageHeader_PageHeader__szzo0 .usa-breadcrumb__link,.PageHeader_PageHeader__szzo0 .usa-link{color:var(--breadcrumbs-link)}.PageHeader_PageHeader__szzo0 a:visited,.PageHeader_PageHeader__szzo0 .usa-breadcrumb__link:visited,.PageHeader_PageHeader__szzo0 .usa-link:visited{color:var(--breadcrumbs-link)}.PageHeader_PageHeader__szzo0 .grid-row{align-items:center}.PageHeader_PageHeader__szzo0+*{margin-top:2rem}","",{version:3,sources:["webpack://./src/components/PageHeader/PageHeader.module.scss","webpack://./node_modules/@uswds/uswds/packages/uswds-core/src/styles/mixins/utilities/_padding.scss"],names:[],mappings:"AAEA,8BACE,iBAAA,CCqBE,mBAAA,CDlBF,iCACE,wBAAA,CACA,eAAA,CAEF,iCACE,iBAAA,CAEF,iFACE,sBAAA,CAEF,4HAGE,6BAAA,CACA,oJACE,6BAAA,CAIJ,wCACE,kBAAA,CAGF,gCACE,eAAA",sourcesContent:["@use 'uswds-core' as *;\n\n.PageHeader {\n  color: var(--text);\n  @include u-padding-bottom(4);\n\n  h1 {\n    text-transform: uppercase;\n    margin-bottom: 0;\n  }\n  li {\n    color: var(--text);\n  }\n  :global(.usa-breadcrumb__list-item:not(:last-child)::after) {\n    background: var(--text);\n  }\n  a,\n  :global(.usa-breadcrumb__link),\n  :global(.usa-link) {\n    color: var(--breadcrumbs-link);\n    &:visited {\n      color: var(--breadcrumbs-link);\n    }\n  }\n\n  :global(.grid-row) {\n    align-items: center;\n  }\n\n  & + * {\n    margin-top: units(4);\n  }\n}\n",'@use "sass:list";\n@use "../../functions" as *;\n\n// Adds padding either l/r(x) or t/b(y)\n\n@mixin padding-n($side, $value...) {\n  $value: unpack($value);\n  $important: null;\n  @if has-important($value) {\n    $value: remove($value, "!important");\n    @if list.length($value) == 1 {\n      $value: de-list($value);\n    }\n    $important: " !important";\n  }\n  @if $side == all {\n    padding: get-uswds-value("padding", $value...) #{$important};\n  } @else if $side == x {\n    padding-left: get-uswds-value("padding", $value...) #{$important};\n    padding-right: get-uswds-value("padding", $value...) #{$important};\n  } @else if $side == y {\n    padding-bottom: get-uswds-value("padding", $value...) #{$important};\n    padding-top: get-uswds-value("padding", $value...) #{$important};\n  } @else {\n    padding-#{$side}: get-uswds-value("padding", $value...) #{$important};\n  }\n}\n\n@mixin u-padding($value...) {\n  @include padding-n(all, $value...);\n}\n\n@mixin u-padding-x($value...) {\n  @include padding-n(x, $value...);\n}\n\n@mixin u-padding-y($value...) {\n  @include padding-n(y, $value...);\n}\n\n@mixin u-padding-top($value...) {\n  @include padding-n(top, $value...);\n}\n\n@mixin u-padding-right($value...) {\n  @include padding-n(right, $value...);\n}\n\n@mixin u-padding-bottom($value...) {\n  @include padding-n(bottom, $value...);\n}\n\n@mixin u-padding-left($value...) {\n  @include padding-n(left, $value...);\n}\n'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={PageHeader:"PageHeader_PageHeader__szzo0"},__webpack_exports__.Z=___CSS_LOADER_EXPORT___}}]);