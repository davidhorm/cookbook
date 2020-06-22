import Tab from '@material-ui/core/Tab';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';
import React from 'react';
import { Ingredient } from '../../Ingredient';

const tabId = 'instruction-tab';
const tabPanelId = 'instruction-tabpanel';

export const InstructionsTab = ({ ...other }) => (
  <Tab label="Instructions" id={tabId} aria-controls={tabPanelId} icon={<FastfoodIcon />} {...other} />
);

type props = {
  hidden: boolean;
};
export const InstructionsTabPanel = ({ children, hidden }: React.PropsWithChildren<props>) => {
  const shortCodes = {
    Link,
    Ingredient: (properties: any) => <Ingredient ratio="1" {...properties} />,
  };

  // TODO: also add slider
  return (
    <section role="tabpanel" hidden={hidden} id={tabPanelId} aria-labelledby={tabId}>
      <MDXProvider components={shortCodes}>{children}</MDXProvider>
    </section>
  );
};
