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
mongoose.connect("mongodb+srv://dbuser:ava1996@cluster0-pvjxp.mongodb.net/test?retryWrites=true&w=majority");
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
app.post('/view',async(req,res)=>{
    try {
        var ress=await pmodel.find();
        res.send(ress);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
app.post('/search',async(req,res)=>{
    try {
        pmodel.find(req.body,(error,datas)=>{
            if(error){
                throw error;
            }
                else{
                    res.send(datas);
                }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
app.post('/search by pcode',async(req,res)=>{
    try {
        var searchkey = req.body.mydata;
        pmodel.find({"pcode":searchkey},(error,datas)=>{
            if(error){
                throw error;
            }
                else{
                    res.send(datas);
                }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
});
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server Started");
});