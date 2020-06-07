import { graphql, useStaticQuery } from 'gatsby';

type siteMetadata = {
  title: string;
  description: string;
  author: string;
};

/** Query `siteMetadata` object from `gatsby-config.js` file. */
export const useSiteMetadata = (): siteMetadata => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
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
  return siteMetadata;
};
