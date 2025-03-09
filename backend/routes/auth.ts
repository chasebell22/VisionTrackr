import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { auth } from '../middleware/auth';

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post(
  '/register',
  [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req: Request, res: Response): Promise<void> => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Create new user
      user = new User({
        name,
        email,
        password
      });

      // Save user to database
      await user.save();

      // Create JWT payload
      const payload = {
        user: {
          id: user.id
        }
      };

      // Sign token
      jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' },
        (err: Error | null, token: string | undefined) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  async (req: Request, res: Response): Promise<void> => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }

      // Create JWT payload
      const payload = {
        user: {
          id: user.id
        }
      };

      // Sign token
      jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' },
        (err: Error | null, token: string | undefined) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : 'Unknown error');
    res.status(500).send('Server error');
  }
});

export default router; 