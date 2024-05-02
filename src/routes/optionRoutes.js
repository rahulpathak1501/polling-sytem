const express = require("express");
const router = express.Router();
const optionController = require("../controllers/optionController");

router.post("/:id/create", optionController.createOption);
router.delete("/:id/delete", optionController.deleteOption);
router.post("/:id/add_vote", optionController.addVoteToOption);

module.exports = router;
