import React from "react";
import styled from "styled-components";
import RedXIcon from "../../public/icon/red_x_icon.svg";
import GreenCheckIcon from "../../public/icon/green_check_icon.svg";
import palette from "../../style/palette";

const Container = styled.p<{ isValid: boolean }>`
  color: ${({ isValid }) =>
    isValid ? palette.passwordWarning : palette.passwordPass};
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

interface IProps {
  isValid: boolean;
  text: string;
}

const PasswordWarning: React.FC<IProps> = ({ isValid, text }) => {
  return (
    <Container isValid={isValid}>
      {isValid ? <RedXIcon /> : <GreenCheckIcon />}
      {text}
    </Container>
  );
};

export default PasswordWarning;
