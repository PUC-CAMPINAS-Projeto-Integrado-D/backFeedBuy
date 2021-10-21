async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://anunci87_feedbuy:1.~;nMTj{AW]a;f(JN@162.241.2.146:3306/anunci87_feedbuy");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}
