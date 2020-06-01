import { MDXProvider } from '@mdx-js/react';
import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../Layout';

const shortCodes = { Link, graphql }; // Provide common components here

export const RecipeLayout = ({
  children,
  pageContext: {
    frontmatter: { title },
  },
}) => (
  <MDXProvider components={shortCodes}>
    <Layout>
      <h1>{title}</h1>
      {children}
    </Layout>
  </MDXProvider>
);

export default RecipeLayout;
