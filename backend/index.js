const express = require("express");
var morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const app = express();
const PORT = 8088 || process.env.PORT;
const cors = require("cors");
const myLogger = require("./src/middlewares/logger/winton.log");
const { v4: uuidv4 } = require('uuid');
const cloudinary = require("cloudinary").v2;

dotenv.config();
require("./src/dbs/init.mongodb");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});



app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use((req, res, next) => {
  const requestId = req.headers['x-client-id'] || uuidv4()
  req.requestId = requestId
  req.startTime = Date.now()
  myLogger.log(`Method: ${req.method}`, [
      req.path,
      { requestId: req.requestId },
      req.method === 'POST' ? req.body : req.query,
  ])
  next()
})

app.use(require("./src/routes"));

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const resMessage = `${status} - ${Math.abs(req.startTime - Date.now()) || 0}ms - Response: ${JSON.stringify(err)}`
  myLogger.error(resMessage, [
      req.path,
      { requestId: req.requestId },
      { message: err.message }
  ])
  return res.status(status).json({
      status: status,
      code: status,
      // stack:error.stack,
      message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
