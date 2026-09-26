import User from '../job-board-models/job-user-model.js'

const register = async (data) => {
    const user = await User.create(data)
    return user
}

const login = async (email) => {
    const user = await User.findOne({email});
    return user;
}

export {
    register,
    login
}
