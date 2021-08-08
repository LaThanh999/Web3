const knex = require('knex')({
    client: 'mysql2',
    // connection: {
    //   host : '127.0.0.1',
    //   port:3306,
    //   user : 'ThanhLa',
    //   password : '12344321',
    //   database : 'web3'
    // },
    connection: {
      host : 'remotemysql.com',
      port:3306,
      user : '7RUL5mJwS4',
      password : 'Hezdm9Qh8A',
      database : '7RUL5mJwS4'
    },
    pool: { min: 0, max: 50 }
  });

module.exports=knex;