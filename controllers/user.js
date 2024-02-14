const { v4: uuidv4 } = require('uuid');
const { createHmac } = require('crypto');
const USER = require("../models/user.js");
const { sessionIdToUserMap , getUser} = require("../service/auth.js");
async function handleUserSignup(req,res){
    const { name , email , password } = req.body;
    const result = await USER.findOne({email});
    if(!result){
        const hashedPassword = createHmac('sha256', password)
               .update('I love cupcakes')
               .digest('hex');
        const User = new USER();
        User.name = name;
        User.email = email;
        User.password = hashedPassword;
    
        await User.save();
        return res.redirect("/login");
    }else{
        res.send(`You are already registered. Please login`);
    }
}

async function handleUserLogin(req,res){
    const { email , password } = req.body;

    if(!email || !password){
        alert(`Email or password is required`);
    }
    const hashedPassword = createHmac('sha256', password)
               .update('I love cupcakes')
               .digest('hex');
    console.log(hashedPassword);
 
    const result = await USER.findOne({email:email,password:hashedPassword});
    console.log(result);
    if(!result){
        return res.render("login",{
            error : `Invalid Username or Password`
        })
    }
    const token = sessionIdToUserMap(result);
    // console.log(token);
    res.cookie('uid',token);
    res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}