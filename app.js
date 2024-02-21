require("dotenv").config(); //טעינת קובץ ההגדרות למערכת
const express = require("express");
const app = express();
const proRoute = require("./api/v1/routes/product");
const categoryRote = require("./api/v1/routes/category");
const userRoute = require("./api/v1/routes/user");
const morgan = require("morgan");
const mongoose = require("mongoose"); //חיבור לספריית העבודה מונגו
mongoose.pluralize(null); //מבטל את הרביים
const mongoStore = require("connect-mongo"); //חיבור לספרייה
const mysql = require("mysql"); //

var connection = mysql.createConnection({
  //חיבור לדאטה בייס
  host: "localhost",
  user: "root",
  password: "HALFONsnir5515",
  database: "ecommerce",
});

connection.connect(() => {
  console.log("Connected to MySQL");
});

global.db = connection; //יצירת משתנה גולבאלי בשם דיבי שמחזיק את הקונקשן

const connStr = process.env.MONGO_CONN; //שליפת מחרוזת ההתחברות מתוך הגדרות המערכת
console.log(connStr);
mongoose.connect(connStr + "DataBaseStore").then((status) => {
  if (status) {
    console.log("Connected to MongoDB");
  } else {
    console.log("Not connected to MongoDB");
  }
});

//ניצור מודל עבור מוצר

const userModel = require("./api/v1/models/user");
userModel.find().then((data) => {
  console.log(data);
});

const categoryModel = require("./api/v1/models/category");
categoryModel.find().then((data) => {
  console.log(data);
});

const productModel = require("./api/v1/models/product");
const session = require("express-session");

productModel.find().then((data) => {
  //פונקצייה שמחזירה את כול הנתונים  כול הרשומות של הטבלה שאני עובד מולה כרגע עובדים מול פרודקט
  console.log(data);
});

let arr = ["198.161.2", "::1", "192.168.127.12"];
app.use((req, res, next) => {
  let i;
  for (i = 0; i < arr.length; i++) {
    if (req.ip === arr[i]) {
      break;
    }
  }
  if (i == arr.length) {
    return res.status(403).send("Forbidden");
  } else {
    next();
  }
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const twentymin = 1000 * 60 * 20;
app.use(
  session({
    secret: "HALFONsnir",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: twentymin,
    },
    store: mongoStore.create({
      mongoUrl: connStr + "SNIRdata",
    }),
  })
);
app.use("/category", categoryRote);
app.use("/product", proRoute);
app.use("/user", userRoute);

app.all("*", (req, res) => {
  return res.status(404).json({ msg: "Not Found" });
});

module.exports = app;
