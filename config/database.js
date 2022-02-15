/* ----------------------------- S T A N D A R D ---------------------------- */

import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import colors from 'colors'


mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('> Connected...'.bgCyan))
    .catch(err => console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red))


// create a collection named session  in db
export const sessionStore = MongoStore.create({ mongoUrl: process.env.URI, collectionName: 'sessions' }) 