import React from "react";
import styled from "styled-components";
import { useSelector } from "../../../store";
import palette from "../../../style/palette";
import Link from "next/link";
import shops from "../../../pages/api/shops";
import ShopDetailPhotos from "./ShopDetailPhotos";

const Container = styled.div`
  width: 1120px;
  margin: auto;
  padding-top: 26px;
  padding-bottom: 100px;

  .shop-detail-title {
    font-size: 26px;
    font-weight: 800;
    margin-bottom: 15px;
  }

  .shop-detail-location {
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
    color: ${palette.subtitle};
    margin-bottom: 24px;
  }
`;

const ShopDetail: React.FC = () => {
  const shop = useSelector((state) => state.shops.detail);
  if (!shop) return null;
  return (
    <Container>
      <h1 className="shop-detail-title">{shop.name}</h1>
      <p className="shop-detail-location">
        {shop.city} {shop.streetAddress}
      </p>
      <ShopDetailPhotos />
    </Container>
  );
};

export default ShopDetail;
