import expressAsyncHandler from "express-async-handler";
import User from "../models/users.js";
import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'

dotenv.config();
//sendgrid's API Key
sgMail.setApiKey(process.env.SGMAIL_API);

//List out all users from Users collection
const getAllUsers = expressAsyncHandler(async (req,res) => {
try {
  const users = await User.find ({}).select('-password')
  res.status(200).json({users})
} catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 'Internal Server Error'})
}
});

//delete a user
const deleteUser = expressAsyncHandler(async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    try {
      const user = await User.findByIdAndDelete({ _id: id, role: 'User' });
      res.status(200).send({ status: "User deleted!", user });
    } catch (err) {
      console.log(err, ">>>>>>>>>>>> error");
      res.status(400).send({ status: "error deleting user data!" });
    }
});

//role change from User to Admin
const changeRole = expressAsyncHandler (async (req, res) => {
    const id = req.params.id;
    const role = req.params.role;
    try {
        const user = await User.findOne({ _id: id});
        user.role = role;
        user.save();
        res.status(200).send({ status: "User role is changed!", user });
      } catch (err) {
        console.log(err, ">>>>>>>>>>>> error");
        res.status(400).send({ status: "error deleting user data!" });
      }
})

//Reset Password for any user
const resetPassword = expressAsyncHandler (async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const password = req.body.password;
  try {
      const user = await User.findOne({ _id: id});
      user.password = password;
      user.save();
      res.status(200).send({ status: "User's password changed!", user });
    } catch (err) {
      console.log(err, ">>>>>>>>>>>> error");
      res.status(400).send({ status: "error resetting password!" });
    }
})

//isActive change "true" or "false", false for login disabled
const changeIsActive = expressAsyncHandler(async (req, res)=>{
    const id = req.params.id;
    const isActive = req.params.isActive;
    try {
        const user = await User.findOne({ _id: id});
        user.isActive = isActive;
        user.save();
        res.status(200).send({ status: "User status is changed!", user });
      } catch (err) {
        console.log(err, ">>>>>>>>>>>> error");
        res.status(400).send({ status: "error deleting user data!" });
      }
})

export {getAllUsers, deleteUser, changeRole, changeIsActive, resetPassword}