const { examplesTestPath, responseTestPath } = require("../../constants");
const resources = {
  sendRequests: false,

  // face
  faceImagePath: examplesTestPath + "/face.jpg",
  faceJsonPath: responseTestPath + "/face.json",

  // object
  objectImagePath: examplesTestPath + "/object.jpg",
  objectJsonPath: responseTestPath + "/object.json",

  // text
  textImagePath: examplesTestPath + "/text.jpg",
  textJsonPath: responseTestPath + "/text.json"
};

module.exports = resources;
