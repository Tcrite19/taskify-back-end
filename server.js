require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/tasks");
// const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const methodOverride = require('method-override');
const connectToDatabase = require("./connection");
const usersRouter = require('./controllers/users');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;



app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
connectToDatabase();


app.use('/users', usersRouter);
// app.use('/auth', authRoutes);
app.use('/services', serviceRoutes);
app.use('/booking', bookingRoutes);
app.use('/tasks', taskRoutes);
app.use('/reviews', reviewRoutes);
// app.use('/payment', paymentRoutes);
app.use(methodOverride('_method'));



// 404 error handler
app.use((req, res) => {
  res.status(404).send("Not found");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
