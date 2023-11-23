const jwt =require("jsonwebtoken");
const Manager=require("../model/managerSchema"); 


const authenticate =async (req,res,next) => {

try{
   
  const token = req.cookies.jwtoken;
  const verifyToken= jwt.verify(token,process.env.SECRET_KEY);

  const rootUser = await Manager.findOne({_id:verifyToken._id, "tokens.token":token});
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

module.exports = authenticate;