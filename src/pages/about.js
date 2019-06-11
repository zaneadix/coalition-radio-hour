import React from "react"
import { Link } from "gatsby"

import AppLayout from "../layouts/app-layout"
import SEO from "../components/seo"

export default () => (
  <AppLayout>
    {() => (
      <>
        <SEO title="About" keywords={[`gatsby`, `application`, `react`]} />
        <h1>About</h1>
        <Link to="">Home</Link>
      </>
    )}
  </AppLayout>
)
