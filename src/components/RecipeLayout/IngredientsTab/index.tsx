import Tab from '@material-ui/core/Tab';
import ListIcon from '@material-ui/icons/List';
import React from 'react';

const tabId = 'ingredient-tab';
const tabPanelId = 'ingredient-tabpanel';

export const IngredientsTab = ({ ...other }) => (
  <Tab label="Ingredients" id={tabId} aria-controls={tabPanelId} icon={<ListIcon />} {...other} />
);

type props = {
  hidden: boolean;
};
export const IngredientsTabPanel = ({ hidden }: props) => (
  <section role="tabpanel" hidden={hidden} id={tabPanelId} aria-labelledby={tabId}>
    Ingredient TODO
  </section>
);
