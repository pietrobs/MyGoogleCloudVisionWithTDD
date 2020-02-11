const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();
const { Cropper, Writer, Reader } = require("../helpers");

const faceDetector = {
  async detect(inputFile) {
    const request = {
      image: { source: { filename: inputFile } }
    };

    try {
      const result = await client.imageProperties(inputFile);
      this.save("responses/properties-detection.json", result);
      this.crop(inputFile, result);
      return true;
    } catch (err) {
      return err;
    }
  },

  detectFromJson(path, inputFile) {
    const result = this.read(path);
    try {
      this.crop(inputFile, result);
      return true;
    } catch (err) {
      return err;
    }
  },

  save(path, content) {
    Writer.save(path, content);
  },

  read(path) {
    return Reader.read(path);
  },

  crop(inputFile, result) {
    const hints = result[0].cropHintsAnnotation.cropHints;
    hints.forEach((hint, i) => {
      Cropper.crop(
        inputFile,
        hint.boundingPoly.vertices,
        `results/images/detection-properties-${i}.jpg`
      );
    });
  }
};

module.exports = faceDetector;
