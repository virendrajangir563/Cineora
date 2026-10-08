const express = require("express");
const cors =require("cors");
require("dotenv").config();

const app = express();
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")

app.use (cors());

app.use(express.json());

connectDB();
app.use("/api/auth", authRoutes);
app.get("/" ,(req,res) =>{
    res.json({
        message:"cineora appliction backend "
    });
});


const PORT= process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`Server runing on port ${PORT}`)
});

