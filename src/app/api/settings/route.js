import dbConnect from "@/lib/mongo";
import Settings from "@/models/Settings";

export const GET = async function (req, res) {
  await dbConnect();
  try {
    const settings = await Settings.findOne({});
    return new Response(JSON.stringify(settings), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 400 }
    );
  }
};

export const POST = async function (req, res) {
  try {
    const data = await req.json();
    const settings = new Settings(data);
    await settings.save();
    return new Response(JSON.stringify(settings), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 400 }
    );
  }
};

export const PATCH = async function (req, res) {
  try {
    const data = await req.json();
    const settings = await Settings.findOneAndUpdate({}, data, {
      new: true,
    });
    return new Response(JSON.stringify(settings), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 400 }
    );
  }
};
