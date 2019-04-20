module.exports=function(io){
    io.on('connection',(socket)=>{
        console.log('User Connected from sockeet group');

        socket.on('join',(param,callback)=>
        {
            socket.join(param.room);

            callback();
        })
        socket.on('createMessage',(message)=>
        {
            console.log(message);
            io.to(message.room).emit('newMessage',{
                text:message.text,
                room:message.room,
                from:message.from
            });
        });
    });

}