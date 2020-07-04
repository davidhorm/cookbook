import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';

export type Frontmatter = {
  /** Recipe title */
  title: string;

  /** Number of servings produced by the recipe. */
  servings: number;

  /** Description of (non-servings) quantity produced by the recipe. (e.g. "1 loaf") */
  recipeYield: string;

  /** Alt text for the Recipe image */
  imageAlt: string;

  /** Recipe image */
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

type edge = {
  node: {
    frontmatter: Frontmatter;
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
            frontmatter {
              title
              servings
              recipeYield
              imageAlt
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
    frontmatter: {
      title,
      servings,
      recipeYield,
      imageAlt,
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
  fluid,
  imageAlt,
  changeTime,
});
