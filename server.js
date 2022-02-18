const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
app.use(cors());

app.use(express.static("public"));

app.use((req, res, next) => {
    res.setHeader("x-frame-options", "deny");
    next();
});

app.use(express.json());

app.get("/select-post", (req, res) => {
    console.log("fetch in server: ");
    res.json({ try: "try" });
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
