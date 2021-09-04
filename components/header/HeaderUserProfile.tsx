import React, { useState } from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import useModal from "../../hooks/useModal";
import AuthModal from "../auth/AuthModal";
import OutsideClickHandler from "react-outside-click-handler";
import { FaUserCog } from "react-icons/fa";
import { useSelector } from "../../store";
import { logoutAPI } from "../../lib/api/auth";
import { userActions } from "../../store/user";

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

const HeaderUserProfile: React.FC = () => {
  const [isUsermenuOpened, setIsusermenuOpened] = useState(false);
  const userProfileImage = useSelector((state) => state.user.profileImage);
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser());
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isUsermenuOpened) setIsusermenuOpened(false);
      }}
    >
      <UserProfile
        onClick={(e) => {
          e.preventDefault();
          setIsusermenuOpened(!isUsermenuOpened);
        }}
      >
        <FaUserCog size="20px" />
        <img
          src={userProfileImage}
          className="header-user-profile-image"
          alt=""
        />
      </UserProfile>
      {isUsermenuOpened && (
        <ul className="header-usermenu">
          <li>계정 관리</li>
          <Link href="/shop/register">
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
          <li role="presentation" onClick={logout}>
            로그아웃
          </li>
        </ul>
      )}
    </OutsideClickHandler>
  );
};

export default HeaderUserProfile;
