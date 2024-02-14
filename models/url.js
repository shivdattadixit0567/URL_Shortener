const mongoose = require("mongoose");
const { user } = require("./user")
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
      unique : false,
      index : false
    },
    visitHistory : [{type:Object}],
    createdBy : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "user"
    }
  },
  { timestamps: true }
);

const URL = new mongoose.model("newurl", urlSchema);

module.exports = URL;
