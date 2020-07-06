import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  zeroPadding: {
    padding: 0,
  },
});

type props = {
  /** List of header ids. */
  headerIds: string[];

  /** Current Step to highlight. */
  activeStep: number;

  /** Callback to scroll to specific header id. */
  scrollToHeaderId: Function;
};
const SectionNav = ({
  className,
  hidden,
  headerIds,
  activeStep,
  scrollToHeaderId,
}: props & React.HTMLAttributes<HTMLElement>) => {
  const classes = useStyles();

  return (
    <nav className={className} hidden={hidden}>
      <Stepper activeStep={activeStep} orientation="vertical" nonLinear classes={{ root: classes.zeroPadding }}>
        {headerIds.map((headerId) => (
          <Step key={headerId}>
            <StepLabel onClick={() => scrollToHeaderId(headerId)} classes={{ iconContainer: classes.zeroPadding }} />
          </Step>
        ))}
      </Stepper>
    </nav>
  );
};

export { SectionNav };
