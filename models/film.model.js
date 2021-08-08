const db=require('../utils/db');

module.exports={
    getAll(){
        return db('film')
    },
    getAlll(){
        return db('film')
    }
}