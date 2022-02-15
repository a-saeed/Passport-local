
export const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated())  //pre-defined thanks to passport
        next()
    res.status(401).json({msg: 'UNAUTHORIZED'})
        
}