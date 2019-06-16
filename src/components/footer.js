import React from "react"
import styled from "@emotion/styled"

import Container from "./container.js"

let Footer = styled.footer`
  background-color: #000;
  color: #fff;
  padding-top: 3rem;
  padding-bottom: 7rem;
  text-align: center;

  a {
    color: #fff;
  }

  p {
    margin-bottom: 0;
  }

  h3 {
    font-weight: 400;
    &.association {
      margin-bottom: 0.5rem;
    }
  }
`

export default () => (
  <Footer>
    <Container>
      <h3 className="association">
        Proudly associated with the{" "}
        <a href="http://rvacomedy.com" target="_blank_">
          Coalition Theater
        </a>
      </h3>
      <h3>
        All rights reserved by Coalition Radio Hour {new Date().getFullYear()}
      </h3>
      <p>Find Us on that new-fangled interweb</p>
    </Container>
  </Footer>
)
