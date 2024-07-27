import express from "express";
import { prisma } from "../prisma/prisma-instance";
import { v4 as uuidv4 } from "uuid";
import {
  createTokenForUser,
  createUnsecuredUserInformation,
  encryptPassword,
  // getDataFromAuthToken,
} from "./auth-utils";
import bcrypt from "bcrypt";
const generateId = () => uuidv4();

const app = express();
app.use(express.json());

export const Requests = {
  getUsers: () =>
    app.get("/users", async (_req, res) => {
      const users = await prisma.user.findMany({});
      return res.json({ users });
    }),

  createUser: async (username: string, passwordHash: string) => {
    app.get("/users", async (_req, res) => {
      const possibleUser = await prisma.user.findFirst({
        where: {
          username,
        },
      });
      if (!possibleUser) {
        app.post("/users", async (_req, res) => {
          return await prisma.user
            .create({
              data: {
                id: generateId(),
                username,
                passwordHash: await encryptPassword(passwordHash),
              },
            })
            .then((newUser) => res.status(201).send(newUser))
            .catch(() => res.status(500).send("Problem creating user"));
        });
      }
      console.log({ possibleUser });
      return res.json({ possibleUser });
    });
  },

  loginUser: (username: string, passwordHash: string) => {
    app.post("/users", async (_req, res) => {
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(
        passwordHash,
        user.passwordHash
      );

      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Invalid Credentials",
        });
      }

      const userInfo = createUnsecuredUserInformation(user);
      const token = createTokenForUser(user);

      return res.status(200).json({ token, userInfo });
    });
  },
};
// Requests.getUsers();
// Requests.createUser("Eadon", "EadonPassword");
// Requests.loginUser("Eadon", "EadonPassword");
// app.post("/users", async (req, res) => {
//   const user = await prisma.user.findFirst({
//     where: {
//       username: req.body.username,
//     },
//   });

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   const isPasswordCorrect = await bcrypt.compare(
//     req.body.passwordHash,
//     user.passwordHash
//   );

//   if (!isPasswordCorrect) {
//     return res.status(401).json({
//       message: "Invalid Credentials",
//       userPassword: user.passwordHash,
//       passwordHash: req.body.passwordHash,
//     });
//   }

//   const userInfo = createUnsecuredUserInformation(user);
//   const token = createTokenForUser(user);

//   return res.status(200).json({ token, userInfo });
// });

// const authMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const [, token] = req.headers.authorization?.split?.(" ") || [];
//   const myJwtData = getDataFromAuthToken(token);
//   if (!myJwtData) {
//     return res.status(401).json({ message: "Invalid Token" });
//   }
//   const userFromJwt = await prisma.user.findFirst({
//     where: {
//       username: myJwtData.username,
//     },
//   });

//   if (!userFromJwt) {
//     return res.status(401).json({ message: "User Not Found" });
//   }
// };

// app.post("/users/posts", authMiddleware(), async (req, res) => {
// const userPost = await prisma.user
//   .create({
//     data: {
//       username: userFromJwt.username,

//     },
//   })
//   .catch(() => null);
//   res.status(200).send();
// });
// app.get("/", (req, res) => {
//   res.send("What's up");
// });

app.listen(3001);
