const mysql = require('mysql');
let connection = null;

async function connect(){

    connection = mysql.createConnection({
      host     : '162.241.2.146',
      user     : 'anunci87_feedbuy',
      password : '1.~;nMTj{AW]a;f(JN',
      database: 'anunci87_feedbuy',
    });
    connection.connect();
    return;
}

function query(query, binds, callback = (rows, fields) => {}){
    return new Promise((resolve, reject)=>{
        connection.query(query, binds, async (err, rows, fields) => {
            if (err) return reject(err);

            callback(rows, fields);
            return resolve({rows, fields});
        });
    })
}

async function disconnect(){
    if(connection === null) return;

    connection.end();
}

connect();

module.exports = {
    query
}
