import mongoose from 'mongoose';

const SubTaskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: null,
        },
        is_complete: {
            type: Boolean,
            default: false,
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timeStamps: true,
    },
);

const SubTask = mongoose.model('subtasks', SubTaskSchema);

export default SubTask;