import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  originalText: String,
  correctedText: String,
  suggestions: Array,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Document || mongoose.model("Document", DocumentSchema);
