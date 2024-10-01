import { useEffect, useState } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the validation schema using Zod
const matchSchema = z.object({
  player1Name: z.string().min(1, "Select Boxer 1"),
  player2Name: z.string().min(1, "Select Boxer 2"),
  date: z.string().min(1, "Select the match date"),
  time: z.object({
    hour: z.string().min(1, "Select hour"),
    minute: z.string().min(0, "Select minute"),
  }),
});

export function AddDialog({ open, onChange }) {
  const [selectedBoxer1, setSelectedBoxer1] = useState("");
  const [selectedBoxer2, setSelectedBoxer2] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState({ hour: "", minute: "" });
  const [isBoxer1DropdownOpen, setIsBoxer1DropdownOpen] = useState(false);
  const [isBoxer2DropdownOpen, setIsBoxer2DropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [Boxers, setBoxers] = useState([]);

  useEffect(() => {
    fetchBoxers().then((data) => {
      setBoxers(data);
    });
  }, []);

  const fetchBoxers = async () => {
    try {
      const response = await fetch("/api/players");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch boxers", error);
      return [];
    }
  };

  const handleBoxerSelect = (setter, isOpenSetter) => (boxer) => {
    setter(boxer);
    isOpenSetter(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = matchSchema.safeParse({
      player1Name: selectedBoxer1,
      player2Name: selectedBoxer2,
      date: selectedDate,
      time: selectedTime,
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
      const response = await fetch("/api/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (response.ok) {
        console.log("Match saved successfully!");
        alert("Match saved successfully!");
        onChange();
      }
    } catch (error) {
      console.error("Failed to save match", error);
      alert("Failed to submit match: " + error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Boxing Match</DialogTitle>
          <DialogDescription>
            Enter the details of the upcoming boxing match.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Boxer selection sections */}
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-right" htmlFor="boxer1">
              Boxer 1
            </Label>
            <Popover
              open={isBoxer1DropdownOpen}
              onOpenChange={setIsBoxer1DropdownOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  className="w-full justify-start text-left font-normal"
                  id="boxer1"
                  variant="outline"
                  onClick={() => setIsBoxer1DropdownOpen(!isBoxer1DropdownOpen)}
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                  {selectedBoxer1 || "Select Boxer 1"}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[300px] p-0">
                <Command>
                  <CommandInput className="h-9" placeholder="Search boxers..." />
                  <CommandEmpty>No boxers found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {Boxers.map((boxer) => (
                        <CommandItem
                          key={boxer._id}
                          onSelect={() =>
                            handleBoxerSelect(
                              setSelectedBoxer1,
                              setIsBoxer1DropdownOpen
                            )(boxer.name)
                          }
                        >
                          {boxer.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-right" htmlFor="boxer2">
              Boxer 2
            </Label>
            <Popover
              open={isBoxer2DropdownOpen}
              onOpenChange={setIsBoxer2DropdownOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  className="w-full justify-start text-left font-normal"
                  id="boxer2"
                  variant="outline"
                  onClick={() => setIsBoxer2DropdownOpen(!isBoxer2DropdownOpen)}
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                  {selectedBoxer2 || "Select Boxer 2"}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[300px] p-0">
                <Command>
                  <CommandInput className="h-9" placeholder="Search boxers..." />
                  <CommandEmpty>No boxers found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {Boxers.map((boxer) => (
                        <CommandItem
                          key={boxer._id}
                          onSelect={() =>
                            handleBoxerSelect(
                              setSelectedBoxer2,
                              setIsBoxer2DropdownOpen
                            )(boxer.name)
                          }
                        >
                          {boxer.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Date and Time selection sections */}
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-right" htmlFor="match-date">
              Match Date
            </Label>
            <Popover open={isDateDropdownOpen}>
              <PopoverTrigger asChild>
                <Button
                  className="w-full justify-start text-left font-normal"
                  id="match-date"
                  variant="outline"
                  onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                >
                  <CalendarDaysIcon className="mr-2 h-4 w-4" />
                  {selectedDate || "Select Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  initialFocus
                  mode="single"
                  onSelect={(date) => {
                    setSelectedDate(date.toLocaleDateString());
                    setIsDateDropdownOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-right" htmlFor="match-time">
              Match Time
            </Label>
            <Popover
              open={isTimeDropdownOpen}
              onOpenChange={setIsTimeDropdownOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  className="w-full justify-start text-left font-normal"
                  id="match-time"
                  variant="outline"
                  onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                >
                  <ClockIcon className="mr-2 h-4 w-4" />
                  {selectedTime.hour || selectedTime.minute
                    ? `${selectedTime.hour.padStart(
                        2,
                        "0"
                      )}:${selectedTime.minute                        .padStart(2, "0")}`
                      : "Select Time"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-4">
                  <div className="flex gap-4">
                    <Select
                      onValueChange={(value) =>
                        setSelectedTime((prev) => ({ ...prev, hour: value }))
                      }
                    >
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => i.toString()).map(
                          (hour) => (
                            <SelectItem key={hour} value={hour}>
                              {hour.padStart(2, "0")}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={(value) =>
                        setSelectedTime((prev) => ({ ...prev, minute: value }))
                      }
                    >
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="Minute" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 60 }, (_, i) => i.toString()).map(
                          (minute) => (
                            <SelectItem key={minute} value={minute}>
                              {minute.padStart(2, "0")}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
  
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Add Match
            </Button>
          </DialogFooter>
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
