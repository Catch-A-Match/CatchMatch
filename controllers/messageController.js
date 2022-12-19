const { Message } = require('../models/Messages');

/**
 * Create Message
 */
exports.createMessage = (req, res) => {
    const { sender, recipient, content } = req.body;
    const newMessage = new Message({ sender, recipient, content });
    newMessage.save((err, msg) => {
        if (err) {
            return res.status(500).json({ msg: err });
        }
        return res.status(200).json({ msg: msg });
    });
};

/**
 * Get All Messages
 */
exports.getAllMessages = (req, res) => {
    Message.find({}, (err, msg) => {
        if (err) return res.status(500).json({ msg: err });
        return res.status(200).json({ msg: msg });
    });
};

/**
 * Get Message by Id
 */
exports.getMessageById = (req, res) => {
    const { id } = req.params;
    Message.findById(id, (err, msg) => {
        if (err) return res.status(500).json({ msg: err });
        if (!msg) {
            return res.status(404).json({ msg: "Message not Found" });
        }

        return res.status(200).json({ msg: msg });
    });
}

/**
 * Update a Message
 */
exports.updateMessage = (req, res) => {
    const { id } = req.params;
    Message.findByIdAndUpdate(
        id,
        req.body,
        { new: true },
        (err, message) => {
          if (err) return res.status(500).send(err);
          if (!message) return res.status(404).send('Message not found.');
          
          return res.status(200).send(message);
        }
    );
}

/**
 * Delete a Message 
 */
exports.deleteMessage = (req, res) => {
    const { id } = req.params;
    Message.findByIdAndRemove(id, (err, message) => {
      if (err) return res.status(500).send(err);
      if (!message) return res.status(404).send('Message not found.');
      return res.status(200).send(`Message "${message.content}" was deleted.`);
    });
  };