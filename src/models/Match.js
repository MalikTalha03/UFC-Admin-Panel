import mongoose from 'mongoose';

const MatchSchema = new mongoose.Schema({
  player1: {
    ref: 'Player',
    type: String,
    required: true
  },
  player2: {
    ref: 'Player',
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  channels: {
    type: Array,
    default: []
  },
  headers: {
    type: String,
  },
  isLive: {
    type: Boolean,
    default: false
  }
});

export default mongoose.models.Match || mongoose.model('Match', MatchSchema);
