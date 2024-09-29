/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/XevXOaFXPuX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
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
import { useState } from "react";

export function AddChannel({ open, onChange }) {
  const [channel, setChannel] = useState({
    name: "",
    url: "",
    headers: "",
    logo: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/channels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel}),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      alert("Channel added successfully!");
      onChange(); // Close dialog or refresh list
    } catch (error) {
      console.error("Failed to add channel", error);
      alert("Failed to add channel: " + error.message);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Channel</DialogTitle>
          <DialogDescription>
            Create a new channel with a name and header.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="channel-name">
              Channel Name
            </Label>
            <Input
              className="col-span-3"
              id="channel-name"
              placeholder="Enter channel name"
              onChange={(e) => setChannel(
                { ...channel, name: e.target.value }
              )}
              value={channel.name}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="channel-name">
              Channel Url
            </Label>
            <Input
              className="col-span-3"
              id="channel-url"
              placeholder="Enter channel url"
              onChange={(e) => setChannel(
                { ...channel, url: e.target.value }
              )}
              value={channel.url}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="channel-header">
              Channel Headers
            </Label>
            <Input
              className="col-span-3"
              id="channel-header"
              placeholder="Enter channel header"
              onChange={(e) => setChannel(
                { ...channel, headers: e.target.value }
              )}
              value={channel.headers}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="channel-logo">
              Channel Logo
            </Label>
            <Input
              className="col-span-3"
              id="channel-logo"
              placeholder="Enter channel logo"
              onChange={(e) => setChannel(
                { ...channel, logo: e.target.value }
              )}
              value={channel.logo}
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="mr-2" variant="outline">
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
