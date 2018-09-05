const { User, Role } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const getRoles = async (req, res) => {
  const roles = await Role.find({}, { role: 1 }).exec();
  console.log(roles);
  return res.json({ roles });
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({
      username
    })
      .populate("role_id")
      .exec();

    const {
      id,
      role_id: { role }
    } = user;
    let isMatch = await user.comparePassword(password);
    if (isMatch) {
      const token = jsonwebtoken.sign(
        { id: user.id, username: user.username, role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        user: {
          username,
          role
        },
        token
      });
    } else {
      return res.status(400).json({ error: "invalid credentials" });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: "invalid credentials" });
  }
};

const signup = async (req, res) => {
  try {
    const { username, password, role_id } = req.body;

    const user = await User.create({ username, password, role_id });
    const { role } = await Role.findById(role_id);
    const token = jsonwebtoken.sign(
      { id: user.id, username: user.username, role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // return json web token
    return res.status(200).json({
      user: {
        username,
        role
      },
      token
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: "username was taken" });
    }
  }
};

const getMe = async (req, res) => {
  const { username, role } = req.user;

  return res.status(200).json({
    user: {
      username,
      role
    }
  });
};

module.exports = { signin, signup, getRoles, getMe };
