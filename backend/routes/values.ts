import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { auth } from '../middleware/auth';
import CoreValues from '../models/CoreValues';

const router = express.Router();

// @route   GET api/values
// @desc    Get user's core values
// @access  Private
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const coreValues = await CoreValues.findOne({ userId: req.user.id });
    
    if (!coreValues) {
      res.status(404).json({ message: 'Core values not found' });
      return;
    }
    
    res.json(coreValues);
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Unknown error');
    res.status(500).send('Server error');
  }
});

// @route   POST api/values
// @desc    Create or update user's core values
// @access  Private
router.post(
  '/',
  [
    auth,
    body('values', 'Values are required').isArray({ min: 1 })
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { values } = req.body;

      // Find and update or create new core values
      let coreValues = await CoreValues.findOne({ userId: req.user.id });

      if (coreValues) {
        // Update existing core values
        coreValues = await CoreValues.findOneAndUpdate(
          { userId: req.user.id },
          { values },
          { new: true }
        );
      } else {
        // Create new core values
        coreValues = new CoreValues({
          userId: req.user.id,
          values
        });

        await coreValues.save();
      }

      res.json(coreValues);
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/values/:id
// @desc    Update core values
// @access  Private
router.put(
  '/:id',
  [
    auth,
    body('values', 'Values are required').isArray({ min: 1 })
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { values } = req.body;

      // Find core values by ID
      let coreValues = await CoreValues.findById(req.params.id);

      if (!coreValues) {
        res.status(404).json({ message: 'Core values not found' });
        return;
      }

      // Check if user owns the core values
      if (coreValues.userId.toString() !== req.user.id) {
        res.status(401).json({ message: 'Not authorized' });
        return;
      }

      // Update core values
      coreValues = await CoreValues.findByIdAndUpdate(
        req.params.id,
        { values },
        { new: true }
      );

      res.json(coreValues);
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/values/:id
// @desc    Delete core values
// @access  Private
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    // Find core values by ID
    const coreValues = await CoreValues.findById(req.params.id);

    if (!coreValues) {
      res.status(404).json({ message: 'Core values not found' });
      return;
    }

    // Check if user owns the core values
    if (coreValues.userId.toString() !== req.user.id) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    // Delete core values
    await CoreValues.findByIdAndDelete(req.params.id);

    res.json({ message: 'Core values removed' });
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Unknown error');
    res.status(500).send('Server error');
  }
});

export default router; 