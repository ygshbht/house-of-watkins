const mode = "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const express = require("express");
const path = require("path");

module.exports = {
	// mode defaults to 'production' if not set
	mode: mode,
	entry: "./src/index.ts",
	// entry not required if using `src/index.js` default
	// output not required if using `dist/main.js` default

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			// {
			// 	test: /\.js?$/,
			// 	use: "html-webpack-plugin",
			// 	exclude: /node_modules/,
			// },

			{
				test: /\.glsl$/i,
				loader: "html-loader",
			},
		],
	},

	devtool: "source-map",
	resolve: {
		extensions: [".ts", ".js", ".json"],
	},

	plugins: [new HtmlWebpackPlugin({ template: "./template.htm" })],
};
