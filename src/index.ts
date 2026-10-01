import express from "express";
import { AppRoutesV1 } from "./infrastructure/routes/index.js";

const app = express();

app.use(express.json());
app.use("/api", AppRoutesV1());

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
