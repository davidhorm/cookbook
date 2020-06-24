import { render, waitFor } from '@testing-library/react';
import React from 'react';
import * as query from '../../queries/use-site-metadata';
import { RecipeSchema } from './RecipeSchema';

describe('<RecipeSchema>', () => {
  const mockSiteMetadata = Object.freeze({
    title: 'Site Title',
    description: 'Site Description',
    author: 'Site Author',
    domain: 'http://default-site.com',
    pathPrefix: '/defaultPath',
  });

  const mockRecipeMetadata = Object.freeze({
    name: 'Recipe Name',
    datePublished: new Date('1999-12-31'),
    imageSrc: '/recipe-image.jpg',
  });

  jest.spyOn(query, 'useSiteMetadata').mockImplementation().mockReturnValue(mockSiteMetadata);

  it(`should render <title> with Recipe's name, and Site's title`, async () => {
    render(<RecipeSchema {...mockRecipeMetadata} />);
    await waitFor(() => {
      expect(document.title).toBe(`${mockRecipeMetadata.name} | ${mockSiteMetadata.title}`);
    });
  });

  describe('Recipe Structured Data', () => {
    const structuredDataQuery = 'script[type="application/ld+json"]';
    const expectedDefaultRecipeSchemaObject = Object.freeze({
      '@context': 'https://schema.org/',
      '@type': 'Recipe',
      'name': mockRecipeMetadata.name,
      'author': {
        '@type': 'Person',
        'name': mockSiteMetadata.author,
      },
      'datePublished': mockRecipeMetadata.datePublished.toISOString(),
      'image': [`${mockSiteMetadata.domain}${mockSiteMetadata.pathPrefix}${mockRecipeMetadata.imageSrc}`],
    });

    it('should render default values GIVEN only required props', async () => {
      render(<RecipeSchema {...mockRecipeMetadata} />);
      await waitFor(() => {
        const actual = JSON.parse(document.querySelector(structuredDataQuery)?.textContent || '');
        expect(actual).toStrictEqual(expectedDefaultRecipeSchemaObject);
      });
    });

    it('should render author name GIVEN author props', async () => {
      render(<RecipeSchema {...mockRecipeMetadata} author="Another Gal" />);
      await waitFor(() => {
        const actual = JSON.parse(document.querySelector(structuredDataQuery)?.textContent || '');
        const author = {
          '@type': 'Person',
          'name': 'Another Gal',
        };
        expect(actual).toStrictEqual({ ...expectedDefaultRecipeSchemaObject, author });
      });
    });

    describe('recipeYield', () => {
      const servings = 6;
      const recipeYield = '1 loaf';

      it('should render array GIVEN both servings and recipeYield passed in as props', async () => {
        render(<RecipeSchema {...mockRecipeMetadata} servings={servings} recipeYield={recipeYield} />);
        await waitFor(() => {
          const actual = JSON.parse(document.querySelector(structuredDataQuery)?.textContent || '');
          expect(actual).toStrictEqual({ ...expectedDefaultRecipeSchemaObject, ...{ recipeYield: ['6', '1 loaf'] } });
        });
      });

      it('should render number GIVEN servings only passed in as prop', async () => {
        render(<RecipeSchema {...mockRecipeMetadata} servings={servings} />);
        await waitFor(() => {
          const actual = JSON.parse(document.querySelector(structuredDataQuery)?.textContent || '');
          expect(actual).toStrictEqual({ ...expectedDefaultRecipeSchemaObject, ...{ recipeYield: 6 } });
        });
      });

      it('should render string GIVEN recipeYield only passed in as prop', async () => {
        render(<RecipeSchema {...mockRecipeMetadata} recipeYield={recipeYield} />);
        await waitFor(() => {
          const actual = JSON.parse(document.querySelector(structuredDataQuery)?.textContent || '');
          expect(actual).toStrictEqual({ ...expectedDefaultRecipeSchemaObject, ...{ recipeYield: '1 loaf' } });
        });
      });
    });

    it('should render recipeIngredient array GIVEN recipeIngredient props', async () => {
      const recipeIngredient = ['one', 'two'];
      render(<RecipeSchema {...mockRecipeMetadata} recipeIngredient={recipeIngredient} />);
      await waitFor(() => {
        const actual = JSON.parse(document.querySelector(structuredDataQuery)?.textContent || '');
        expect(actual).toStrictEqual({ ...expectedDefaultRecipeSchemaObject, ...{ recipeIngredient } });
      });
    });
  });
});
