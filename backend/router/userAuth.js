const express= require('express');
const cors = require('cors');
const router= express.Router();
const bcrypt= require('bcrypt');  //bctypt.hash & bcrypt.compare
const jwt= require('jsonwebtoken');  //jwt.sign & jwt.verify
const authenticate = require("../middleware/authenticate");
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
        
        //Password Hashing, middleware is defined in managerSchema.js

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
            console.log(token);
            
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
module.exports= router; 