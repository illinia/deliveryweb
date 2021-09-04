import React, { useState, useCallback } from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import Input from "../common/Input";
import Selector from "../common/Selector";
import Button from "../common/Button";

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

const DetailList = styled.div`
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
    display: flex;
    flex-direction: row;
    align-items: center;
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
    height: 46px;

    .button-container {
      width: 100px;
      height: 100%;
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
  const [packingCheck, setPackingCheck] = useState<boolean>(false);

  const onPackingCheck = useCallback((val: boolean) => {
    setPackingCheck(val);
  }, []);

  return (
    <Container>
      <h2>가게 정보</h2>
      <DetailContainer>
        <DetailList>
          <span className="shop-register-input-category">가게 이름</span>
          <Input type="text" />
        </DetailList>
        <DetailList>
          <span className="shop-register-input-category">가게 전화번호</span>
          <div className="shop-register-input-div">
            <div className="shop-register-input-number">
              <Selector options={["010", "011", "017"]} defaultValue="010" />
            </div>
            <div className="shop-register-input-number">
              <Input type="text" />
            </div>
            <div className="shop-register-input-number">
              <Input type="text" />
            </div>
          </div>
        </DetailList>
        <DetailList>
          <span className="shop-register-input-category">가게 주소</span>
          <div className="shop-register-address">
            <div className="shop-register-postcode">
              <div className="shop-register-input-number">
                <Input type="text" />
              </div>
              <Button>현재 위치</Button>
            </div>
            <div className="shop-register-input-div">
              <Input type="text" />
            </div>
            <div className="shop-register-input-div">
              <Input type="text" />
            </div>
          </div>
        </DetailList>
        <DetailList>
          <span className="shop-register-input-category">업종 카테고리</span>
          <div className="shop-register-input-number">
            <Selector
              options={["치킨", "피자", "버거", "스시"]}
              defaultValue="치킨"
            />
          </div>
        </DetailList>
        <DetailList>
          <span className="shop-register-input-category">배달 가능 여부</span>
          <div className="shop-register-radio-selector">
            <label>
              <input
                type="radio"
                checked={!packingCheck}
                onChange={() => onPackingCheck(false)}
              />
              <span>배달만 가능</span>
            </label>
            <label>
              <input
                type="radio"
                checked={packingCheck}
                onChange={() => onPackingCheck(true)}
              />
              <span>배달 + 포장 가능</span>
            </label>
          </div>
        </DetailList>
      </DetailContainer>
    </Container>
  );
};

export default RegisterShop;
