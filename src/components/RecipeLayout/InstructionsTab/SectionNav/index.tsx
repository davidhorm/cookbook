import React from 'react';

type props = {
  headerIds: string[];
};

// TODO: https://material-ui.com/components/steppers/
const SectionNav = ({ headerIds }: props) => <nav>{headerIds.map((value) => value)}</nav>;

export { SectionNav };
