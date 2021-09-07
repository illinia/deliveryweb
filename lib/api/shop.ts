import axios from ".";
import { ShopState } from "../../types/reduxState";

export const registerShopAPI = (body: ShopState & { hostId: number }) =>
  axios.post("/api/shops", body);
