import React, { useState } from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import Button from "../common/Button";
import useModal from "../../hooks/useModal";
import AuthModal from "../auth/AuthModal";
import { useSelector } from "../../store";
import { FaUserCog } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import OutsideClickHandler from "react-outside-click-handler";
import { logoutAPI } from "../../lib/api/auth";
import { userActions } from "../../store/user";
import HeaderAuths from "./HeaderAuths";
import ModalPortal from "../MordalPortal";
import HeaderUserProfile from "./HeaderUserProfile";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 200px;
  height: 40px;
  display: flex;

  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: white;

    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      color: black;
      &:hover {
        background-color: ${palette.usermenuBackground};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.divider};
    }
  }
`;

const LoginButton: React.FC = () => {
  const isLogged = useSelector((state) => state.user.isLogged);

  return (
    <Container>
      {!isLogged && <HeaderAuths />}
      {isLogged && <HeaderUserProfile />}
    </Container>
  );
};

export default LoginButton;
