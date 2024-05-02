const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Express
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/cv")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Can´t connect to database: " + error);
  });

//Experiece schema
const WorkExperienceSchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: [true, "Du måste fylla i namnet på arbetsplatsen"],
  },
  jobtitle: {
    type: String,
    required: [true, "Du måste fylla i jobtitel"],
  },
  location: {
    type: String,
    required: [true, "Du måste fylla i plats"],
  },
  startdate: {
    type: String,
    required: [true, "Du måste fylla i startdatum"],
  },
  enddate: {
    type: String,
    required: [true, "Du måste fylla i slutdatum"],
  },
  description: {
    type: String,
    required: [true, "Du måste fylla i beskrivning"],
  },
});

const WorkExperience = mongoose.model("Work_experience", WorkExperienceSchema);

//Routes
app.get("/api", async (req, res) => {
  res.json({ message: "Welcome to this API" });
});

//Get
app.get("/api/workexperiences", async (req, res) => {
  //Get work experiences
  try {
    let result = await WorkExperience.find({});
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//Post
app.post("/api/workexperiences", async (req, res) => {
  try {
    let result = await WorkExperience.create(req.body);
    return res.json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});

//Delete
app.delete("/api/workexperiences/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await WorkExperience.findByIdAndDelete(id);
    if (!result) {
      return res
        .status(404)
        .json({ message: "Arbetserfarenheten hittades inte" });
    }
    return res.json({ message: "Arbetserfarenhet raderad" });
  } catch (error) {
    return res.status(500).json(error);
  }
});

//Put
app.put("/api/workexperiences/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedExperience = req.body;
    const result = await WorkExperience.findByIdAndUpdate(
      id,
      updatedExperience,
      { new: true }
    );
    if (!result) {
      return res
        .status(404)
        .json({ message: "Arbetserfarenheten hittades inte" });
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
