import { addDays, format } from "date-fns";

const dayMap = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6,
};

export function generateUpcomingSlots(availability, daysAhead = 14) {
  const slots = [];
  const today = new Date();
  const parsed = availability.split("||");

  for (let i = 0; i <= daysAhead; i++) {
    const futureDate = addDays(today, i);
    const dayName = format(futureDate, "EEEE"); 
    const dateStr = format(futureDate, "yyyy-MM-dd"); 
    const displayLabel = format(futureDate, "EEEE M/d/yy"); 

    parsed.forEach(entry => {
      const [availDay, range] = entry.split(" ");
      if (availDay === dayName) {
        const [start, end] = range.split("-");
        slots.push({ date: dateStr, start, end, displayLabel });
      }
    });
  }

  return slots;
}
