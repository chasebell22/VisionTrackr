import mongoose, { Document, Schema } from 'mongoose';

export interface ICoreValues extends Document {
  userId: mongoose.Types.ObjectId;
  values: string[];
}

const CoreValuesSchema = new Schema<ICoreValues>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    values: {
      type: [String],
      required: true,
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Create a compound index to ensure a user can only have one core values document
CoreValuesSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model<ICoreValues>('CoreValues', CoreValuesSchema); 