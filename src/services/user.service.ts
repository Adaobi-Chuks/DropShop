import User from '../models/sequelizes/user.model';
import jwt from "jsonwebtoken";
import { MAXAGE, SECRET } from "../configs/constants.config";
import { IUser } from '../interfaces/user.interface';

export default class UserService {
  async create(data: any) {
    const user = await User.create(data);
    return await User.findByPk(user.id, { attributes: {exclude: ["password"]} });
  }

  async findOne(filter: any) {
    const user = await User.findOne({ where: filter });
    return user;
  }

  async findOneById(id: any) {
    const user = await User.findByPk(id, { attributes: {exclude: ["password"]} });
    return user;
  }

  async findOneWithFields(filter: any) {
    const user = await User.findOne({ where: filter, attributes: {exclude: ["password"]} });
    return user;
  }

  async findAll(filter: any) {
    const users = await User.findAll({ where: filter, attributes: {exclude: ["password"]} });
    return users;
  }

  async update(id: any, data: any) {
    const [numUpdated, updatedUsers] = await User.update(data, { where: { id }, returning: true });
    return await User.findByPk(updatedUsers[0].id, { attributes: {exclude: ["password"]} });
  }

  async softDelete(id: any) {
    const deletedRows = await User.destroy({ where: { id } });
    return;
  }

  async hardDelete(id: any) {
    await User.destroy({ where: { id }, force: true });
    return;
  }

  generateAuthToken (user: IUser) {
    return jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role
    }, SECRET, {
      expiresIn: MAXAGE
    });
  }
}