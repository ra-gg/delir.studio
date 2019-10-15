import React from "react";
import styled from "styled-components";
import { cssVars } from "../utils/cssVars";
import { Container } from "./Container";

const Wrapper = styled.footer`
  padding: 16px;
  color: #fff;
  background-color: ${cssVars.colors.appBg};

  a {
    color: #fff;
  }
`;

export const SiteFooter = () => {
  return (
    <Wrapper>
      <Container>
        <a href="https://twitter.com/delirvfx">Follow @delirvfx on Twitter</a>
      </Container>
    </Wrapper>
  );
};
