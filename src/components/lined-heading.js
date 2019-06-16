import React from "react"
import styled from "@emotion/styled"

let LinedHeading = styled.h1`
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
  return <LinedHeading>{props.children}</LinedHeading>
}
