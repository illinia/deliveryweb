import { createSlice } from "@reduxjs/toolkit";

type ShopState = {
  name: string | null;
  shopSort: string | null;
  state: string | null;
  city: string | null;
  streetAddress: string | null;
  postcode: number | null;
  deliveryOption: boolean | null;
  shopPicture: string | null;
};

const initialState: ShopState = {
  name: null,
  shopSort: null,
  state: null,
  city: null,
  streetAddress: null,
  postcode: null,
  deliveryOption: null,
  shopPicture: null,
};

const shop = createSlice({
  name: "shop",
  initialState,
  reducers: {},
});

export const shopActions = { ...shop.actions };
export default shop;
