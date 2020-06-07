const siteMetadata = {
  title: 'COOKBOOK',
  description: 'A personal collection of recipes.',
  author: 'David Horm',
  domain: 'https://davidhorm.github.io',
  pathPrefix: '/cookbook',
};

const mdxPlugins = [
  // Add support for *.mdx files in gatsby
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      // Use default layout on mdx files.
      defaultLayouts: {
        default: require.resolve('./src/components/RecipeLayout/index.tsx'),
      },
    },
  },
  // Automatically create pages with `.mdx` files in `src/recipes`.
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'pages',
      path: `${__dirname}/src/pages/`,
    },
  },
];

const imagePlugins = [
  // query files with GraphQL
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  // create multiples images of the right sizes and resolutions with a query
  `gatsby-transformer-sharp`,
  // powers the connections between Sharp and Gatsby Plugins
  `gatsby-plugin-sharp`,
];

const typescriptPlugin = {
  resolve: `gatsby-plugin-typescript`,
  options: {
    isTSX: true, // Forcibly enables jsx parsing.
    allExtensions: true, // Indicates that every file should be parsed as TS or TSX
  },
};

const eslintPlugin = {
  resolve: 'gatsby-plugin-eslint',
  options: {
    test: /\.js$|\.jsx$|\.ts$|\.tsx$/,
    exclude: /(node_modules|.cache|public)/,
    stages: ['develop'],
    options: {
      emitWarning: true,
      failOnError: false,
    },
  },
};

module.exports = {
  siteMetadata,
  plugins: [
    ...mdxPlugins,
    typescriptPlugin,
    eslintPlugin,
    ...imagePlugins,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
