import React, { FormEvent } from "react";
import styled, { css } from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";

interface StyledButtonProps {
  signin?: boolean;
  radius?: string;
  color?: string;
  fontColor?: string;
  fontWeight?: string;
}

const Container = styled.button<StyledButtonProps>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  border: none;
  color: ${({ fontColor }) => fontColor};
  font-size: 16px;
  font-weight: ${({ fontWeight }) => fontWeight};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
  border-radius: ${({ radius }) => (radius ? radius : "4px")};
  background-color: ${({ color }) =>
    color ? color : palette.headerBackground};
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
  svg {
    margin-right: 8px;
  }
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  signin?: boolean;
  radius?: string;
  color?: string;
  fontColor?: string;
  fontWeight?: string;
  icon?: JSX.Element;
  onClick?: (e: any) => any;
}

const Button: React.FC<IProps> = ({
  children = "",
  color,
  radius,
  signin,
  icon,
  fontColor = "white",
  fontWeight = "800",
  ...props
}) => {
  return (
    <Container
      className="button-container"
      {...props}
      color={color}
      fontColor={fontColor}
      fontWeight={fontWeight}
      radius={radius}
      signin={signin}
    >
      {icon}
      {children}
    </Container>
  );
};

export default React.memo(Button);
