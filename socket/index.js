const io = require('socket.io')(8800, {
    cors: {
      origin: ['http://localhost:3000'],
    },
  });
  
  let activeUsers = [];
  
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    socket.on('new-user-add', (newUserId) => {
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({
          userId: newUserId,
          socketId: socket.id,
        });
      }
      console.log("Connected users:", activeUsers);
      io.emit('get-users', activeUsers);
    });

    socket.on("send-message",(data)=>{
      const {recieverId} = data;
      const user = activeUsers.find((user)=> user.userId === recieverId);
      console.log("Sending from socket to :",recieverId)
      console.log("data",data)
      if(user){
        io.to(user.socketId).emit("recieve-mesage",data)
      }
    })
  
    socket.on("disconnect", () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      io.emit('get-users', activeUsers);
      console.log("A user disconnected:", socket.id);
    });
  });
  