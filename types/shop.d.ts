import { UserType } from "./user";

export type StoredShopType = {
  id: number;
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
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
};

export type ShopType = {
  id: number;
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
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  owner: UserType;
};

export const SHOPCATEGORIES = [
  "치킨",
  "피자",
  "버거",
  "중국집",
  "한식",
  "일식/돈까스",
  "족발/보쌈",
  "야식",
  "분식",
];
