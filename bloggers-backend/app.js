const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require("./db/connection");
const ROUTING = require("./utils/constants");

const cookieParser = require('cookie-parser');

const authRouter = require("./routes/authRoutes");
const blogRouter = require("./routes/blogRoutes");


app.use(cors({
    origin:["http://localhost:3000"],
    method:["GET","POST","DELETE","PUT"],
    credentials:true
}));

app.use(express.json());

app.use(cookieParser());

app.use(ROUTING.ROUTE_PATH.AUTH, authRouter);

app.use(ROUTING.ROUTE_PATH.BLOG, blogRouter);


const port = 8000;

var connectionString = `mongodb+srv://harshchopra467:R3ewI1qnxhHUiuFr@cluster0.7cmvxli.mongodb.net/BlogDB?retryWrites=true&w=majority`

const start = async() => {
    try {
        await connectDB(connectionString)
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        })
    }catch(err) {
        console.log(err);
    } 
}

start();
