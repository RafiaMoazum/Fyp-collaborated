const mongoose =require('mongoose');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');  //jwt.sign & jwt.verify

const managerSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   
    email:{
        type:String,
        required:true
    },
  
    phone:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
   
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    hostels:{
        type:[String]
    },
    tokens:[
        {
         token:{
            type:String,
            required:true
         }
        }
    ]
})



//Hasing Passowrd. Defining Middleware

managerSchema.pre('save' , async function(next){
    
       if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password, 12);
            this.confirmPassword= await bcrypt.hash(this.confirmPassword,12);
       }
       next();
});

//generating token
managerSchema.methods.generateAuthToken = async function(){
    try{
  
      let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY)
    this.tokens =this.tokens.concat({token:token});
    await this.save();
    return token;
    }catch(err){
        console.log(err);
    }
}

const Manager= mongoose.model("Manager", managerSchema);
module.exports = Manager;
