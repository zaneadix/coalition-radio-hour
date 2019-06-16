import React from "react"
import { css } from "emotion"

let banner = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`

export default () => (
  <div className={banner}>
    <h1>Coalition Radio Hour</h1>
  </div>
)
