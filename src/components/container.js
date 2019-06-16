import React from "react"
import styled from "@emotion/styled"

let Container = styled.div`
  max-width: 1132px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
`

export default ({ children }) => {
  return <Container>{children}</Container>
}
