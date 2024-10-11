const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const EventSchema = new mongoose.Schema(
  {
    eventId: {
      type: Number,
      unique: true,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    guestSpeakers: [
      {
        type: String,
        trim: true,
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    eventType: {
      type: String,
      enum: ["Workshop", "Seminar", "Conference", "Meetup", "Webinar", "Hackathon"],
      default: "Meetup",
    },
    duration: {
      type: Number,
    },
    maxCapacity: {
      type: Number,
    },
    registrationLink: {
      type: String,
      trim: true,
    },
    organizer: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },
    ticketPrice: {
      type: Number,
      default: 0,
    },
    sponsors: [
      {
        type: String,
        trim: true,
      },
    ],
    photos: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

EventSchema.plugin(AutoIncrement, { inc_field: "eventId", start_seq: 101 });

module.exports = mongoose.model("Event", EventSchema);
