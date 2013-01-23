/*jshint node:true strict:false */
var express = require('express'),
	http = require('http'),
	app = express(),
	port = parseInt(process.env.PORT || 8080);

app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(function (req, res, next) {
		res.set({
			'Access-Control-Allow-Origin': '*',
		});
		next();
	});
	
	app.use(express.static(__dirname));
});

app.all('/error/400', function (req, res) {
	res.send(400, "400");
	res.end("400");
});

app.all('/error/500', function (req, res) {
	res.send(500, "500");
	res.end("500");
});


app.all('/timeout', function (req, res) {
	setTimeout(function () {
		res.end("Ok");
	}, 1500);
});

app.post('*', function (req, res) {
	res.end(JSON.stringify(req.body));
});

http.createServer(app).listen(port, function(){
	console.log("Express server listening on port " + port);
});
http.createServer(app).listen(port + 1, function(){
	console.log("Express server listening on port " + (port + 1));
});