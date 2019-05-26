// eslint-disable-next-line
import React, { Component, createElement } from "react"
import * as moment from "moment"
import CMS from "netlify-cms-app"
import { parse } from "id3-parser"

export class AudioFile extends Component {
  downloadLimit = 1048576 //1MB

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    let { value: url } = e.target
    this.props.onChange(url)

    //Request
    this.timeoutId && clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(async () => {
      await fetch(url, {
        headers: {
          range: `bytes=0-${this.downloadLimit}`,
        },
      })
        .then(response => {
          // Pull entire file-size from content range value
          console.log(response.headers.get("content-range"))
          let contentRange = response.headers.get("content-range")
          console.log(contentRange)
          let fileSize = (/\/(\d+)/.exec(contentRange) || [])[1]

          if (!fileSize) {
            throw new Error("Unable to retrieve file size")
          }

          fileSize = parseInt(fileSize)

          let downloadLimit = Math.min(fileSize, this.downloadLimit)
          let reader = response.body.getReader()
          let stream = new ReadableStream({
            start(controller) {
              let totalBytes = 0
              let totalDuration = 0
              return next()
              function next() {
                return reader.read().then(async ({ done, value }) => {
                  let context = new AudioContext()
                  value && (totalBytes += value.length)

                  try {
                    console.log(value)
                    await context
                      .decodeAudioData(value.buffer)
                      .then(data => {
                        console.log(data)
                        let { duration } = data
                        totalDuration += duration
                      })
                      .catch(fuck => {
                        console.log(fuck)
                      })
                    //download atleast 1mb if it's available
                    console.log(totalBytes, ":::", downloadLimit)
                    if (totalBytes >= downloadLimit || done) {
                      reader.cancel()
                      controller.close()
                      let kbps = Math.floor(
                        (totalBytes * 8) / totalDuration / 1000
                      )
                      let duration = moment.duration((fileSize * 8) / kbps)
                      let timestamp = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
                      console.log("ESTIMATED DURATION:", timestamp)
                      console.log("Total bytes downloaded:", totalBytes)
                    } else {
                      return next()
                    }
                  } catch (e) {
                    console.log(e.name, e.message, e.code)
                  }
                })
              }
            },
          })
          // return new Response(stream)
        })
        // .then(response => {
        //   response.then(hey => {
        //     console.log("OH SHIT", hey)
        //   })
        // })
        .catch(error => {
          console.log(error)
        })
        .finally(data => {
          console.log("FINALLY", data)
          this.timeoutId = null
        })
    }, 2000)
  }

  render() {
    var {
      value,
      forId,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle,
    } = this.props
    return createElement("input", {
      type: "url",
      value,
      id: forId,
      className: classNameWrapper,
      onChange: this.handleChange,
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle,
    })
  }
}

export class AudioFilePreview extends Component {
  render() {
    return createElement("p", { value: this.props.value })
  }
}

CMS.registerWidget("anus", AudioFile, AudioFilePreview)
