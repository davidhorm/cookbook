import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import React from 'react';

const activeStep = 0;

const navigateToHeaderId = (headerId: string) => console.log(headerId);

type props = {
  /** List of header ids. */
  headerIds: string[];
};
const SectionNav = ({ headerIds }: props) => (
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
