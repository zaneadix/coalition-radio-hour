import React from "react"
import styled from "@emotion/styled"

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
      height: 50px;
      margin-bottom: 0;
    }

    a {
      margin-right: 3rem;

      &:last-of-type {
        margin-right: 0;
      }
    }
  }
`

export default props => {
  return (
    <Subscribe>
      <LinedHeading>Subscribe</LinedHeading>
      <div className="repositories">
        <a href="http://itunes.com" target="_blank_">
          <img
            src="images/logos/apple_podcasts_black.png"
            alt="Apple Podcasts"
          ></img>
        </a>
        <a href="https://podcasts.google.com/about" target="_blank_">
          <img
            src="images/logos/google_podcasts_black.png"
            alt="Google Podcasts"
          ></img>
        </a>
        <a href="https://radiopublic.com" target="_blank_">
          <img src="images/logos/radiopublic_black.png" alt="RadioPublic"></img>
        </a>
        <a href="https://spotify.com" target="_blank_">
          <img src="images/logos/spotify_black.png" alt="Spotify"></img>
        </a>
        <a href="https://stitcher.com" target="_blank_">
          <img src="images/logos/stitcher_black.png" alt="Stitcher"></img>
        </a>
        <a href="https://poop.com" target="_blank_">
          <img src="images/logos/rss_black.png" alt="RSS"></img>
        </a>
      </div>
    </Subscribe>
  )
}
