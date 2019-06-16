import React from "react"
import { css } from "emotion"

let linedHeading = css`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  &:before {
    margin-right: 1rem;
  }
  &:after {
    margin-left: 1rem;
  }

  &:before,
  &:after {
    content: "";
    display: block;
    border-bottom: 1px solid #9d9d9d;
    flex: 1;
    height: 50%;
  }
`

export default props => {
  return <h1 className={linedHeading}>{props.children}</h1>
}
