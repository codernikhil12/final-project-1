
import { axiosInstance } from "./AxiosInstance";
import { endPoints } from "./Endpoints";

class ApiHandler {
    /**
     * @description method for user sign up
     */
  
    async userSignUp(input) {
      console.log(input);
      try {
        const { data } = await axiosInstance.post(
          `${endPoints?.users?.signup}`,
          input
        );
        // console.log(data);
        return data;
      } catch (error) {
        console.error("Error occurred while signing up:", error);
        throw error;
      }
    }
    async userSignIn(input) {
        try {
          const { data } = await axiosInstance.post(
            `${endPoints.users.signin}`,
            input
          );
          // console.log(data);
          return data;
        } catch (error) {
          console.error("Error occurred while signing up:", error);
          throw error;
        }
      }

      async createProduct(input) {
        try {
          const { data } = await axiosInstance.post(
            endPoints.product.create,
            input
          );
          return data;
        } catch (error) {
          console.error("Error occurred while creating product:", error);
          throw error;
        }
      }
      async fetchProducts({ page, perPage }) {
        try {
          const { data } = await axiosInstance.post(endPoints.product.list, {
            params: { page, perPage },
          });
          return data;
        } catch (error) {
          console.error("Error occurred while fetching products:", error);
          throw error;
        }
      } 

      async fetchProductDetail(productId) {
        // console.log(productId);
        try {
          const { data } = await axiosInstance.get(
            `${endPoints.product.detail}/${productId}`
          );
          return data?.data;
        } catch (error) {
          console.error("Error occurred while fetching product details:", error);
          throw error;
        }
      }

      async deleteProduct(id) {
        // console.log(productId);
        try {
          const { data } = await axiosInstance.post(
            `${endPoints.product.remove}`,
            {id}
          );
          return data;
        } catch (error) {
          console.error("Error occurred while deleting product:", error);
          throw error;
        }
      }

      async updateProduct(updatedData) {
        // console.log(updatedData);
        try {
          const { data } = await axiosInstance.post(
            `${endPoints.product.update}`,
            updatedData
          );
          return data;
        } catch (error) {
          console.error("Error occurred while updating product:", error);
          throw error;
        }
      }

}

export default new ApiHandler();