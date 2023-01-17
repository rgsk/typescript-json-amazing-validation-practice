import tesseract from "node-tesseract-ocr";
import path from "path";
const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
};
tesseract
  .recognize(
    path.join(__dirname, "../Screenshot 2022-12-11 at 10.12.27 PM.png"),
    config
  )
  .then((text) => {
    console.log("Result:", text);
  })
  .catch((error) => {
    console.log(error.message);
  });
