const chai = require("chai");
const subSet = require("chai-subset");
const resources = require("./_resources");
const { examplesPath } = require("../../constants");
const Cropper = require("../../helpers/Cropper");

chai.use(subSet);

describe("Cropper helper functions", () => {
  it("readFile()", async () => {
    const { imageName } = resources;

    const result = await Cropper.readFile(`${examplesPath}/${imageName}`);
    chai.expect(result).to.be.a("image");
  });

  it("getImageDimensions()", async () => {
    const { imageName, imageDimensions } = resources;

    const result = await Cropper.getImageDimensions(
      `${examplesPath}/${imageName}`
    );
    chai.expect(result).to.eql(imageDimensions);
  });
});
