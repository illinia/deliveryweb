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
