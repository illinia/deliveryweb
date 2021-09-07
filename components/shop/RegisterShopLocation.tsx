import React, { useState, useMemo } from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import Input from "../common/Input";
import Button from "../common/Button";
import NavigationIcon from "../../public/icon/navigation.svg";
import { useSelector } from "../../store";
import { useDispatch } from "react-redux";
import { shopActions } from "../../store/shop";
import { getLocationInfoAPI } from "../../lib/api/map";
import RegisterShopFooter from "./RegisterShopFooter";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
  h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const DetailContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
`;

const DetailList = styled.div<{ validateMode?: boolean }>`
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;

  .shop-register-input-div {
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;

    div + div {
      margin-left: 10px;
    }

    .input-container {
      width: 100%;
    }
  }
  .shop-register-input-category {
    width: 20%;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    justify-content: center;
  }
  .shop-register-input-number {
    width: 25%;
    height: ${({ validateMode }) => (validateMode ? "80px" : "inherit")};
    margin-top: ${({ validateMode }) => (validateMode ? "10px" : "0")};
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  .shop-register-address {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 8px 0;
    div + div {
      margin-top: 6px;
    }
  }
  .shop-register-postcode {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 46px;

    .button-container {
      width: 120px;
      height: 40px;
      margin-left: 10px;
    }
  }
  .shop-register-radio-selector {
    label + label {
      margin-left: 10px;
    }
  }
`;

const RegisterShopLocation: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const city = useSelector((state) => state.shop.city);
  const streetAddress = useSelector((state) => state.shop.streetAddress);
  const postCode = useSelector((state) => state.shop.postcode);

  const dispatch = useDispatch();

  const onClickGetCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      console.log(e);
    });
  };

  const onSuccessGetLocation = async ({ coords }: any) => {
    try {
      const { data: currentLocation } = await getLocationInfoAPI({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      const currentCity = `${currentLocation.city} ${currentLocation.district}`;
      dispatch(shopActions.setCity(currentCity));
      dispatch(shopActions.setStreetAddress(currentLocation.streetAddress));
      dispatch(shopActions.setPostcode(currentLocation.postcode));
      dispatch(shopActions.setLatitude(currentLocation.latitude));
      dispatch(shopActions.setLongitude(currentLocation.longitude));
    } catch (e: any) {
      console.log(e);
      alert(e?.message);
    }
    setLoading(false);
  };

  const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(shopActions.setCity(event.target.value));
  };

  const onChangeStreetAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(shopActions.setStreetAddress(event.target.value));
  };

  const onChangePostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(shopActions.setPostcode(event.target.value));
  };

  const isValid = useMemo(() => {
    if (!city || !streetAddress || !postCode) return false;
    return true;
  }, [city, streetAddress, postCode]);

  return (
    <Container>
      <h2>가게 주소</h2>
      <DetailContainer>
        <DetailList>
          <span className="shop-register-input-category">가게 주소</span>
          <div className="shop-register-address">
            <div className="shop-register-postcode">
              <div className="shop-register-input-number">
                <Input
                  type="text"
                  value={postCode || ""}
                  onChange={onChangePostcode}
                />
              </div>
              <Button
                icon={<NavigationIcon />}
                onClick={onClickGetCurrentLocation}
              >
                {loading ? "탐색중..." : "현재 위치"}
              </Button>
            </div>
            <div className="shop-register-input-div">
              <Input type="text" value={city || ""} onChange={onChangeCity} />
            </div>
            <div className="shop-register-input-div">
              <Input
                type="text"
                value={streetAddress || ""}
                onChange={onChangeStreetAddress}
              />
            </div>
          </div>
        </DetailList>
      </DetailContainer>
      <RegisterShopFooter
        isValid={isValid}
        prevHref="/shop/register"
        nextHref="/shop/geometry"
      />
    </Container>
  );
};

export default RegisterShopLocation;
