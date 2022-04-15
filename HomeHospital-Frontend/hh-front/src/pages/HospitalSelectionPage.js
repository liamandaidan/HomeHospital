import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeHospitalContext } from "../components/HomeHospitalContext";
import HospitalSelectForm from "../components/HospitalSelectionForm";
/**
 * @name HospitalSelectionPage
 * @summary this handles all functionality of selecting a hospital as a user.
 * @returns html component
 */
function HospitalSelectionPage() {
  const navigate = useNavigate();
  const { requestButtonOn } = useContext(HomeHospitalContext);
  const [isThereCurrentRequest, setIsThereCurrentRequest] = requestButtonOn;

  useEffect(() => {
    if (!isThereCurrentRequest) {
      navigate("/home");
    }
  }, []);
  return (
    <>
      <HospitalSelectForm />
    </>
  );
}

export default HospitalSelectionPage;
