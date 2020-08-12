const usersCtrl = {};

// models
const UserModel = require('../models/User');

/**
 * get all users 
 * @return {Object} users - all users from the database
 */
usersCtrl.getUsers = async (req, res) => {
    const users = await UserModel.find();
    res.json(users);
}

/**
 * get an user from the database
 * @param {String} id - identificator of the required user
 * @return {Object} user - found user 
 */
usersCtrl.getUser = async (req, res) => {
    const user = await UserModel.findById(req.params.id);    
    res.json(user);
}

/**
 * create an user 
 * @param {String} username - name to be saved
 * @return {Object} message - inform user was created
 */
usersCtrl.createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new UserModel({ username });
    await newUser.save();
    res.json({message: "user created"});
}

/**
 * update an user 
 * @param {String} id - identificator of the required user
 * @param {String} username - name to be saved
 * @return {Object} message - inform user was updated
 */
usersCtrl.updateUser = async (req, res) => {
    const { username } = req.body;
    await UserModel.findByIdAndUpdate(req.params.id, {username});
    res.json({message: "user updated"});
}

/**
 * delete an user 
 * @param {String} id - identificator of the required user
 * @return {Object} message - inform user was deleted
 */
usersCtrl.deleteUser = async (req, res) => {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({message: "user deleted"});
}


module.exports = usersCtrl;