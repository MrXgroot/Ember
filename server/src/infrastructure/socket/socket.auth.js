import jwt from "jsonwebtoken";

export function socketAuth(socket, next) {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.userId = decoded.id;

    next();
  } catch (error) {
    next(new Error("Invalid authentication token"));
  }
}
