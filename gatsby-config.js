// let feedConfig = require("./src/utils/feed-config")

module.exports = {
  siteMetadata: {
    title: `Coalition Radio Hour Podcast`,
    description: `A live improvised radio drama production crammed with romance! intrigue! murder!?`,
    author: `Zane Adickes`,
    // RSS stuff
    siteUrl: "https://www.coalitionradiohour.com",
    ttl: 1440,
    language: "en",
    countryOfOrigin: "us",
    copyright: "Copyright 2019 All rights reserved.",
    podtrac: true,
  },
  plugins: [
    `gatsby-plugin-svg-sprite`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-emotion`,
    `gatsby-transformer-remark`,
    // feedConfig,
    {
      resolve: `gatsby-plugin-layout`,
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/index.js`,
      },
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: `src/utils/typography-config.js`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        // name: `gatsby-starter-default`,
        // short_name: `starter`,
        // start_url: `/`,
        // background_color: `#663399`,
        // theme_color: `#663399`,
        // display: `minimal-ui`,
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: "images",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/cms/collections`,
        name: `collections`,
      },
    },
  ],
}
