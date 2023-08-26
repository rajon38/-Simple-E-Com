//Basic lib import
const express = require('express');
const app = new express();
const bodyParser =require('body-parser');
const morgan = require("morgan");

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Security middleware lib import
const rateLimit =require('express-rate-limit');
const mongoSanitize =require('express-mongo-sanitize');
const helmet =require('helmet');
const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');
app.use(express.json());

//Database lib import
const mongoose = require('mongoose');
app.use(mongoSanitize());
const {readdirSync} = require("fs");
const path = require("path");

//Security middleware implement
app.use(morgan("dev"));
app.use(cors())
app.use(helmet())
app.use(xss())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//Body Parser Implement
app.use(bodyParser.json());

// Request Rate Limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3000,
    keyGenerator: (req) => {
        // Extract IP address from the X-Forwarded-For header safely
        const forwardedFor = req.headers['x-forwarded-for'];
        const ipArray = forwardedFor ? forwardedFor.split(/\s*,\s*/) : [];
        const ipAddress = ipArray.length > 0 ? ipArray[0] : req.connection.remoteAddress;
        return ipAddress;
    }
});
app.use(limiter)

// Enable trust proxy to correctly identify client IP behind proxies
app.set('trust proxy', true);

//mongoDB Database Connection
let URI="mongodb+srv://<username>:<password>@cluster0.aw6azwi.mongodb.net/ostad-com?retryWrites=true&w=majority";
let OPTION={user:'rashedul',pass:'170174Rajon',autoIndex:true}
mongoose
    .set('strictQuery',true)
    .connect(URI,OPTION)
    .then(()=>{
        console.log('Connected to DB')
    })
    .catch((err)=>{
        console.log(err.message)
    });

//Routing Implement
readdirSync("./src/routes").map(r=>app.use("/api/v1", require(`./src/routes/${r}`)));



// Add React Front End Routing
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all route to serve the frontend's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
})


module.exports = app;