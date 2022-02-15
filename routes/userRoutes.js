import express from "express";
import passport from "passport";
import { getFailurePage, getHomePage, getLoginPage, getProtectedPage, getRegisterPage, getSuccessPage, logout, register } from "../controllers/userController.js";
import { checkAuthentication } from "../middleware/checkAuthentication.js";

const userRouter = express.Router()

userRouter.get('/', getHomePage)
userRouter.get('/register', getRegisterPage);
userRouter.get('/login', getLoginPage);
userRouter.get('/login-success', getSuccessPage);
userRouter.get('/login-failure', getFailurePage);
userRouter.get('/logout', logout);

userRouter.get('/protected-route',checkAuthentication, getProtectedPage); //this is a route that needs protection

userRouter.post('/register', register)
userRouter.post('/login', passport.authenticate('local', {successRedirect: '/login-success', failureRedirect: '/login-failure'}));
/* ------------------------------- Get Routes ------------------------------- */


export default userRouter;