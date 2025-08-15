require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 7890;
const userRouter = require("./routes/userRouter");
const studentRouter = require("./routes/studentRouter");

// MiddleWareApp.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Admin CRUD API",
    status: "success",
  });
});
//ROuter
app.use("/", userRouter);
app.use("/api/student", studentRouter);

// Test route to insert a user document
const USER = require("./models/users");
app.post("/test-user", async (req, res) => {
  try {
    const user = await USER.create({
      fullName: "Test User",
      email: "testuser@example.com",
      phoneNumber: "+1234567890",
      role: "admin",
      password: "password123",
    });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

//error handling route
app.use((req, res) => {
  res.status(404).json({
    message: "Resources not found",
    status: "error",
  });
});

//Database Connection
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "admin_crud_api",
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database");
  }
};
startServer();
