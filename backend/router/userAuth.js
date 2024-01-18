const express= require('express');
const cors = require('cors');
const router= express.Router();
const bcrypt= require('bcrypt');  //bctypt.hash & bcrypt.compare
const jwt= require('jsonwebtoken');  //jwt.sign & jwt.verify
const authenticate = require("../middleware/authenticate");
const customerAuthentication=require("../middleware/customerAuthentication")
const cookieParser = require("cookie-parser");
router.use(cookieParser());


//router.use(fileUpload()); // Use the fileUpload middleware

require('../db/connection'); //Database Connection
//const Manager=require("../model/managerSchema") //managerSchema
//const Hostel= require("../model/hostelSchema")
const User=require("../model/userSchema")


router.get('/', (req,res) => {
    res.send("Hello World from the Home Router Js🤞")
})

//Registration
router.post('/userSignup',async (req,res) => {
    
    const {name,email,phone,cnic,city,password,confirmPassword} = req.body;
    //now req.body.name === name

    //Validation
    if(!name || !email || !phone || !cnic || !city || !password || !confirmPassword)
    {
        return res.status(422).json({error:"Fill all the fields"})
    }

    try{
    const userExist= await User.findOne({email:email})
   
        if(userExist){
            return res.status(422).json({error:"Email already exists"});
        } else if(password != confirmPassword){
            return res.status(422).json({error:"Passwords dont match"});
        }
        else{

        const user= new User({name,email,phone,cnic,city,password,confirmPassword}) //Behind the scene= name:name  => name variable/db fiels = name user entered
        
        //Password Hashing, middleware is defined in userSchema.js

        await user.save();

            res.status(201).json({message:"User registerd successfully"});
        }

    }catch(err){
        console.log(`Error Occured💬 ${err}`);
    }
    
    //res.json({message:req.body})
    console.log(req.body);
});

//Login Route
   
router.post("/userSignin",async (req,res) =>{

    try{
        let token;
        const {email , password} = req.body;

        if(!email || !password)
        {
           return res.status(400).json({error:"Please fill the data"});
        }

        const userLogin = await User.findOne({email:email}) //userLogin will have the complete record data of the email entered
       
        

        if(userLogin) //checking if that user exists through email userLogin=complete record
        {
            const isMatch =await bcrypt.compare(password, userLogin.password);

            token =await userLogin.generateAuthToken();
            console.log("Generated Token:", token);      
                  
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now() + 25892000000), //30 days
                httpOnly:true
            })


            if( !isMatch) //checking if passwod is correct isMatch=(true/false)
            {
                res.status(400).json({message:"Invalid Credentials Pass"}) //invalid password
                console.log("Invalid Credentials");
            }else{
                res.json({message:"user SigIn Successfully"})
                console.log(userLogin);
                console.log(isMatch);
            }
            
        }else{
            res.status(400).json({message:"Invalid Credentials email"})  //invalid email
        }
        

    }catch(err){
        console.log(`Login Failed ${err}`);
        res.json({message:`Login Failed ${err}`})
    }
})

// Logout Route
router.post("/signout", customerAuthentication, async (req, res) => {
    try {
        // Remove the user's token from the database (optional)
        req.rootUser.tokens = req.rootUser.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.rootUser.save();

        // Clear the cookie containing the JWT
        res.clearCookie("jwtoken");

        res.status(200).json({ message: "User signed out successfully" });
    } catch (error) {
        console.error('Error during signout:', error);
        res.status(500).json({ error: "Unable to sign out" });
    }
});

//Update user Info
router.put('/updateUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { name,email,phone,cnic,city,password,confirmPassword } = req.body;

    

    try {
        // Check if the manager with the given ID exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.cnic = cnic;
        user.city = city;

        // // Optionally update password if provided
        // if (password && confirmPassword && password === confirmPassword) {
        //     manager.password = password;
        //     manager.confirmPassword = confirmPassword;
        // }

        // Save the updated manager information
        await user.save();

        res.status(200).json({ message: "user information updated successfully" });
    } catch (err) {
        console.error(`Error occurred: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/userData',customerAuthentication, (req,res) =>{
    console.log("Hello from hostels page✌");
    console.log(req.rootUser);
    res.json(req.rootUser);   //is used in an Express.js route handler to send a JSON response to the client.

})
module.exports= router; 