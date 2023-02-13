const { APP_SERVICE_ACCOUNT, APP_CONFIG } = require("./paths");

require("dotenv").config({ path: APP_CONFIG });
const express = require("express");
const app = express();
const Path = require("path");
const exphbs = require("express-handlebars");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");
const admin = require("firebase-admin");

const serviceAccount = require(APP_SERVICE_ACCOUNT);

const PORT = process.env.PORT ?? 5000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_BUCKET_NAME,
});

const csrufSecure = csurf({ cookie: true });
const csrufSecureAPI = csurf({ cookie: true, ignoreMethods: ["HEAD", "OPTIONS"] });

app.use(express.static(Path.join(__dirname, "./client/public")));

//Routes
const siteRouter = require("./routers/router");
const errorRouter = require("./routers/error");
//API
const api = require("./routers/API/index");

const hbs = exphbs.create({
  extname: ".hbs",
  layoutsDir: Path.resolve(__dirname, "./client/views/layouts"),
  partialsDir: Path.resolve(__dirname, "./client/views/partials"),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", Path.resolve(__dirname, "./client/views"));

hbs.handlebars.registerHelper("when", (operand_1, operator, operand_2) => {
  const operators = {
    ">": function (l, r) {
      return Number(l) > Number(r);
    },
    "<": function (l, r) {
      return Number(l) < Number(r);
    },
  };
  const result = operators[operator](operand_1, operand_2);

  if (result) return true;
  else return false;
});

app.use(express.json());
app.use(cookieParser());
app.use(csrufSecure);

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

app.use(siteRouter);

app.use(csrufSecureAPI, api);

//hendler errors
app.use(errorRouter);
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.log("error", err);
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).send("try go to home page");
  }
  res.status(404).sendFile(Path.resolve(__dirname, "./public/pages/error/error.html"));
}

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
