const app = require('express')();
const server = require('http').createServer(app);
const mongoose = require("mongoose")
const Document = require('./model/Document')
const DEFAULT_VALUE = "";

const db = "mongodb+srv://liquid:liquid@cluster0.wd4tgus.mongodb.net/docs?retryWrites=true&w=majority"
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
   
}).then(()=>console.log("conneted"))
.catch(()=>console.log("failed to connect data base"))

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    socket.on("get-document", async documentId => {
        
        //const document = await findOrCreateDocument(documentId)
        socket.join(documentId);
        // socket.emit('load-document', document.data)
        socket.emit('load-document', DEFAULT_VALUE)

        socket.on("send-changes", delta => {
            socket.broadcast.to(documentId).emit('recive-changes', delta)
        })
        // socket.on("save-document", async data => {
        //     await Document.findByIdAndUpdate(documentId, { data })
        // })
    })

    console.log("connected socket io ");
})

async function findOrCreateDocument(id) {
    if (id == null) return
    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({ _id: id, data: DEFAULT_VALUE })
}


//app.listen(5000,()=>{console.log("server is active")});
server.listen(5000, () => { console.log("conected port listining") })