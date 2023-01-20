const path = require("path");
const miniCss = require("mini-css-extract-plugin");

const generateEntries = require("./generateEntries");
const generateHtmlTemplatePlugin = require("./generateHtmlTemplatePlugin");

const OUTPUT_PATH = path.resolve(__dirname, "../../../backend/client/public/pages");

module.exports = (mode) => {
  const isDev = mode === "development" ? true : false;

  return {
    mode,
    entry: generateEntries(),
    output: {
      filename: isDev ? "[name]/js/main.js" : "[name]/js/main.[hash:6].bundle.js",
      path: OUTPUT_PATH,
      publicPath: "pages",
    },
    devtool: isDev ? "source-map" : false,
    plugins: [
      new miniCss({
        filename: isDev ? "[name]/styles/style.css" : "[name]/styles/style.[hash:6].min.css",
      }),
      ...generateHtmlTemplatePlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            miniCss.loader,
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: isDev,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDev,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|jfif)$/i,
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
  };
};
