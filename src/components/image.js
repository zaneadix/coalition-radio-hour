import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

export default props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: { sourceInstanceName: { eq: "images" } }) {
          edges {
            node {
              relativePath
              sourceInstanceName
              dir
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      let image = data.images.edges.find(image => {
        return props.src ? image.node.relativePath === props.src : null
      })
      image && (image = image.node.childImageSharp)
      return image ? <Image alt={props.alt} fluid={image.fluid} /> : null
    }}
  />
)
