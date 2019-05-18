module.exports = {
  resolve: `gatsby-plugin-feed`,
  options: {
    serialize: () => {
      return {
        title: "GARBAGE",
        description: "SUCKA FAT DONG",
      }
    },
    feeds: [
      {
        serialize: ({ query: { crew, podcasts, episodes } }) => {
          let crewList = crew.edges.map(edge => edge.node.frontmatter)
          console.log(crewList)
          let podcastList = podcasts.edges.map(edge => edge.node.frontmatter)
          console.log(podcastList)
          let episodeList = episodes.edges.map(edge => edge.node.frontmatter)
          console.log(episodeList)

          return [
            {
              title: "Podcast Title",
              description: "This is the description",
              generator: "This should list my own generator cause",
              site_url: "banana.com",
            },
          ]
        },
        query: `
          {
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
            }
            podcasts: allMarkdownRemark(filter: {frontmatter: {collection: {eq: "podcasts"}  } } ) {
              edges { 
                node {
                  id
                  frontmatter {
                    title
                    description
                    image
                    pubDate
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
            episodes: allMarkdownRemark(filter: {frontmatter: { collection: {eq: "episodes"}}}) {
              edges {
                node {
                  id
                  frontmatter {
                    podcast
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
        output: "./rss.xml",
        title: "Butthole",
      },
    ],
  },
}
