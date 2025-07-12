const mongoose = require("mongoose");

// reuse for bookings, drivers and accounts
const permissionsSchema = new mongoose.Schema(
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
        is_super: {
            type: Boolean,
            default: false,
        },
        bookings: {
            type: permissionsSchema,
            default: {},
        },
        drivers: {
            type: permissionsSchema,
            default: {},
        },
        account: {
            type: permissionsSchema,
            default: {},
        },
    },
    // automatically add createdAt and updatedAt by mongoose
    { timestamps: true }
);

// By convention, the name of the Model is singular and UpperCamelCased
module.exports = mongoose.model("Admin", adminSchema);
