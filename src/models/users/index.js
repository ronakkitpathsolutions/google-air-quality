import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        trim: true,
        default: 'user'
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    full_name: {
        type: String,
        default: null,
        trim: true
    },
    profile: {
        type: String,
        default: null,
        trim: true
    },
    gender: {
        type: String,
        default: null,
        trim: true
    },
    DOB: {
        type: Date,
        default: null,
        trim: true
    }
});

export default mongoose.model('Users', userSchema);
