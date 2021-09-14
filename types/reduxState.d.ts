import { UserType } from "./user";

export type UserState = UserType & {
  isLogged: boolean;
};

export type CommonState = {
  validateMode: boolean;
};

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
  description: string | null;
};

export type ShopListState = {
  shops: ShopType[];
  detail: ShopType | null;
};
