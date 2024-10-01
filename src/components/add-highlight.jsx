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
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandItem,
  CommandGroup,
  CommandList,
} from "@/components/ui/command";
import { set } from "mongoose";

export function AddHighlight({ open, onChange }) {
  const [highlight, setHighlight] = useState({
    team1: { name: "", score: "" },
    team2: { name: "", score: "" },
    channelLink: "",
    headers: "",
  });
  const [teams, setTeams] = useState([]);
  const [isTeam1DropdownOpen, setIsTeam1DropdownOpen] = useState(false);
  const [isTeam2DropdownOpen, setIsTeam2DropdownOpen] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/players");
        if (!response.ok) throw new Error("Failed to fetch teams");
        const data = await response.json();
        console.log("Fetched teams:", data); // Debugging log
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/highlights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player1: highlight.team1,
          player2: highlight.team2,
          channelLink: highlight.channelLink,
          headers: highlight.headers,
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      alert("Highlight added successfully!");
      onChange(); // Close dialog or refresh list
    } catch (error) {
      console.error("Failed to add highlight", error);
      alert("Failed to add highlight: " + error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Highlight</DialogTitle>
          <DialogDescription>
            Create a new highlight with team selections and scores.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Team 1 Selection */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="team1">
                Team 1
              </Label>
              <Popover
                open={isTeam1DropdownOpen}
                onOpenChange={setIsTeam1DropdownOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    className="col-span-3 w-full justify-start text-left font-normal"
                    id="team1"
                    variant="outline"
                    onClick={() => setIsTeam1DropdownOpen(!isTeam1DropdownOpen)}
                  >
                    <SearchIcon className="mr-2 h-4 w-4" />
                    {highlight.team1.name || "Select Team 1"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[300px] p-0">
                  <Command>
                    <CommandInput
                      className="h-9"
                      placeholder="Search teams..."
                    />
                    <CommandEmpty>No teams found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {teams.map((team) => (
                          <CommandItem
                            key={team._id}
                            onSelect={() => {
                              setHighlight((prev) => ({
                                ...prev,
                                team1: { ...prev.team1, name: team.name },
                              }));
                              setIsTeam1DropdownOpen(false);
                            }}
                          >
                            {team.name}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            {/* Team 1 Score */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="team1-score">
                Score 1
              </Label>
              <Input
                className="col-span-3"
                id="team1-score"
                placeholder="Enter Team 1 score"
                onChange={(e) =>
                  setHighlight({
                    ...highlight,
                    team1: { ...highlight.team1, score: e.target.value },
                  })
                }
                value={highlight.team1.score}
              />
            </div>
            {/* Team 2 Selection */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="team2">
                Team 2
              </Label>
              <Popover
                open={isTeam2DropdownOpen}
                onOpenChange={setIsTeam2DropdownOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    className="col-span-3 w-full justify-start text-left font-normal"
                    id="team2"
                    variant="outline"
                    onClick={() => setIsTeam2DropdownOpen(!isTeam2DropdownOpen)}
                  >
                    {highlight.team2.name || "Select Team 2"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[300px] p-0">
                  <Command>
                    <CommandInput
                      className="h-9"
                      placeholder="Search teams..."
                    />
                    <CommandEmpty>No teams found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {teams.map((team) => (
                          <CommandItem
                            key={team._id}
                            onSelect={() => {
                              setHighlight((prev) => ({
                                ...prev,
                                team2: { ...prev.team2, name: team.name },
                              }));
                              setIsTeam2DropdownOpen(false);
                            }}
                          >
                            {team.name}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            {/* Team 2 Score */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="team2-score">
                Score 2
              </Label>
              <Input
                className="col-span-3"
                id="team2-score"
                placeholder="Enter Team 2 score"
                onChange={(e) =>
                  setHighlight({
                    ...highlight,
                    team2: { ...highlight.team2, score: e.target.value },
                  })
                }
                value={highlight.team2.score}
              />
            </div>
            {/* Channel Link */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="channel-link">
                Channel Link
              </Label>
              <Input
                className="col-span-3"
                id="channel-link"
                placeholder="Enter channel link"
                onChange={(e) =>
                  setHighlight({ ...highlight, channelLink: e.target.value })
                }
                value={highlight.channelLink}
              />
            </div>
            {/* Headers */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="headers">
                Headers
              </Label>
              <Input
                className="col-span-3"
                id="headers"
                placeholder="Enter headers"
                onChange={(e) =>
                  setHighlight({ ...highlight, headers: e.target.value })
                }
                value={highlight.headers}
              />
            </div>
            
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CalendarDaysIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
