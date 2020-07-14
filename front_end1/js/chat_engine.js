class ChatEngine{
    constructor(friendId,chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.friendId=friendId;

        this.socket = io.connect('http://socioo.in:5000');

        if (this.userEmail){
            this.connectionHandler();
        }
        
    }


    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: self.friendId
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);


                let msg = `${self.userEmail}  joined the chat`;

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: self.friendId
                });
            }
            })

        });

        // send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            $('#chat-message-input').val("");

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: self.friendId
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }
            else{
                let swiftly = new Audio();
                swiftly.src ='../audio/swiftly.mp3';
                swiftly.play();
                console.log('play');
            }
            
            
            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': `<br>${data.user_email}`
            }));

            newMessage.addClass(messageType);
            
            $('#chat-messages-list').append(newMessage);
        })
    }
}


{
let createchat = function(){
    let chatButton = $('.chat-button');
    console.log(chatButton.length);
    console.log(chatButton.attr('href'));
        
           //console.log('hello rish1234');
        chatButton.click(function(e){
            e.preventDefault();
            console.log('hello rish1234');
            $.ajax({
                type: 'get',
                url: $(this).attr('href'),

                success: function(data){
                    console.log(data);
                    
                    new ChatEngine(data.data.friend._id,'user-chat-box',data.data.myid);

                    $('#friend-name').text(`chatting with ${data.data.friendName}`);

                    new Noty({
                        theme: 'relax',
                        text: `Entered the chat room`,
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
    createchat();

}