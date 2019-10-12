"use strict";
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();
const FaceDetector = require("./controllers/face");
const ObjectDetector = require("./controllers/object");
const TextDetector = require("./controllers/text");

// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\pietr\Desktop\POCs TCC\Google Cloud Vision\key.json"

async function detect(inputFile, detectionType, newRequest = true) {
  const request = {
    image: { source: { filename: inputFile } },
    // features: [
    //   {
    //     type: "IMAGE_PROPERTIES"
    //   }
    // ]
  };

  console.log({ detectionType });

  switch (detectionType) {
    case "face":
      if (!newRequest) {
        FaceDetector.detectFromJson("responses/faceResults.json", inputFile);
      } else {
        FaceDetector.detect(request, inputFile);
      }
      break;
    case "object":
      if (!newRequest) {
        ObjectDetector.detectFromJson(
          "responses/object-detection.json",
          inputFile
        );
      } else {
        ObjectDetector.detect(request, inputFile);
      }
      break;
    case "text":
      if (!newRequest) {
        TextDetector.detectFromJson("responses/text-detection.json", inputFile);
      } else {
        TextDetector.detect(request, inputFile);
      }
      break;
  }
}

async function main(inputFile, detectionType, newRequest) {
  console.log("Detecting...");
  await detect(inputFile, detectionType, newRequest);
  console.log("Saving files...");
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
