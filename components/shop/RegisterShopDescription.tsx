import React from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { shopActions } from "../../store/shop";
import Textarea from "../common/Textarea";
import { useSelector } from "../../store";
import RegisterShopSubmitFooter from "./RegisterShopSubmitFooter";

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
  .register-shop-description-wrapper {
    width: 800px;
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const RegisterShopDescription: React.FC = () => {
  const dispatch = useDispatch();

  const description = useSelector((state) => state.shop.description);

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(shopActions.setDescription(e.target.value));
  };
  return (
    <Container>
      <h2>가게에 대해 설명해주세요.</h2>
      <div className="register-shop-description-wrapper">
        <Textarea value={description!} onChange={onChangeDescription} />
      </div>
      <RegisterShopSubmitFooter />
    </Container>
  );
};

export default RegisterShopDescription;
