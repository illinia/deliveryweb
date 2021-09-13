import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShopListState } from "../types/reduxState";
import { ShopType } from "../types/shop";

const initialState: ShopListState = {
  shops: [],
};

const shops = createSlice({
  name: "shops",
  initialState,
  reducers: {
    setShops(state, action: PayloadAction<ShopType[]>) {
      state.shops = action.payload;
    },
  },
});

export const shopsActions = { ...shops.actions };
export default shops;
