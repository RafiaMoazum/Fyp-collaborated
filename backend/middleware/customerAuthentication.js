const jwt =require("jsonwebtoken");
const User=require("../model/userSchema"); 


const customerAuthentication =async (req,res,next) => {

try{
   
  const token = req.cookies.jwtoken;
  const verifyToken= jwt.verify(token,process.env.SECRET_KEY);

  const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token});
  if(!rootUser){throw new Error("User not Found")}

   req.token=token;
   req.rootUser = rootUser;  //rootUser:complete record of a user
   req.userID= rootUser._id;
   //console.log(`req.userID=> ${req.userID}`);

next();

}catch (err){
    res.status(401).send("Unauthorized:No token Provided");
    console.log(err);
}

}

module.exports = customerAuthentication;