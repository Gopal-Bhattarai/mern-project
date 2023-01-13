import express from 'express'
import dotenv from 'dotenv'
import cookieSession from "cookie-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as FacebookStrategy } from 'passport-facebook';

const passportApp = express();

dotenv.config();
const SERVER_URL = process.env.SERVER_URL;



//API Client Key & Secrets
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET

//GOOGLE AUTH
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${SERVER_URL}/api/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, email, done) {
    profile.email = email;
    done(null, profile)
  }
));

//GITHUB AUTH
passport.use(new GithubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: `${SERVER_URL}/api/auth/github/callback`
},
function(accessToken, refreshToken, email, done) {
  const user = {first: 'nothing', email: email}
  done(null, user)
}
));

//FACEBOOK AUTH
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "api/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, email, done) {
  profile.email = email;
  done(null, profile)
}
));

//session passing
passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})