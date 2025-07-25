const mongoose = require("mongoose");

// reuse for bookings, drivers and accounts
const permissionSchema = new mongoose.Schema(
    {
        add: { type: Boolean, default: false },
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
    },
    { _id: false }
);

const adminSchema = new mongoose.Schema(
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
            type: String,
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
        isSuperAdmin: {
            type: Boolean,
            default: false,
        },
        permissionDetails: {
            bookings: {
                type: permissionSchema,
                default: {},
            },
            drivers: {
                type: permissionSchema,
                default: {},
            },
            account: {
                type: permissionSchema,
                default: {},
            },
        },
    },
    // automatically add createdAt and updatedAt by mongoose
    { timestamps: true }
);

// pre-save hook to generate 'id'
adminSchema.pre("save", function (next) {
    if (!this.id) {
        // get initials
        const namePart = this.name
            .split(" ")
            .map((word) => word[0].toUpperCase())
            .join("");

        // last 3 digits of phone
        const phonePart = this.phone.toString().slice(-3);

        // super admin part
        const superAdminPart = this.isSuperAdmin ? "S" : "R";

        this.id = `A-${namePart}${phonePart}${superAdminPart}`;
    }
    next();
});

// By convention, the name of the Model is singular and UpperCamelCased
module.exports = mongoose.model("Admins", adminSchema);
