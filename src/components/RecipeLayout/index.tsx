import { MDXProvider } from '@mdx-js/react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import Layout from '../Layout';
import { useRecipeImages } from './use-recipe-image';

const shortCodes = { Link, graphql }; // Provide common components here
export const RecipeLayout = ({
  children,
  pageContext: {
    frontmatter: { title, imageAlt },
  },
  data,
}) => {
  const edges = useRecipeImages();
  const {
    node: {
      frontmatter: {
        image: {
          childImageSharp: { fluid },
        },
      },
    },
  } = edges.filter((edge) => edge.node.frontmatter.title === title)[0];

  return (
    <MDXProvider components={shortCodes}>
      <Layout>
        <Img fluid={fluid} alt={imageAlt} />
        <h1>{title}</h1>
        {children}
      </Layout>
    </MDXProvider>
  );
};

export default RecipeLayout;
