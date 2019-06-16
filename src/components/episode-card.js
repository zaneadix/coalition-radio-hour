import React, { Component } from "react"
import styled from "@emotion/styled"
import format from "date-fns/format"

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
`

let BroadcastDate = styled.h3`
  font-weight: 400;
  margin-bottom: 0.5rem;
`

export default class EpisodeCard extends Component {
  handleClick = () => {
    let { episode, playing, setEpisode, title, file_location } = this.props
    let playState = true
    if (episode && episode.file_location === file_location) {
      playState = !playing
    }

    setEpisode(
      {
        title,
        file_location,
      },
      playState
    )
  }

  render() {
    let { description, pubDate, title } = this.props
    return (
      <EpisodeCardContainer>
        <EpisodeCardContent>
          <PlayBox onClick={this.handleClick} />
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
