
const express=require('express');
const path=require('path');
//const favicon=require('serve-favicon');
const logger=require('morgan');     //Morgan是一个node.js关于http请求的日志中间件
const cookieParser=require('cookie-parser');  //设置，获取和删除 cookie
const session=require('express-session');    //在服务端保存数据的中间件
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('./webpack.config.js');

const compiler = webpack(webpackDevConfig);
const app=express();
console.log("publicPath:"+ webpackDevConfig.output.publicPath)
let dbUrl='mongodb://127.0.0.1:27017/grade-statistic';
mongoose.connect(dbUrl);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connect error !'));
db.once('open', function() {
    console.log('Mongodb started !');
});

// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {

    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

app.get('/',function(req,res){
  res.render('index',{
    title:'考试系统'
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());         //表示可以使用cookie了
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret:'123',
	resave:false,
	saveUninitialized:true
}));

app.use(require('./routes.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
