import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/Slice/AuthSlice";
import { profile_pic } from "../Api/Endpoints";
import {  Dropdown } from "react-bootstrap";


function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, user, profileImage } = useSelector((state) => state.auth);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
  };

  const handleToggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark "
        style={{ backgroundColor: "#D2B4DE " }}
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-2 mt-lg-0">
              <Link className="nav-link active " to="">
                <h6 className="ms-auto" style={{ color: " black", paddingLeft: "900px", paddingTop: "9px" }}>
                  {" "}
                  Home
                </h6>
              </Link>
            </a>
          </div>

          {isLoggedIn && (
            <>
              <div className="position-relative mt-2 ms-4 d-flex " style={{marginLeft: "-50px"}}>
                <strong className="d-none d-sm-block ms-1" > WelCome {user}</strong>
                <div className="ms-4">
                  <img
                    src={profileImage ? profile_pic(profileImage) : "error"}
                    alt="Profile"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      cursor: "pointer",
                     
                    }}
                    onClick={handleToggleDropdown}
                  />
                </div>
                <Dropdown.Menu
                  show={showDropdown}
                  align="end"
                  className="mt-0"
                  style={{ backgroundColor: "cyan" }}
                >
                  <Dropdown.Item>
                    <i className="bi bi-person-circle"></i> Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} style={{color: "crimson"}}>
                    <i className="bi bi-box-arrow-right" ></i> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
