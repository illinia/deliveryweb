import React from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";

const Container = styled.div`
  width: 100px;
  height: 40px;
  border: 1px solid ${palette.buttonBorderColor};
  border-radius: 10px;
  display: flex;
`;

const Button = styled.div``;

const LoginButton: React.FC = () => {
  return (
    <Container>
      <Button>로그인</Button>
    </Container>
  );
};

export default React.memo(LoginButton);
