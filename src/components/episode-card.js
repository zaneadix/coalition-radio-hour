import React, { Component } from "react"
import styled from "@emotion/styled"
// import format from "date-fns/format"

import { mediaQueries, colors } from "../utils/style-vars"
import pauseIcon from "../images/icons/pause.svg"
import playIcon from "../images/icons/play.svg"

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

  .description {
    margin-bottom: 0;
  }
`

let EpisodeTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5rem;

  a {
    color: #000;
    &:hover {
      color: ${colors.accentOrange};
    }
  }
`

let EpisodeHeader = styled.div`
  display: flex;

  .title-wrapper {
    flex: 1;
  }

  .header-play-button {
    margin-right: 1rem;
    height: 43px;
    width: 43px;

    ${mediaQueries[0]} {
      height: 50px;
      width: 50px;
    }

    ${mediaQueries[2]} {
      display: none;
    }
  }
`

let PlayBox = styled.div`
  display: none;
  background-color: ${colors.grey};
  display: none;
  min-width: 160px;
  min-height: 160px;
  margin-right: 3rem;

  ${mediaQueries[2]} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

let Button = styled.button`
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  border: 0;
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

let PlayButton = ({ active, playing, className, onClick }) => {
  return (
    <Button
      className={`${className} ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <svg>
        <use xlinkHref={`#${playing ? pauseIcon.id : playIcon.id}`} />
      </svg>
    </Button>
  )
}

export default class EpisodeCard extends Component {
  isActive = () => {
    let { episode, media_url } = this.props
    return episode && episode.media_url === media_url
  }

  isPlaying = () => {
    let { playing } = this.props
    if (this.isActive()) {
      return playing
    }
    return false
  }

  handleClick = () => {
    let { episode, playing, setEpisode, title, media_url } = this.props
    let playState = true
    if (episode && episode.media_url === media_url) {
      playState = !playing
    }

    setEpisode(
      {
        title,
        media_url,
      },
      playState
    )
  }

  render() {
    let { content, publish_time, title, slug } = this.props

    return (
      <EpisodeCardContainer id={slug}>
        <EpisodeCardContent>
          <PlayBox>
            <PlayButton
              onClick={this.handleClick}
              active={this.isActive()}
              playing={this.isPlaying()}
            />
          </PlayBox>
          <div className="details">
            <EpisodeHeader>
              <PlayButton
                className="header-play-button"
                onClick={this.handleClick}
                active={this.isActive()}
                playing={this.isPlaying()}
              />
              <div className="title-wrapper">
                <EpisodeTitle>
                  <a href={`#${slug}`}>{title}</a>
                </EpisodeTitle>
                <BroadcastDate>
                  {new Date(publish_time * 1000).toDateString()}
                </BroadcastDate>
              </div>
            </EpisodeHeader>
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        </EpisodeCardContent>
      </EpisodeCardContainer>
    )
  }
}
