import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import palette from "../../style/palette";
import { useSelector } from "../../store";
import throttle from "lodash/throttle";
import { useDispatch } from "react-redux";
import { shopActions } from "../../store/shop";
import RegisterShopFooter from "./RegisterShopFooter";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  justify-items: center;
  align-content: center;
  h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.inputPlaceholderColor};
    margin-bottom: 6px;
  }
  .register-shop-geometry-map-wrapper {
    width: 487px;
    height: 280px;
    margin-top: 24px;
    > div {
      width: 100%;
      height: 100%;
    }
    .gmnoprint .gm-style-mtc {
      display: none;
    }
    .gm-svpc {
      display: none;
    }
    .gm-fullscreen-control {
      display: none;
    }
  }
`;

declare global {
  interface Window {
    initMap: () => void;
  }
}

const RegisterShopGeometry: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const latitude = useSelector((state) => state.shop.latitude);
  const longitude = useSelector((state) => state.shop.longitude);

  const dispatch = useDispatch();

  const loadMap = async () => {
    await loadMapScript();
  };

  const loadMapScript = () => {
    return new Promise<void>((resolve) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = () => {
        resolve();
      };
    });
  };

  window.initMap = () => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436,
        },
        zoom: 14,
      });
      const marker = new window.google.maps.Marker({
        position: {
          lat: latitude || 37.5666784,
          lng: longitude || 126.9778436,
        },
        map,
      });
      map.addListener(
        "center_changed",
        throttle(() => {
          const centerLat = map.getCenter().lat();
          const centerLng = map.getCenter().lng();
          marker.setPosition({ lat: centerLat, lng: centerLng });
          dispatch(shopActions.setLatitude(centerLat));
          dispatch(shopActions.setLongitude(centerLng));
        }, 150)
      );
    }
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <Container>
      <h2>핀이 놓인 위치가 정확한가요?(선택)</h2>
      <h3>필요한 경우 핀이 정확한 위치에 자리하도록 조정할 수 있어요.</h3>
      <div className="register-shop-geometry-map-wrapper">
        <div ref={mapRef} id="map" />
      </div>
      <RegisterShopFooter prevHref="/shop/location" nextHref="/shop/photo" />
    </Container>
  );
};

export default RegisterShopGeometry;
