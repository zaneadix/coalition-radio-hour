import React, { Component, cloneElement } from "react"
import { Global, css } from "@emotion/core"

import Banner from "../components/banner"
import Container from "../components/container"
import Header from "../components/header"
import Footer from "../components/footer"
import AudioPlayer from "../components/audio-player"

let globalStyles = css`
  a {
    color: #e65032;
    text-decoration: none;
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
      <div>
        <Global styles={globalStyles} />
        <Banner />
        <Header />
        <Container>
          <main>{childrenWithProps}</main>
        </Container>
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
