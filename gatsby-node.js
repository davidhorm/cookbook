const createIngredientsSchema = (createTypes, schema) => {
  const typeDefs = [
    schema.buildObjectType({
      name: 'Mdx',
      fields: {
        exports: 'MdxExports!',
      },
      interfaces: ['Node'],
      extensions: {
        infer: true,
      },
    }),
    schema.buildObjectType({
      name: 'MdxExports',
      fields: {
        ingredients: {
          type: '[String!]!',
          resolve(source) {
            return Object.values(source.i ? source.i : {});
          },
        },
      },
    }),
  ];
  createTypes(typeDefs);
};

exports.createSchemaCustomization = ({ actions: { createTypes }, schema }) => {
  createIngredientsSchema(createTypes, schema);
};
