var path = require('path');
var webpack = require('webpack');

module.exports = {
  	devtool: 'eval',
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
  		'webpack/hot/only-dev-server',
		'./src/main.js',
	],
	output: {
		path: path.join(__dirname, 'static'),
    	filename: 'bundle.js',
	    publicPath: '/static/'
	},
	resolve: {
        root: [path.join(__dirname, 'src')]
    },    
	module: {
		loaders: [
			{
				test: /\.jsx$/,
  				exclude: /node_modules/,
  				loaders: ["react-hot", "babel-loader?presets[]=react,presets[]=es2015"]
			},
			{
				test: /\.js$/,
  				exclude: /node_modules/,
  				loaders: ["react-hot", "babel-loader?presets[]=es2015"]
			},
			{ 
				test: /\.css$/, 
				loader: "style-loader!css-loader" 
			},
			{ 
				test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
				loader: 'url-loader?limit=100000' 
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};

