import Tab from '@material-ui/core/Tab';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import React from 'react';

const tabId = 'instruction-tab';
const tabPanelId = 'instruction-tabpanel';

export const InstructionsTab = ({ ...other }) => (
  <Tab label="Instructions" id={tabId} aria-controls={tabPanelId} icon={<FastfoodIcon />} {...other} />
);

type props = {
  hidden: boolean;
};
export const InstructionsTabPanel = ({ children, hidden }: React.PropsWithChildren<props>) => (
  <section role="tabpanel" hidden={hidden} id={tabPanelId} aria-labelledby={tabId}>
    {children}
  </section>
);
