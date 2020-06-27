import Slider from '@material-ui/core/Slider';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Img from 'gatsby-image';
import React from 'react';
import { Frontmatter, parseRecipeMetadata, useRecipeMetadata } from '../../queries/use-recipe-metadata';
import Layout from '../Layout';
import { InformationTab, InformationTabPanel } from './InformationTab';
import { IngredientsTab, IngredientsTabPanel } from './IngredientsTab';
import { InstructionsTab, InstructionsTabPanel } from './InstructionsTab';
import { getIngredientsAttributes } from './mdx-ast-parser.service';
import { RecipeSchema } from './RecipeSchema';

type props = {
  pageContext: {
    frontmatter: Frontmatter;
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
  const { servings, recipeYield, fluid, mdxAST, changeTime } = parseRecipeMetadata(edge);

  const [tabIndex, setTabIndex] = React.useState(0);
  const [adjustedServings, setAdjustedServings] = React.useState(servings);

  return (
    <Layout>
      <RecipeSchema
        name={title}
        imageSrc={fluid.src}
        datePublished={changeTime}
        servings={servings}
        recipeYield={recipeYield}
      />
      <Img fluid={fluid} alt={imageAlt} />
      <h1>{title}</h1>
      {servings && (
        <>
          <Typography id="servings" style={{ marginBottom: '2em' }} gutterBottom>
            Servings
          </Typography>
          <Slider
            marks
            defaultValue={servings}
            min={1}
            max={24}
            aria-labelledby="servings"
            valueLabelDisplay="on"
            onChange={(_, value) => setAdjustedServings(Array.isArray(value) ? value[0] : value)}
          />
        </>
      )}
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
      <IngredientsTabPanel
        hidden={tabIndex !== 0}
        ratio={adjustedServings / servings}
        ingredientsAttributes={getIngredientsAttributes(mdxAST)}
      />
      <InstructionsTabPanel hidden={tabIndex !== 1} ratio={adjustedServings / servings}>
        {children}
      </InstructionsTabPanel>
      <InformationTabPanel hidden={tabIndex !== 2} />
    </Layout>
  );
};

export default RecipeLayout;
