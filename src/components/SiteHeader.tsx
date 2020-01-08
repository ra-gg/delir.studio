import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import { Container } from "./Container";
import { cssVars } from "../utils/cssVars";

const HeaderWrapper = styled.div`
  background-color: ${cssVars.colors.appBg};
`;

const BrandLink = styled(Link)`
  display: inline-block;
  padding: 16px 8px;
  font-size: 32px;
  font-weight: 100;
  line-height: 1;
  vertical-align: middle;
  text-decoration: none !important;

  ${cssVars.media.mobile`
    padding: 8px;
    font-size: 24px;
    line-height: 1.3;
  `}

  small {
    margin-left: 0.5em;
    color: #865d98;
    font-size: 16px;
    font-weight: normal;
  }
`;

const SiteNav = styled.nav`
  padding: 0 8px;
  line-height: 16px;
  overflow: auto;
  text-align: right;
  white-space: nowrap;

  a {
    display: inline-block;
    padding: 16px 0;
    line-height: 1;

    font-size: 16px;
    line-height: 32px;

    color: #fff;

    ${cssVars.media.mobile`
        padding: 8px 0;
    `}

    & + a {
      margin-left: 16px;

      ${cssVars.media.mobile`
        margin-left: 24px;
      `}
    }
  }
`;

export const SiteHeader = () => (
  <HeaderWrapper>
    <Container>
      <div className="row between-xs">
        <div className="col-xs-12 col-md-3">
          <BrandLink to="/" style={{ color: "#fff" }}>
            Delir<small style={{ color: "#865d98" }}>Alpha.7</small>
          </BrandLink>
        </div>
        <SiteNav className="col-xs-12 col-md-9">
          <a href="/docs">Document (ja)</a>
          <a href="https://spectrum.chat/delirvfx">Forum</a>
          <a href="https://discord.gg/rrr2z2E ">Discord</a>
          <a href="https://github.com/delirvfx/delir">GitHub</a>
          <a href="https://trello.com/b/2WiN64z2/delir">Roadmap</a>
        </SiteNav>
      </div>
    </Container>
  </HeaderWrapper>
);
