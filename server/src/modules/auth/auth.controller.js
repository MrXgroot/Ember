import authService from "./auth.service.js";

async function googleLogin(req, res, next) {
  try {
    const result = await authService.googleLogin(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const user = await authService.getCurrentUser(req.user._id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export default {
  googleLogin,
  getCurrentUser,
};
