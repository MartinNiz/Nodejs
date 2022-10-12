const router = require('express').Router();

router.get('/notes', (req,res) => {
  res.send('Notes');
});

module.exports = router;