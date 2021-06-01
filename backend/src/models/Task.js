import mongoose from 'mongoose';
import Image from './Image';
import SubTask from './SubTask';

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    background: {
        type: String,
        default: 'transparent'
    },
    is_complete : {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'images'
        }
    ],
    subtasks : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subtasks'
        }
    ]
}, {
    timestamps: true
})

TaskSchema.pre('remove', async function (next) {
    const task = this;

    await Image.deleteMany({ task: task._id });
    await SubTask.deleteMany({ task: task_id });

    next();
})


const Task = mongoose.model('tasks', TaskSchema);

export default Task;