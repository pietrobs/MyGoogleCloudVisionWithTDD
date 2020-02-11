const chai = require("chai");
const subSet = require("chai-subset");
const resources = require("./_resources");
const Object = require("../../controllers/object");

chai.use(subSet);

describe("ObjectLocalization controller functions", function() {
  if (resources.sendRequests) {
    this.timeout(30000);
    it("detect()", async function() {
      const { objectImagePath } = resources;
      const result = await Object.detect(objectImagePath);
      chai.expect(result).to.be.true;
    });
  }

  it("detectFromJson()", () => {
    const { objectJsonPath, objectImagePath } = resources;

    const result = Object.detectFromJson(objectJsonPath, objectImagePath);
    chai.expect(result).to.be.true;
  });
});
