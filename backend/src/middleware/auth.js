import jwt from 'jsonwebtoken';
import User from '../models/User';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = await jwt.verify(token, process.env.JWT_KEY);

    // koz server ka htoke tae user lr check tr
    const user = await User.findOne({ _id: data._id, 'tokens.token': token });

    if (!user) {
      throw new Error('User not found');
    }

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({
      error: {
        status: true,
        message: e.message,
      },
      data: null,
    });
  }
};

export default auth;
