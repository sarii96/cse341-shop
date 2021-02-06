const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
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

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const autheRoutes = require('./routes/authe');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'my secret', resave: false, saveUninitialized: false,}))

app.use((req, res, next) => {
  User.findById('601dace927ee6e18bc4f766e')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(autheRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://sarii96:Patricia96@cluster0.q3479.mongodb.net/shop?retryWrites=true&w=majority', options
  )

  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Sarah',
          email: 'sarah-96325@hotmail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });
