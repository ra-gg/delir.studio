import g from "gulp";
import { spawn } from "child_process";
import rmfr from "rmfr";
import { join } from "path";

export async function cleanBuild() {
  await rmfr(join(__dirname, "public"));
}

export function gitbookBuild() {
  return new Promise((resolve, reject) => {
    spawn("yarn", ["book:build"], { stdio: "inherit" }).on("exit", code =>
      code === 0 ? resolve() : reject()
    );
  });
}

export function gatsbyBuild() {
  return new Promise((resolve, reject) => {
    spawn("yarn", ["gatsby", "build"], { stdio: "inherit" }).on("exit", code =>
      code === 0 ? resolve() : reject()
    );
  });
}

export function runGatsby() {
  spawn("yarn", ["gatsby", "develop"], { stdio: "inherit" });
  return Promise.resolve();
}

export function gitbookWatch() {
  spawn("yarn", ["book:dev", "--", "--port", "4001"], { stdio: "inherit" });
  return Promise.resolve();
}

export const build = g.series(
  cleanBuild,
  g.parallel(gitbookBuild, gatsbyBuild)
);

export const watch = g.parallel(gitbookWatch, runGatsby);
