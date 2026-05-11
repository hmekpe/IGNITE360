import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    courseSelection: {
      type: String,
      required: true,
    },
    motivation: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
    },
    source: {
      type: String,
      default: 'website',
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'approved', 'rejected'],
      default: 'pending',
    },
    reviewedAt: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
