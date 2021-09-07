import { readFileSync, writeFileSync } from "fs";
import { StoredShopType } from "../../types/shop";

const getList = () => {
  const shopsBuffer = readFileSync("data/shops.json");
  const shopsString = shopsBuffer.toString();
  if (!shopsString) return [];
  const shops: StoredShopType[] = JSON.parse(shopsString);
  return shops;
};

const exist = (shopId: number) => {
  const shops = getList();
  return shops.some((shop) => shop.id === shopId);
};

const find = (shopId: number) => {
  const shops = getList();
  return shops.find((shop) => shop.id === shopId);
};

const write = (shops: StoredShopType[]) => {
  writeFileSync("data/shops.json", JSON.stringify(shops));
};

export default { getList, exist, write, find };
