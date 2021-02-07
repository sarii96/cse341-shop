const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const PORT = process.env.PORT || 5000

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URL = 'mongodb+srv://sarii96:Patricia96@cluster0.q3479.mongodb.net/shop?';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const autheRoutes = require('./routes/authe');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'my secret', resave: false, saveUninitialized: false, store: store}));

app.use((req, res, next)=>{
  if(!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
        .then(user => {
          req.user = User;
          next();
        })
        .catch(err => console.log(err));
})
//601dace927ee6e18bc4f766e
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(autheRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    MONGODB_URL
  )

  .then(result => {
   
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });
