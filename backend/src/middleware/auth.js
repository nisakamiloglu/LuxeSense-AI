const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

<<<<<<< HEAD
=======
    console.log('Auth middleware - Token:', token ? 'present' : 'missing');
    console.log('Auth middleware - JWT_SECRET:', process.env.JWT_SECRET ? 'present' : 'missing');

>>>>>>> d1353da (Initial commit)
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
<<<<<<< HEAD
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
=======
    console.log('Auth middleware - Decoded:', decoded);
    
    req.user = await User.findById(decoded.id);
    console.log('Auth middleware - User found:', req.user ? 'yes' : 'no');
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
>>>>>>> d1353da (Initial commit)
    res.status(401).json({ success: false, message: 'Not authorized' });
  }
};
