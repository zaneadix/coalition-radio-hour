import React from "react"
import { graphql } from "gatsby"

import AppLayout from "../layouts/app-layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import EpisodeCard from "../components/episode-card"

export default ({ data: { remarks } }) => {
  console.log(remarks)
  return (
    <AppLayout>
      {() => (
        <>
          <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
          {remarks.episodes.map(({ node: { data, fields } }) => {
            return <EpisodeCard {...data} {...fields} />
          })}
        </>
      )}
    </AppLayout>
  )
}

export const query = graphql`
  query {
    remarks: allMarkdownRemark(
      filter: { frontmatter: { collection: { eq: "episodes" } } }
      sort: { order: DESC, fields: [frontmatter___pubDate] }
    ) {
      episodes: edges {
        node {
          data: frontmatter {
            title
            description
            file_location
            pubDate
            itunes: itunesEpisodeData {
              duration
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
