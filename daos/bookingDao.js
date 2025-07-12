const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema(
  {
    trip: {
      pickupLocation: {
        type: String,
        required: true,
      },
      dropoffLocation: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      vehicleType: {
        type: String,
        enum: ["sedan", "mpv"],
        required: true,
      },
      ridePurpose: {
        type: String,
        enum: ["airport", "city", "event", "meeting", "others"],
        default: "others",
      },
      paxNumber: {
        type: Number,
        required: true,
        default: 1,
      },
      specialRequests: {
        type: String,
      },
    },

    flights: {
      number: { type: String, default: "" },
      terminal: { type: String, default: "" },
      gate: { type: String, default: "" },
      luggageNumber: { type: Number, default: 0 },
      isGatePickupRequested: {
        type: Boolean,
        default: false,
      },
    },

    contact: {
      bookingName: {
        type: String,
        required: true,
      },
      bookingPhone: {
        type: String,
        required: true,
      },
      bookingEmail: {
        type: String,
        required: true,
      },
    },

    guest: {
      guestName: {
        type: String,
        required: true,
      },

      guestPhone: {
        type: String,
        required: true,
      },
    },

    agreement: {
      isDepositTncChecked: {
        type: Boolean,
        required: true,
        default: false,
      },
      isDepositPaid: {
        type: Boolean,
        default: false,
      },
      isAdminTncChecked: {
        type: Boolean,
        required: true,
        default: false,
      },
    },

    driverAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drivers",
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingsSchema);
