const fs = require("fs");
const Canvas = require("canvas");
const { promisify } = require("util");

const Cropper = {
  async crop(path, vertices, outputName) {
    const image = await this.readFile(path);
    this.cropAndSave(outputName, vertices, image);
  },

  async readFile(path) {
    const readFile = promisify(fs.readFile);
    const readImage = await readFile(path);
    const Image = Canvas.Image;
    const image = new Image();
    image.src = readImage;
    return image;
  },

  async getImageDimensions(path){
    const image = await this.readFile(path);
    return {width: image.width, height: image.height};
  },

  async cropAndSave(imgName, vertices, image) {
    const initX = this.getInit("x", vertices); 
    const initY = this.getInit("y", vertices); 
    const endX = this.getEnd("x", vertices); 
    const endY = this.getEnd("y", vertices); 
    const width = parseInt(endX - initX, 10);
    const height = parseInt(endY - initY, 10);
    const canvas = new Canvas.Canvas(width, height);

    canvas
      .getContext("2d")
      .drawImage(image, initX, initY, width, height, 0, 0, width, height);

    const writeStream = fs.createWriteStream(imgName);
    const pngStream = canvas.pngStream();

    await new Promise((resolve, reject) => {
      pngStream
        .on("data", chunk => writeStream.write(chunk))
        .on("error", reject)
        .on("end", resolve);
    });
  },

  getInit(point, vertices) {
    let initPoint = vertices[0][point];

    vertices.forEach(points => {
      if (points[point] < initPoint) initPoint = points[point];
    });

    return parseInt(initPoint, 10);
  },

  getEnd(point, vertices) {
    let endPoint = vertices[0][point];

    vertices.forEach(points => {
      if (points[point] > endPoint) endPoint = points[point];
    });

    return parseInt(endPoint, 10);
  }
};

module.exports = Cropper;
