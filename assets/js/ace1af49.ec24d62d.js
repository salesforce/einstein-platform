"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[6949],{30599:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>m,frontMatter:()=>r,metadata:()=>a,toc:()=>h});var s=i(74848),t=i(28453),o=i(13554),l=i.n(o);const r={slug:"mulesoft",authors:["amirkhan-ak-sf"],tags:["mulesoft","mac","llm-open-connector"],date:new Date("2024-11-25T00:00:00.000Z")},c="LLM Open Connector + MuleSoft + Cerebras",a={permalink:"/einstein-platform/mulesoft",source:"@site/cookbook/llm-open-connector-mulesoft-mac.mdx",title:"LLM Open Connector + MuleSoft + Cerebras",description:"Learn how to implement Salesforce's LLM Open Connector with MuleSoft Anypoint Platform using its AI Chain Connector and Inference Connector.",date:"2024-11-25T00:00:00.000Z",tags:[{inline:!1,label:"mulesoft",permalink:"/einstein-platform/tags/mulesoft"},{inline:!1,label:"mac",permalink:"/einstein-platform/tags/mac"},{inline:!1,label:"llm-open-connector",permalink:"/einstein-platform/tags/llm-open-connector"}],readingTime:5.345,hasTruncateMarker:!0,authors:[{name:"Amir",title:"Developer Advocate @ Salesforce",url:"https://github.com/amirkhan-ak-sf",page:{permalink:"/einstein-platform/authors/amirkhan-ak-sf"},socials:{github:"https://github.com/amirkhan-ak-sf"},imageURL:"https://github.com/amirkhan-ak-sf.png",key:"amirkhan-ak-sf"}],frontMatter:{slug:"mulesoft",authors:["amirkhan-ak-sf"],tags:["mulesoft","mac","llm-open-connector"],date:"2024-11-25T00:00:00.000Z"},unlisted:!1,prevItem:{title:"LLM Open Connector + watsonx",permalink:"/einstein-platform/ibm"},nextItem:{title:"LLM Open Connector + MuleSoft + Ollama",permalink:"/einstein-platform/mulesoft-ollama"}},d={authorsImageUrls:[void 0]},h=[{value:"High-level Process",id:"high-level-process",level:2},{value:"Prerequisites + Tutorial Video",id:"prerequisites--tutorial-video",level:2},{value:"Step 1: Download the API Specification for the LLM Open Connector",id:"step-1-download-the-api-specification-for-the-llm-open-connector",level:2},{value:"Step 2: Import the API Specification into Anypoint Design Center",id:"step-2-import-the-api-specification-into-anypoint-design-center",level:2},{value:"Step 3: Implement the API Specification",id:"step-3-implement-the-api-specification",level:2},{value:"Import API Specification into Studio",id:"import-api-specification-into-studio",level:3},{value:"Add the Inference Connector to Your Project",id:"add-the-inference-connector-to-your-project",level:3},{value:"Implement the Chat Completions Endpoint",id:"implement-the-chat-completions-endpoint",level:3},{value:"Test Locally",id:"test-locally",level:3},{value:"Step 4. Deploy to Anypoint CloudHub",id:"step-4-deploy-to-anypoint-cloudhub",level:2},{value:"Create a Configuration in Model Builder",id:"create-a-configuration-in-model-builder",level:2},{value:"Important Considerations",id:"important-considerations",level:2},{value:"Conclusion",id:"conclusion",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["Learn how to implement Salesforce's ",(0,s.jsx)(n.a,{href:"/docs/apis/llm-open-connector/",children:"LLM Open Connector"})," with MuleSoft Anypoint Platform using its ",(0,s.jsx)(n.a,{href:"https://mac-project.ai/docs/mulechain-ai/getting-started",children:"AI Chain Connector"})," and ",(0,s.jsx)(n.a,{href:"https://mac-project.ai/docs/mac-inference/getting-started",children:"Inference Connector"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"This recipe implements an example of Cerebras Inference; however, the high-level process is the same for all models and providers."}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["The steps in this recipe use Anypoint Studio. For instructions using Anypoint Code Builder (ACB), see ",(0,s.jsx)(n.a,{href:"/einstein-platform/mulesoft-ollama",children:"LLM Open Connector + MuleSoft + Ollama"}),"."]})}),"\n",(0,s.jsx)(n.h2,{id:"high-level-process",children:"High-level Process"}),"\n",(0,s.jsx)(n.p,{children:"There are four high-level steps for connecting your MuleSoft model endpoint to the LLM Open Connector."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"MuleSoft high-level process",src:i(21660).A+"",width:"2678",height:"546"})}),"\n",(0,s.jsx)(n.h2,{id:"prerequisites--tutorial-video",children:"Prerequisites + Tutorial Video"}),"\n",(0,s.jsx)(n.p,{children:"Before you begin, review the prerequisites:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["You have a MuleSoft Account (",(0,s.jsx)(n.a,{href:"https://anypoint.mulesoft.com/login/signup",children:"Sign up here"}),")."]}),"\n",(0,s.jsxs)(n.li,{children:["You have ",(0,s.jsx)(n.a,{href:"https://docs.mulesoft.com/anypoint-code-builder/start-acb-desktop",children:"Anypoint Code Builder (ACB)"})," or ",(0,s.jsx)(n.a,{href:"https://www.mulesoft.com/lp/dl/anypoint-mule-studio",children:"Anypoint Studio"})," installed. The instructions in this recipe are based on Anypoint Studio."]}),"\n",(0,s.jsxs)(n.li,{children:["You have ",(0,s.jsx)(n.a,{href:"https://mac-project.ai/docs/mac-inference/getting-started",children:"Inference Connector"})," installed."]}),"\n",(0,s.jsxs)(n.li,{children:["You have a ",(0,s.jsx)(n.a,{href:"https://inference.cerebras.ai/",children:"Cerebras account"})," with an API key."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"View a step-by-step tutorial video that covers an implementation similar to the one covered in this recipe:"}),"\n",(0,s.jsx)(l(),{playing:!1,url:"https://youtu.be/x4gMffK0Dek?si=Q9_3L__wno3Ca9uZ"}),"\n",(0,s.jsx)(n.h2,{id:"step-1-download-the-api-specification-for-the-llm-open-connector",children:"Step 1: Download the API Specification for the LLM Open Connector"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Download LLM Open Connector ",(0,s.jsx)(n.a,{href:"https://github.com/salesforce/einstein-platform/blob/main/api-specs/llm-open-connector/llm-open-connector.yml",children:"API Spec"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Rename the file from ",(0,s.jsx)(n.code,{children:"llm-open-connector.yml"})," to ",(0,s.jsx)(n.code,{children:"llm-open-connector.yaml"}),"."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"step-2-import-the-api-specification-into-anypoint-design-center",children:"Step 2: Import the API Specification into Anypoint Design Center"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Log in to your MuleSoft account."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Go to ",(0,s.jsx)(n.a,{href:"https://anypoint.mulesoft.com/designcenter/#/projects",children:"Anypoint Design Center"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Import a new API specification from a file using these values:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Project Name: ",(0,s.jsx)(n.code,{children:"Cerebras-LLM-Provider"}),","]}),"\n",(0,s.jsxs)(n.li,{children:["API Specification: Select ",(0,s.jsx)(n.code,{children:"REST API"}),","]}),"\n",(0,s.jsxs)(n.li,{children:["File upload: ",(0,s.jsx)(n.code,{children:"llm-open-connector.yaml"}),". Be sure to use the renamed file."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click ",(0,s.jsx)(n.strong,{children:"Import"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Verify that the API specification successfully imported."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Import API Specification",src:i(39733).A+"",width:"1924",height:"1244"})}),"\n",(0,s.jsxs)(n.ol,{start:"6",children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Change ",(0,s.jsx)(n.code,{children:'termsOfService: ""'})," to ",(0,s.jsx)(n.code,{children:'termsOfService: "-"'}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Remove ",(0,s.jsx)(n.code,{children:"servers:"})," and the example ",(0,s.jsx)(n.code,{children:"url"}),"."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"servers:\n  - url: https://bring-your-own-llm.example.com\n"})}),"\n",(0,s.jsxs)(n.ol,{start:"7",children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click ",(0,s.jsx)(n.strong,{children:"Publish."})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Provide versioning information:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Asset version: ",(0,s.jsx)(n.code,{children:"1.0.0"})]}),"\n",(0,s.jsxs)(n.li,{children:["API version: ",(0,s.jsx)(n.code,{children:"v1"})]}),"\n",(0,s.jsxs)(n.li,{children:["Lifecycle State: ",(0,s.jsx)(n.code,{children:"Stable"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Publish to Exchange",src:i(41670).A+"",width:"1360",height:"1164"})}),"\n",(0,s.jsxs)(n.ol,{start:"9",children:["\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.strong,{children:"Publish to Exchange"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"step-3-implement-the-api-specification",children:"Step 3: Implement the API Specification"}),"\n",(0,s.jsx)(n.p,{children:"This cookbook uses Anypoint Studio to implement the API Specification. If you prefer, you can also implement the spec with Anypoint Code Builder."}),"\n",(0,s.jsx)(n.h3,{id:"import-api-specification-into-studio",children:"Import API Specification into Studio"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Open Anypoint Studio and create a Mule Project."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Name the project and import an API spec:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Project Name: ",(0,s.jsx)(n.code,{children:"cerebras-llm-provider"}),","]}),"\n",(0,s.jsxs)(n.li,{children:["Import a published API: Select the ",(0,s.jsx)(n.code,{children:"Cerebras-LLM-Provider"})," API spec from the previous step."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Add API to Mule Project",src:i(25345).A+"",width:"1808",height:"1208"})}),"\n",(0,s.jsxs)(n.ol,{start:"3",children:["\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.strong,{children:"Finish"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"add-the-inference-connector-to-your-project",children:"Add the Inference Connector to Your Project"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["If you have not installed the Inference Connector, ",(0,s.jsx)(n.a,{href:"https://mac-project.ai/docs/mac-inference/getting-started",children:"install it"})," before you start."]}),"\n",(0,s.jsx)(n.li,{children:"Add the Inference Connector dependency to the Mule Project."}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-xml",children:"<dependency>\n  <groupId>com.mulesoft.connectors</groupId>\n  <artifactId>mac-inference-chain</artifactId>\n  <version>0.1.0</version>\n  <classifier>mule-plugin</classifier>\n</dependency>\n"})}),"\n",(0,s.jsxs)(n.ol,{start:"3",children:["\n",(0,s.jsxs)(n.li,{children:["Make sure the Inference Connector is present in the Mule Palette.\n",(0,s.jsx)(n.img,{alt:"Mule Palette",src:i(74584).A+"",width:"1646",height:"488"})]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"implement-the-chat-completions-endpoint",children:"Implement the Chat Completions Endpoint"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Go to the scaffolded flow ",(0,s.jsx)(n.code,{children:"post:\\chat\\completions:application\\json:llm-open-connector-config"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Drag and drop ",(0,s.jsx)(n.code,{children:"Chat completions"})," operation from the Inference Connector into the Flow."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Provide the Inference connector configuration for Cerebras."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Parametrize all properties needed by the LLM Open Connector API Spec.\n",(0,s.jsx)(n.img,{alt:"Configuration Params",src:i(24906).A+"",width:"1258",height:"726"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["In the ",(0,s.jsx)(n.code,{children:"Chat completions"})," operation, enter: ",(0,s.jsx)(n.code,{children:"payload.messages"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Before the ",(0,s.jsx)(n.code,{children:"Chat completions"})," operation, add the ",(0,s.jsx)(n.code,{children:"Set Variable"})," operation with the name ",(0,s.jsx)(n.code,{children:"model"})," and enter in the expression value ",(0,s.jsx)(n.code,{children:"payload.model"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["After the ",(0,s.jsx)(n.code,{children:"Chat completions"})," operation, add the ",(0,s.jsx)(n.code,{children:"Transform Message"})," operation and provide the mapping in this code block:"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'%dw 2.0\noutput application/json\n---\n{\n\tid: "chatcmpl-" ++ now() as Number as String,\n\tcreated: now() as Number,\n\tusage: {\n\t\tcompletion_tokens: attributes.tokenUsage.outputCount,\n\t\tprompt_tokens: attributes.tokenUsage.inputCount,\n\t\ttotal_tokens: attributes.tokenUsage.totalCount\n\t},\n\tmodel: vars.model,\n\tchoices: [\n    \t{\n      finish_reason: "stop",\n      index: 0,\n      message: {\n        content: payload.response default "",\n        role: "assistant"\n      }\n    }\n  ],\n\tobject: "chat.completion"\n}\n'})}),"\n",(0,s.jsxs)(n.ol,{start:"8",children:["\n",(0,s.jsx)(n.li,{children:"Save the project."}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"test-locally",children:"Test Locally"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Start the Mule Application."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Go to the API Console.\n",(0,s.jsx)(n.img,{alt:"Configuration Params",src:i(29512).A+"",width:"3078",height:"1514"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Enter the API Key and following payload:"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "messages": [\n    {\n      "content": "What is the capital of Switzerland?",\n      "role": "user",\n      "name": ""\n    }\n  ],\n  "model": "llama3.1-8b",\n  "max_tokens": 500,\n  "n": 1,\n  "temperature": 0.7,\n  "parameters": {\n    "top_p": 0.5\n  }\n}\n'})}),"\n",(0,s.jsxs)(n.ol,{start:"4",children:["\n",(0,s.jsx)(n.li,{children:"Validate the result. Make sure the values are mapped correctly for token usage."}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "id": "chatcmpl-1732373228",\n  "created": 1732373228,\n  "usage": {\n    "completion_tokens": 8,\n    "prompt_tokens": 42,\n    "total_tokens": 50\n  },\n  "model": "llama3.1-8b",\n  "choices": [\n    {\n      "finish_reason": "stop",\n      "index": 0,\n      "message": {\n        "content": "The capital of Switzerland is Bern.",\n        "role": "assistant"\n      }\n    }\n  ],\n  "object": "chat.completion"\n}\n'})}),"\n",(0,s.jsx)(n.h2,{id:"step-4-deploy-to-anypoint-cloudhub",children:"Step 4. Deploy to Anypoint CloudHub"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"After the application is tested successfully, deploy it to Anypoint CloudHub."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Right-click your Mule Project and navigate to ",(0,s.jsx)(n.code,{children:"Anypoint Platform"})," > ",(0,s.jsx)(n.code,{children:"Deploy to CloudHub"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Choose the environment you want to deploy to."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Enter the required values:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["App name: ",(0,s.jsx)(n.code,{children:"cerebras-llm-provider"})]}),"\n",(0,s.jsxs)(n.li,{children:["Deployment target: ",(0,s.jsx)(n.code,{children:"Shared Space (Cloudhub 2.0)"})]}),"\n",(0,s.jsxs)(n.li,{children:["Replica Count: ",(0,s.jsx)(n.code,{children:"1"})]}),"\n",(0,s.jsxs)(n.li,{children:["Replica Size: ",(0,s.jsx)(n.code,{children:"Micro (0.1 vCore)"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click ",(0,s.jsx)(n.strong,{children:"Deploy Application"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Wait until the application is deployed."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Deployed App",src:i(72327).A+"",width:"2472",height:"450"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["If you receive the error ",(0,s.jsx)(n.code,{children:"[The asset is invalid, Error while trying to set type: app. Expected type is: rest-api.]"}),", go to Exchange and delete or rename the asset. ",(0,s.jsx)(n.a,{href:"https://help.salesforce.com/s/articleView?id=001119384&type=1",children:"This error is a known issue"}),"."]})}),"\n",(0,s.jsx)(n.h2,{id:"create-a-configuration-in-model-builder",children:"Create a Configuration in Model Builder"}),"\n",(0,s.jsx)(n.p,{children:"After your API is running on CloudHub, you need to add the model endpoint to Model Builder."}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"In Salesforce, open Data Cloud."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Navigate to Einstein Studio."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click ",(0,s.jsx)(n.strong,{children:"Add Foundation Model"}),", and click ",(0,s.jsx)(n.strong,{children:"Connect to your LLM"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click ",(0,s.jsx)(n.strong,{children:"Next"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Enter the required values:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Name: ",(0,s.jsx)(n.code,{children:"Cerebras-LLM-Provider"})]}),"\n",(0,s.jsxs)(n.li,{children:["URL: ",(0,s.jsx)(n.code,{children:"<cloudhub_url>/api"})]}),"\n",(0,s.jsxs)(n.li,{children:["Model: A model name is required. For this recipe, choose between ",(0,s.jsx)(n.code,{children:"llama3.1-70b"})," or ",(0,s.jsx)(n.code,{children:"llama3.1-8b"}),"."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Model Builder",src:i(14175).A+"",width:"1934",height:"1368"})}),"\n",(0,s.jsxs)(n.ol,{start:"6",children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click ",(0,s.jsx)(n.strong,{children:"Connect"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Create two configurations for each supported model:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"llama3.1-70b"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"llama3.1-8b"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Model Builder Playground",src:i(88876).A+"",width:"2526",height:"712"})}),"\n",(0,s.jsx)(n.h2,{id:"important-considerations",children:"Important Considerations"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["This cookbook uses Cerebras models ",(0,s.jsx)(n.code,{children:"llama3.1-70b"})," and ",(0,s.jsx)(n.code,{children:"llama3.1-8b"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"When configuring in Model Builder, you need to provide a default value for the model. In this recipe the model name is parametrized, so a value is required."}),"\n",(0,s.jsxs)(n.li,{children:["The API is deployed under the governance of the MuleSoft Anypoint Platform. As a result:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"You can monitor the application by viewing logs and errors."}),"\n",(0,s.jsx)(n.li,{children:"You can apply additional security through Anypoint's API management capabilities."}),"\n",(0,s.jsx)(n.li,{children:"You can deploy multiple replicas to scale horizontally and vertically."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,s.jsx)(n.p,{children:"This cookbook demonstrates how to set up an LLM Open Connector using MuleSoft for the Chat Completion endpoints of Cerebras. This recipe is a sandbox implementation, and it's not production ready. For production use, please optimize your implementation based on your specific requirements and expected usage patterns."})]})}function m(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}},14175:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/mule-mac-add-model-einstein-studio-0e18449420dc98913e5dd770624941a0.png"},24906:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/mule-mac-configuration-params-9f210cb3b6f7d130b0f7e50f976c669d.png"},72327:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/mule-mac-deployed-app-97551247b0b0376e116cf1c7d79bad6f.png"},88876:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/mule-mac-einstein-playground-1d93a24bf794f7eff3e36defedc68e59.png"},74584:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/mule-mac-mule-palette-inference-886e3601bcb50893d59153ec3aa41f26.png"},21660:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/mule-mac-process-1f818868c9d627edee9bd28d6edf4137.png"},39733:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/mule-mac-publish-provider-asset-f322ef300d69906f1f42290c3e29eb12.png"},41670:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/mule-mac-publish-to-exchange-5f2371e21ff7627d719821991c146112.png"},25345:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/mule-mac-scaffold-7519e545c56ada1d03f6beac23bd177f.png"},29512:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/mule-mac-test-locally-c3f2131055d7d4f5fbff7f11f7813a16.png"}}]);