const Option = require("../models/optionModel");
const Question = require("../models/questionModel");

exports.createOption = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    const option = await Option.create({ text });
    question.options.push(option);
    await question.save();

    res.status(201).json({ success: true, option });
  } catch (error) {
    next(error);
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
