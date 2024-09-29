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
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

export function AddChannels({ open, onChange, matchId }) {
  const [channels, setChannels] = useState([]);
  const [added, setAdded] = useState([]);
  const [addedChannels, setAddedChannels] = useState([]);

  useEffect(() => {
    fetchChannels();
    fetchMatch();
  }, []);
  const fetchChannels = async () => {
    try {
      const response = await fetch(`/api/channels`);
      if (response.ok) {
        const chanels = await response.json();
        setChannels(chanels);
      }
    } catch (error) {
      console.error("Failed to fetch channels", error);
    }
  };
  const fetchMatch = async () => {
    try {
      const response = await fetch(`/api/matches/${matchId}`);
      if (response.ok) {
        const match = await response.json();
        setAddedChannels(match.channels);
        setAdded(match.channels.map((c) => c._id));
      }
    } catch (error) {
      console.error("Failed to fetch match", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/matches/${matchId}/channels`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channels: addedChannels }),
      });
      if (response.ok) {
        onChange(false); // Close the dialog
      }
    } catch (error) {
      console.error("Failed to add channels", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogTrigger asChild>
        <span></span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add TV Channels</DialogTitle>
          <DialogDescription>
            Select the channels you want to add to your lineup.
          </DialogDescription>
        </DialogHeader>
        <div className="border rounded-lg overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead>Logo</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {channels &&
                channels.map((channel) => (
                  <TableRow key={channel._id}>
                    <TableCell className="font-medium">
                      {channel.name}
                    </TableCell>
                    <TableCell>
                      <img
                        alt={`${channel.name} Logo`}
                        className="rounded-md"
                        height={40}
                        src={channel.logo}
                        style={{
                          aspectRatio: "40/40",
                          objectFit: "cover",
                        }}
                        width={40}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          if (added.includes(channel._id)) {
                            setAdded(added.filter((id) => id !== channel._id));
                            setAddedChannels(
                              addedChannels.filter((c) => c._id !== channel._id)
                            );
                          } else {
                            setAdded([...added, channel._id]);
                            setAddedChannels([...addedChannels, channel]);
                          }
                        }}
                      >
                        {added.includes(channel._id) ? (
                          <CheckIcon className="w-5 h-5" />
                        ) : (
                          <PlusIcon className="w-5 h-5" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Channels</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
