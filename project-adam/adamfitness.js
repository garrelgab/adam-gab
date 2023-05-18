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

// app.use(cors());

app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))


// app.use(session({
//   key: 'account_id',
//   secret: 'hey',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     expires: 60 * 60
//   }
// }));

app.get('/', (req, res)=>{
  res.send(`Server running on Port: ${port}`);
});

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

// app.get("/api/login", (req, res) => {
//   if(req.session.user) {
//     res.send({loggedIn: true, user: req.session.user})
//   }
//   else{
//     res.send({loggedIn: false})
//   }
// });

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

app.put('/api/customer-info', (req, res) => {
  const customerFname = req.body.customerFname;
  const customerLname = req.body.customerLname;
  const customerID = req.body.customerID;
  const updateInfo = "update tbl_account_info set fname = ?, lname = ? where account_info_id = ?";
  connection.query(updateInfo, [customerFname, customerLname, customerID], (err, result) => {
    if (err) {
      console.log("Error updating personal information:", err);
    } else {
      res.send("Personal Information Updated Successfully!");
    }
  });
});

app.get('/api/get-info', (req, res) => {
  const customerID = req.query.customerID;
  const getCustomerInfo = "select fname, lname from tbl_account_info where account_info_id = ?";
  connection.query(getCustomerInfo, [customerID], (err, result) => {
    if (err) {
      console.log("Error fetching personal information:", err);
    } else {
      res.send(result);
    }
  })
});

app.put('/api/customer-pass', (req, res) => {
  const customerPword = req.body.customerPword;
  const customerCPword = req.body.customerCPword;
  const customerID = req.body.customerID;
  const updatePass = "update tbl_account_info set pword = ?, cpword = ? where account_info_id = ?";
  connection.query(updatePass, [customerPword, customerCPword, customerID], (err, result) => {
    if (err) {
      console.log("Error updating password:", err);
    } else {
      res.send(result);
      console.log(customerID);
    }
  });
});

//FAQ Section
app.post('/api/add-faq', (req, res) => {
  const addFaq = req.body.addFaq;
  const addDescription = req.body.addDescription;
  const addStatus = req.body.addStatus;
  const insertFaq = "insert into tbl_faq (name, description, status) values (?, ?, ?)";
  connection.query(insertFaq, [addFaq, addDescription, addStatus], (err, result) => {
    if(err) {
      console.log("Failed to insert FAQ's", err);
    }
    else{
      res.send(result);
    }
  });
});

app.get('/api/option-faq', (req, res) => {
  const optionFaq = "select faq_id, name from tbl_faq";
  connection.query(optionFaq, (err, results) => {
    if(err) {
      console.log("Failed to get option", err);
    }
    else{
      const formattedOptions = results.map((options) => ({
        value: options.faq_id,
        label: options.name,
      }));
      res.json(formattedOptions);
    }
  });
});

app.get('/api/desc-faq', (req, res) => {
  const descFaqID = req.query.descFaqID;
  const descFaq = "select description from tbl_faq where faq_id = ?";
  connection.query(descFaq, [descFaqID], (err, result) => {
    if(err){
      console.log("Failed to get description", err);
    }
    else{
      res.send(result);
    }
  });
});

app.put('/api/update-desc-faq', (req, res) => {
  const FaqDescription = req.body.FaqDescription;
  const FaqID = req.body.FaqID;
  const updateFaqDesc = "update tbl_faq set description = ? where faq_id = ?";
  connection.query(updateFaqDesc, [FaqDescription, FaqID], (err, result) => {
    if(err){
      console.log("Failed to update description", err);
    }
    else{
      res.send(result);
    }
  });
});

//Privacy Policy Section
app.post('/api/add-privacy', (req, res) => {
  const addPrivacy = req.body.addPrivacy;
  const addDescription = req.body.addDescription;
  const addStatus = req.body.addStatus;
  const insertPrivacy = "insert into tbl_privacy (name, description, status) values (?, ?, ?)";
  connection.query(insertPrivacy, [addPrivacy, addDescription, addStatus], (err, result) => {
    if(err) {
      console.log("Failed to insert privacy policy", err);
    }
    else{
      res.send(result);
    }
  });
});

app.get('/api/option-privacy', (req, res) => {
  const optionPrivacy = "select privacy_id, name from tbl_privacy";
  connection.query(optionPrivacy, (err, results) => {
    if(err) {
      console.log("Failed to get option", err);
    }
    else{
      const formattedOptions = results.map((options) => ({
        value: options.privacy_id,
        label: options.name,
      }));
      res.json(formattedOptions);
    }
  });
});

