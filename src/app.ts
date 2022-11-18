import express, { ErrorRequestHandler } from "express";
import TSON from "typescript-json";
const app = express();
app.use(express.json());

interface IUserCreateInput {
  name: string;
  age: number;
  canDrive?: boolean;
}

app.post("/users", (req, res, next) => {
  try {
    const userCreateInput: IUserCreateInput = req.body;
    TSON.assertEquals(userCreateInput);
    res.json(userCreateInput);
  } catch (err) {
    next(err);
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "api is working",
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
