import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function BreadcrumbNav() {
  return (
    <>
      <div className="breadcrumb-div">
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/hospitals">
            Hospital
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Symptoms</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </>
  );
}

export default BreadcrumbNav;
