const express =  require("express");
const app = express();
const http = require('http')
const server = http.createServer(app);

const socketIo = require('socket.io')

const io = socketIo.listen(server) 
app.use(express.static(__dirname + "/public"));


app.get('/',(req,res)=>{
    console.log("acessou por aqui")
    res.render('index.js')
})
const historico = [];
io.on('connection',(socket)=>{

    console.log('Nova conexão');
    

    

    historico.forEach(linha => {
        socket.emit('desenhar',linha)
    });

    

    socket.on('desenhar',(linha)=>{
        historico.push(linha);
        io.emit('desenhar',linha)
    })

    socket.on('clear', ()=>{
        history = new Array()
        io.emit('desenhar')
      })

})

server.listen(3000, ()=>{
    console.log("running")
})
