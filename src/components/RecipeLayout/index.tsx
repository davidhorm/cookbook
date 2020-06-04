import { MDXProvider } from '@mdx-js/react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import Layout from '../Layout';
import { RecipeSchema } from './RecipeSchema';
import { useRecipeMetadata } from './use-recipe-metadata';

type props = {
  children: any;
  pageContext: {
    frontmatter: {
      title: string;
      imageAlt: string;
    };
  };
  data: any;
};

/**
 * Layout for Recipe MDX files.
 */
export const RecipeLayout = ({
  children,
  pageContext: {
    frontmatter: { title, imageAlt },
  },
  data,
}: props) => {
  const edges = useRecipeMetadata();
  console.log('edges', edges);
  const {
    node: {
      frontmatter: {
        image: {
          childImageSharp: { fluid },
        },
      },
      parent: { birthtime },
    },
  } = edges.filter((edge) => edge.node.frontmatter.title === title)[0];

  return (
    <MDXProvider components={{ Link, graphql }}>
      <RecipeSchema name={title} imageSrc={fluid.src} datePublished={birthtime} />
      <Layout>
        <Img fluid={fluid} alt={imageAlt} />
        <h1>{title}</h1>
        {children}
      </Layout>
    </MDXProvider>
  );
};

export default RecipeLayout;
