const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getMessages, sendMessage, getConversations } = require('../controllers/chat.controller');

router.use(protect);

router.get('/conversations', getConversations);
router.get('/:partnerId', getMessages);
router.post('/', sendMessage);

module.exports = router;
