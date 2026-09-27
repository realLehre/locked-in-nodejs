import User from '../job-board-models/job-user-model.js'

const register = async (data) => {
    const user = await User.create(data)
    return user
}

const login = async (email) => {
    const user = await User.findOne({email});
    return user;
}

const changePassword = async (password, email) => {
    const user = await User.findOne({email});
    const hashedPassword = await user.hashPassword(password)
    return User.findOneAndUpdate({email}, {password: hashedPassword})
}

export {
    register,
    login,
    changePassword
}
