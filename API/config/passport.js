const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const facultyModel = require('../models/facultyModel')


var options = {
    jwtFormRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'STD'
}

passport.use(new jwtStrategy(options, async (payload, done) => {
     let checkFacultyExsist = await facultyModel.findById(payload._id);
     if(checkFacultyExsist){
        return done(null,checkFacultyExsist);
     }else{
        return done(null,false )
     }
}));

passport.serializeUser(function(user,done){
    return done(null,user,id);
})

passport.deserializeUser(async function(id,done){
    let facultyData = await facultyModel.findById(id);
    if(facultyData){
        return done(null,facultyData)
    }else{
        return done(null,false )
     }
})

module.exports = passport;