"use strict";(self.webpackChunkussf_portal=self.webpackChunkussf_portal||[]).push([[6027],{"./src/stories/Pagination.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:function(){return Default},EightPagesFirst:function(){return EightPagesFirst},EightPagesFive:function(){return EightPagesFive},EightPagesFour:function(){return EightPagesFour},EightPagesLast:function(){return EightPagesLast},EightPagesSix:function(){return EightPagesSix},NinePagesFive:function(){return NinePagesFive},Sandbox:function(){return Sandbox},SevenPages:function(){return SevenPages},TenSlots:function(){return TenSlots},ThreePages:function(){return ThreePages},ThreePagesFirst:function(){return ThreePagesFirst},ThreePagesLast:function(){return ThreePagesLast}});var _home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_trussworks_react_uswds__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@trussworks/react-uswds/lib/index.js"),_layout_DefaultLayout_DefaultLayout_module_scss__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/layout/DefaultLayout/DefaultLayout.module.scss"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_home_runner_work_ussf_portal_client_ussf_portal_client_node_modules_storybook_nextjs_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}__webpack_exports__.default={title:"Base/Pagination",component:_trussworks_react_uswds__WEBPACK_IMPORTED_MODULE_2__.Pagination,argTypes:{totalPages:{control:"number"},currentPage:{control:"number"},maxSlots:{control:"number"},pathname:{control:"string"}},decorators:[Story=>__jsx("div",{className:_layout_DefaultLayout_DefaultLayout_module_scss__WEBPACK_IMPORTED_MODULE_3__.Z.siteContainer},__jsx(Story,null))]};const pathname="/test-pathname",Sandbox={args:{totalPages:24,currentPage:10,maxSlots:7}},Default={args:{totalPages:24,currentPage:10}},ThreePagesFirst={args:{pathname:pathname,totalPages:3,currentPage:1}},ThreePages={args:{pathname:pathname,totalPages:3,currentPage:2}},ThreePagesLast={args:{pathname:pathname,totalPages:3,currentPage:3}},SevenPages={args:{pathname:pathname,totalPages:7,currentPage:4}},EightPagesFirst={args:{pathname:pathname,totalPages:8,currentPage:1}},EightPagesFour={args:{pathname:pathname,totalPages:8,currentPage:4}},EightPagesFive={args:{pathname:pathname,totalPages:8,currentPage:5}},EightPagesSix={args:{pathname:pathname,totalPages:8,currentPage:6}},EightPagesLast={args:{pathname:pathname,totalPages:8,currentPage:8}},NinePagesFive={args:{pathname:pathname,totalPages:9,currentPage:5}},TenSlots={args:{pathname:pathname,totalPages:24,currentPage:10,maxSlots:10}};Sandbox.parameters=_objectSpread(_objectSpread({},Sandbox.parameters),{},{docs:_objectSpread(_objectSpread({},Sandbox.parameters?.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    totalPages: 24,\n    currentPage: 10,\n    maxSlots: 7\n  }\n}"},Sandbox.parameters?.docs?.source)})}),Default.parameters=_objectSpread(_objectSpread({},Default.parameters),{},{docs:_objectSpread(_objectSpread({},Default.parameters?.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    totalPages: 24,\n    currentPage: 10\n  }\n}"},Default.parameters?.docs?.source)})}),ThreePagesFirst.parameters=_objectSpread(_objectSpread({},ThreePagesFirst.parameters),{},{docs:_objectSpread(_objectSpread({},ThreePagesFirst.parameters?.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    pathname: pathname,\n    totalPages: 3,\n    currentPage: 1\n  }\n}"},ThreePagesFirst.parameters?.docs?.source)})}),ThreePages.parameters=_objectSpread(_objectSpread({},ThreePages.parameters),{},{docs:_objectSpread(_objectSpread({},ThreePages.parameters?.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    pathname: pathname,\n    totalPages: 3,\n    currentPage: 2\n  }\n}"},ThreePages.parameters?.docs?.source)})}),ThreePagesLast.parameters=_objectSpread(_objectSpread({},ThreePagesLast.parameters),{},{docs:_objectSpread(_objectSpread({},ThreePagesLast.parameters?.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    pathname: pathname,\n    totalPages: 3,\n    currentPage: 3\n  }\n}"},ThreePagesLast.parameters?.docs?.source)})}),SevenPages.parameters=_objectSpread(_objectSpread({},SevenPages.parameters),{},{docs:_objectSpread(_objectSpread({},SevenPages.parameters?.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    pathname: pathname,\n    totalPages: 7,\n    currentPage: 4\n  }\n}"},SevenPages.parameters?.docs?.source)})}),EightPagesFirst.parameters=_objectSpread(_objectSpread({},EightPagesFirst.parameters),{},{docs:_objectSpread(_objectSpread({},EightPagesFirst.parameters?.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    pathname: pathname,\n    totalPages: 8,\n    currentPage: 1\n  }\n}"},EightPagesFirst.parameters?.docs?.source)})}),EightPagesFour.parameters=_objectSpread(_objectSpread({},EightPagesFour.parameters),{},{docs:_objectSpread(_objectSpread({},EightPagesFour.parameters?.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    pathname: pathname,\n    totalPages: 8,\n    currentPage: 4\n  }\n}"},EightPagesFour.parameters?.docs?.source)})}),EightPagesFive.parameters=_objectSpread(_objectSpread({},EightPagesFive.parameters),{},{docs:_objectSpread(_objectSpread({},EightPagesFive.parameters?.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    pathname: pathname,\n    totalPages: 8,\n    currentPage: 5\n  }\n}"},EightPagesFive.parameters?.docs?.source)})}),EightPagesSix.parameters=_objectSpread(_objectSpread({},EightPagesSix.parameters),{},{docs:_objectSpread(_objectSpread({},EightPagesSix.parameters?.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    pathname: pathname,\n    totalPages: 8,\n    currentPage: 6\n  }\n}"},EightPagesSix.parameters?.docs?.source)})}),EightPagesLast.parameters=_objectSpread(_objectSpread({},EightPagesLast.parameters),{},{docs:_objectSpread(_objectSpread({},EightPagesLast.parameters?.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    pathname: pathname,\n    totalPages: 8,\n    currentPage: 8\n  }\n}"},EightPagesLast.parameters?.docs?.source)})}),NinePagesFive.parameters=_objectSpread(_objectSpread({},NinePagesFive.parameters),{},{docs:_objectSpread(_objectSpread({},NinePagesFive.parameters?.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    pathname: pathname,\n    totalPages: 9,\n    currentPage: 5\n  }\n}"},NinePagesFive.parameters?.docs?.source)})}),TenSlots.parameters=_objectSpread(_objectSpread({},TenSlots.parameters),{},{docs:_objectSpread(_objectSpread({},TenSlots.parameters?.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    pathname: pathname,\n    totalPages: 24,\n    currentPage: 10,\n    maxSlots: 10\n  }\n}"},TenSlots.parameters?.docs?.source)})})}}]);