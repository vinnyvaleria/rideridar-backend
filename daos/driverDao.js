const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        jwt: {
            type: String,
            required: true,
        },
        vehicle: {
            plateNumber: {
                type: String,
                required: true,
                default: "unassigned",
            },
            model: {
                type: String,
                required: true,
                default: "unassigned",
            },
            vehicleType: {
                // store string of vehicle types
                type: String,
                enum: ["sedan", "mpv"],
                required: true,
                default: "unassigned",
            },
        },
    },
    // automatically add createdAt and updatedAt by mongoose
    { timestamps: true }
);

// By convention, the name of the Model is singular and UpperCamelCased
module.exports = mongoose.model("Drivers", driverSchema);
