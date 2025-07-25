const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
    {
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

// pre-save hook to generate 'id'
driverSchema.pre("save", function (next) {
    if (!this.id) {
        // get initials
        const namePart = this.name
            .split(" ")
            .map((word) => word[0].toUpperCase())
            .join("");

        // last 3 digits of phone
        const phonePart = this.phone.toString().slice(-3);

        // first letter of vehicleType
        const vehicleTypePart = this.vehicle.vehicleType[0].toUpperCase();
        // last 3 alphanumerics of plateNumber
        const platePart = this.vehicle.plateNumber
            .replace(/\s+/g, "")
            .slice(-3)
            .toUpperCase();
        // combined vehicle parts
        const vehiclePart = `${vehicleTypePart}${platePart}`;

        this.id = `D-${namePart}${phonePart}-${vehiclePart}`;
    }
    next();
});

// By convention, the name of the Model is singular and UpperCamelCased
module.exports = mongoose.model("Drivers", driverSchema);
