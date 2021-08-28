import React from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import LoginButton from "./LoginButton";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: ${palette.headerBackground};
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;

  .header-a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: white;
  }
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 24px;
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Link href="/">
        <a className="header-a">
          <HeaderLogo>Delivery</HeaderLogo>
          <LoginButton />
        </a>
      </Link>
    </Container>
  );
};

export default React.memo(Header);
