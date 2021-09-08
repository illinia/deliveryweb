import React from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import HomeShopCardList from "./HomeShopCardList";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${palette.mainBackground};
`;

const MainHeaderContainer = styled.div`
  width: 100%;
  height: 235px;
  background-image: url("/image/chicken.jpeg");
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    height: 30px;
    font-size: 40px;
    font-weight: 600;
    color: white;
    text-shadow: 1px 1px 1px black;

    span {
      color: #feb512;
    }
  }
`;

const Home: React.FC = () => {
  return (
    <Container>
      <MainHeaderContainer>
        <h2>
          "어디든 <span>배달</span> 언제든 <span>배달</span>"
        </h2>
      </MainHeaderContainer>
      <HomeShopCardList />
    </Container>
  );
};

export default React.memo(Home);
