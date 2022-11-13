/* Webpack Configuration */
/* Take all js, css & html files in src/ and output them to dist/ */


const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.html$/,
                use: [
                    "html-loader"
                ]
            }
        ]
    },
    mode: "development"
};

// /* Webpack Configuration */

// const path = require("path");

// module.exports = {
//   entry: "./js/connect.js", // input is in src/js/index.js
//   output: {
//     // output is in dist/js/main.js
//     filename: "connect_out.js",
//     // path: path.resolve(__dirname, './dist/js'), // need to redo folder structure tbh
//     path: path.resolve(__dirname, "./js"), // TEMP
//   },
//   //   mode: "development",
//   mode: "production",
// };
