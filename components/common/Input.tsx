import React from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";

const Container = styled.div<{ iconExist: boolean }>`
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? "0 44px 0 11px" : "0 11px")};
    border: 1px solid ${palette.inputBorder};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    ::placeholder {
      color: ${palette.inputPlaceholderColor};
    }
    &:focus {
      border: 2px solid ${palette.inputFocused} !important;
    }
  }

  .input-icon-wrapper {
    position: absolute;
    top: 0;
    right: 11px;
    height: 46px;
    display: flex;
    align-items: center;
    font-size: 20px;
  }
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
}

const Input: React.FC<IProps> = ({ icon, ...props }) => {
  return (
    <Container iconExist={!!icon}>
      <input {...props} />
      <div className="input-icon-wrapper">{icon}</div>
    </Container>
  );
};

export default Input;
