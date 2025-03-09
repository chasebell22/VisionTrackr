import mongoose, { Document, Schema } from 'mongoose';

export interface IVision extends Document {
  userId: mongoose.Types.ObjectId;
  timeframe: '10-year' | '3-year' | '1-year';
  description: string;
}

const VisionSchema = new Schema<IVision>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    timeframe: {
      type: String,
      enum: ['10-year', '3-year', '1-year'],
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Create a compound index to ensure a user can only have one vision per timeframe
VisionSchema.index({ userId: 1, timeframe: 1 }, { unique: true });

export default mongoose.model<IVision>('Vision', VisionSchema); 