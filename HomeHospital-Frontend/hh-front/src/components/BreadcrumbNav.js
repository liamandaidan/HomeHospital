import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbNav() {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href='#'>Home</Breadcrumb.Item>
        <Breadcrumb.Item href='https://getbootstrap.com/docs/4.0/components/breadcrumb/'>
          Hospital
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Symptoms</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}

export default BreadcrumbNav;
