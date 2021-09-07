import React from "react";
import ReactAutosizeTextarea from "react-autosize-textarea";
import styled from "styled-components";
import palette from "../../style/palette";

const StyledTextarea = styled(ReactAutosizeTextarea)`
  position: relative;
  width: 100%;
  min-height: 216px;
  padding: 11px;
  border: 1px solid ${palette.textareaBorder};
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  resize: none;
  font: inherit;
  &::placeholder {
    color: ${palette.textareaPlaceholder};
  }
  &:focus {
    border-color: ${palette.textareaFocused};
  }
`;

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  ...props
}) => {
  return <StyledTextarea {...props} />;
};

export default React.memo(Textarea);
