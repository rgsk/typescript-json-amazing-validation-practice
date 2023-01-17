import express, { ErrorRequestHandler } from "express";
import TSON from "typescript-json";
import axios from "axios";
import { samplePdfData } from "./sampleData";
import fs from "fs";
import cors from "cors";
import request from "request";
const app = express();
app.use(cors());
app.use(express.json());

interface IUserCreateInput {
  name: string;
  age: number;
  canDrive?: boolean;
}
app.use("/uploads", express.static("uploads"));

app.post("/users", (req, res, next) => {
  try {
    const userCreateInput: IUserCreateInput = req.body;
    TSON.assertEquals(userCreateInput);
    res.json(userCreateInput);
  } catch (err) {
    next(err);
  }
});

app.get("/", async (req, res) => {
  fs.createReadStream("uploads/new delhi to chandigarh.pdf").pipe(res);
});

app.get("/ticket", (req, res) => {
  res.download("uploads/new delhi to chandigarh.pdf");
});
app.get("/sample", async (req, res) => {
  const response = await axios.get(
    "https://20e5-103-117-12-76.in.ngrok.io/unicommerce/download-invoice-pdf"
  );
  const pdfData = response.data.data;
  console.log({ pdfData });
  res.setHeader("content-type", "application/pdf");
  res.send(pdfData);
});

app.get("/last-attempt", (req, res) => {
  // Force browser to download file
  res.set("Content-Type", "application/pdf");
  res.set("Content-Disposition", "attachment; filename=file.pdf");

  // send file
  request
    .get({
      url: "https://20e5-103-117-12-76.in.ngrok.io/unicommerce/download-invoice-pdf",
      preambleCRLF: true,
      postambleCRLF: true,
    })
    .pipe(res);
});

app.get("/get-pdf", (req, res) => {
  request
    .get({
      url: "https://physicswallah.unicommerce.com/services/rest/v1/oms/invoice/show?invoiceCodes=INV22-23/123240",
      headers: {
        Authorization: "Bearer 1bdf6245-1ac7-4168-9a33-d551e44528f2",
        Facility: "PWC-1",
      },
    })
    .pipe(res);
});
app.get("/get-pdf2", (req, res) => {
  axios
    .get(
      "https://physicswallah.unicommerce.com/services/rest/v1/oms/invoice/show?invoiceCodes=INV22-23/123240",
      {
        headers: {
          Authorization: "Bearer 1bdf6245-1ac7-4168-9a33-d551e44528f2",
          Facility: "PWC-1",
        },
        responseType: "stream",
      }
    )
    .then((response) => {
      response.data.pipe(res);
    });
});
app.get("/download-pdf", (req, res) => {
  axios
    .get(
      "https://pw-store-dev.penpencil.co/order/56df2b03-450c-4579-8c8e-249d3dc947a1/download-invoice-pdf",
      { responseType: "stream" }
    )
    .then((response) => {
      res.setHeader("Content-Disposition", "attachment");
      response.data.pipe(res);
    });
});
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({
    error: err,
    message: err.message,
  });
};

app.use(errorHandler);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
export default app;
