import { allTasks, getTask, update, addTask, deleteT } from '../taskServices/taskService.js'
import { success } from '../../utils/response-body.js'
import asycnWrapper from '../../utils/asyncHandler.js'
import TaskError from "../../utils/error-class.js";

const getTasks = asycnWrapper(async (req, res) => {
    const tasks = await allTasks()

    success(res, tasks)
})

const createTask = asycnWrapper(async (req, res) => {
    const task = await addTask(req.body);

    success(res, task, 201, 'Task added');
})

const getSingleTask = asycnWrapper(async (req, res) => {
    const {id} = req.params;
    const task = await getTask(id)
    if (!task) {
        taskNotFoundError();
    }
    success(res, task, 200)
})

const updateTask = asycnWrapper(async (req, res) => {
    const task = await update(req.params.id, req.body)
    if(!task) {
        taskNotFoundError();
    }
    success(res, task, 200);
})

const deleteTask = asycnWrapper(async (req, res) => {
    const task = await deleteT(req.params.id)
    if(!task) {
        taskNotFoundError();
    }
    success(res, task, 200);
})

const taskNotFoundError = () => {
    throw new TaskError('Task not found', 404)
}

export {
    getTasks,
    getSingleTask,
    updateTask,
    createTask,
    deleteTask
}
