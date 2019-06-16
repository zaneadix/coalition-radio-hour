import React from "react"
import { graphql } from "gatsby"
import { css } from "emotion"

import SEO from "../components/seo"
import EpisodeCard from "../components/episode-card"
import Subscribe from "../components/subscribe"

let episodeList = css`
  .episodeCard {
    border-bottom: 1px solid #9d9d9d;
    &:last-of-type {
      margin-bottom: 4rem;
      border-bottom: 0px solid;
    }
  }
`

export default ({ setEpisode, data: { remarks } }) => {
  return (
    <>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className={episodeList}>
        {remarks.episodes.map(({ node: { data, fields } }) => {
          return (
            <EpisodeCard
              key={data.title}
              setEpisode={setEpisode}
              {...data}
              {...fields}
            />
          )
        })}
      </div>
      <Subscribe></Subscribe>
    </>
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
