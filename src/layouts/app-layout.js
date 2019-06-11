import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "emotion"
import "./global.css"

import Banner from "../components/banner"
import Header from "../components/header"
import Footer from "../components/footer"
// import AudioPlayer from "../components/audio-player"

let appStyles = css`
  a {
    color: #e65032;
    text-decoration: none;

    &.inverse {
      color: #fff;

      &:hover {
        color: #e65032;
      }
    }
  }

  .container {
    max-width: 1132px;
    margin: 0 auto;
  }
`

const AppLayout = ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div className={appStyles}>
      <Banner />
      <Header />
      <div className="container">
        <main>{children()}</main>
      </div>
      <Footer />
      {/* <AudioPlayer
        streamUrl={
          "https://s3.amazonaws.com/podcast-management/coalition_radio_hour/3-8-19/3-8-19.mp3"
        }
        onReady={() => console.log("track is loaded!")}
      /> */}
    </div>
  )
}

// AppLayout.propTypes = {
//   children: PropTypes.node.isRequired,
// }

export default AppLayout
