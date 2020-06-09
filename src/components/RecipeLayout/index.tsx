import Tabs from '@material-ui/core/Tabs';
import { MDXProvider } from '@mdx-js/react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { useRecipeMetadata } from '../../queries/use-recipe-metadata';
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
  const {
    node: {
      frontmatter: {
        image: {
          childImageSharp: { fluid },
        },
      },
      parent: { birthtime },
    },
  } = edges.filter((edge) => edge.node.frontmatter.title === title)[0];

  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <Layout>
      <RecipeSchema name={title} imageSrc={fluid.src} datePublished={birthtime} />
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
      <IngredientsTabPanel hidden={tabIndex !== 0} />
      <InstructionsTabPanel hidden={tabIndex !== 1}>
        <MDXProvider components={{ Link, graphql }}>{children}</MDXProvider>
      </InstructionsTabPanel>
      <InformationTabPanel hidden={tabIndex !== 2} />
      <div>tab index = {tabIndex}</div>
    </Layout>
  );
};

export default RecipeLayout;
