import React from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import { SHOPCATEGORIES } from "../../types/shop.d";
import ShopCard from "../common/ShopCard";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px 0;
`;

const HomeShopCardList: React.FC = () => {
  return (
    <Container>
      {SHOPCATEGORIES.map((card) => {
        return <ShopCard card={card} />;
      })}
    </Container>
  );
};

export default React.memo(HomeShopCardList);
