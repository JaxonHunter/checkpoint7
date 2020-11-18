import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Bug = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: {type: String, required: true },
    completed: { type: Boolean, required: true, default: false}
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Bug