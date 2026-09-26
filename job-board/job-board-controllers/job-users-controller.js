import asyncWrapper from "../../utils/asyncHandler.js";

import { getSingleUser, getUsersService, deleteUserService, editUserService } from '../job-board-services/job-users-service.js'
import {success} from "../../utils/response-body.js";
import {deleteJobService, editJobService, findJobService} from "../job-board-services/jobs-service.js";
import NotFound from "../../errors/not-found.js";

const getUsers = asyncWrapper(async (req, res) => {
    const users = await getUsersService();

    success(res, users);
})

const getUser = asyncWrapper(async (req, res) => {
    const id = req.params.id;

    const user  = await getSingleUser(id)

    success(res, user, 200)
})

const updateUser = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const user = await editUserService(data, id)

    success(res, user);
})

const deleteUser = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const user = await deleteUserService(id)

    success(res, user);
})

export {
    getUser,
    getUsers,
    deleteUser,
    updateUser
}
