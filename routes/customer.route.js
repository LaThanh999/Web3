const express=require('express')
const router=express.Router();
const customerModel=require('../models/customer.model');
const validate= require("../middlewares/validate.mdw");
const schema=require("../schemas/customer.json");

router.get('/',async (req, res) => {
    const result = await customerModel.getAll();
    res.json(result);
});  
router.get('/:id',async (req, res) => {
    const id = +req.params.id || 0;
    if(id === 0){
        return  res.json({Message: "Please check input"});
    }
    const result = await customerModel.getFindById(id);
    if(!result){
      return  res.json({Message: "Can't not find customer"});
    }
    res.json(result);
});
router.post('/',validate(schema), async (req, res) => {
    const customer = req.body;
    const result = await customerModel.add(customer);
    customer.customer_id=result;
    res.status(201).json(customer);
});
router.delete('/:id',async (req, res) => {
    const id = +req.params.id || 0;
    if(id === 0){
        return  res.json({Message: "Please check input"});
    }
    const result = await customerModel.remove(id);
    if(result>0){
        res.json({Message: "Remove customer successfully"});
    }
    else{
        return  res.json({Message: "Please check input"});
    }
});
router.put('/:id',validate(schema),async (req, res) => {
    const id = +req.params.id;
    const customer = req.body;
    const result = await customerModel.update(id,customer);
    if(result === 0){
        return  res.status(304).end();
    }
    res.json(customer);
});   

module.exports=router;
