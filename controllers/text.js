const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();
const Cropper = require("../helpers/Cropper");
const Writer = require("../helpers/Writer");
const Reader = require("../helpers/Reader");

const textDetector = {
  async detect(request, inputFile) {
    const result = await client.textDetection(request);
    this.save('responses/text-detection.json', result);
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

  async crop(inputFile, result) {
    const { width, height } = await Cropper.getImageDimensions(inputFile);
    const objects = result[0].textAnnotations;

    objects.forEach((object, i) => {
      Cropper.crop(
        inputFile,
        object.boundingPoly.vertices,
        `results/images/text-${i}.png`
      );
    });
  }
};

module.exports = textDetector;
