import mongoose from 'mongoose';

const ProgramSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: String,
    format: String,
    location: String,
    outcomes: [String],
    image: {
      type: String,
    },
    category: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Program || mongoose.model('Program', ProgramSchema);
