"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'please fill first name']
    },
    lastName: {
        type: String,
        required: [true, 'please fill second name']
    },
    email: {
        type: String,
        required: [true, 'please fill email']
    },
    mobile: {
        type: Number,
        required: [true, 'please fill mobile']
    },
    password: {
        type: String,
    },
    isGoogleUser: {
        type: Boolean,
        default: false
    },
    isHosted: {
        type: Boolean,
        default: false
    }
});
const User = (0, mongoose_1.model)('User', userSchema, 'users');
exports.default = User;
