import React from "react";
import styled from "styled-components";
import { useSelector } from "../../../store";
import palette from "../../../style/palette";
import Link from "next/link";

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 50%;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  max-height: 465px;
  margin-bottom: 48px;

  .shop-detail-one-photo {
    img {
      position: relative;
      width: 100%;
      top: 0;
      left: 0;
    }
  }
  .shop-detail-photos-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
  }
  .shop-detail-three-photos-first {
    position: relative;
    margin-right: 8px;
    width: 66%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .shop-detail-three-photos-second {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 33%;
    img {
      height: calc((100% - 8px) / 2);
    }
  }

  .shop-detail-five-photos-first {
    position: relative;
    margin-right: 8px;
    width: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .shop-detail-five-photos-second {
    position: relative;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    img {
      width: calc((100% - 8px) / 2);
      height: calc((100% - 8px) / 2);
      object-fit: cover;
      &:first-child {
        margin-right: 8px;
      }
      &:nth-child(3n) {
        margin-right: 8px;
      }
    }
  }
`;

const ShopDetailPhotos: React.FC = () => {
  const shopTitle = useSelector((state) => state.shops.detail?.name);
  const photos = useSelector((state) => state.shops.detail?.photos);
  if (!photos) return null;

  if (photos.length === 1) {
    return (
      <Container>
        <div className="shop-detail-one-photo">
          <img src={photos[0]} alt={shopTitle} />
        </div>
      </Container>
    );
  }

  if (photos.length < 4) {
    return (
      <Container>
        <div className="shop-detail-photos-wrapper">
          <div className="shop-detail-three-photos-first">
            <img src={photos[0]} alt={shopTitle} />
          </div>
          <div className="shop-detail-three-photos-second">
            <img src={photos[1]} alt={shopTitle} />
            <img src={photos[2]} alt={shopTitle} />
          </div>
        </div>
      </Container>
    );
  }

  if (photos.length > 4) {
    return (
      <Container>
        <div className="shop-detail-photos-wrapper">
          <div className="shop-detail-five-photos-first">
            <img src={photos[0]} alt={shopTitle} />
          </div>
          <div className="shop-detail-five-photos-second">
            <img src={photos[1]} alt={shopTitle} />
            <img src={photos[2]} alt={shopTitle} />
            <img src={photos[3]} alt={shopTitle} />
            <img src={photos[4]} alt={shopTitle} />
          </div>
        </div>
      </Container>
    );
  }
  return <></>;
};

export default ShopDetailPhotos;
