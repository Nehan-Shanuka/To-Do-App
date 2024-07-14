import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    details: {
        type: String,
    },
});

export const Task = mongoose.model("Task", taskSchema);