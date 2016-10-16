
window.webServerIp = '52.78.151.8';
window.webServerPort = '2000';
window.gameServerPort = '3000';
window.gameServerIp = '52.78.151.8';
Kakao.init('d875beadbeaca371a2a21d629017b4f4');
var Engine = require('./engine/engine');
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