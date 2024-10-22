import mongoose from "mongoose";
import Channels from "@/models/Channels";
import Match from "@/models/Match";

export const PATCH = async (req, { params }) => {
  try {
    const { id } = params;
    const data = await req.json();
    console.log("Incoming update data:", data);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Update the channel
      const updatedChannel = await Channels.findByIdAndUpdate(
        id,
        data.channel,
        {
          new: true,
          session
        }
      );

      if (!updatedChannel) {
        throw new Error('Channel not found');
      }
      
      console.log("Updated channel:", JSON.stringify(updatedChannel, null, 2));

      // Find and update all matches that contain this channel
      const updateResult = await Match.updateMany(
        { "channels._id": id },
        {
          $set: {
            "channels.$": updatedChannel
          }
        },
        { session, new: true }
      );

      // Fetch and log the updated matches
      const updatedMatches = await Match.find({ "channels._id": id }).session(session);
      console.log("Updated matches:", JSON.stringify(updatedMatches, null, 2));
      console.log("Number of matches updated:", updateResult.modifiedCount);

      await session.commitTransaction();
      
      return new Response(JSON.stringify({
        success: true,
        updatedChannel,
        updatedMatches,
        matchesUpdated: updateResult.modifiedCount
      }), {
        status: 200
      });

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

  } catch (error) {
    console.error("Failed to update channel:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message
      }),
      { status: 400 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    console.log("Attempting to delete channel:", id);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Log the channel before deletion
      const channelToDelete = await Channels.findById(id).session(session);
      console.log("Channel to be deleted:", JSON.stringify(channelToDelete, null, 2));

      // Find affected matches before deletion
      const affectedMatches = await Match.find({ "channels._id": id }).session(session);
      console.log("Matches affected before deletion:", JSON.stringify(affectedMatches, null, 2));

      // Delete the channel
      await Channels.findByIdAndDelete(id, { session });

      // Remove the channel from all matches
      const updateResult = await Match.updateMany(
        { "channels._id": id },
        {
          $pull: {
            channels: { _id: id }
          }
        },
        { session }
      );

      // Fetch updated matches
      const updatedMatches = await Match.find({ _id: { $in: affectedMatches.map(m => m._id) } }).session(session);
      console.log("Updated matches after deletion:", JSON.stringify(updatedMatches, null, 2));
      console.log("Number of matches updated:", updateResult.modifiedCount);

      await session.commitTransaction();

      return new Response(
        JSON.stringify({
          success: true,
          deletedChannel: channelToDelete,
          updatedMatches,
          matchesUpdated: updateResult.modifiedCount
        }),
        { status: 200 }
      );

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

  } catch (error) {
    console.error("Failed to delete channel:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message
      }),
      { status: 400 }
    );
  }
};