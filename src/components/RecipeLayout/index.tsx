import { MDXProvider } from '@mdx-js/react';
import { graphql, Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../Layout';
import { useRecipeMetadata } from './use-recipe-metadata';

type frontmatter = {
  title: string;
  imageAlt: string;
};

const getHelmet = ({ title }: frontmatter, fluid: FluidObject, birthtime: Date) => (
  <Helmet title={title}>
    <script type="application/ld+json">{`
      {
        "@context": "https://schema.org/",
        "@type": "Recipe",
        "name": "${title}",
        "image": [
          "${fluid.src}"
        ],
        "datePublished": "${birthtime}"
      }
    `}</script>
  </Helmet>
);

type props = {
  children: any;
  pageContext: {
    frontmatter: frontmatter;
  };
  data: any;
};

/**
 * Layout for Recipe MDX files.
 */
export const RecipeLayout = ({ children, pageContext: { frontmatter }, data }: props) => {
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
  } = edges.filter((edge) => edge.node.frontmatter.title === frontmatter.title)[0];

  return (
    <MDXProvider components={{ Link, graphql }}>
      {getHelmet(frontmatter, fluid, birthtime)}
      <Layout>
        <Img fluid={fluid} alt={frontmatter.imageAlt} />
        <h1>{frontmatter.title}</h1>
        {children}
      </Layout>
    </MDXProvider>
  );
};

export default RecipeLayout;
