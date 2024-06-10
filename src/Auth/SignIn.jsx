import React from "react";
//import { Form, Button } from "react-bootstrap";
import "./SignIn.css";
import { useForm } from "react-hook-form";
//import BackgroundImage from "../assets/images/background.png";
//import Logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import ApiHandler from "../Api/ApiHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../redux/Slice/AuthSlice";
import { ToastContainer, toast } from "react-toastify";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handle signIn method
  const { mutate } = useMutation({
    mutationFn: ApiHandler.userSignIn,
    onSuccess: (response) => {
      if (response?.status == 200) {
        const token = response?.token;
        const name = response?.data?.first_name;
        const profileImage = response?.data?.profile_pic;

        localStorage.setItem("token", token);
        localStorage.setItem("Name", name);
        localStorage.setItem("proimg", profileImage);

        dispatch(login({ token, user: name, profileImage }));
        toast.success(response?.message, {
          onClose: () => navigate("/"),
        });
      } else {
        toast.error(response?.message);
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <>
    <div style={{backgroundColor: "#9A616D"}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className="g-0">
              <MDBCol md="6">
                <MDBCardImage
                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  alt="login form"
                  className="rounded-start w-100"
                />
              </MDBCol>
              
              <MDBCol md="6">
                <MDBCardBody className="d-flex flex-column" >
                  <div className="d-flex flex-row mt-2">
                    <MDBIcon
                      fas
                      icon="cubes fa-3x me-3"
                      style={{ color: "#ff6219" }}
                    />
                    <span className="h1 fw-bold mb-0">LOGIN FORM</span>
                  </div>

                  <h5
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: "1px" }}
                  ></h5>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="formControlLg"
                     className="input-bx"
                    type="email"
                    size="lg"
                    {...register("email", {
                      required: true,
                    })}
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    {...register("password", {
                      required: true,
                    })}
                  />

                  <div className="mb-2">
                    <MDBCheckbox
                      name="rememberMe"
                      id="checkbox"
                      label="Remember me"
                    />
                    
                  </div>
                  <MDBBtn className="mb-4 px-5" color="dark" size="lg">
                    Login
                  </MDBBtn>

                  <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Don't have an account?{" "}
                    <button
                      onClick={() => navigate("/signup")}
                      style={{
                        color: "#393f81",
                        backgroundColor: "transparent",
                        border: "none",
                        textDecoration: "underline",
                        cursor: "pointer",
                        padding: "0",
                        fontSize: "inherit",
                      }}
                    >
                      Create an account
                    </button>
                  </p>
                  
                </MDBCardBody>
              </MDBCol>
             
            </MDBRow>
          
          </MDBCard>
        </MDBContainer>
      </form>
      <ToastContainer />
      </div>
    </>
  );
};

export default Signin;
