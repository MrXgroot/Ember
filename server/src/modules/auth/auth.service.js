import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

import userRepository from "../user/user.repository.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleLogin({ credential }) {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const googleId = payload.sub;

  let user = await userRepository.findByGoogleId(googleId);

  if (!user) {
    user = await userRepository.create({
      googleId,
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
  return userRepository.findById(userId);
}

export default {
  googleLogin,
  getCurrentUser,
};
