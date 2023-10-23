const express = require('express');
require('dotenv').config();
require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Init app
const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(express.json()); // {"name": "John Doe", "age": 45}
app.use(express.urlencoded({ extended: false })); // name=JhonDoe&age=45
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
