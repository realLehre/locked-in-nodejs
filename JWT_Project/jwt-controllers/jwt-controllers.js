import jwt from 'jsonwebtoken'

import TaskError from "../../utils/error-class.js";
import {success} from "../../utils/response-body.js";

const login = async (req, res) => {
    const {userName, password} = req?.body;

    if(!userName || userName.trim() === '' || !password || password.trim() ==='') {
        throw new TaskError('Fields can not be empty', 400)
    }

    const userId = Math.floor(Math.random() * 100)

    const token = jwt.sign({userName, userId}, process.env.JWT_SECRET, {expiresIn: '10h'})
    success(res, token, 200)
}

const dashboard = async (req, res) => {
    const {userId, userName} = req.user
    res.status(200).json({
        status: 'success',
        message: `Welcome ${userName} with ID ${userId}`
    })
}

export {login, dashboard}
