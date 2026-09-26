import User from '../job-board-models/job-user-model.js'
import BadRequest from "../../errors/bad-request.js";
import NotFound from "../../errors/not-found.js";
import Jobs from "../job-board-models/jobs-model.js";


const getUsersService = async () => {
    return await User.find()
}

const getSingleUser = async (id) => {
    const user = await User.findById(id).select('-password')

    if(!user) {
        throw new NotFound('User not found')
    }

    return user
}

const deleteUserService = async (id) => {
    const user  = await User.deleteOne({_id: id});
    if(!user) {
        throw new NotFound('User not found')
    }
    if(user.deletedCount === 0) {
        throw new NotFound('User not found')
    }
    return user
}

const editUserService = async (data, id) => {
    if(!data || Object.keys(data).length === 0) {
        throw new BadRequest('Body is required')
    }

    const user = await User.findOneAndUpdate(
        {_id: id},
        {$set: data},
        {returnDocument: 'after'}
    )

    if(!user) {
        throw new NotFound('Job not found')
    }

    return user
}


export {
    getUsersService,
    getSingleUser,
    deleteUserService,
    editUserService
}
