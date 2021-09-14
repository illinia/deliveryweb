import { NextApiResponse, NextApiRequest } from "next";
import Data from "../../../lib/data";
import { StoredUserType } from "../../../types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const shop = Data.shop.find(Number(id as string));
      if (shop) {
        const owner = Data.user.find({ id: shop.ownerId });
        if (owner) {
          const newUserWithoutPassword: Partial<
            Pick<StoredUserType, "password">
          > = owner;
          delete newUserWithoutPassword.password;
          const shopWithOwner = { ...shop, owner: newUserWithoutPassword };
          res.statusCode = 200;
          return res.send(shopWithOwner);
        }
        res.statusCode = 404;
        return res.send("주인 정보가 없습니다.");
      }
      res.statusCode = 404;
      return res.send("해당 가게가 없습니다.");
    } catch (e) {
      console.log(e);
    }
  }
  res.statusCode = 405;
  return res.end();
};
