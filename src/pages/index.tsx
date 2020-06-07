import { Link } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { useRecipeMetadata } from '../queries/use-recipe-metadata';
import { useSiteMetadata } from '../queries/use-site-metadata';

const IndexPage = () => {
  const edges = useRecipeMetadata();
  const siteMetadata = useSiteMetadata();
  return (
    <Layout>
      <SEO title="Home" />
      <h1>My Recipes</h1>
      <p>{siteMetadata.description}</p>
      <p>Look at all of the recipes I created!</p>

      <ul>
        {edges.map(({ node: { frontmatter: { title }, parent: { relativeDirectory } } }) => (
          <li key={relativeDirectory}>
            <Link to={`/${relativeDirectory}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
