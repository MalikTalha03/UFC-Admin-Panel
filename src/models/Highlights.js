import mongoose from "mongoose";

const { Schema } = mongoose;

const teamSchema = new Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
});

const highlightSchema = new Schema({
  team1: { type: teamSchema, required: true },
  team2: { type: teamSchema, required: true },
  channelLink: { type: String, required: true },
  headers: { type: String, required: true },
  week: { type: Number, required: true },
});

const Highlight =
  mongoose.models.Highlight || mongoose.model("Highlight", highlightSchema);

export default Highlight;
