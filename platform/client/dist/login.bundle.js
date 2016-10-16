/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	window.webServerIp = '192.168.0.21';
	window.webServerPort = '2000';
	window.gameServerPort = '3000';
	window.gameServerIp = '192.168.0.21';
	Kakao.init('d875beadbeaca371a2a21d629017b4f4');
	var Engine = __webpack_require__(1);
	var engine = new Engine();
	engine.network.setConnection('GAME');
	engine.network.setConnection('WEB');
	$(document).ready(function(){
	   engine.network.checkRoom();
	    $('#kakao-login-btn').click(
	      function(){
	        Kakao.Auth.login({
	         success: function(authObj) {
	      // 로그인 성공시, API를 호출합니다.
	          Kakao.API.request({
	              url: '/v1/user/me',
	              success: function(res) {
	                redirect(JSON.stringify(res));
	              },
	              fail: function(error) {
	                alert(JSON.stringify(error));
	              }
	            });
	          },
	         fail: function(err) {
	            alert(JSON.stringify(err));
	          }
	        });
	    });
	 });
	var redirect = function(data){
	  var roomId = document.getElementById('roomId').value;
	  var form = document.login_form;
	  form.user_data.value = data;
	  form.action = 'http://'+gameServerIp + ':'+gameServerPort + '/'+roomId;
	  form.method="post";
	  form.submit();
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Room = __webpack_require__(2);
	var Network = __webpack_require__(3);
	//var EventHandler = require('./eventHandler');
	var Engine = function(){
		this.room = new Room();
		this.rooms = [];
		engine = this;
		this.network = new Network();
	};

	Engine.prototype.constructor = Engine;

	Engine.prototype = {
		addRoom : function(){
		},
		setRoomId : function(id){
			this.room.setRoomId(id);
		}
	}


	module.exports = Engine;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var Room = function(){
		this.id = null;
		this.url= null;
		this.messenger = null;
		//this.players = [];
	};

	Room.prototype.constructor = Room;

	Room.prototype = {
		setRoomId : function(roomId){
			this.id = roomId;
		},
		setMessenger : function(messenger){
			this.messenger = messenger
		},
		setURL : function(url){
			this.url = url;
		},
		addPlayer : function(){
			//var player = new Player();
		}
	};

	module.exports = Room;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var Network = function(){
		network = this;
	};

	Network.prototype.Constructor = Network;

	Network.prototype = {
		setConnection :function(SERVER){
			var domain = document.domain;
			var port = location.port;
			if(SERVER == 'GAME')
			{
				var url = 'http://'+gameServerIp + ':'+gameServerPort;
				console.log(url);
				socket = io(url);
			}
			else if(SERVER == 'WEB'){
				var url = 'http://'+webServerIp + ':'+webServerPort;
				console.log(url);
				socket_web = io(url);
			}
			this.setEventHandlers();
		},
		registerRoom : function(room){
			socket_web.emit('register room', room.url);
		},
		getSocket : function(){
			return socket;
		},
		setEventHandlers: function(){
			socket.on("send room", this.onSendRoom);
			socket.on("no exist", this.onNoExist);
			socket.on("exist", this.onExist);
		},
		joinRoom : function(){
			engine.room.setRoomId();
			socket.emit('add player');
		},
		createRoom : function(){
			console.log('createRoom');
			socket.emit('create room');
		},
		onSendRoom : function(data){
			console.log(data);
			engine.setRoomId(data.room.id);
		},
		checkRoom : function(){
			var roomId = document.getElementById('roomId').value;
			socket.emit("check room", {roomId : roomId});
		},
		onNoExist : function(){
			alert("this room is not available!");
			location.href = 'http://'+webServerIp + ':'+webServerPort;
		},
		onExist : function(){
			$('#kakao-login-btn').trigger('click');
		}
	};

	module.exports = Network;

/***/ }
/******/ ]);