const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true});

module.exports= function(schema){
    return function validate(req,res,next){
        const validate = ajv.compile(schema)
        const valid = validate(req.body);
        if (!valid) {
            return res.status(400).json(
                validate.errors
            )
        }
        next();
    }
}