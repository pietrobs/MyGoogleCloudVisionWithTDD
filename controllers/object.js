const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();
const Cropper = require("../helpers/Cropper");
const Writer = require("../helpers/Writer");
const Reader = require("../helpers/Reader");

const objectDetector = {
  async detect(inputFile) {
    const request = {
      image: { source: { filename: inputFile } }
    };
    try {
      const result = await client.objectLocalization(request);
      this.save("responses/object-detection.json", result);
      this.crop(inputFile, result);
      return true;
    } catch (err) {
      return err;
    }
  },

  detectFromJson(path, inputFile) {
    try {
      const result = this.read(path);
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

  async crop(inputFile, result) {
    const { width, height } = await Cropper.getImageDimensions(inputFile);
    const objects = result[0].localizedObjectAnnotations;

    objects.forEach((object, i) => {
      const vertices = [];

      object.boundingPoly.normalizedVertices.forEach(vertice => {
        vertices.push({ x: vertice.x * width, y: vertice.y * height });
      });

      Cropper.crop(
        inputFile,
        vertices,
        `results/images/object-${object.name}-${i}.png`
      );
    });
  }
};

module.exports = objectDetector;
