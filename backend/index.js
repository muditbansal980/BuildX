require("dotenv").config();
const express = require('express');
const app = express();
const { clerkMiddleware } = require("@clerk/express");
const userRouter = require("./routes/user") 
const adminRouter = require("./routes/admin") 
const eventRouter = require("./routes/event")
const http = require("http")
const server = http.createServer(app);
const cors = require('cors');
 
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/role",userRouter)
app.use("/admin",adminRouter)
app.use("/events",eventRouter)

server.listen(4009, () => {
    console.log(`Server is running on http://localhost:4009`);
});