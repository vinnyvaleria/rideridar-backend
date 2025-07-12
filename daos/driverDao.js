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
        },
        vehicle_types: {
            // store strings of vehicle types
            type: [String],
            default: [],
        },
        car_plate: {
            type: String,
            default: "",
        },
        // store booking id instead of object as mongoDB has a file limit
        // if bookings continuously change, the object within driver will need to be updated as well
        bookings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Booking",
                default: [],
            },
        ],
    },
    // automatically add createdAt and updatedAt by mongoose
    { timestamps: true }
);

// By convention, the name of the Model is singular and UpperCamelCased
module.exports = mongoose.model("Driver", driverSchema);
