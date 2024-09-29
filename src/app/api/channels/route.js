import dbConnect from "@/lib/mongo";
import Channels from "@/models/Channels";

const handler = async function (req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const channels = await Channels.find({});
        return new Response(JSON.stringify(channels), { status: 200 });
      } catch (error) {
        return new Response(JSON.stringify({ success: false }), {
          status: 400,
        });
      }
    case "POST":
      try {
        const channel = await req.json();
        const name = channel.channel.name;
        const url = channel.channel.url;
        const headers = channel.channel.headers;
        const logo = channel.channel.logo;
        if (!name || !url || !headers || !logo) {
          throw new Error("Please provide all required fields");
        }
        const newChannel = new Channels({
          name,
          url,
          headers,
          logo,
        });
        await newChannel.save();

        return new Response(JSON.stringify(newChannel), { status: 201 });
      } catch (error) {
        console.error("Failed to create channel", error);
        return new Response(JSON.stringify({ success: false }), {
          status: 400,
        });
      }
    default:
      return new Response(JSON.stringify({ success: false }), { status: 400 });
  }
};

export { handler as GET, handler as POST };
