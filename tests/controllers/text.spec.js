const chai = require("chai");
const subSet = require("chai-subset");
const resources = require("./_resources");
const Text = require("../../controllers/object");

chai.use(subSet);

describe("TextDetection controller functions", function() {
  if (resources.sendRequests) {
    this.timeout(30000);
    it("detect()", async function() {
      const { textImagePath } = resources;
      const result = await Text.detect(textImagePath);
      chai.expect(result).to.be.true;
    });
  }

  it("detectFromJson()", () => {
    const { textJsonPath, textImagePath } = resources;
    const result = Text.detectFromJson(textJsonPath, textImagePath);
    chai.expect(result).to.be.true;
  });
});
