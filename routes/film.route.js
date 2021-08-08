const express=require('express')
const router=express.Router();
const filmModel=require('../models/film.model');

router.get('/',async (req, res) => {
    const rows = await filmModel.getAll();
    res.json(rows);
  })  

module.exports=router;
