import UserModel from "../models/UserModel.js";
import { Op } from "sequelize";

class UserDao {
  static async createUser(userData) {
    try {
      const user = await UserModel.create(userData);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create user");
    }
  }

  static async getUserById(userId) {
    try {
      const user = await UserModel.findByPk(userId);
      return user;
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  static async getUserByEmpNo(employeeNo) {
    try {
      const user = await UserModel.findOne({
        where: { EmpNumber: employeeNo },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  static async getUserByName(userName) {
    try {
      const user = await UserModel.findOne({
        where: { UserName: `${userName}` },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  static async getUserByEmailNRole(req, email, admin) {
    try {
      const user = await UserModel.findOne({
        where: {
          [Op.and]: [
            admin ? { UserRoleId: { [Op.or]: [3, 4] } } : "",
            { EmailAddress: `${email}` },
          ],
        },
      });
      if (user) {
        const { recordset } = await req.app.locals.db.query(`
        SELECT UserRole FROM UserRoles WHERE UserRoleId = ${user.UserRoleId}
      `);
        user.UserRole = recordset[0].UserRole;
      }
      return user;
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  static async getUserByNameOrEmail(userName, EmailAddress) {
    try {
      const user = await UserModel.findAll({
        where: {
          [Op.or]: [
            { UserName: `${userName}` },
            { EmailAddress: `${EmailAddress}` },
          ],
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }
  static async updateUserPassword(user, password) {
    try {
      user.Password = password;
      await user.save();
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }
}

export default UserDao;
