import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

export default props => {
  console.log(props)
  return (
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
        console.log(image)
        image && (image = image.node.childImageSharp)
        return image ? <Image alt={props.alt} fixed={image.fixed} /> : null
      }}
    />
  )
}
