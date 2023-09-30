
const express = require('express');

const path = require('path');
const port = 2323;
const db=require('./config/mongoose');
const Admin=require('./models/form');
const Truck=require('./models/trucks');
const { isBuffer } = require('util');
const app = express();
//session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const flash = require('connect-flash');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
// app.use('/minorvishal/assets', express.static(path.join(__dirname, 'minorvishal/assets')));
// jayesh

app.use(session({
  name: 'human',
  secret: 'None',
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: (1000)
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes'));



//jayesh above


var adminList = [
    {
        name: "vishal",
        mobile: "7070434171"
    }
]

app.get('/', function(req, res){
    
  return res.render('home2',{
      title: "Home",
      admin_list: adminList
  });
})

app.get('/pickup_form', function(req, res){
  // Render the pickup_form page
  res.render('pickup_form', {
    title: "Plan Your Pickup"
  });
});
app.get('/admin', async function(req, res) {
  try {
    // Retrieve all admin data from the MongoDB database
    const adminData = await Admin.find({});

    // Render the admin page and pass the retrieved data
    res.render('admin', {
      title: 'Admin Dashboard',
      admin_list: adminData // Pass the retrieved data to the view
    });
  } catch (err) {
    console.error('Error in retrieving admin data:', err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/home', function(req, res){
  return res.render('home2', {
    title: "Home",
    admin_list: adminList
  });
});



// Handle form submission from pickup_form page
app.post('/create-admin', async function(req, res) {
  try {
    
    const adminList = await Admin.create({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      district: req.body.district,
      locality: req.body.locality,
      pincode: req.body.pincode,
      estimatedweight: req.body.estimatedweight,
      garbagetype: req.body.garbagetype,
      preferreddate: req.body.preferreddate,
      preferredtime: req.body.preferredtime,
      suggestion: req.body.suggestion,
    });
    console.log('******', adminList);

    // Redirect back to the home page after form submission
    res.render('home2');
  } catch (err) {
    console.error('Error in creating a contact:', err);
    res.status(500).send('Internal Server Error');
  }
});

// truck ke liye


var trucklist=[
  { 
      truckname:"UP 14 AC 1417",
      truckcapacity:"100",
      associateduser:"vishal"
  }


]

app.get('/assign-truck', async function (request, response) {
  try {
    // Retrieve all truck data from the MongoDB database
    const truckData = await Truck.find({});

    // Render the assign-truck page and pass the retrieved data
    response.render('assign-truck', {
      title: 'Assign Truck',
      truck_list: truckData, // Pass the retrieved data to the view
    });
  } catch (err) {
    console.error('Error in retrieving truck data:', err);
    response.status(500).send('Internal Server Error');
  }
});



app.post('/create-truck', async function (request, response) {
  try {
    const { truckname, truckcapacity, associateduser } = request.body;

    // Create a new truck record with the provided data
    const newTruck = await Truck.create({
      truckname,
      truckcapacity,
      associateduser,
    });

    // Redirect back to the assign-truck page after creating the truck record
    response.redirect('/assign-truck');
  } catch (err) {
    console.error('Error in creating a truck record:', err);
    response.status(500).send('Internal Server Error');
  }
});



app.get('/delete-contact', async function (request, response) {
  try {
    // Get the truckname from the query parameter
    const truckname = request.query.truckname;

    // Find and delete the truck record from MongoDB
    await Truck.deleteOne({ truckname });

    // Redirect back to the assign-truck page after deleting the truck record
    response.redirect('/assign-truck');
  } catch (err) {
    console.error('Error in deleting a truck record:', err);
    response.status(500).send('Internal Server Error');
  }
});




// truck ke liye above


      app.listen(port, async function(err) {
        if (err) {
          console.log("Error in running the server", err);
        }
        console.log('Yup! My Server is running on Port', port);
      });
      
