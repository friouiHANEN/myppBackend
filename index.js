import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import usersRoutes from "./Routes/usersRoutes";
import mongoose from "mongoose";

import session from "express-session";

import passport from "passport";
import * as passportConfig from "./strategies/local";

const app = express();
// MIDDELWARES
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 50000 },
  })
);
app.use(passport.initialize());

app.use(passport.session());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// ENVS
const port = process.env.PORT || 4000;

//ROUTES
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/users", usersRoutes);

// SERVER
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected 😎");
    app.listen(port, (req, res) => {
      console.log("App runing on  ✌👍" + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
