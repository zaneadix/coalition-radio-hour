import React from "react"
import { Link } from "gatsby"
import { css } from "emotion"
import format from "date-fns/format"

let cardContainer = css`
  padding: 4rem 0;
  border-bottom: 1px solid #9d9d9d;

  .contentWrap {
    max-width: 900px;
    margin: 0 auto;
    display: flex;

    .play-box {
      background-color: #d8d8d8;
      width: 160px;
      height: 160px;
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

let flexGutter = css`
  span {
    margin-right: 1rem;
  }
`

export default props => {
  let { description, itunes, pubDate, title, slug } = props
  return (
    <div className={cardContainer}>
      <div className="contentWrap">
        <div className="play-box" />
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
