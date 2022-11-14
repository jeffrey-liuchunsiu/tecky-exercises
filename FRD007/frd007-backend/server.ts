import express from "express";
import { Request, Response } from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json())
app.post("/login", function (req: Request, res: Response) {
  const { username, password } = req.body
  if (username === 'james' && password === "1234") {
    res.json({
      status: "successful",
      displayName: "james from express"
    });
  } else {
    res.status(400).json({
      status: "fail",
      msg: "username or password is invalid"
    })
  }
});

app.get("/todoItems", function (req: Request, res: Response) {
  // Call DB
  const dbData = [
    {
      name: "Buy milk",
      count: 0,
      isChecked: false,
      isDisplayMode: true,
    },
  ]
  res.json(dbData);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
