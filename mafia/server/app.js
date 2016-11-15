
//엔트리 애플리케이션 
//최초로 진입하는 애플리케이션 
var express = require('express');
var Engine = require('./mafia/engine');
var app		= express();
var port = '3100';
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

//init();
