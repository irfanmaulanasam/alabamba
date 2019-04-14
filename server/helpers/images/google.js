'use strict'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const {Storage} = require('@google-cloud/storage');
const CLOUD_BUCKET = process.env.CLOUD_BUCKET;

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
});
const bucket = storage.bucket(CLOUD_BUCKET);

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
};

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err)
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next()
    })
  });

  stream.end(req.file.buffer)
};

const Multer = require('multer'),
  multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 5 * 1024 * 1024
    }
    // dest: '../images'
  });

const deleteFileInGCS = async function (filename) {
  try {
    await storage
      .bucket(CLOUD_BUCKET)
      .file(filename)
      .delete()
  } catch (e) {
    console.log(e.message)
  }
};

const getDetail = async function (filename) {
  try {
    const [metadata] = await storage
      .bucket(CLOUD_BUCKET)
      .file(filename)
      .getMetadata();
    return metadata
  } catch (e) {
    console.log(e)
  }

};

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  deleteFileInGCS,
  getDetail,
  multer
};