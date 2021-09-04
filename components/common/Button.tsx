import React from "react";
import styled, { css } from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";

interface StyledButtonProps {
  signin?: boolean;
  radius?: string;
}

const Container = styled.button<StyledButtonProps>`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 800;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
  border-radius: ${({ radius }) => (radius ? +radius : 4)}px;
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
  ${({ signin }) =>
    signin &&
    css`
      border: 2px solid ${palette.buttonBorderColor};
    `}
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  signin?: boolean;
  radius?: string;
}

const Button: React.FC<IProps> = ({ children, radius, signin, ...props }) => {
  return (
    <Container
      className="button-container"
      {...props}
      radius={radius}
      signin={signin}
    >
      {children}
    </Container>
  );
};

export default React.memo(Button);
