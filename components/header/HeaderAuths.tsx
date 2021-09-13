import React from "react";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import useModal from "../../hooks/useModal";
import AuthModal from "../auth/AuthModal";

const HeaderAuths: React.FC = () => {
  const dispatch = useDispatch();
  const { openModal, closeModal, ModalPortal } = useModal();

  return (
    <>
      <Button
        radius="21px"
        onClick={(e) => {
          e.preventDefault();
          dispatch(authActions.setAuthMode("login"));
          openModal();
        }}
      >
        로그인
      </Button>
      <Button
        radius="21px"
        signin
        onClick={(e) => {
          e.preventDefault();
          dispatch(authActions.setAuthMode("signup"));
          openModal();
        }}
      >
        회원가입
      </Button>
      <ModalPortal>
        <AuthModal closeModal={(e) => closeModal(e)} />
      </ModalPortal>
    </>
  );
};

export default React.memo(HeaderAuths);
