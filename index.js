"use strict";
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();
const FaceDetector = require("./controllers/face");
const ObjectDetector = require("./controllers/object");
const TextDetector = require("./controllers/text");
const PropertiesDetector = require("./controllers/properties");

// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\pietr\Desktop\POCs TCC\Google Cloud Vision\key.json"

async function detect(inputFile, detectionType, newRequest = false) {
  if (newRequest) {
    console.log("Sending request to Google Cloud Vision API");
  } else {
    console.log("Loading data from json");
  }

  switch (detectionType) {
    case "face":
      if (!newRequest) {
        FaceDetector.detectFromJson("responses/face-detection.json", inputFile);
      } else {
        FaceDetector.detect(inputFile);
      }
      break;
    case "object":
      if (!newRequest) {
        ObjectDetector.detectFromJson(
          "responses/object-detection.json",
          inputFile
        );
      } else {
        ObjectDetector.detect(inputFile);
      }
      break;
    case "text":
      if (!newRequest) {
        TextDetector.detectFromJson("responses/text-detection.json", inputFile);
      } else {
      }
      break;
    case "properties":
      if (!newRequest) {
        PropertiesDetector.detect(inputFile);
      } else {
        PropertiesDetector.detectFromJson(
          "responses/properties-detection.json",
          inputFile
        );
      }
      break;
    case "all":
      FaceDetector.detect(inputFile);
      TextDetector.detect(inputFile);
      ObjectDetector.detect(inputFile);
      PropertiesDetector.detect(inputFile);
  }
}

async function main(inputFile, detectionType, newRequest) {
  console.log("Detecting...");
  await detect(inputFile, detectionType, newRequest);
  console.log("Saving files...");
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
