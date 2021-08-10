const express=require('express')
const router=express.Router();
const bcrypt=require("bcryptjs")
const validate= require("../middlewares/validate.mdw");
const schema=require("../schemas/login.json");
const _=require('lodash');
const jwt=require('jsonwebtoken');
const randomString=require('randomstring');
const userModel=require("../models/user.model");
const constants=require("../constants")


router.post('/',validate(schema), async (req, res) => {
    const {username, password} = req.body;
    const user=await userModel.getFindByUsername(username);
    if(_.isEmpty(user)) {
        return res.status(401).json({
            Authorization:false
        })
    }
    if(!bcrypt.hashSync(password,user.password)) {
        return res.status(401).json({
            Authorization:false
        })
    }

    const payload={
        userId:user.id      
    }

    const opts={
        expiresIn:60
    }

    const accessToken=jwt.sign(payload,constants["SECRET_KEY"] ,opts);

    const refreshToken = randomString.generate(80);
    await userModel.update(user.id,{rfToken:refreshToken});

    res.json({
        Authorization:true,
        accessToken,
        refreshToken
    });
});

router.post('/refreshToken',validate(require("../schemas/refreshToken.json")), async (req, res)=>{
    const {accessToken,refreshToken} = req.body;
    try {
        const {userId} = jwt.verify(accessToken, constants["SECRET_KEY"] ,{ignoreExpiration:true});
        const result= await userModel.isValidRefreshToken(userId,refreshToken)
        if(result){
            const payload={
                userId        
            }       
            const opts={
                expiresIn:60
            }
        
            const newAccessToken=jwt.sign(payload,constants["SECRET_KEY"] ,opts);
            
            return res.json({
                accessToken : newAccessToken
            });           
        }
        return res.status(401).json({
            Message: "Invalid refresh Token"
        })
      } catch(err) {
        return  res.status(401).json({Message: "Invalid accessToken"});
      }
});

module.exports=router;
