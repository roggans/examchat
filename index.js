var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/index.html');
});

app.get('/general', (req, res)=> {
  res.sendFile(__dirname + '/general.html');
});

app.get('/random', (req, res)=> {
  res.sendFile(__dirname + '/random.html');
});

io.on('connection', (socket) =>{
  // console.log('a user connected: socketid:' +socket.id);
  socket.on('join',(data)=>{
    // console.log(data)
    socket.join(data.room)
    io.in(data.room).emit('messageFromServer', `A User joined ${data.room} room!`)
  })

    socket.on('fromClient',(data)=>{
      // console.log(data)
      // console.log('fromClient msg:',data.msg) 
      // console.log('fromclient vilket rum',data.room)
          io.in(data.room).emit('messageFromServer',data.msg)
    })   
  
  
    socket.on('disconnect', (data)=>{
      // console.log(data)
      io.emit('messageFromServer','A user left')
      });
    })

http.listen(port, function(){
  // console.log('listening on *:' + port);
});
