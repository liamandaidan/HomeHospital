import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
/**
 * @name Progress bar 
 * @summary Creates a progress bar to display throughout the visit request process 
 * @returns a progress bar component
 */
function ProgressNav() {
  return <ProgressBar now={60} />;
}

export default ProgressNav;
