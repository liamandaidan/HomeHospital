import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

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
