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

const UserProfile = styled.button<{ onClick: (e: Event) => void }>`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 6px 0 16px;
  border: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
  border-radius: 21px;
  background-color: white;
  cursor: pointer;
  outline: none;
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  }

  .header-user-profile-image {
    margin-left: 8px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

const LoginButton: React.FC = () => {
  const [isUsermenuOpened, setIsusermenuOpened] = useState(false);

  const { openModal, closeModal, ModalPortal } = useModal();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Container>
      {!user.isLogged && (
        <>
          <Button
            radius="21"
            onClick={() => {
              dispatch(authActions.setAuthMode("login"));
              openModal();
            }}
          >
            로그인
          </Button>
          <Button
            radius="21"
            signin
            onClick={() => {
              dispatch(authActions.setAuthMode("signup"));
              openModal();
            }}
          >
            회원가입
          </Button>
        </>
      )}
      {user.isLogged && (
        <OutsideClickHandler
          onOutsideClick={() => {
            if (isUsermenuOpened) setIsusermenuOpened(false);
          }}
        >
          <UserProfile onClick={() => setIsusermenuOpened(!isUsermenuOpened)}>
            <FaUserCog size="20px" />
            <img
              src={user.profileImage}
              className="header-user-profile-image"
              alt=""
            />
          </UserProfile>
          {isUsermenuOpened && (
            <ul className="header-usermenu">
              <li>계정 관리</li>
              <Link href="/shop/register/detail">
                <a
                  role="presentation"
                  onClick={() => {
                    setIsusermenuOpened(false);
                  }}
                >
                  <li>가게 등록하기</li>
                </a>
              </Link>
              <div className="header-usermenu-divider" />
              <li role="presentation" onClick={() => {}}>
                로그아웃
              </li>
            </ul>
          )}
        </OutsideClickHandler>
      )}
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default React.memo(LoginButton);
