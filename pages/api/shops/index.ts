import { NextApiResponse, NextApiRequest } from "next";
import { isEmpty } from "lodash";
import { StoredShopType } from "../../../types/shop";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const shops = await Data.shop.getList();
      if (isEmpty(shops)) {
        const newShop: StoredShopType = {
          id: 1,
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        Data.shop.write([newShop]);
        res.statusCode = 201;
        return res.end();
      }
      const newShop: StoredShopType = {
        id: shops[shops.length - 1].id + 1,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      Data.shop.write([...shops, newShop]);
      res.statusCode = 201;
      return res.end();
    } catch (e: any) {
      console.log(e);
      return res.send(e.message);
    }
  }

  res.statusCode = 405;
  return res.end();
};
