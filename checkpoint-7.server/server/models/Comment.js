import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Comment = new Schema(
  {
    bugId: { type: ObjectId, ref: 'Bug', required: true },
    body: { type: String, required: true },
    author: { type: String, ref: 'Author', required: true}
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Comment