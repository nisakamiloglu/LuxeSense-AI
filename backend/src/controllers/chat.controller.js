const Message = require('../models/Message');
const User = require('../models/User');

// conversationId = sorted pair of userId + advisorId joined with '_'
const buildConversationId = (idA, idB) =>
  [idA.toString(), idB.toString()].sort().join('_');

exports.getMessages = async (req, res, next) => {
  try {
    const { partnerId } = req.params;
    const conversationId = buildConversationId(req.user._id, partnerId);
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    res.json({ success: true, messages });
  } catch (error) {
    next(error);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { partnerId, text } = req.body;
    if (!text?.trim()) return res.status(400).json({ success: false, message: 'Text required' });

    const conversationId = buildConversationId(req.user._id, partnerId);
    const message = await Message.create({
      conversationId,
      senderId: req.user._id,
      senderRole: req.user.role,
      text: text.trim(),
    });
    res.status(201).json({ success: true, message });
  } catch (error) {
    next(error);
  }
};

exports.getConversations = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    // Find all conversations this user participates in
    const messages = await Message.find({
      conversationId: { $regex: userId },
    }).sort({ createdAt: -1 });

    // Group by conversationId, keep latest message per conversation
    const seen = new Set();
    const conversations = [];
    for (const msg of messages) {
      if (!seen.has(msg.conversationId)) {
        seen.add(msg.conversationId);
        const partnerId = msg.conversationId.split('_').find(id => id !== userId);
        const partner = await User.findById(partnerId).select('name email role');
        conversations.push({ conversationId: msg.conversationId, partner, lastMessage: msg });
      }
    }
    res.json({ success: true, conversations });
  } catch (error) {
    next(error);
  }
};
