// modules/user/user.controller.js

import userService from "./user.service.js";

class UserController {
  async createUser(req, res) {
    const user = await userService.createUser(req.body);

    res.status(201).json(user);
  }

  async getUsers(req, res) {
    const users = await userService.getUsers(req.query);

    res.status(200).json(users);
  }

  async getUser(req, res) {
    const user = await userService.getUser(req.params.userId);

    res.status(200).json(user);
  }

  async updateUser(req, res) {
    const user = await userService.updateUser(req.params.userId, req.body);

    res.status(200).json(user);
  }

  async deleteUser(req, res) {
    await userService.deleteUser(req.params.userId);

    res.status(204).send();
  }
}

export default new UserController();
