import React from "react"
import { graphql } from "gatsby"

import ConsumerContext from "../components/application-context"
import SEO from "../components/seo"
import EpisodeCard from "../components/episode-card"
import Subscribe from "../components/subscribe"

export default props => {
  let { data } = props

  return (
    <ConsumerContext>
      {({ context, set }) => {
        if (context.banner !== "brand") {
          set({ banner: "brand" })
        }
        return (
          <div>
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            {data.remarks.episodes.map(({ node: { data, fields } }) => {
              return (
                <EpisodeCard
                  key={data.title}
                  {...props}
                  {...data}
                  {...fields}
                />
              )
            })}
            <Subscribe></Subscribe>
          </div>
        )
      }}
    </ConsumerContext>
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
            downloadUrl
          }
        }
      }
    }
  }
`
