const router = require('express').Router();
const User = require('../models/Users')

router.get('/users/signin', (req,res) => {
  res.render('users/signin');
});

router.get('/users/signup', (req,res) => {
  res.render('users/signup');
});


router.post('/users/signup', async (req,res) => {
  const { user_name, email, password, confirm_password} = req.body;
  const errors = []
  if (user_name.length == 0) {
    errors.push({text: 'Please insert user name'})
  }
  if (email.length == 0) {
    errors.push({text: 'Please insert email'})
  }
  if (password.length < 4) {
    errors.push({text: 'Password can be less than 4'})
  }
  if (password != confirm_password) {
    errors.push({text: 'Password do not match'});
  }
  if (errors.length > 0 ) {
    res.render('users/signup', {errors, user_name, email, password, confirm_password})
  }else{
    const emailUser = await User.findOne({email: email});
    if (emailUser) {
      req.flash('error_msg', 'The email is already in use');
      res.redirect('/users/signun')
    }
    const newUser = new User({user_name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'you are register');
    res.redirect('/users/signin')
  }
})

module.exports = router;