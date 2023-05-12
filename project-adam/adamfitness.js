const mysql = require('mysql')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
// const moment = require('moment')
const app = express();
const port = process.env.PORT || 3001

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root', // this is the default username for XAMPP
    password: '', // this is the default password for XAMPP
    database: 'db_adamfitness', // replace with the name of your database
  });

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT"],
  credentials: true,
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}))


app.use(session({
  key: 'account_id',
  secret: 'hey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60
  }
}))

app.get('/', (req, res)=>{
  res.send(`Server running on Port: ${port}`);
})

app.post("/api/insert", (req, res) => {
  
  const userFname = req.body.userFname
  const userLname = req.body.userLname
  const userAge = req.body.userAge
  const userGender = req.body.userGender
  const userBday = req.body.userBday
  const userEmail = req.body.userEmail
  const userPword = req.body.userPword
  const userCPword = req.body.userCPword
  const userRole = req.body.userRole
  const sqlInsert = "insert into tbl_account_info (fname, lname, age, gender, bday, email, pword, cpword, role) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(sqlInsert, [userFname, userLname, userAge, userGender, userBday, userEmail, userPword, userCPword, userRole], (err, result) => {
    console.log(result);
  });

  const sqlAccount = "insert into tbl_accounts (email, password, role) value (?, ?, ?)";
  connection.query(sqlAccount, [userEmail, userPword, userRole], (err, result) => {
    console.log(result);
  });
});

app.post("/api/login", (req, res) => {
  const userEmail = req.body.userEmail
  const userPword = req.body.userPword
  connection.query(
    "select * from tbl_account_info where email = ? and pword = ?",
    [userEmail, userPword],
    (err, result) => {
      if (err) {
        res.send({err: err})
      }
      if(result.length > 0) {
        //req.session.user = result
        res.send(result);
        //res.send({ message: 'Login successfully.'});
        
      } else {
        res.send({ message: 'Incorrect username/password.'});
        
      }
      return(()=>{

      });
    }
    
  );
});

app.get("/api/members", (req, res) => {
  // const members = "select * from tbl_account_info where role = 'customer'";
  connection.query("select * from tbl_account_info where role = 'customer'", (err, result) => {
    if(err){
      res.send({err: err})
    }
    else{
      res.send(result);
    }
  })
});

app.get("/api/login", (req, res) => {
  if(req.session.user) {
    res.send({loggedIn: true, user: req.session.user})
  }
  else{
    res.send({loggedIn: false})
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post("/api/reservation", (req, res) => {
  const customerName = req.body.customerName;
  const customerStartTime = req.body.customerStartTime;
  const customerEndTime = req.body.customerEndTime;
  const customerDate = req.body.customerDate;
  const customerStatus = req.body.customerStatus;

  const sqlInsert = "insert into tbl_reservation (name, time_start, time_end, customer_date, status) values (?, ?, ?, STR_TO_DATE(?, '%m-%d-%Y'), ?)";
  connection.query(sqlInsert, [customerName, customerStartTime, customerEndTime, customerDate, customerStatus], (err, result) => {
    res.send(result);
  });
});

app.get("/api/events", (req, res) => {
  const fetchEvents = "select reservation_id, name, status, DATE_FORMAT(customer_date, '%M %d, %Y') as start, TIME_FORMAT(time_start, '%h:%i %p') as time_start_formatted, TIME_FORMAT(time_end, '%h:%i %p') as time_end_formatted from tbl_reservation";
  connection.query(fetchEvents, (err, result) => {
    if(err){
      console.log("Error fetching events:", err);
      res.send(err)
    }
    else{
      const events = result.map((event) => ({
        id: event.reservation_id,
        title: `${event.name} - ${event.status}`,
        start: `${event.start} ${event.time_start_formatted}`,
        end: `${event.start} ${event.time_end_formatted}`,
        backgroundColor: event.status === 'Pending' ? 'red' : 'green'
      }));
      res.json(events);
    }
  });
});

app.get("/api/events/approved", (req, res) => {
  const fetchEvents = "select reservation_id, name, status, DATE_FORMAT(customer_date, '%M %d, %Y') as start, TIME_FORMAT(time_start, '%h:%i %p') as time_start_formatted, TIME_FORMAT(time_end, '%h:%i %p') as time_end_formatted from tbl_reservation where status = 'Approved'";
  connection.query(fetchEvents, (err, result) => {
    if(err){
      console.log("Error fetching events:", err);
      res.send(err)
    }
    else{
      const events = result.map((event) => ({
        id: event.reservation_id,
        title: `${event.name} - ${event.status}`,
        start: `${event.start} ${event.time_start_formatted}`,
        end: `${event.start} ${event.time_end_formatted}`,
      }));
      res.json(events);
    }
  });
});

app.get("/api/events/pending", (req, res) => {
  const fetchEvents = "select reservation_id, name, status, DATE_FORMAT(customer_date, '%M %d, %Y') as start, TIME_FORMAT(time_start, '%h:%i %p') as time_start_formatted, TIME_FORMAT(time_end, '%h:%i %p') as time_end_formatted from tbl_reservation where status = 'Pending'";
  connection.query(fetchEvents, (err, result) => {
    if(err){
      console.log("Error fetching events:", err);
      res.send(err)
    }
    else{
      const events = result.map((event) => ({
        id: event.reservation_id,
        title: `${event.name} - ${event.status}`,
        start: `${event.start} ${event.time_start_formatted}`,
        end: `${event.start} ${event.time_end_formatted}`,
        
      }));
      res.json(events);
    }
  });
});

app.put('/api/approved', (req, res) => {
  const reservationID = req.body.id;
  const reservationStatus = req.body.status;
  const approvedReservation = "update tbl_reservation set status = ? where reservation_id = ?";
  connection.query(approvedReservation, [reservationStatus, reservationID], (err, result) => {
    if (err) {
      console.log("Error updating event:", err);
    } else {
      res.send("Event updated successfully");
    }
  });
});

app.get('/api/members-count', (req, res) => {
  const countMembers = "select count(account_info_id) as count from tbl_account_info where role = 'customer'";
  connection.query(countMembers, (err, result, fields) => {
    if(err) throw err;
    const count = result[0].count;
    res.send({count});
  });
});

app.get('/api/pending-count', (req, res) => {
  const countPending = "select count(reservation_id) as count from tbl_reservation where status = 'Pending'";
  connection.query(countPending, (err, result, fields) => {
    if(err) throw err;
    const count = result[0].count;
    res.send({count});
  });
});

app.get('/api/event-count', (req, res) => {
  const countEvent = "select count(reservation_id) as count from tbl_reservation";
  connection.query(countEvent, (err, result, fields) => {
    if(err) throw err;
    const count = result[0].count;
    res.send({count});
  });
});

module.exports = connection;