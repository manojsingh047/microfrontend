import React, { useContext } from "react";
import styled from "styled-components";
import ThemeContext, { Themes } from "./../../context/ThemeContext";

import { gray900, white } from "./colors";

const H1Styled = styled.h1`
  color: ${props => (props.theme === Themes.light ? gray900 : white)};
  font-size: 3rem;
  text-transform: uppercase;
`;

const H2Styled = styled.h2`
  color: ${props => (props.theme === Themes.light ? gray900 : white)};
  font-size: 1.75rem;
  text-transform: uppercase;
`;

const H3Styled = styled.h3`
  color: ${props => (props.theme === Themes.light ? gray900 : white)};
  font-size: 1.5rem;
`;

const PStyled = styled.p`
  color: ${props => (props.theme === Themes.light ? gray900 : white)};
  font-size: 1rem;
`;

export function H1(props) {
    return (<H1Styled {...props} theme={useContext(ThemeContext)} />);
}

export function H2(props) {

    return (<H2Styled {...props} theme={useContext(ThemeContext)} />);
}

export function H3(props) {

    return (<H3Styled {...props} theme={useContext(ThemeContext)} />);
}

export function P(props) {

    return (<PStyled {...props} theme={useContext(ThemeContext)} />);
}
