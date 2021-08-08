const express=require('express')
const router=express.Router();
const bcrypt=require("bcryptjs")
const userModel=require('../models/user.model');
const validate= require("../middlewares/validate.mdw");
const schema=require("../schemas/user.json");


router.post('/',validate(schema), async (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password,10);
    const result = await userModel.add(user);
    user.id=result[0];
    res.status(201).json(user);
}); 

module.exports=router;
