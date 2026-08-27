import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

import * as userService from "../user/user.service.js";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleLogin({ credential }) {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const googleId = payload.sub;

  let user = await userService.getUserByGoogleId(googleId);
  if (!user) {
    user = await userService.createUser({
      googleId,
      username: payload?.name,
      email: payload.email,
      displayName: payload.name,
      avatar: payload.picture,
      onboardingCompleted: false,
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user,
  };
}

async function getCurrentUser(userId) {
  return userService.getUser(userId);
}

export default {
  googleLogin,
  getCurrentUser,
};
