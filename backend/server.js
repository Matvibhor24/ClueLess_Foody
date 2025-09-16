const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const authCheck = require("./middleware/authCheck")
require("dotenv").config()

const UserRoutes = require("./routes/UserRoutes")

const app = express()
app.use(express.json());   // to parse json data
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // if using cookies/auth
}));

app.use("/api/user",UserRoutes);

mongoose.connect(process.env.MONGO)
.then(() => {
    app.listen(process.env.PORT);
    console.log("Listnening on port : ",process.env.PORT )
})
.catch((err) => {
    console.log(err);
})


