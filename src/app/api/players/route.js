import dbConnect from "@/lib/mongo";
import Player from "@/models/Player";

const handler = async function (req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const players = await Player.find({});
        return new Response(JSON.stringify(players), { status: 200 });
      } catch (error) {
        return new Response(JSON.stringify({ success: false }), {
          status: 400,
        });
      }
    case "POST":
      try {
        const { name } = await req.json();
        if (!name) {
          throw new Error("Please provide a Player name");
        }
        const player = await Player.create({ name });
        return new Response(JSON.stringify(player), { status: 201 });
      } catch (error) {
        return new Response(
          JSON.stringify({ success: false, message: error.message }),
          { status: 400 }
        );
      }
    default:
      return new Response(JSON.stringify({ success: false }), { status: 400 });
  }
};

export { handler as GET, handler as POST };
