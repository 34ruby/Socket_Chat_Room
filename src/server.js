import express from "express";

const app = express();

console.log('안녕');

app.set("view engine", "pug")
app.set("views", __dirname + "/views") // static assets
app.set("/public", express.static(__dirname+"/public"))

function handleReq(req, res) {
    res.render("home");
}
app.get("/", handleReq)

app.listen(3000);