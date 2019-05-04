const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user-model");

const signUpUserService = userData => {
  User.findOne({ username: userData.email }).then(currentUser => {
    if (currentUser) {
      // already has user
      console.log("user is: ", currentUser);
      // done(null, currentUser);
    } else {
      //if not create new User
      new User({
        username: userData.email,
        password: userData.password,
        level: null,
        firstTimeUser: true
      })
        .save()
        .then(newUser => {
          return newUser;
        });
    }
  });
};

const loginAuthenticatorService = async userData => {
  const answer = async () => {
    let isFound = await User.findOne({ username: userData.email }).then(
      user => {
        if (user) {
          console.log("found user");
          return true;
        } else {
          console.log("didnt find user");
          return false;
        }
      }
    );
    return isFound;
  };
  let ans = await answer();
  return ans;
};

router.get("/logout", (req, res) => {
  req.logout();
  res.status(301).redirect("http://localhost:3000/login");
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  let userStatus = await loginAuthenticatorService(req.body);
  if (userStatus) res.send({ status: "S" });
  else res.send({ status: "F" });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/success",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login"
  })
);

router.post("/signUp", (req, res) => {
  let newUser = signUpUserService(req.body);
  res.send({ message: "S" });
});

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = router;
