import React from "react";
import styled, { css } from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import { ShopType } from "../../types/shop";

const Container = styled.li<{ showMap: boolean }>`
  width: calc((100% - 48px) / 4);
  &:nth-child(4n) {
    margin-right: 0;
  }
  margin-right: 16px;
  margin-bottom: 32px;
  &::marker {
    content: "";
  }

  @media (min-width: 1440px) {
    width: calc((100% - 64px) / 5);
    &:nth-child(4n) {
      margin-right: 16px;
    }
    &:nth-child(5n) {
      margin-right: 0;
    }
  }

  .shop-card-photo-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 66%;
    margin-bottom: 10px;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .shop-card-title {
    font-size: 16px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .shop-card-deliveryoption {
    font-size: 12px;
    color: ${palette.fontGray};
  }

  ${({ showMap }) =>
    showMap &&
    css`
      width: 100% !important;
      margin: 0;
      padding: 24px 0;
      border-bottom: 1px solid ${palette.shopBorderBottom};
      &:first-child {
        padding-top: 0;
      }
      a {
        width: 100%;
        display: flex;
        .shop-card-title {
          width: 200px;
        }
        .shop-card-info-texts {
          position: relative;
          flex-grow: 1;
          height: 200px;
          width: 200px;
        }
        .shop-card-photo-wrapper {
          width: 300px;
          min-width: 300px;
          height: 200px;
          margin-right: 16px;
          margin-bottom: 0;
          padding-bottom: 0;
          border-radius: 8px;
          overflow: hidden;
        }

        .shop-card-title {
          font-size: 18px;
          white-space: break-spaces;
          margin-bottom: 11px;
        }
        .shop-card-text-divider {
          width: 32px;
          height: 1px;
          margin-bottom: 10px;
          background-color: ${palette.divider};
        }
      }
    `}
`;

interface IProps {
  shop: ShopType;
  showMap: boolean;
}

const ShopCard: React.FC<IProps> = ({ shop, showMap }) => {
  return (
    <Container showMap={showMap}>
      <Link href={`/shoplist/${shop.id}`}>
        <a>
          <div className="shop-card-photo-wrapper">
            <img src={shop.photos[0]} alt="" />
          </div>
          <div className="shop-card-info-texts">
            <p className="shop-card-title">{shop.name}</p>
            <div className="shop-card-text-divider" />
            <p className="shop-card-deliveryoption">{shop.deliveryOption}</p>
          </div>
        </a>
      </Link>
    </Container>
  );
};

export default ShopCard;
