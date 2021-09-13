import reset from "styled-reset";
import { createGlobalStyle, css } from "styled-components";
import palette from "./palette";

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
    border-collapse: collapse;
  }
  body {
    font-family: Noto Sans, Noto Sans KR;
    color: black;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;

export default GlobalStyle;
