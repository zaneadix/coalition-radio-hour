import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import BackgroundImage from "gatsby-background-image"

import { mediaQueries } from "../utils/style-vars"
import title from "../../static/images/title.svg"

const BackgroundSection = ({ children, className }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "images/banner-bg.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      const imageData = data.desktop.childImageSharp.fluid
      return (
        <BackgroundImage
          Tag="section"
          className={className}
          fluid={imageData}
          backgroundColor={`#040e18`}
        >
          {children}
        </BackgroundImage>
      )
    }}
  />
)

let Banner = styled(BackgroundSection)`
  width: 100%;
  // height: 240px;
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    height: 280px;
    width: 100%;
    padding: 1rem 1rem;
  }

  ${mediaQueries[0]} {
    .title {
      height: 320px;
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

export default () => (
  <Banner>
    <svg className="title">
      <use xlinkHref={`#${title.id}`} />
    </svg>
  </Banner>
)
