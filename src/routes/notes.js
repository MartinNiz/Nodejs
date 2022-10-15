const router = require('express').Router();

const Note = require('../models/Note');

router.get('/notes/add', (req, res) => {
  res.render('notes/add-notes');
});

router.post('/notes/add-notes', async (req, res) => {
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
    await newNote.save();
    res.redirect('/notes');
  }
});

router.get('/notes', async (req, res) => {
  const notes = await Note.find().lean();
  res.render('notes/all-notes', { notes });
});

module.exports = router;