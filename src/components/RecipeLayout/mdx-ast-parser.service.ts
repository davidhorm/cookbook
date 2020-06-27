import { MdxAst } from '../../queries/use-recipe-metadata';

/** Filter by Ingredient JSX component. */
const getIngredientElements = ({ type, name }: MdxAst) => type === 'mdxBlockElement' && name === 'Ingredient';

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
  mdxAST?.children?.filter(getIngredientElements).map(getAttributeNameValuePairs).map(combineNameValuePairs) || [];
