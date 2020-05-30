import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

type props = {
  /**
   * The document's title that is shown in a browser's title bar or a page's tab.
   */
  title: string;

  /**
   * A short and accurate summary of the content of the page.
   *
   * @defaultValue ''
   */
  description?: string;

  /**
   * The BCP47 code representing the language of the site.
   *
   * @defaultValue 'en'
   */
  lang?: string;

  /**
   * Additional <meta> elements to concat to <head>. These can be used to provide document metadata in terms of `{ name, content }` pairs.
   *
   * @defaultValue []
   */
  meta?: HTMLMetaElement[];
};

/**
 * SEO component that overwrites the values in the document <head>.
 */
function SEO({ description = '', lang = 'en', meta = [], title }: props) {
  // See: https://www.gatsbyjs.org/docs/use-static-query/
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ].concat(meta)}
    />
  );
}

export default SEO;
