const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

const requirementRoutes = require("./routes/requirements");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GoPratle API is running");
});

app.use("/api/requirements", requirementRoutes);

async function connectToDatabase() {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Database connected");
      return;
    }

    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    console.log("Local database connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);

    try {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
      console.log("Backup database connected");
    } catch (backupError) {
      console.error("Backup database failed:", backupError.message);
      process.exit(1);
    }
  }
}

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
