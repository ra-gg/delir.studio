import * as React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { SiteHeader } from "../components/SiteHeader";
import { createGlobalStyle } from "styled-components";
import "./flexboxgrid.css";
import { SiteFooter } from "../components/SiteFooter";

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  location: {
    pathname: string;
  };
  children: any;
}

const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;


    background-color: $color-base;

    font-family: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Roboto, 'YuGothic', '游ゴシック Medium', 'Hiragino Kaku Gothic ProN', meiryo, sans-serif;
    font-size: 16px;
    line-height: 1.5;
  }

  a {
    color: #11abcd;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  h1 {
    font-size: 32px;
    margin: 32px 0 16px;

    .inline {
      display: inline-block;
    }
  }

  h2 {
    font-size: 24px;
    margin: 24px 0 16px;

    .inline {
      display: inline-block;
    }
  }

  h3 {
    font-size: 1.4rem;
    margin: 1.6rem 0 1rem;

    .inline {
      display: inline-block;
    }
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export default (props: DefaultLayoutProps) => {
  return (
    <div>
      <GlobalStyle />
      <Helmet
        title="Delir"
        meta={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
          },
          { name: "description", content: "Web technology driven VFX App" },
          { name: "keywords", content: "vfx,movie creation,p5.js" }
        ]}
      />
      <SiteHeader />
      <main>{props.children()}</main>
      <SiteFooter />
    </div>
  );
};
