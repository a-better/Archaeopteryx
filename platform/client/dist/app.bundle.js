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

	window.webServerIp = '52.78.151.8';
	window.gameServerIp = '52.78.151.8';
	window.webServerPort = '2000';
	window.gameServerPort = '3000';


	//window.webServerIp = '192.168.0.33';
	//window.gameServerIp = '192.168.0.33';

	   Kakao.init('d875beadbeaca371a2a21d629017b4f4');
	   var Engine = __webpack_require__(1);
	   var engine = new Engine();
	   engine.network.setConnection('GAME');
	   engine.network.setConnection('WEB');
	   var button = document.getElementById("kakaoLink");
	   var oldRoomId = null;
	   button.onclick = function(){
	     engine.network.createRoom();
	     checkRoomId(engine.room);  
	   };
	   var checkRoomId = function(room){
	      setInterval(function(){
	        if(room.id != null){
	          if(oldRoomId == null){
	             sendLink(room);
	              oldRoomId = room.id;
	          }
	          else{
	             if(oldRoomId != room.id){
	               sendLink(room);
	               oldRoomId = room.id;
	             }
	          }
	        }

	      }, 100);
	   };

	  var sendLink = function(room){
	      sendKakaoLink(room);
	      engine.network.registerRoom(room);
	  };
	  var sendKakaoLink  = function (room){
	      var url = 'http://'+webServerIp + ':'+webServerPort + '/'+room.id;
	      var messenger = 'kakao';
	      room.setMessenger(messenger);
	      room.setURL(url);
	      console.log(url);
	      Kakao.Link.sendTalkLink({
	          label: '캐치마인드 같이 하자!',
	          image: {
	            src: 'http://'+webServerIp + ':'+webServerPort +'/images/catchmind.jpg',
	            width: '300',
	            height: '200'
	          },
	          webButton: {
	            text: '캐치마인드',
	            url:  url// 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
	          }
	        }); 
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