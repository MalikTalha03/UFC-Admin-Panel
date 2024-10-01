
import dbConnect from '@/lib/mongo';
import Highlight from '@/models/Highlights';
import Player from '../../../models/Player';

export const GET = async function (req, res) {
  await dbConnect();
  try {
    // Fetch all highlights and players from the database
    const highlights = await Highlight.find({});

    console.log("Highlights", highlights);


    return new Response(JSON.stringify(highlights), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch highlights", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 400 }
    );
  }
};

export const POST = async function (req, res) {
  await dbConnect();
  const { player1, player2, channelLink, headers } = await req.json();
  if (!player1 || !player2 || !channelLink || !headers) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Please provide all required fields",
      }),
      { status: 400 }
    );
  }
  try {
    const newHighlight = new Highlight({
      player1,
      player2,
      channelLink,
      headers,
    });
    await newHighlight.save();
    return new Response(JSON.stringify(newHighlight), { status: 201 });
  } catch (error) {
    console.error("Failed to create highlight", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 400 }
    );
  }
};
