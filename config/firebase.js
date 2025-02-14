const { initializeApp } = require('firebase-admin/app');
const admin = require("firebase-admin");
const dotenv = require('dotenv');
dotenv.config()

// Fetch the service account key JSON file contents
const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://assignment-simple-rest-api-default-rtdb.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.database();



module.exports = db