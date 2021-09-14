import React from "react";
import styled from "styled-components";
import Link from "next/link";
import palette from "../../style/palette";
import BackArrowIcon from "../../public/icon/register_room_footer_back_arrow.svg";
import Button from "../common/Button";
import { useRouter } from "next/dist/client/router";
import { registerShopAPI } from "../../lib/api/shop";
import { useSelector } from "../../store";
import { useDispatch } from "react-redux";
import { shopActions } from "../../store/shop";

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.footerBorder};

  .register-shop-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.footerButton};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
  .button-container {
    width: 100px;
    height: 40px;
  }
`;

const RegisterShopSubmitFooter: React.FC = () => {
  const userId = useSelector((state) => state.user.id);
  const registerShop = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const router = useRouter();

  const onClickregisterShop = async () => {
    const registerShopBody = {
      ...registerShop,
      ownerId: userId,
    };
    try {
      await registerShopAPI(registerShopBody);
      dispatch(shopActions.initShop());
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Link href="/shop/description">
        <a className="register-shop-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Button onClick={onClickregisterShop}>등록하기</Button>
    </Container>
  );
};

export default RegisterShopSubmitFooter;
