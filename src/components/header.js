import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

import Container from "./container"

let HeaderContainer = styled.div`
  background-color: #000;
  color: #fff;

  a {
    color: #fff;
    &:visited {
      color: #fff;
    }
    &:hover,
    &.active {
      color: #e65032;
    }
  }
`

let Nav = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
`

let NavItem = styled.li`
  margin-bottom: 0;
  margin-right: 5rem;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 1.2rem 0;
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
