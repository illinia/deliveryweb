import React, { useState } from "react";
import styled, { css } from "styled-components";
import MapIcon from "../../public/icon/map.svg";
import palette from "../../style/palette";
import { useSelector } from "../../store";
import ShopList from "./ShopList";
import Button from "../common/Button";
import dynamic from "next/dynamic";
import ShopListMap from "./ShopListMap";

const ShopMainMap = dynamic(() => import("./ShopListMap"), { ssr: false });

const Container = styled.div<{ showMap: boolean }>`
  padding: 50px 80px;
  margin: auto;

  .shop-list-title {
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 24px;
  }

  .shop-list-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button-container {
      height: 36px;
      width: 160px;
    }
    .shop-list-buttons-left-side {
      display: flex;

      .button-container {
        height: 36px;
        width: 70px;
      }
    }
  }

  .shop-list-show-map-button {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 12px;
    background-color: white;
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    outline: none;

    &:hover {
      background-color: ${palette.mapBackground};
    }
    svg {
      margin-right: 8px;
    }
  }

  .shop-list-wrapper {
    display: flex;
  }

  ${({ showMap }) =>
    showMap &&
    css`
      width: 540px;
      padding: 50px 24px;
      margin: 0;
    `}
  .flex {
    display: flex;
  }
`;

const ShopMain: React.FC = () => {
  const shops = useSelector((state) => state.shops.shops);
  const [showMap, setShowMap] = useState(false);

  return (
    <Container showMap={showMap}>
      <h1 className="shop-list-title">가게</h1>
      <div className="shop-list-buttons">
        <div className="shop-list-buttons-left-side">
          <Button
            color={palette.sortButtonBackground}
            fontColor={palette.sortButtonFontColor}
            radius="50px"
            fontWeight="500"
          >
            종류
          </Button>
        </div>
        {!showMap && (
          <Button
            icon={<MapIcon />}
            color={palette.sortButtonBackground}
            fontColor={palette.sortButtonFontColor}
            radius="50px"
            fontWeight="500"
            onClick={() => {
              setShowMap(!showMap);
            }}
          >
            지도 표시하기
          </Button>
        )}
      </div>
      <div className="shop-list-wrapper">
        <ShopList showMap={showMap} />
        {showMap && <ShopListMap showMap={showMap} setShowMap={setShowMap} />}
      </div>
    </Container>
  );
};

export default ShopMain;
