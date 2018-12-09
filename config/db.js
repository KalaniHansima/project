// var mysql = require('mysql')
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '946070947',
//   database : 'docspace'
//   //secret : 'yoursecret'y
// });

// // connection.connect(function(err) {
// //   if (err) throw err;
// //   connection.query("SELECT * FROM user_roll", function (err, result, fields){
// //     if (err) throw err;
// //     // console.log(result);
// //   });
// //   console.log("Connected!");
// // });
// connection.connect(); 

// module.exports = connection;


module.exports = {
  database: 'mongodb://localhost:27017/myFirst',    
  secret: 'yoursecret'
}