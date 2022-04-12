import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";

/**
 * @name HHGoogleMap Component
 * @summary The HHGoogleMap component sets up google maps api key and loads
 * the map component.
 * @author Lance Gee
 */
function HHGoogleMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
}

export default HHGoogleMap;
