const webpack=require('webpack');
const path=require('path');
const UglifyJSPlugin=require('uglifyjs-webpack-plugin');

const publicPath='http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const devConfig={
    //页面入口文件
	//entry:__dirname+"/app/index.js",
	entry:{
		output:['./app/index.js',hotMiddlewareScript]
	},
	//入口文件输出
	/*output:{
		path:__dirname+"/public/output",   //输出文件路径
		filename:"[name].bundle.js"    //输出文件名
	},*/
	output:{
        filename: './bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: publicPath
	},
	mode:"development",
	module:{
		//加载器配置
		rules:[{
			test:/\.js$/,
			exclude:/node_modules/,
			/*use:[{
				loader:"babel-loader",
				options:{presets:["react","es2015"]},
				plugins:[
				["import",{libraryName:"antd",style:"css"}]
				]
			}],*/
			loader:'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0',
			query:{
				presets:['react','es2015','stage-0'],
				plugins:[
				["transform-class-properties"],         //在组件中使用箭头函数
				[
				"import",{libraryName:"antd",style:"css"}],//不用整个将antd.css导入，可在需要某些组件时import引入
				[

				"transform-runtime",               //避免用async出现问题
					{
					"helpers": false,
					"polyfill": false,
					"regenerator": true,
					"moduleName": 
					"babel-runtime"
					}
				]
				]
			}
		},
		{
			test:/\.css$/,
			use:["style-loader","css-loader"]
		}
		]
	},
	resolve:{
		//自动扩展后缀名，require模块可以省略不写后缀名
		extensions:['.js','.jsx','.css','.json']
	//查找module的话从这里开始查找
        //root: 'E:/github/flux-example/src', //绝对路径
       // alias: {
            //AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            //ActionType : 'js/actions/ActionType.js',
           // AppAction : 'js/actions/AppAction.js'
	},
	//插件项
	plugins:[
	    new UglifyJSPlugin({
	    	uglifyOptions:{
	    		compress:{
	    			warnings:false,
	    		},
	    		output:{
	    			comments:false,
	    		},
	    	}
	    }),
	new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
	]
}

module.exports=devConfig;
