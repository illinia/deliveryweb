import axios from ".";
import { ShopState } from "../../types/reduxState";
import { ShopType } from "../../types/shop";
import { makeQueryString } from "../utils";

export const registerShopAPI = (body: ShopState & { ownerId: number }) =>
  axios.post("/api/shops", body);

type GetShopListAPIQueries = {
  sort: string;
  limit: string | string[];
  page: string | string[];
};

export const getShopListAPI = (queries: GetShopListAPIQueries) => {
  return axios.get<ShopType[]>(makeQueryString("/api/shoplist", queries));
};

export const getShopAPI = (shopId: number) =>
  axios.get<ShopType>(`/api/shoplist/${shopId}`);
