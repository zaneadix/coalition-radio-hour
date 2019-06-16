import React, { Component } from "react"
import { css } from "emotion"

export default class ImageIcon extends Component {
  componentWillMount() {
    let { off, on } = this.props
    this.styles = css`
      position: relative;
      &:after {
        display: block;
        opacity: 0;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-image: url(${on});
        background-size: 100%;
        background-repeat: no-repeat;
        transition: opacity filter 0.3s;
      }
      &:hover {
        &:after {
          filter: opacity(100%);
          opacity: 1;
        }
      }
    `
  }

  render() {
    return (
      <div className={this.styles}>
        <img src={this.props.off}></img>
      </div>
    )
  }
}
