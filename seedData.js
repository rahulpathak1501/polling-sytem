const mongoose = require("mongoose");
const Question = require("./src/models/questionModel");
const Option = require("./src/models/optionModel");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/polling_system", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to seed data
async function seedData() {
  try {
    // Clear existing data
    await Question.deleteMany();
    await Option.deleteMany();

    // Create options
    const optionsData = [
      { text: "Aakash Tyagi", votes: 100 },
      { text: "Parikh Jain", votes: 101 },
      { text: "Ankush Singla", votes: 102 },
      { text: "Nidhi", votes: 110 },
    ];

    const createdOptions = await Option.create(optionsData);

    // Create questions with associated options
    const questionsData = [
      {
        title: "Who is your favorite from the Ninjas Mentors",
        options: [
          createdOptions[0]._id,
          createdOptions[1]._id,
          createdOptions[2]._id,
          createdOptions[3]._id,
        ],
      },
    ];

    await Question.create(questionsData);

    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
}

// Run the seed function
seedData();
