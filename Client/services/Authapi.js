
import api from "../config/api";

export const Login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const Signup = async (data) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const VerifyMe = async () => {
  const res = await api.get("/auth/verifyMe");
  return res.data;
};

export const LogOut = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
