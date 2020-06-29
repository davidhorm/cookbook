import { MdxAst } from '../../queries/use-recipe-metadata';

/** Flatten children elements to a single level. */
const flattenElements = (accumulator: MdxAst[], currentValue: MdxAst): MdxAst[] => {
  const { type, name, attributes } = currentValue;
  const children = currentValue.children?.reduce(flattenElements, []) || [];
  return [...accumulator, { type, name, attributes }, ...children];
};

/** Filter by Ingredient JSX component. */
const getIngredientElements = ({ type, name }: MdxAst) =>
  (type === 'mdxBlockElement' || type === 'mdxSpanElement') && name === 'Ingredient';

/** Extract Name and Value pairs into array of objects. */
const getAttributeNameValuePairs = ({ attributes }: MdxAst) =>
  attributes?.map(({ name = '', value = '' }) => {
    return { [name]: name === 'amount' ? Number.parseInt(value, 10) || 0 : value };
  }) || [];

/** Combine array of objects into single object. */
const combineNameValuePairs = (nameValuePair: object[]) =>
  nameValuePair?.reduce((accumulator: object, currentValue: object) => ({ ...accumulator, ...currentValue }), {});

/** Get object to spread as <Ingredient /> props for each Ingredient in MDX. */
export const getIngredientsAttributes = (mdxAST: MdxAst) =>
  mdxAST?.children
    ?.reduce(flattenElements, [])
    .filter(getIngredientElements)
    .map(getAttributeNameValuePairs)
    .map(combineNameValuePairs) || [];

/** Convert the header content to the ID value. */
export const getHeaderId = (content?: string): string => content?.toLowerCase()?.replace(/(\s+)/g, '-') || '';
