var GoogleStrategy = require('passport-google-oauth20').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');
var Admin = require('../models/admin');
//var configAuth = require('../config/auth');
//var configAuth = require('./fbauth');  
module.exports = function(passport) {

	
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		/*User.findById(id, function(err, user){
			done(err, user);
		});*/
		done(null,obj);
	});
	passport.use(new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Admin.findOne({ 'username' :  username }, function(err, user) {
            
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            if (!user.password == password)
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
			
            return done(null, user);
        });

    }));


	passport.use(new GoogleStrategy({  
		clientID: process.env.clientid,
		clientSecret:process.env.clientsecret,
		callbackURL: "/auth/google/callback",
		//callbackURL: "http://localhost:3000/auth/facebook/callback",
		//passReqToCallback : true,
		//profileFields: ['id', 'email', 'first_name', 'last_name'],
	},
	function(token, refreshToken, profile, done) {
		process.nextTick(function() {
		User.findOne({ 'id': profile.id }, function(err, user) {
			if (err)
			return done(err);
			if (user) {
			return done(null, user);
		} else {
			//console.log("We reached here",profile);
			var newUser = new User();
			newUser.id = profile.id;
			newUser.token = token;
			newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
			newUser.email = (profile.emails[0].value || '').toLowerCase();

			newUser.save(function(err) {
				if (err)
				throw err;
				return done(null, newUser);
			});
			
	    	//console.log(profile);
			}
		});
		});
  }));
};