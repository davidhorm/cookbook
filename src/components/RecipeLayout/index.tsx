import { MDXProvider } from '@mdx-js/react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { useRecipeMetadata } from '../../queries/use-recipe-metadata';
import Layout from '../Layout';
import { RecipeSchema } from './RecipeSchema';

type props = {
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
}: React.PropsWithChildren<props>) => {
  const edges = useRecipeMetadata();
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
    <Layout>
      <RecipeSchema name={title} imageSrc={fluid.src} datePublished={birthtime} />
      <Img fluid={fluid} alt={imageAlt} />
      <h1>{title}</h1>
      <MDXProvider components={{ Link, graphql }}>{children}</MDXProvider>
    </Layout>
  );
};

export default RecipeLayout;
