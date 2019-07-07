const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function(req, res) {
    res.render("initial");
});

app.get("/auth/google", function(req, res) {
    res.render("login");
});

app.get("/app", function(req, res) {
    res.render("app", { name: req.query.login });
});

app.listen(3000);
