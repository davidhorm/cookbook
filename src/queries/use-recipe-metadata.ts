import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';

type edge = {
  node: {
    frontmatter: {
      /** Recipe title */
      title: string;

      /** Recipe image */
      image: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
    parent: {
      /** Recipe publish date */
      birthtime: Date;
    };
  };
};
export const useRecipeMetadata = (): edge[] => {
  const result = useStaticQuery(graphql`
    query RecipeMetadata {
      allMdx {
        edges {
          node {
            frontmatter {
              # Recipe Title
              title
              # Recipe Image
              image {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            parent {
              ... on File {
                # Recipe Publish Date
                birthtime
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error('🚨  ERROR: Loading "RecipeMetadata" query');
  }

  return result.allMdx.edges;
};
