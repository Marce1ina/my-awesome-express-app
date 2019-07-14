const express = require("express");
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const config = require("./config");
let googleProfile = {};

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.CALLBACK_URL
        },
        function(accessToken, refreshToken, profile, cb) {
            googleProfile = {
                id: profile.id,
                displayName: profile.displayName
            };
            cb(null, profile);
        }
    )
);

app.set("view engine", "pug");
app.set("views", "./views");
app.use(passport.initialize());
app.use(passport.session());

//app routes
app.get("/", function(req, res) {
    res.render("initial", { user: req.user });
});

app.get("/app", function(req, res) {
    res.render("app", { user: googleProfile });
});

//Passport routes
app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/app",
        failureRedirect: "/"
    })
);

app.listen(3000);
