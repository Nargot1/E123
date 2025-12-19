const express = require('express');
const router = express.Router();

const forumController = require('../controllers/forumController');
const { ensureLoggedIn } = require('../middlewares/auth');

router.get('/', forumController.getIndex);
router.get('/create', ensureLoggedIn, forumController.getCreate);
router.post('/create', ensureLoggedIn, forumController.postCreate);

router.get('/show', forumController.getShow);
router.get('/edit', ensureLoggedIn, forumController.getEdit);
router.post('/edit', ensureLoggedIn, forumController.postEdit);

router.post('/like', ensureLoggedIn, forumController.postLike);
router.post('/delete', ensureLoggedIn, forumController.postDelete);


module.exports = router;