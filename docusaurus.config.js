/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'lsfusion documentation',
  tagline: 'lsfusion documentation',
  url: 'https://lsfusion.github.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'lsfusion', // Usually your GitHub org/user name.
  projectName: 'lsfusion.github.io', // Usually your repo name.
  trailingSlash: true,
  plugins: ['@docusaurus/plugin-google-analytics'],
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
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://ru.stackoverflow.com/questions/tagged/lsfusion',
            },
            {
              label: 'Slack',
              href: 'https://slack.lsfusion.org',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/lsfusion',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
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
      theme: require('prism-react-renderer/themes/nightOwlLight'),
      darkTheme: require('prism-react-renderer/themes/vsDark'),
      additionalLanguages: ['java'],
    },
    algolia: {
      apiKey: '1afce0f4e082c8214ae5af1774dec862',
      indexName: 'lsfusion',
      contextualSearch: true,
    },    
    googleAnalytics: {
      trackingID: 'UA-38678623-1',
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
          versions: {
            current: {
              label: '5 (Next)',
            },
            'v4': {
              label: '4.x',
            },
         },          
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/lsfusion/platform/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
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
