require("dotenv").config();
//async errors

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send(
    "<h1>App is running</h1><a href='/api/v1/products'> Product - api/v1/products </a>"
  );
});
app.use("/api/v1/products", productsRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 4000;
//sercer start
const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Sever is listening at ${port}...`));
  } catch (error) {
    console.log("Error", error);
  }
};
start();
