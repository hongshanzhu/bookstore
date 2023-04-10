const User = require("../models/User");

class AccountService {
  async update(data) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        data.id,
        {
          $set: data.account,
        },
        { new: true }
      );

      return {
        status: "ok",
        msg: "用户账号更新成功",
        account: updatedUser,
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  async getUser(id) {
    try {
      const user = await User.findById(id);

      if (!user) {
        return res.json({ status: "bad", msg: "通过ID找不到用户" });
      }

      return user;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getUsers() {
    try {
      const users = await User.find();

      if (!users) {
        return res.json({ status: "bad", msg: "用户找不到" });
      }

      return users;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteUser(id) {
    try {
      const result = await User.findByIdAndDelete(id);
      if (!result) {
        return res.json({ status: "bad", msg: "删除用户失败" });
      }
      return { status: "ok", msg: "删除用户成功" };
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = AccountService;
