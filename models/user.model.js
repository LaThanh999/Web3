const db=require('../utils/db');

module.exports={
    getAll(){
        return db('users')
    },
    async getFindById(id){
        const result= await db('users').where({id:id});
        if(!result){
            return null;
        }
        return  result[0];
    },
    add(user){
        return  db('users').insert(user);
    },
    remove(id){
        return  db('users').where('id',id).del();
    },
    update(id,user){
        return db('users').where('id',id).update(user);
    }
}