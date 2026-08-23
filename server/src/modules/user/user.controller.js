import * as userService from "./user.service.js";

export async function createUser(req, res) {
  const user = await userService.createUser(req.body);

  res.status(201).json(user);
}

export async function getUsers(req, res) {
  const { page, limit, sort, ...filters } = req.query;

  const users = await userService.getUsers({
    filters,

    options: {
      page,
      limit,
      sort,
    },
  });

  res.status(200).json(users);
}

export async function getUser(req, res) {
  const user = await userService.getUser(req.params.userId);

  res.status(200).json(user);
}

export async function updateUser(req, res) {
  const user = await userService.updateUser(req.params.userId, req.body);

  res.status(200).json(user);
}

export async function deleteUser(req, res) {
  await userService.deleteUser(req.params.userId);

  res.status(204).send();
}
