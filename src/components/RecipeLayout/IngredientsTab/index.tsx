import Tab from '@material-ui/core/Tab';
import ListIcon from '@material-ui/icons/List';
import React from 'react';
import { Ingredient } from '../../Ingredient';

const tabId = 'ingredient-tab';
const tabPanelId = 'ingredient-tabpanel';

export const IngredientsTab = ({ ...other }) => (
  <Tab label="Ingredients" id={tabId} aria-controls={tabPanelId} icon={<ListIcon />} {...other} />
);

type props = {
  hidden: boolean;
  ratio: number;
  ingredientsAttributes: object[];
};
export const IngredientsTabPanel = ({ hidden, ratio, ingredientsAttributes }: props) => (
  <section role="tabpanel" hidden={hidden} id={tabPanelId} aria-labelledby={tabId}>
    <ul>
      {ingredientsAttributes.map(({ amount, unit, name }: any) => (
        <li key={name}>
          <Ingredient ratio={ratio} amount={amount} unit={unit} name={name} />
        </li>
      ))}
    </ul>
  </section>
);
