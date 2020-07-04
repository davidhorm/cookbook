import { getHeaderId, getIngredientsProperties } from './recipe-layout.service';

describe('Parse children prop', () => {
  const componentInlineText: React.ReactNodeArray = [
    {
      props: {
        originalType: 'p',
        mdxType: 'p',
        children: [
          'Text with inline component',
          { props: { amount: '1', unit: 'teaspoons', name: 'pepper', mdxType: 'Ingredient' } },
          'Lorem ipsum dolor sit amet.',
        ],
      },
    },
  ];

  const expectedComponentInlineText = [{ amount: '1', unit: 'teaspoons', name: 'pepper' }];

  const children: React.ReactNodeArray = [
    { props: { originalType: 'h1', mdxType: 'h1', children: 'Header Text' } },
    ...componentInlineText,
    { props: { amount: '2', unit: 'cups', name: 'water', mdxType: 'Ingredient' } },
    { props: { amount: '3', unit: 'tablespoons', name: 'salt', mdxType: 'Ingredient' } },
  ];

  const expectedIngredientsProperties = [
    ...expectedComponentInlineText,
    { amount: '2', unit: 'cups', name: 'water' },
    { amount: '3', unit: 'tablespoons', name: 'salt' },
  ];

  describe('getIngredientsProperties()', () => {
    it('should return <Ingredient /> props if inline', () => {
      const actual = getIngredientsProperties(componentInlineText);
      expect(actual).toEqual(expectedComponentInlineText);
    });

    it('should return prop values of all <Ingredient /> components', () => {
      const actual = getIngredientsProperties(children);
      expect(actual).toEqual(expectedIngredientsProperties);
    });
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
