var express = require('express');
var parser= require('body-parser');
var mongoose = require('mongoose');
var app = express();
app.use(parser.urlencoded({extended:false}));
const productSchema = new mongoose.Schema({
pname:String,
discription:String,
price:Number,
distributer:String,
quantity:Number,
pcode:Number
});
const pmodel = mongoose.model('products',productSchema);
mongoose.connect("");
app.get('/',(req,res)=>{
    res.send('hai user');
});
app.post('/product',async(req,res)=>{
    try {
        var data=new pmodel(req.body);
        var result= await data.save();
        res.json(result);
    } 
    catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
});
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server Started");
});