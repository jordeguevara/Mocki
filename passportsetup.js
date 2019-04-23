const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();

const googleCredentials = {
    callbackURL: '/auth/google/success',
    clientID: process.env.google_client_id,
    clientSecret: process.env.gogole_client_secret,
   
}

passport.use(
  new GoogleStrategy(
    googleCredentials,
    () => {
      //callback
    }
  )
);
