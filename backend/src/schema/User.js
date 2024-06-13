import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ["user"], // add the accepatable user types here
        default: "user",
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);

export default User;