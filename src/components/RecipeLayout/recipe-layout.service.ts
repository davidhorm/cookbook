type IngredientElement = {
  amount: string;
  name: string;
  unit: string;
  mdxType: string;
};

/** Flatten children elements props to a single level. */
const flattenProperties = (accumulator: React.ReactNodeArray, currentValue: React.ReactNode): React.ReactNodeArray => {
  const element = currentValue as React.ReactElement;
  if (element && element.props) {
    const children: React.ReactNodeArray = element.props.children || [];
    const grandChildren: React.ReactNodeArray =
      (Array.isArray(children) && children.reduce(flattenProperties, [])) || [];
    return [...accumulator, element.props, ...grandChildren];
  }

  return accumulator;
};

/** Filter by Ingredient JSX component. */
const filterByIngredientType = (node: React.ReactNode) => (node as IngredientElement).mdxType === 'Ingredient';

/** Extract props from Ingredient JSX component. */
const extractProperties = (node: React.ReactNode) => {
  const { amount, name, unit } = node as IngredientElement;
  return { amount, name, unit };
};

/** Get array of object to spread as <Ingredient /> props for each Ingredient in MDX. */
export const getIngredientsProperties = (children: React.ReactNode) =>
  (children as React.ReactNodeArray)
    ?.reduce(flattenProperties, [])
    ?.filter(filterByIngredientType)
    .map(extractProperties) || [];

/** Convert the header content to the ID value. */
export const getHeaderId = (content?: string): string => content?.toLowerCase()?.replace(/(\s+)/g, '-') || '';
