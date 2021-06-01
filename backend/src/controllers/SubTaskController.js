import SubTask from '../models/SubTask';

export const getSubTasks = async (req,res) => {
    try {
        const subtasks = await SubTask.find({ task : req.params.task });
        console.log(subtasks);
        res.send({
            error: {
                status: false,
                message: e.message
            },
            data: {
                subtasks,
                message: 'Data collection is sent'
            }
        })
    } catch(e) {
        res.status(500).send({
            error: {
                status: true,
                message: e.message
            },
            data: null
        })
    }
}

export const createSubTask = async (req,res) => {
    try {
        const subtask = new SubTask({
            ...req.body,
            task: req.params.task
        });
        await subtask.save();
        res.send({
            error: {
                status: false,
                message: ''
            },
            data: {
                subtask,
                message: 'A subtask is created'
            }
        })
    } catch(e) {
        res.status(500).send({
            error: {
                status: true,
                message: e.message
            },
            data: null
        })
    }
}

export const getSubTaskById = async (req,res) => {
    try {
        const subTask = await SubTask.findOne({ _id: req.params.subtask, owner: req.user._id });
        if (!subtask) {
            res.status(404).send({
                error: {
                    status: true,
                    message: e.message,
                },
                data: null,
            });
        }

        res.send({
            error: {
                status: false,
                message : ''
            },
            data: {
                subTask,
                message: 'A subtask is created'
            }
        });
    } catch(e) {
        res.status(500).send({
            error: {
                status: true,
                message: e.message
            },
            data: null
        })
    }
}

export const updateSubTask = async (req,res) => {
    try {

    } catch(e) {
        res.status(500).send({
            error: {
                status: true,
                message: e.message
            },
            data: null
        })
    }
}

export const deleteSubTask = async(req,res) => {
    try {
        const subtask = await SubTask.findOne({ _id : req.params.subtask, owner: req.user._id});
        if(!subtask) {
            res.status(404).send({
                error: {
                    status: true,
                    message: e.message
                }, 
                data : null
            })
        }

        await subtask.delete();

        res.send({
            error:{
                status: false,
                message: ''
            },
            data : {
                subtask,
                message: 'Subtask is deleted'
            }
        })
    } catch(e) {
        res.status(500).send({
            error: {
                status: true,
                message: e.message
            },
            data: null
        })
    }
}