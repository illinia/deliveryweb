import React from "react";
import styled, { css } from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import { useSelector } from "../../store";
import ShopCard from "./ShopCard";

const Container = styled.div<{ showMap: boolean }>`
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
  width: 100%;

  ${({ showMap }) =>
    showMap &&
    css`
      flex-direction: column;
    `}
`;

interface IProps {
  showMap: boolean;
}

const ShopList: React.FC<IProps> = ({ showMap }) => {
  const shops = useSelector((state) => state.shops.shops);
  return (
    <Container showMap={showMap}>
      {shops.map((shop) => (
        <ShopCard shop={shop} key={shop.id} showMap={showMap} />
      ))}
    </Container>
  );
};

export default ShopList;
