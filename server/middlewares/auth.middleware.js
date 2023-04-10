const User = require("../models/User");
const bcrypt = require("bcrypt");

class AuthMiddleware {
  async register(req, res, next) {
    try {
      const { username, password, fullname, gender } = req.body;
      if (!username || !password || !fullname || !gender) {
        return res.json({
          status: "bad",
          msg: "用户名和密码是必选项",
        });
      }

      if (username.length < 4) {
        return res.json({
          status: "bad",
          msg: "用户名长度不允许小于4!",
        });
      }

      if (username.length > 20) {
        return res.json({
          status: "bad",
          msg: "用户名长度不允许大于20!",
        });
      }

      if (username === process.env.ADMIN_LOGIN) {
        return res.json({
          status: "bad",
          msg: "admin用户不允许注册",
        });
      }

      if (password.length < 4) {
        return res.json({
          status: "bad",
          msg: "密码长度不允许小于4",
        });
      }
      console.log('查找用户名:', username)
      const existUser = await User.findOne({ username });

      if (existUser) {
        return res.json({
          status: "bad",
          msg: "用户名已经存在",
        });
      }

      next();
    } catch (error) {
      console.log(error.message);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.json({
          status: "bad",
          msg: "用户名和密码是必选项",
        });
      }

      const existUser = await User.findOne({ username });

      if (!existUser) {
        return res.json({
          status: "bad",
          msg: "用户名不存在",
        });
      }

      const comparedPass = await bcrypt.compare(password, existUser.password);

      if (!comparedPass) {
        return res.json({
          status: "bad",
          msg: "密码不正确",
        });
      }
      console.log('middleware login success')
      next();
    } catch (error) {
      console.log(error.message);
    }
  }

  async admin(req, res, next) {
    try {
      const {username, password} = req.body
      
      if (!username || !password) {
        return res.json({ status: "bad", msg: "用户名和密码是必选项!" });
      }

      if (username !== process.env.ADMIN_LOGIN) {
        return res.json({ status: "bad", msg: "admin用户名不正确" });
      }

      if (password !== process.env.ADMIN_PASS) {
        return res.json({ status: "bad", msg: "admin密码不正确" });
      }

      next()
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = AuthMiddleware;
