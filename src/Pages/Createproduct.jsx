import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiHandler from "../Api/ApiHandler";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";

const Createproduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handle image

  const [img, setImg] = useState(null);

  //create product method

  const { mutate } = useMutation({
    mutationFn: ApiHandler?.createProduct,
    onSuccess: (response) => {
      if (response?.status === 200) {
        toast.success(response?.message, {
          onClose: () => navigate("/productList"),
        });
        queryClient.invalidateQueries({ queryKey: ["products"] });
      } else {
        toast.error(response?.message);
      }
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (img) {
      formData.append("image", img);
    }
    mutate(formData);
  };

  return (
    <>
      <div className="container mt-5">
        <Link className="btn btn-success" to="/productList">
          View Products List
        </Link>
        <h2 className="text-center text-info">Create Product</h2>
        <MDBContainer>
          <MDBRow className="d-flex justify-content-center">
            <MDBCol md="6">
              <form
                className="shadow p-4 bg-white rounded"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <MDBInput
                    type="text"
                    name="title"
                    id="title"
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    rows="3"
                    {...register("description", { required: true })}
                  />
                  {errors.description && <span>This field is required</span>}
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image
                  </label>
                  <MDBInput
                    type="file"
                    onChange={(e) => setImg(e.target.files[0])}
                    accept="image/*"
                  />
                  {img && (
                    <img
                      style={{ height: "180px", marginTop: "10px" }}
                      src={URL.createObjectURL(img)}
                      alt="Preview"
                      className="upload-img"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-info"
                >
                  Submit
                </button>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <ToastContainer />
    </>
  );
};

export default Createproduct;
