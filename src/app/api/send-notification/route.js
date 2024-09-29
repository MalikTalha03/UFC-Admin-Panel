import admin from "@/lib/firebase";

const handler = async (req, res) => {
  let title, body;
  try {
    const data = await req.json(); // Attempt to parse JSON
    title = data.title;
    body = data.body;
  } catch (error) {
    console.error("Failed to parse request body:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Invalid JSON" }),
      { status: 400 }
    );
  }

  const message = {
    notification: {
      title,
      body,
    },
    topic: "nfl",
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message to topic: ", message.topic);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send notification" }),
      { status: 400 }
    );
  }
};

export { handler as POST };
