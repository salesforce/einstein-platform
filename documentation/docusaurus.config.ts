import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
const path = require("path");

const config: Config = {
  title: "Einstein Platform Cookbook",
  tagline:
    "Open-source examples and API specs for building with the Einstein Platform from Salesforce.",
  favicon: "img/favicon.ico",

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
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          path: "cookbook",
          routeBasePath: "cookbook",
          blogTitle: "Recipes",
          blogSidebarCount: 5,
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
      title: "Einstein Platform Cookbook",
      logo: {
        alt: "Einstein Platform Logo",
        src: "img/logo.svg",
      },
      items: [
        // {
        //   type: "docSidebar",
        //   sidebarId: "tutorialSidebar",
        //   position: "left",
        //   label: "Tutorial",
        // },
        // { to: "/blog", label: "Blog", position: "left" },
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
      // links: [
      //   {
      //     title: "Docs",
      //     items: [
      //       {
      //         label: "Tutorial",
      //         to: "/docs/intro",
      //       },
      //     ],
      //   },
      //   {
      //     title: "Community",
      //     items: [
      //       {
      //         label: "GitHub",
      //         href: "https://github.com/salesforce/einstein-platform",
      //       },
      //     ],
      //   },
      //   {
      //     title: "More",
      //     items: [
      //       {
      //         label: "Blog",
      //         to: "/blog",
      //       },
      //     ],
      //   },
      // ],
      copyright: `<small>Copyright © ${new Date().getFullYear()} Salesforce, Inc. All rights reserved. Various trademarks held by their respective owners. <br />Salesforce, Inc. Salesforce Tower, 415 Mission Street, 3rd Floor, San Francisco, CA 94105, United States.</small>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
