const mysql = require('mysql');

class MySQL {

    constructor() {
        this.connection = null;
        this.connection = mysql.createConnection({
            host     : '162.241.2.146',
            user     : 'anunci87_feedbuy',
            password : '1.~;nMTj{AW]a;f(JN',
            database: 'anunci87_feedbuy',
        });
        return this;
    }

    connect(){
        return new Promise((resolve, reject)=>{
            this.connection.connect({}, ()=>{
                resolve();
            });
        });
    }

    query(query, binds, callback = (rows, fields) => {}){
        return new Promise((resolve, reject)=>{
            this.connection.query(query, binds, async (err, rows, fields) => {
                if (err) return reject(err);

                callback(rows, fields);
                return resolve({rows, fields});
            });
        })
    }

    disconnect(){
        if(this.connection === null || this.connection === undefined) return;
        this.connection.end();
    }
}

module.exports = MySQL
