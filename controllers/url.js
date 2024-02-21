const shortid = require("short-unique-id");
const URL = require("../models/url");
const { default: mongoose } = require("mongoose");
const { all } = require("../routes/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  const id = req.user._id;
  const prevUrl = body.redirectURL;
  if (!body.redirectURL) return res.status(400).render("home",{
    id : "-1",
  })
  const shortID = new shortid(10).rnd();
  const date = Date.now();
  const use = await URL.findOne({createdBy : id , redirectURL : prevUrl})
  if(!use){
   const urls = new URL();
   urls.shortId = shortID;
   urls.redirectURL = prevUrl;
   urls.visitHistory.push(date);
   urls.createdBy = id;
   await urls.save();
  }else{
    return res.render("home",{
      id : "0"
    })
  }
  
  return res.render("home",{
    id:shortID,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const date = new Date();
  const result = await URL.findOne({shortId:shortId});
  result.visitHistory.push({date});
  await result.save();
  // console.log(result.redirectURL);
  return res.status(200).redirect(result.redirectURL);
}

async function searchUrl(req,res){
  const body = req.body;
  const url = body.redirectURL;
  const result = await URL.findOne({createdBy : req.user._id , redirectURL:url});
  if(!result) return res.render("home",{
    id : "-1"
  })
    return res.render("home",{
      id : result.shortId,
    })
}

async function handleUpdate(req,res){
  const shortID = new shortid(10).rnd();
  const newUrl = req.body.redirectURL;
  const date = Date.now();
  const result = await URL.findOneAndUpdate({createdBy:req.user._id,redirectURL:newUrl},{shortId:shortID},{visitHistory:date},{new:true});
  if(!result) return res.render("home",{
    id : "-1"
  })
  result.save();
  return res.redirect("/");
}

async function handleDelete(req,res){
  const url = req.body.redirectURL;
  const result = await URL.findOne({createdBy:req.user._id,redirectURL:url});
  if(!result) return res.render("home",{
    id : "-1"
  })
  const newResult = await URL.findOneAndDelete({redirectURL:url});
  res.redirect("/");
}

async function allHandleDelete(req,res){
  const id = req.user._id;
  const all = await URL.deleteMany({createdBy:id});
  console.log(all);
  return res.redirect("/");
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDelete,
  handleUpdate,
  searchUrl,
  allHandleDelete
};
