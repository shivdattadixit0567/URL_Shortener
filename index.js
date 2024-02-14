const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/static.js")
const URL = require("./models/url");
const { restrictToUseToLoggedIn, checkAuth} = require("./middlewares/auth.js")
const app = express();
const PORT = 8080;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Mongodb connected")
);
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.set("view engine","ejs");
app.set("views",path.resolve("./views/"));

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));

app.use("/",checkAuth,staticRoute);
app.use("/url", restrictToUseToLoggedIn,checkAuth, urlRoute);
app.use("/user",userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
