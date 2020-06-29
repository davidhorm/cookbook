import { MdxAst } from '../../queries/use-recipe-metadata';
import { getHeaderId, getIngredientsAttributes } from './recipe-layout.service';

describe('getIngredientsAttributes()', () => {
  it('should return an empty array GIVEN an empty MdxAst object passed in', () => {
    const empty: MdxAst = { type: '' };
    const actual = getIngredientsAttributes(empty);
    expect(actual).toEqual([]);
  });

  describe('GIVEN valid Ingredient MdxAst object passed in', () => {
    const mockMdxAst: MdxAst = {
      type: 'root',
      children: [
        {
          type: 'mdxBlockElement',
          name: 'Ingredient',
          attributes: [
            {
              type: 'mdxAttribute',
              name: 'amount',
              value: '2',
            },
            {
              type: 'mdxAttribute',
              name: 'unit',
              value: 'cups',
            },
            {
              type: 'mdxAttribute',
              name: 'name',
              value: 'water',
            },
          ],
          children: [],
        },
      ],
    };

    const expected = [{ amount: 2, unit: 'cups', name: 'water' }];

    it('should parse <Ingredient /> props as an object', () => {
      const actual = getIngredientsAttributes(mockMdxAst);
      expect(actual).toEqual(expected);
    });

    it('should parse inline <Ingredient /> props', () => {
      const mockWithGrandchildren = JSON.parse(JSON.stringify(mockMdxAst));
      mockWithGrandchildren.children.push({
        type: 'paragraph',
        value: 'whatever',
        children: [
          {
            type: 'mdxSpanElement',
            name: 'Ingredient',
            attributes: [
              {
                type: 'mdxAttribute',
                name: 'amount',
                value: '3',
              },
              {
                type: 'mdxAttribute',
                name: 'unit',
                value: 'tablespoons',
              },
              {
                type: 'mdxAttribute',
                name: 'name',
                value: 'salt',
              },
            ],
            children: [],
          },
        ],
      });
      const expectedWithGrandchildren = [...expected, { amount: 3, unit: 'tablespoons', name: 'salt' }];
      const actual = getIngredientsAttributes(mockWithGrandchildren);
      expect(actual).toEqual(expectedWithGrandchildren);
    });

    it('should parse NaN amount value as 0', () => {
      const mockWithNaNAmountValue = JSON.parse(JSON.stringify(mockMdxAst));
      mockWithNaNAmountValue.children[0].attributes[0].value = 'fake value';

      const actual = getIngredientsAttributes(mockWithNaNAmountValue);
      const expectedWithNaNAmountValue = [{ ...expected[0], amount: 0 }];
      expect(actual).toEqual(expectedWithNaNAmountValue);
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
