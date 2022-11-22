require("dotenv").config();

const express = require("express");
const app = express();

//middleware
app.use(express.json());
app.use(express.static("./public"));
// app.use(express.urlencoded({ extended: false }));

const tasks = require("./routes/tasks");
app.use("/api/v1/tasks", tasks);

//errors middleware
const notFound = require("./middleware/not-found");
app.use(notFound);
app.use((err, req, res, next) => {
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
});

//connect db and start server
const connectDB = require("./db/connet");
const port = process.env.PORT || 5000;
//self invoke func
const start = (async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server is listening at " + port);
    });
  } catch (error) {
    console.log(error.message);
  }
})();
