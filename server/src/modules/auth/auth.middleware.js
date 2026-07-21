import jwt from "jsonwebtoken";

import userRepository from "../user/user.repository.js";

export default async function authenticate(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authorization.replace("Bearer ", "");

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userRepository.findById(payload.id);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
