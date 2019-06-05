import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../layouts/page-layout"
// import Image from "../components/image"
import SEO from "../components/seo"

export default ({
  data: {
    eps: { edges: episodes },
  },
}) => {
  console.log(episodes)
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Hey</h1>
      <h1>All Episodes</h1>
      {episodes.map(({ node: { frontmatter: episode } }) => (
        <>
          <h3>{episode.title}</h3>
          <p>{episode.description}</p>
        </>
      ))}
      <Link to="/about/">About</Link>
    </Layout>
  )
}

export const query = graphql`
  query {
    eps: allMarkdownRemark(
      filter: { frontmatter: { collection: { eq: "episodes" } } }
      sort: { order: DESC, fields: [frontmatter___pubDate] }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            file_location
            pubDate
            image_external
          }
        }
      }
    }
  }
`
