/* ----------------------------- S T A N D A R D ---------------------------- */

import passport from 'passport'
import {Strategy as localStrategy} from 'passport-local'
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'

/**
 * we use the passport.use() to implement any Strategy.in this case the local Strategy
 *it takes localStrategy() as a param
 *localStrategy() takes a verifyCallback() as a param that verifies the user who is trying to access a certain route 
 */

const verifyCallback = async (username, password, done) => {
   try {
        //username exists in db?
        const user = await userModel.findOne({ username: username })
        if (!user) 
            return done(null, false)
        //a user exists, validate the password
       const isValid = await bcrypt.compare(password, user.password)  //validPassword(password, user.hash, user.salt);
        if (!isValid)
            return done(null, false)
        //user is valid, return its info
        return done(null,user)
    
   } catch (error) {
       done(error)
   }
}

const Strategy = new localStrategy(verifyCallback)

passport.use(Strategy);

//serialize + deserialize user
passport.serializeUser((user, done) => [
    done(null, user.id)
])

passport.deserializeUser( async (userId, done) => {
    try {
        const user = await userModel.findById(userId)
        done(null, user)
    } catch (err) {
        done(err)
    }
})