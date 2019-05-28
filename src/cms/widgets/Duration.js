// eslint-disable-next-line
import React, { Component, createElement } from "react"
import CMS from "netlify-cms-app"
import styled from "@emotion/styled"

let FlexContainer = styled("div")`
  display: flex;
`
let FlexChild = styled("div")`
  margin-right: 1rem;
  &:last-of-type {
    margin-right: 0;
  }
`

export class Duration extends Component {
  matcher = /^(\d+)?:(\d+)?:(\d+)?$/

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.format = this.format.bind(this)
  }

  handleChange(e) {
    let { name, value } = e.target
    value = value.substring(0, 2)
    value = name === "hours" ? Math.min(value, 99) : Math.min(value, 59)
    this.props.onChange(
      this.format({
        [name]: value,
      })
    )
  }

  format(updates) {
    let { hours, minutes, seconds } = Object.assign(this.parse(), updates)
    return (
      (hours + "").padStart(2, "0") +
      ":" +
      (minutes + "").padStart(2, "0") +
      ":" +
      (seconds + "").padStart(2, "0")
    )
  }

  parse() {
    let groups = this.matcher.exec(this.props.value) || []
    return {
      hours: groups[1] || "",
      minutes: groups[2] || "",
      seconds: groups[3] || "",
    }
  }

  render() {
    let {
      forID,
      classNameWrapper,
      classNameLabel,
      classNameLabelActive,
      hasActiveStyle,
      setActiveStyle,
      setInactiveStyle,
    } = this.props

    let { hours, minutes, seconds } = this.parse()
    let hoursId = `${forID}-hours`
    let minutesId = `${forID}-minutes`
    let secondsId = `${forID}-seconds`

    let changeProps = {
      className: classNameWrapper,
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle,
    }

    let inputProps = {
      type: "number",
      min: "0",
      maxlength: 2,
      onChange: this.handleChange,
    }

    let labelProps = {
      className: `${classNameLabel} ${
        hasActiveStyle ? classNameLabelActive : ""
      }`,
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle,
    }

    return (
      <div id={forID} {...changeProps}>
        <FlexContainer>
          <FlexChild>
            <label {...labelProps} for={hoursId}>
              Hours
            </label>
            <input
              {...inputProps}
              {...changeProps}
              id={hoursId}
              name="hours"
              max="99"
              value={parseInt(hours, 10) || ""}
            />
          </FlexChild>
          <FlexChild>
            <label {...labelProps} for={minutesId}>
              Minutes
            </label>
            <input
              {...inputProps}
              {...changeProps}
              id={minutesId}
              name="minutes"
              max="59"
              value={parseInt(minutes, 10) || ""}
            />
          </FlexChild>
          <FlexChild>
            <label {...labelProps} for={secondsId}>
              Seconds
            </label>
            <input
              {...inputProps}
              {...changeProps}
              id={secondsId}
              name="seconds"
              max="59"
              value={parseInt(seconds, 10) || ""}
            />
          </FlexChild>
        </FlexContainer>
      </div>
    )
  }
}

export class DurationPreview extends Component {
  render() {
    return (
      <div>
        <strong>Duration:</strong> {this.props.value}
      </div>
    )
  }
}

CMS.registerWidget("duration", DurationFile, DurationPreview)
