import React from "react"
import styled from "@emotion/styled"
import { mediaQueries } from "../utils/style-vars"

let Container = styled.div`
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;

  ${mediaQueries[0]} {
    max-width: 540px;
  }

  ${mediaQueries[1]} {
    max-width: 720px;
  }

  ${mediaQueries[2]} {
    max-width: 960px;
  }

  ${mediaQueries[3]} {
    max-width: 1140px;
  }
`

export default ({ children }) => {
  return <Container>{children}</Container>
}
