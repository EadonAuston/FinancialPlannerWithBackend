import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
const saltRounds = 11;

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

export const createUnsecuredUserInformation = (user: { username: string }) => ({
  username: user.username,
});

export const createTokenForUser = (user: { username: string }) => {
  return jwt.sign(createUnsecuredUserInformation(user), "super-secret");
};

const jwtInfoSchema = z.object({
  username: z.string(),
  iat: z.number(),
});

export const getDataFromAuthToken = (token?: string) => {
  if (!token) return null;
  try {
    return jwtInfoSchema.parse(jwt.verify(token, "super-secret"));
  } catch (e) {
    console.error(e);
    return null;
  }
};
