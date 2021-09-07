import React from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import PencilIcon from "../../public/icon/pencil.svg";
import GrayPlusIcon from "../../public/icon/gray_plus.svg";
import TrashCanIcon from "../../public/icon/trash_can.svg";
import { useDispatch } from "react-redux";
import { uploadFileAPI } from "../../lib/api/file";
import { shopActions } from "../../store/shop";
import RegisterShopFooter from "./RegisterShopFooter";

const Container = styled.div`
  width: 800px;
  height: 100vh;
  margin: auto;

  .register-shop-first-photo-wrapper {
    width: 800px;
    height: 433px;
    margin: 0 auto 24px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    overflow: hidden;
    &:hover {
      .register-shop-photo-interaction-buttons {
        display: flex;
      }
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

  .register-shop-photo-interaction-buttons {
    display: none;
    position: absolute;
    top: 8px;
    right: 8px;
    button {
      width: 48px;
      height: 48px;
      background-color: white;
      border-radius: 50%;
      cursor: pointer;
      border: 0;
      outline: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
      &:first-child {
        margin-right: 8px;
      }
    }
  }
  li:nth-child(3n + 1) {
    margin-right: 0;
  }
  .register-shop-photo-card {
    position: relative;
    display: inline-block;
    width: calc((100% - 48px) / 3);
    height: 180px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 24px;
    margin-bottom: 24px;

    &:hover {
      .register-shop-photo-interaction-buttons {
        display: flex;
      }
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .register-shop-add-more-photo-card {
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 2px dashed ${palette.photoUploadBorder};
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    margin-right: 24px;
    margin-bottom: 24px;
    display: flex;

    svg {
      margin-bottom: 12px;
    }
  }
`;

interface IProps {
  photos: string[];
}

const RegisterShopPhotoCardList: React.FC<IProps> = ({ photos }) => {
  const dispatch = useDispatch();

  const addPhoto = () => {
    const el = document.createElement("input");
    el.type = "file";
    el.accept = "image/*";
    el.onchange = (event) => {
      const { files } = event.target as HTMLInputElement;
      if (files && files.length > 0) {
        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);
        uploadFileAPI(formData)
          .then(({ data }) => {
            dispatch(shopActions.setPhotos([...photos, data]));
          })
          .catch((e) => console.log(e));
      }
    };
    el.click();
  };

  const deletePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    dispatch(shopActions.setPhotos(newPhotos));
  };

  const editPhoto = (index: number) => {
    const el = document.createElement("input");
    el.type = "file";
    el.onchange = (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        uploadFileAPI(formData)
          .then(({ data }) => {
            const newPhotos = [...photos];
            newPhotos[index] = data;
            dispatch(shopActions.setPhotos(newPhotos));
          })
          .catch((e) => console.log(e.message));
      }
    };
    el.click();
  };

  return (
    <Container>
      {photos.map((photo, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <li className="register-shop-first-photo-wrapper">
              <img src={photo} alt="" />
              <div className="register-shop-photo-interaction-buttons">
                <button
                  type="button"
                  onClick={() => {
                    deletePhoto(index);
                  }}
                >
                  <TrashCanIcon />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editPhoto(index);
                  }}
                >
                  <PencilIcon />
                </button>
              </div>
            </li>
          )}
          {index !== 0 && (
            <li className="register-shop-photo-card">
              <img src={photo} alt="" />
              <div className="register-shop-photo-interaction-buttons">
                <button
                  type="button"
                  onClick={() => {
                    deletePhoto(index);
                  }}
                >
                  <TrashCanIcon />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editPhoto(index);
                  }}
                >
                  <PencilIcon />
                </button>
              </div>
            </li>
          )}
        </React.Fragment>
      ))}
      <li
        className="register-shop-photo-card"
        role="presentation"
        onClick={addPhoto}
      >
        <div className="register-shop-add-more-photo-card">
          <GrayPlusIcon />
          추가하기
        </div>
      </li>
      <RegisterShopFooter
        prevHref="/shop/geometry"
        nextHref="/shop/description"
      />
    </Container>
  );
};

export default RegisterShopPhotoCardList;
