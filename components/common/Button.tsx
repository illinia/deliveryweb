import React from "react";
import styled, { css } from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";

interface StyledButtonProps {
  login?: boolean;
}

const Container = styled.button<StyledButtonProps>`
  width: 100px;
  height: 100%;
  padding: 0 16px;
  border: 2px solid ${palette.buttonBorderColor};
  color: white;
  font-size: 16px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
  border-radius: 21px;
  background-color: ${palette.headerBackground};
  cursor: pointer;
  outline: none;
  margin-right: 16px;
  & + & {
    margin-right: 0px;
  }
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  }
  ${({ login }) =>
    login &&
    css`
      border: none;
    `}
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  login?: boolean;
  onClick?: () => void | {};
}

const Button: React.FC<IProps> = ({ ...props }) => {
  return (
    <Container onClick={props.onClick} login={props.login}>
      {props.children}
    </Container>
  );
};

export default Button;
