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
const playerSchema = z.object({
  name: z.string().min(1, "Boxer name is required"),
});

export function AddTeamDialog({ open, onChange }) {
  const [boxerName, setBoxerName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = playerSchema.safeParse({
      name: boxerName,
    });

    if (!result.success) {
      console.error(result.error);
      alert(
        "Validation failed: " +
          result.error.issues.map((issue) => issue.message).join(", ")
      );
      return;
    }

    try {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      alert("Boxer added successfully!");
      onChange(); // Close dialog or refresh list
    } catch (error) {
      console.error("Failed to add boxer", error);
      alert("Failed to add boxer: " + error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Boxer</DialogTitle>
          <DialogDescription>
            Enter the details of the new boxer.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="boxer-name">Boxer Name:</Label>
            <Input
              id="boxer-name"
              value={boxerName}
              onChange={(e) => setBoxerName(e.target.value)}
              placeholder="Enter boxer name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Add Boxer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
