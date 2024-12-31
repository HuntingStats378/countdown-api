const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

function padZero(number) {
    return String(number).padStart(2, '0');
}

app.get("/api/countdown/:offset", async (req, res) => {
  try {
    const currentDate = new Date();
                    let offsetStr = req.params.offset; // Full timezone string like "UTC+05:30" or "UTC-03:00"
                    let sign = offsetStr.charAt(3) === '-' ? -1 : 1; // Determine if it's positive or negative offset
                    let offsetParts = offsetStr.slice(4).split(":"); // Get the hour and minute parts
                    let offsetHours = parseInt(offsetParts[0]) || 0; // Default to 0 if not provided
                    let offsetMinutes = parseInt(offsetParts[1]) || 0; // Default to 0 if not provided
                    let totalOffsetMinutes = sign * (offsetHours * 60 + offsetMinutes); // Convert to total minutes
                    let targetDate = new Date("2025-01-01T00:00:00Z"); // Set target date to Jan 1, 2025 in UTC
                    targetDate.setMinutes(targetDate.getMinutes() - totalOffsetMinutes); // Adjust the target date by the offset in minutes
                    let timeDiff = targetDate - currentDate;
                    let daysUntil2025 = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                    let hoursUntil2025 = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    let minutesUntil2025 = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                    let secondsUntil2025 = Math.floor((timeDiff % (1000 * 60)) / 1000);
                    res.send(`The time until ${targetDate} for ${offsetStr} is ${padZero(daysUntil2025)}:${padZero(hoursUntil2025)}:${padZero(minutesUntil2025)}:${padZero(secondsUntil2025)}!`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch information");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
