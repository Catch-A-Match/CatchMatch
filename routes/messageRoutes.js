const messageRouter = require('express').Router();
const { createMessage, getAllMessages, getMessageById, deleteMessage } = require('../controllers/messageController');

// Message Routes
messageRouter.route('/create-message').post(createMessage);
messageRouter.route('/get-all-messages').get(getAllMessages);
messageRouter.route('/get-message/:id').get(getMessageById);
messageRouter.route('/delete').delete(deleteMessage);

module.exports = messageRouter