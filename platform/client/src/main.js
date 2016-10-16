window.webServerIp = '52.78.151.8';
window.gameServerIp = '52.78.151.8';
window.webServerPort = '2000';
window.gameServerPort = '3000';


//window.webServerIp = '192.168.0.33';
//window.gameServerIp = '192.168.0.33';

   Kakao.init('d875beadbeaca371a2a21d629017b4f4');
   var Engine = require('./engine/engine');
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




