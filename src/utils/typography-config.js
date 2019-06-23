import Typography from "typography"

let stack = [
  "Poppins",
  "Avenir Next",
  "Helvetica Neue",
  "Segoe UI",
  "Helvetica",
  "Arial",
  "sans-serif",
]

const typography = new Typography({
  baseFontSize: "12px",
  baseLineHeight: 1.6,
  scaleRatio: 2,
  headerFontFamily: stack,
  bodyFontFamily: stack,
  googleFonts: [
    {
      name: "Poppins",
      styles: ["400", "500", "700"],
    },
  ],
})

export const { scale, rhythm, options } = typography
export default typography
