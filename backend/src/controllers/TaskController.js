import Task from '../models/Task';
import SubTask from '../models/SubTask';


export const getAllTodo = async (req, res) => {
    try {
        let tasks = await Task.find({ owner: req.user._id }).populate(['subtasks','images']);
        res.send({
            error: {
                status: false,
                message: ''
            }, 
            data: {
                tasks
            }
        });
    } catch (e) {
        res.status(500).send({
            error: {
                status: true,
                message: e.message,
            },
            data: null,
        });
    }
};

export const createTodo = async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id,
        });
        await task.save();
        res.send({
            error: {
                status: false,
                message: ''
            },
            data: {
                task
            }
        });
    } catch (e) {
        res.status(500).send({
            error: {
                status: true,
                message: e.message,
            },
            data: null,
        });
    }
};

export const getTodoById = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id,
        })
            .populate('subtasks')
            .exec();

        if (!task) {
            res.status(404).send({
                error: {
                    status: true,
                    message: 'Task not found'
                },
                data : null
            });
        }
        res.send({
            error: {
                status: false,
                message: ''
            },
            data: {
                task
            }
        });
    } catch (e) {
        res.status(500).send({
            error: {
                status: true,
                message: e.message,
            },
            data: null,
        });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.status = req.body.status;
        await task.save();

        // //update his subtasks to be completed
        // //this action allows only when todo is set to complete
        // if (req.body.status === true) {
        //     todo.subtasks.forEach(async (subtask) => {
        //         const task = await SubTask.findById(subtask._id);
        //         task.status = true;
        //         await task.save();
        //     });
        // }
        res.send({
            error: {
                status: false,
                message: '',
            },
            data: {
                task,
                message: 'Task is deleted',
            },
        });
    } catch (e) {
         res.status(500).send({
             error: {
                 status: true,
                 message: e.message,
             },
             data: null,
         });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });
        if (!task) {
            res.status(404).send({
                error: {
                    status: true,
                    message: 'Todo not found',
                },
                data: null,
            });
        }
        res.send({
           error: {
               status: false,
               message: ''
           },
           data: {
               task,
               message: 'Task is deleted'
           }
        });
    } catch (e) {
        res.status(500).send({
            error: {
                status: true,
                message: e.message,
            },
            data: null,
        });
    }
};