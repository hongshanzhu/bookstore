const User = require("../models/User");
const jwt = require("jsonwebtoken");

class AccountMiddleware {
  async update(req, res, next) {
    try {
      const {username} = req.body
      const existUserWithUsername = await User.findOne({ username });

      if (
        existUserWithUsername &&
        existUserWithUsername._id.toString() !== decodedUser.user._id
      ) {
        return res.json({
          status: "bad",
          msg: "数据库中的ID与当前用户的ID不一致!",
        });
      }

      if (username === process.env.ADMIN_LOGIN) {
        return res.json({
          status: "bad",
          msg: "当前用户是admin账号, 不允许更改",
        });
      }

      next()
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = AccountMiddleware;
