
const authenticateAdmin = (req,res,next)=>{
    if(req.user.role === 'admin'){
        return next();
    }
    else{
        throw new Error('You must be an admin');
    }
}

module.exports = authenticateAdmin;