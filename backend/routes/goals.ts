import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { auth } from '../middleware/auth';
import Goal from '../models/Goals';

const router = express.Router();

// @route   GET api/goals
// @desc    Get all user's goals
// @access  Private
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const goals = await Goal.find({ userId: req.user.id }).sort({ dueDate: 1 });
    res.json(goals);
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Unknown error');
    res.status(500).send('Server error');
  }
});

// @route   POST api/goals
// @desc    Create a new goal
// @access  Private
router.post(
  '/',
  [
    auth,
    body('description', 'Description is required').not().isEmpty(),
    body('dueDate', 'Due date is required').isISO8601().toDate()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { description, dueDate } = req.body;

      // Create new goal
      const goal = new Goal({
        userId: req.user.id,
        type: 'quarterly',
        description,
        dueDate,
        status: 'in progress'
      });

      await goal.save();
      res.json(goal);
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/goals/:id
// @desc    Update a goal
// @access  Private
router.put(
  '/:id',
  [
    auth,
    body('description', 'Description is required').optional().not().isEmpty(),
    body('status', 'Status must be either in progress or completed').optional().isIn(['in progress', 'completed']),
    body('dueDate', 'Due date must be a valid date').optional().isISO8601().toDate()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { description, status, dueDate } = req.body;

      // Build goal object
      const goalFields: any = {};
      if (description) goalFields.description = description;
      if (status) goalFields.status = status;
      if (dueDate) goalFields.dueDate = dueDate;

      // Find goal by ID
      let goal = await Goal.findById(req.params.id);

      if (!goal) {
        res.status(404).json({ message: 'Goal not found' });
        return;
      }

      // Check if user owns the goal
      if (goal.userId.toString() !== req.user.id) {
        res.status(401).json({ message: 'Not authorized' });
        return;
      }

      // Update goal
      goal = await Goal.findByIdAndUpdate(
        req.params.id,
        { $set: goalFields },
        { new: true }
      );

      res.json(goal);
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/goals/:id
// @desc    Delete a goal
// @access  Private
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    // Find goal by ID
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(404).json({ message: 'Goal not found' });
      return;
    }

    // Check if user owns the goal
    if (goal.userId.toString() !== req.user.id) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    // Delete goal
    await Goal.findByIdAndDelete(req.params.id);

    res.json({ message: 'Goal removed' });
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Unknown error');
    res.status(500).send('Server error');
  }
});

export default router; 