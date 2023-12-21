const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandleMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth.route");
const jobRouter = require("./routes/jobs.routes");
const app = express();

require("dotenv").config();
app.use(express.json());

// The dynamic port
const port = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.send("This is the home page");
});
// General route
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobRouter);

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
