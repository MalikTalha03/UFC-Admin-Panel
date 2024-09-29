import dbConnect from "@/lib/mongo";
import Match from "@/models/Match";

export const GET = async function (req, { params }) {
  const { id } = params;

  await dbConnect();

  try {
    const match = await Match.findById(id);
    return new Response(JSON.stringify(match), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), { status: 400 });
  }
};

export const DELETE = async function (req, { params }) {
  const { id } = params;

  await dbConnect();

  try {
    await Match.findByIdAndDelete(id);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false }), { status: 400 });
  }
};

export const PUT = async function (req, { params }) {
  const { id } = params;

  await dbConnect();

  try {
    const { isLive } = await req.json();
    const match = await Match.findByIdAndUpdate(
      id,
      { isLive: isLive },
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
};
