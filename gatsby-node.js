let path = require("path")

function processEpisodeNode({ node, actions }) {
  let { createNodeField } = actions
  let { frontmatter: data } = node
  let title = data.title.toLowerCase().replace(/\s/g, "-")
  let date = new Date(data.pubDate)

  let slug = `episode_${title}_${date.getMonth() +
    1}-${date.getDate()}-${date.getFullYear()}`

  createNodeField({
    node,
    name: `slug`,
    value: slug,
  })
}

exports.onCreateNode = args => {
  let { node } = args

  if (node.internal.type === `MarkdownRemark`) {
    switch (node.frontmatter.collection) {
      case "episodes":
        processEpisodeNode(args)
        break
      default:
    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            data: frontmatter {
              collection
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      let { fields, data } = node
      console.log(data)
      if (fields && fields.slug) {
        let component = ""
        switch (data.collection) {
          case "episodes":
            component = path.resolve("./src/templates/episode.js")
          default:
        }
        createPage({
          component,
          path: fields.slug,
          context: {
            slug: fields.slug,
          },
        })
      }
    })
  })
}
