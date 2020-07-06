import React from 'react';

export const useSectionHeaderEffects = (headerIds: string[]) => {
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = (event: Event) => {
      console.log(event);
      const index = headerIds
        .map((headerId) => (document.querySelector(`#${headerId}`)?.getBoundingClientRect().top || 0) <= 16) // 16px = 1em
        .lastIndexOf(true);
      setActiveStep(index);
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('click', handleScroll);
  }, [headerIds]);

  /**
   * Scroll to header id anchor.
   * @param headerId - header id.
   */
  const scrollToHeaderId = (headerId: string) => {
    if (headerId) {
      const element = document.querySelector(`#${headerId}`);
      element?.scrollIntoView({ behavior: 'smooth' });

      const index = headerIds.indexOf(headerId);
      setActiveStep(index);
    }
  };

  return [activeStep, scrollToHeaderId];
};
