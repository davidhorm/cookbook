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

      /** Relative path to Recipe (without slash) */
      relativeDirectory: string;
    };
  };
};
/** Query all Recipe MDX files and their metadata. */
export const useRecipeMetadata = (): edge[] => {
  const result = useStaticQuery(graphql`
    query RecipeMetadata {
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
            parent {
              ... on File {
                birthtime
                relativeDirectory
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
