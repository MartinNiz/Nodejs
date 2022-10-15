const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes-db-app', {
  family: 4 // Use IPv4, skip trying IPv6
})
.then(db => console.log('DB is conected'))
.catch(err => console.log(err));
