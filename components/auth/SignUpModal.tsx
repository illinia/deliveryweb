import React, { useState, useMemo } from "react";
import styled, { css } from "styled-components";
import palette from "../../style/palette";
import Input from "../common/Input";
import { HiOutlineMail } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { dayList, monthList, yearList } from "../../lib/staticData";
import Selector from "../common/Selector";
import Button from "../common/Button";
import { signupAPI } from "../../lib/api/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import useValidateMode from "../../hooks/useValidateMode";

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

  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;

    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selector {
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      margin-right: 16px;
      width: 33%;
    }
  }
  .sign-up-modal-submit-button-wrapper {
    width: 100%;
    height: 48px;
    margin-bottom: 16px;
    border-bottom: 1px solid ${palette.buttonBottom};
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

const PASSWORD_MIN_LENGTH = 8;

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [givenname, setGivenname] = useState("");
  const [familyname, setFamilyname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [passwordFocused, setPasswordFocused] = useState(false);

  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();

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

  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  };

  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  };

  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  };

  const onSubmitSignUp = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setValidateMode(true);
    try {
      const signUpBody = {
        email,
        givenname,
        familyname,
        password,
        birthday: new Date(
          `${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`
        ).toISOString(),
      };
      const { data } = await signupAPI(signUpBody);
      dispatch(userActions.setLoggedUser(data));
    } catch (e) {
      console.log(e);
    }
  };

  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !givenname ||
      password.includes(givenname) ||
      password.includes(email.split("@")[0]),
    [password, givenname, email]
  );

  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      !(
        /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
        /[0-9]/g.test(password)
      ),
    [password]
  );

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
          useValidation
          isValid={!!email}
          errorMessage="이메일이 필요합니다."
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="Given name(이름)"
          icon={<FaRegUser />}
          value={givenname}
          onChange={onChangeGivenname}
          useValidation
          isValid={!!givenname}
          errorMessage="이름을 입력하세요."
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="Family name(성)"
          icon={<FaRegUser />}
          value={familyname}
          onChange={onChangeFamilyname}
          useValidation
          isValid={!!familyname}
          errorMessage="성을 입력하세요."
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
          useValidation
          isValid={!!password}
          errorMessage="비밀번호를 입력하세요."
          onFocus={onFocusPassword}
        />
      </InputWrapper>
      <BirthdayLabel>
        생일
        <p className="sign-up-modal-birthday-info">
          생일을 입력해주세요. 다른 회원에게 공개되지 않습니다.
        </p>
      </BirthdayLabel>
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-year-selector">
          <Selector
            options={yearList}
            disabledOptions={["년"]}
            defaultValue="년"
            value={birthYear}
            onChange={onChangeBirthYear}
          />
        </div>
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={monthList}
            disabledOptions={["월"]}
            defaultValue="월"
            value={birthMonth}
            onChange={onChangeBirthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector
            options={dayList}
            disabledOptions={["일"]}
            defaultValue="일"
            value={birthDay}
            onChange={onChangeBirthDay}
          />
        </div>
      </div>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button onClick={onSubmitSignUp}>가입하기</Button>
      </div>
    </Container>
  );
};

export default SignUpModal;
