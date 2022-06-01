const User = require('../models/Users')

const createUser = async (req, res) => {
    const {username, email, password, roles} = req.body // Destructuring

    const newUser = new User({username, email, password, roles})

    const userSaved = await newUser.save()

    res.status(201).json(userSaved) // agregandole un código de status
}

const getUser = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId)
    res.status(200).json(user)
}

const updateUserById = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true // Para que mongo pase el usuario nuevo y no el viejo
    })
    res.status(200).json(updatedUser)
}

const deleteUserById = async (req, res) => {
    const {userId} = req.params
    await User.findByIdAndDelete(userId)
    res.status(204).json()
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    updateUserById,
    deleteUserById
}