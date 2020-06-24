import Tabs from '@material-ui/core/Tabs';
import Img from 'gatsby-image';
import React from 'react';
import { parseRecipeMetadata, useRecipeMetadata } from '../../queries/use-recipe-metadata';
import Layout from '../Layout';
import { InformationTab, InformationTabPanel } from './InformationTab';
import { IngredientsTab, IngredientsTabPanel } from './IngredientsTab';
import { InstructionsTab, InstructionsTabPanel } from './InstructionsTab';
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
  const edge = edges.filter((edge) => edge.node.frontmatter.title === title)[0];
  const { servings, recipeYield, ingredients, fluid, changeTime } = parseRecipeMetadata(edge);

  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <Layout>
      <RecipeSchema
        name={title}
        imageSrc={fluid.src}
        datePublished={changeTime}
        servings={servings}
        recipeYield={recipeYield}
        recipeIngredient={ingredients}
      />
      <Img fluid={fluid} alt={imageAlt} />
      <h1>{title}</h1>
      <Tabs
        value={tabIndex}
        onChange={(event: React.ChangeEvent<{}>, newValue: number) => setTabIndex(newValue)}
        aria-label="Recipe Navigation Tabs"
        variant="fullWidth"
      >
        <IngredientsTab />
        <InstructionsTab />
        <InformationTab />
      </Tabs>
      <IngredientsTabPanel hidden={tabIndex !== 0} ingredients={ingredients} />
      <InstructionsTabPanel hidden={tabIndex !== 1}>{children}</InstructionsTabPanel>
      <InformationTabPanel hidden={tabIndex !== 2} />
    </Layout>
  );
};

export default RecipeLayout;
