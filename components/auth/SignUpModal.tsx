import React, { useState } from "react";
import styled, { css } from "styled-components";
import palette from "../../style/palette";
import Input from "../common/Input";
import { HiOutlineMail } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { monthList } from "../../lib/staticData";
import Selector from "../common/Selector";

const Container = styled.div`
  width: 568px;
  height: 614px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .mordal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 20px auto;
    font-size: 24px;
  }
`;

interface IInput {
  isPassword?: boolean;
}

const InputWrapper = styled.div<IInput>`
  position: relative;
  margin-bottom: 16px;

  ${({ isPassword }) =>
    !!isPassword &&
    css`
      svg {
        cursor: pointer;
      }
    `}
`;

const BirthdayLabel = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 8px;

  .sign-up-modal-birthday-info {
    margin-top: 6px;
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: 400;
    color: ${palette.selectorInfo};
  }
`;

interface IProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [givenname, setGivenname] = useState("");
  const [familyname, setFamilyname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangeGivenname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGivenname(event.target.value);
  };

  const onChangeFamilyname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyname(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <Container>
      <IoCloseOutline className="mordal-close-x-icon" onClick={closeModal} />
      <InputWrapper>
        <Input
          placeholder="Email address(이메일 주소)"
          type="email"
          icon={<HiOutlineMail />}
          name="email"
          value={email}
          onChange={onChangeEmail}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="Given name(이름)"
          icon={<FaRegUser />}
          value={givenname}
          onChange={onChangeGivenname}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="Family name(성)"
          icon={<FaRegUser />}
          value={familyname}
          onChange={onChangeFamilyname}
        />
      </InputWrapper>
      <InputWrapper isPassword>
        <Input
          placeholder="Password(비밀번호)"
          type={hidePassword ? "password" : "text"}
          icon={
            hidePassword ? (
              <AiOutlineEye onClick={toggleHidePassword} />
            ) : (
              <AiOutlineEyeInvisible onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
        />
      </InputWrapper>
      <BirthdayLabel>
        생일
        <p className="sign-up-modal-birthday-info">
          생일을 입력해주세요. 다른 회원에게 공개되지 않습니다.
        </p>
      </BirthdayLabel>
      <Selector
        options={monthList}
        disabledOptions={["월"]}
        defaultValue="월"
      />
    </Container>
  );
};

export default SignUpModal;
