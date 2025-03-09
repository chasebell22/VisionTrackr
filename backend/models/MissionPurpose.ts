import mongoose, { Document, Schema } from 'mongoose';

export interface IMissionPurpose extends Document {
  userId: mongoose.Types.ObjectId;
  mission: string;
  purpose: string;
}

const MissionPurposeSchema = new Schema<IMissionPurpose>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    mission: {
      type: String,
      required: true
    },
    purpose: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Create a compound index to ensure a user can only have one mission/purpose document
MissionPurposeSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model<IMissionPurpose>('MissionPurpose', MissionPurposeSchema); 