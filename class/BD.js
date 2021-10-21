var mysql      = require('mysql');
  const dataBaseConnect = () =>{
    var connection = mysql.createConnection({
      host     : '162.241.2.146',
      user     : 'anunci87_feedbuy',
      password : '1.~;nMTj{AW]a;f(JN'
    });

    connection.connect();
  }


  const executeQuery = async(query) => {
    connection.query(query, function(err, rows, fields) {
      if (err) throw err;
      console.log('The solution is: ', rows[0].solution);
      Promise.resolve(rows);
    });

  const closeConection = () => {
    connection.end();
  }
}
