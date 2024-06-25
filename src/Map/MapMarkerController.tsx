import { useEffect } from "react";
import { useMap } from "../hooks/useMap";
import MapMarker from "./MapMarker";
import { PlaceType } from "./mapTypes";

interface MapMarkerControllerProps {
  places: PlaceType[];
  selectedPlaceId?: string;
}

const MapMarkerController = (props: MapMarkerControllerProps) => {
  const map = useMap();

  useEffect(() => {
    if (props.places.length < 1) {
      return;
    }

    const boundes = new window.kakao.maps.LatLngBounds();
    props.places.forEach((place) => {
      boundes.extend(place.position);
    });
  }, [props.places]);
  return (
    <>
      {props.places.map((place, index) => {
        return (
          <MapMarker
            key={place.id}
            place={place}
            index={index}
            showInfo={props.selectedPlaceId === place.id}
          />
        );
      })}
    </>
  );
};

export default MapMarkerController;
