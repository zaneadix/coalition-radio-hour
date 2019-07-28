import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import BackgroundImage from "gatsby-background-image"

import ConsumerContext from "./application-context"
import { mediaQueries } from "../utils/style-vars"
import title from "../../static/images/title.svg"

const BackgroundSection = ({ background, children, className }) => (
  <StaticQuery
    query={graphql`
      query {
        brand: file(relativePath: { eq: "images/brand-banner.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        team: file(relativePath: { eq: "images/team-banner.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={backgroundData => {
      console.log(backgroundData)
      return (
        <ConsumerContext>
          {({ data }) => {
            console.log(data)
            let bg = backgroundData[data.banner]
            return bg ? (
              <BackgroundImage
                Tag="section"
                className={className}
                fluid={bg.childImageSharp.fluid}
                backgroundColor={`#040e18`}
              >
                <svg className="title">
                  <use xlinkHref={`#${title.id}`} />
                </svg>
              </BackgroundImage>
            ) : null
          }}
        </ConsumerContext>
      )
    }}
  />
)

export default styled(BackgroundSection)`
  width: 100%;
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 400px;

  .title {
    height: 220px;
    width: 100%;
    padding: 1.5rem 1.5rem;
  }

  ${mediaQueries[0]} {
    .title {
      height: 280px;
      padding: 1.5rem 1.5rem;
    }
  }

  ${mediaQueries[1]} {
    .title {
      height: 340px;
      padding: 2rem 2rem;
    }
  }

  ${mediaQueries[2]} {
    .title {
      height: 370px;
      padding: 2rem 2rem;
    }
  }

  ${mediaQueries[3]} {
    .title {
      height: 400px;
      padding: 2rem 2rem;
    }
  }
`

// export default () => (
//   <Banner>

//   </Banner>
// )
