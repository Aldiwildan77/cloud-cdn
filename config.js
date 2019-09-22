require('dotenv').config();

const GOOGLE = {
  PROJECT_ID: process.env.GCS_PROJECT_ID,
  BUCKET: process.env.GCS_BUCKET
}

module.exports = GOOGLE