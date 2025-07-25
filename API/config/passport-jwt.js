const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const facultyModel = require('../models/facultyModel')


var option = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'STD'
}

passport.use('faculty-jwt' , new jwtStrategy(option, async (payload, done) => {
    // console.log(payload);

    let checkFacultyExsist = await facultyModel.findById(payload.facultyData._id);
    if (checkFacultyExsist) {
        return done(null, checkFacultyExsist);
    } else {
        return done(null, false)
    }
}));


passport.serializeUser(function (user, done) {
    return done(null, user.id);
})

passport.deserializeUser(async function (id, done) {
    try {
        let adminData = await adminModel.findById(id);
        if (adminData) {
            return done(null, adminData);
        }

        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
});


module.exports = passport;