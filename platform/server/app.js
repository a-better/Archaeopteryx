
//엔트리 애플리케이션 
//최초로 진입하는 애플리케이션 
var express = require('express');
var Engine = require('./engine/engine');
var app		= express();
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
app.set('view engine', 'jade');
app.set('views', './client');
app.use(express.static('client'));
init();


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
