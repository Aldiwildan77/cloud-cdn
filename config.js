require('dotenv').config();

const GOOGLE = {
  PROJECTID: process.env.GCS_PROJECTID,
  BUCKET: process.env.GCS_BUCKET
}

module.exports = GOOGLE