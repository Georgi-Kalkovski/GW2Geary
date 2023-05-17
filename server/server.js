require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    initial();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
    process.exit();
  });

// Consolidated routes
app.use("/api", routes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Terter application." });
});

// Set port and listen for requests
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Function to initialize roles
async function initial() {
  const db = require("./models");
  const Role = db.role;

  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      await new Role({ name: "user" }).save();
      console.log("Added 'user' to roles collection");

      await new Role({ name: "moderator" }).save();
      console.log("Added 'moderator' to roles collection");

      await new Role({ name: "admin" }).save();
      console.log("Added 'admin' to roles collection");
    }
  } catch (error) {
    console.error("Error initializing roles:", error);
  }
}

