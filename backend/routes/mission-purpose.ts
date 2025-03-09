import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { auth } from '../middleware/auth';
import MissionPurpose from '../models/MissionPurpose';

const router = express.Router();

// @route   GET api/mission-purpose
// @desc    Get user's mission and purpose
// @access  Private
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const missionPurpose = await MissionPurpose.findOne({ userId: req.user.id });
    
    if (!missionPurpose) {
      res.status(404).json({ message: 'Mission and purpose not found' });
      return;
    }
    
    res.json(missionPurpose);
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'Unknown error');
    res.status(500).send('Server error');
  }
});

// @route   POST api/mission-purpose
// @desc    Create or update user's mission and purpose
// @access  Private
router.post(
  '/',
  [
    auth,
    body('mission', 'Mission is required').not().isEmpty(),
    body('purpose', 'Purpose is required').not().isEmpty()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { mission, purpose } = req.body;

      // Find and update or create new mission and purpose
      let missionPurpose = await MissionPurpose.findOne({ userId: req.user.id });

      if (missionPurpose) {
        // Update existing mission and purpose
        missionPurpose = await MissionPurpose.findOneAndUpdate(
          { userId: req.user.id },
          { mission, purpose },
          { new: true }
        );
      } else {
        // Create new mission and purpose
        missionPurpose = new MissionPurpose({
          userId: req.user.id,
          mission,
          purpose
        });

        await missionPurpose.save();
      }

      res.json(missionPurpose);
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
      res.status(500).send('Server error');
    }
  }
);

export default router; 