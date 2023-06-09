// const mysql = require('mysql')
// const bodyParser = require('body-parser')
// const express = require('express')

// const app = express();
// const port = process.env.PORT || 3306

// app.use(bodyParser.urlencoded({ extended: false}))
// app.use(bodyParser.json())

// app.listen(port, () => console.log('Listen on port ${port}'))

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', // this is the default username for XAMPP
//   password: '', // this is the default password for XAMPP
//   database: 'db_adamfitness', // replace with the name of your database
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to database!');
// });

// module.exports = connection;