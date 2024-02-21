const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/",async(req,res)=>{
    if(req.user){
        const id = req.user?req.user._id:'0';
        const allUrls = await URL.find({createdBy : id});
      return res.render("home",{url1:allUrls});
    }else{
        return res.render("home",{url1:null});
    }
})

router.post("/",(req,res)=>{
    res.clearCookie('uid');
    return res.redirect('/');
})
router.get("/signup",(req,res)=>{
    return res.render("signup");
})
  
router.get("/login",(req,res)=>{
return res.render("login");
})

router.post("/log",(req,res)=>{
    return res.redirect("/login");
})

router.post("/sign",(req,res)=>{
    return res.redirect("/signup");
})


module.exports = router;