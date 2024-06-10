import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiHandler from "../Api/ApiHandler";
import { ToastContainer, toast } from "react-toastify";
//import "./signup.css";
//import BackgroundImage from "../assets/images/register.jpg";
import { useNavigate } from "react-router-dom";
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
  MDBFile,
} from "mdb-react-ui-kit";

const Signup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //mutation nethod for signUp

  const { mutate } = useMutation({
    mutationFn: ApiHandler?.userSignUp,
    onSuccess: (response) => {
      if (response?.status === 200) {
        toast.success(response?.message, {
          onClose: () => navigate("/signin"),
        });
      } else {
        toast.error(response?.message);
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //image handle

  const [img, setImg] = useState(null);

  //form submit

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (img) {
      formData.append("profile_pic", img);
    }
    mutate(formData);
    console.log(formData);
  };

  return (
    <>
      <div style={{backgroundColor: "#9A616D"}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className="g-0">
              <MDBCol md="6">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                  alt="login form"
                  className="rounded-start w-100"
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBCardBody className="d-flex flex-column">
                  <div className="d-flex flex-row mt-2">
                    <MDBIcon
                      fas
                      icon="cubes fa-3x me-3"
                      style={{ color: "#ff6219" }}
                    />
                    <span className="h1 fw-bold mb-0">SIGNUP FIRST</span>
                  </div>

                  <h5
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    SIGN UP THIS FORM
                  </h5>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="FIRST NAME"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    {...register("first_name", {
                      required: true,
                    })}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="LAST NAME"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    {...register("last_name", {
                      required: true,
                    })}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="formControlLg"
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

                  <MDBCol md="9" className="pe-5">
                    <MDBFile
                      size="lg"
                      id="customFile"
                      type="file"
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                  </MDBCol>
                  {img && (
                    <img
                      style={{ height: "180px" }}
                      src={URL.createObjectURL(img)}
                      alt=""
                      className="upload-img"
                    />
                  )}
                  <br />
                  <MDBBtn className="mb-4 px-5" color="dark" size="lg">
                    Register
                  </MDBBtn>
                  <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Already have account?{" "}
                    <button
                      onClick={() => navigate("/signin")}
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
                      LogIn Here
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

export default Signup;
