$(document).ready(function(){
    var socket = io();

    var room= $('#groupName').val();
    var sender=$('#sender').val();

    socket.on('connect',function(){
        console.log('yea!..use CONNECTED');

        var params={
            room:room
        }
socket.emit('join',params,function(){
    console.log("user Hass joined this channel");
});

    });

    socket.on('newMessage',function(data){
console.log(data.text);
console.log(data.room);
console.log(data);
    });

    $('#message-form').on('submit',function(e){

        e.preventDefault();
        var msg= $('#msg').val();
        socket.emit('createMessage',{
            text:msg ,
            room:room,
            from:sender
        },function(){
            $('#msg').val('');
        });
    })
});




