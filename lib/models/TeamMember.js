import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    shortBio: {
      type: String,
    },
    image: {
      type: String,
    },
    socials: {
      linkedin: String,
      x: String,
      instagram: String,
      facebook: String,
      tiktok: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
