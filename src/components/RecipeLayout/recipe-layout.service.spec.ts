import { getHeaderId, getIngredientsProperties } from './recipe-layout.service';

describe('getIngredientsProperties()', () => {
  const componentInlineText: React.ReactNodeArray = [
    'Text with inline component',
    { props: { amount: '1', unit: 'teaspoons', name: 'pepper', mdxType: 'Ingredient' } },
    'Lorem ipsum dolor sit amet.',
  ];

  it('should return <Ingredent /> props if inline', () => {
    const actual = getIngredientsProperties(componentInlineText);
    expect(actual).toEqual([{ amount: '1', unit: 'teaspoons', name: 'pepper' }]);
  });

  it('should return prop values of all <Ingredient /> components', () => {
    const children: React.ReactNodeArray = [
      { props: { originalType: 'h1', mdxType: 'h1', children: 'Header Text' } },
      {
        props: {
          originalType: 'p',
          mdxType: 'p',
          children: componentInlineText,
        },
      },
      { props: { amount: '2', unit: 'cups', name: 'water', mdxType: 'Ingredient' } },
      { props: { amount: '3', unit: 'tablespoons', name: 'salt', mdxType: 'Ingredient' } },
    ];

    const expected = [
      { amount: '1', unit: 'teaspoons', name: 'pepper' },
      { amount: '2', unit: 'cups', name: 'water' },
      { amount: '3', unit: 'tablespoons', name: 'salt' },
    ];

    const actual = getIngredientsProperties(children);
    expect(actual).toEqual(expected);
  });
});

describe('getHeaderId()', () => {
  it('should format the header content as the id', () => {
    const actual = getHeaderId('HELLO WORLD ONE TWO');
    expect(actual).toBe('hello-world-one-two');
  });

  it('should return blank string if no value passed in', () => {
    const actual = getHeaderId();
    expect(actual).toBe('');
  });
});
