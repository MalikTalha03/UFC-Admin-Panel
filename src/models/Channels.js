import mongoose from "mongoose";

const ChannelsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  headers: {
    type: String,
  },
  logo: {
    type: String,
  },
});

export default mongoose.models.Channels ||
  mongoose.model("Channels", ChannelsSchema);
