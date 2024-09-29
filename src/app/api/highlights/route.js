import dbConnect from "@/lib/mongo";
import Highlight from "@/models/Highlights";
import  Player from "@/models/Player";

export const POST = async function (req, res) {
  await dbConnect();
  const { player1, player2, channelLink, headers, week } = await req.json();

  if (!player1 || !player2 || !channelLink || !headers || !week) {
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
      week,
    });
    await newHighlight.save();
    return new Response(JSON.stringify(newHighlight), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 400 }
    );
  }
};

export const GET = async function (req, res) {
  await dbConnect();
  try {
    const highlights = await Highlight.find({});
    const players = await Player.find({});

    const updatedHighlights = highlights.map((highlight) => {
      return {
        ...highlight._doc,
        player1: players.find((player) => player._id == highlight.player1)
          .name,
        player2: players.find((player) => player._id == highlight.player2)
          .name,
      };
    });
    return new Response(JSON.stringify(updatedHighlights), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch highlights", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 400 }
    );
  }
};
