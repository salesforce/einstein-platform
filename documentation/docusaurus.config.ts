import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
const path = require("path");

const config: Config = {
  // Site title for the Agentforce companion docs hub (rebrand from Einstein).
  title: "Agentforce Companion Resources",
  tagline:
    "Open-source examples and API specs for building with the Einstein Platform from Salesforce.",

  // Set the production url of your site here
  url: "https://opensource.salesforce.com/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/einstein-platform/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  deploymentBranch: "gh-pages",
  organizationName: "salesforce", // Usually your GitHub org/user name.
  projectName: "einstein-platform", // Usually your repo name.
  trailingSlash: false,

  // Link checking
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // Docs are served at /docs. The API specs (redocusaurus, below) also
          // live under /docs/apis/*; the two coexist on distinct sub-paths.
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          path: "cookbook",
          // Blog is rooted at "/" so recipe posts keep their original
          // root-level URLs (/about, /huggingface, /aws, …). The site root "/"
          // is rendered by the swizzled src/theme/BlogListPage hub; the full
          // scrollable post list stays available at the auto-generated /archive.
          routeBasePath: "/",
          blogDescription:
            "Example code for building with the Einstein Platform",
          blogTitle: "Recipes",
          blogSidebarCount: 15,
          blogSidebarTitle: "Recent Recipes",
          postsPerPage: "ALL",
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "ignore",
          sortPosts: "ascending",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        googleTagManager: {
          containerId: "GTM-PBBJDJ9C",
        },
      } satisfies Preset.Options,
    ],
    [
      "redocusaurus",
      {
        config: path.join(__dirname, "redocly.yaml"),
        // Plugin Options for loading OpenAPI files
        specs: [
          {
            id: "llm-open-connector",
            spec: "../api-specs/llm-open-connector/llm-open-connector.yml",
            route: "/docs/apis/llm-open-connector",
          },
          {
            id: "llm-gateway",
            spec: "../api-specs/models/models.yaml",
            route: "/docs/apis/models",
          },
        ],
      },
    ],
  ],

  themes: [
    "@docusaurus/theme-mermaid",
    // ... Your other themes.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // ... Your options.
        ignoreFiles: [],
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        indexBlog: true,
        indexDocs: false,
        blogDir: "cookbook",
        blogRouteBasePath: "/",
      },
    ],
  ],

  themeConfig: {
    blog: {
      sidebar: {
        groupByYear: false,
      },
    },
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Agentforce Companion Resources",
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          label: "Voice Guide",
          position: "left",
        },
        { to: "/about", label: "Open Connector Recipes", position: "left" },
        {
          type: "dropdown",
          label: "API Specs",
          items: [
            {
              label: "LLM Open Connector",
              to: "/docs/apis/llm-open-connector/",
            },
            {
              label: "Models API",
              to: "/docs/apis/models/",
            },
          ],
        },
        {
          href: "https://github.com/salesforce/einstein-platform",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Einstein Platform Cookbook",
          items: [
            {
              label: "Recent Recipes",
              to: "/about",
            },
            {
              label: "LLM Open Connector API Spec",
              to: "/docs/apis/llm-open-connector",
            },
            {
              label: "Models API Spec",
              to: "/docs/apis/models",
            },
            {
              label: "Cookie Settings",
              to: "#",
            },
          ],
        },
        {
          title: "Salesforce Developers",
          items: [
            {
              label: "Models API Dev Guide",
              href: "https://developer.salesforce.com/docs/einstein/genai/guide/models-api.html",
            },
          ],
        },
        {
          title: "Salesforce Help",
          items: [
            {
              label: "Einstein Generative AI",
              href: "https://help.salesforce.com/s/articleView?id=sf.generative_ai_about.htm",
            },
            {
              label: "Agentforce",
              href: "https://help.salesforce.com/s/articleView?id=sf.copilot_intro.htm",
            },
            {
              label: "Model Builder",
              href: "https://help.salesforce.com/s/articleView?id=sf.c360_a_ai_use_ai_models.htm",
            },
            {
              label: "Prompt Builder",
              href: "https://help.salesforce.com/s/articleView?id=sf.prompt_builder_about.htm",
            },
          ],
        },
        {
          title: "GitHub",
          items: [
            {
              label: "Einstein Platform Repo",
              href: "https://github.com/salesforce/einstein-platform",
            },
          ],
        },
      ],
      copyright: `<div class="margin-top--xl"><small>Copyright © ${new Date().getFullYear()} Salesforce, Inc. All rights reserved. Various trademarks held by their respective owners. <br />Salesforce, Inc. Salesforce Tower, 415 Mission Street, 3rd Floor, San Francisco, CA 94105, United States.</small></div>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
