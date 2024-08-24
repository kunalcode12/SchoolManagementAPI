const express = require("express");
const morgan = require("morgan");
const schoolRoute = require("./routes/schoolRoutes");
const schoolListRoute1 = require("./routes/schoolListRoute");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");
const app = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP,please try again in an hour",
});

app.use("/api", limiter);

app.use(express.json());

app.use(xss());

app.use(
  hpp({
    whitelist: ["latitude", "longitude", "unit"],
  })
);
app.get("/", (req, res, next) => {
  res.status(201).json({
    data: {
      message: "Welcome to the API",
      instructions: "Use the following endpoints:",
      endpoints: {
        getAllSchools: "/api/v1/listSchools",
        addSchool: "/api/v1/addSchool",
      },
      example:
        "https://school-management-api-one.vercel.app/api/v1/listSchools",
    },
  });
});

app.use("/api/v1/addSchool", schoolRoute);
app.use("/api/v1/listSchools", schoolListRoute1);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
