"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[8121],{31676:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var r=o(74848),t=o(28453);const i={slug:"sambanova",authors:["rsexton"],tags:["heroku","llm-open-connector","sambanova"],date:new Date("2024-09-15T00:00:00.000Z")},s="LLM Open Connector + SambaNova",l={permalink:"/einstein-platform/sambanova",source:"@site/cookbook/llm-open-connector-sambanova.md",title:"LLM Open Connector + SambaNova",description:"Learn how to implement Salesforce's LLM Open Connector with the SambaNova platform for fast AI inference. We also cover how to deploy the connector as a Flask app on Heroku with a simple web UI for testing.",date:"2024-09-15T00:00:00.000Z",tags:[{inline:!1,label:"heroku",permalink:"/einstein-platform/tags/heroku"},{inline:!1,label:"llm-open-connector",permalink:"/einstein-platform/tags/llm-open-connector"},{inline:!1,label:"sambanova",permalink:"/einstein-platform/tags/sambanova"}],readingTime:3.73,hasTruncateMarker:!0,authors:[{name:"Richard",title:"Technical Writer @ Salesforce",url:"https://github.com/rsexton404",page:{permalink:"/einstein-platform/authors/rsexton"},socials:{github:"https://github.com/rsexton404"},imageURL:"https://github.com/rsexton404.png",key:"rsexton"}],frontMatter:{slug:"sambanova",authors:["rsexton"],tags:["heroku","llm-open-connector","sambanova"],date:"2024-09-15T00:00:00.000Z"},unlisted:!1,prevItem:{title:"LLM Open Connector + Groq",permalink:"/einstein-platform/groq"},nextItem:{title:"LLM Open Connector + watsonx",permalink:"/einstein-platform/ibm"}},a={authorsImageUrls:[void 0]},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Set Up Your Local Environment",id:"set-up-your-local-environment",level:2},{value:"Configure Your Local Environment",id:"configure-your-local-environment",level:2},{value:"Test Your Application Locally",id:"test-your-application-locally",level:2},{value:"Prepare for Heroku Deployment",id:"prepare-for-heroku-deployment",level:2},{value:"Update Your Default Branch",id:"update-your-default-branch",level:2},{value:"Deploy to Heroku",id:"deploy-to-heroku",level:2},{value:"Test Your Deployed Application",id:"test-your-deployed-application",level:2},{value:"Conclusion",id:"conclusion",level:2}];function h(e){const n={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.p,{children:["Learn how to implement Salesforce's ",(0,r.jsx)(n.a,{href:"/docs/apis/llm-open-connector/",children:"LLM Open Connector"})," with the ",(0,r.jsx)(n.a,{href:"https://sambanova.ai/",children:"SambaNova"})," platform for fast AI inference. We also cover how to deploy the connector as a Flask app on Heroku with a simple web UI for testing."]}),"\n",(0,r.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,r.jsx)(n.p,{children:"Before you begin, make sure that your local environment meets these prerequisites."}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Python 3.9 or later installed on your local machine"}),"\n",(0,r.jsxs)(n.li,{children:["A Heroku account (sign up at ",(0,r.jsx)(n.a,{href:"https://signup.heroku.com/",children:"https://signup.heroku.com/"}),")"]}),"\n",(0,r.jsxs)(n.li,{children:["Heroku CLI installed (",(0,r.jsx)(n.a,{href:"https://devcenter.heroku.com/articles/heroku-cli",children:"https://devcenter.heroku.com/articles/heroku-cli"}),")"]}),"\n",(0,r.jsx)(n.li,{children:"Git installed on your local machine"}),"\n",(0,r.jsxs)(n.li,{children:["A SambaNova API key (sign up at ",(0,r.jsx)(n.a,{href:"https://sambanova.ai/",children:"https://sambanova.ai/"}),")"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"set-up-your-local-environment",children:"Set Up Your Local Environment"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Create a new directory for your project:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"mkdir llm-open-connector\ncd llm-open-connector\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Create a virtual environment and activate it:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"python -m venv venv\nsource venv/bin/activate  # On Windows, use `venv\\Scripts\\activate`\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Download these files from the einstein-platform repository:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/salesforce/einstein-platform/tree/main/documentation/cookbook-assets/llm-open-connector-sambanova/.gitignore",children:".gitignore"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/salesforce/einstein-platform/tree/main/documentation/cookbook-assets/llm-open-connector-sambanova/app.py",children:"app.py"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/salesforce/einstein-platform/tree/main/documentation/cookbook-assets/llm-open-connector-sambanova/index.html",children:"index.html"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/salesforce/einstein-platform/tree/main/documentation/cookbook-assets/llm-open-connector-sambanova/Procfile",children:"Procfile"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/salesforce/einstein-platform/tree/main/documentation/cookbook-assets/llm-open-connector-sambanova/requirements.txt",children:"requirements.txt"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/salesforce/einstein-platform/tree/main/documentation/cookbook-assets/llm-open-connector-sambanova/runtime.txt",children:"runtime.txt"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Copy the downloaded files into your project directory."}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Install the required packages:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"pip install -r requirements.txt\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"configure-your-local-environment",children:"Configure Your Local Environment"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["For local testing, create a ",(0,r.jsx)(n.code,{children:".env"})," file in your project directory and add your API key:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"API_KEY=your_api_key_here\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Replace ",(0,r.jsx)(n.code,{children:"your_api_key_here"})," with your actual API key."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Make sure your ",(0,r.jsx)(n.code,{children:".gitignore"})," file includes the ",(0,r.jsx)(n.code,{children:".env"})," file to avoid accidentally committing sensitive information."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"test-your-application-locally",children:"Test Your Application Locally"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Run your Flask application:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"python app.py\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Your app should now be running on ",(0,r.jsx)(n.code,{children:"http://127.0.0.1:5000/"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Test the endpoints using a tool like cURL or Postman to ensure they're working correctly."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["To test the ",(0,r.jsx)(n.code,{children:"chat/completions"})," endpoint, run this cURL command:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'curl -X POST http://127.0.0.1:5000/chat/completions \\\n-H "Content-Type: application/json" \\\n-d \'{\n  "model": "Meta-Llama-3.1-8B-Instruct",\n  "messages": [\n    {"role": "system", "content": "You are a helpful assistant."},\n    {"role": "user", "content": "What is the capital of Canada?"}\n  ],\n  "temperature": 0.7,\n}\'\n'})}),"\n",(0,r.jsx)(n.h2,{id:"prepare-for-heroku-deployment",children:"Prepare for Heroku Deployment"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Initialize a Git repository in your project directory:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"git init\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Add your files to the repository:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"git add .\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Commit your changes:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'git commit -m "Initial commit"\n'})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"update-your-default-branch",children:"Update Your Default Branch"}),"\n",(0,r.jsxs)(n.p,{children:["To switch the default branch used to deploy apps from ",(0,r.jsx)(n.code,{children:"master"})," to ",(0,r.jsx)(n.code,{children:"main"}),", follow these steps:"]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Create a new branch locally:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"git checkout -b main\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Delete the old default branch locally:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"git branch -D master\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Now, the local environment only knows about the ",(0,r.jsx)(n.code,{children:"main"})," branch."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Reset the git repository on the Heroku Platform:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Use the ",(0,r.jsx)(n.code,{children:"heroku-reset"})," command from the ",(0,r.jsx)(n.code,{children:"heroku-repo"})," CLI plugin."]}),"\n",(0,r.jsx)(n.li,{children:"This will not impact the running application."}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Note:"})," Communicate this change with your team. If other developers are unaware of the reset, they might push to ",(0,r.jsx)(n.code,{children:"master"}),", overwriting the reset."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["To switch the default branch in GitHub, refer to this article: ",(0,r.jsx)(n.a,{href:"https://docs.github.com/en/github/administering-a-repository/setting-the-default-branch",children:"Setting the Default Branch"}),"."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"deploy-to-heroku",children:"Deploy to Heroku"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Make sure you're logged in to the Heroku CLI:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"heroku login\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Create a new Heroku app:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"heroku create your-app-name\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Replace ",(0,r.jsx)(n.code,{children:"your-app-name"})," with a unique name for your application."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Set the API_KEY config var on Heroku:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"heroku config:set API_KEY=your_api_key_here -a your-app-name\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Replace ",(0,r.jsx)(n.code,{children:"your_api_key_here"})," with your actual API key."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Deploy your app to Heroku:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"git push heroku main\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Open your deployed app:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"heroku open\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Your LLM Open Connector should now be deployed and accessible via the Heroku URL."}),"\n",(0,r.jsx)(n.h2,{id:"test-your-deployed-application",children:"Test Your Deployed Application"}),"\n",(0,r.jsx)(n.p,{children:"You can test your deployed application in two ways:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Using the example UI:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Open your browser and navigate to ",(0,r.jsx)(n.code,{children:"https://your-app-name.herokuapp.com"})]}),"\n",(0,r.jsx)(n.li,{children:"You'll see a simple interface where you can input prompts and get responses from the LLM"}),"\n",(0,r.jsx)(n.li,{children:"Try different prompts and get super fast responses!"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Using API endpoints:\nUse a tool like cURL or Postman to test the endpoints of your Flask app:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Chat Completions: ",(0,r.jsx)(n.code,{children:"POST https://your-app-name.herokuapp.com/chat/completions"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,r.jsx)(n.p,{children:"You have successfully created and deployed an LLM Open Connector using the SambaNova API and deployed it to Heroku! This connector adheres to the Salesforce LLM Open Connector API specification, allowing for seamless integration with the Einstein AI Platform using the BYOLLM feature."}),"\n",(0,r.jsx)(n.p,{children:"With this connector, you can bring new foundation models like Llama 3 into Einstein Studio that take advantage of SambaNova's fast inference platform."}),"\n",(0,r.jsx)(n.p,{children:"Remember to monitor your usage and costs associated with the SambaNova API, and consider implementing additional security measures, such as rate limiting, CORS restrictions, and user authentication, before using this connector in a production environment."})]})}function d(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},28453:(e,n,o)=>{o.d(n,{R:()=>s,x:()=>l});var r=o(96540);const t={},i=r.createContext(t);function s(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);