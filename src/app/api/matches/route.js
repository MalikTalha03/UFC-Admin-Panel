import Player from "@/models/Player"; // Import Player model
import dbConnect from "@/lib/mongo";
import Match from "@/models/Match";
import Channels from "@/models/Channels";
const moment = require("moment-timezone");

export const GET = async function (req, res) {
  await dbConnect();

  try {
    const matches = await Match.find({});
    const players = await Player.find({});
    const channels = await Channels.find({}); // Fetch all channels

    // Create a map for quick lookup of player names
    const playerMap = players.reduce((acc, player) => {
      acc[player._id.toString()] = player.name; // Map player IDs to their names
      return acc;
    }, {});

    // Create a map for quick lookup of channel objects
    const channelMap = channels.reduce((acc, channel) => {
      acc[channel._id.toString()] = channel; // Map channel IDs to their objects
      return acc;
    }, {});

    // Replace player IDs with names and channel IDs with channel objects
    const updatedMatches = matches.map((match) => {
      const matchChannels = match.channels.map(
        (channelId) => channelMap[channelId.toString()] || channelId
      ); // Replace channel IDs with the full channel object

      return {
        ...match._doc,
        player1: playerMap[match.player1.toString()] || match.player1, // Ensure ID to name mapping
        player2: playerMap[match.player2.toString()] || match.player2,
        channels: matchChannels, // Set full channel objects
      };
    });

    updatedMatches.sort((a, b) => {
      // Ensure that both matches have valid date fields
      if (!a.date || !b.date) {
        console.warn("Date is undefined in one of the matches:", a, b);
        return 1; // Move undefined dates to the end
      }

      // Convert dates to time for comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // Perform sorting based on the date
      if (dateA.getTime() === dateB.getTime()) {
        // If dates are the same, sort by player1's name
        return a.player1.localeCompare(b.player1);
      }

      // Sort based on the date
      return dateA.getTime() - dateB.getTime();
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
