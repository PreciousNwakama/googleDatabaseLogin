const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./keys')
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user.id)
    })

});

passport.use(
    new GoogleStrategy({
        //options for google strategy

        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        //Check if user already exixt in our db
        console.log(accessToken, 'logged');
        User.findOne({ googleid: profile.id }).then((currentUser) => {
            if (currentUser) {
                //already have the User
                console.log('User is:'.currentUser);
                done(null, currentUser);
            } else {
                //if not, create User in out db
                new User({
                    username: profile.displayName,
                    googleid: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName
                    //image: profile.photos[0].value,
                }), save().then((newUser) => {
                    console.log('new User connected' + newUser);
                    done(null, newUser);
                })
            }
        })
    })
);
module.exports = passport;