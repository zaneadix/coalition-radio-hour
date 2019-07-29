import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import BackgroundImage from "gatsby-background-image"

import ConsumerContext from "./application-context"
import { mediaQueries } from "../utils/style-vars"
import title from "../images/title.svg"

let BackgroundSection = ({ background, children, className }) => (
  <StaticQuery
    query={graphql`
      query {
        brand: file(relativePath: { eq: "brand-banner.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        team: file(relativePath: { eq: "team-banner.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={backgroundData => {
      return (
        <ConsumerContext>
          {({ context }) => {
            console.log(context.banner)
            let bg = backgroundData[context.banner]

            let comp = null
            if (bg) {
              comp = (
                <BackgroundImage
                  Tag="section"
                  className={className}
                  fluid={bg.childImageSharp.fluid}
                  backgroundColor={`#040e18`}
                >
                  <svg className={`title ${context.banner}`}>
                    <use xlinkHref={`#${title.id}`} />
                  </svg>
                </BackgroundImage>
              )
            }

            return comp
          }}
        </ConsumerContext>
      )
    }}
  />
)

export default styled(BackgroundSection)`
  width: 100%;
  background-position: top center;
  background-repeat: repeat-y;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 400px;

  .title {
    &.team {
      height: 75px;
      width: 150px;
      position: absolute;
      right: 1rem;
      bottom: 1rem;

      ${mediaQueries[3]} {
        left: 1rem;
        top: 1.5rem;
      }
    }
    &.brand {
      height: 220px;
      width: 100%;
      padding: 1.5rem 1.5rem;

      ${mediaQueries[0]} {
        height: 280px;
        padding: 1.5rem 1.5rem;
      }

      ${mediaQueries[1]} {
        height: 340px;
        padding: 2rem 2rem;
      }

      ${mediaQueries[2]} {
        height: 370px;
        padding: 2rem 2rem;
      }

      ${mediaQueries[3]} {
        height: 400px;
        padding: 2rem 2rem;
      }
    }
  }
`

// export default () => (
//   <Banner>

//   </Banner>
// )
