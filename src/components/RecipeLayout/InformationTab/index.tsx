import Tab from '@material-ui/core/Tab';
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';

const tabId = 'information-tab';
const tabPanelId = 'information-tabpanel';

export const InformationTab = ({ ...other }) => (
  <Tab label="Information" id={tabId} aria-controls={tabPanelId} icon={<InfoIcon />} {...other} />
);

type props = {
  hidden: boolean;
};
export const InformationTabPanel = ({ hidden }: props) => (
  <section role="tabpanel" hidden={hidden} id={tabPanelId} aria-labelledby={tabId}>
    Information TODO
  </section>
);
