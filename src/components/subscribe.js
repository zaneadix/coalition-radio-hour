import React from "react"
import styled from "@emotion/styled"

import { mediaQueries } from "../utils/style-vars"
import LinedHeading from "./lined-heading"

let Subscribe = styled.section`
  margin-bottom: 3rem;

  .repositories {
    display: flex;
    max-width: 900px;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    img {
      height: 30px;
      margin-bottom: 0;
    }

    a {
      margin-right: 2rem;

      &:last-of-type {
        margin-right: 0;
      }
    }

    ${mediaQueries[0]} {
      a {
        margin-right: 2.5rem;
      }
      img {
        height: 40px;
      }
    }

    ${mediaQueries[1]} {
      a {
        margin-right: 3rem;
      }
      img {
        height: 50px;
      }
    }
  }
`

export default props => {
  return (
    <Subscribe>
      <LinedHeading size="h1">Subscribe</LinedHeading>
      <div className="repositories">
        <a
          href="https://podcasts.apple.com/us/podcast/coalition-radio-hour/id1475407136"
          target="_blank_"
        >
          <img
            src="images/logos/apple_podcasts_black.png"
            alt="Apple Podcasts"
          ></img>
        </a>
        <a
          href="https://podcasts.google.com/?feed=aHR0cHM6Ly9mZWVkLnBvZGJlYW4uY29tL3phbmVhZGl4L2ZlZWQueG1s"
          target="_blank_"
        >
          <img
            src="images/logos/google_podcasts_black.png"
            alt="Google Podcasts"
          ></img>
        </a>
        <a
          href="https://radiopublic.com/coalition-radio-hour-6vrJpX"
          target="_blank_"
        >
          <img src="images/logos/radiopublic_black.png" alt="RadioPublic"></img>
        </a>
        <a
          href="https://open.spotify.com/show/46pkbj2c2D86FvqMNsFrVL"
          target="_blank_"
        >
          <img src="images/logos/spotify_black.png" alt="Spotify"></img>
        </a>
        <a
          href="https://www.stitcher.com/podcast/zane-adickes/coalition-radio-hour"
          target="_blank_"
        >
          <img src="images/logos/stitcher_black.png" alt="Stitcher"></img>
        </a>
        <a
          href="http://feeds.feedburner.com/CoalitionRadioHour"
          target="_blank_"
        >
          <img src="images/logos/rss_black.png" alt="RSS"></img>
        </a>
      </div>
    </Subscribe>
  )
}
