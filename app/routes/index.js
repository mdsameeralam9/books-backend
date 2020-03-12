const router = require('express').Router();
const auth = require('./auth');
const books = require('./books');

router.use('/auth', auth);
router.use('/books', books);


router.all('*', function(req, res){
    res.status(404).send("not found")
})

module.exports = router;