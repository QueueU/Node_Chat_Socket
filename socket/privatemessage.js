module.exports=function(io){

    io.on('connection',(socket) =>{
        socket.on('join PM',(pm,callback) => {
            socket.join(pm.room1);
            socket.join(pm.room2);
            callback();
        });
        socket.on('private message', (message, callback) => {

            console.log(message);
            io.to(message.room).emit('new message', {
                text: message.text,
                sender: message.sender
            });
            
            io.emit('message display', {});
            
            callback();
        });
        



    });
}