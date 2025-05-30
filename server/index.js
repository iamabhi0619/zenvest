require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./routes/user");
const utilityRoutes = require("./routes/utility");
const connectDB = require("./utils/DbConnection");
const { generateTicket } = require("./utils/Ticket");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/event", userRoutes);
app.use("/api/util", utilityRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the Event API!");
});

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
