import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ApiHandler from "../Api/ApiHandler";
import { image } from "../Api/Endpoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Pagination logic
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Fetch all products
  const { data, isError, isLoading } = useQuery({
    queryKey: ["products", page, perPage],
    queryFn: () => ApiHandler.fetchProducts({ page, perPage }),
    keepPreviousData: true,
  });

  // Handle delete mutation
  const deleteMutation = useMutation({
    mutationFn: ({ id }) => ApiHandler.deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("Error deleting product");
    },
  });

  // Handle delete
  const handleDelete = (id) => {
    deleteMutation.mutate({ id });
  };

  // Handle update
  const handleUpdate = (productId) => {
    navigate(`/editProduct/${productId}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  // Pagination logic
  const handleNextPage = () => {
    if (page < data.totalPages) {
      setPage((prevPage) => prevPage + 1);
    } else {
      toast.info("You're on the last page");
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    } else {
      toast.info("You're on the first page");
    }
  };

  return (
    <div className="container mt-5">
      <Link className="btn btn-success mb-3" to="/createProduct">
        Create Product
      </Link>
      <h2 className="text-center text-info">Product List</h2>
      <div className="d-flex flex wrap gap-2 justify-item-evenly">
        {data?.data?.map((item) => {
          return (
            <div key={item._id}>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={image(item.image)}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title" style={{fontWeight: "bold" }}>TITLE :  {item.title}</h5>
                  <p className="card-text" style={{color: "cyan" }}>{item.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{item.status}</li>
                </ul>
                <div className="card-body d-flex flex wrap gap-1">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-primary"
                    onClick={() => handleUpdate(item._id)}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
     
      <ToastContainer />
    </div>
  );
};

export default ProductList;
