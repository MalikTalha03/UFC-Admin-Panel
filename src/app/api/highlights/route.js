
import dbConnect from '@/lib/mongo';
import Highlight from '@/models/Highlights';
import Player from '../../../models/Player';

export const GET = async function (req, res) {
  await dbConnect();
  try {
    // Fetch all highlights and players from the database
    const highlights = await Highlight.find({});
    const players = await Player.find({});

    // Map the highlights to include player names
    const updatedHighlights = highlights.map((highlight) => {
      return {
        ...highlight._doc,
        player1: players.find((player) => player._id == highlight.player1)?.name,
        player2: players.find((player) => player._id == highlight.player2)?.name,
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
