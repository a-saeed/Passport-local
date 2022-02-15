import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'



export const register = async (req, res, next) => {
     try {
        //encrypt password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //save user provided from req.body
        const newUser = new userModel({
            username: req.body.username,
            password: hashedPassword
        });
        await newUser.save()

        res.redirect('/login')

    } catch (err) {
        next(err);
    }

}
export const logout = (req, res, next)=>{
    req.logout(); //pre-defined thanks to passport 
    res.redirect('/protected-route')
}

/* -------------------- redirect to home/login/register/success/authenticated pages -------------------- */

export const getHomePage = (req, res, next) => {
    res.send('<h1> Home </h1> <p> Please <a href = "/register"> register </a> </p>'  )
}

export const  getLoginPage =  (req, res, next) => {
     const form = '<h1> Login Page</h1> <form method = "post" action = "login">\
                  Enter Username: <br><input type = "text" name = "username">\
                  <br> Enter Password: <br> <input type="password" name="password" >\
                  <br> <br> <input type="submit" value="submit"> </form>'
    res.send(form)
}

export const getRegisterPage =  (req, res, next) => {
    const form = '<h1> Register Page</h1> <form method = "post" action = "register">\
                  Enter Username: <br><input type = "text" name = "username">\
                  <br> Enter Password: <br> <input type="password" name="password" >\
                  <br> <br> <input type="submit" value="submit"> </form>'
    res.send(form)
}

export const getSuccessPage =  (req, res, next) => {
   res.send( '<p> you are logged in . -->  <a href="/protected-route"> Go to protected route</a></p>' )
}

export const getFailurePage =  (req, res, next) => {
   res.send( '<h1>FAIL:  Either username or password or both are incorrect </h1>' )
}

export const getProtectedPage =  (req, res, next) => {
       res.send('<h1> you are authenticated </h1> <p> <a href="/logout"> logout and reload</a></p>')
}

