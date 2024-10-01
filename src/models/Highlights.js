import mongoose from "mongoose";

const { Schema } = mongoose;

const teamSchema = new Schema({
  name: { type: String, required: true },
  score: { type: String, required: true },
});

const highlightSchema = new Schema({
  player1: { type: teamSchema, required: true },
  player2: { type: teamSchema, required: true },
  channelLink: { type: String, required: true },
  headers: { type: String, required: true },
});

const Highlight =
  mongoose.models.Highlight || mongoose.model("Highlight", highlightSchema);

export default Highlight;
