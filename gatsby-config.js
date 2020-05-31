const mdxPlugins = [
  // Automatically create pages with `.mdx` files in `src/pages`.
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'pages',
      path: `${__dirname}/src/pages/`,
    },
  },
  'gatsby-plugin-mdx',
];

const imagePlugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  `gatsby-transformer-sharp`,
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
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
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
