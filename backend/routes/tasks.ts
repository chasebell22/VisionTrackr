import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { auth } from '../middleware/auth';
import DailyTask from '../models/DailyTasks';

const router = express.Router();

// @route   GET api/tasks
// @desc    Get all user's tasks, optionally filtered by date
// @access  Private
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const query: any = { userId: req.user.id };
    
    // Filter by date if provided
    if (req.query.date) {
      const date = new Date(req.query.date as string);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      
      query.date = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    }
    
    const tasks = await DailyTask.find(query).sort({ date: 1 });
    res.json(tasks);
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Unknown error');
    res.status(500).send('Server error');
  }
});

// @route   POST api/tasks
// @desc    Create a new task
// @access  Private
router.post(
  '/',
  [
    auth,
    body('description', 'Description is required').not().isEmpty(),
    body('date', 'Date is required').isISO8601().toDate()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { description, date, linkedGoal } = req.body;

      // Create new task
      const task = new DailyTask({
        userId: req.user.id,
        description,
        date,
        linkedGoal: linkedGoal || null,
        completed: false
      });

      await task.save();
      res.json(task);
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
router.put(
  '/:id',
  [
    auth,
    body('description', 'Description is required').optional().not().isEmpty(),
    body('completed', 'Completed must be a boolean').optional().isBoolean(),
    body('date', 'Date must be a valid date').optional().isISO8601().toDate()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { description, completed, date, linkedGoal } = req.body;

      // Build task object
      const taskFields: any = {};
      if (description !== undefined) taskFields.description = description;
      if (completed !== undefined) taskFields.completed = completed;
      if (date) taskFields.date = date;
      if (linkedGoal !== undefined) taskFields.linkedGoal = linkedGoal || null;

      // Find task by ID
      let task = await DailyTask.findById(req.params.id);

      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }

      // Check if user owns the task
      if (task.userId.toString() !== req.user.id) {
        res.status(401).json({ message: 'Not authorized' });
        return;
      }

      // Update task
      task = await DailyTask.findByIdAndUpdate(
        req.params.id,
        { $set: taskFields },
        { new: true }
      );

      res.json(task);
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    // Find task by ID
    const task = await DailyTask.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    // Check if user owns the task
    if (task.userId.toString() !== req.user.id) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    // Delete task
    await DailyTask.findByIdAndDelete(req.params.id);

    res.json({ message: 'Task removed' });
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Unknown error');
    res.status(500).send('Server error');
  }
});

export default router; 