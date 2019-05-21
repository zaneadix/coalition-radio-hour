const fileName = "rss.xml"
let crewQuery = `
crew: allMarkdownRemark(filter: {frontmatter: {collection: {eq: "crew"}  } } ) {
  edges { 
    node {
      id
      frontmatter {
        name
        email
        image
        title
      }
    }
  }
}`

let checkCategory = category => {
  return category && category !== "_blank_"
}

module.exports = {
  resolve: `gatsby-plugin-feed`,
  options: {
    query: `
      {
        site {
          siteMetadata {
            siteUrl
            ttl
            language
            countryOfOrigin
          }
        }
        ${crewQuery}
        podcastDetails: allMarkdownRemark(filter: {frontmatter: {collection: {eq: "podcast"}  } } ) {
          edges { 
            node {
              frontmatter {
                title
                description
                image_url
                pubDate
                copyright
                itunesPodcastData {
                  author
                  owner
                  category1
                  category2
                  category3
                  block
                  copyright
                  explicit
                  owner
                  author
                  type
                }
              }
            }
          }
        }
      }
    `,

    setup: ({
      query: {
        site: { siteMetadata },
        crew,
        podcastDetails,
      },
    }) => {
      let podcast = podcastDetails.edges[0].node.frontmatter
      let itunes = podcast.itunesPodcastData

      // Owner
      let owner = crew.edges.find(edge => {
        return edge.node.frontmatter.name === itunes.owner
      })
      owner && (owner = owner.node.frontmatter)

      // Categories
      let categoryList = []
      checkCategory(itunes.category1) && categoryList.push(itunes.category1)
      checkCategory(itunes.category2) && categoryList.push(itunes.category2)
      checkCategory(itunes.category3) && categoryList.push(itunes.category3)
      let categories = categoryList.map(category => {
        let [main, sub] = category.split(":")
        if (main && main !== "_blank_") {
          let element = {
            "itunes:category": [{ _attr: { text: main } }],
          }
          sub &&
            element["itunes:category"].push({
              "itunes:category": [{ _attr: { text: sub } }],
            })
          return element
        }
      })

      let custom_namespaces = {
        itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
        spotify: "http://www.spotify.com/ns/rss",
        wfw: "http://wellformedweb.org/CommentAPI/",
      }
      let custom_elements = [
        { "spotify:countryOfOrigin": siteMetadata.countryOfOrigin },
        {
          "atom:link": {
            _attr: {
              href: `${siteMetadata.siteUrl}/${fileName}`,
              rel: "self",
              type: "application/rss+xml",
            },
          },
        },
        { "itunes:subtitle": itunes.subtitle },
        { "itunes:summary": podcast.description },
        { "itunes:author": itunes.author },
        { "itunes:type": itunes.type },
        { "itunes:block": itunes.block },
        { "itunes:explicit": itunes.explicit },
        {
          "itunes:owner": [
            { "itunes:name": owner.name },
            { "itunes:email": owner.email },
          ],
        },
        {
          "itunes:image": {
            _attr: {
              href: podcast.image_url,
            },
          },
        },
        ...categories,
      ]
      return {
        title: podcast.title,
        description: podcast.description,
        pubDate: podcast.pubDate,
        image_url: podcast.image_url,
        copyright: podcast.copyright,
        site_url: siteMetadata.siteUrl,
        ttl: siteMetadata.ttl,
        language: siteMetadata.language,
        copyright: siteMetadata.copyright,
        categories: categoryList,
        custom_namespaces,
        custom_elements,
      }
    },

    feeds: [
      {
        query: `
          {
            ${crewQuery}
            episodes: allMarkdownRemark(filter: {frontmatter: { collection: {eq: "episodes"}}}, sort: {order: DESC fields: [frontmatter___pubDate]}) {
              edges {
                node {
                  id
                  frontmatter {
                    title
                    url
                    pubDate
                    itunesEpisodeData {
                      author
                      subtitle
                      summary
                      type
                      block
                      explicit
                      type
                    }
                  }
                }
              }
            }
          }
        `,
        serialize: ({ query: { crew, episodes } }) => {
          let crewList = crew.edges.map(edge => edge.node.frontmatter)
          let episodeList = episodes.edges.map(edge => edge.node.frontmatter)

          // Owner
          let owner = crew.edges.find(edge => {
            return edge.node.frontmatter.name === itunes.owner
          })
          owner && (owner = owner.node.frontmatter)

          return [
            {
              title: "Podcast Title",
              description: "This is the description",
              generator: "This should list my own generator cause",
              site_url: "banana.com",
            },
          ]
        },
        output: `./${fileName}`,
      },
    ],
  },
}
