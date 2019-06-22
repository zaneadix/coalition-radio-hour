import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import BackgroundImage from "gatsby-background-image"

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
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;

  .title {
    height: 400px;
    width: 100%;
    padding: 3rem 2rem;
  }
`

export default () => (
  <Banner>
    <svg className="title">
      <use xlinkHref={`#${title.id}`} />
    </svg>
  </Banner>
)
