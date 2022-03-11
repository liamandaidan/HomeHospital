import React from "react";
import HospitalSelectForm from "../components/HospitalSelectionForm";
import { HomeHospitalContext } from "../components/HomeHospitalContext";

function HospitalSelectionPage() {
  return (
    <>
      <HomeHospitalContext>
        <HospitalSelectForm />
      </HomeHospitalContext>
    </>
  );
}

export default HospitalSelectionPage;
