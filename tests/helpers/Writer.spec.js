const chai = require("chai");
const resources = require("./_resources");
const { responseTestPath } = require("../../constants");

const Writer = require("../../helpers/Writer");

describe("Writer helper functions", () => {
  it("save()", async () => {
    const { content, fileName } = resources;
    const result = await Writer.save(`${responseTestPath}/${fileName}`, content);

    chai.expect(result).to.be.true;
  });
});
