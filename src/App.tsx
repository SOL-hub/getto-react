import { useState } from "react";
import DynamicMap from "./Map/DynamicMap";
import KakaoMapScriptLoader from "./Map/KakaoMapScriptLoader";
import SearchLocation from "./Map/SearchLocation";
import { PlaceType } from "./Map/mapTypes";
import MapMarkerController from "./Map/MapMarkerController";

const App = () => {
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [selectedPlaceId, setSelectedPlacedId] = useState(""); //아이디 저장
  console.log(places);
  return (
    <KakaoMapScriptLoader>
      <DynamicMap>
        <MapMarkerController
          places={places}
          selectedPlaceId={selectedPlaceId}
        ></MapMarkerController>
        <SearchLocation
          onUpdatePlaces={(places) => {
            setPlaces(places);
          }}
          onSelect={(placeId) => {
            setSelectedPlacedId(placeId);
          }}
        />
      </DynamicMap>
    </KakaoMapScriptLoader>
  );
};

export default App;
