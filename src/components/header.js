import React from "react"
import { Link } from "gatsby"
import { css } from "emotion"

let header = css`
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

  .nav {
    display: flex;
    list-style: none;

    .nav-item {
      margin-bottom: 0;
      margin-right: 5rem;
      font-weight: 700;
      font-size: 1.5rem;
      padding: 1.2rem 0;
    }
  }
`

export default () => (
  <header className={header}>
    <ul className="container nav">
      <li className="nav-item">
        <Link activeClassName="active" to="/">
          Episodes
        </Link>
      </li>
      <li className="nav-item">
        <Link activeClassName="active" to="/about/">
          About
        </Link>
      </li>
      <li className="nav-item">
        <a href="https://rvacomedy.com/give/" target="_blank_">
          Support
        </a>
      </li>
    </ul>
  </header>
)
