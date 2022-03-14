import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
} from "@react-google-maps/api";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classes from "./Map.module.css";

function Map() {
  // variables
  const [travelTime, setTravelTime] = useState("");
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
  }, [latitude, longitude]);

  const [responseData, setResponseData] = useState(null);

  const directionsCallback = useCallback((res) => {
    // console.log(res.routes[0].legs[0].duration.text);
    setTravelTime(res.routes[0].legs[0].duration.text);

    if (res !== null) {
      if (res.status === "OK") {
        setResponseData(res);
      } else {
        console.log("response: ", res);
      }
    }
  }, []);

  const directionsServiceOptions = React.useMemo(() => {
    return {
      destination: { lat: 51.07956590317617, lng: -113.9841688696898 },
      origin: { lat: latitude, lng: longitude },
      travelMode: "DRIVING",
    };
  }, [latitude, longitude]);

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const mapStyle = {
    border: "2px solid #ec2baa",
  };
  return (
    <div className={`mt-4 ${classes.map}`}>
      <h4>Directions</h4>
      <h5>Travel Time: {travelTime}</h5>
      <GoogleMap
        zoom={12}
        center={center}
        mapContainerClassName={classes.mapContainer}
        options={options}
        onLoad={onLoad}
        mapContainerStyle={mapStyle}
      >
        {responseData !== null && (
          <DirectionsRenderer
            options={{
              directions: responseData,
            }}
          />
        )}

        <DirectionsService
          options={directionsServiceOptions}
          callback={directionsCallback}
        />
      </GoogleMap>
    </div>
  );
}

export default Map;
