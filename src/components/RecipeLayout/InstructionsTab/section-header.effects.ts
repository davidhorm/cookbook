import React from 'react';

export const useSectionHeaderEffects = (headerIds: string[]) => {
  const [activeStep, setActiveStep] = React.useState(0);

  // Keep track of which headers are visible
  React.useEffect(() => {
    // Create object where header ids are keys, and visibility is value
    const visibleHeaders = headerIds.reduce(
      (previousValue, currentValue) => ({ ...previousValue, [currentValue]: false }),
      {}
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const headerId = entry.target.id;
          Object.assign(visibleHeaders, { [headerId]: entry.isIntersecting });
        });
      },
      { threshold: 1 }
    );

    const headerElements = headerIds.map((headerId) => document.querySelector(`#${headerId}`));
    headerElements.forEach((target) => {
      if (target) {
        observer.observe(target);
      }
    });

    return () => {
      headerElements.forEach((target) => {
        if (target) {
          observer.unobserve(target);
        }
      });
    };
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
