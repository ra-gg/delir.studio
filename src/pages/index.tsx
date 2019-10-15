import React, { ReactNode } from "react";
import { Container } from "../components/Container";
import styled from "styled-components";
import { cssVars } from "../utils/cssVars";
import { darken } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSuperscript,
  faCubes
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

const Hero = styled.section`
  padding: 32px 0;
  color: #e8e8e8;
  background-color: ${darken(0.05, cssVars.colors.appBg)};
`;

const Title = styled.h1`
  margin: 0 0 16px;
  font-size: 32px;

  ${cssVars.media.mobile`
    text-align: center;
  `}
`;

const SubTitle = styled.h2`
  margin: 0 0 56px;
  font-size: 20px;
  font-weight: normal;

  ${cssVars.media.mobile`
    margin: 0 0 24px;
    text-align: center;
  `}
`;

const DownloadButton = styled.a`
  display: block;
  padding: 16px;
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  text-align: center;
  background-color: ${cssVars.colors.theming};
  color: #fff;
  border-radius: 4px;
  text-decoration: none !important;

  ${cssVars.media.mobile`
    margin: 0 0 24px;
  `}

  small {
    display: block;
    margin-top: 2px;
    font-size: 14px;
    font-weight: normal;
  }
`;

const HeroImage = styled.img`
  display: block;
  width: 100%;

  ${cssVars.media.mobile`
    margin-bottom: -32px;
  `}
`;

const FeatureIcon = styled.div`
  position: relative;

  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    transform: translate(-50%, -50%);
  }

  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

const FeatureList = styled.div`
  display: grid;
  gap: 64px;
  grid-template-columns: 1fr 1fr 1fr;

  ${cssVars.media.mobile`
    gap: 16px;
    grid-template-columns: 1fr;
  `}
`;

const Feature = ({
  title,
  desc,
  icon
}: {
  title: string;
  desc: ReactNode;
  icon: ReactNode;
}) => {
  return (
    <div>
      <FeatureIcon>
        <div>{icon}</div>
      </FeatureIcon>
      <h2 style={{ textAlign: "center" }}>{title}</h2>
      <p>{desc}</p>
    </div>
  );
};

export default (props: IndexPageProps) => {
  return (
    <Layout>
      <Hero>
        <Container>
          <div className="row">
            <div
              className="col-xs-12 col-md-5"
              style={{
                overflow: "hidden",
                display: "flex",
                flexFlow: "column",
                justifyContent: "center"
              }}
            >
              <div>
                <Title>Delir</Title>
                <SubTitle>
                  Web technology driven VFX app
                  <br />
                  (Alpha release)
                </SubTitle>
              </div>
              <DownloadButton href="https://github.com/ra-gg/Delir/releases/latest">
                Download
                <small>Available on Windows, macOS and Linux</small>
              </DownloadButton>
            </div>
            <div className="col-xs-12 col-md-7">
              <HeroImage src={require("../assets/screenshot.png")} />
            </div>
          </div>
        </Container>
      </Hero>

      <Container as="section" style={{ paddingBottom: "32px" }}>
        <h1 style={{ textAlign: "center" }}>Features</h1>

        <FeatureList>
          <Feature
            title="p5.js integration"
            desc="Engine usable as node package, it's published as `@delirvfx/core` on npm"
            icon={
              <img
                src={require("../assets/p5js.svg")}
                style={{
                  position: "absolute",
                  top: "50%",
                  width: "100%",
                  transform: "translateY(-50%)"
                }}
              />
            }
          />

          <Feature
            title="Post-effect by WebGL"
            desc={
              <>
                <b>(Experimental)</b>
                <br />
                Support post processing with HTML5 Canvas and WebGL
              </>
            }
            icon={
              <img
                src={require("../assets/webgl.svg")}
                style={{
                  position: "absolute",
                  top: "50%",
                  width: "100%",
                  transform: "translateY(-50%)"
                }}
              />
            }
          />

          <Feature
            title="Stand-alone engine"
            desc="Engine usable as stand-alone, it's published as `@delirvfx/core` on npm"
            icon={
              <FontAwesomeIcon
                style={{ width: "100%", height: "100%", color: "#ddd" }}
                icon={faCubes}
              />
            }
          />

          <Feature
            title="Basic editing"
            desc="Support basic editing. Can using video, image (of course SVG support), audio"
            icon={
              <FontAwesomeIcon
                style={{ width: "100%", height: "100%", color: "#ddd" }}
                icon={faEdit}
              />
            }
          />
          <Feature
            title="Expression support"
            desc="Expression works, with animated value, with early JavaScript syntax"
            icon={
              <FontAwesomeIcon
                style={{ width: "100%", height: "100%", color: "#ddd" }}
                icon={faSuperscript}
              />
            }
          />
        </FeatureList>
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
