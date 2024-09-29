import mongoose from "mongoose";
import Channels from "@/models/Channels";

export const PATCH = async (req, {params}) => {
  try {
    const { id } = params;
    const data = await req.json();
    console.log(data);
    const channel = await Channels.findByIdAndUpdate(id, data.channel, {
      new: true,
    });
    return new Response(JSON.stringify(channel), { status: 200 });
  } catch (error) {
    return new Response(
      console.error("Failed to update channel", error),
      JSON.stringify({ success: false, message: error.message }),
      { status: 400 }
    );
  }
};

export const DELETE = async (req, {params}) => {
  try {
    const { id } = params;
    await Channels.findByIdAndDelete(id);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {

    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 400 }
    );
  }
};
