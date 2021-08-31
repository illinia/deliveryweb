import React from "react";
import SignUpModal from "./SignUpModal";
import { useSelector, RootState } from "../../store";
import styled from "styled-components";
import LoginModal from "./LoginModal";

interface IProps {
  closeModal: () => void;
}

const Container = styled.div`
  z-index: 11;
`;

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode);

  return (
    <Container>
      {authMode === "signup" && <SignUpModal closeModal={closeModal} />}
      {authMode === "login" && (
        <LoginModal closeModal={closeModal}>로그인</LoginModal>
      )}
    </Container>
  );
};

export default AuthModal;
