import React from "react";
import styled, { css } from "styled-components";
import palette from "../../style/palette";
import { useSelector } from "../../store";
import Warning from "../../public/icon/warning.svg";

interface SelectorContainerProps {
  isValid: boolean;
  validateMode: boolean;
}

const Container = styled.div<SelectorContainerProps>`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    background-color: ${palette.selectorBackground};
    border: 1px solid ${palette.selectorBorder};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    background-image: url("/icon/disabled_register_selector_down_arrow.svg");
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;

    ${({ validateMode, isValid }) => {
      if (validateMode) {
        if (!isValid) {
          return css`
            border-color: ${palette.selectorWarningBackground};
            background-color: ${palette.selectorWarningBackground};
          `;
        }
      }
      return undefined;
    }}

    &:focus {
      border-color: ${palette.selectorFocused};
    }

    &:disabled {
      background-color: ${palette.selectorDisabled};
      border-color: ${palette.selectorDisabledBorder};
      color: ${palette.selectorDisabledBorder};
      cursor: not-allowed;
    }
  }

  .selector-warning {
    margin-top: 8px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 4px;
    }
    p {
      font-size: 12px;
      color: ${palette.selectorWarning};
    }
  }
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
  value?: string | number;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  disabledOptions?: string[];
}

const Selector: React.FC<IProps> = ({
  label,
  options = [],
  isValid,
  useValidation = true,
  errorMessage = "옵션을 선택하세요",
  disabledOptions = [],
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container isValid={!!isValid} validateMode={useValidation && validateMode}>
      <label>
        {label && <span>{label}</span>}
        <select {...props}>
          {disabledOptions.map((option, index) => (
            <option key={index} value={option} disabled>
              {option}
            </option>
          ))}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {useValidation && validateMode && !isValid && (
        <div className="selector-warning">
          <Warning />
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
};

export default React.memo(Selector);
