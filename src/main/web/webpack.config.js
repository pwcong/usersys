var path = require('path')
var webpack = require('webpack')

module.exports = {

	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['react', 'es2015'],
                    plugins: [
                        ["import", { libraryName: "antd", style: "css" }]
                    ]
				}
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
				]
			}

		]
	},

	plugins: [
		new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: JSON.stringify('production')
		  }
		}),
		new webpack.optimize.UglifyJsPlugin()
	]

}
