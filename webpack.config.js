const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

// access environment variables from React;
const env = Object.keys(dotenv.config().parsed).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: "./src/index.js",  // where our application starts + where to start bundling our files;
  mode: "development",      // adds a mode flag when we run the development server;
  module: {
    rules: [                // how exported JS + CSS modules are transformed;
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {                                   
    path: path.resolve(__dirname, "dist/"),   // where to put our bundled files;
    publicPath: "/dist/",                     // public URL directory for bundled files + `webpack-dev-server` to serve these files;
    filename: "bundle.js"
  },
  devServer: {                                    // config `webpack-dev-server`
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",    // output.publicPath !== devServer.publicPath;
    hotOnly: true,
    stats: 'summary',                             // display webpack version, warnings count and errors count on reload;
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),   // to see any changes without constant refreshes (Hot Module Replacement);
    new webpack.DefinePlugin(env)               // to access environment variables (process.env.[VARIABLE_NAME]);
  ]
};