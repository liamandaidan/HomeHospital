import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import classes from "./HHGoogleMap.module.css";
import Map from "./Map";

function HHGoogleMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

export default HHGoogleMap;
