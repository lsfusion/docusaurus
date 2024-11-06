/** @type {import('@docusaurus/types').DocusaurusConfig} */

import {themes as prismThemes} from 'prism-react-renderer';

module.exports = {
  title: 'lsfusion documentation',
  tagline: 'lsfusion documentation',
  url: 'https://lsfusion.github.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'ignore', // Should be updated to 'warn' in the future due to current functionality issues
  favicon: 'img/favicon.ico',
  organizationName: 'lsfusion', // Usually your GitHub org/user name.
  projectName: 'lsfusion.github.io', // Usually your repo name.
  deploymentBranch: 'master',
  trailingSlash: true,
  themeConfig: {
    navbar: {
      title: '',
//      hideOnScroll: true,
      logo: {
        alt: 'Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'Install',
          label: 'Install',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'Learn', 
          label: 'Learn',
          position: 'left',
        },
//        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/lsfusion/platform',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          // // Add additional dropdown items at the beginning/end of the dropdown.
          // dropdownItemsBefore: [],
          // dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },  
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'lsf docs',
              to: '/',
            },
            {
               label: 'Learning materials',
               href: 'https://lsfusion.org/ru/ed_materials',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Telegram',
              href: 'https://t.me/lsfusion_official',
            },
            {
              label: 'Slack',
              href: 'https://join.slack.com/t/lsfusion/shared_invite/zt-1itj7vlmf-9aBIP__nj9iMJglDaecqXg',
            },
            {
              label: 'Stack Overflow',
              href: 'https://ru.stackoverflow.com/questions/tagged/lsfusion',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Habr',
              href: 'https://habr.com/ru/company/lsfusion/blog/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/lsfusion/platform',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} lsFusion Foundation. Built with Docusaurus.`,
    },
    prism: {
      // theme: require('prism-react-renderer/themes/nightOwlLight'),
      // darkTheme: require('prism-react-renderer/themes/vsDark'),
      theme: prismThemes.nightOwlLight,
      darkTheme: prismThemes.vsDark,      
      additionalLanguages: ['bash', 'css', 'java', 'json'],
    },
    algolia: {
      appId: 'KNJZ5D60XY',
      apiKey: 'fb60cbd2d509692aa2646143b0dea6d5',
      indexName: 'lsfusion',
      contextualSearch: true,
    },    
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: function ({
                   locale,
                   version,
                   versionDocsDirPath,
                   docPath,
                   permalink,
                 }) {
                   if (version == 'current') {
                     return `https://github.com/lsfusion/platform/edit/master/docs/${locale}/${docPath}`;
                   } else {
                     return `https://github.com/lsfusion/platform/edit/${version}/docs/${locale}/${docPath}`;
                   } 
                 },
          editLocalizedFiles: true,
          routeBasePath: '/',
//          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: '6.x',
            },
            'v5': {
              label: '5.x',
            },
            'v4': {
              label: '4.x',
            },
         },          
        },
        blog: {
          showReadingTime: true,
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
          // Please change this to your repo.
          editUrl:
            'https://github.com/lsfusion/platform/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-38678623-1',
        },
        gtag: {
          trackingID: 'G-9PP67L9JM9',
        },
      },
    ],
  ],
  markdown: {
    format: 'mdx',
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true
    }
  },  
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      ru: {
        label: 'Русский',
      },
    },
  },  
};
