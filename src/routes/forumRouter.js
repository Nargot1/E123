const express = require('express')

const router = express.Router()
const forumController = require("../controllers/controller")

router.get('/', forumController.getIndex)
router.get('/create', forumController.getCreate)
router.post('/create', forumController.postCreate)
router.get('/show', forumController.getShow)
router.get('/edit', forumController.getEdit)
router.post('/like', forumController.postLike)
router.post('/delete', forumController.postDelete)
router.post('/edit', forumController.postEdit)

module.exports = router