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
