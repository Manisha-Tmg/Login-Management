// make express app
// attach port to it

// alt+shift+o= remove unused imports

import cors from "cors";
import express, { json } from "express";
import connectToDb from "./src/connectToDb/connectToDb.js";
import productRouter from "./src/Routes/productRouter.js";
import reviewRouter from "./src/Routes/reviewRouter.js";
import fileRouter from "./src/Routes/fileRouter.js";
import webUserRouter from "./src/Routes/webUserRouter.js";
let app = express();
app.use(cors());
let port = 8000;
app.listen(port, () => {
  console.log(`<---- Apllication is listening at ${port} ---->`);
  connectToDb();
});

app.use(json()); //make our system capable to take json data , always place it at top

app.use(express.static("public"));
app.use("/products", productRouter);
app.use("/reviews", reviewRouter);
app.use("/file", fileRouter);
app.use("/web-users", webUserRouter);
