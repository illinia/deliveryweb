import React, { useEffect } from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import BackArrowIcon from "../../public/icon/register_room_footer_back_arrow.svg";
import Button from "../common/Button";
import useValidateMode from "../../hooks/useValidateMode";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 82px;
  padding: 20px 20px;
  background-color: ${palette.footerBackground};
  z-index: 10;
  border-top: 1px solid ${palette.footerBorder};

  .register-footer-back {
    display: flex;

    align-items: center;
    color: ${palette.footerButton};
    cursor: pointer;

    svg {
      margin-right: 8px;
      color: ${palette.buttonBackground};
    }
  }
  .register-footer-button-wrapper {
    width: 100px;
    height: 40px;
  }
`;

interface IProps {
  prevHref?: string;
  nextHref?: string;
  isValid?: boolean;
}

const RegisterShopFooter: React.FC<IProps> = ({
  prevHref,
  nextHref,
  isValid = true,
}) => {
  const { setValidateMode } = useValidateMode();

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  const onClickNext = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!isValid) {
      event.preventDefault();
      setValidateMode(true);
    }
  };

  return (
    <Container>
      <Link href={prevHref || ""}>
        <a className="register-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Link href={nextHref || ""}>
        <div className="register-footer-button-wrapper">
          <Button onClick={onClickNext}>계속</Button>
        </div>
      </Link>
    </Container>
  );
};

export default RegisterShopFooter;
