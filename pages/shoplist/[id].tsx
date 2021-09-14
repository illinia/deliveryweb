import { NextPage } from "next";
import { getShopAPI } from "../../lib/api/shop";
import { shopsActions } from "../../store/shops";
import ShopDetail from "../../components/shopList/detail/ShopDetail";

const shopDetail: NextPage = () => {
  return <ShopDetail />;
};

shopDetail.getInitialProps = async ({ query, store }) => {
  const { id } = query;

  try {
    if (id) {
      const { data } = await getShopAPI(Number(id as string));
      store.dispatch(shopsActions.setDetailShop(data));
    }
  } catch (e) {
    console.log(e);
  }
  return {};
};

export default shopDetail;
