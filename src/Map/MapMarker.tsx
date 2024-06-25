import { useEffect, useLayoutEffect, useMemo } from "react";
import { PlaceType } from "./mapTypes";
import { useMap } from "../hooks/useMap";

interface MapMarkerProps {
  place: PlaceType;
  index: number;
  showInfo?: boolean;
}

const MARKER_IMAGE_URL =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";

const MapMarker = (props: MapMarkerProps) => {
  const map = useMap();

  const infoWindow = useMemo(() => {
    return new kakao.maps.CustomOverlay({
      position: props.place.position,
      content: props.place.title,
      map: map,
    });
  }, []);

  console.log(props.showInfo);

  const marker = useMemo(() => {
    const imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
    const imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(0, props.index * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    };
    const markerImage = new kakao.maps.MarkerImage(
      MARKER_IMAGE_URL,
      imageSize,
      imgOptions
    );
    const marker = new kakao.maps.Marker({
      map: map,
      position: props.place.position, // 마커의 위치
      image: markerImage,
    });

    return marker;
    // test
  }, []);

  useLayoutEffect(() => {
    marker.setMap(map); //지도 위에 마커를 표시

    return () => {
      marker.setMap(null);
    };
  }, [map]);

  useEffect(() => {
    if (props.showInfo) {
      infoWindow.setMap(map);
      console.log(props.place.title);
      return;
    }

    return () => {
      infoWindow.setMap(null);
    };

    //선택해제
  }, [props.showInfo]);

  return <div>test</div>;
};

export default MapMarker;
