
//엔트리 애플리케이션 
//최초로 진입하는 애플리케이션 
var express = require('express');
var app		= express();
var server = app.listen(4000);


//client->lndex.html
app.use(express.static('client'));
