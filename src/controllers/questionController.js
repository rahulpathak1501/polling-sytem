const Question = require("../models/questionModel");
const Option = require("../models/optionModel");
// require("dotenv").config();
// const uri = `mongodb+srv://rahul2pathak3297:${process.env.MONGODB_PASSWORD}@cluster0.9wavjba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

exports.createQuestion = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "title is required for creating question",
      });
    }

    const question = await Question.create({
      title,
    });

    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createOption = async (req, res) => {
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

    res.status(201).json(option);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Check if any option has votes before deleting the question
    const hasVotes = question.options.some((option) => option.votes > 0);
    if (hasVotes) {
      return res
        .status(400)
        .json({ error: "Cannot delete question with votes" });
    }

    await question.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.viewQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id).populate("options");
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    const formattedOptions = question.options.map((option) => ({
      id: option._id,
      text: option.text,
      votes: option.votes,
      link_to_vote: `https://polling-system.onrender.com/options/${option._id}/add_vote`,
    }));

    const formattedQuestion = {
      id: question._id,
      title: question.title,
      options: formattedOptions,
    };

    res.status(200).json(formattedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
