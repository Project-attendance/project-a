require("dotenv").config();
const express = require("express");
const app = express();
const mangoose = require("mongoose");
const cors = require("cors");
const path = require("path");
var bodyParser = require("body-parser");
const ejs = require("ejs");
const notifier = require("node-notifier");

const templets_path = path.join(__dirname, "./Templets/views");
//const partials_path = path.join(__dirname, "./Templets/partials");
app.set("view engine", "ejs");
app.set("views", templets_path);

const authRoute = require("./routs/auth");
const postRoute = require("./routs/posts");
const cookieParser = require("cookie-parser");

//connect mangodb
mangoose.connect(
  process.env.MY_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);

app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//middleware
app.use(cookieParser());
app.use(express.json());

//allow apis to acces anywhare
const corsOpt = {
  origin: process.env.CORS_ALLOW_ORIGIN || "*", // this work well to configure origin url in the server
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"], // to works well with web app, OPTIONS is required
  allowedHeaders: ["Content-Type", "Authorization"], // allow json and token in the headers
};
app.use(cors(corsOpt));

//route middleware
app.use("/", authRoute);
app.use("/api/posts", postRoute);

app.listen(5000, () => console.log("server started....."));
