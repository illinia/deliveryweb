import React from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import { SHOPCATEGORIES } from "../../types/shop.d";
import ShopCard from "../common/ShopCard";

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px 0;
`;

const HomeShopCardList: React.FC = () => {
  return (
    <Container>
      {SHOPCATEGORIES.map((card, index) => {
        return (
          <Link href={`/shoplist?sort=${card}`}>
            <a>
              <ShopCard card={card} key={index} />
            </a>
          </Link>
        );
      })}
    </Container>
  );
};

export default React.memo(HomeShopCardList);
