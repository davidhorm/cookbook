import Tabs from '@material-ui/core/Tabs';
import Img from 'gatsby-image';
import React from 'react';
import { useRecipeMetadata } from '../../queries/use-recipe-metadata';
import Layout from '../Layout';
import { InformationTab, InformationTabPanel } from './InformationTab';
import { IngredientsTab, IngredientsTabPanel } from './IngredientsTab';
import { InstructionsTab, InstructionsTabPanel } from './InstructionsTab';
import { RecipeSchema } from './RecipeSchema';

type PageContext = {
  frontmatter: {
    title: string;
    imageAlt: string;
  };
};

/**
 * Extract specific properties from props.
 */
const getProperties = (pageContext: PageContext, edges: ReturnType<typeof useRecipeMetadata>) => {
  const {
    frontmatter: { title, imageAlt },
  } = pageContext;
  const {
    node: {
      exports: { ingredients },
      frontmatter: {
        image: {
          childImageSharp: { fluid },
        },
      },
      parent: { changeTime },
    },
  } = edges.filter((edge) => edge.node.frontmatter.title === title)[0];

  return { title, imageAlt, ingredients, fluid, changeTime };
};

type props = {
  pageContext: PageContext;
  data: any;
};

/**
 * Layout for Recipe MDX files.
 */
export const RecipeLayout = ({ children, pageContext, data }: React.PropsWithChildren<props>) => {
  const edges = useRecipeMetadata();
  const { title, imageAlt, ingredients, fluid, changeTime } = getProperties(pageContext, edges);

  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <Layout>
      <RecipeSchema name={title} imageSrc={fluid.src} datePublished={changeTime} recipeIngredient={ingredients} />
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
