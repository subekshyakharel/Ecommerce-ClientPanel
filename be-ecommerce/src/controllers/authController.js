import { responseClient } from "../middlewares/responseClient.js";
import {
  createNewSession,
  deleteManySession,
} from "../models/session/SessionModel.js";
import {
  createNewUser,
  getUserByMail,
  updateUser,
} from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { getjwts } from "../utils/jwt.js";

export const insertNewUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { password } = req.body;
    req.body.password = await hashPassword(password);

    const user = await createNewUser(req.body);

    if (user?._id) {
      const newSessionObj = {
        token: uuidv4(),
        association: user.email,
      };
      const session = await createNewSession(newSessionObj);
      if (session?._id) {
        const message = "Account has been created you may login now!.";
        return responseClient({ req, res, message });
      }
    }

    throw new Error("Unable to create account,. try again later");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "The email already exists for another user. Try a different email or reset your password.";
      error.statusCode = 400;
    }
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await getUserByMail(email);
    if (user?._id) {
      const isMatched = await comparePassword(password, user.password);
      if (isMatched) {
        console.log("User Authenticated");
        const jwts = await getjwts(email);
        console.log("Sending login response with tokens:", jwts);

        return responseClient({
          req,
          res,
          next,
          message: "Logged in successfully!",
          payload: jwts,
        });
      }
    }

    const message = "Invalid login details";
    const statusCode = 401;
    responseClient({ req, res, next, message, statusCode });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    //get the token
    const { email } = req.userInfo;
    //update refreshJWT to ""
    await updateUser({ email }, { refreshJWT: "" });
    //remove the accessJWT from session table
    await deleteManySession({ association: email });
    responseClient({ req, res, message: "loged out successfully!" });
  } catch (error) {
    next(error);
  }
};
