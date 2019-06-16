import React from "react"
import { Link, graphql } from "gatsby"

import AppLayout from "../layouts/app-layout"
import SEO from "../components/seo"

export default props => {
  let {
    data: {
      markdownRemark: { data },
    },
  } = props

  return (
    <AppLayout>
      {() => (
        <>
          <SEO title="About" keywords={[`gatsby`, `application`, `react`]} />
          <h1>{data.title}</h1>
          <Link to="">Home</Link>
        </>
      )}
    </AppLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      data: frontmatter {
        title
        image
        pubDate
        image_external
        description
        file_location
        image_url
      }
    }
  }
`
