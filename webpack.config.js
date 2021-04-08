require('dotenv').config();
const path = require("path");
const webpack = require("webpack");

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
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000/",
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),   // to see any changes without constant refreshes (Hot Module Replacement);
  ]
};