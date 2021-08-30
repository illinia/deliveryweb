import React from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import Button from "../common/Button";
import useModal from "../../hooks/useModal";
import SignUpModal from "../auth/SignUpModal";

const Container = styled.div`
  width: 200px;
  height: 40px;
  display: flex;
`;

const LoginButton: React.FC = () => {
  const { openModal, closeModal, ModalPortal } = useModal();

  return (
    <Container>
      <Button radius="21">로그인</Button>
      <Button radius="21" signin onClick={openModal}>
        회원가입
      </Button>
      <ModalPortal>
        <SignUpModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default React.memo(LoginButton);
