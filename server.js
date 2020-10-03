const express =  require('express');
const app = express();
const fs = require('fs');

//1)Run the server on the port Number 9000..
const port = 9000;
const server = app.listen(port);
//2) Lunch the file like html,cass and javscript
app.use(express.static('public'));
//3) we use socket.io for collaboration of realTime Text-editor and also for two way data communication
let socket = require('socket.io');
//4)Run Socket.io on the Server;
let io = socket(server);

//5)Request the data on when event is accour

io.sockets.on('connection', (socket) => {
      console.log("User Id  Who is Connected:"  + socket.id)
    socket.on('message', (data) => {
        
         const content = data;
    //6)To write the data in another file(page.txt) waht we have have writen on the online collaborative text_editor
        try {
            fs.writeFileSync('./public/page.txt', content)
           //file written successfully
         } catch (err) {
           console.error(err)
         }
      //7)Brodcast the message or data
        socket.broadcast.emit('message', data)
    })
})

console.log(`App Listening on the port ${port}...`)
