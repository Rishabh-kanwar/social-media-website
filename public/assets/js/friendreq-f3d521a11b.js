console.log("hello friends js"),function(){let e=$("#send-req-button");e.click((function(t){t.preventDefault(),$.ajax({type:"get",url:e.prop("href"),success:function(t){console.log(t);let n="";0==t.data.status?(e.html('<span  style="color: white; background-color: green">Send req</span>'),n="friend request sended is deleted"):1==t.data.status?(n="friend request sent",e.html('<span style="color: white; background-color: red;"> unsend-req </span>')):(n="already friends",e.html('<span style="color: blue;">Already Friends </span>')),new Noty({theme:"relax",text:n,type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e)}})}))}();