const express = require("express");
const router = express.Router();
const { User } = require("../models"); 
const verifyToken = require("../middleware/verify-token");

router.get("/:userId", verifyToken, async (req, res) => {
  console.log("----- checking API profile -----", req.params.userId);
  try {
    if (req.user._id !== req.params.userId){ 
        return res.status(401).json({ error: "Unauthorized"})
    }
    const user = await User.findById({_id: req.user._id})
    .then((user) => {
      console.log('------- user found in profile-----', user);
      if(user){
          res.json(user)
      } else {
          res.send("User does not exist")
      }
  })
    res.json({ user });
  } catch (error) {
    if (res.statusCode === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
