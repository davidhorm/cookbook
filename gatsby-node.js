const path = require('path');

const createMdxPages = async (graphql, reporter, createPage) => {
  const { data, errors } = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              title
            }
            parent {
              ... on File {
                relativeDirectory
              }
            }
          }
        }
      }
    }
  `);
  if (errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading `createMdxPages` query');
  }

  const recipes = data.allMdx.edges;

  recipes.forEach(({ node }, index) => {
    createPage({
      path: node.parent.relativeDirectory,
      // This component will wrap our MDX content
      component: path.resolve(`./src/components/RecipeLayout/index.tsx`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    });
  });
};

/**
 * Tell plugins to add pages. This extension point is called only after the initial sourcing
 * and transformation of nodes plus creation of the GraphQL schema are complete so you can
 * query your data in order to create pages.
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  await createMdxPages(graphql, reporter, createPage);
};
