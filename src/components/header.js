import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

import Container from "./container"
import { mediaQueries, colors } from "../utils/style-vars"

let HeaderContainer = styled.div`
  background-color: #000;
  color: ${colors.white};

  a {
    color: ${colors.white};
    &:visited {
      color: ${colors.white};
    }
    &:hover,
    &.active {
      color: ${colors.accentOrange};
    }
  }
`

let Nav = styled.ul`
  margin: 0;
  list-style: none;
  display: flex;
  // justify-content: space-between;

  ${mediaQueries[1]} {
    justify-content: flex-start;
  }
`

let NavItem = styled.li`
  margin-bottom: 0;
  font-weight: 500;
  font-size: 1.2rem;
  padding: 1.2rem 0;
  margin-right: 3rem;

  ${mediaQueries[1]} {
    margin-right: 5rem;
  }
`

export default () => (
  <HeaderContainer>
    <Container>
      <Nav>
        <NavItem>
          <Link activeClassName="active" to="/">
            Episodes
          </Link>
        </NavItem>
        <NavItem>
          <Link activeClassName="active" to="/about/">
            About
          </Link>
        </NavItem>
        <NavItem>
          <a href="https://rvacomedy.com/give/" target="_blank_">
            Support
          </a>
        </NavItem>
      </Nav>
    </Container>
  </HeaderContainer>
)
