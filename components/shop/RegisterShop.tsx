import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import Input from "../common/Input";
import Selector from "../common/Selector";
import Button from "../common/Button";
import { useSelector } from "../../store";
import { shopActions } from "../../store/shop";
import { useDispatch } from "react-redux";
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
  border-bottom: 1px solid ${palette.inputBorder};

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
      width: 100px;
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

const RegisterShop: React.FC = () => {
  const shopName = useSelector((state) => state.shop.name);
  const shopNumber1 = useSelector((state) => state.shop.number1);
  const shopNumber2 = useSelector((state) => state.shop.number2);
  const shopNumber3 = useSelector((state) => state.shop.number3);
  const shopSort = useSelector((state) => state.shop.shopSort);
  const deliveryOption = useSelector((state) => state.shop.deliveryOption);

  const dispatch = useDispatch();
  const validateMode = useSelector((state) => state.common.validateMode);

  const [packingCheck, setPackingCheck] = useState<string>("배달");
  const [number1, setNumber1] = useState<string>("");
  const [number2, setNumber2] = useState<string>("");
  const [number3, setNumber3] = useState<string>("");

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(shopActions.setNameType(event.target.value));
  };

  const onChangeNumber1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isFinite(+event.target.value)) {
      return;
    } else {
      setNumber1(event.target.value);
      dispatch(shopActions.setNumber1Type(event.target.value));
    }
  };

  const onChangeNumber2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(shopActions.setNumber2Type(event.target.value));
  };

  const onChangeNumber3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(shopActions.setNumber3Type(event.target.value));
  };

  const onChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(shopActions.setShopSortType(event.target.value));
  };

  const onChangedeliveryOption = (value: string) => {
    setPackingCheck(value);
    dispatch(shopActions.setDeliveryOption(value));
  };

  const OnlyNumber = () => {
    const regexp = /[^0-9]/;
    if (
      !regexp.test(shopNumber1!) &&
      !regexp.test(shopNumber2!) &&
      !regexp.test(shopNumber3!)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isValid = useMemo(() => {
    if (!shopNumber1 || !shopSort || !deliveryOption || !OnlyNumber()) {
      return false;
    }
    return true;
  }, [
    shopName,
    shopNumber1,
    shopNumber2,
    shopNumber3,
    shopSort,
    deliveryOption,
  ]);

  return (
    <Container>
      <h2>가게 정보</h2>
      <DetailContainer>
        <DetailList>
          <span className="shop-register-input-category">가게 이름</span>
          <Input
            type="text"
            value={shopName || undefined}
            onChange={onChangeName}
            errorMessage="필수 입력사항입니다."
          />
        </DetailList>
        <DetailList validateMode={validateMode}>
          <span className="shop-register-input-category">가게 전화번호</span>
          <div className="shop-register-input-div">
            <div className="shop-register-input-number">
              <Selector
                isValid={!!shopNumber1}
                options={["010", "011", "017"]}
                defaultValue="번호 앞자리"
                value={number1 || undefined}
                disabledOptions={["번호 앞자리"]}
                onChange={onChangeNumber1}
              />
            </div>
            <div className="shop-register-input-number">
              <Input
                type="text"
                maxLength={4}
                value={number2 || undefined}
                onChange={onChangeNumber2}
                errorMessage="숫자 4자리"
              />
            </div>
            <div className="shop-register-input-number">
              <Input
                type="text"
                maxLength={4}
                value={number3 || undefined}
                onChange={onChangeNumber3}
                errorMessage="숫자 4자리"
              />
            </div>
          </div>
        </DetailList>
        <DetailList validateMode={validateMode}>
          <span className="shop-register-input-category">업종 카테고리</span>
          <div className="shop-register-input-number">
            <Selector
              isValid={!!shopSort}
              value={shopSort || undefined}
              defaultValue="하나를 선택해주세요"
              disabledOptions={["하나를 선택해주세요"]}
              options={["치킨", "피자", "버거", "스시"]}
              onChange={onChangeSort}
            />
          </div>
        </DetailList>
        <DetailList>
          <span className="shop-register-input-category">배달 가능 여부</span>
          <div className="shop-register-radio-selector">
            <label>
              <input
                type="radio"
                value={deliveryOption || undefined}
                checked={packingCheck == "배달"}
                onChange={() => onChangedeliveryOption("배달")}
              />
              <span>배달만 가능</span>
            </label>
            <label>
              <input
                type="radio"
                value={deliveryOption || undefined}
                checked={packingCheck == "포장"}
                onChange={() => onChangedeliveryOption("포장")}
              />
              <span>배달 + 포장 가능</span>
            </label>
          </div>
        </DetailList>
      </DetailContainer>
      <RegisterShopFooter
        isValid={isValid}
        prevHref="/"
        nextHref="/shop/location"
      />
    </Container>
  );
};

export default RegisterShop;
