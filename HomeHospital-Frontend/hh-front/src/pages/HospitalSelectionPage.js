import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeHospitalContext } from "../components/HomeHospitalContext";
import HospitalSelectForm from "../components/HospitalSelectionForm";

function HospitalSelectionPage() {
  const navigate = useNavigate();
  const { requestButtonOn } = useContext(HomeHospitalContext);
  const [isThereCurrentRequest, setIsThereCurrentRequest] = requestButtonOn;

  useEffect(() => {
    console.log("in the hospital selection page");
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
