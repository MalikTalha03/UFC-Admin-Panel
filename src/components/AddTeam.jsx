import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Define the validation schema using Zod
const teamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
});

export function AddTeamDialog({ open, onChange }) {
  const [teamName, setTeamName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = teamSchema.safeParse({
      name: teamName,
    });

    if (!result.success) {
      console.error(result.error);
      alert(
        "Validation failed: " +
          result.error.issues.map((issue) => issue.message).join(", ")
      );
      return;
    }

    // Replace '/api/players' with your actual endpoint
    try {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      alert("Team added successfully!");
      onChange(); // Close dialog or refresh list
    } catch (error) {
      console.error("Failed to add team", error);
      alert("Failed to add team: " + error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Team</DialogTitle>
          <DialogDescription>
            Enter the details of the new team.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="team-name">Team Name:</Label>
            <Input
              id="team-name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Add Team</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
