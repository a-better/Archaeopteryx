Kakao.init('d875beadbeaca371a2a21d629017b4f4');
var Engine = require('./engine/engine');
var engine = new Engine();
$(document).ready(function(){
  $('#kakao-login-btn').trigger('click');
});

var domain = document.domain;
var port = location.port;
var url = "http://"+domain+":"+port;

$('#kakao-login-btn').on('click',
      function(){
        Kakao.Auth.login({
         success: function(authObj) {
      // 로그인 성공시, API를 호출합니다.
          Kakao.API.request({
              url: '/v1/user/me',
              success: function(res) {
                redirect(JSON.stringify(res));
                alert(res);

                $.ajax({url: url+'/userId/'+},success:function(){
                  alert('user access success');
                })
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


var redirect = function(data){
  var form = document.login_form;
  form.user_data.value = data;
  form.action = document.getElementById('url').value;
  form.method="post";
  form.submit();
}