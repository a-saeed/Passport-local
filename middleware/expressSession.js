/* ----------------------------- S T A N D A R D ---------------------------- */

import session from "express-session";
import { sessionStore } from '../config/database.js';

/* ------------------------------ session store  + session middleware ----------------------------- */

const expressSession = session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { // store the session ID in a cookie in the browser
        maxAge: 1000 * 60 * 60 * 24 // equals 1 day
    }
})

export default expressSession