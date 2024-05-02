const Option = require("../models/optionModel");
const Question = require("../models/questionModel");

exports.createOption = async (questionId, optionText) => {
  try {
    const response = await fetch(
      `https://polling-system.onrender.com/questions/${questionId}/options/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: optionText }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create option");
    }

    const option = await response.json();
    console.log("Option created:", option);
    return option;
  } catch (error) {
    console.error("Error creating option:", error.message);
  }
};

exports.deleteOption = async (req, res, next) => {
  try {
    const { id } = req.params;

    const option = await Option.findById(id);
    if (!option) {
      return res.status(404).json({ error: "Option not found" });
    }

    if (option.votes > 0) {
      return res.status(400).json({ error: "Cannot delete option with votes" });
    }

    await option.deleteOne();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.addVoteToOption = async (req, res, next) => {
  try {
    const { id } = req.params;

    const option = await Option.findById(id);
    if (!option) {
      return res.status(404).json({ error: "Option not found" });
    }

    option.votes += 1;
    await option.save();

    res.status(200).json({ message: "Vote added successfully" });
  } catch (error) {
    next(error);
  }
};
