import Player from "@/models/Player"; // Import Player model
import dbConnect from "@/lib/mongo";
import Match from "@/models/Match";
const moment = require("moment-timezone");

export const GET = async function (req, res) {
  await dbConnect();

  try {
    const matches = await Match.find({});
    const players = await Player.find({});

    // Create a map for quick lookup of player names
    const playerMap = players.reduce((acc, player) => {
      acc[player._id.toString()] = player.name; // Map player IDs to their names
      return acc;
    }, {});
    console.log("Player Map: ", playerMap);

    // Replace player IDs with names in matches
    const updatedMatches = matches.map((match) => {
      return {
        ...match._doc,
        player1: playerMap[match.player1.toString()] || match.player1, // Ensure ID to name mapping
        player2: playerMap[match.player2.toString()] || match.player2,
      };
    });

    // Log updatedMatches to check their structure
    console.log("Updated Matches: ", updatedMatches);

    updatedMatches.sort((a, b) => {
      // Check if player1 and player2 exist
      if (!a.player1 || !b.player1) {
        console.warn("Player1 is undefined in match:", a);
        return 1; // Move undefined players to the end
      }
      if (!a.player2 || !b.player2) {
        console.warn("Player2 is undefined in match:", a);
        return 1; // Move undefined players to the end
      }
      // Perform sorting
      if (a.date === b.date) {
        return a.player1.localeCompare(b.player1);
      }
      return a.date.localeCompare(b.date);
    });

    return new Response(JSON.stringify(updatedMatches), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch matches", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 400 }
    );
  }
};


export const POST = async function (req, res) {
  try {
    const { player1Name, player2Name, date, time } = await req.json();

    if (!player1Name || !player2Name || !date || !time) {
      throw new Error("Please provide all required fields");
    }

    // Check if players exist in the database
    const player1 = await Player.findOne({ name: player1Name });
    const player2 = await Player.findOne({ name: player2Name });

    if (!player1 || !player2) {
      throw new Error("One or both players do not exist");
    }

    // Parse the date string in the MM/DD/YYYY format
    const dateString = moment(date, "M/D/YYYY").format("MM/DD/YYYY");
    const timeHour = time.hour;
    const timeMinute = time.minute || "00";

    const dateTime = moment.tz(
      `${dateString} ${timeHour}:${timeMinute}`,
      "MM/DD/YYYY HH:mm",
      "Asia/Karachi"
    );

    const channels = [];
    const isLive = false;

    const match = await Match.create({
      player1: player1._id, // Store player IDs in the match
      player2: player2._id,
      date: dateTime.toDate(),
      channels,
      isLive,
    });

    return new Response(JSON.stringify(match), { status: 201 });
  } catch (error) {
    console.error("Failed to create match", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 400 }
    );
  }
};
