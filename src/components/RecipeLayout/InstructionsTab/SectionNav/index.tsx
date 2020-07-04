import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import React from 'react';

type props = {
  /** List of header ids. */
  headerIds: string[];

  activeStep: number;
  navigateToHeaderId: Function;
};
const SectionNav = ({ headerIds, activeStep, navigateToHeaderId }: props) => (
  <nav>
    <Stepper activeStep={activeStep} orientation="vertical">
      {headerIds.map((headerId) => (
        <Step key={headerId}>
          <StepLabel onClick={() => navigateToHeaderId(headerId)}></StepLabel>
        </Step>
      ))}
    </Stepper>
  </nav>
);

export { SectionNav };

