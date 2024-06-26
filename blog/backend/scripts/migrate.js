const { exec } = require("child_process");
const path = require("path");
const debug = require("debug")("csablog:migrate"); // Replace 'your-app-name' with your actual app name

const isProduction = process.env.NODE_ENV === "production";

/**
 * Logs messages based on the environment.
 *
 * @param {string} message - The message to log.
 */
function log(message) {
  if (isProduction) {
    debug(message);
  } else {
    console.log(message);
  }
}

/**
 * Function to run Sequelize migrations and log the status.
 *
 * @async
 * @function runMigrations
 * @returns {Promise<void>} - A promise that resolves when the migrations are complete.
 */
async function runMigrations() {
  try {
    const migrationsPath = path.join(__dirname, "..");
    const sequelizeCmd = "npx sequelize-cli db:migrate";
    exec(sequelizeCmd, { cwd: migrationsPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Migration failed: ${error.message}`);
        process.exit(1);
      }
      if (stderr) {
        console.log(`Migration stderr: ${stderr}`);
      }
      console.log(`Migration stdout: ${stdout}`);
      console.log("Database migration was successful.");
    });
  } catch (error) {
    console.error("Database migration failed: ", error);
    process.exit(1); // Exit the process with an error code
  }
}

module.exports = runMigrations;
