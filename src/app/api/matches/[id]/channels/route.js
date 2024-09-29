import dbConnect from "@/lib/mongo";
import Match from "@/models/Match";

const handler = async function (req, { params }) {
  const { method } = req;
  const { id } = params;

  await dbConnect();

  switch (method) {
    case "PATCH":
      try {
        const { channels } = await req.json();
        const match = await Match.findByIdAndUpdate(
          id,
          { channels: channels },
          { new: true }
        );
        if (!match) {
          return new Response(JSON.stringify({ success: false }), {
            status: 400,
          });
        }
        return new Response(JSON.stringify(match), { status: 200 });
      } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), {
          status: 400,
        });
      }
    default:
      return new Response(JSON.stringify({ success: false }), { status: 400 });
  }
};

export { handler as PATCH };
