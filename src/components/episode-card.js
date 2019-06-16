import React from "react"
import { css } from "emotion"
import format from "date-fns/format"

let episodeCard = css`
  padding: 4rem 0;
  border-top: 1px solid #9d9d9d;

  &:nth-of-type(1) {
    border-top: none;
  }

  .contentWrap {
    max-width: 900px;
    margin: 0 auto;
    display: flex;

    .play-box {
      background-color: #d8d8d8;
      min-width: 160px;
      min-height: 160px;
      margin-right: 3rem;
    }
    .title {
      margin-top: 0;
      margin-bottom: 0.5rem;
    }
    .broadcast-date {
      font-weight: 400;
      margin-bottom: 0.5rem;
    }
  }
`

export default props => {
  let {
    playing,
    setEpisode,
    file_location,
    description,
    pubDate,
    title,
  } = props
  return (
    <div className={`episode-card ${episodeCard}`}>
      <div className="contentWrap">
        <div
          className="play-box"
          onClick={() => {
            setEpisode(
              {
                title,
                file_location,
              },
              !playing
            )
          }}
        />
        <div className="details">
          <h2 className="title">{title}</h2>
          <h3 className="broadcast-date">
            Broadcast Date: {format(new Date(pubDate), "MMMM d, YYYY")}
          </h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}
