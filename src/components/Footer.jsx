import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 p-4"></div>
          <div className="col-sm-12 col-md-12 p-4 bg-light d-flex justify-content-center align-items-center">
            <div className="container d-flex flex-column justify-content-center align-items-center p-2 p-md-4 bg-light">
              <img
                src="Nimbus-logo-wide.png"
                alt=""
                id="footer-logo"
                className="img-fluid"
              />
              <p className="fs-6 fw-medium text-muted ">
                All Rights Reserved &copy; {date}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
