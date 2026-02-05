import axios from "axios";
import { useEffect } from "react";
import { api } from "../config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
const AdminVerify = () => {
  let [query] = useSearchParams();
  let token = query.get("token");
  const navigate = useNavigate();

  const verifyEmail = async (e) => {
    try {
      const result = await axios({
        url: `${api}/web-users/verify-email`,
        method: "patch",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("admin/login");
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  useEffect(() => {
    verifyEmail();
  }, []);
  return <div>AdminVerify</div>;
};

export default AdminVerify;
