import React from "react"
import { graphql } from "gatsby"

import ConsumerContext from "../components/application-context"
import SEO from "../components/seo"
import EpisodeCard from "../components/episode-card"
import Subscribe from "../components/subscribe"

export default props => {
  let {
    data: {
      allEpisode: { edges: episodes },
    },
  } = props

  console.log(episodes)

  return (
    <ConsumerContext>
      {({ context, set }) => {
        if (context.banner !== "brand") {
          set({ banner: "brand" })
        }
        return (
          <div>
            <SEO />
            {episodes.map(({ node }) => {
              return <EpisodeCard key={node.id} {...props} {...node} />
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
    allEpisode(sort: { order: DESC, fields: [publish_time] }) {
      edges {
        node {
          id
          title
          content
          publish_time
          duration
          media_url
          slug
        }
      }
    }
  }
`
