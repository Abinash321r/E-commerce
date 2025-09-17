import jwt from 'jsonwebtoken';
import { Users } from '../models/mongodb.js';
import 'dotenv/config';

export const isAuthenticated = async (req, res, next) => {
  if (req.cookies.usertoken) {
    const decode = jwt.verify(req.cookies.usertoken,`${process.env.JWT_TOKEN}`);
    req.data = await Users.findById(decode);
    console.log(req.data);
    next();
  } else {
    req.data = {
      isAuthenticated: false,
      isAdmin: false,
    };
    next();
  }
};
