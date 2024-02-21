const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDelete,
  handleUpdate,
  searchUrl,
  allHandleDelete
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.post("/search",searchUrl);

router.post("/remove", handleDelete);

router.post("/update",handleUpdate);

router.post("/delete", allHandleDelete);

module.exports = router;
