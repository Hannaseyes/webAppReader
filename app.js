var koa = require('koa');
var controller = require('koa-route');
var app = koa();

var views = require('co-views');
var render = views('./view',{
	map : { html : 'ejs' }
});

var koa_static = require('koa-static-server');
var service = require('./service/webAppService');
var querystring = require('querystring');

app.use(koa_static({
	rootDir:'./static/',
	rootPath:'/static/',
	maxage : 0
}));

app.use(controller.get('/route_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body = 'Hello koa!';
}));

app.use(controller.get('/ejs_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('test',{title:'title_test'});
}));

app.use(controller.get('/api_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_test_data();
}));

// 默认访问首页
app.use(controller.get('/',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('index',{title:'书城首页'});
}));

// 搜索页
app.use(controller.get('/search',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('search',{title:'搜索页面'});
}));

// 女生频道
app.use(controller.get('/female',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('female',{title:'女生频道'});
}));

// 男生频道
app.use(controller.get('/male',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('male',{title:'男生频道'});
}));

// 排行
app.use(controller.get('/rank',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('rank',{title:'排行'});
}));

// 分类
app.use(controller.get('/category',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('category',{title:'分类'});
}));

// 书籍页
app.use(controller.get('/book',function*(){
	this.set('Cache-Control','no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	this.body = yield render('book',{title:'书籍详情',bookId:bookId});
}));

// 主页
app.use(controller.get('/ajax/index',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_index_data();
}));

// 排行
app.use(controller.get('/ajax/rank',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_rank_data();
}));

// 书籍
app.use(controller.get('/ajax/book',function*(){
	this.set('Cache-Control','no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
		id = "";
	}
	this.body = service.get_book_data(id);
}));

app.use(controller.get('/ajax/search',function*(){
	this.set('Cache-Control','no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start,end,keyword);
}));

app.listen(3001);
console.log('Koa server is started!');
