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
  const { uniqueId } = req.body;
  const day = new Date();
  const memberId = req.user.id;

  try {
    const participant = await Finathone.findOne({ regNumber: uniqueId });
    if (!participant) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "Participant not found" });
    }

    const isAttendanceMarked = participant.attendance.some(
      (attendanceRecord) => {
        return (
          (attendanceRecord.day === "11-NOV" && day.getDate() === 11) ||
          (attendanceRecord.day === "14-NOV" && day.getDate() === 14)
        );
      }
    );
    if (isAttendanceMarked) {
      return res
        .status(400)
        .json({ status: "2", message: "Attendance already marked for today." });
    }

    const member = await Member.findOne({ id: memberId });
    if (!member) {
      return res.status(404).json({ status: "3", message: "Member not found" });
    }

    let eventDay;
    if (day.getDate() === 11) {
      eventDay = "11-NOV";
    } else if (day.getDate() === 14) {
      eventDay = "14-NOV";
    } else {
      return res
        .status(400)
        .json({ status: "2", message: "Invalid day for event." });
    }

    participant.attendance.push({
      day: eventDay,
      scannedBy: member._id,
      date: day,
    });

    await participant.save();
    res
      .status(200)
      .json({ status: "1", message: `Attendance marked for ${eventDay}` });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res
      .status(500)
      .json({
        status: "ERROR",
        message: "An error occurred while marking attendance",
      });
  }
};
