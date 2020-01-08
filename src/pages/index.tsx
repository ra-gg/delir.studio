import React, { ReactNode, useRef, useEffect } from "react";
import { Container } from "../components/Container";
import styled from "styled-components";
import { cssVars } from "../utils/cssVars";
import { darken } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSuperscript,
  faCubes,
  faPlug
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import useMeasure from "use-measure";

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
  position: relative;
  padding: 64px 0;
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

const rangeRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

class Particle {
  private type: "stroke" | "fill";
  private position: [number, number];
  private points: [number, number][] = [];
  private movement: number;
  private t: number;

  constructor(position: [number, number]) {
    this.position = position;
    this.generate();
  }

  generate() {
    this.points = [
      [-80 + 160 * Math.random(), -80 + 160 * Math.random()],
      [-80 + 160 * Math.random(), -80 + 160 * Math.random()],
      [-80 + 160 * Math.random(), -80 + 160 * Math.random()]
    ];
    this.type = Math.random() > 0.5 ? "stroke" : "fill";
    this.movement = rangeRandom(0.5, 2);
    this.t = Date.now();
  }

  render(ctx: CanvasRenderingContext2D) {
    const [p1, p2, p3] = this.points;
    const [x, y] = this.position;
    const t = Date.now() - this.t;

    ctx.beginPath();
    ctx.moveTo(p1[0] + x, p1[0] + y);
    ctx.lineTo(p2[0] + x, p2[1] + y);
    ctx.lineTo(p3[0] + x, p3[1] + y);
    ctx.closePath();

    this.type === "fill" ? ctx.fill() : ctx.stroke();

    if (Math.random() > 0.995) {
      this.type = this.type === "fill" ? "stroke" : "fill";
      this.points.forEach(vert => {
        vert[0] = rangeRandom(vert[0] - 20, vert[0] + 20);
        vert[1] = rangeRandom(vert[1] - 20, vert[1] + 20);
      });
    }

    this.points[0] = [
      this.points[0][0] * rangeRandom(0.99, 0.999),
      this.points[0][1] * rangeRandom(0.99, 0.999)
    ];
    this.points[1] = [
      this.points[1][0] * rangeRandom(0.99, 0.999),
      this.points[1][1] * rangeRandom(0.99, 0.999)
    ];
    this.points[2] = [
      this.points[2][0] * rangeRandom(0.99, 0.999),
      this.points[2][1] * rangeRandom(0.99, 0.999)
    ];

    if (y < -100) {
      this.generate();
      this.position = [
        x + rangeRandom(-0.5, 0.5),
        ctx.canvas.height * rangeRandom(1, 1.5)
      ];
    } else {
      this.position = [
        x -
          rangeRandom(-0.5, 1) * Math.sin((t * 0.1) / rangeRandom(1000, 2000)),
        y - this.movement
      ];
    }
  }
}

export default (props: IndexPageProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRect = useMeasure(canvasRef);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    let animationId: number;

    const ctx = canvasRef.current!.getContext("2d");
    const { width, height } = canvasRef.current!;

    particlesRef.current = [...Array(100)].map(
      () =>
        new Particle([width * Math.random(), height * rangeRandom(0.5, 1.5)])
    );

    const render = () => {
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      ctx.fillStyle = "rgba(255, 255, 255, .1)";
      ctx.strokeStyle = "rgba(255, 255, 255, .1)";
      particlesRef.current!.map(p => p.render(ctx));
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = canvasRect.width;
    canvas.height = canvasRect.height;
    particlesRef.current = [...Array(100)].map(
      () =>
        new Particle([
          canvas.width * Math.random(),
          canvas.height * rangeRandom(0.5, 1.5)
        ])
    );
  }, [canvasRect.width, canvasRect.height]);

  return (
    <Layout>
      <Hero>
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        />
        <Container style={{ position: "relative" }}>
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
              <DownloadButton href="https://github.com/delirvfx/delir/releases/latest">
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
            title="p5.js integration"
            desc={
              <>
                Engine usable as node package, it's published as{" "}
                <a
                  href="https://www.npmjs.com/package/@delirvfx/core"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  `@delirvfx/core` on npm
                </a>
              </>
            }
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
            title="Expression support"
            desc="Expression works, with keyframe animation and modern JavaScript syntax"
            icon={
              <FontAwesomeIcon
                style={{ width: "100%", height: "100%", color: "#ddd" }}
                icon={faSuperscript}
              />
            }
          />

          <Feature
            title="Plugin support"
            desc={
              <>
                Extensible post-effect as Plugin, It's makes with TypeScript and
                HTML5 Canvas features.{" "}
                <a href="docs/plugin/00_summary.html">Learn more (ja)</a>
              </>
            }
            icon={
              <FontAwesomeIcon
                style={{ width: "100%", height: "100%", color: "#ddd" }}
                icon={faPlug}
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
