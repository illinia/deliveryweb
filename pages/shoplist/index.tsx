import React from "react";
import { NextPage } from "next";
import { wrapper } from "../../store";
import ShopMain from "../../components/shopList/ShopMain";
import { getShopListAPI } from "../../lib/api/shop";
import { shopsActions } from "../../store/shops";

const index: NextPage = () => {
  return <ShopMain />;
};

index.getInitialProps = async ({ store, query }) => {
  const { sort, limit, page = "1" } = query;

  try {
    const { data } = await getShopListAPI({
      sort: encodeURI(query.sort as string),
      limit: limit || "10",
      page: page || "1",
    });
    store.dispatch(shopsActions.setShops(data));
  } catch (e) {
    console.log(e);
  }
  return {};
};

export default index;
