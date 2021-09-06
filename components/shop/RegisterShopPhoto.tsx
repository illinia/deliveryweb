import React from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import isEmpty from "lodash/isEmpty";
import { useSelector } from "../../store";
import UploadIcon from "../../public/icon/upload.svg";
import Button from "../common/Button";
import { uploadFileAPI } from "../../lib/api/file";
import { useDispatch } from "react-redux";
import { shopActions } from "../../store/shop";
import RegisterShopPhotoCardList from "./RegisterShopPhotoCardList";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  padding: 62px 30px 100px;
  align-content: flex-start;
  h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .register-shop-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-shop-upload-photo-wrapper {
    width: 858px;
    height: 433px;
    margin: auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed ${palette.photoUploadBorder};
    border-radius: 6px;

    .button-container {
      width: 160px;
      height: 40px;
    }

    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    img {
      width: 100%;
      max-height: 100%;
    }
  }
`;

const RegisterShopPhoto: React.FC = () => {
  const photos = useSelector((state) => state.shop.photos);

  const dispatch = useDispatch();

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const formdata = new FormData();
      formdata.append("file", file);
      try {
        const { data } = await uploadFileAPI(formdata);
        if (data) {
          dispatch(shopActions.setPhotos([...photos, data]));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container>
      <h2>가게 사진 올리기</h2>
      <p className="register-shop-step-info">
        우선 사진을 1장 추가하고 등록한 후에 추가할 수 있습니다.
      </p>
      {isEmpty(photos) && (
        <div className="register-shop-upload-photo-wrapper">
          <>
            <input type="file" accept="image/*" onChange={uploadImage} />
            <Button icon={<UploadIcon />}>사진 업로드</Button>
          </>
        </div>
      )}
      {!isEmpty(photos) && <RegisterShopPhotoCardList photos={photos} />}
    </Container>
  );
};

export default RegisterShopPhoto;
