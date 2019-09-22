const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const uuid = require('uuid/v4');
const mime = require('mime-types');

const app = express();
const { PROJECTID, BUCKET } = require('./config');

app.post('/upload', multer().single('image'), (req, res, next) => {
  const type = mime.lookup(req.file.originalname);

  const storage = new Storage({
    projectId: PROJECTID,
    keyFilename: './google.json'
  });

  const bucket = storage.bucket(BUCKET);
  const blob = bucket.file(`${uuid()}.${mime.extensions[type][0]}`);

  const stream = blob.createWriteStream({
    resumable: true,
    contentType: type,
    predefinedAcl: 'publicRead'
  });

  stream.on('error', err => {
    console.log(err);
    next(err);
  });

  stream.on('finish', () => {
    res.status(200).json({
      data: {
        url: `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      }
    });
  });

  stream.end(req.file.buffer);
});

app.get('/', (req, res, next)=> {
  res.status(200).json({
    message: "Hip Hip Horray"
  })
})

app.listen(5000, () => console.log('Connected'));