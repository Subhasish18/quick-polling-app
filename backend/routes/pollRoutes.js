const express = require("express");
const Poll = require("../models/Poll");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { question, options, duration } = req.body;
    const poll = new Poll({ question, options, duration });

    await poll.save();
    res.json(poll);


    setTimeout(async () => {
      await Poll.findByIdAndUpdate(poll._id, { status: "ended" });
      console.log(`⏳ Poll "${poll.question}" has ended.`);
    }, duration * 1000); 
  } catch (err) {
    res.status(500).json({ error: "Failed to create poll" });
  }
});

router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch polls" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const poll = await Poll.findByIdAndDelete(req.params.id);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }
    res.json({ message: "Poll deleted successfully", pollId: req.params.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete poll" });
  }
});

module.exports = router;