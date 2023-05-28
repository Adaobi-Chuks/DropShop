import User from '../models/sequelizes/user.model';
import jwt from "jsonwebtoken";
import { MAXAGE, SECRET } from "../configs/constants.config";
import { IUser } from '../interfaces/user.interface';

export default class UserService {
  async create(data: any) {
    const user = await User.create(data);
    return user;
  }

  async findOne(filter: any) {
    const user = await User.findOne({ where: filter });
    return user;
  }

  async findOneById(id: any) {
    const user = await User.findByPk(id);
    return user;
  }

  async findOneWithFields(filter: any, fields: any) {
    const user = await User.findOne({ where: filter, attributes: fields });
    return user;
  }

  async findAll(filter: any) {
    const users = await User.findAll({ where: filter });
    return users;
  }

  async findAllWithFields(filter: any, fields: any) {
    const users = await User.findAll({ where: filter, attributes: fields });
    return users;
  }

  async update(id: any, data: any) {
    const [numUpdated, updatedUsers] = await User.update(data, { where: { id }, returning: true });
    if (numUpdated === 0) {
      return null;
    }
    return updatedUsers[0];
  }

  async destroy(id: any) {
    const deletedRows = await User.destroy({ where: { id } });
    if (deletedRows === 0) {
      return null;
    }
    return await User.findByPk(id);
  }

  generateAuthToken (user: IUser) {
    return jwt.sign({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    }, SECRET, {
      expiresIn: MAXAGE
    });
  }
}