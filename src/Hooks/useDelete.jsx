import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../Context/Auth";

export const useDelete = () => {
  const auth = useAuth();
  const token = useSelector(state => state?.user?.data?.token || '');
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [responseDelete, setResponseDelete] = useState(null);

  const deleteData = async (url, name) => {
    setLoadingDelete(true);
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token || ''}`,
        },
      };

      const response = await axios.delete(url, config);

      if (response.status === 200) {
        setResponseDelete(response)
        auth.toastSuccess(name);
        return true; // Return true on success
      }
    } catch (error) {
      auth.toastError(error.message);
      console.error('Error Delete:', error);
      return false; // Return false on error
    } finally {
      setLoadingDelete(false);
    }
  };

  return { deleteData, loadingDelete, responseDelete };
};