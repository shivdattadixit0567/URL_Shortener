const jwt = require("jsonwebtoken");
const secret = "Ankit@123"
function sessionIdToUserMap(user){
    const ans = jwt.sign({
        _id : user._id,
        email : user.email
    }, secret )
    // console.log(ans);
    return ans;
}

function getUser(token){
    // console.log(token);
    if(!token) return null;
    try{
        return jwt.verify(token,secret);
    }catch(err){
        return res.send("Invalid User");
    }
}

module.exports = {
    sessionIdToUserMap,
    getUser
}