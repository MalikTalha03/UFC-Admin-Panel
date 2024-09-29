import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a team name"],
    unique: true,
    trim: true,
  },
});

export default mongoose.models.Player || mongoose.model("Player", PlayerSchema);
