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

// By convention, the name of the Model is singular and UpperCamelCased
module.exports = mongoose.model("Admins", adminSchema);
