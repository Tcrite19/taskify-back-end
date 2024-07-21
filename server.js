require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/tasks");
const bookingRoutes = require("./routes/book");
const connectToDatabase = require("./connection");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
connectToDatabase();


app.use("/tasks", taskRoutes);
app.use("/book", bookingRoutes);


// 404 error handler
app.use((req, res) => {
  res.status(404).send("Not found");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
