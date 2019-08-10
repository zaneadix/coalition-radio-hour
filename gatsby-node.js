let path = require("path")
let axios = require("axios")
let crypto = require("crypto")
let { siteMetadata } = require("./gatsby-config")

exports.sourceNodes = async ({ actions }) => {
  let { PODBEAN_CLIENT_ID, PODBEAN_CLIENT_SECRET } = process.env
  try {
    let {
      data: { access_token },
    } = await axios({
      method: "post",
      url: "https://api.podbean.com/v1/oauth/token",
      data: {
        grant_type: "client_credentials",
      },
      auth: {
        username: PODBEAN_CLIENT_ID,
        password: PODBEAN_CLIENT_SECRET,
      },
    })

    let {
      data: { episodes, offset, limit },
    } = await axios({
      method: "get",
      url: `https://api.podbean.com/v1/episodes?access_token=${access_token}&limit=100`,
    })

    episodes.map(episode => {
      let cryptic = JSON.stringify(episode)
      let contentDigest = crypto
        .createHash("md5")
        .update(cryptic)
        .digest("hex")
      actions.createNode({
        internal: {
          type: "Episode",
          contentDigest,
        },
        ...episode,
        slug: episode.title.replace(/\s/g, "_").toLowerCase(),
      })
    })
  } catch (error) {
    console.error("UNABLE TO GET PODCAST DATA", error.statusText, error)
  }
}

// function processEpisodeNode({ node, actions, graphql }) {
//   let { createNodeField } = actions
//   let { frontmatter: data } = node
//   let title = data.title.toLowerCase().replace(/\s/g, "-")
//   let date = new Date(data.pubDate)

//   let slug = `episode_${title}_${date.getMonth() +
//     1}-${date.getDate()}-${date.getFullYear()}`

//   createNodeField({
//     node,
//     name: `slug`,
//     value: slug,
//   })

//   createNodeField({
//     node,
//     name: "downloadUrl",
//     value: siteMetadata.podtrac
//       ? data.file_location.replace(
//           /https?:\/\//,
//           "https://dts.podtrac.com/redirect.mp3/"
//         )
//       : date.file_location,
//   })
// }

// exports.onCreateNode = args => {
//   let { node } = args

//   if (node.internal.type === `MarkdownRemark`) {
//     switch (node.frontmatter.collection) {
//       case "episodes":
//         processEpisodeNode(args)
//         break
//       default:
//     }
//   }
// }

// FOR REFERENCE
// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions
//   return graphql(`
//     {
//       allMarkdownRemark {
//         edges {
//           node {
//             data: frontmatter {
//               collection
//             }
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `).then(result => {
//     result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//       let { fields, data } = node
//       if (fields && fields.slug) {
//         let component = ""
//         switch (data.collection) {
//           case "episodes":
//             component = path.resolve("./src/templates/episode.js")
//           default:
//         }
//         createPage({
//           component,
//           path: fields.slug,
//           context: {
//             slug: fields.slug,
//           },
//         })
//       }
//     })
//   })
// }
