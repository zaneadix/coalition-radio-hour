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
  baseFontSize: "16px",
  baseLineHeight: 1.45,
  scaleRatio: 2,
  headerFontFamily: stack,
  bodyFontFamily: stack,
  googleFonts: [
    {
      name: "Poppins",
      styles: ["300", "400", "700"],
    },
  ],
})

export const { scale, rhythm, options } = typography
export default typography
