const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
    },
    mode: 'development',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					"style-loader", // creates style nodes from JS strings
					{
						loader: "css-loader", // translates CSS into CommonJS
						options: {
							importLoaders: 1,
						},
					},
					"postcss-loader", // post process the compiled CSS
					"sass-loader", // compiles Sass to CSS, using Node Sass by default
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: isDevelopment ? "[name].css" : "[name].[hash].css",
			chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
		}),
	],
	resolve: {
		extensions: [".js", ".scss"],
	},
};
