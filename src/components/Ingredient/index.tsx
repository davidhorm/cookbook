import React from 'react';

type props = {
  /** Quantity amount when ratio = 1. */
  amount: number;

  /** Quantity unit. */
  unit: string;

  /** Ratio of the quantity to print. */
  ratio: number;

  /** Name of the ingredient */
  name: string;
};

export const Ingredient = ({ amount, ratio, unit, name }: props) => (
  <b>
    {amount * ratio} {unit} of {name}
  </b>
);
