const mongoose = require("mongoose");
const MERCHANT= mongoose.model("MERCHANT")
const {ObjectId} = mongoose.Schema.Types

const productSchema = new mongoose.Schema({
    title : {
        type:String,
        require:true
    },
    desc:{
        type: String,
        require:true
    },
    price:{
        type: Number,
        require:true
    },
    pic : {
        type:String,
        require : true,
        // default : "no photo"
    },
    postedBy:{
        type: ObjectId,
        ref : "MERCHANT"
    }
    
})

mongoose.model("PRODUCT" , productSchema)