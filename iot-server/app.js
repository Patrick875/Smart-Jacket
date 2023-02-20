//jshint esversion:9
const express = require("express");
const cors = require("cors");
const sensor = require("./api/sensor");
const app = express();

//var whitelist = ["http://127.0.0.1:3000"];
var corsOptions = {
	credentials: true,
	origin: "https://candid-cocada-6b5371.netlify.app/",
};

app.use(cors());
app.use(express.json());

app.use("/api/sensor", sensor);

module.exports = app;
