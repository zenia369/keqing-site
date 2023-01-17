const path = require("path");
const miniCss = require("mini-css-extract-plugin");

const generateEntries = require("./generateEntries");
const generateHtmlTemplatePlugin = require("./generateHtmlTemplatePlugin");

const OUTPUT_PATH = path.resolve(__dirname, "../../../backend/client/public/pages");

module.exports = (mode = "development") => ({
  mode,
  entry: generateEntries(),
  output: {
    filename: "[name]/js/main.js",
    path: OUTPUT_PATH,
    publicPath: "pages",
  },
  plugins: [
    new miniCss({
      filename: "[name]/styles/style.css",
    }),
    ...generateHtmlTemplatePlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [miniCss.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: (url, resourcePath, context) => {
            const relativePath = path.relative(context, resourcePath);

            const imgPath = relativePath
              .toString()
              .trim()
              .match(/[a-zA-Z]{1,}\\([a-zA-Z]{1,}\\img|[a-zA-Z]{1,}\\images)/)[1];

            return `${imgPath}\\${url}`;
          },
        },
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: (url, resourcePath, context) => {
            const relativePath = path.relative(context, resourcePath);

            const mpPath = relativePath
              .toString()
              .trim()
              .match(/[a-zA-Z]{1,}\\([a-zA-Z]{1,}\\audio)/)[1];

            return `${mpPath}\\${url}`;
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../../src/app"),
      "@Styles": path.resolve(__dirname, "../../src/shared/styles"),
      "@Shared": path.resolve(__dirname, "../../src/shared/js"),
      "@Lib": path.resolve(__dirname, "../../lib"),
    },
  },
});
