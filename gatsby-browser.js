import { anchorate } from "anchorate"

export const onRouteUpdate = () => {
  anchorate({
    scroller: function(element) {
      if (!element) return false
      element.scrollIntoView({ behavior: "smooth" })
      return true
    },
  })
}

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`)
    console.log(`# IntersectionObserver is polyfilled!`)
  }
}
