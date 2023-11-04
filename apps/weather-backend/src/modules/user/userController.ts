import { UserService } from './userService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const UserController = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await UserService.login(email);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });


    if (user) {
      res.status(201).json({ token });
    } else {
      res.status(404).json('User not found');
    }

  },
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.register(email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
