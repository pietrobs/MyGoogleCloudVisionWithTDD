const chai = require("chai");
const subSet = require("chai-subset");
const resources = require("./_resources");
const { responseTestPath } = require("../../constants");
const Reader = require("../../helpers/Reader");

chai.use(subSet);

describe("Reader helper functions", () => {
  it("read()", async () => {
    const { content, fileName } = resources;

    const result = await Reader.read(`${responseTestPath}/${fileName}`);

    chai.expect(result).to.eql(content);
  });
});
