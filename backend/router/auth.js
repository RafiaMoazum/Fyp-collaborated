const express= require('express');
//const fileUpload = require('express-fileupload');  //for images
const cors = require('cors');
const router= express.Router();
const bcrypt= require('bcrypt');  //bctypt.hash & bcrypt.compare
const jwt= require('jsonwebtoken');  //jwt.sign & jwt.verify
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
router.use(cookieParser());


//router.use(fileUpload()); // Use the fileUpload middleware

require('../db/connection'); //Database Connection
const Manager=require("../model/managerSchema") //managerSchema
const Hostel= require("../model/hostelSchema")


router.get('/', (req,res) => {
    res.send("Hello World from the Home Router Js🤞")
})

//Registration
router.post('/register',async (req,res) => {
    
    const {name,email,cnic,phone,city,password,confirmPassword} = req.body;
    //now req.body.name === name

    //Validation
    if(!name || !email || !cnic || !phone || !city || !password || !confirmPassword)
    {
        return res.status(422).json({error:"Fill all the fields"})
    }

    try{
    const userExist= await Manager.findOne({email:email})
   
        if(userExist){
            return res.status(422).json({error:"Email already exists"});
        } else if(password != confirmPassword){
            return res.status(422).json({error:"Passwords dont match"});
        }
        else{

        const manager= new Manager({name,email,cnic,phone,city,password,confirmPassword}) //Behind the scene= name:name  => name variable/db fiels = name user entered
        
        //Password Hashing, middleware is defined in managerSchema.js

        await manager.save();

            res.status(201).json({message:"User registerd successfully"});
        }

    }catch(err){
        console.log(`Error Occured💬 ${err}`);
    }
    
    //res.json({message:req.body})
    console.log(req.body);
});


//Login Route
   
router.post("/signin",async (req,res) =>{

    try{
        let token;
        const {email , password} = req.body;

        if(!email || !password)
        {
           return res.status(400).json({error:"Please fill the data"});
        }

        const userLogin = await Manager.findOne({email:email}) //userLogin will have the complete record data of the email entered
       
        

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

// Logout Route
router.post("/signout", authenticate, async (req, res) => {
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

//Update Manager Info
router.put('/updateManager/:managerId', async (req, res) => {
    const managerId = req.params.managerId;
    const { name, email, cnic, phone, city, password, confirmPassword } = req.body;

    

    try {
        // Check if the manager with the given ID exists
        const manager = await Manager.findById(managerId);
        if (!manager) {
            return res.status(404).json({ error: "Manager not found" });
        }

        // Update manager information
        manager.name = name;
        manager.email = email;
        manager.cnic = cnic;
        manager.phone = phone;
        manager.city = city;

        // // Optionally update password if provided
        // if (password && confirmPassword && password === confirmPassword) {
        //     manager.password = password;
        //     manager.confirmPassword = confirmPassword;
        // }

        // Save the updated manager information
        await manager.save();

        res.status(200).json({ message: "Manager information updated successfully" });
    } catch (err) {
        console.error(`Error occurred: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports= router; 