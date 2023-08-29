const express = require("express")
const morgan = require("morgan")
const colors = require("colors")
const dotenv = require("dotenv");
const DbConnection = require("./config/db");
const path = require("path")

//dotenv config
dotenv.config();

//mongodb connection
DbConnection();

//rest objects
const app = express();

//const middleware

app.use(express.json());
app.use(morgan('dev'))

// user routes
app.use('/api/v1/user', require('./routes/userRoutes'))

//admin routes

app.use("/api/v1/admin", require('./routes/AdminRoutes'))

//doctor routes
app.use("/api/v1/doctor", require('./routes/DoctorRoutes'))

//for static path
app.use(express.static(path.join(__dirname, "./client/build")))
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

const port = process.env.PORT || 8080
app.listen(port, (req, res) => {
    console.log(`server is running`);
})