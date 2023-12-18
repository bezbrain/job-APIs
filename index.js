const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandleMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const app = express();

require("dotenv").config();

// The dynamic port
const port = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.send("This is the home page");
});
// General route
// app.use("/api/v1");

// Not-found middleware
app.use(notFoundMiddleware);
// Error-handle middleware
app.use(errorHandleMiddleware);

const startDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
startDB();
