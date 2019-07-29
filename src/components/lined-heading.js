import React from "react"
import styled from "@emotion/styled"

let sharedStyles = `
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

let H1 = styled.h1`
  ${sharedStyles}
`
let H2 = styled.h2`
  ${sharedStyles}
`
let H3 = styled.h3`
  ${sharedStyles}
`
let H4 = styled.h4`
  ${sharedStyles}
`
let H5 = styled.h5`
  ${sharedStyles}
`
let H6 = styled.h6`
  ${sharedStyles}
`

export default props => {
  let Heading
  switch (props.size) {
    case "h2":
      Heading = H2
      break
    case "h3":
      Heading = H3
      break
    case "h4":
      Heading = H4
      break
    case "h5":
      Heading = H5
      break
    case "h6":
      Heading = H6
      break
    default:
      Heading = H1
  }
  return <Heading className={props.className}>{props.children}</Heading>
}
