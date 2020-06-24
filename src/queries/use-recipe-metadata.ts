import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';

type edge = {
  node: {
    exports: {
      /** List of ingredients */
      ingredients: string[];
    };
    frontmatter: {
      /** Recipe title */
      title: string;

      /** Number of servings produced by the recipe. */
      servings: number;

      /** Description of (non-servings) quantity produced by the recipe. (e.g. "1 loaf") */
      recipeYield: string;

      /** Recipe image */
      image: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
    parent: {
      /** Recipe publish date */
      changeTime: Date;

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
            exports {
              ingredients
            }
            frontmatter {
              title
              servings
              recipeYield
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
                changeTime
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

/** Parse and flatten the RecipeMetadata edge into single object of props. */
export const parseRecipeMetadata = ({
  node: {
    exports: { ingredients },
    frontmatter: {
      title,
      servings,
      recipeYield,
      image: {
        childImageSharp: { fluid },
      },
    },
    parent: { changeTime },
  },
}: edge) => ({
  title,
  servings,
  recipeYield,
  ingredients,
  fluid,
  changeTime,
});
