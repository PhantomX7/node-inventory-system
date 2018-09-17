const { User, Role } = require("../models");
const jsonwebtoken = require("jsonwebtoken");

const getRoles = async (req, res) => {
  const roles = await Role.findAll({
    attributes: ["id", "name"],
    // include: [{ model: User, attributes: ["username"] }]
  });
  return res.json({ roles });
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({
      where: {
        username
      },
      include: [
        {
          model: Role
        }
      ]
    });

    let isMatch = await user.comparePassword(password);
    if (isMatch) {
      const token = jsonwebtoken.sign(
        { id: user.id, username: user.username, role: user.Role.name },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        user: {
          username,
          role: user.Role.name
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
    const { username, password, roleId } = req.body;

    const user = await User.create({ username, password, roleId });
    const role = await user.getRole();

    const token = jsonwebtoken.sign(
      { id: user.id, username: user.username, role: role.name },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    // return json web token
    return res.status(200).json({
      user: {
        username,
        role: role.name
      },
      token
    });
  } catch ({ errors }) {
    res.status(400).json({ error: errors[0].message });
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
