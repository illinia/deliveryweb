import axios from ".";
import { UserType } from "../../types/user";

interface SingUpAPIBody {
  email: string;
  givenname: string;
  familyname: string;
  password: string;
  birthday: string;
}

export const signupAPI = (body: SingUpAPIBody) =>
  axios.post<UserType>("/api/auth/signup", body);

export const loginAPI = (body: { email: string; password: string }) =>
  axios.post<UserType>("/api/auth/login", body);

export const meAPI = () => axios.get<UserType>("/api/auth/me");

export const logoutAPI = () => axios.delete("/api/auth/logout");