app.get('/api/desc-privacy', (req, res) => {
  const descPrivacyID = req.query.descPrivacyID;
  const descPrivacy = "select description from tbl_privacy where privacy_id = ?";
  connection.query(descPrivacy, [descPrivacyID], (err, result) => {
    if(err){
      console.log("Failed to get description", err);
    }
    else{
      res.send(result);
    }
  });
});

app.put('/api/update-desc-privacy', (req, res) => {
  const PrivacyDescription = req.body.PrivacyDescription;
  const PrivacyID = req.body.PrivacyID;
  const updatePrivacyDesc = "update tbl_privacy set description = ? where privacy_id = ?";
  connection.query(updatePrivacyDesc, [PrivacyDescription, PrivacyID], (err, result) => {
    if(err){
      console.log("Failed to update description", err);
    }
    else{
      res.send(result);
    }
  });
});

//Terms and Condition Section
app.post('/api/add-terms', (req, res) => {
  const addTerms = req.body.addTerms;
  const addDescription = req.body.addDescription;
  const addStatus = req.body.addStatus;
  const insertTerms = "insert into tbl_terms (name, description, status) values (?, ?, ?)";
  connection.query(insertTerms, [addTerms, addDescription, addStatus], (err, result) => {
    if(err) {
      console.log("Failed to insert FAQ's", err);
    }
    else{
      res.send(result);
    }
  });
});

app.get('/api/option-terms', (req, res) => {
  const optionTerms = "select terms_id, name from tbl_terms";
  connection.query(optionTerms, (err, results) => {
    if(err) {
      console.log("Failed to get option", err);
    }
    else{
      const formattedOptions = results.map((options) => ({
        value: options.terms_id,
        label: options.name,
      }));
      res.json(formattedOptions);
    }
  });
});

app.get('/api/desc-terms', (req, res) => {
  const descTermsID = req.query.descTermsID;
  const descTerms = "select description from tbl_terms where terms_id = ?";
  connection.query(descTerms, [descTermsID], (err, result) => {
    if(err){
      console.log("Failed to get description", err);
    }
    else{
      res.send(result);
    }
  });
});

app.put('/api/update-desc-terms', (req, res) => {
  const TermsDescription = req.body.TermsDescription;
  const TermsID = req.body.TermsID;
  const updateTermsDesc = "update tbl_terms set description = ? where terms_id = ?";
  connection.query(updateTermsDesc, [TermsDescription, TermsID], (err, result) => {
    if(err){
      console.log("Failed to update description", err);
    }
    else{
      res.send(result);
    }
  });
});

//About Us (Gym Info) Section
app.post('/api/add-about', (req, res) => {
  const addAbout = req.body.addAbout;
  const addDescription = req.body.addDescription;
  const addStatus = req.body.addStatus;
  const insertAbout = "insert into tbl_about (name, description, status) values (?, ?, ?)";
  connection.query(insertAbout, [addAbout, addDescription, addStatus], (err, result) => {
    if(err) {
      console.log("Failed to insert About Us", err);
    }
    else{
      res.send(result);
    }
  });
});

app.get('/api/option-about', (req, res) => {
  const optionAbout = "select about_id, name from tbl_about";
  connection.query(optionAbout, (err, results) => {
    if(err) {
      console.log("Failed to get option", err);
    }
    else{
      const formattedOptions = results.map((options) => ({
        value: options.about_id,
        label: options.name,
      }));
      res.json(formattedOptions);
    }
  });
});

app.get('/api/desc-about', (req, res) => {
  const descAboutID = req.query.descAboutID;
  const descAbout = "select description from tbl_about where about_id = ?";
  connection.query(descAbout, [descAboutID], (err, result) => {
    if(err){
      console.log("Failed to get description", err);
    }
    else{
      res.send(result);
    }
  });
});

app.put('/api/update-desc-about', (req, res) => {
  const AboutDescription = req.body.AboutDescription;
  const AboutID = req.body.AboutID;
  const updateAboutDesc = "update tbl_about set description = ? where about_id = ?";
  connection.query(updateAboutDesc, [AboutDescription, AboutID], (err, result) => {
    if(err){
      console.log("Failed to update description", err);
    }
    else{
      res.send(result);
    }
  });
});
module.exports = connection;