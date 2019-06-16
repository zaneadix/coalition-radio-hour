import React from "react"
import AppLayout from "./src/layouts/app-layout"

export const wrapPageElement = ({ element, props }) => {
  return <AppLayout {...props}>{element}</AppLayout>
}
