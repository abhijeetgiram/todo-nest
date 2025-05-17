import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description: string;
  status: 'pending' | 'completed';
  userEmail: string;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    userEmail: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);
