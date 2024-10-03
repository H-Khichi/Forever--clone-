 import jwt from 'jsonwebtoken'
 const authUser = async(req,res,next)=>{
    const {token}=req.headers;

    if(!token){
        return res.json({success:false,message:'Not Authorized login Again'})
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(token_decode);

        req.body.userId = token_decode._id;
        // console.log(req.body.userId)
        next()
    } catch (error) {
        res.json({success:false, message:'error.message'})
    }
 }
 export default authUser;