"use strict";(self.webpackChunkussf_portal=self.webpackChunkussf_portal||[]).push([[755],{"./node_modules/@storybook/preview-web/dist/modern/renderDocs.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{renderDocs:function(){return renderDocs},unmountDocs:function(){return unmountDocs}});var react=__webpack_require__("./node_modules/react/index.js"),react_dom=__webpack_require__("./node_modules/react-dom/index.js");const wrapper={fontSize:"14px",letterSpacing:"0.2px",margin:"10px 0"},main={margin:"auto",padding:30,borderRadius:10,background:"rgba(0,0,0,0.03)"},heading={textAlign:"center"},NoDocs=()=>react.createElement("div",{style:wrapper,className:"sb-nodocs sb-wrapper"},react.createElement("div",{style:main},react.createElement("h1",{style:heading},"No Docs"),react.createElement("p",null,"Sorry, but there are no docs for the selected story. To add them, set the story's ",react.createElement("code",null,"docs")," parameter. If you think this is an error:"),react.createElement("ul",null,react.createElement("li",null,"Please check the story definition."),react.createElement("li",null,"Please check the Storybook config."),react.createElement("li",null,"Try reloading the page.")),react.createElement("p",null,"If the problem persists, check the browser console, or the terminal you've run Storybook from.")));function renderDocs(story,docsContext,element,callback){return async function renderDocsAsync(story,docsContext,element){var _docs$getContainer,_docs$getPage;const{docs:docs}=story.parameters;if((null!=docs&&docs.getPage||null!=docs&&docs.page)&&!(null!=docs&&docs.getContainer||null!=docs&&docs.container))throw new Error("No `docs.container` set, did you run `addon-docs/preset`?");const DocsContainer=docs.container||await(null===(_docs$getContainer=docs.getContainer)||void 0===_docs$getContainer?void 0:_docs$getContainer.call(docs))||(({children:children})=>react.createElement(react.Fragment,null,children)),Page=docs.page||await(null===(_docs$getPage=docs.getPage)||void 0===_docs$getPage?void 0:_docs$getPage.call(docs))||NoDocs,docsElement=react.createElement(DocsContainer,{key:story.componentId,context:docsContext},react.createElement(Page,null));await new Promise((resolve=>{react_dom.render(docsElement,element,resolve)}))}(story,docsContext,element).then(callback)}function unmountDocs(element){react_dom.unmountComponentAtNode(element)}NoDocs.displayName="NoDocs"}}]);