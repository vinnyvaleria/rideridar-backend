const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema(
  {
    trip: {
      pickup: {
        type: String,
        required: true,
      },
      dropoff: {
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
        enum: ["flight", "local"],
        default: "flight",
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

    flight: {
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
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },

    guest: {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },
    },

    bookingReview: {
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
      enum: ["pending", "confirmed", "inprogress", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingsSchema);
