import { useEffect, useRef } from "react";
import styled from "@emotion/styled";

const DynamicMap = () => {
  const kakaoMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!kakaoMapRef.current) {
      return;
    }

    const targetPoint = new kakao.maps.LatLng(33.450701, 126.570667);
    const options = {
      center: targetPoint,
      level: 3,
    };

    new window.kakao.maps.Map(kakaoMapRef.current, options);
  }, []);
  return (
    <Container>
      <Map ref={kakaoMapRef} />
    </Container>
  );
};

export default DynamicMap;

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Map = styled.div`
  position: static;
  width: 100%;
  height: 100%;
`;
