/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, keywords, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  let { title: siteTitle, author, siteUrl } = site.siteMetadata

  let metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      // titleTemplate={`${siteTitle} | %s`}
      link={[
        { rel: "icon", type: "image/png", href: "masky.png" },
        {
          rel: "alternative",
          type: "application/rss+xml",
          title: "Coalition Radio Hour",
          href: "https://feed.podbean.com/zaneadix/feed.xml",
        },
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: `${siteTitle} | ${title}`,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: `https://mcdn.podbean.com/mf/web/u76hwx/brand-share.png`,
        },
        {
          property: `og:image:secure_url`,
          content: `https://mcdn.podbean.com/mf/web/u76hwx/brand-share.png`,
        },
        {
          property: `og:site_name`,
          content: siteTitle,
        },
        {
          property: `og:url`,
          content: siteUrl,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          property: `twitter:image`,
          content: `https://mcdn.podbean.com/mf/web/u76hwx/brand-share.png`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO
