import React, { Component } from "react"
import ReactPlayer from "react-player"
import { css } from "emotion"

import Container from "./container"
import pauseIcon from "../images/icons/pause.svg"
import playIcon from "../images/icons/play.svg"

let trackStyles = `
  width: 100%;
  height: 12px;
  cursor: pointer;
  animate: 0.2s;
  background-color: transparent;
  border: 1px solid #000000;
`

let sliderStyles = `
  height: 28px;
  width: 10px;
  background: #000;
  cursor: pointer;
  margin-top: -9px;
`

let playerContainer = css`
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 0;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.16);
  transition: height 0.3s;

  &.open {
    height: unset;
  }

  .controls {
    display: flex;
    padding-top: 1.2rem;
    padding-bottom: 0.5rem;

    button {
      background-color: transparent;
      border: none;
      margin-right: 1rem;
      padding: 0;
      height: 1.5rem;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      font-weight: 700;
      cursor: pointer;

      svg {
        height: 1.5rem;
        width: 1.5rem;
      }

      &.back {
        padding-right: 0.5rem;
      }
      &.skip {
        padding-left: 0.5rem;
      }
    }

    .scrub {
      flex: 1;
      .seek {
        -webkit-appearance: none;
        width: 100%;
        &:focus {
          outline: none;
        }
        &::-webkit-slider-runnable-track {
          ${trackStyles}
        }
        &::-moz-range-track {
          ${trackStyles}
        }
        &::-ms-track {
          ${trackStyles}
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          ${sliderStyles}
        }
        &::-moz-range-thumb {
          ${sliderStyles}
        }
        &::-ms-thumb {
          ${sliderStyles}
        }
      }
      .info {
        display: flex;
        justify-content: space-between;
      }
    }
  }
`

let Duration = ({ className, seconds }) => {
  let date = new Date(seconds * 1000)
  let formatted = "00:00:00"
  if (date.toString() !== "Invalid Date") {
    let hh = `${date.getUTCHours()}`
    let mm = `${date.getUTCMinutes()}`
    let ss = `${date.getUTCSeconds()}`.padStart(2, "0")
    let text = hh ? `${hh}:${mm.padStart(2, "0")}:${ss}` : `${mm}:${ss}`
    formatted = (
      <time dateTime={`P${Math.round(seconds)}S`} className={className}>
        {text}
      </time>
    )
  }
  return formatted
}

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seaking: false,
      played: 0,
    }
  }

  playerRef = player => {
    this.player = player
  }

  onDuration = duration => {
    this.setState({ duration })
  }

  onProgress = state => {
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  onSeekChange = event => {
    this.setState({ played: parseFloat(event.target.value) })
  }

  onSeekDown = () => {
    this.setState({ seeking: true })
  }

  onSeekUp = event => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(event.target.value))
  }

  onBack = () => {
    this.player.seekTo(this.player.getCurrentTime() - 10, "seconds")
  }

  onSkip = () => {
    this.player.seekTo(this.player.getCurrentTime() + 30, "seconds")
  }

  togglePlay = () => {
    this.setState({ playing: !this.state.playing })
  }

  getSliderBackground = () => {
    let { played } = this.state
    let percentage = (played * 100).toFixed(4)
    return {
      background: `linear-gradient(to right, #e65032 0%, #e65032 ${percentage}%, rgb(255, 255, 255) ${percentage}%, rgb(255, 255, 255) 100%)`,
    }
  }

  render() {
    let { played, duration } = this.state
    let { playing, episode, setPlaying } = this.props

    console.log(episode)

    return (
      <section className={`${playerContainer} ${episode ? "open" : ""}`}>
        <Container>
          {episode ? (
            <>
              <div className="controls">
                <button onClick={() => setPlaying(!playing)}>
                  <svg>
                    <use
                      xlinkHref={`#${playing ? pauseIcon.id : playIcon.id}`}
                    />
                  </svg>
                </button>
                <div className="scrub">
                  <input
                    className="seek"
                    type="range"
                    style={this.getSliderBackground()}
                    min={0}
                    max={1}
                    step="any"
                    value={played}
                    onChange={this.onSeekChange}
                    onMouseDown={this.onSeekDown}
                    onMouseUp={this.onSeekUp}
                    onTouchStart={this.onSeekDown}
                    onTouchEnd={this.onSeekUp}
                  />
                  <div className="info">
                    <span className="title">Episode Title</span>
                    <div className="time">
                      <Duration
                        className="elapsed"
                        seconds={duration * played}
                      />{" "}
                      | <Duration className="duration" seconds={duration} />
                    </div>
                  </div>
                </div>
              </div>

              <ReactPlayer
                ref={this.playerRef}
                url={episode.downloadUrl}
                width="0"
                height="0"
                playing={playing}
                autoPlay={true}
                onProgress={this.onProgress}
                onDuration={this.onDuration}
              ></ReactPlayer>
            </>
          ) : null}
        </Container>
      </section>
    )
  }
}
