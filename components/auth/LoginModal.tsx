import React, { useState } from "react";
import styled, { css } from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import palette from "../../style/palette";
import Button from "../common/Button";
import Input from "../common/Input";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { loginAPI } from "../../lib/api/auth";
import useValidateMode from "../../hooks/useValidateMode";
import { userActions } from "../../store/user";
import { useEffect } from "react";

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .mordal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 20px auto;
    font-size: 24px;
  }
  .login-modal-submit-button-wrapper {
    width: 100%;
    height: 48px;
    margin-bottom: 16px;
    border-bottom: 1px solid ${palette.buttonBottom};
  }
  .login-modal-set-signup {
    color: ${palette.darkCyan};
    margin-left: 8px;
    cursor: pointer;
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

interface IProps {
  closeModal: () => void;
}

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHided, setIsPasswordHided] = useState(true);

  const { setValidateMode } = useValidateMode();

  const dispatch = useDispatch();

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  const changeToSignUpModal = () => {
    dispatch(authActions.setAuthMode("signup"));
  };

  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidateMode(true);
    if (!email || !password) {
      alert("???????????? ??????????????? ??????????????????.");
    } else {
      const loginBody = { email, password };

      try {
        const { data } = await loginAPI(loginBody);
        dispatch(userActions.setLoggedUser(data));
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container>
      <IoCloseOutline className="mordal-close-x-icon" onClick={closeModal} />
      <InputWrapper>
        <Input
          placeholder="Email address(????????? ??????)"
          name="email"
          type="email"
          icon={<HiOutlineMail />}
          value={email}
          onChange={onChangeEmail}
          isValid={email !== ""}
          errorMessage="???????????? ???????????????."
        />
      </InputWrapper>
      <InputWrapper isPassword>
        <Input
          placeholder="Enter ur password(????????????)"
          type={isPasswordHided ? "password" : "text"}
          icon={
            isPasswordHided ? (
              <AiOutlineEye onClick={togglePasswordHiding} />
            ) : (
              <AiOutlineEyeInvisible onClick={togglePasswordHiding} />
            )
          }
          value={password}
          onChange={onChangePassword}
          isValid={password !== ""}
          errorMessage="??????????????? ???????????????."
        />
      </InputWrapper>
      <div className="login-modal-submit-button-wrapper">
        <Button onClick={onSubmitLogin} type="submit">
          ?????????
        </Button>
      </div>
      <p>
        Delivery ????????? ??????????
        <span
          className="login-modal-set-signup"
          role="presentation"
          onClick={changeToSignUpModal}
        >
          ????????????
        </span>
      </p>
    </Container>
  );
};

export default LoginModal;
