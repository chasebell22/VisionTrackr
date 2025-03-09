import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { auth } from '../middleware/auth';
import Vision from '../models/Visions';

const router = express.Router();

// @route   GET api/visions
// @desc    Get all user's visions
// @access  Private
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const visions = await Vision.find({ userId: req.user.id });
    res.json(visions);
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Unknown error');
    res.status(500).send('Server error');
  }
});

// @route   POST api/visions
// @desc    Create a new vision
// @access  Private
router.post(
  '/',
  [
    auth,
    body('timeframe', 'Timeframe must be 10-year, 3-year, or 1-year').isIn(['10-year', '3-year', '1-year']),
    body('description', 'Description is required').not().isEmpty()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { timeframe, description } = req.body;

      // Check if vision with this timeframe already exists
      const existingVision = await Vision.findOne({ 
        userId: req.user.id,
        timeframe
      });

      if (existingVision) {
        res.status(400).json({ message: `A ${timeframe} vision already exists` });
        return;
      }

      // Create new vision
      const vision = new Vision({
        userId: req.user.id,
        timeframe,
        description
      });

      await vision.save();
      res.json(vision);
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/visions/:id
// @desc    Update a vision
// @access  Private
router.put(
  '/:id',
  [
    auth,
    body('description', 'Description is required').not().isEmpty()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { description } = req.body;

      // Find vision by ID
      let vision = await Vision.findById(req.params.id);

      if (!vision) {
        res.status(404).json({ message: 'Vision not found' });
        return;
      }

      // Check if user owns the vision
      if (vision.userId.toString() !== req.user.id) {
        res.status(401).json({ message: 'Not authorized' });
        return;
      }

      // Update vision
      vision = await Vision.findByIdAndUpdate(
        req.params.id,
        { description },
        { new: true }
      );

      res.json(vision);
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/visions/:id
// @desc    Delete a vision
// @access  Private
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    // Find vision by ID
    const vision = await Vision.findById(req.params.id);

    if (!vision) {
      res.status(404).json({ message: 'Vision not found' });
      return;
    }

    // Check if user owns the vision
    if (vision.userId.toString() !== req.user.id) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    // Delete vision
    await Vision.findByIdAndDelete(req.params.id);

    res.json({ message: 'Vision removed' });
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Unknown error');
    res.status(500).send('Server error');
  }
});

export default router; 