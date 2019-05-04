import * as g from "gulp";
import { join } from "path";
import { spawn } from "child_process";
import * as sass from "gulp-sass";
import * as autoprefixer from "gulp-autoprefixer";
import * as pug from "gulp-pug";
import * as browserSync from "browser-sync";
import * as plumber from "gulp-plumber";
import * as webpack from "webpack";

(sass as any).compiler = require("sass");

let isDev = false;

export function setDevFlag() {
  isDev = true;
  return Promise.resolve();
}

export function copyAssets() {
  return g
    .src(["front/images/**/*", "front/fonts/**/*"], { base: "front/" })
    .pipe(g.dest("public/assets/"));
}

export function buildSass() {
  return g
    .src("front/styles/**/*.sass")
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(g.dest("public/assets/styles/"));
}

export function buildPug() {
  return g
    .src("front/**/[^_]*.pug")
    .pipe(plumber())
    .pipe(
      pug({
        basedir: "front/"
      })
    )
    .pipe(g.dest("public/"));
}

export function runWebpack(done) {
  webpack(
    {
      watch: isDev,
      context: join(__dirname, "front/js"),
      entry: {
        main: "main.ts"
      },
      output: {
        path: join(__dirname, "public/assets/js"),
        filename: "[name].js"
      },
      resolve: {
        extensions: [".js", ".ts"]
      },
      module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" }]
      }
    },
    () => done()
  );
}

export function gitbookBuild() {
  return new Promise(resolve => {
    spawn("yarn", ["book-build"], { stdio: "inherit" }).on("exit", resolve);
  });
}

export function gitbookWatch() {
  spawn("yarn", ["book-dev", "--", "--port", "4001"], { stdio: "inherit" });
  return Promise.resolve();
}

export function runBrowserSync() {
  browserSync({
    port: 4000,
    open: false,
    logLevel: "warn",
    notify: false,
    server: {
      baseDir: "public/"
    }
  });
  return Promise.resolve();
}

export function reloadBrowserSync() {
  browserSync.reload();
  return Promise.resolve();
}

export function watch() {
  g.watch("front/styles/**/*.sass", buildSass);
  g.watch(["front/images/**/*"], copyAssets);
  g.watch("front/**/*.pug", buildPug);
  g.watch("public/**/*", reloadBrowserSync);
}

export const build = g.parallel(
  runWebpack,
  buildSass,
  buildPug,
  gitbookBuild,
  copyAssets
);

export default g.series(
  setDevFlag,
  g.parallel(build, gitbookWatch),
  runBrowserSync,
  watch
);
