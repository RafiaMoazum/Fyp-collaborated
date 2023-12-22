
const dotenv= require('dotenv');
require('dotenv').config();
const express= require('express');
const mongoose= require('mongoose');
const cors = require('cors');
const app= express();
const path = require('path');

// Allow requests from your frontend's domain
app.use(cors({
    origin: 'http://http://localhost:3000',
  }));
  
  // ... other server setup ...
  
  app.listen(() => {
    console.log('Server is running on port 8000');
  });


dotenv.config({ path: './config.env'});
require('./db/connection');
//const Manager=require('./model/managerSchema');
app.use(express.json());  //convert json data into object
app.use(require('./router/auth'));
app.use(require('./router/hostelRoute'));
app.use(require('./router/addRoomRoute'));
app.use(require('./router/hostelsPageRoute'));
app.use(require('./router/hostelProfileRoute'));
app.use(require('./router/userAuth'));
app.use(require('./router/displayHostelsRoute'))
app.use(require('./router/roomDetailRoute'))
app.use(require('./router/roomBookingRoute'))
app.use(require('./router/bookingsInfoRoute'))
app.use(require('./router/reviewsRoute'))
app.use(require('./router/searchRoute'))
app.use(require('./router/notificationRoute'))
app.use('/public', express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));



const PORT= process.env.PORT;





app.listen(PORT, () =>{
    console.log(`Running at port ${PORT}`);
})