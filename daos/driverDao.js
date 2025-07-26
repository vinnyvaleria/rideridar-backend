const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
    {
        id: {
            type: String,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        hashedPassword: {
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
        },
        hash: {
            salt: {
                type: String,
            },
            iterations: {
                type: Number,
            },
        },
        status: {
            type: String,
            enum: ["active", "inactive", "suspended"],
            default: "active",
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
                enum: ["sedan", "mpv", "luxury"],
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
