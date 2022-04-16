import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

/**
 * @name Breadcrumd Nav bar
 * @summary This is a breadcrumb component on the patient page when making a request
 * users can see where they are when going through the process of filling out a visit request to a hospital.
 * @author Robyn Balanag
 * @returns Breadcrumb navigation displaying where the user is in the site when filling out a visit request to a hospital
 */
function BreadcrumbNav() {
  return (
    <>
      <div className="breadcrumb-div">
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/hospitals" }}>
            Hospital
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Symptoms</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </>
  );
}

export default BreadcrumbNav;
