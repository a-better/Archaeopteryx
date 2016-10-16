
//엔트리 애플리케이션 
//최초로 진입하는 애플리케이션 
var express = require('express');
var Engine = require('./engine/engine');

var app		= express();
var server = app.listen(2000);

engine = new Engine();
engine.network.setConnection(server);


app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './client');
app.use(express.static('client'));
init();
var webServerIp = '52.78.151.8';
var gameServerIp = '52.78.151.8';
var webServerPort = '2000';
var gameServerPort = '3000';


//var webServerIp = '192.168.0.33';
//var gameServerIp = '192.168.0.33';;
app.get('/:roomId', function(req, res){
	//console.log(req.params.roomId);
	//res.send(req.params.roomId);
	//engine.addPlayer(req.params.roomId);
	console.log(req.params.roomId);
	var url = engine.findUrl(webServerIp, webServerPort, req.params.roomId);
	if(url != null)
	{
		res.render('login', {roomId : req.params.roomId});
	}
	else{
		res.send('<script type="text/javascript">alert("방이 없습니다.");location.href="http://'+webServerIp + ':'+webServerPort + '/"</script>');
	}
});
function init() {
	engine.network.setEventHandlers();
	//engine.socket.setBroadcastingLoop();

	// Start game loop
	//setInterval(broadcastingLoop, updateInterval);
};
//init();
