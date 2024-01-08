const express = require("express");
const mongoose = require("mongoose");
const router = express.Router()


const jwt = require("jsonwebtoken");
const requireLogin = require("../middleWares/requireLogin");


const PRODUCT = mongoose.model("PRODUCT")


router.post('/createPost',requireLogin ,  (req,res) => {
    const {title , desc , price , pic} = req.body;
    if(!title || !desc || !price ||!pic){
        console.log(title,desc,price,pic)
        return res.status(422).json({error : "Please add all the fields"})
    }

    console.log(req.merchant)
    // return res.json(req.merchant)


    const product = new PRODUCT({
        title,
        desc,
        price,
        pic:pic,
        postedBy: req.merchant
    })

    product.save().then((result) => {
        return res.json({product : result})

    }).catch( err => console.log(err))
    // res.json('Item added')
})




router.get("/myposts",requireLogin , (req,res) => {
    // console.log(req.merchant._id)
    PRODUCT.find({postedBy : req.merchant._id})
    .populate("postedBy" , "_id name")
    .then(myposts => {
        res.json(myposts)
    })
})



router.delete("/deleteProduct/:productid" , async(req , res) => {
    const porductId = req.params.productid;

    PRODUCT.findOne({_id : req.params.productid}).populate("_id")
    .then((product) => {
        product.deleteOne().then(result => {
            return res.json({message : "Product Deleted"})
        })
        .catch((err) => {
            console.log("error")
        })
    })
})



router.get("/deleteProduct" ,(req , res) => {
    const porductId = 23123213;

    console.log(porductId)
    return res.json(porductId)

    
})













module.exports = router;