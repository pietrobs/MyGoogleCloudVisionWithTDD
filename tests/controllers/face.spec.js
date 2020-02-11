const chai = require("chai");
const subSet = require("chai-subset");
const resources = require("./_resources");
const Face = require("../../controllers/face");

chai.use(subSet);

describe("FaceDetection controller functions", function() {
  if (resources.sendRequests) {
    this.timeout(30000);
    it("detect()", async function() {
      const { faceImagePath } = resources;
      const result = await Face.detect(faceImagePath);
      chai.expect(result).to.be.true;
    });
  }

  it("detectFromJson()", () => {
    const { faceJsonPath, faceImagePath } = resources;

    const result = Face.detectFromJson(faceJsonPath, faceImagePath);
    chai.expect(result).to.be.true;
  });
});
