import React from "react"
import { PlayButton, Timer, Progress } from "react-soundplayer/components"
import { withCustomAudio } from "react-soundplayer/addons"
import styled from "@emotion/styled"

let PlayerContainer = styled("div")`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: lightblue;
`

let AudioPlayer = withCustomAudio(props => {
  console.log(props)
  const { trackTitle, duration, currentTime } = props

  return (
    <PlayerContainer>
      <PlayButton {...props} />
      <Progress
        styles="{width: 100}"
        {...props}
        value={(currentTime / duration) * 100 || 0}
      />
      <Timer {...props} />
    </PlayerContainer>
  )
})

export default AudioPlayer
