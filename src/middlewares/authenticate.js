import passport from 'passport';

export const authenticate = (req, res, next)=>{
    passport.authenticate('jwt', (err, user)=>{
    if(err) next(err);
    if(!user){
        return res.status(401).json({
            message:"Unauthorised access",
        })
    }
    req.user= user;  
    next();
    })(req, res, next);
}

// We basically wrote the JWT strategy such that it extracts the "user" from jwt_payload.
// Now in line number 11, we are attaching "user" to our request object that is incoming.
// Now instead of doing :
//        "req.body.userId" we can do "req.user.id"

// We did this because we don't want frontend to send us the "userId", as it is a sensitive data, 
// and also since frontend is sending us "JWT token" we can extract the userId from that "jwt token" 
// and manually insert as a new key-value pair inside our request object. 