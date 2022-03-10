import { GoogleMap, Marker } from "@react-google-maps/api";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classes from "./Map.module.css";
import Places from "./places";
import Distance from "./distance";

function Map() {
  // variables
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 51.0447, lng: -114.0719 }), []);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log(latitude);
        console.log(longitude);
      });
    } else {
      alert("Enable Geo-Location to get Travel Times");
    }
  });

  const onLoad = useCallback((map) => (mapRef.current = map), []);
  return (
    <div className={classes.map}>
      <h4>Map</h4>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName={classes.mapContainer}
        options={options}
        onLoad={onLoad}
      >
        <Marker position={{ lat: latitude, lng: longitude }} icon={} />
      </GoogleMap>
    </div>
  );
}

export default Map;
