import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
} from "@react-google-maps/api";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HomeHospitalContext } from "./HomeHospitalContext";
import classes from "./Map.module.css";

/**
 * @name Map Component
 * @summary The Map component connects with google maps api and
 * displays the the patients geolocation and calculates the time and route
 * to get to the requested hospital
 * @author Lance Gee
 */
function Map() {
  // context variables
  const { longitude, latitude } = useContext(HomeHospitalContext);
  const [hospitalLongitude, setHospitalLongitude] = longitude;
  const [hospitalLatitude, setHospitalLatitude] = latitude;
  // variables
  const [travelTime, setTravelTime] = useState("");
  const [userLatitude, setLatitude] = useState(0);
  const [userLongitude, setLongitude] = useState(0);
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 51.0447, lng: -114.0719 }), []);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  /**
   * @function getLocation - retrieves the patients geolocation from the browser
   */
  function getLocation() {
    console.log("hospital longitude: " + hospitalLongitude);
    console.log("hospital latitude: " + hospitalLatitude);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.userLatitude);
        setLongitude(position.coords.userLongitude);
        if (
          userLongitude === 0 ||
          userLatitude === 0 ||
          userLongitude === undefined ||
          userLatitude === undefined
        ) {
          setLatitude(51.065934372560484);
          setLongitude(-114.09079456099977);
        }
        console.log(userLatitude);
        console.log(userLongitude);
      });
    } else {
      alert("Enable Geo-Location to get Travel Times");
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getLocation();
    }, 500);
  }, []);

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
      destination: { lat: hospitalLatitude, lng: hospitalLongitude },
      origin: { lat: userLatitude, lng: userLongitude },
      travelMode: "DRIVING",
    };
  }, [userLatitude, userLongitude, hospitalLatitude, hospitalLongitude]);

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
