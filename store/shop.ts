import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShopState = {
  name: string | null;
  number1: string | null;
  number2: string | null;
  number3: string | null;
  postcode: string | null;
  city: string | null;
  streetAddress: string | null;
  latitude: number;
  longitude: number;
  shopSort: string | null;
  deliveryOption: string | null;
  photos: string[];
};

const initialState: ShopState = {
  name: null,
  number1: "010",
  number2: null,
  number3: null,
  postcode: null,
  city: null,
  streetAddress: null,
  latitude: 0,
  longitude: 0,
  shopSort: "치킨",
  deliveryOption: "배달",
  photos: [
    "https://deliveryweb-bucket.s3.ap-northeast-2.amazonaws.com/Unknown__8521f4f9-2b92-42b0-b241-f7caf3bd77dd.jpg",
    "https://deliveryweb-bucket.s3.ap-northeast-2.amazonaws.com/Unknown__8521f4f9-2b92-42b0-b241-f7caf3bd77dd.jpg",
    "https://deliveryweb-bucket.s3.ap-northeast-2.amazonaws.com/Unknown__8521f4f9-2b92-42b0-b241-f7caf3bd77dd.jpg",
    "https://deliveryweb-bucket.s3.ap-northeast-2.amazonaws.com/Unknown__8521f4f9-2b92-42b0-b241-f7caf3bd77dd.jpg",
  ],
};

const shop = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setNameType(state, action: PayloadAction<string>) {
      state.name = action.payload;
      return state;
    },
    setNumber1Type(state, action: PayloadAction<string>) {
      state.number1 = action.payload;
      return state;
    },
    setNumber2Type(state, action: PayloadAction<string>) {
      state.number2 = action.payload;
      return state;
    },
    setNumber3Type(state, action: PayloadAction<string>) {
      state.number3 = action.payload;
      return state;
    },
    setShopSortType(state, action: PayloadAction<string>) {
      state.shopSort = action.payload;
      return state;
    },
    setDeliveryOption(state, action: PayloadAction<string>) {
      state.deliveryOption = action.payload;
      return state;
    },
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
      return state;
    },
    setStreetAddress(state, action: PayloadAction<string>) {
      state.streetAddress = action.payload;
      return state;
    },
    setPostcode(state, action: PayloadAction<string>) {
      state.postcode = action.payload;
      return state;
    },
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
      return state;
    },
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
      return state;
    },
    setPhotos(state, action: PayloadAction<string[]>) {
      state.photos = action.payload;
    },
  },
});

export const shopActions = { ...shop.actions };
export default shop;
