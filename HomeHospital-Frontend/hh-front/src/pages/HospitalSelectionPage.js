import React from "react";
import HospitalSelectForm from "../components/HospitalSelectionForm";
import { HomeHospitalProvider } from "../components/HomeHospitalContext";

function HospitalSelectionPage() {
  return (
    <>
      <HomeHospitalProvider>
        <HospitalSelectForm />
      </HomeHospitalProvider>
    </>
  );
}

export default HospitalSelectionPage;
