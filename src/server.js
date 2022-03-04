import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

console.log('안녕');

app.set("view engine", "pug")
app.set("views", __dirname + "/views") // static assets
// 퍼그가 처리할 파일은 여기 있ㄷ.
app.use("/public", express.static(__dirname+"/public"))
// 이 폴더 파일은 프런트 단으로 쓰겠다.


// function handleReq(_, res) {
//     res.render("home");
// }
// _ 값은 어느 값이나 상관없이 처리한다.
// 함수 정의
// app.get("/", handleReq)



app.get("/", (_, res)=>{
    res.render("home")
})
// 함수 레퍼런스를 가지고 함수를 실행한다 .

const server = http.createServer(app);

const wss = WebSocket.Server({server});

// app.listen(3000);

server.listen(3000, ()=> console.log('Listening on localhost:3000'))

// 백단에서 실행되는건 server.js이고
// 프런트 단에서 실행되는 건 public/js/app.js로 분리하였다. 

// 부아아 