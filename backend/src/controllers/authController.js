import { registerUser, loginUser } from "../services/authService.js";

export const register = async (req, res, next) => {
  try {
    const userData = await registerUser(req.body);
    res.status(201).json(userData);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const userData = await loginUser(req.body);
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};
