// SECURITY: If an application is to be deployed on the clod, we need to think about security, which is how to protect our APIs from bad actors

// * helmet: The helmet library sets various HTTP headers to prevent numerous possible attacks
// * cors: This ensures that our APIs are accessible from different domain
// * xss-clean: This library helps to sanitize the user input in the req.body, req.query and req.params and as a result, protects us from cross-side scripting attacks where the attacker tries to inject some malicious code.
// * express-rate-limit: This helps to limit the amount of request a user can make

// ADDING SWAGGER UI TO OUR APPLICATION
// * yamljs : This is used to convert the yaml one to something the Swagger UI can understand.
// * swagger-ui-express: This adds Swagger to our application

const express = require("express");
require("express-async-errors");
require("dotenv").config();
const app = express();

// Extra security packages
// const helmet = require("helmet");
const cors = require("cors");
// const xss = require("xss-clean");
// const rateLimiter = require("express-rate-limit");

// Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocs = YAML.load("./swagger.yaml");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandleMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth.route");
const jobRouter = require("./routes/jobs.routes");
const authMiddleware = require("./middleware/auth");

// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
//     standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
//     // store: ... , // Use an external store for consistency across multiple server instances.
//   })
// );
app.use(express.json());
// app.use(helmet());
app.use(cors());
// app.use(xss());

// The dynamic port
const port = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.send("<h2>Home page</h2><a href='/api-docs'>Go To Docs</a>");
});

// Serve the documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// General route
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobRouter);

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
