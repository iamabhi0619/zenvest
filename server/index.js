require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./routes/user");
const connectDB = require("./utils/DbConnection");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();


app.use("/api/event", userRoutes);


app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
