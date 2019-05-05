const express = require("express");
const app = express();
require("dotenv").config();
global.fetch = require("node-fetch");
const bodyParser = require("body-parser");

const cookieSession = require("cookie-session");

const cors = require("cors");

// const corsOptions = {
//   origin: [process.env.URL, "http://localhost:3000"]
// };

app.use(cors());
// app.options("*", cors(corsOptions));

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const mongoose = require("mongoose", () => console.log("moongose connected"));

mongoose.connect(process.env.dbURI, { useNewUrlParser: true }, () =>
  console.log("mongose connecteed")
);

const passportSetup = require("./passportsetup");

const Pusher = require("pusher");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["cookieisawesome"]
  })
);

const pusher = new Pusher({
  appId: process.env.push_app_id,
  key: process.env.pusher_key,
  secret: process.env.pusher_secret,
  cluster: process.env.pusher_cluster,
  encrypted: true
});

app.post("/message", (req, res) => {
  const payload = req.body;
  console.log(payload);
  pusher.trigger("my-channel", "my-event", {
    code: payload
  });
  res.send(payload);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("port", process.env.PORT || 3001);

app.options("/google", cors());
app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] }),
  (req, res) => {
    console.log(req.method);
    if (req.method === "OPTIONS") {
      req.statusCode(200);
    }
  }
);
app.use("/", require("./routes"));

app.listen(app.get("port"), () => {
  console.log(`Server at: http://localhost:${app.get("port")}/`);
});
