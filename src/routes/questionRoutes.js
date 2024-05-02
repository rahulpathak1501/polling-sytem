const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

// Route to create a new question
router.post("/create", questionController.createQuestion);

// Route to view a question with its options and votes
router.get("/:id", questionController.viewQuestion);

// Route to delete a question
router.delete("/:id/delete", questionController.deleteQuestion);

module.exports = router;
