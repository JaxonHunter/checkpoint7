import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Bug = new Schema(
  {
    title: { type: String, required: true },
    profile: { type: String, ref: 'Profile', required: true },
    author: { type: String, ref: 'Author', required: true },
    completed: { type: Boolean, ref: 'Completed', required: true}
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Bug