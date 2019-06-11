import React from "react"

import AppLayout from "../layouts/app-layout"
import SEO from "../components/seo"

export default () => (
  <AppLayout>
    {() => (
      <>
        <SEO title="404: Not found" />
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </>
    )}
  </AppLayout>
)
