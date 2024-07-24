const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render("home", { title: "Home", tasks });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;