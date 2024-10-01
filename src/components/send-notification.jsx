
"use client";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export function SendNotification({ match, open, onChange }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    // Update notification title for a UFC fight
    setTitle(`Upcoming UFC Fight: ${match.player1} vs ${match.player2}`);
    
    // Format the date and time for the notification body
    const date = new Date(match.date).toLocaleDateString();
    setBody(
      `The fight between ${match.player1} and ${match.player2} is scheduled for ${date} at ${match.time}.`
    );
  }, [match]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/send-notification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      alert("Notification sent successfully!");
      onChange();
    } catch (error) {
      console.error("Failed to send notification", error);
      alert("Failed to send notification: " + error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Notification</DialogTitle>
          <DialogDescription>
            Send a notification to all users subscribed to the UFC topic.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="notification-title">
              Title
            </Label>
            <Input
              className="col-span-3"
              id="notification-title"
              placeholder="Enter notification title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="notification-body">
              Body
            </Label>
            <Input
              className="col-span-3"
              id="notification-body"
              placeholder="Enter notification body"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="mr-2" variant="outline">
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Send Notification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
