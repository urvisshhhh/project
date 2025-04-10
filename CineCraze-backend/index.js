require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cinemaRoutes = require('./routes/cinemaRoutes');
const movieRoutes = require("./routes/movieRoutes");  // ✅ Import movie routes



const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/cinemas", cinemaRoutes);


app.use("/api/movies", movieRoutes);  // ✅ Add movie routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
