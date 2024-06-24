require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { Sequelize } = require("sequelize");
const { exec } = require("child_process");
const util = require("util");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// Environment-specific database configuration
const isProduction = process.env.NODE_ENV === "production";
const dbConfig = {
  username: isProduction
    ? process.env.DB_USERNAME
    : process.env.DEV_DB_USERNAME,
  password: isProduction
    ? process.env.DB_PASSWORD
    : process.env.DEV_DB_PASSWORD,
  database: isProduction ? process.env.DB_NAME : process.env.DEV_DB_NAME,
  host: isProduction ? process.env.DB_HOST : process.env.DEV_DB_HOST,
  port: isProduction ? process.env.DB_PORT : process.env.DEV_DB_PORT,
  dialect: "postgres",
  dialectOptions: isProduction
    ? {
        ssl: {
          require: process.env.DB_SSLMODE === "require",
          rejectUnauthorized: false, // You may need to adjust this setting based on your SSL requirements
        },
      }
    : {},
};

// Database connection setup
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
  }
);

// Function to run migrations
const runMigrations = async () => {
  const execPromisified = util.promisify(exec);
  try {
    const { stdout, stderr } = await execPromisified(
      "npx sequelize-cli db:migrate"
    );
    console.log("Migration stdout:", stdout);
    console.error("Migration stderr:", stderr);
  } catch (error) {
    console.error("Error running migrations:", error);
    throw error;
  }
};

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Function to start the server after running migrations
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await runMigrations();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit with failure
  }
};

startServer();

module.exports = app;
