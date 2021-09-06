import React from "react";
import styled, { css } from "styled-components";
import palette from "../../style/palette";
import Link from "next/link";
import { useSelector } from "../../store";

type InputContainerProps = {
  iconExist: boolean;
  isValid: boolean;
  useValidation: boolean;
};

const Container = styled.div<InputContainerProps>`
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
  .input-error-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.inputErrorMessage};
  }
  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.inputErrorBackground};
        border-color: ${palette.inputErrorMessage};
        &:focus {
          border-color: ${palette.inputErrorMessage};
        }
      }
    `}
  ${({ useValidation, isValid }) =>
    useValidation &&
    isValid &&
    css`
      input {
        border-color: ${palette.inputBorder};
      }
    `}
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  value?: string | number;
  onChange?: (e: any) => void;
  maxLength?: number;
}

const Input: React.FC<IProps> = ({
  icon,
  isValid = false,
  useValidation = true,
  errorMessage,
  value,
  onChange,
  maxLength,
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container
      iconExist={!!icon}
      isValid={isValid}
      useValidation={validateMode && useValidation}
      className="input-container"
    >
      <input
        {...props}
        onChange={onChange}
        value={value}
        maxLength={maxLength}
      />
      <div className="input-icon-wrapper">{icon}</div>
      {useValidation && validateMode && !isValid && errorMessage && (
        <p className="input-error-message">{errorMessage}</p>
      )}
    </Container>
  );
};

export default React.memo(Input);
