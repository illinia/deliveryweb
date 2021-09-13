import { NextApiResponse, NextApiRequest } from "next";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { sort, page = "1", limit } = req.query;

    try {
      const shops = Data.shop.getList();

      const filteredShops = shops.filter((shop) => {
        if (sort != shop.shopSort) return false;
        return true;
      });

      const limitedShops = filteredShops.splice(
        0 + (Number(page) - 1) * Number(limit),
        Number(limit)
      );

      const shopsWithOwner = await Promise.all(
        limitedShops.map(async (shop) => {
          const owner = Data.user.find({ id: shop.ownerId });
          return { ...shop, owner };
        })
      );

      res.statusCode = 200;
      return res.send(shopsWithOwner);
    } catch (e) {
      console.log(e);
    }
  }
};
