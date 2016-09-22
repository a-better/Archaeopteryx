
//엔트리 애플리케이션 
//최초로 진입하는 애플리케이션 
var express = require('express');
var fs		= require('fs');
var app		= express();
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views')
app.use(express.static('client'));
//정적인 파일은 public 디렉토리에 위치한다. 
app.get('/form', function(req, res){
	res.render('form');
});
app.get('/form_receiver', function(req, res){
	var title = req.query.title;
	var description = req.query.description;
	res.send(title+","+description);
});
app.post('/form_receiver', function(req, res){
	var title = req.body.title;
	var description = req.body.description;
	res.send(title+","+description);
});
app.get('/topic', function(req, res){
  var topics = [
    'Javascript is....',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
  <a href="/topic?id=0">JavaScript</a><br>
  <a href="/topic?id=1">Nodejs</a><br>
  <a href="/topic?id=2">Express</a><br><br>
  ${topics[req.query.id]}
  `
  res.send(output);
})

app.get('/topic/:id', function(req, res){
  var topics = [
    'Javascript is....',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
  <a href="/topic?id=0">JavaScript</a><br>
  <a href="/topic?id=1">Nodejs</a><br>
  <a href="/topic?id=2">Express</a><br><br>
  ${topics[req.params.id]}
  `
  res.send(output);
})
app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id+','+req.params.mode)
})

app.get('/template', function(req, res){
	res.render('temp', {time : Date(), titleName: 'hello jade'});//json 타입으로 데이터를 전송한다. 
	//temp라는 템플릿파일을 렌더링해서 전송 
});
app.get('/dynamic', function(req, res){
	var lis = '';
	for(var i=0; i<5; i++){
		lis = lis + '<li>coding<li>';
	}

	var output = 
	`
	<!DOCTYPE html>
	 <html>
	 	<head>
	 	 	<meta charset="utf-8">
	 	 	<title></title>
	 	</head>
	 	<body>
	 	 	Hello, Dynamic!
	 	 	<ul>
	 	 		${lis}
	 	 	</ul>
	 	</body>
	 </html>
	 `;
	res.send(output);
});
app.get('/', function(req, res){
	//req는 요청 정보, 
	//res는 응답 개체 
	var html= fs.readFile('client/test.html','utf8', (err, data) =>{
			if(err) throw err;
			res.send(data);
			console.log("success read client/test.html");
		});
});//루트 디렉토리는 '/', 
//'/hello'는 /hello로 클라이언트가 접속한경우


//클라이언트가  서버에 get방식으로 접근할떄,
// 그러한 클라이언트를 처리하기 위함이다.

app.get('/route', (req, res) => {
	console.log("route");
	res.send('Hello Rounter, <img src="/test.png">');
});
app.get('/Login', function(req, res){
	console.log("login");
	res.send('Login please');
});
app.listen(3000, function(){
	console.log('3000 port listening');
});
