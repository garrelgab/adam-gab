const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const qrcode = require('qrcode');
const moment = require('moment');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const port = process.env.PORT || 5050;
const apiUrl = process.env.PUBLIC_URL;
const mysql = require('mysql');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', // this is the default username for XAMPP
//   password: '', // this is the default password for XAMPP
//   database: 'db_adamfitness', // replace with the name of your database
// });
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'u994941609_root', // this is the default username for XAMPP
//   password: 'Password1', // this is the default password for XAMPP
//   database: 'u994941609_db_adamfitness', // replace with the name of your database
// });
const connection = mysql.createPool({
  host: 'srv608.hstgr.io',
  user: 'u994941609_root', // this is the default username for XAMPP
  password: '8U5oGzb!B', // this is the default password for XAMPP
  database: 'u994941609_db_adamfitness', // replace with the name of your database
});

// connection.connect(function(err) {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database!');
// });

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))