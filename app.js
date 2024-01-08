const express = require("express")
const cors = require("cors")
const path = require('path')


const app = express();
const port = 5000;




app.use(cors())
require('./models/user')
require('./models/merchant')
require('./models/products')



app.use(express.json())
app.use(require("./routes/auth"))
app.use(require('./routes/CreateMer'))


app.listen(port , () => {
    console.log("Server is ruuning on " + port)
})

// ----------------------------------------------------------------------


const mongoose = require("mongoose");
const {mongoUrl} = require("./keys");

mongoose.connect(mongoUrl);

mongoose.connection.on("connected" , () => {
    console.log("Connected to MongoDB")
})

mongoose.connection.on("error" , () => {
    console.log("Not Connected to mongDB")
}) 




// app.get('/' , (req,res)=> {
//     console.log("Hello")
//     res.json("Hello shubh")

// })