
//엔트리 애플리케이션 
//최초로 진입하는 애플리케이션 
var express = require('express');
var Engine = require('./engine/engine');

//express req body change
var bodyParser = require('body-parser');
var app		= express();

app.use(bodyParser.urlencoded({extended: false}));

//npm read mysql
var mysql = require('mysql');

var connection = mysql.createConnection({
	host :'localhost',	//db ip address
	port : 3306,	// db port number
	user : 'arachne',	// db id
	password : '1234',	// db password
	database : 'platform'	//db schema name
});

connection.connect(function(err){
	if(err){
		console.error('mysql connection error');
		console.error(err);
		throw err;
	}
});



var port = '2000';
var ip = '';
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  ip = add;
  console.log(ip)
})

var server = app.listen(port);
var engine = new Engine();
engine.network.setConnection(server);

app.locals.pretty = true;
//view engine => jade
app.set('view engine', 'jade');
app.set('views', './client');
app.use(express.static('client'));
init();

app.post('/userId/',function(req,res){
	//res.writeHead(200,{"Content-Type":"text/plain"});

	var user_data=JSON.parse(req.body.user_data);
	console.log("user_data: "+req.body.user_data);

	console.log("json object:"+user_data.id+" "+user_data.properties.nickname);

	var query = connection.query('insert into 'user' ('user_id', 'user_name', 'thumbnail_image')\
	 VALUES('user_data.id','user_data.properties.nickname' , 'user_data.properties.thumbnail_image');');
})

//db end
//connection.end();

app.get('/:roomId', function(req, res){
	//console.log(req.params.roomId);
	//res.send(req.params.roomId);
	//engine.addPlayer(req.params.roomId);
	console.log(req.params.roomId);
	var url = engine.link.links[req.params.roomId];
	var key = req.params.roomId;
	if(typeof url == 'undefined'){
		res.send('<script type="text/javascript">alert("방이 없습니다.");location.href="http://'+ ip + ':'+ port + '/"</script>');
	}
	else{
		console.log(url);
		//render jade => html
		res.render('login', {key : req.params.roomId, url : url});
	}
});
function init() {
	engine.network.setEventHandlers();
	//engine.socket.setBroadcastingLoop();

	// Start game loop
	//setInterval(broadcastingLoop, updateInterval);
};
//init();
