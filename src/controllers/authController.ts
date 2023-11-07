import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { signToken } from '../utils/jwtUtils'; // Importing the JWT utility functions

class AuthController {
  public async signup(req: Request, res: Response): Promise<void> {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword,
      });

      const token = signToken({ userId: newUser.id.toString() }); // Convert userId to string

      res.status(201).json({ message: 'User created', token });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }

    return;
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const token = signToken({ userId: user.id.toString() }); // Convert userId to string

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    res.status(200).json({ message: 'Sign in successful', token });

    return;
  }
}

export default new AuthController();
