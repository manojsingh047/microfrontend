import React, { Component, useContext } from "react";
import { createGlobalStyle } from "styled-components";
import ThemeContext, { Themes } from "./context/ThemeContext";

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Roboto:400,700");

  body {
    background: ${props => (props.theme === Themes.light ? "#ffffff" : "#000a12")};
    color: ${props => (props.theme === Themes.light ? "#1f1f1f" : "#eee")};
    font-family: "Roboto", "Franklin Gothic Medium", "Arial Narrow", Arial,
      sans-serif;
    padding: 2rem 3rem;
    line-height: 1.4;
    letter-spacing: 0.0167em;
  }
`;

function StyledTheme(props) {
  return (<GlobalStyle {...props} theme={useContext(ThemeContext)} />);
}

export default StyledTheme;
