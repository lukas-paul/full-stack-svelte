const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const db = require("./db.js");
app.use(cors());

app.use(express.static("public"));

app.use((req, res, next) => {
    res.setHeader("x-frame-options", "deny");
    next();
});

app.use(express.json());

app.get("/select-post", (req, res) => {
    db.getPosts().then((result) => {
        console.log("fetch in server: ", result);
        return res.json(result.rows);
    });
});

app.get("/choose-post/:id", (req, res) => {
    let id = req.params.id;
    console.log("choose-post");
    db.choosePost(id).then((result) => {
        console.log(result.rows);
        return res.json(result.rows[0]);
    });
});

app.post("/add-new-post", (req, res) => {
    console.log("add new post in server: ", req.body);
    let name = req.body.name;
    let city = req.body.city;
    let title = req.body.title;
    let text = req.body.text;

    db.newPost(name, city, title, text);
});

/*
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
    console.log("test server1");
});
*/

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
