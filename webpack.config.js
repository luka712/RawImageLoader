const path = require("path");

module.exports = {
	entry: {
		"index": "./src/index.ts"
	},
	mode: "none",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		modules: [path.resolve(__dirname, "src"), 'node_modules'],
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		library: "[name]",
		libraryTarget: "umd",
		// globalObject: "this",
		// umdNamedDefine: true,
	},
};
