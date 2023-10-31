"use strict";(self.webpackChunkussf_portal=self.webpackChunkussf_portal||[]).push([[1864],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__.d(__webpack_exports__,{Z:function(){return _defineProperty}})},"./src/components/ThemeToggle/ThemeToggle.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{NoUser:function(){return NoUser},WithUserDark:function(){return WithUserDark},WithUserLight:function(){return WithUserLight},default:function(){return ThemeToggle_stories}});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/react/index.js"),MockedProvider=__webpack_require__("./node_modules/@apollo/client/testing/react/MockedProvider.js"),bson_browser_esm=__webpack_require__("./node_modules/bson/dist/bson.browser.esm.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const mockNews={_id:new bson_browser_esm.Zw,title:"Recent News",type:"News"},mockGuardianIdeal={_id:new bson_browser_esm.Zw,title:"Guardian Ideal",type:"GuardianIdeal"},mockFeaturedShortcuts={_id:new bson_browser_esm.Zw,title:"Featured Shortcuts",type:"FeaturedShortcuts"},testUser1=_objectSpread(_objectSpread({},{userId:"BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil",issuer:"http://localhost:8080/simplesaml/saml2/idp/metadata.php",nameID:"_9c9d48b40112e0d39413d937f9d3a940420d719fbb",nameIDFormat:"urn:oasis:names:tc:SAML:2.0:nameid-format:transient",inResponseTo:"_82bc4c3df3d7396a9f22",sessionIndex:"_b0674f313b122aad2ce1faccac204e732e57b2740b",attributes:{edipi:"5244446289",common_name:"CAMPBELL.BERNADETTE.5244446289",fascn:"5244446289197004",givenname:"BERNADETTE",surname:"CAMPBELL",userprincipalname:"BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil",userGroups:["AF_USERS"],subject:"/C=US/O=U.S. Government/OU=DoD/OU=PKI/OU=CONTRACTOR/CN=CAMPBELL.BERNADETTE.5244446289"}}),{personnelData:{Grade:"1",DutyTitle:"ANALYST",DOD_ID:"5244446289",MajCom:"UNITED STATES SPACE FORCE FORCES (6F)",Country:"CALIFORNIA",BaseLoc:"VANDENBERG",OrgType:"SQUADRON",Rank:{Title:"Specialist One",Abbreviation:"Spc1",Grade:"E-1",GradeId:"1"},EOPDate:"1682812800000",LastName:"CAMPBELL",FirstName:"BERNADETTE",UserType:"Enlisted",lastModifiedAt:"2023-08-28T14:39:06.732-07:00"}}),testPortalUser1={userId:"BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil",mySpace:[{_id:new bson_browser_esm.Zw,cmsId:"ckwz3u58s1835ql974leo1yll",title:"Example Collection",type:"Collection",bookmarks:[{_id:new bson_browser_esm.Zw,cmsId:"cktd7c0d30190w597qoftevq1",url:"https://afpcsecure.us.af.mil/",label:"vMPF"},{_id:new bson_browser_esm.Zw,cmsId:"cktd7ettn0457w597p7ja4uye",url:"https://leave.af.mil/profile",label:"LeaveWeb"},{_id:new bson_browser_esm.Zw,cmsId:"cktd7hjz30636w5977vu4la4c",url:"https://mypay.dfas.mil/#/",label:"MyPay"},{_id:new bson_browser_esm.Zw,cmsId:"ckwz3tphw1763ql97pia1zkvc",url:"https://webmail.apps.mil/",label:"Webmail"},{_id:new bson_browser_esm.Zw,cmsId:"ckwz3u4461813ql970wkd254m",url:"https://www.e-publishing.af.mil/",label:"e-Publications"}]}],displayName:"BERNADETTE CAMPBELL",theme:"light"},portalUserWithExampleCollection=(new bson_browser_esm.Zw,new bson_browser_esm.Zw,new bson_browser_esm.Zw,new bson_browser_esm.Zw,new bson_browser_esm.Zw,Array.from({length:10},((x,i)=>({_id:new bson_browser_esm.Zw,label:`Bookmark ${i}`,url:"#",cmsId:`${i+1}`}))),{userId:"BERNADETTE.CAMPBELL.5244446289@testusers.cce.af.mil",mySpace:[{_id:new bson_browser_esm.Zw,title:"Example Collection",type:"Collection",bookmarks:[{_id:new bson_browser_esm.Zw,url:"www.example.com",label:"MyVector",cmsId:"1"},{_id:new bson_browser_esm.Zw,url:"www.example.com",label:"MyPay",cmsId:"17"},{_id:new bson_browser_esm.Zw,url:"www.example.com",label:"vMPF",cmsId:"7"},{_id:new bson_browser_esm.Zw,url:"www.custom.com",label:"CUSTOM LINK"}]}],displayName:"BERNADETTE CAMPBELL",theme:"light"}),mockCollection=(new bson_browser_esm.Zw,new bson_browser_esm.Zw,{_id:new bson_browser_esm.Zw,title:"Example Collection",type:"Collection",bookmarks:[{_id:new bson_browser_esm.Zw,url:"www.example.com/1",label:"MyVector",cmsId:"1"}]}),maxCollections=Array.from({length:25},((x,i)=>_objectSpread(_objectSpread({},mockCollection),{},{title:"Example Collection "+i.toString(),_id:new bson_browser_esm.Zw})));Array.from({length:22},((x,i)=>_objectSpread(_objectSpread({},mockCollection),{},{title:"Example Collection "+i.toString(),_id:new bson_browser_esm.Zw}))),_objectSpread(_objectSpread({},portalUserWithExampleCollection),{},{mySpace:[]}),_objectSpread(_objectSpread({},testUser1),{},{attributes:_objectSpread(_objectSpread({},testUser1.attributes),{},{userGroups:[...testUser1.attributes.userGroups,"PORTAL_CMS_Admins"]})}),_objectSpread(_objectSpread({},testUser1),{},{attributes:_objectSpread(_objectSpread({},testUser1.attributes),{},{userGroups:[...testUser1.attributes.userGroups,"PORTAL_CMS_Users"]})});var ThemeToggle=__webpack_require__("./src/components/ThemeToggle/ThemeToggle.tsx"),getUser_g=__webpack_require__("./src/operations/portal/queries/getUser.g.ts"),authContext=__webpack_require__("./src/stores/authContext.tsx"),__jsx=react.createElement;function ThemeToggle_stories_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function ThemeToggle_stories_objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ThemeToggle_stories_ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ThemeToggle_stories_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const mockContext={user:testUser1,portalUser:testPortalUser1,setUser:()=>{},setPortalUser:()=>{},logout:()=>{},login:()=>{}};var ThemeToggle_stories={title:"Base/ThemeToggle",component:ThemeToggle.Z,decorators:[(Story,{globals:globals,parameters:parameters})=>{const mocks=[{request:{query:getUser_g.ft},result:()=>({data:{displayName:"BERNADETTE CAMPBELL",mySpace:[],theme:parameters.happo.themes[0]||globals.theme}})}];return __jsx(authContext.Vo.Provider,{value:mockContext},__jsx(MockedProvider.g,{mocks:mocks},__jsx(Story,null)))}]};const WithUserLight={parameters:{happo:{themes:["light"]}}},WithUserDark={parameters:{happo:{themes:["dark"]}}},NoUser={decorators:[Story=>__jsx(authContext.Vo.Provider,{value:ThemeToggle_stories_objectSpread(ThemeToggle_stories_objectSpread({},mockContext),{},{user:null})},__jsx(Story,null))]};WithUserLight.parameters=ThemeToggle_stories_objectSpread(ThemeToggle_stories_objectSpread({},WithUserLight.parameters),{},{docs:ThemeToggle_stories_objectSpread(ThemeToggle_stories_objectSpread({},WithUserLight.parameters?.docs),{},{source:ThemeToggle_stories_objectSpread({originalSource:"{\n  parameters: {\n    happo: {\n      themes: ['light']\n    }\n  }\n}"},WithUserLight.parameters?.docs?.source)})}),WithUserDark.parameters=ThemeToggle_stories_objectSpread(ThemeToggle_stories_objectSpread({},WithUserDark.parameters),{},{docs:ThemeToggle_stories_objectSpread(ThemeToggle_stories_objectSpread({},WithUserDark.parameters?.docs),{},{source:ThemeToggle_stories_objectSpread({originalSource:"{\n  parameters: {\n    happo: {\n      themes: ['dark']\n    }\n  }\n}"},WithUserDark.parameters?.docs?.source)})}),NoUser.parameters=ThemeToggle_stories_objectSpread(ThemeToggle_stories_objectSpread({},NoUser.parameters),{},{docs:ThemeToggle_stories_objectSpread(ThemeToggle_stories_objectSpread({},NoUser.parameters?.docs),{},{source:ThemeToggle_stories_objectSpread({originalSource:"{\n  decorators: [Story => <AuthContext.Provider value={{\n    ...mockContext,\n    user: null\n  }}>\n        <Story />\n      </AuthContext.Provider>]\n}"},NoUser.parameters?.docs?.source)})})}}]);