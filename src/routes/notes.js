const router = require('express').Router();

const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
  res.render('notes/add-notes');
});

router.post('/notes/add-notes', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  
  if (!title) { 
    errors.push({text: 'Please add a title'})
  }
  
  if (!description) {
    errors.push({text: 'Please add a description'})
  }

  if (errors.length > 0) {
    res.render('notes/add-notes', {
      errors,
      title,
      description
    })
  } else{
    const newNote = new Note({title, description});
    newNote.user = req.user.id; 
    await newNote.save();
    req.flash('success_msg','Note added successfully');
    res.redirect('/notes');
  }
});

router.get('/notes', isAuthenticated, async (req, res) => {
  const notes = await Note.find({user: req.user.id}).sort({date: 'desc'}).lean();
  res.render('notes/all-notes', { notes });
});

router.get('/notes/:sort', isAuthenticated, async (req, res) => {
  console.log(req.params.sort)
  const notes = await Note.find({user: req.user.id}).sort({date: req.params.sort}).lean();
  res.render('notes/all-notes', { notes });
});


router.get('/notes/edit/:id', isAuthenticated,  async (req,res) => {
  const note = await Note.findById(req.params.id).lean();
  res.render('notes/edit-notes', {note});
});

router.put('/notes/edit-notes/:id', isAuthenticated, async (req,res) => {
  const {title, description} = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg','Note updated successfully');
  res.redirect('/notes')
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg','Note deleted successfully');
  res.redirect('/notes');
})


module.exports = router;