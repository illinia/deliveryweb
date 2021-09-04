import React from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
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
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default HeaderAuths;
