import React from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";

const Container = styled.div`
  width: 292px;
  height: 230px;
  margin: 5px 5px;
  padding: 20px;
  font-size: 16px;
  font-weight: 600;
  color: black;
  border: 1px solid ${palette.cardBorder};
  border-radius: 4px;
  background-size: 200px 200px;
  background-color: ${palette.cardBackground};
  background-image: url("/image/test.jpeg");
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: bottom;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
  }
`;

interface IProps {
  card: string;
}

const ShopCard: React.FC<IProps> = ({ card }) => {
  return <Container>{card}</Container>;
};

export default React.memo(ShopCard);
