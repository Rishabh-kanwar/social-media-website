{
    console.log('hello friends js');
    // let sendReqButton = $('#send-req-button')
    // console.log(sendReqButton.prop('href'));
    let createreq = function(){
    let sendReqButton = $('#send-req-button');

        sendReqButton.click(function(e){
            e.preventDefault();
        
            $.ajax({
                type: 'get',
                url: sendReqButton.prop('href'),
               
                success: function(data){
                    console.log(data);
                    let k='';
                    if(data.data.status==0)
                    {
                        sendReqButton.html(`<span  style="color: white; background-color: green">Send req</span>`);
                        k='friend request sended is deleted';
                    }
                    else if(data.data.status==1){
                        k='friend request sent';
                        sendReqButton.html(`<span style="color: white; background-color: red;"> unsend-req </span>`);
                    }
                    else{
                        k='already friends';
                        sendReqButton.html(`<span style="color: blue;">Already Friends </span>`);
                    }
                     
                    new Noty({
                        theme: 'relax',
                        text: k,
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error);
                }
            });
        });
    }
    createreq();
}
