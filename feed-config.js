const fileName = "rss.xml"

// function imageLocation(siteUrl, imagePath) {
//   return imagePath
// }

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

let siteQuery = `
site {
  siteMetadata {
    siteUrl
    ttl
    language
    countryOfOrigin
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
        ${siteQuery}
        ${crewQuery}
        podcastDetails: allMarkdownRemark(filter: {frontmatter: {collection: {eq: "podcast"}  } } ) {
          edges { 
            node {
              frontmatter {
                title
                description
                image_url
                image_external
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

      let imagePath =
        podcast.image_external || `${siteMetadata.siteUrl}${podcast.image_url}`

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
        { "itunes:block": itunes.block ? "Yes" : "No" },
        { "itunes:explicit": itunes.explicit ? "Yes" : "No" },
        {
          "itunes:owner": [
            { "itunes:name": owner.name },
            { "itunes:email": owner.email },
          ],
        },
        {
          "itunes:image": {
            _attr: {
              href: imagePath,
            },
          },
        },
        ...categories,
      ]
      return {
        title: podcast.title,
        description: podcast.description,
        pubDate: podcast.pubDate,
        image_url: imagePath,
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
            ${siteQuery}
            ${crewQuery}
            episodes: allMarkdownRemark(filter: {frontmatter: { collection: {eq: "episodes"}}}, sort: {order: DESC fields: [frontmatter___pubDate]}) {
              edges {
                node {
                  id
                  fileAbsolutePath
                  frontmatter {
                    title
                    description
                    file_location,
                    file_size,
                    pubDate
                    image_external,
                    itunesEpisodeData {
                      author
                      subtitle
                      summary
                      duration
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
        serialize: ({
          query: {
            episodes,
            site: { siteMetadata },
          },
        }) => {
          let episodeList = episodes.edges.map(edge => {
            return Object.assign(
              {
                id: edge.node.id,
                slug: (/([-_a-z0-9]+)\.md$/gi.exec(
                  edge.node.fileAbsolutePath
                ) || [])[1],
              },
              edge.node.frontmatter
            )
          })

          return episodeList.map((episode, index) => {
            let itunes = episode.itunesEpisodeData
            let url = `${siteMetadata.siteUrl}/episode/${episode.slug}`

            let imagePath
            if (episode.image_external || episode.image_url) {
              imagePath =
                episode.image_external ||
                `${siteMetadata.siteUrl}${episode.image_url}`
            }

            let custom_elements = [
              // { comments } should link to where comments can be read?
              // { "content:encoded": episode.description },
              { "itunes:title": episode.title },
              { "itunes:subtitle": itunes.subtitle },
              { "itunes:summary": itunes.summary || episode.description },
              { "itunes:author": itunes.author },
              { "itunes:explicit": itunes.explicit ? "Yes" : "No" },
              { "itunes:block": itunes.block ? "Yes" : "No" },
              { "itunes:duration": itunes.duration },
              { "itunes:episode": index + 1 },
              { "itunes:episodeType": itunes.type },
            ]

            if (imagePath) {
              custom_elements.push({
                "itunes:image": {
                  _attr: {
                    href: imagePath,
                  },
                },
              })
            }

            return {
              title: episode.title,
              description: episode.description,
              guid: `${url}-${episode.id}`,
              date: episode.pubDate,
              url,
              enclosure: {
                url: episode.file_location,
                size: episode.file_size * 1000000,
              },
              custom_elements,
            }
          })
        },
        output: `./${fileName}`,
      },
    ],
  },
}
