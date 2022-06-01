const User = require("../models/Users");
const { ROLES } = require("../models/Roles");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).json({ message: "The user already exists" });

  const email = await User.findOne({ email: req.body.email });
  if (email) return res.status(400).json({ message: "The email already exists" });

  next();
};

const checkRolesExisted = (req, res, next) => {
  // try {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          return res.status(400).json({message: `Rol ${req.body.roles[i]} does not exists`});
        }
      }
    }

    next();
  // } catch (error) {
    // return res.status(401).json({ message: "Can't create this user" });
  // }
};

module.exports = {
  checkRolesExisted,
  checkDuplicateUsernameOrEmail
};
