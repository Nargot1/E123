const express = require('express')

const router = express.Router()
const forumController = require("../controllers/controller")

router.get('/', forumController.index)
router.get('/create', forumController.createGet)
router.post('/create', forumController.createPost)
router.get('/thread', forumController.showThread)

module.exports = router