import { MDXProvider } from '@mdx-js/react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import Layout from '../Layout';

const shortCodes = { Link, graphql }; // Provide common components here

export const RecipeLayout = ({
  children,
  pageContext: {
    frontmatter: { title },
  },
  data: { mdx },
}) => {
  return (
    <MDXProvider components={shortCodes}>
      <Layout>
        <Img fluid={mdx.frontmatter.image.childImageSharp.fluid} />
        <h1>{title}</h1>
        {children}
      </Layout>
    </MDXProvider>
  );
};

export default RecipeLayout;
