import React from 'react';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../../queries/use-site-metadata';

type props = {
  /** The name of the dish. */
  name: string;

  /**
   * Image URL of the completed dish.
   * - Images must be in .jpg, .png, or. gif format.
   * - For best results, provide multiple high-resolution images (minimum of 50K pixels when multiplying width and height) with the following aspect ratios: 16x9, 4x3, and 1x1.
   */
  imageSrc: string;

  /** The date the recipe was published. */
  datePublished: Date;

  /** The name of the person that wrote the recipe. Defaults to the author set in Site Metadata. */
  author?: string;

  /**
   * A short summary describing the dish.
   * description: string;
   *
   * The quantity produced by the recipe. Specify the number of servings produced from this recipe with just a number.
   * If you wish to use a different unit (for example, number of items), you may include additional yields.
   * recipeYield: string | string[];
   *
   * The time it takes to actually cook the dish. (PTaHbM format)
   * cookTime: string;
   *
   * The length of time it takes to prepare the dish. (PTaHbM format)
   * prepTime: string;
   *
   * The total time it takes to prepare the cook the dish
   * totalTime = cookTime + prepTime
   *
   * The type of meal or course your recipe is about. For example: "dinner", "main course", or "dessert, snack".
   * recipeCategory: string[];
   *
   * The region associated with your recipe. For example, "French", Mediterranean", or "American".
   * recipeCuisine: string;
   *
   * Other terms for your recipe such as the season ("summer"), the holiday ("Halloween"), or other descriptors ("quick", "easy", "authentic").
   * keywords: string[];
   *
   * List of ingredients (and amounts) used in the recipe.
   * recipeIngredient: string[];
   *
   * recipeInstructions? Or use HowToStep script within recipe itself?
   */
};

/**
 * Add Recipe Structured Data to the page.
 */
export const RecipeSchema = ({ name, imageSrc, datePublished, author }: props) => {
  const siteMetadata = useSiteMetadata();
  return (
    <Helmet title={name} titleTemplate={`%s | ${siteMetadata.title}`}>
      <script type="application/ld+json">{`
      {
        "@context": "https://schema.org/",
        "@type": "Recipe",
        "name": "${name}",
        "image": [
          "${siteMetadata.domain}${siteMetadata.pathPrefix}${imageSrc}"
        ],
        "author": {
          "@type": "Person",
          "name": "${author || siteMetadata.author}"
        },
        "datePublished": "${datePublished.toISOString()}"
      }
    `}</script>
    </Helmet>
  );
};
