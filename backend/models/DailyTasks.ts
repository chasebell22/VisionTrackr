import mongoose, { Document, Schema } from 'mongoose';

export interface IDailyTask extends Document {
  userId: mongoose.Types.ObjectId;
  description: string;
  completed: boolean;
  date: Date;
  linkedGoal?: mongoose.Types.ObjectId;
}

const DailyTaskSchema = new Schema<IDailyTask>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    description: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    linkedGoal: {
      type: Schema.Types.ObjectId,
      ref: 'Goal',
      required: false
    }
  },
  {
    timestamps: true
  }
);

// Create an index for faster queries by date
DailyTaskSchema.index({ userId: 1, date: 1 });

export default mongoose.model<IDailyTask>('DailyTask', DailyTaskSchema); 