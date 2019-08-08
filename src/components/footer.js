import React from "react"
import styled from "@emotion/styled"

import masky from "../images/icons/masky.svg"
import facebook from "../images/icons/facebook-square.svg"
import instagram from "../images/icons/camera-retro.svg"

import Container from "./container.js"
import { mediaQueries, colors } from "../utils/style-vars"

let Footer = styled.footer`
  background-color: #000;
  color: #fff;

  // text-align: center;

  a {
    color: ${colors.accentOrange};
  }

  h3 {
    font-weight: 400;
    &.association {
      margin-bottom: 0.5rem;
    }
  }

  .links {
    display: flex;
  }

  .footer-body {
    padding-top: 3rem;
    padding-bottom: 7rem;
    position: relative;

    .social {
      text-align: center;
      margin-bottom: 1.5rem;
      svg {
        fill: #fff;
        height: 3rem;
        width: 3rem;
        margin-right: 1.5rem;
        &::last-of-type {
          margin-right: 0;
        }
      }

      ${mediaQueries[1]} {
        margin-bottom: 4rem;
      }
    }

    .copyright {
      font-size: 0.7rem;
      margin-bottom: 0;
      text-align: center;

      ${mediaQueries[1]} {
        position: absolute;
        right: 0;
        bottom: 7rem;
        text-align: right;
      }
    }

    .coalition-callout {
      text-align: center;
      margin-bottom: 1.5rem;
      p {
        font-size: 0.7rem;
        margin-bottom: 0;
      }
      a {
        font-size: 1rem;
      }
      svg {
        height: 1rem;
        width: 1rem;
        margin-right: 0.5rem;
        fill: ${colors.accentOrange};
      }

      ${mediaQueries[1]} {
        position: absolute;
        left: 0;
        bottom: 7rem;
        margin-bottom: 0;
        text-align: left;

        p.proud {
          margin-left: 1.5rem;
        }
      }
    }
  }
`

export default () => (
  <Footer>
    <Container>
      <div className="footer-body">
        <div className="social">
          <h3>Find us on that new-fangled interweb</h3>
          <a
            href="https://www.facebook.com/coalitionradiohour"
            target="_blank_"
          >
            <svg>
              <use xlinkHref={`#${facebook.id}`} />
            </svg>
          </a>
          <a href="https://www.instagram.com/rvacomedy" target="_blank_">
            <svg>
              <use xlinkHref={`#${instagram.id}`} />
            </svg>
          </a>
        </div>
        <div className="coalition-callout">
          <p className="proud">
            Proudly part of <br></br>
          </p>
          <p>
            <svg>
              <use xlinkHref={`#${masky.id}`} />
            </svg>
            <a href="http://rvacomedy.com" target="_blank_">
              The Coalition Theater
            </a>
          </p>
        </div>
        <p className="copyright">
          All rights reserved by<br></br>Coalition Radio Hour{" "}
          {new Date().getFullYear()}
        </p>
        {/* <p>Find Us on that new-fangled interweb</p> */}
        {/* <div className="links">
        <a href="https://www.facebook.com/coalitionradiohour/" target="_blank_">
          <svg>
            <use xlinkHref={instaIcon.id} />
          </svg>
        </a>
      </div> */}
      </div>
    </Container>
  </Footer>
)
