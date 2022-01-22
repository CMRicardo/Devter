import css from "styled-jsx/css"
import { fonts, colors, breakpoints } from "../../styles/theme"
import { addOpacityToColor } from "../../styles/utils"

const backgroundColor = addOpacityToColor(colors.primary, 0.3)

export const globalStyles = css.global`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: ${fonts.base};
  }
  body {
    background-image: radial-gradient(${backgroundColor} 1px, #fdf 1px),
      radial-gradient(${backgroundColor} 1px, #fdf 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }
`

export default css`
  div {
    height: 100vh;
    display: grid;
    place-items: center;
  }
  main {
    position: relative;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    margin: 0;
  }

  @media screen and (min-width: ${breakpoints.mobile}) {
    main {
      width: clamp(300px, 500px, 80%);
      height: 90vh;
    }
  }
`
