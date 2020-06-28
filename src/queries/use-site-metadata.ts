/* istanbul ignore file */

import { graphql, useStaticQuery } from 'gatsby';

type siteMetadata = {
  /** Title of the site. */
  title: string;

  /** Description of the site. */
  description: string;

  /** Author of the site. */
  author: string;

  /** 'https://davidhorm.github.io' */
  domain: string;

  /** '/cookbook' */
  pathPrefix: string;
};

/** Query `siteMetadata` object from `gatsby-config.js` file. */
export const useSiteMetadata = (): siteMetadata => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          author
          domain
          pathPrefix
        }
      }
    }
  `);
  return siteMetadata;
};
