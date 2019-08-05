import React from "react"
import styled from "@emotion/styled"

import ConsumerContext from "../components/application-context"
import Image from "../components/image"
import LinedHeading from "../components/lined-heading"
import SEO from "../components/seo"
import { mediaQueries } from "../utils/style-vars"

let castMembers = [
  {
    name: "Dustin Coreale",
    character: "Tag Taylor",
    image: "tag",
  },
  {
    name: "Summer McCarley",
    character: "Dottie Guffey",
    image: "dottie",
  },
  {
    name: "Kiersten Hoffman",
    character: "Norma",
    image: "norma",
  },
  {
    name: "Daniel Felarca",
    character: "Arcade Klink",
    image: "arcade",
  },
  {
    name: "Kathryn Schmidt",
    character: "Marion Thornhill",
    image: "marion",
  },
  {
    name: "Maura Mazurowsi",
    character: "Peggy Jenkins",
    image: "peggy",
  },
  {
    name: "Beau Cribbs",
    character: "Tex Houson",
    image: "tex",
  },
  {
    name: "Ebbie Shover",
    character: "June Schoolnik",
    image: "june",
  },
]

let AboutPage = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;

  .description-wrapper {
    border-bottom: 1px solid #9d9d9d;
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;

    .description {
      max-width: 900px;
      margin: 0 auto;
    }
  }

  .as {
    margin: 0.7rem auto;
    width: 80%;
  }

  .name {
    margin-bottom: 0.5rem;
  }
`

let Cast = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin-bottom: 2.5rem;
  text-align: center;
  justify-content: center;

  &:last-of-type {
    margin-bottom: 0;
  }

  ${mediaQueries[1]} {
    padding: 0 4rem;
  }

  ${mediaQueries[2]} {
    padding: 0 2rem;
  }
`

let CastMember = styled.div`
  width: 48%;
  margin-right: 4%;
  margin-bottom: 2rem;

  hr {
    background-color: #9d9d9d;
    margin: 1rem 0;
  }

  .gatsby-image-wrapper {
    margin-bottom: 1rem;
  }

  &:nth-of-type(2n) {
    margin-right: 0;
  }

  ${mediaQueries[1]} {
    width: 42%;
    margin-right: 16%;
  }

  ${mediaQueries[2]} {
    width: 23.5%;
    margin-right: 2%;
    &:nth-of-type(2n) {
      margin-right: 2%;
    }
    &:nth-of-type(4n) {
      margin-right: 0;
    }
  }
`

let CrewBlock = styled.div`
  width: 100%;
  margin-bottom: 3rem;

  &:last-of-type {
    margin-bottom: 0;
  }

  ${mediaQueries[1]} {
    width: 48%;
    margin-right: 4%;
    margin-bottom: 0;

    &:nth-of-type(2n) {
      margin-right: 0;
    }
  }
`

let CrewSet = styled.div`
  display: flex;
`

let CrewMember = styled.div`
  width: 50%;
`

export default () => (
  <ConsumerContext>
    {({ context, set }) => {
      if (context.banner !== "team") {
        set({ banner: "team" })
      }
      return (
        <AboutPage>
          <SEO title="About" />

          <div className="description-wrapper">
            <div className="description">
              <h1>Prepare to be thrilled, shocked, and awed!</h1>
              <p>
                Coalition Radio Hour is a live, improvised radio drama
                production performed and recorded at the the Coalition Theater
                in Richmond VA. Crammed with Romance! Intrigue! Murder!? Each
                episode features two heart-pounding dramas, with live musical
                accompaniment, mildly intrusive commercial breaks, and more!
                This is a trip to the 1940s you won't want to miss!
              </p>
              <dl>
                <dt>Wilde Frontier</dt>
                <dd>
                  Take to the untaimed plains of Whitetail Wyoming with Sheriff
                  Prairie Wilde and her scrappy, child companion, Savana
                  Greenhorn as they try to lasso the moral quandries of small
                  town life and the Wilde west.
                </dd>

                <dt>Scotch on the Rocks</dt>
                <dd>
                  Shake the greasy palm of New York City and find yourself in
                  the thick of trouble with Detective Rocky Scotch and his none
                  too amused assistant, Brandy Neat. Dog gone missing? Bumps in
                  the night? Whatever makes a few bucks, Scotch is on the case!
                </dd>

                <dt>Hart's Desire</dt>
                <dd>
                  Prepare to succumb to your deepest romantic urges. Desirée
                  Hart is on the hunt for true love. The only thing standing in
                  her way? Her irresistably sultry sex-pot of a mother, Blythe
                  Hart.
                </dd>
              </dl>
            </div>
          </div>

          <Cast>
            {castMembers.map(member => (
              <CastMember>
                <Image
                  src={`${member.image}.png`}
                  alt={`${member.name} is ${member.character}`}
                />
                <h6 className="name">{member.name}</h6>
                <LinedHeading className="as" size="h6">
                  as
                </LinedHeading>
                <h3>{member.character}</h3>
              </CastMember>
            ))}
          </Cast>
          <Cast className="center">
            <CastMember>
              <h6 className="name">David Pijor</h6>
              <LinedHeading className="as" size="h6">
                as
              </LinedHeading>
              <h3>Sir Ian Killbreath</h3>
            </CastMember>
          </Cast>

          <Cast>
            <CrewBlock>
              <h1>Music By</h1>
              <CrewSet>
                <CrewMember>
                  <h6 className="name">David Robbins</h6>
                  <LinedHeading className="as" size="h6">
                    as
                  </LinedHeading>
                  <h3>Tabletop Joe</h3>
                </CrewMember>
                <CrewMember>
                  <h6 className="name">Hiko Xu</h6>
                  <LinedHeading className="as" size="h6">
                    as
                  </LinedHeading>
                  <h3>Hiko Xu</h3>
                </CrewMember>
              </CrewSet>
            </CrewBlock>
            <CrewBlock>
              <h1>Produced By</h1>
              <CrewSet>
                <CrewMember>
                  <h6 className="name">Zane Adickes</h6>
                  <LinedHeading className="as" size="h6">
                    as
                  </LinedHeading>
                  <h3>Dale McMickle</h3>
                </CrewMember>
                <CrewMember>
                  <h6 className="name">Adam Stackhouse</h6>
                  <LinedHeading className="as" size="h6">
                    as
                  </LinedHeading>
                  <h3>Alexa</h3>
                </CrewMember>
              </CrewSet>
            </CrewBlock>
          </Cast>
          {/* <Subscribe></Subscribe> */}
        </AboutPage>
      )
    }}
  </ConsumerContext>
)
