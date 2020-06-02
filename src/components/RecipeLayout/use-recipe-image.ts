import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';

type edge = {
  node: {
    frontmatter: {
      title: string;
      image: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
  };
};
export const useRecipeImages = (): edge[] => {
  const result = useStaticQuery(graphql`
    query RecipeImages {
      allMdx {
        edges {
          node {
            frontmatter {
              title
              image {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error('🚨  ERROR: Loading "RecipeImages" query');
  }

  return result.allMdx.edges;
};
