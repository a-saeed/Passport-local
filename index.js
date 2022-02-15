/* ------------- ********************************************** ------------- */

import express from 'express'
import 'dotenv/config'
/* ---------------------- import passport dependencies ---------------------- */
import passport from "passport";
import './config/passport.js' //need to import the entire passport config module so that index.js knows about it
import expressSession from './middleware/expressSession.js';
/* ------------------------------ import routes ----------------------------- */
import userRouter from './routes/userRoutes.js';

/* ------------- ********************************************** ------------- */

const app = express();
const port = process.env.PORT

/* ------------------------------- parsing middleware ------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/* --------------------------express session +  passport middleware -------------------------- */
app.use(expressSession)           //this gives us access to the req.session object, we can attach useful info to this object and store it in db (like #page views )
app.use(passport.initialize());  //-->(1)
app.use(passport.session())     //-->(2)
/*(1) + (2) --> for every request sent, check if a user is logged in. if there is, create a user prop & attach it to req.
 ---------------req.user now is populated with current logged in user info from database*/

app.use((req, res, next)=> {
     console.log(req.session);
    console.log(req.user);
    next()
 })
/* ---------------------------- routes--------------------------- */
app.use('/', userRouter)

app.listen(port, () => {
    console.log('Example app listening on port ' + port);
});
