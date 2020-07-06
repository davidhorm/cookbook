import Tab from '@material-ui/core/Tab';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';
import React from 'react';
import { Ingredient } from '../../Ingredient';
import { getHeaderId, getHeaderIds } from '../recipe-layout.service';
import { useSectionHeaderEffects } from './section-header.effects';
import { SectionNav } from './SectionNav';
import './styles.css';

const tabId = 'instruction-tab';
const tabPanelId = 'instruction-tabpanel';

export const InstructionsTab = ({ ...other }) => (
  <Tab label="Instructions" id={tabId} aria-controls={tabPanelId} icon={<FastfoodIcon />} {...other} />
);

type props = {
  /** Set to `true` to hide panel content. */
  hidden: boolean;

  /** Ratio of the adjusted servings to the original servings. */
  ratio: number;
};
export const InstructionsTabPanel = ({ children, hidden, ratio }: React.PropsWithChildren<props>) => {
  const headerIds = getHeaderIds(children);
  const [activeStep, scrollToHeaderId] = useSectionHeaderEffects(headerIds);

  const shortCodes = {
    Link,
    Ingredient: (properties: any) => <Ingredient ratio={ratio} {...properties} />,
    // Convert MDX # into h3 for easier authoring
    h1: (properties: any) => (
      <h3 id={getHeaderId(properties.children)} {...properties}>
        {properties.children}
      </h3>
    ),
  };

  return (
    <section className="instructionTabPanel" role="tabpanel" hidden={hidden} id={tabPanelId} aria-labelledby={tabId}>
      <article className="instruction" hidden={hidden}>
        <MDXProvider components={shortCodes}>{children}</MDXProvider>
      </article>
      <SectionNav
        className="sectionNav stickyTop"
        hidden={hidden}
        headerIds={headerIds}
        activeStep={activeStep}
        scrollToHeaderId={scrollToHeaderId}
      />
    </section>
  );
};
