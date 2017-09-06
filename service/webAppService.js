var fs = require('fs');
exports.get_test_data = function(){
	var content = fs.readFileSync('./mock/test.json','utf-8');
	return content;
}

// 主页
exports.get_index_data = function(){
	var content = fs.readFileSync('./mock/home.json','utf-8');
	return content;
}

// 排行
exports.get_rank_data = function(){
	var content = fs.readFileSync('./mock/rank.json','utf-8');
	return content;
}

// 书籍
exports.get_book_data = function(id){
	if(!id){
		id = "18218";
	}
	var content = fs.readFileSync('./mock/book/' + id + '.json','utf-8');
	return content;
}

exports.get_search_data = function(start,end,keyword){
	return function(cb){
		var http = require('http');
		var qs = require('querystring');
		var data = {
			s:keyword,
			start:start,
			end:end
		};
		
		var content = qs.stringify(data);
		var http_request = {
			hostname:'dushu.xiaomi.com',
			port:80,
			path:'/store/v0/lib/query/onebox?' + content
		}
		
		req_obj = http.request(http_request,function(_res){
			var content = '';
			_res.setEncoding('utf8');
			_res.on('data',function(chunk){
				content += chunk;
			});
			_res.on('end',function(){
				cb(null,content);
			});
		});
		
		req_obj.on('error',function(){
		});
		
		req_obj.end();
	}
}
