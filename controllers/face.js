const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();
const Cropper = require("../helpers/Cropper");
const Writer = require("../helpers/Writer");
const Reader = require("../helpers/Reader");

const faceDetector = {
  async detect(request, inputFile) {
    const result = await client.faceDetection(request);
    this.save('responses/face-detection.json', result);
    this.crop(inputFile, result);
  },

  detectFromJson(path, inputFile) {
    const result = this.read(path);
    this.crop(inputFile, result);
  },

  save(path, content) {
    Writer.save(path, content);
  },

  read(path) {
    return Reader.read(path);
  },

  crop(inputFile, result) {
    const faces = result[0].faceAnnotations;
    faces.forEach((face, i) => {
      Cropper.crop(
        inputFile,
        face.boundingPoly.vertices,
        `results/images/detection-face-${i}.jpg`
      );
    });
  }
};

module.exports = faceDetector;
