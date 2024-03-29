const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = {
    entry: "./src/index",
    mode: "production",
    output: {
        publicPath: "auto",
        chunkFilename: "[id].[contenthash].js",
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|jpeg|svg)$/,
                loader: "url-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-env' /* to transfer any advansed ES to ES5 */,
                        '@babel/preset-react',
                    ], // to compile react to ES5
                }
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "shell",
            filename: "remoteEntry.js",
            remotes: {
                // shell: "shell@http://localhost:8000/remoteEntry.js",
                // dashboard: "dashboard@https://micro-dashboard.netlify.app/remoteEntry.js",
                order: "order@https://micro-order.netlify.app/remoteEntry.js",
                // profile: "profile@https://micro-profile.netlify.app/remoteEntry.js",
            },
            exposes: {
                "./Shell": "./src/components/shell/Shell",
                "./Service": "./src/context/Service",
            },
            shared: [
                {
                    ...deps,
                    react: {
                        singleton: true,
                        requiredVersion: deps.react,
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: deps["react-dom"],
                    },
                },
                // Workaround explaination: https://www.youtube.com/watch?v=-LNcpralkjM&t=540
                "./src/context/Service",
            ],
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};