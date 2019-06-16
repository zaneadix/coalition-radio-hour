import React, { Component, cloneElement } from "react"
import { css } from "emotion"
import "./global.css"

import Banner from "../components/banner"
import Header from "../components/header"
import Footer from "../components/footer"
import AudioPlayer from "../components/audio-player"

let appStyles = css`
  a {
    color: #e65032;
    text-decoration: none;
  }

  .container {
    max-width: 1132px;
    margin: 0 auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`

export default class AppLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      episode: null,
      playing: false,
    }
  }

  setEpisode = (episode, playing) => {
    this.setState({ episode, playing })
  }

  setPlaying = playing => {
    this.setState({ playing })
  }

  render() {
    let { episode, playing } = this.state
    let { children } = this.props
    let childrenWithProps = React.Children.map(children, child => {
      return cloneElement(child, {
        setEpisode: this.setEpisode,
        setPlaying: this.setPlaying,
        playing,
        episode,
      })
    })

    return (
      <div className={appStyles}>
        <Banner />
        <Header />
        <div className="container">
          <main>{childrenWithProps}</main>
        </div>
        <Footer />
        <AudioPlayer
          setPlaying={this.setPlaying}
          playing={playing}
          episode={episode}
        ></AudioPlayer>
      </div>
    )
  }
}
