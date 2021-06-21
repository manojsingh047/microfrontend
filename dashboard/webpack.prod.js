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
            name: "dashboard",
            filename: "remoteEntry.js",
            remotes: {
                shell: "shell@https://micro-shell.netlify.app/remoteEntry.js",
            },
            exposes: {
                "./DashboardService": "./src/components/dashboard-service/DashboardService",
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
            ],
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};