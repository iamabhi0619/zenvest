const { Finathone } = require("../model/finathoneUser");
const { Member } = require("../model/member");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Finathone.find().sort({ _id: -1 });
    res.status(200).json({ status: "OK", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "ERROR",
      message: "An error occurred while fetching users",
    });
  }
};

exports.markAttendance = async (req, res) => {
  const { uniqueId, slot } = req.body;
  const currentDateTime = new Date();
  const memberId = req.user.id;

  try {
    // Find participant
    const participant = await Finathone.findOne({ regNumber: uniqueId });
    if (!participant) {
      return res
        .status(404)
        .json({ status: "3", message: "Participant not found" });
    }

    // Determine today's date string in 'YYYY-MM-DD' format
    const todayDate = currentDateTime.toISOString().slice(0, 10);

    // Check if attendance is already marked for this slot
    const attendanceMarked = participant.attendance.some((att) => {
      return att.slot === slot && att.day === todayDate;
    });

    if (attendanceMarked) {
      return res
        .status(400)
        .json({
          status: "2",
          message: "Attendance already marked for this slot.",
          data: participant,
        });
    }

    // Find the member who scanned
    const member = await Member.find({ id: memberId });
    if (!member) {
      return res
        .status(404)
        .json({ status: "3", message: "Member not found." });
    }

    // Mark attendance
    participant.attendance.push({
      day: todayDate,
      slot: slot,
      scannedBy: member._id,
      date: currentDateTime,
    });

    await participant.save();

    res
      .status(200)
      .json({
        status: "1",
        message: `Attendance marked for slot ${slot}`,
        data: participant,
      });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res
      .status(500)
      .json({
        status: "3",
        message: "An error occurred while marking attendance.",
      });
  }
};

exports.getSlots = (req, res) => {
  const slots = {
    "2024-11-13": [
      { slot: "9-11", start: "09:00", end: "11:00" },
      { slot: "12-2", start: "12:00", end: "14:00" },
      { slot: "3-4", start: "15:00", end: "16:00" },
    ],
    "2024-11-14": [
      { slot: "9-10", start: "09:00", end: "10:00" },
      { slot: "10-12", start: "10:00", end: "12:00" },
      { slot: "12-4", start: "12:00", end: "16:00" },
    ],
  };

  // Convert server time (Oregon time) to IST
  const currentDate = new Date();
  const offsetIST = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
  const currentDateIST = new Date(currentDate.getTime() + offsetIST);

  const today = currentDateIST.toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format based on IST
  const currentTimeIST = currentDateIST.getHours() * 60 + currentDateIST.getMinutes(); // Current time in minutes in IST

  if (slots[today]) {
    const availableSlots = slots[today];

    // Filter available slots based on IST current time
    const filteredSlots = availableSlots.filter((slot) => {
      const slotStartTime = slot.start.split(":").map(Number);
      const slotEndTime = slot.end.split(":").map(Number);

      const slotStartInMinutes = slotStartTime[0] * 60 + slotStartTime[1];
      const slotEndInMinutes = slotEndTime[0] * 60 + slotEndTime[1];

      const thirtyMinutesBeforeSlotStart = slotStartInMinutes - 30;

      return (
        currentTimeIST >= thirtyMinutesBeforeSlotStart &&
        currentTimeIST < slotEndInMinutes
      );
    });

    if (filteredSlots.length === 0) {
      return res.status(200).json({ message: "No available slots" });
    }

    return res.status(200).json(filteredSlots);
  }

  return res.status(404).json({ message: "No event on this date" });
};
