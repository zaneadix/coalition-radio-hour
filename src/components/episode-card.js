import React, { Component } from "react"
import styled from "@emotion/styled"
import format from "date-fns/format"

import pauseIcon from "../../static/images/icons/pause.svg"
import playIcon from "../../static/images/icons/play.svg"

let EpisodeCardContainer = styled.div`
  padding: 4rem 0;
  border-top: 1px solid #9d9d9d;
  &:nth-of-type(1) {
    border-top: none;
  }
`

let EpisodeCardContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
`

let EpisodeTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5rem;
`

let PlayBox = styled.div`
  background-color: #d8d8d8;
  min-width: 160px;
  min-height: 160px;
  margin-right: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

let PlayButton = styled.button`
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: #fff;
    width: 1.5rem;
    height: 1.5rem;
  }

  &.active {
    background-color: #e65032;
  }
`

let BroadcastDate = styled.h3`
  font-weight: 400;
  margin-bottom: 0.5rem;
`

export default class EpisodeCard extends Component {
  isActive = () => {
    let { episode, downloadUrl } = this.props
    return episode && episode.downloadUrl === downloadUrl
  }

  isPlaying = () => {
    let { playing } = this.props
    if (this.isActive()) {
      return playing
    }
    return false
  }

  handleClick = () => {
    let { episode, playing, setEpisode, title, downloadUrl } = this.props
    let playState = true
    if (episode && episode.downloadUrl === downloadUrl) {
      playState = !playing
    }

    setEpisode(
      {
        title,
        downloadUrl,
      },
      playState
    )
  }

  render() {
    let { description, pubDate, title } = this.props

    return (
      <EpisodeCardContainer>
        <EpisodeCardContent>
          <PlayBox onClick={this.handleClick}>
            <PlayButton className={this.isActive() ? "active" : ""}>
              <svg>
                <use
                  xlinkHref={`#${
                    this.isPlaying() ? pauseIcon.id : playIcon.id
                  }`}
                />
              </svg>
            </PlayButton>
          </PlayBox>
          <div className="details">
            <EpisodeTitle>{title}</EpisodeTitle>
            <BroadcastDate>
              Broadcast Date: {format(new Date(pubDate), "MMMM d, YYYY")}
            </BroadcastDate>
            <p>{description}</p>
          </div>
        </EpisodeCardContent>
      </EpisodeCardContainer>
    )
  }
}
