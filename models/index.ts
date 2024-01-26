import { Schema, model, Document, Types } from 'mongoose';
interface User extends Document {
  name: string;
  email: string;
  avatarUrl: string;
  description?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  projects?: Types.ObjectId[];
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatarUrl: String,
  description: {
    type: String,
    maxlength: 1000,
  },
  githubUrl: String,
  linkedinUrl: String,
  projects: [
    {
      type: Types.ObjectId,
      ref: 'Project',
    },
  ],
});

interface Project extends Document {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  createdBy: Types.ObjectId;
}

const projectSchema = new Schema<Project>({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: String,
  image: String,
  liveSiteUrl: String,
  githubUrl: String,
  category: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});


export const User = model<User>('User', userSchema);
export const Project = model<Project>('Project', projectSchema);
