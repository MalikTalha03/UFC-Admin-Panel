import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  adMobInterstitial: {
    type: String,
  },
  adMobBanner: {
    type: String,
  },
  adMobAppOpen: {
    type: String,
  },
  appLovinInterstitial: {
    type: String,
  },
  appLovinBanner: {
    type: String,
  },
  appLovinAppOpen: {
    type: String,
  },
  isAdMobEnabled: {
    type: Boolean,
  },
  newLink: {
    type: String,
  },
  isNewLink: {
    type: Boolean,
  },
  ratingLink: {
    type: String,
  },
  revenueCatKey: {
    type: String,
  },
  appLovinSdkKey: {
    type: String,
  },
});

export default mongoose.models.Settings ||
  mongoose.model("Settings", SettingsSchema);
